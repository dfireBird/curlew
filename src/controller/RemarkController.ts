import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Remark } from "../entity/Remark";
import { getUserId, isLead } from "../utils/auth";

export class RemarkController {
    private remarkRepository = getRepository(Remark);

    async getRemarks(req: Request, resp: Response) {
        const lead = await isLead(req, resp);
        if (typeof lead === "undefined") return;

        if (!lead) {
            resp.status(403).send("Not a lead");
            return;
        }

        return this.remarkRepository.find();
    }

    async addRemark(req: Request, resp: Response) {
        const lead = await isLead(req, resp);
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
}
