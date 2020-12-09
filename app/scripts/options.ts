import { browser } from 'webextension-polyfill-ts';

const setSettingsFromStorage = async (element: HTMLFormElement) => {
  const {
    webhookURL,
    channel,
    message,
    webhookName,
    iconURL,
    embeddedDataOptions
  } = await browser.storage.local.get([
    'webhookURL',
    'channel',
    'message',
    'webhookName',
    'iconURL',
    'embeddedDataOptions'
  ]);
  element['webhookURL'].value = webhookURL;
  element['channel'].value = channel;
  element['message'].value = message || '拡張機能からの送信 at {{{now}}}}';
  element['webhookName'].value = webhookName;
  element['iconURL'].value = iconURL;
  element['timeFormat'].value = embeddedDataOptions.timeFormat;

};

document.addEventListener('DOMContentLoaded', (event) => {
  const formElement = <HTMLFormElement>document.getElementById('settings');

  setSettingsFromStorage(formElement);

  document.getElementById('save')?.addEventListener('click', async (event) => {
    await browser.storage.local.set({
      webhookURL: formElement['webhookURL'].value,
      channel: formElement['channel'].value,
      message: formElement['message'].value,
      webhookName: formElement['webhookName'].value,
      iconURL: formElement['iconURL'].value,
      embeddedDataOptions: {timeFormat: formElement['timeFormat'].value},
    });
    alert('設定を保存しました');
  });

  document.getElementById('google-login')?.addEventListener('click', e => {
    browser.identity.getRedirectURL();
  });
});
