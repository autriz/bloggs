<script lang="ts">
	import {
		SettingSection,
		SectionGroup,
		TextInput,
	} from "$lib/components/settings/index.js";
	import avatarStore from "$lib/stores/avatarStore.js";
	import { useUploadThing } from "$lib/utils/uploadthing.js";

	export let data;

	let imageInput: HTMLInputElement;

	$: isImageUploading = false;
	$: isEmailChanging = false;
	$: isPasswordChanging = false;

	const { startUpload } = useUploadThing("imageUploader", {
		onClientUploadComplete: (res: any) => {
			avatarStore.set(res[0].url);

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

		let isPasswordSubmit = e.currentTarget.action.includes("password");

		if (isPasswordSubmit) {
			isPasswordChanging = true;
		} else {
			isEmailChanging = true;
		}

		let formData = new FormData(e.currentTarget);
		e.currentTarget.reset();

		fetch(e.currentTarget.action, {
			method: "POST",
			body: formData,
		}).then((res) => {
			if (isPasswordSubmit) {
				isPasswordChanging = false;
			} else {
				isEmailChanging = false;
			}
		});
	};

	const handleChange = (name: string, value: string) => {
		console.log(name, value);
	};
</script>

<div
	class="mx-auto my-2 flex w-full flex-col gap-1 md:w-[calc(100%_-_40px)] md:max-w-[1050px]"
>
	<SettingSection title="Профиль">
		<SectionGroup>
			<TextInput
				name="username"
				label="Никнейм"
				value={data.userData?.username}
				on:keyup={(v) =>
					handleChange("username", v.currentTarget.value)}
			/>
		</SectionGroup>
		<SectionGroup>
			<TextInput
				name="firstName"
				label="Имя"
				value={data.userData?.firstName}
				on:keyup={(v) =>
					handleChange("firstName", v.currentTarget.value)}
			/>
			<TextInput
				name="lastName"
				label="Фамилия"
				value={data.userData?.lastName}
				on:keyup={(v) =>
					handleChange("lastName", v.currentTarget.value)}
			/>
		</SectionGroup>
	</SettingSection>
	<SettingSection title="Аватар">
		<SectionGroup>
			<div class="ml-[160px] flex w-fit flex-col flex-wrap py-[10px]">
				<div>
					<img
						class="h-[200px] w-[200px] rounded-sm"
						src={$avatarStore}
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
