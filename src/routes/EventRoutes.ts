import { EventController } from "../controller/EventController";
export const EventRoutes = [
    {
        method: "post",
        route: "/event",
        controller: EventController,
        action: "addEvent",
    },
    {
        method: "get",
        route: "/events",
        controller: EventController,
        action: "getEvents",
    },
];
