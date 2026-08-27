import { contextBridge, ipcRenderer } from 'electron';
import { exposeConf } from 'electron-conf/preload';
import type { Languages, Themes, AnswerResult, Answers, WinResult } from 'akinator-client';

try{
  exposeConf();
  contextBridge.exposeInMainWorld('akino', {
    start: (
      language: Languages,
      theme: Themes,
    ) => ipcRenderer.send('akino.start', language, theme),
    getFirstQuestion: (): Promise<AnswerResult> => ipcRenderer.invoke('akino.getFirstQuestion'),
    answer: (answer: Answers): Promise<AnswerResult> => ipcRenderer.invoke('akino.answer', answer),
    getWinReuslt: (): Promise<WinResult> => ipcRenderer.invoke('akino.getWinResult'),
    submitWin: () => ipcRenderer.send('akino.submitWin'),
    gameContinue: (): Promise<AnswerResult> => ipcRenderer.invoke('akino.gameContinue'),
  });
} catch(error){
  console.error(error);
}
