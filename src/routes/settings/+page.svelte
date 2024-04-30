<script lang="ts">
	import { goto } from "$app/navigation";
	import {
		SettingSection,
		SectionGroup,
		TextInput,
	} from "$lib/components/settings/index.js";
	import userStore from "$lib/stores/userStore.js";
	import { createUploadThing } from "$lib/utils/uploadthing.js";
	import { onDestroy } from "svelte";

	export let data;

	let imageInput: HTMLInputElement;

	let debouncedStores = {
		username: {
			timer: undefined,
			value: data.userData!.username,
		},
		firstName: {
			timer: undefined,
			value: data.userData!.firstName || "",
		},
		lastName: {
			timer: undefined,
			value: data.userData!.lastName || "",
		},
	};

	$: isUsernameChanging = false;
	$: isFirstNameChanging = false;
	$: isLastNameChanging = false;
	$: isImageUploading = false;
	$: isEmailChanging = false;
	$: isPasswordChanging = false;
	$: isAboutMeChanging = false;

	// const debounce = (name: string, value: string) => {
	// 	clearTimeout(timer);
	// 	timer = setTimeout(() => {
	// 		val = v;
	// 	}, 750);
	// };

	const { startUpload } = createUploadThing("imageUploader", {
		onClientUploadComplete: (res: any) => {
			userStore.update((user) => {
				if (!user)
					goto("/", { replaceState: true, invalidateAll: true });
				else {
					user.avatar = res[0].url;

					return user;
				}
			});

			const form = new FormData();
			form.append("avatar_url", res[0].url);

			fetch(`/api/account/avatar`, {
				method: "POST",
				body: form,
			});

			isImageUploading = false;
		},
		onUploadError: (err: Error) => {
			console.log(err);
			isImageUploading = false;
		},
	});

	const handleUpload = async (
		e: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		},
	) => {
		isImageUploading = true;

		const file = e.currentTarget.files?.[0];

		if (!file) {
			isImageUploading = false;
			return;
		}

		// Do something with files

		// Then start the upload
		await startUpload([file]);
	};

	const handleSubmit = (
		e: SubmitEvent & {
			currentTarget: EventTarget & HTMLFormElement;
		},
	) => {
		e.preventDefault();

		let temp: string;
		let isPasswordSubmit = e.currentTarget.action.includes("password");
		let isEmailSubmit = e.currentTarget.action.includes("email");

		if (isPasswordSubmit) {
			isPasswordChanging = true;
		} else if (isEmailSubmit) {
			isEmailChanging = true;
		} else {
			isAboutMeChanging = true;
		}

		let formData = new FormData(e.currentTarget);
		if (!isAboutMeChanging) e.currentTarget.reset();
		else temp = e.currentTarget.value;

		fetch(e.currentTarget.action, {
			method: "POST",
			body: formData,
		}).then((res) => {
			if (isPasswordSubmit) {
				isPasswordChanging = false;
			} else if (isEmailSubmit) {
				isEmailChanging = false;
			} else {
				data.userData!.aboutMe = temp;
				isAboutMeChanging = false;
			}
		});
	};

	const handleDebouncedChange = (
		name: "username" | "firstName" | "lastName",
		value: string,
	) => {
		const store = debouncedStores[name];

		if (value === store.value) return;

		store.value = value;
		clearTimeout(store.timer);

		// @ts-ignore
		store.timer = setTimeout(async () => {
			let formData = new FormData();
			formData.append(name, store.value);

			const res = await fetch(`/api/account/${name}`, {
				method: "POST",
				body: formData,
			});

			if (res.status === 200) {
				data.userData![name] = store.value;
			}

			switch (name) {
				case "username":
					isUsernameChanging = false;
					break;
				case "firstName":
					isFirstNameChanging = false;
					break;
				case "lastName":
					isLastNameChanging = false;
					break;
			}
		}, 750);

		switch (name) {
			case "username":
				isUsernameChanging = true;
				break;
			case "firstName":
				isFirstNameChanging = true;
				break;
			case "lastName":
				isLastNameChanging = true;
				break;
		}
	};

	onDestroy(() => {
		Object.values(debouncedStores).forEach((store) => {
			if (store.timer) clearTimeout(store.timer);
		});
	});
</script>

<div
	class="mx-auto my-2 flex w-full flex-col gap-1 md:w-[calc(100%_-_40px)] md:max-w-[1050px]"
>
	<SettingSection title="Профиль">
		<SectionGroup>
			<TextInput
				name="username"
				label="Никнейм"
				bind:value={debouncedStores["username"].value}
				on:keyup={(v) =>
					handleDebouncedChange("username", v.currentTarget.value)}
			>
				<div>
					{#if isUsernameChanging}
						<p class="pointer-events-none pl-2 text-sm">
							Loading...
						</p>
					{/if}
				</div>
			</TextInput>
		</SectionGroup>
		<SectionGroup>
			<TextInput
				name="firstName"
				label="Имя"
				bind:value={debouncedStores["firstName"].value}
				on:keyup={(v) =>
					handleDebouncedChange("firstName", v.currentTarget.value)}
			>
				<div>
					{#if isFirstNameChanging}
						<p class="pointer-events-none pl-2 text-sm">
							Loading...
						</p>
					{/if}
				</div>
			</TextInput>
			<TextInput
				name="lastName"
				label="Фамилия"
				bind:value={debouncedStores["lastName"].value}
				on:keyup={(v) =>
					handleDebouncedChange("lastName", v.currentTarget.value)}
			>
				<div>
					{#if isLastNameChanging}
						<p class="pointer-events-none pl-2 text-sm">
							Loading...
						</p>
					{/if}
				</div>
			</TextInput>
		</SectionGroup>
	</SettingSection>
	<SettingSection title="Аватар">
		<SectionGroup>
			<div class="ml-[160px] flex w-fit flex-col flex-wrap py-[10px]">
				<div>
					<img
						class="h-[200px] w-[200px] rounded-sm"
						src={$userStore?.avatar}
						alt="avatar preview"
					/>
				</div>
				<button
					disabled={isImageUploading}
					class="mt-2 w-fit self-center rounded-md bg-primary/80 px-[10px] py-[7px] text-sm font-bold transition-colors hover:bg-primary disabled:bg-primary/60"
					on:click={() => imageInput.click()}
				>
					{#if isImageUploading}
						Подождите...
					{:else}
						Сменить аватар
					{/if}
				</button>
				<input
					bind:this={imageInput}
					accept="image/*"
					type="file"
					class="hidden"
					on:change={(e) => handleUpload(e)}
				/>
			</div>
		</SectionGroup>
	</SettingSection>
	<SettingSection
		title="О себе"
		method="POST"
		action="/api/account/about-me"
		on:submit={handleSubmit}
	>
		<SectionGroup>
			<textarea name="content" class="m-3 outline-none">
				{data.userData?.aboutMe ?? ""}
			</textarea>
		</SectionGroup>
		<SectionGroup>
			<div class="pl-[160px]">
				<button
					disabled={isAboutMeChanging}
					class="rounded-md bg-primary/80 px-[10px] py-[7px] text-sm font-bold transition-colors hover:bg-primary"
					type="submit"
				>
					{#if isAboutMeChanging}
						Подождите...
					{:else}
						Подтвердить
					{/if}
				</button>
			</div>
		</SectionGroup>
	</SettingSection>
	<SettingSection
		title="Почта"
		method="POST"
		action="/api/account/email"
		on:submit={handleSubmit}
	>
		<SectionGroup>
			<TextInput
				name="currentPassword"
				label="Текущий пароль"
				type="password"
				autocomplete="off"
				required
			/>
		</SectionGroup>
		<SectionGroup>
			<TextInput
				name="newEmail"
				label="Новая почта"
				type="email"
				required
			/>
			<TextInput
				name="newEmailConfirm"
				label="Подтвердите почту"
				type="email"
				required
			/>
		</SectionGroup>
		<SectionGroup>
			<div class="pl-[160px]">
				<button
					disabled={isEmailChanging}
					class="rounded-md bg-primary/80 px-[10px] py-[7px] text-sm font-bold transition-colors hover:bg-primary"
					type="submit"
				>
					{#if isEmailChanging}
						Подождите...
					{:else}
						Подтвердить
					{/if}
				</button>
			</div>
		</SectionGroup>
	</SettingSection>
	<SettingSection
		title="Пароль"
		method="POST"
		action="/api/account/password"
		on:submit={handleSubmit}
	>
		<SectionGroup>
			<TextInput
				name="currentPassword"
				label="Текущий пароль"
				type="password"
				autocomplete="off"
				required
			/>
		</SectionGroup>
		<SectionGroup>
			<TextInput
				name="newPassword"
				label="Новый пароль"
				type="password"
				required
			/>
			<TextInput
				name="newPasswordConfirm"
				label="Подтвердите пароль"
				type="password"
				required
			/>
		</SectionGroup>
		<SectionGroup>
			<div class="pl-[160px]">
				<button
					disabled={isPasswordChanging}
					class="rounded-md bg-primary/80 px-[10px] py-[7px] text-sm font-bold transition-colors hover:bg-primary"
					type="submit"
				>
					{#if isPasswordChanging}
						Подождите...
					{:else}
						Подтвердить
					{/if}
				</button>
			</div>
		</SectionGroup>
	</SettingSection>
</div>
