import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Remark } from "../entity/Remark";
import { getUserId } from "../utils/auth";
import { Team } from "../entity/Team";

export class RemarkController {
    private remarkRepository = getRepository(Remark);

    async getRemarks(req: Request, resp: Response) {
        const lead = await this.isLead(req, resp);
        if (typeof lead === "undefined") return;

        if (!lead) {
            resp.status(403).send("Not a lead");
            return;
        }

        return this.remarkRepository.find();
    }

    async addRemark(req: Request, resp: Response) {
        const lead = await this.isLead(req, resp);
        if (typeof lead === "undefined") return;

        if (!lead) {
            resp.status(403).send("Not a lead");
            return;
        }

        if (
            typeof req.body.name === "undefined" ||
            typeof req.body.year === "undefined" ||
            typeof req.body.cluster === "undefined" ||
            typeof req.body.remarks === "undefined"
        ) {
            resp.status(400).send(
                "Wrong body format. Use the format as specified in documentation"
            );
            return;
        }

        const remark = new Remark();
        remark.name = req.body.name;
        remark.year = req.body.year;
        remark.cluster = req.body.cluster;
        remark.remarks = req.body.remarks;

        return this.remarkRepository.save(remark);
    }

    private async isLead(req: Request, resp: Response) {
        const userId = await getUserId(req, resp);
        if (typeof userId === "undefined") return;
        const user = await getRepository(Team).findOne({
            where: {
                user: userId,
            },
        });

        if (typeof user === "undefined") {
            resp.status(403).send("Not a team member");
            return;
        }

        return user.lead;
    }
}
