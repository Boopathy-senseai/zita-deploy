import { isEmpty } from '../helper'; // eslint-disable-line

type DurationTypes = 'SHORT' | 'LONG'|'MEDIUM';
type colors = 'error' | 'success' | 'warning' | 'info';

const handleSetDuration = (duration: DurationTypes) => {
  switch (duration) {
    case 'LONG':
      return 4000;
    case 'MEDIUM':
      return 10000;
    default:
      return 2500;
  }
};

const Toast = (
  message: string,
  duration: DurationTypes = 'SHORT', // eslint-disable-line
  color?: colors,
) => {
  const choosenDuration = handleSetDuration(duration);

  if (!isEmpty(message)) {
    const toastText = document.getElementById('toastbar-text');
    if (toastText && 'innerText' in toastText) {
      toastText.innerText = message;
    }

    const toastBar = document.getElementById('toastbar');
    if (toastBar) {
      toastBar.setAttribute('class', `show-tost-anim type-${color}`);
    }

    document
      .getElementById('toast-close')
      ?.addEventListener('click', function () {
        if (toastBar) {
          toastBar.removeAttribute('class');
        }
      });

    window.setTimeout(() => {
      if (toastBar) {
        toastBar.removeAttribute('class');
      }
    }, choosenDuration);
  }
};

export default Toast;
