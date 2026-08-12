import { IconType } from "react-icons";
import { 
  FaSun, 
  FaCloudSun, 
  FaCloud, 
  FaSmog, 
  FaCloudRain, 
  FaCloudShowersHeavy, 
  FaSnowflake, 
  FaCloudSunRain, 
  FaBolt, 
  FaQuestion 
} from "react-icons/fa";

export interface WeatherInfo {
  label: string;
  Icon: IconType;
}

export function getWeatherDescription(code: number | undefined): WeatherInfo {
  const codes: Record<number, WeatherInfo> = {
    0: { label: 'Clear sky', Icon: FaSun },
    1: { label: 'Mainly clear', Icon: FaCloudSun },
    2: { label: 'Partly cloudy', Icon: FaCloudSun },
    3: { label: 'Overcast', Icon: FaCloud },
    45: { label: 'Fog', Icon: FaSmog },
    48: { label: 'Depositing rime fog', Icon: FaSmog },
    51: { label: 'Light drizzle', Icon: FaCloudRain },
    53: { label: 'Moderate drizzle', Icon: FaCloudRain },
    55: { label: 'Dense drizzle', Icon: FaCloudRain },
    61: { label: 'Slight rain', Icon: FaCloudRain },
    63: { label: 'Moderate rain', Icon: FaCloudRain },
    65: { label: 'Heavy rain', Icon: FaCloudShowersHeavy },
    71: { label: 'Slight snow fall', Icon: FaSnowflake },
    73: { label: 'Moderate snow fall', Icon: FaSnowflake },
    75: { label: 'Heavy snow fall', Icon: FaSnowflake },
    80: { label: 'Slight rain showers', Icon: FaCloudSunRain },
    81: { label: 'Moderate rain showers', Icon: FaCloudSunRain },
    82: { label: 'Violent rain showers', Icon: FaCloudShowersHeavy },
    95: { label: 'Thunderstorm', Icon: FaBolt },
  };

  return code !== undefined && codes[code]
    ? codes[code]
    : { label: 'Unknown condition', Icon: FaQuestion };
}