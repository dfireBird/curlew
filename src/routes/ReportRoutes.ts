import { ReportController } from "../controller/ReportController";

export const ReportRoutes = [
    {
        method: "post",
        route: "/report",
        controller: ReportController,
        action: "submitReport",
    },
    {
        method: "get",
        route: "/reports",
        controller: ReportController,
        action: "getAllReports",
    },
];
