import Ffmpeg from "fluent-ffmpeg";
import { toTimeString } from "../../utils/utils";
import { VideoMetadata } from "./video.types";

export function getVideoMetadata(filePath: string): Promise<VideoMetadata> {
	return new Promise((resolve, reject) => {
		Ffmpeg(filePath).ffprobe(0, (err, metadata) => {
			if (err) {
				reject(err);
			}
			const { width, height } = metadata.streams[0];
			const meta: VideoMetadata = {
				duration: metadata.format.duration || 0,
				format: metadata.format.format_name,
				width: width,
				height: height,
			};
			resolve(meta);
		});
	});
}

export async function generateThumbnails(filePath: string, duration: number) {
	const maxNumberImages = 15;
	const numberOfFrames = Math.min(duration, maxNumberImages);
	const offset = duration === maxNumberImages ? 1 : duration / numberOfFrames;
	const thumbnails: string[] = [];

	for (let i = 0; i < numberOfFrames; i++) {
		const startTimeInSecs = toTimeString(Math.round(i * offset));
		const base64Image = await getThumbnailInMemory(filePath, startTimeInSecs);
		thumbnails.push(base64Image);
	}
	return thumbnails;
}

export async function getThumbnailInMemory(
	filePath: string,
	startTimeInSecs: string
): Promise<string> {
	return new Promise((resolve, reject) => {
		const buffers: Buffer[] = [];

		const command = Ffmpeg(filePath)
			.seekInput(startTimeInSecs)
			.frames(1)
			.outputFormat("image2pipe")
			.videoCodec("mjpeg")
			.on("progress", (progress) => {
				if (progress.percent) {
					console.log(`Processing: ${Math.floor(progress.percent)}% done`);
				}
			})
			.on("error", reject)
			.on("end", () => {
				const imageBuffer = Buffer.concat(buffers);
				const base64Image = imageBuffer.toString("base64");
				resolve(`data:image/jpeg;base64,${base64Image}`);
			});
		const stream = command.pipe();
		stream.on("data", (chunk: Buffer) => buffers.push(chunk));
	});
}
