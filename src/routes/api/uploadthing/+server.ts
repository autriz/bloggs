import { env } from "$env/dynamic/private";
import { auth } from "$lib/server/lucia.js";
import { ourFileRouter } from "$lib/server/uploadthing.js";
import { error } from "@sveltejs/kit";

import { createRouteHandler } from "uploadthing/server";

// The Svelte extension complains if you export the handlers directly
const { GET, POST } = createRouteHandler({
	router: ourFileRouter,
	config: {
		callbackUrl: `http://localhost:${env.PORT ?? 5173}/api/uploadthing`,
		uploadthingId: env.UPLOADTHING_APP_ID,
		uploadthingSecret: env.UPLOADTHING_SECRET,
		logLevel: "error",
	},
});

export { GET, POST };
