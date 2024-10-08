import type { OurFileRouter } from "$lib/server/uploadthing.js";

import { generateSvelteHelpers } from "@uploadthing/svelte";

export const { createUploader, createUploadThing } =
	generateSvelteHelpers<OurFileRouter>();
