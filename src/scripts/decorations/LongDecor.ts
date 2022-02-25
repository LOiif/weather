import { removeClass } from '../utils/changeCSS';

abstract class LongDecor {
  static readonly $container: Element | null;

  static html: string;

  static timeout: NodeJS.Timeout;

  static show() {
    clearTimeout(this.timeout);
    this.$container?.insertAdjacentHTML('afterbegin', this.html);
    removeClass(this.$container, 'animate-hidden');
  }

  static hide() {
    this.$container?.classList.add('animate-hidden');
    this.timeout = setTimeout(() => {
      if (this.$container) {
        this.$container.innerHTML = '';
      }
    }, 1500);
  }
}

export default LongDecor;
