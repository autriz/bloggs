import { error } from "@sveltejs/kit";
import { auth } from "$lib/server/lucia.js";

export async function GET(req) {
	const authHeader = req.request.headers.get("authorization");

	if (
		process.env.CRON_SECRET ||
		authHeader !== `Bearer ${process.env.CRON_SECRET}`
	)
		return error(401);

	auth.deleteExpiredSessions();

	return new Response();
}
