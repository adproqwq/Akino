<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
defineEmits([ 'yes', 'no' ]);
</script>

<template>
  <mdui-dialog :headline="$t('game.game.won.name', { name })" :description="description" open>
    <mdui-button slot="action" variant="text" @click="$emit('no')">
      {{ $t('game.game.won.no') }}
    </mdui-button>
    <mdui-button slot="action" variant="tonal" @click="$emit('yes')">
      {{ $t('game.game.won.yes') }}
    </mdui-button>
  </mdui-dialog>
</template>