import { ImageController } from "../controller/ImageController";

export const ImageRoutes = [
    {
        method: "get",
        route: "/images",
        controller: ImageController,
        action: "getImages",
    },
    {
        method: "post",
        route: "/image",
        controller: ImageController,
        action: "addImage",
    },
];
