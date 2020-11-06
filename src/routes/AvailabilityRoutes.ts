import { AvailabilityController } from "../controller/AvailabilityController";
export const AvailabilityRoutes = [
    {
        method: "get",
        route: "/availability",
        controller: AvailabilityController,
        action: "getAvail",
    },
    {
        method: "post",
        route: "/availability",
        controller: AvailabilityController,
        action: "postAvail",
    },
    {
        method: "get",
        route: "/availability/desc",
        controller: AvailabilityController,
        action: "getAvailDesc",
    },
    {
        method: "post",
        route: "/availability/desc",
        controller: AvailabilityController,
        action: "postAvailDesc",
    },
];
