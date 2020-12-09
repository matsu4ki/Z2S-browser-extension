import * as Mustache from 'mustache';
import * as dayjs from 'dayjs';
import 'dayjs/locale/ja';
import { browser } from 'webextension-polyfill-ts';
import {EmbeddedData, EmbeddedDataOptions} from './Interfaces';

dayjs.locale('ja');

const setDefaultObjects = (embeddedData: any, embeddedDataOptions: EmbeddedDataOptions) => {
  embeddedData.now = (timeFormat => {
    if (!!timeFormat) {
      let now = '';
      try {
        now = dayjs().format(timeFormat);
      } catch (e) {
        console.error(e);
        alert('現在時刻のフォーマットが正しくありません。');
      }
      return now;
    } else {
      return dayjs().format('YYYY/MM/DD HH:mm:ss dddd');
    }
  })(embeddedDataOptions.timeFormat);

  console.log(embeddedData.now);
};

export const sendMessageToSlack: Function = async (embeddedData: EmbeddedData) => {
  const { webhookURL, channel, message, webhookName, iconURL, embeddedDataOptions } = await browser.storage.local.get([
    'webhookURL', 'channel', 'message', 'webhookName', 'iconURL', 'embeddedDataOptions'
  ]);

  setDefaultObjects(embeddedData, embeddedDataOptions);

  return fetch(webhookURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: JSON.stringify({
      channel: channel,
      username: webhookName,
      text: Mustache.render(message, embeddedData),
      icon_url: iconURL,
    })
  }).then(res => {
    console.error(res);
    if (res.ok) {
      console.log('送信成功');
      return res;
    } else {
      console.log('送信失敗');
      alert('送信に失敗しました\nURLやSlackチャンネル名が正しいことを確認してください');
      throw new Error(res.statusText);
    }
  });
};
