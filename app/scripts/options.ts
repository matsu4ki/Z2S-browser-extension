import { browser } from 'webextension-polyfill-ts';

const setSettingsFromStorage = async (element: HTMLFormElement) => {
  const {webhookURL, channel, message, webhookName, iconURL} = await browser.storage.local.get([
        'webhookURL', 'channel', 'message', 'webhookName', 'iconURL'
      ]);
    element['webhookURL'].value = webhookURL;
    element['channel'].value = channel;
    element['message'].value = message;
    element['webhookName'].value = webhookName;
    element['iconURL'].value = iconURL;
};

document.addEventListener('DOMContentLoaded', (event) => {

  const formElement = <HTMLFormElement>document.getElementById('settings');

  setSettingsFromStorage(formElement);

  document.getElementById('save')?.addEventListener('click', async (event) => {
    console.log('clicked');

  await browser.storage.local.set({
      'webhookURL': formElement['webhookURL'].value,
      'channel': formElement['channel'].value,
      'message': formElement['message'].value,
      'webhookName': formElement['webhookName'].value,
      'iconURL': formElement['iconURL'].value
    });
    alert('設定を保存しました');
    console.log('saved');
  });
});
