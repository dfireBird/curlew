import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Resources } from "../entity/Resources";
import { getUserId } from "../utils/auth";
import { Team } from "../entity/Team";

export class ResourcesContoller {
    private resourceRepository = getRepository(Resources);

    async getResources() {
        return this.resourceRepository.find();
    }

    async addResource(req: Request, resp: Response) {
        const userId = await getUserId(req, resp);
        if (typeof userId === "undefined") return;

        const teamRepo = getRepository(Team);

        if (
            typeof (await teamRepo.findOne({
                where: {
                    user: userId,
                },
            })) === "undefined"
        ) {
            resp.status(403).send("Not a team member");
            return;
        }
        if (
            typeof req.body.title === "undefined" ||
            typeof req.body.category === "undefined" ||
            typeof req.body.url === "undefined" ||
            typeof req.body.description === "undefined"
        ) {
            resp.status(400).send(
                "Wrong body format. Use the format as specified in documentation"
            );
            return;
        }

        const resource = new Resources();
        resource.title = req.body.title;
        resource.category = req.body.category;
        resource.url = req.body.url;
        resource.description = req.body.description;

        return this.resourceRepository.save(resource);
    }
}
