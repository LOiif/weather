import { animateGradient, animateShowAndHide, changeModifier } from '../utils/changeCSS';
import Stars from './stars';
import Snow from './snow';

class Decorator {
  private prevIsNight: boolean;

  prevIsSnow = false;

  readonly $searchEl = document.querySelector('.search');

  readonly $inputEl = document.querySelector('.search__input');

  readonly $moonEl = document.querySelector('.moon');

  readonly $sunEl = document.querySelector('.sun');

  constructor(time: number) {
    this.prevIsNight = time > 20 || time < 6;

    if (this.prevIsNight) {
      setNight.apply(this, [null]);
    } else {
      setDay.apply(this, [null]);
    }
  }

  render(time: number, isSnow: boolean) {
    console.log(time);

    if (isSnow) {
      if (isSnow !== this.prevIsSnow) {
        Snow.show();
      }
    } else {
      Snow.hide();
    }

    this.prevIsSnow = isSnow;

    const isNight = time > 20 || time < 6;

    if (isNight !== this.prevIsNight) {
      if (isNight) {
        setNight.apply(this, ['day']);
      } else {
        setDay.apply(this, ['night']);
      }

      this.prevIsNight = isNight;
    }
  }
}

function setNight(this: Decorator, prevHour: string | null): void {
  if (prevHour) {
    this.$searchEl?.classList.add(`opacity-${prevHour}`);

    animateGradient(this.$searchEl, `opacity-${prevHour}`, 'opacity-night', (): void =>
      changeModifier(this.$searchEl, 'search', `_${prevHour}`, '_night')
    );
  } else {
    this.$searchEl?.classList.add('search_night');
  }

  changeModifier(this.$inputEl, 'search__input', `_${prevHour}`, '_night');
  animateShowAndHide(this.$moonEl, this.$sunEl, 'animate-hidden');

  Stars.show();
}

function setDay(this: Decorator, prevHour: string | null): void {
  if (prevHour) {
    this.$searchEl?.classList.add(`opacity-${prevHour}`);

    animateGradient(this.$searchEl, `opacity-${prevHour}`, 'opacity-day', (): void =>
      changeModifier(this.$searchEl, 'search', `_${prevHour}`, '_day')
    );
  } else {
    this.$searchEl?.classList.add('search_day');
  }

  changeModifier(this.$inputEl, 'search__input', `_${prevHour}`, '_day');
  animateShowAndHide(this.$sunEl, this.$moonEl, 'animate-hidden');

  Stars.hide();
}

export default Decorator;
