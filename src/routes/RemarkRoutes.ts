import { RemarkController } from "../controller/RemarkController";
export const RemarkRoutes = [
    {
        method: "get",
        route: "/remarks",
        controller: RemarkController,
        action: "getRemarks",
    },
    {
        method: "post",
        route: "/remark",
        controller: RemarkController,
        action: "addRemark",
    },
];
