<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Conf } from 'electron-conf/renderer';
import { type MenuEventMap, type Menu, setTheme, type ButtonIcon, snackbar } from 'mdui';

const { locale, t } = useI18n();

const conf = new Conf();

const lang = ref(await conf.get('lang', 'zh-CN') as string);
const theme = ref(await conf.get('theme', 'followSystem') as 'light' | 'dark' | 'followSystem');
const proxy = ref(await conf.get('proxy') as string | undefined);

const setLanguage = async (event: MenuEventMap['change']) => {
  const target = event.target as Menu;
  const value = target.value as string;

  await conf.set('lang', value);
  lang.value = value;
  locale.value = value;
};

const setConfigTheme = async (event: MenuEventMap['change']) => {
  const target = event.target as Menu;
  const value = target.value as 'light' | 'dark' | 'followSystem';

  await conf.set('theme', value);
  theme.value = value;
  setTheme(value === 'followSystem' ? 'auto' : value);
};

const setProxy = async (event: MouseEvent) => {
  const target = event.target as ButtonIcon;
  const textfield = target.closest('mdui-text-field')!;
  const value = textfield.value;

  await conf.set('proxy', value);
  proxy.value = value;

  snackbar({
    message: t('settings.proxy.tips'),
    placement: 'top',
  });
};
</script>

<template>
  <div class="settings-page">
    <mdui-list>
      <mdui-list-subheader>{{ $t('settings.common.title') }}</mdui-list-subheader>

      <mdui-dropdown placement="bottom-end">
        <mdui-list-item
          slot="trigger"
          icon="language"
          rounded
        >
          {{ $t('settings.common.language') }}
          <span slot="description">{{ new Intl.DisplayNames([lang], { type: 'language' }).of(lang) }}</span>
        </mdui-list-item>
        <mdui-menu selects="single" :value="lang" @change="setLanguage($event)">
          <mdui-menu-item value="zh-CN">
            {{ new Intl.DisplayNames([lang], { type: 'language' }).of('zh-CN') }}
          </mdui-menu-item>
          <mdui-menu-item value="en-US">
            {{ new Intl.DisplayNames([lang], { type: 'language' }).of('en-US') }}
          </mdui-menu-item>
        </mdui-menu>
      </mdui-dropdown>
      <mdui-dropdown placement="bottom-end">
        <mdui-list-item
          slot="trigger"
          icon="dark_mode"
          rounded
        >
          {{ $t('settings.common.theme.title') }}
          <span slot="description">{{ $t(`settings.common.theme.${theme}`) }}</span>
        </mdui-list-item>
        <mdui-menu selects="single" :value="theme" @change="setConfigTheme($event)">
          <mdui-menu-item value="light">{{ $t('settings.common.theme.light') }}</mdui-menu-item>
          <mdui-menu-item value="dark">{{ $t('settings.common.theme.dark') }}</mdui-menu-item>
          <mdui-menu-item value="followSystem">{{ $t('settings.common.theme.followSystem') }}</mdui-menu-item>
        </mdui-menu>
      </mdui-dropdown>

      <mdui-list-subheader>{{ $t('settings.proxy.title') }}</mdui-list-subheader>

      <mdui-list-item
        icon="public"
        rounded
      >
        {{ $t('settings.proxy.proxy') }}
        <mdui-text-field
          slot="end-icon"
          variant="outlined"
          placeholder="http://{proxy}:{port}"
          :label="$t('settings.proxy.proxy')"
          :value="proxy"
          clearable
        >
          <mdui-button-icon slot="end-icon" icon="check" @click="setProxy($event)"></mdui-button-icon>
        </mdui-text-field>
        <span slot="description">{{ proxy }}</span>
      </mdui-list-item>

      <mdui-list-subheader>{{ $t('settings.others.title') }}</mdui-list-subheader>

      <mdui-list-item
        icon="info"
        href="https://github.com/adproqwq/Akino"
        target="_blank"
        rounded
      >
        {{ $t('settings.others.about') }}
        <span slot="description">1.0.0</span>
      </mdui-list-item>
    </mdui-list>
  </div>
</template>

<style scoped>
.settings-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
}
</style>