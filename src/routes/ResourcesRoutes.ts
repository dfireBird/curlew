import { ResourcesContoller } from "../controller/ResourcesController";

export const ResourcesRoutes = [
    {
        method: "get",
        route: "/resources",
        controller: ResourcesContoller,
        action: "getResources",
    },
    {
        method: "post",
        route: "/resource",
        controller: ResourcesContoller,
        action: "addResource",
    },
];
