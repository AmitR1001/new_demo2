// src/app.js

document.addEventListener('DOMContentLoaded', () => {
  const nfcButton = document.getElementById('nfc-button');
  const output = document.getElementById('output');

  if ('NFC' in window) {
    nfcButton.addEventListener('click', async () => {
      try {
        const nfc = new NDEFReader();
        await nfc.scan();
        output.textContent = 'NFC scan started. Please tap an NFC tag.';

        nfc.addEventListener('NDEFMessageReceived', event => {
          const message = event.message;
          output.textContent = 'NFC tag read: ' + JSON.stringify(message.records);
        });
      } catch (error) {
        output.textContent = 'Error: ' + error.message;
      }
    });
  } else {
    output.textContent = 'Web NFC is not supported on this device.';
  }
});