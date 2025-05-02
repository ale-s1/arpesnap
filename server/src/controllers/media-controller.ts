import { NextFunction, Request, Response } from "express";
import fs from "node:fs";
import {
	generateThumbnails,
	getExtractedAudio,
	getVideoMetadata,
} from "../services/videoService/video-service";

export async function thumbnailsController(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<any> {
	try {
		const file = req.file;
		if (!file) {
			return res.status(400).send("Please upload a video file");
		}
		const meta = await getVideoMetadata(file.path);
		const thumbnails = await generateThumbnails(file.path, meta.duration);
		fs.unlinkSync(file.path);
		res.json({
			message: "Video processed successfully",
			thumbnails,
		});
	} catch (error) {
		next(error);
	}
}

export async function extractAudio(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<any> {
	try {
		const file = req.file;
		if (!file) {
			return res.status(400).send("Please upload a video file");
		}
		const audio = await getExtractedAudio(file.path);
		res.send(audio);
	} catch (error) {
		next(error);
	}
}
