import { Router } from "express";
import {
	extractAudio,
	thumbnailsController,
} from "../controllers/media-controller";
import upload from "../middleware/multer";
import { validateVideo } from "../middleware/validate-video";

const videoRoute = Router();

videoRoute.post(
	"/thumbnails",
	upload.single("video"),
	validateVideo,
	thumbnailsController
);

videoRoute.post(
	"/extract-audio",
	upload.single("file"),
	validateVideo,
	extractAudio
);

export default videoRoute;
