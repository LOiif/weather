declare module '*.png' {
  const value: any;
  export = value;
}

interface WeatherData {
  location: {
    city: string;
    country: string;
    timezone: number;
  };

  temp: {
    value: number;
    feelsLike: number;
  };

  description: string;

  precipitation: string;

  iconClass: string;
}
