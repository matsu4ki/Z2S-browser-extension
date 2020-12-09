// 利用時はcloneNode(true)にてDeepCopyすること
const Button = (() => {
  const button = (() => {
    const btn = document.createElement('button');
    const buttonStyle = 'margin:0;margin-top:5px;--mobile-safari-vh-gap:0px;font-kerning:normal;-webkit-font-smoothing:antialiased;display:inline-block;vertical-align:top;padding:0;box-sizing:border-box;border:1px solid transparent;border-radius:2px;background:0 0;text-align:center;font-weight:700;text-decoration:none;white-space:nowrap;-webkit-tap-highlight-color:transparent;cursor:pointer;user-select:none;transition-property:color,background-color,border-color,box-shadow,-webkit-box-shadow;transition-duration:180ms;outline:0;height:32px;font-size:15px;line-height:32px;border-color:#7a4;background-color:#7a4;color:#fff;visibility:visible;max-width:340px;overflow:hidden';
    btn.style.cssText = buttonStyle;
    return btn;
  })();

  const wrapDiv = (() => {
    const div = document.createElement('div');
    const wrapStyle = '--mobile-safari-vh-gap:0px;font-kerning:normal;-webkit-font-smoothing:antialiased;text-align:center;font-weight:700;white-space:nowrap;cursor:pointer;user-select:none;line-height:32px;visibility:visible;-webkit-tap-highlight-color:transparent;margin:0;width:100%;height:100%;padding:0 15px;box-sizing:border-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center';
    div.style.cssText = wrapStyle;
    return div;
  })();

  const textDiv = (() => {
    const div = document.createElement('div');
    const textStyle = '--mobile-safari-vh-gap:0px;font-kerning:normal;-webkit-font-smoothing:antialiased;text-align:center;font-weight:700;white-space:nowrap;cursor:pointer;user-select:none;font-size:15px;line-height:32px;color:#fff;visibility:visible;-webkit-tap-highlight-color:transparent;margin:0;padding:0;display:flex;-webkit-box-align:center;align-items:center';
    div.style.cssText = textStyle;
    div.textContent = 'To Slack';
    return div;
  })();

  wrapDiv.appendChild(textDiv);
  button.appendChild(wrapDiv);

  return button;
})();

export default Button;
