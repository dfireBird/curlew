import { OAuth2Client } from "google-auth-library";
import { Request, Response } from "express";

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
