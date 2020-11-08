import { AuthRoutes } from "./AuthRoutes";
import { AvailabilityRoutes } from "./AvailabilityRoutes";
import { ReportRoutes } from "./ReportRoutes";
import { SocialRoutes } from "./SocialRoutes";
import { EventRoutes } from "./EventRoutes";
import { ImageRoutes } from "./ImageRoutes";
import { ResourcesRoutes } from "./ResourcesRoutes";
import { TeamRoutes } from "./TeamRoutes";

export interface IRoute {
    method: string;
    route: string;
    controller: Function;
    action: string;
}

export const Routes = [
    ...AuthRoutes,
    ...AvailabilityRoutes,
    ...ReportRoutes,
    ...SocialRoutes,
    ...EventRoutes,
    ...ImageRoutes,
    ...ResourcesRoutes,
    ...TeamRoutes,
];
