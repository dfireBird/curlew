import { AuthRoutes } from "./AuthRoutes";

export interface IRoute {
    method: string;
    route: string;
    controller: Function;
    action: string;
}

export const Routes = [];

export { AuthRoutes };
