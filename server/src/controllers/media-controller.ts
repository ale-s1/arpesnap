import { NextFunction, Request, Response } from "express";
import fs from "node:fs";
import {
	generateThumbnails,
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
			return res.status(400).send("No file uploaded");
		}
		const meta = await getVideoMetadata(file.path);
		const thumbnails = await generateThumbnails(file.path, meta.duration);
		fs.unlinkSync(file.path);
		res.json({
			thumbnails,
		});
	} catch (error) {
		next(error);
	}
}
