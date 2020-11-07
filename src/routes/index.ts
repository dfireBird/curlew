import { AuthRoutes } from "./AuthRoutes";
import { AvailabilityRoutes } from "./AvailabilityRoutes";
import { ReportRoutes } from "./ReportRoutes";
import { SocialRoutes } from "./SocialRoutes";

export interface IRoute {
    method: string;
    route: string;
    controller: Function;
    action: string;
}

export const Routes = [];

export { AuthRoutes, AvailabilityRoutes, ReportRoutes, SocialRoutes };
