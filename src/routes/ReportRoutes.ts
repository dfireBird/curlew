import { ReportController } from "../controller/ReportController";

export const ReportRoutes = [
    {
        method: "post",
        route: "/report",
        controller: ReportController,
        action: "submitReport",
    },
];
