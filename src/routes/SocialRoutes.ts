import { SocialController } from "../controller/SocialController";

export const SocialRoutes = [
    {
        method: "post",
        route: "/social",
        controller: SocialController,
        action: "postSocial",
    },
    {
        method: "get",
        route: "/social",
        controller: SocialController,
        action: "getSocial",
    },
];
