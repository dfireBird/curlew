import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Team } from "../entity/Team";
import { getUserId } from "../utils/auth";
import { User } from "../entity/User";

export class TeamController {
    private teamRepository = getRepository(Team);

    async getTeamMembers() {
        return this.teamRepository
            .createQueryBuilder("team")
            .leftJoin("team.user", "user")
            .select("team.cluster")
            .addSelect("team.year")
            .addSelect("user.name")
            .getMany();
    }

    async addTeamMember(req: Request, resp: Response) {
        const userId = await getUserId(req, resp);
        if (typeof userId === "undefined") return;

        const user = await this.teamRepository.findOne({
            where: {
                user: userId,
            },
        });

        if (typeof user === "undefined") {
            resp.status(403).send("Not a team member");
            return;
        }

        if (!user.lead) {
            resp.status(403).send("Not a lead");
            return;
        }

        if (
            typeof req.body.name === "undefined" ||
            typeof req.body.cluster === "undefined"
        ) {
            resp.status(400).send(
                "Wrong body format. Use the format as specified in documentation"
            );
            return;
        }

        const name = await getRepository(User).findOne({
            where: {
                name: req.body.name,
            },
        });
        if (typeof name === "undefined") {
            resp.status(400).send(
                "Mentioned name is not registered as user. Ask him/her to register"
            );
            return;
        }

        const member = new Team();
        member.user = name;
        member.cluster = req.body.cluster;
        member.year = req.body.year ?? new Date().getFullYear();
        member.avail_description = "";
        member.avail_status = false;
        return this.teamRepository.save(member);
    }
}
