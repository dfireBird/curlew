import { getRepository, MoreThanOrEqual } from "typeorm";
import { Request, Response } from "express";
import { Events } from "../entity/Events";
import { Team } from "../entity/Team";
import { getUserId } from "../utils/auth";

export class EventController {
    private eventRepository = getRepository(Events);

    async getEvents() {
        return this.eventRepository.find({
            date: MoreThanOrEqual(new Date()),
        });
    }

    async addEvent(req: Request, resp: Response) {
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
            typeof req.body.date === "undefined" ||
            typeof req.body.venue === "undefined" ||
            typeof req.body.speakers === "undefined" ||
            typeof req.body.link === "undefined" ||
            typeof req.body.tag === "undefined" ||
            typeof req.body.description === "undefined"
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

        const event = new Events();
        event.title = req.body.title;
        event.date = new Date(req.body.date);
        event.venue = req.body.venue;
        event.speakers = req.body.speakers;
        event.link = req.body.link;
        event.tag = req.body.tag;
        event.description = req.body.description;

        return this.eventRepository.save(event);
    }
}
