<script setup lang="ts">
import { ref } from 'vue';
import { Conf } from 'electron-conf/renderer';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import type { Languages as AkinatorLanguages, Themes as AkinatorThemes } from 'akinator-client';
import type { SegmentedButtonGroupEventMap, SegmentedButtonGroup, RadioGroupEventMap, RadioGroup } from 'mdui';

const Languages = {
  English: 'en' as AkinatorLanguages,
  Chinese: 'cn' as AkinatorLanguages,
  Japanese: 'jp' as AkinatorLanguages,
};

const Themes = {
  Character: 1 as AkinatorThemes,
  Objects: 2 as AkinatorThemes,
  Animals: 14 as AkinatorThemes,
};

const AVAILABLE_THEMES: Record<string, readonly AkinatorThemes[]> = {
  [Languages.Chinese]: [Themes.Character],
  [Languages.English]: [Themes.Character, Themes.Animals, Themes.Objects],
  [Languages.Japanese]: [Themes.Character, Themes.Animals],
};

const conf = new Conf();
const { t } = useI18n();
const router = useRouter();

const appLanguage = ref(await conf.get('lang', 'zh-CN') as string);

// 数据定义
const languages = ref([
  { value: Languages.Chinese, label: new Intl.DisplayNames([appLanguage.value], { type: 'language' }).of('zh') },
  { value: Languages.English, label: new Intl.DisplayNames([appLanguage.value], { type: 'language' }).of('en') },
  { value: Languages.Japanese, label: new Intl.DisplayNames([appLanguage.value], { type: 'language' }).of('ja') },
]);

const themes = [
  { value: Themes.Character, label: t('game.settings.theme.character') },
  { value: Themes.Objects, label: t('game.settings.theme.objects') },
  { value: Themes.Animals, label: t('game.settings.theme.animals') },
];

const language = ref(Languages.Chinese);
const theme = ref(Themes.Character);

const onLanguageChange = (event: SegmentedButtonGroupEventMap['change']) => {
  language.value = (event.target as SegmentedButtonGroup).value as AkinatorLanguages;
};

const onThemeChange = (event: RadioGroupEventMap['change']) => {
  theme.value = Number((event.target as RadioGroup).value) as AkinatorThemes;
};

const start = () => {
  akino.start(language.value, theme.value);
  router.push('/game/game');
};
</script>

<template>
  <div class="settings-container">
    <div>
      <h1 class="title">{{ $t('game.settings.title') }}</h1>

      <div class="setting-group">
        <label class="setting-label">{{ $t('game.settings.language') }}</label>
        <mdui-segmented-button-group
          selects="single"
          :value="language"
          @change="onLanguageChange"
        >
          <mdui-segmented-button
            v-for="lang in languages"
            :key="lang.value"
            :value="lang.value"
          >
            {{ lang.label }}
          </mdui-segmented-button>
        </mdui-segmented-button-group>
      </div>

      <div class="setting-group">
        <label class="setting-label">{{ $t('game.settings.theme.title') }}</label>
        <mdui-radio-group
          :value="theme"
          @change="onThemeChange"
        >
          <mdui-radio
            v-for="t in themes"
            :key="t.value"
            :value="t.value"
            :disabled="!AVAILABLE_THEMES[language].includes(t.value)"
          >
            {{ t.label }}
          </mdui-radio>
        </mdui-radio-group>
      </div>

      <mdui-button
        variant="filled"
        class="start-btn"
        @click="start"
      >
        {{ $t('game.settings.start') }}
      </mdui-button>
    </div>
  </div>
</template>

<style scoped>
.settings-container {
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 32px;
  letter-spacing: 1px;
}

.setting-group {
  margin-bottom: 28px;
}

.setting-label {
  display: block;
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 12px;
}

/* 分段按钮组自适应宽度 */
mdui-segmented-button-group {
  width: 100%;
}

/* 单选按钮组调整间距 */
mdui-radio-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

mdui-radio {
  padding: 4px 0;
}

/* 开始按钮 */
.start-btn {
  width: 100%;
  margin-top: 12px;
  font-weight: 600;
  font-size: 1.1rem;
}
</style>