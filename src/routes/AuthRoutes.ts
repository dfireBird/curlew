import { AuthController } from "../controller/AuthController";

export const AuthRoutes = [
    {
        method: "post",
        route: "/auth",
        controller: AuthController,
        action: "auth",
    },
];
