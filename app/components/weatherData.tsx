//exports
export interface WeatherInterface{
  "latitude": number,
  "longitude": number,
  "generationtime_ms": number,
  "utc_offset_seconds": number,
  "timezone": string,
  "timezone_abbreviation": string,
  "elevation": number,
  "current_units": {
    "time": string,
    "interval": string,
    "temperature_2m": string,
    "relative_humidity_2m": string,
    "wind_speed_10m": string,
    "weather_code": string,
    "is_day": string,
    "apparent_temperature": string,
    "surface_pressure": string,
    "precipitation": string
  },
  "current": {
    "time": string,
    "interval": number,
    "temperature_2m": number,
    "relative_humidity_2m": number,
    "wind_speed_10m": number,
    "weather_code": number,
    "is_day": number,
    "apparent_temperature": number,
    "surface_pressure": number,
    "precipitation": number
  },
  "hourly_units": {
    "time": string,
    "temperature_2m": string,
    "precipitation_probability": string
  },
  "hourly": {
    "time": string[],
    "temperature_2m": number[],
    "precipitation_probability": number[]
  },
  "daily_units": {
    "time": string,
    "temperature_2m_mean": string
  },
  "daily": {
    "time": string[],
    "temperature_2m_mean": number[]
  }
}

export async function WeatherData(lat:number, long:number): Promise<WeatherInterface | null>{
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=temperature_2m_mean&hourly=temperature_2m,precipitation_probability&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,is_day,apparent_temperature,surface_pressure,precipitation&timezone=auto&past_days=7&forecast_days=1`
    try{
        const response = await fetch(url)

        if(!response.ok){
            throw new Error(`Failed to fetch weather data: ${response.statusText}`)
        }
        
        const data = await response.json()
        return data

    } catch (error) {
    console.error("Weather data fetch error:", error)
    return null
  }
}