import { AuthRoutes } from "./AuthRoutes";
import { AvailabilityRoutes } from "./AvailabilityRoutes";

export interface IRoute {
    method: string;
    route: string;
    controller: Function;
    action: string;
}

export const Routes = [];

export { AuthRoutes, AvailabilityRoutes };
