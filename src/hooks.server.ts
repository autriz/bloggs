import { sequence } from "@sveltejs/kit/hooks";
import * as Sentry from "@sentry/sveltekit";
import { auth } from "$lib/server/lucia.js";
import userStore from "$lib/stores/userStore.js";
import type { Handle } from "@sveltejs/kit";

Sentry.init({
	dsn: "https://6a3a8ba927ed83d289c14d08711e2123@o4507109049368576.ingest.de.sentry.io/4507109051662416",
	tracesSampleRate: 1.0,
	profilesSampleRate: 1.0,
});

export const handle: Handle = sequence(
	Sentry.sentryHandle(),
	async ({ event, resolve }) => {
		const sessionId = event.cookies.get(auth.sessionCookieName);
		if (!sessionId) {
			event.locals.userData = null;
			event.locals.session = null;

			return resolve(event);
		}

		const { session, user } = await auth.validateSession(sessionId);
		if (session && session.fresh) {
			const sessionCookie = auth.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: ".",
				...sessionCookie.attributes,
			});
		}
		if (!session) {
			const sessionCookie = auth.createBlankSessionCookie();
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: ".",
				...sessionCookie.attributes,
			});
		}
		event.locals.userData = user;
		event.locals.session = session;

		userStore.set(user ?? undefined);

		return await resolve(event);
	},
);
export const handleError = Sentry.handleErrorWithSentry();
