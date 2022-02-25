import { fetchWeather, getTryCounter } from '../API/weather';
import formValidator from '../utils/validators';
import Decorator from '../decorations/decorator';

class Main {
  readonly $formEL = document.querySelector('.search__form');

  readonly $inputEL = this.$formEL?.querySelector('.search__input') as HTMLInputElement | null;

  readonly $resultEl = document.querySelector('.search__result');

  weatherHTML = '';

  tryCounter = 0;

  weatherData: WeatherData | null = null;

  readonly decorator: Decorator = new Decorator(this.time);

  isSnow = false;

  private _time: number = new Date().getHours();

  private _isWeatherLoading = false;

  set isWeatherLoading(value: boolean) {
    if (value !== this._isWeatherLoading) {
      this._isWeatherLoading = value;
      this.weatherHTML = makeWeatherHTML.apply(this, [this.weatherData]);
      renderWeather.apply(this, [this.weatherHTML]);
    }
  }

  get isWeatherLoading() {
    return this._isWeatherLoading;
  }

  set time(value: number) {
    this._time = value > 23 ? value - 24 : value;
  }

  get time() {
    return this._time;
  }

  init() {
    this.$resultEl?.addEventListener('click', showDetails);
    this.$formEL?.addEventListener('submit', formSubmitHandler.bind(this));
  }
}

let calls: Array<NodeJS.Timeout> = [];

function formSubmitHandler(this: Main, evt: Event) {
  evt.preventDefault();
  let city: string;
  if (this.$inputEL) {
    city = this.$inputEL.value;
  } else {
    city = '';
    console.log(`this.$inputEL = ${this.$inputEL}`);
  }

  if (formValidator(city)) {
    getWeather.apply(this, [city]);
    this.weatherHTML = makeWeatherHTML.apply(this, [this.weatherData]);
  } else {
    if (calls.length) {
      this.$inputEL?.classList.remove('search__input_error');
      calls.forEach((el) => {
        clearTimeout(el);
      });
      calls = [];
    }
    this.weatherHTML = '<p class="search__error">Пожалуйста, введите данные корректно</p>';
    setTimeout(() => {
      this.$inputEL?.classList.add('search__input_error');
    }, 2);
    calls.push(
      setTimeout(() => {
        this.$inputEL?.classList.remove('search__input_error');
      }, 700)
    );
  }

  renderWeather.apply(this, [this.weatherHTML]);
}

function showDetails(evt: Event) {
  const { target } = evt;

  if (target instanceof HTMLElement && target.classList.contains('search__show-details')) {
    const $detailsEl = document.querySelector('.search__footer');

    $detailsEl?.classList.toggle('visually-hidden');

    if (target.dataset.type === 'show') {
      target.textContent = 'Скрыть';
      target.dataset.type = 'hide';
    } else if (target.dataset.type === 'hide') {
      target.textContent = 'Подробнее';
      target.dataset.type = 'show';
    }
  }
}

function makeWeatherHTML(this: Main, weatherData: WeatherData | null): string {
  console.log(weatherData);

  const errorMessage: string =
    this.tryCounter < 5
      ? 'Похоже, вы неверно ввели город... 😞'
      : 'Данные не загрузились... 😢<br>Пожалуйста, перепроверьте правильность ввода. <br>Если вы уверены в корректности введённых данных, просим вас напсать в службу поддержки.';

  let html = '';

  if (weatherData) {
    const { location, temp, description, iconClass } = weatherData;

    const searchCountry: string = location.country !== 'RU' ? `<p class="search__country">${location.country}</p>` : '';

    html = `<div class="search__location">
                <p class="search__city">${location.city}</p>
                ${searchCountry}
            </div>
        
            <p class="search__temp">
                ${temp.value > 0 ? `+${temp.value}` : temp.value}°
            </p>
         
            <div class="search__footer visually-hidden">
                <p class="search__details">ощущается как ${
                  temp.feelsLike > 0 ? `+${temp.feelsLike}` : temp.feelsLike
                }°,</p>
                <pre> </pre>
                <p class="search__description">${description}<span class="search__icon search__icon_${iconClass}"></span></p>
            </div>
            
            <button class="search__show-details" data-type="show">Подробнее</button>`;
  } else {
    html = `<p class="search__error">${errorMessage}</p>`;
  }

  return this.isWeatherLoading
    ? `<div class="loader">
               <svg class="loader__svg" width="80px" height="80px">
                   <circle cx="20" cy="20" r="20"></circle>
               </svg>
           </div>`
    : html;
}

function renderWeather(this: Main, html: string) {
  if (this.$resultEl) {
    this.$resultEl.innerHTML = '';
    this.$resultEl.insertAdjacentHTML('afterbegin', html);
  }
}

async function getWeather(this: Main, city: string) {
  this.isWeatherLoading = true;
  const weatherData = await fetchWeather(city.trim());

  if (weatherData) {
    this.time = new Date().getUTCHours() + weatherData.location.timezone / 3600;
    this.isSnow = weatherData.precipitation === 'Snow';

    if (this.$inputEL) {
      this.$inputEL.value = '';
    }
  }

  this.tryCounter = getTryCounter();
  this.weatherData = weatherData;

  this.decorator.render(this.time, this.isSnow);

  this.isWeatherLoading = false;
}

export default Main;
