import { createUploadthing } from "uploadthing/server";
import type { FileRouter } from "uploadthing/server";
import { auth } from "./lucia.js";

const f = createUploadthing({
	errorFormatter: (err) => {
		console.log("Error uploading file", err.message);
		console.log("  - Above error caused by:", err.cause);

		return { message: err.message };
	},
});

const validate = async (req: Request) => {
	const cookieString = req.headers.get("cookie");

	if (!cookieString) return null;

	const cookies: { [key: string]: string } = {};

	cookieString.split(";").map((cookie) => {
		const [key, value] = cookie.split("=");

		cookies[key] = value;
	});

	if (!cookies["session"]) return null;

	const { user, session } = await auth.validateSession(cookies["session"]);

	return user;
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
	// Define as many FileRoutes as you like, each with a unique routeSlug
	imageUploader: f({ image: { maxFileSize: "4MB", acl: "public-read" } })
		// Set permissions and file types for this FileRoute
		.middleware(async ({ req }) => {
			// This code runs on your server before upload
			const user = await validate(req);

			// If you throw, the user will not be able to upload
			if (!user) throw new Error("Unauthorized");

			// Whatever is returned here is accessible in onUploadComplete as `metadata`
			return { userId: user.id };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			// This code runs on your server after upload
			console.log("Upload complete for userId:", metadata.userId);

			console.log("file url", file.url);
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
