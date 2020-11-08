import { OAuth2Client } from "google-auth-library";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Team } from "../entity/Team";

export async function getUserId(req: Request, resp: Response) {
    const auth_header = req.headers.authorization;
    if (auth_header === undefined) {
        resp.status(401).send("No Authetication Header");
        return;
    }
    if (!auth_header.includes("Bearer ")) {
        resp.status(401).send("Wrong Authentication method");
        return;
    }

    const token = auth_header.replace("Bearer ", "");
    const client = new OAuth2Client(process.env.CLIENT_ID);
    const payload = (
        await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID,
        })
    ).getPayload();
    if (payload === undefined) {
        resp.status(401).send("Authorization Invalid");
        return;
    }

    return payload.sub;
}
export async function isLead(req: Request, resp: Response) {
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
