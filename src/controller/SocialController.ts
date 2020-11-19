import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { getUserId } from "../utils/auth";
import { Team } from "../entity/Team";

export class SocialController {
    private teamRepository = getRepository(Team);

    async getSocial(req: Request, resp: Response) {
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

        if (req.query.name) {
            if (!user.lead) {
                resp.status(403).send("Not a lead");
                return;
            }
            const searchedTeamMem = await this.teamRepository.findOne({
                where: {
                    user: {
                        name: req.query.name,
                    },
                },
            });
            if (typeof searchedTeamMem === "undefined") {
                resp.status(404).send(
                    "The user searched for is not registered or not a team member."
                );
                return;
            }
            return {
                name: searchedTeamMem.user.name,
                google_account: searchedTeamMem.google_account,
                instagram: searchedTeamMem.instagram,
                twitter: searchedTeamMem.twitter,
                facebook: searchedTeamMem.facebook,
                github: searchedTeamMem.github,
                medium: searchedTeamMem.slack,
                discord: searchedTeamMem.discord,
            };
        }

        return {
            google_account: user.google_account,
            instagram: user.instagram,
            twitter: user.twitter,
            facebook: user.facebook,
            github: user.github,
            medium: user.slack,
            discord: user.discord,
        };
    }

    async postSocial(req: Request, resp: Response) {
        const userId = await getUserId(req, resp);
        if (typeof userId === "undefined") return;

        const currentUser = await this.teamRepository.findOne({
            where: {
                user: userId,
            },
            relations: ["user"],
        });
        if (typeof currentUser === "undefined") {
            resp.status(403).send("Not a team member");
            return;
        }

        if (!currentUser.lead) {
            resp.status(403).send("Not a lead");
            return;
        }

        if (typeof req.body.name === "undefined") {
            resp.status(400).send(
                "No field named 'name' in body. 'Name' field is required"
            );
            return;
        }

        const user = await this.teamRepository.findOne({
            where: {
                user: {
                    name: req.body.name,
                },
            },
        });

        if (typeof user === "undefined") {
            resp.status(404).send(
                "The user searched for is not registered or not a team member."
            );
            return;
        }

        user.instagram = req.body.instagram ?? user.instagram;
        user.twitter = req.body.twitter ?? user.twitter;
        user.facebook = req.body.facebook ?? user.facebook;
        user.github = req.body.github ?? user.github;
        user.medium = req.body.medium ?? user.medium;
        user.slack = req.body.slack ?? user.slack;
        user.discord = req.body.discord ?? user.discord;

        return this.teamRepository.save(user);
    }
}
