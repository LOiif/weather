import LongDecor from './LongDecor';

class Stars extends LongDecor {
  static readonly $container = document.querySelector('.stars');

  static html = makeStarsHTML();
}

function makeStarsHTML(): string {
  const screenWidth = window.innerWidth;
  const starCount = Math.floor(screenWidth / 20) > 120 ? 120 : Math.floor(screenWidth / 20);
  const stars = [];

  for (let i = 0; i < starCount; i++) {
    stars.push('<div class="star"></div>');
  }

  return stars.join(' ');
}

export default Stars;
