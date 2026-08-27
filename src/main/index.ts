import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'node:path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import { Conf } from 'electron-conf/main';
import { AkinatorClient, type Languages, type Themes, type Answers } from 'akinator-client';
import { schema } from './settingsSchema';
import icon from '../../resources/icon.png?asset';

let akinator: AkinatorClient;

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler(details => {
    void shell.openExternal(details.url);

    return { action: 'deny' };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if(is.dev && process.env['ELECTRON_RENDERER_URL']){
    void mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  }
  else{
    void mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('top.adproqwq.akino');

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if(BrowserWindow.getAllWindows().length === 0) createWindow();
  });
}).catch(reason => console.error(reason));

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
const conf = new Conf({ schema });
conf.registerRendererListener();

ipcMain.on('akino.start', (_, language: Languages, theme: Themes) => {
  const proxy = conf.get('proxy') as string | undefined;

  akinator = new AkinatorClient({ language, theme, proxy });
});

ipcMain.handle('akino.getFirstQuestion', async () => {
  return await akinator.start();
});

ipcMain.handle('akino.answer', async (_, answer: Answers) => {
  return await akinator.answer(answer);
});

ipcMain.handle('akino.getWinResult', async () => {
  return akinator.winResult;
});

ipcMain.on('akino.submitWin', async () => {
  await akinator.submitWin();
});

ipcMain.handle('akino.gameContinue', async () => {
  // return await akinator.continue();
  return await akinator.start(); // akinator.continue is not work properly due to Akinator itself
});