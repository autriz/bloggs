import { sentrySvelteKit } from "@sentry/sveltekit";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
	plugins: [
		sentrySvelteKit({
			sourceMapsUploadOptions: {
				org: "autriz",
				project: "javascript-sveltekit",
			},
		}),
		sveltekit(),
		nodePolyfills({ include: ["path"] }),
	],
});
