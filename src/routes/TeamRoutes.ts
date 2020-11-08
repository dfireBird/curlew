import { TeamController } from "../controller/TeamController";
export const TeamRoutes = [
    {
        method: "get",
        route: "/team",
        controller: TeamController,
        action: "getTeamMembers",
    },
    {
        method: "post",
        route: "/team",
        controller: TeamController,
        action: "addTeamMember",
    },
];
