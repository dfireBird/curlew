import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Report } from "../entity/Report";
import { getUserId } from "../utils/auth";
import { Team } from "../entity/Team";

export class ReportController {
    private reportRepository = getRepository(Report);
    private teamRepository = getRepository(Team);

    async submitReport(req: Request, resp: Response) {
        const userId = await getUserId(req, resp);
        if (typeof userId === "undefined") return;

        const user = await this.teamRepository.findOne({
            where: {
                user: userId,
            },
            relations: ["user"],
        });
        if (typeof user === "undefined") {
            resp.status(403).send("Not a team member");
            return;
        }
        if (!user.cluster_head) {
            resp.status(403).send("Not a cluster head");
            return;
        }

        if (
            typeof req.body.title === "undefined" ||
            typeof req.body.date === "undefined" ||
            typeof req.body.venue === "undefined" ||
            typeof req.body.report === "undefined"
        ) {
            resp.status(400).send(
                "Wrong body format. Use the format as specified in documentation"
            );
            return;
        }

        if (isNaN(Date.parse(req.body.date))) {
            resp.status(400).send("Wrong date format. Use yyyy-mm-dd format");
            return;
        }

        const report = new Report();
        report.title = req.body.title;
        report.date = new Date(req.body.date);
        report.venue = req.body.venue;
        report.report = req.body.report;
        report.submittedBy = user;

        return this.reportRepository.save(report);
    }
}
