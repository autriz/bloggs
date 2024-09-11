This is a project developed during the course of writing a term paper using SvelteKit Turso Drizzle template with Sentry.

> [!WARNING]
> This project does not have localization and written in my native language and has some bugs.

# SvelteKit Turso Drizzle

## Setup Turso

Follow the steps to setup your Turso development database (Using Turso for dev and prod seems like a good idea).

## Setup Sentry

Follow this [install guide](https://docs.sentry.io/platforms/javascript/guides/sveltekit/#install).

## Add a .env file with the correct values

## Developing

Once you've created a project and installed dependencies with `pnpm install`, start a development server:

```bash
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

## Building

To create a production version of your app:

```bash
pnpm run build
```

You can preview the production build with `pnpm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Generate SQL migrations

```bash
pnpm run drizzle-generate
```

## Run SQL migrations

```bash
pnpm run migrate
```
