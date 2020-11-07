import "reflect-metadata";
import { createConnection } from "typeorm";
import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { IRoute, Routes } from "./routes";

// prettier-ignore
createConnection().then(async connection => {

    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(morgan('dev'));

    // prettier-ignore
    const registerRoute = (route: IRoute) => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    }

    Routes.forEach(registerRoute)
    app.listen(3000);

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => console.log(error));
