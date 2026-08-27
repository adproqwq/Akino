<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { type SegmentedButtonGroupEventMap, type SegmentedButtonGroup, snackbar } from 'mdui';
import type { WinResult, AnswerResult, Answers } from 'akinator-client';
import WonDialog from '@renderer/components/WonDialog.vue';

const { t } = useI18n();
const router = useRouter();

const question = ref('');
const step = ref<number>();
const isWon = ref(false);
const winResult = ref<WinResult>();
const options = [
  t('game.game.option.yes'),
  t('game.game.option.no'),
  t('game.game.option.dontKnow'),
  t('game.game.option.probably'),
  t('game.game.option.probablyNot'),
];

const updateInfos = (result: AnswerResult) => {
  question.value = result.question;
  step.value = result.step + 1; // step starts from 0
};

const onAnswer = async (event: SegmentedButtonGroupEventMap['change']) => {
  const target = event.target as SegmentedButtonGroup;
  if(!target.value) return; // ignore the change event triggered by restoring button status

  try{
    const index = (Number(target.value as string) - 1) as Answers;

    snackbar({
      message: t('game.game.tips'),
      placement: 'top',
    });

    const result = await akino.answer(index);
    console.log(result);

    if(result.ko){
      snackbar({
        message: t('game.game.ko'),
        placement: 'top',
        onClosed: () => router.push('/game'),
      });
    }
    else if(result.won){
      winResult.value = await akino.getWinReuslt();
      isWon.value = true;
    }
    else updateInfos(result);
  } finally{
    target.value = '';
  }
};

const onWonYes = () => {
  akino.submitWin();
  router.push('/game');
};

const onWonNo = async () => {
  isWon.value = false;
  const infos = await akino.gameContinue();
  updateInfos(infos);
};

const first = await akino.getFirstQuestion();
updateInfos(first);
</script>

<template>
  <div class="qa-container">
    <div class="question-area">
      <div>
        <span>{{ $t('game.game.step', { step }) }}</span>
        <h2>{{ question }}</h2>
      </div>
    </div>

    <div class="answer-area">
      <mdui-segmented-button-group
        selects="single"
        class="answer-group"
        @change="onAnswer"
      >
        <mdui-segmented-button
          full-width
          v-for="(option, index) in options"
          :key="option"
          :value="index + 1"
        >
          {{ option }}
        </mdui-segmented-button>
      </mdui-segmented-button-group>
    </div>
  </div>
  <WonDialog
    v-if="isWon"
    :name="winResult!.name"
    :description="winResult!.description"
    @yes="onWonYes"
    @no="onWonNo"
  ></WonDialog>
</template>

<style scoped>
.qa-container {
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  position: relative;
}

.question-area {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

div > h2 {
  margin: 0;
  font-size: 4vw;
  font-weight: 600;
  line-height: 1.4;
}

.answer-area {
  width: 100%;
  flex-shrink: 0;
}

.answer-group {
  width: 100%;
}
</style>