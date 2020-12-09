import { browser } from 'webextension-polyfill-ts';
import * as Mustache from 'mustache';
import * as dayjs from 'dayjs';

const setDefaultObjects = (inputData: any) => {
  dayjs.locale('ja');
  inputData.now = dayjs().format('YYYY/MM/DD HH:mm:ss dddd');
};

export const sendMessageToSlack: Function = async () => {
  const {webhookURL, channel, message, webhookName, iconURL, inputData} = await browser.storage.local.get([
    'webhookURL', 'channel', 'message', 'webhookName', 'iconURL', 'inputData'
  ]);

  setDefaultObjects(inputData);

  const res = await fetch(webhookURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify({
        channel: channel,
        username: webhookName,
        text: Mustache.render(message, inputData),
        icon_url: iconURL,
      })
    }
  ).catch(e => console.error(e));
  console.log(res);
};
