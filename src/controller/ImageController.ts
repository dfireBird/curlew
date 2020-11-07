import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Images } from "../entity/Images";
import { Team } from "../entity/Team";
import { getUserId } from "../utils/auth";

export class ImageController {
    private imagesRepository = getRepository(Images);

    async getImages() {
        return this.imagesRepository.find();
    }

    async addImage(req: Request, resp: Response) {
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

        if (typeof req.body.link === "undefined") {
            resp.status(400).send(
                "Wrong body format. Use the format as specified in documentation"
            );
            return;
        }

        const image = new Images();
        image.link = req.body.link;

        return this.imagesRepository.save(image);
    }
}
