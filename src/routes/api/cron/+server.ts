import { error } from "@sveltejs/kit";
import { auth } from "$lib/server/lucia.js";
import { CRON_SECRET } from "$env/static/private";

export async function GET(req) {
	const authHeader = req.request.headers.get("authorization");

	if (!CRON_SECRET || authHeader !== `Bearer ${CRON_SECRET}`)
		return error(401);

	auth.deleteExpiredSessions();

	return new Response();
}
