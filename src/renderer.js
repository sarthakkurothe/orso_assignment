window.electron.keyboard.bind('ctrl + l', () => {
  window.electron.ipcRenderer.send('start-transcription');
});

window.electron.ipcRenderer.on('transcription-started', (event, message) => {
  document.getElementById('status').innerText = message;
  startRecognition();
});

window.electron.ipcRenderer.on('transcription-stopped', (event, message) => {
  document.getElementById('status').innerText = message;
  stopRecognition();
});

let recognition;
function startRecognition() {
  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.continuous = true;

  recognition.onresult = (event) => {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      transcript += event.results[i][0].transcript;
    }
    document.getElementById('transcription').innerText = transcript;
  };

  recognition.start();
}

function stopRecognition() {
  if (recognition) {
    recognition.stop();
  }
}
