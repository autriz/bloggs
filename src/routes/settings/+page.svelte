<script lang="ts">
	import {
		SettingSection,
		TextInput,
		ImageInput,
	} from "$lib/components/settings/index.js";
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
		<div class="flex flex-wrap items-center py-[10px]">
			<div>Preview</div>
			<input type="file" />
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
