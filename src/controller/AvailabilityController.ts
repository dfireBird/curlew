import { getRepository } from "typeorm";
import { Request, Response, NextFunction } from "express";
import { Team } from "../entity/Team";
import { getUserId } from "../utils/auth";

export class AvailabilityController {
    private teamRepository = getRepository(Team);

    async getAvail(req: Request, resp: Response) {
        const user = await this.getUser(req, resp);
        if (user === undefined) return;

        resp.send({
            availability: user.avail_status,
        });
    }

    async postAvail(req: Request, resp: Response) {
        const user = await this.getUser(req, resp);
        if (user === undefined) return;

        if (req.body.availability === undefined) {
            resp.status(400).send("Error in post body. No availability");
            return;
        }
        user.avail_status = req.body.availability;
        return await this.teamRepository.save(user);
    }

    async getAvailDesc(req: Request, resp: Response) {
        const user = await this.getUser(req, resp);
        if (user === undefined) return;

        resp.send({
            availability_description: user.avail_description,
        });
    }

    async postAvailDesc(req: Request, resp: Response) {
        const user = await this.getUser(req, resp);
        if (user === undefined) return;

        if (req.body.description === undefined) {
            resp.status(400).send("Error in post body. No description");
            return;
        }
        user.avail_description = req.body.description;
        return await this.teamRepository.save(user);
    }

    private async getUser(req: Request, resp: Response) {
        const userId = await getUserId(req, resp);
        if (userId === undefined) return;

        const user = await this.teamRepository.findOne({
            where: {
                user: userId,
            },
            relations: ["user"],
        });
        if (user === undefined) {
            resp.status(403).send("Not a team member");
            return;
        }
        return user;
    }
}
