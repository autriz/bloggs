<script lang="ts">
	import {
		SettingSection,
		TextInput,
		ImageInput,
	} from "$lib/components/settings/index.js";

	export let data;

	let avatarPreview: HTMLImageElement;
	let imageInput: HTMLInputElement;

	const handleUpload = async (
		e: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		},
	) => {
		const files = e.currentTarget.files;

		if (!files) return;

		const file = files[0];

		if (!file) return;

		const reader = new FileReader();

		reader.addEventListener("loadend", async () => {
			const base64 = reader.result;

			// err
			if (!base64) return;

			const form = new FormData();
			form.append("image", base64.toString());

			const res = await fetch(`/api/users/${data.userData!.id}/avatar`, {
				method: "POST",
				body: form,
			});

			if (res.status === 200) {
				data.userData!.avatar = base64.toString();
				avatarPreview.src = URL.createObjectURL(file);
			}
		});

		reader.readAsDataURL(file);
	};

	const handlePreview = (
		e: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		},
	) => {
		const files = e.currentTarget.files;

		if (files) {
			const file = files.item(0);

			if (file) {
				avatarPreview.src = URL.createObjectURL(file);
			}
		} else {
			avatarPreview.src = data.userData!.avatar ?? "";
		}
	};
</script>

<div
	class="mx-auto mt-2 flex w-full flex-col gap-1 md:w-[calc(100%_-_40px)] md:max-w-[1050px]"
>
	<SettingSection title="Профиль">
		<TextInput name="nickname" label="Никнейм" />
		<TextInput name="firstName" label="Имя" />
		<TextInput name="lastName" label="Фамилия" />
	</SettingSection>
	<SettingSection title="Аватар">
		<div class="flex flex-col flex-wrap items-center py-[10px]">
			<div>
				<img
					class="h-[200px] w-[200px]"
					bind:this={avatarPreview}
					src={data.userData?.avatar}
					alt="avatar preview"
				/>
			</div>
			<button
				class="bg-primary/80 hover:bg-primary mt-2 rounded-md px-[10px] py-[7px] text-sm font-bold transition-colors"
				on:click={() => imageInput.click()}
			>
				Сменить аватар
			</button>
			<input
				bind:this={imageInput}
				accept="image/*"
				type="file"
				class="hidden"
				on:change={(e) => handleUpload(e)}
			/>
		</div>
	</SettingSection>
	<SettingSection title="Почта">
		<TextInput
			name="currentPassword"
			label="Текущий пароль"
			type="password"
		/>
		<TextInput name="newEmail" label="Новая почта" type="email" />
		<TextInput
			name="confirmNewEmail"
			label="Подтвердите почту"
			type="email"
		/>
		<div class="pl-[160px]">
			<button
				class="bg-primary/80 hover:bg-primary rounded-md px-[10px] py-[7px] text-sm font-bold transition-colors"
				type="submit">Подтвердить</button
			>
		</div>
	</SettingSection>
	<SettingSection title="Пароль" method="POST">
		<TextInput
			name="currentPassword"
			label="Текущий пароль"
			type="password"
		/>
		<TextInput name="newPassword" label="Новый пароль" type="password" />
		<TextInput
			name="confirmNewPassword"
			label="Подтвердите пароль"
			type="password"
		/>
		<div class="pl-[160px]">
			<button
				class="bg-primary/80 hover:bg-primary rounded-md px-[10px] py-[7px] text-sm font-bold transition-colors"
				type="submit">Подтвердить</button
			>
		</div>
	</SettingSection>
</div>
