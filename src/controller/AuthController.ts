import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import { User } from "../entity/User";

export class AuthController {
    private client = new OAuth2Client(process.env.CLIENT_ID);
    private userRepository = getRepository(User);

    async auth(req: Request, resp: Response) {
        if (req.body.id_token === undefined) {
            resp.status(400).send("No id_token key present");
            return;
        }
        const ticket = await this.client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.CLIENT_ID,
        });
        const payload = ticket.getPayload();

        if (payload === undefined) {
            resp.status(400).send("Wrong id_token given");
            return;
        }

        if (payload.aud !== process.env.CLIENT_ID) {
            resp.status(400).send("The client_id is not the same");
            return;
        }

        const user = await this.userRepository.findOne(payload.sub);

        if (user === undefined) {
            const user = this.userRepository.create({
                email: payload.email ?? "",
                name: payload.name ?? "",
                id: payload.sub,
            });

            return this.userRepository.save(user);
        }
        return user;
    }
}
