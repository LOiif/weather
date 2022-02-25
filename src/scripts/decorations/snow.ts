import LongDecor from './LongDecor';

class Snow extends LongDecor {
  static $container = document.querySelector('.snows');

  static html = makeSnowHTML();
}

function makeSnowHTML(): string {
  const screenWidth = window.innerWidth;
  const snowCount = Math.floor(screenWidth / 7) > 200 ? 200 : Math.floor(screenWidth / 7);

  const snows = [];

  for (let i = 0; i < snowCount; i++) {
    snows.push('<div class="snow"></div>');
  }

  return snows.join(' ');
}

export default Snow;
