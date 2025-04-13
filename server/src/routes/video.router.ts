import { Router } from "express";
import { thumbnailsController } from "../controllers/media-controller";
import upload from "../middleware/multer";
import { validateVideo } from "../middleware/validate-video";

const videoRoute = Router();

videoRoute.post(
	"/thumbnails",
	upload.single("video"),
	validateVideo,
	thumbnailsController
);

export default videoRoute;
