import axios from 'axios';

const API_KEY = 'db49f937465de70651478670fbc9ba63';
let tryCounter = 0;

export async function fetchWeather(city: string): Promise<WeatherData | null> {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=${API_KEY}`
    );
    tryCounter = 0;

    console.log(response);
    return {
      location: {
        city: response.data.name,
        country: response.data.sys.country,
        timezone: response.data.timezone,
      },

      temp: {
        value: response.data.main.temp,
        feelsLike: response.data.main.feels_like,
      },

      description: response.data.weather[0].description,
      precipitation: response.data.weather[0].main,
      iconClass: response.data.weather[0].icon,
    };
  } catch (e: any) {
    tryCounter++;
    console.log(e.message);
    return null;
  }
}

export function getTryCounter(): number {
  return tryCounter;
}
