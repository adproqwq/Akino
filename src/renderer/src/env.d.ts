/// <reference types="vite/client" />
/// <reference types="vue-router/auto" />

declare namespace akino {
  const start: (
    language: import('akinator-client').Languages,
    theme: import('akinator-client').Themes,
  ) => void;
  const getFirstQuestion: () => Promise<import('akinator-client').AnswerResult>;
  const answer: (answer: import('akinator-client').Answers) => Promise<import('akinator-client').AnswerResult>;
  const getWinReuslt: () => Promise<import('akinator-client').WinResult>;
  const submitWin: () => void;
  const gameContinue: () => Promise<import('akinator-client').AnswerResult>;
}
