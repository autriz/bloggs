import type { User } from "lucia";
import { writable, type Writable } from "svelte/store";

const store: Writable<User | undefined> = writable(undefined);

export default store;
