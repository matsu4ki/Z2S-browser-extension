import { browser } from 'webextension-polyfill-ts';

export const sendToSlack: Function = async () => {
  const {webhookURL, channel, message, webhookName, iconURL} = await browser.storage.local.get([
    'webhookURL', 'channel', 'message', 'webhookName', 'iconURL'
  ]);

  const res = await fetch(webhookURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify({
        channel: channel,
        username: webhookName,
        text: message,
        icon_url: iconURL,
      }),
    }
  ).catch(e => console.error(e));

  console.log(res);
};

export const sendMessageToSlack: Function = async (message: string) => {
  const {webhookURL, channel, webhookName, iconURL} = await browser.storage.local.get([
    'webhookURL', 'channel', 'webhookName', 'iconURL'
  ]);

  const res = await fetch(webhookURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify({
        channel: channel,
        username: webhookName,
        text: message,
        icon_url: iconURL,
      }),
    }
  ).catch(e => console.error(e));

  console.log(res);
};
