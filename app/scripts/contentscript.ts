import {observe} from 'selector-observer';
import Button from './Button';
import {sendMessageToSlack} from './sendToSlack';

const findNameFromDisplayOrInput = () => {
  const name = (() => {
    const userIcon = <HTMLElement>document.querySelector('body > zac-app > div > zac-root-page > zac-global-header-container > div.global-header.ng-star-inserted > div > div > div > div.global-account > zac-global-account-container > div:nth-child(1)');

    if (userIcon == null) {
      return '';
    } else {
      userIcon.click();
      const nameElement = <HTMLElement>document.querySelector('body > zac-app > div > zac-root-page > zac-global-header-container > div.global-header.ng-star-inserted > div > div > div > div.global-account > zac-global-account-container > div:nth-child(2) > div > div.popover-transformable.ng-trigger.ng-trigger-popup.ng-star-inserted > div.popover-wrapper > div > div > zac-account-menu > div > div > div > p:nth-child(2)');
      const name = nameElement!.textContent || '';
      userIcon.click();
      return name;
    }
  })();
  return !!name ? name : window.prompt('名前を取得できませんでした。\n入力してください', '') || '名無し';
};

const setStartButton: Function = (startWorkButtonArea: HTMLElement) => {
  startWorkButtonArea.style.flex = '1';
  const startWorkButton = <HTMLButtonElement>Button.cloneNode(true);
  startWorkButton.addEventListener('click', () => {
    console.log('clicked 出勤');
    const userName: string = findNameFromDisplayOrInput();
    sendMessageToSlack();
    startWorkButton.setAttribute('disabled', 'disabled');
    startWorkButton.style.cssText += 'border-color:#ddd!important;background-color:#ddd!important;-webkit-box-shadow:none!important;box-shadow:none!important;color:#888!important;cursor:default!important';
  });
  startWorkButtonArea.appendChild(startWorkButton);
};

const setEndButton: Function = (endWorkButtonArea: HTMLElement) => {
  endWorkButtonArea.style.flex = '1';
  const endWorkButton = <HTMLButtonElement>Button.cloneNode(true);
  endWorkButton.addEventListener('click', () => {
    console.log('clicked 退勤');
    const userName: string = findNameFromDisplayOrInput();
    sendMessageToSlack();
    endWorkButton.setAttribute('disabled', 'disabled');
    endWorkButton.style.cssText += 'border-color:#ddd!important;background-color:#ddd!important;-webkit-box-shadow:none!important;box-shadow:none!important;color:#888!important;cursor:default!important';
  });
  endWorkButtonArea.appendChild(endWorkButton);
};

// 登録
const accountMenu = 'body > zac-app > div > zac-root-page > zac-global-header-container > div.global-header.ng-star-inserted > div > div > div > div.global-account > zac-global-account-container > div:nth-child(1)';
observe(accountMenu, {
  add(el) {
    const startWorkButtonArea = 'body > zac-app > div > zac-root-page > zac-daily-report-page > zac-page-body > div > zac-daily-report-detail-page > div > main > zac-page-content:nth-child(1) > div > zac-card > div > zac-daily-report-attendance-form > form > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div.ng-star-inserted';
    observe(startWorkButtonArea, {
      add(el) {
        const startWorkButton = el.getElementsByTagName('button')[0];
        // if (startWorkButton.style.visibility === 'visible') {
          setStartButton(el);
        // }
      }
    });

    const endWorkButtonArea = 'body > zac-app > div > zac-root-page > zac-daily-report-page > zac-page-body > div > zac-daily-report-detail-page > div > main > zac-page-content:nth-child(1) > div > zac-card > div > zac-daily-report-attendance-form > form > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div.ng-star-inserted';
    observe(endWorkButtonArea, {
      add(el) {
        const endWorkButton = el.getElementsByTagName('button')[0];
        // if (endWorkButton.style.visibility === 'visible') {
          setEndButton(el);
        // }
      }
    });
  }
});
