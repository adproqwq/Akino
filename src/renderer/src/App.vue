<script setup lang="ts">
import '@fontsource/material-icons';
import 'mdui/mdui.css';
import 'mdui';
import { useRouter } from 'vue-router';
import { Conf } from 'electron-conf/renderer';
import { onMounted } from 'vue';
import { setTheme } from 'mdui';

const router = useRouter();
const conf = new Conf();

onMounted(async () => {
  const theme = await conf.get('theme') as 'light' | 'dark' | 'followSystem';

  setTheme(theme === 'followSystem' ? 'auto' : theme);
});
</script>

<template>
  <main>
    <mdui-navigation-rail alignment="center" value="Home" divider>
      <mdui-navigation-rail-item value="Home" icon="home" @click="router.push('/')">
        {{ $t('nav.home') }}
      </mdui-navigation-rail-item>
      <mdui-navigation-rail-item value="Game" icon="videogame_asset" @click="router.push('/game')">
        {{ $t('nav.game') }}
      </mdui-navigation-rail-item>
      <mdui-navigation-rail-item value="Settings" icon="settings" @click="router.push('/settings')">
        {{ $t('nav.settings') }}
      </mdui-navigation-rail-item>
    </mdui-navigation-rail>
    <Suspense>
      <RouterView />
    </Suspense>
  </main>
</template>
