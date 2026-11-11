
const {
  app,
  BrowserWindow,
  screen,
  ipcMain,
  globalShortcut
} = require('electron');

const path = require('path');

// =====================================
// CONFIGURATION
// =====================================

// true  = testing (5 sec / 30 sec)
// false = actual (5 min / 30 min)
const TEST_MODE = false;

const FIVE_MIN = TEST_MODE ? 5000 : 5 * 60 * 1000;
const THIRTY_MIN = TEST_MODE ? 30000 : 30 * 60 * 1000;
const GREETING_TIME = TEST_MODE ? 3000 : 10000;

const ANIMATION_TIME = 2000;

let itachiWin = null;
let itachiReady = false;
let isQuitting = false;

let studyState = 'idle';
let currentMode = 'idle';
let currentDialogue = null;

let studyTimer = null;
let greetingTimer = null;
let hideTimer = null;

// =====================================
// 20 RANDOM CHECK-IN DIALOGUES
// =====================================

const checkInDialogues = [
  "Still focused, or have you fallen into my genjutsu?",
  "Tell me. Are you studying, or merely staring at the pages?",
  "Even a Sharingan cannot learn what you refuse to practice.",
  "Your future self is watching. Are you making them proud?",
  "Thirty minutes have passed. What have you accomplished?",
  "Discipline is quieter than motivation. Are you still working?",
  "Have you mastered the topic, or is the topic mastering you?",
  "A wandering mind is an easy target for genjutsu. Focus.",
  "Your books won't open themselves. Still studying?",
  "Progress doesn't demand perfection. Only consistency.",
  "Are you closer to your goal than you were thirty minutes ago?",
  "Even the strongest shinobi must train. Are you training?",
  "Don't mistake sitting at your desk for making progress.",
  "One more concept. One more page. Keep going.",
  "Have distractions defeated you, or are you still in control?",
  "Your concentration is your greatest weapon. Protect it.",
  "The clock moves whether you study or not. Choose wisely.",
  "Knowledge is earned through patience. Still with me?",
  "You don't need to finish everything. Just don't stop trying.",
  "I've returned. Tell me, have you remained focused?"
];

let lastDialogueIndex = -1;

function getRandomDialogue() {
  let index;

  do {
    index = Math.floor(Math.random() * checkInDialogues.length);
  } while (index === lastDialogueIndex);

  lastDialogueIndex = index;
  return checkInDialogues[index];
}

// =====================================
// TIMER MANAGEMENT
// =====================================

function clearStudyTimers() {
  clearTimeout(studyTimer);
  clearTimeout(greetingTimer);

  studyTimer = null;
  greetingTimer = null;
}

function cancelPendingHide() {
  clearTimeout(hideTimer);
  hideTimer = null;
}

// =====================================
// WINDOW POSITION
// =====================================

function placeItachi() {
  if (!itachiWin || itachiWin.isDestroyed()) return;

  const display = screen.getDisplayNearestPoint(
    screen.getCursorScreenPoint()
  );

  const { x, y, width, height } = display.workArea;
  const bounds = itachiWin.getBounds();

  itachiWin.setPosition(
    x + width - bounds.width - 12,
    y + height - bounds.height - 12
  );
}

// =====================================
// WINDOW CREATION
// =====================================

function sendItachiMode() {
  if (
    !itachiReady ||
    !itachiWin ||
    itachiWin.isDestroyed()
  ) return;

  itachiWin.webContents.send('itachi-mode', {
    mode: currentMode,
    dialogue: currentDialogue
  });
}

function createItachi() {
  itachiWin = new BrowserWindow({
    width: 360,
    height: 440,
    frame: false,
    transparent: true,
    backgroundColor: '#00000000',
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    show: false,
    hasShadow: false,

    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  itachiWin.setAlwaysOnTop(true, 'screen-saver');
  placeItachi();

  itachiWin.webContents.on('did-finish-load', () => {
    itachiReady = true;
    sendItachiMode();
  });

  itachiWin.loadFile('itachi.html');

  itachiWin.on('close', event => {
    if (!isQuitting) {
      event.preventDefault();
      hideItachi();
    }
  });

  itachiWin.on('closed', () => {
    itachiWin = null;
    itachiReady = false;
  });
}

// =====================================
// SLIDE-UP / SLIDE-DOWN ANIMATIONS
// =====================================

function showItachi(mode, dialogue = null) {
  if (!itachiWin || itachiWin.isDestroyed()) return;

  cancelPendingHide();

  currentMode = mode;
  currentDialogue = dialogue;

  placeItachi();

  if (!itachiWin.isVisible()) {
    itachiWin.showInactive();
  }

  itachiWin.setAlwaysOnTop(true, 'screen-saver');
  sendItachiMode();
}

function hideItachi() {
  if (!itachiWin || itachiWin.isDestroyed()) return;

  cancelPendingHide();

  if (!itachiWin.isVisible()) return;

  if (itachiReady) {
    itachiWin.webContents.send('itachi-hide');
  }

  hideTimer = setTimeout(() => {
    if (itachiWin && !itachiWin.isDestroyed()) {
      itachiWin.hide();
    }

    hideTimer = null;
  }, ANIMATION_TIME);
}

// =====================================
// STUDY SESSION
// =====================================

function startStudy() {
  if (studyState !== 'idle') return;

  clearStudyTimers();

  studyState = 'greeting';
  showItachi('greeting');

  greetingTimer = setTimeout(() => {
    if (studyState === 'greeting') {
      hideItachi();
    }
  }, GREETING_TIME);

  studyTimer = setTimeout(() => {
    if (studyState === 'greeting') {
      studyState = 'waiting-to-start';
      showItachi('start-question');
    }
  }, FIVE_MIN);
}

function scheduleCheckIn(delay = THIRTY_MIN) {
  clearStudyTimers();

  studyState = 'studying';

  studyTimer = setTimeout(() => {
    if (studyState === 'studying') {
      studyState = 'waiting-checkin';

      showItachi('checkin', getRandomDialogue());
    }
  }, delay);
}

function confirmStarted() {
  if (
    studyState !== 'waiting-to-start' &&
    studyState !== 'not-started'
  ) return;

  hideItachi();
  scheduleCheckIn();
}

// END SESSION:
// Cancel timers, reset state, slide down,
// and do NOT show the welcome screen.
function endStudy() {
  clearStudyTimers();

  studyState = 'idle';
  currentMode = 'idle';
  currentDialogue = null;

  hideItachi();
}

// =====================================
// BUTTON ACTIONS
// =====================================

ipcMain.on('itachi-action', (event, action) => {
  if (
    !itachiWin ||
    itachiWin.isDestroyed() ||
    event.sender !== itachiWin.webContents
  ) return;

  switch (action) {

    case 'start':
      startStudy();
      break;

    case 'yes-started':
    case 'yes-started-later':
      confirmStarted();
      break;

    case 'not-started':
      if (studyState === 'waiting-to-start') {
        studyState = 'not-started';
        showItachi('not-started');
      }
      break;

    case 'studying':
      if (studyState === 'waiting-checkin') {
        hideItachi();
        scheduleCheckIn();
      }
      break;

    case 'break':
      if (studyState === 'waiting-checkin') {
        clearStudyTimers();
        studyState = 'break';
        showItachi('break');
      }
      break;

    case 'resume':
      if (studyState === 'break') {
        hideItachi();
        scheduleCheckIn();
      }
      break;

    case 'end':
      if (studyState !== 'idle') {
        endStudy();
      }
      break;

    case 'hide':
      if (studyState === 'idle') {
        hideItachi();
      }
      break;
  }
});

// =====================================
// STATE IPC
// =====================================

ipcMain.handle('itachi-state', event => {
  if (
    !itachiWin ||
    event.sender !== itachiWin.webContents
  ) return 'idle';

  return studyState;
});

// =====================================
// APP STARTUP
// =====================================

app.whenReady().then(() => {
  createItachi();

  screen.on('display-metrics-changed', placeItachi);

  globalShortcut.register(
    'CommandOrControl+Shift+I',
    () => {
      if (!itachiWin || itachiWin.isDestroyed()) return;

      if (studyState === 'idle') {
        showItachi('idle');
      } else if (studyState === 'greeting') {
        showItachi('greeting');
      } else if (studyState === 'waiting-to-start') {
        showItachi('start-question');
      } else if (studyState === 'not-started') {
        showItachi('not-started');
      } else if (studyState === 'waiting-checkin') {
        showItachi('checkin', currentDialogue);
      } else if (studyState === 'break') {
        showItachi('break');
      } else {
        showItachi('session');
      }
    }
  );

  globalShortcut.register(
    'CommandOrControl+Shift+Q',
    () => app.quit()
  );

  itachiWin.webContents.once('did-finish-load', () => {
    showItachi('idle');
  });
});

// =====================================
// CLEANUP
// =====================================

app.on('before-quit', () => {
  isQuitting = true;
  clearStudyTimers();
  cancelPendingHide();
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
  if (isQuitting) app.quit();
});
