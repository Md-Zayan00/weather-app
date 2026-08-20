'use client'

//import the icons, types, and functions 
import { JSX } from "react"
import { useState } from "react"
import { FaSearch } from "react-icons/fa"
import { MdOutlineShareLocation } from "react-icons/md"
import { FaWind } from "react-icons/fa"
import { IoWaterOutline } from "react-icons/io5"
import { FaSun } from "react-icons/fa"
import { GiHotSurface } from "react-icons/gi"
import WeatherGraph from "./components/weatherGraph"
import DateTime from "./components/dateTime"
import { WeatherData } from "./components/weatherData"
import { WeatherInterface } from "./components/weatherData"
import { FaMoon } from "react-icons/fa"
import { getWeatherDescription } from "./utils/weatherCodes"
import { WeatherInfo } from "./utils/weatherCodes"
import LoadingPulse from "./components/loading"
import WeekReport from "./components/weekReport"
import { DailyInterface } from "./components/weekReport"
import Comments from "./components/comments"

//export function as a default to be rendered
export default function Home():JSX.Element {
  
  //set states for the coordinates
  const [lat, setLat] = useState<number>(0)
  const [long, setLong] = useState<number>(0)

  //set states for displaying the time, weather and statement
  const [currentTime, setCurrentTime] = useState<string[]>([])
  const [weather, setWeather] = useState<WeatherInterface | null>(null)
  const [statement, setStatement] = useState<WeatherInfo>()
  const [hourlyTemp, setHourlyTemp] = useState<number[] | undefined>()
  const [hourlyPrec, setHourlyPrec] = useState<number[] | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const [dailyTemp, setDailyTemp] = useState<DailyInterface | undefined>()
  const [isTempUp, setIsTempUp] = useState<boolean>(false)


  //Declare function for search button
  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>): Promise<void>{
    
    //Prevent the browser from reloading the page
    event.preventDefault()

    //Start the loading screen
    setLoading(true)

    //Fetch the data from WeatherData function and store it
    const data = await WeatherData(lat,long)

    //Set all the states
    setWeather(data)
    setCurrentTime (getTimeStamp(data?.current.time))
    setStatement (getWeatherDescription(data?.current.weather_code))
    setHourlyTemp(data?.hourly.temperature_2m.slice(168))
    setHourlyPrec(data?.hourly.precipitation_probability.slice(168))
    setDailyTemp(data?.daily)

    const tempArr = data?.daily.temperature_2m_mean

    if( tempArr && tempArr.length >= 2){
      const latestTemp = tempArr.at(-1)
      const prevTemp = tempArr.at(-2)
      if(latestTemp !== undefined && prevTemp !== undefined){
      const boolTemp: boolean = latestTemp > prevTemp
      setIsTempUp(boolTemp) 
      }
    }


    setLoading(false)
  }

  //Declare function to fetch local time of a given coordinate
  function getTimeStamp(clock: string | undefined): string[]{

    //If the clock provided is not defined return an empty array
    if(!clock){
      return []
    }

    //Otherwise split the datetime to date and time then return
    const timeArr = clock.split("T")
    return timeArr
  }

  //Return the jsx element
  return (
  <main className="min-h-screen py-6 md:py-12 px-4 md:px-8">
    <section className="max-w-4xl lg:max-w-6xl mx-auto text-center">
      {/* Header / Title */}
      <div className="flex justify-center items-center gap-2 text-sm md:text-xl lg:text-2xl pt-4">
        <MdOutlineShareLocation className="text-xl md:text-2xl lg:text-3xl" aria-hidden="true" />
        <p className="m-0 p-0 font-medium">Enter Coordinates</p>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="mt-4 md:mt-6 flex flex-wrap gap-2 md:gap-3 justify-center items-center">
        <input 
          type="number" 
          placeholder="Latitude" 
          value={lat} 
          onChange={e => setLat(Number(e.target.value))}
          className="bg-black/40 text-white placeholder-gray-400 p-2.5 md:p-3 px-4 md:px-6 w-32 md:w-48 lg:w-56 text-sm md:text-base rounded-lg border border-white/10 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition ease-in-out hover:-translate-y-0.5 active:scale-95"
        />
        <input 
          type="number" 
          placeholder="Longitude" 
          value={long} 
          onChange={e => setLong(Number(e.target.value))}
          className="bg-black/40 text-white placeholder-gray-400 p-2.5 md:p-3 px-4 md:px-6 w-32 md:w-48 lg:w-56 text-sm md:text-base rounded-lg border border-white/10 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition ease-in-out hover:-translate-y-0.5 active:scale-95"
        />
        <button 
          type="submit"
          aria-label="Search coordinates"
          className="bg-gray-900 text-white p-2.5 md:p-3.5 px-4 md:px-6 rounded-lg hover:bg-gray-800 hover:scale-105 active:scale-95 transition ease-in-out flex items-center justify-center border border-white/10"
        >
          <FaSearch className="text-base md:text-lg" aria-hidden="true" />
        </button>
      </form>

      {loading && <LoadingPulse />}

      {/* Primary Weather & Date Split Section */}
      {weather && (<div className="mt-8 md:mt-12 md:flex md:items-center md:justify-between md:gap-8 bg-slate-800/20 md:bg-slate-800/30 rounded-2xl p-6 md:p-8 backdrop-blur-sm border border-white/5">
        {weather && (
          <section className="text-left flex justify-between items-center md:flex-row-reverse md:gap-6 w-full md:w-auto">
            <div>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight">{weather?.current.temperature_2m}°</h1>
              <p className="text-lg md:text-xl font-medium mt-1">{statement?.label}</p>
              <p className="text-sm md:text-base text-gray-300 mt-1">
                Feels like {weather?.current.apparent_temperature}{weather?.current_units.apparent_temperature}
              </p>
            </div>
            {statement && (
              <statement.Icon className="text-7xl md:text-8xl lg:text-9xl text-white opacity-90 drop-shadow-md" aria-hidden="true" />
            )}
          </section>
        )}

        <div className="mt-6 md:mt-0 text-left md:text-right border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8">
          <DateTime
            timeStamp={currentTime[1]}
            currentDate={currentTime[0]}
          />
        </div>
      </div>)}

      {/* Secondary Metrics Bar */}
      {weather && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 bg-slate-800/30 rounded-xl p-4 md:p-6 border border-white/5 backdrop-blur-sm text-sm md:text-base">
          <span className="flex items-center justify-center gap-2 md:gap-3 p-2 text-blue-600 bg-blue-100/80 dark:text-blue-300 dark:bg-blue-900/40 rounded-full border border-blue-200/40 dark:border-blue-700/30">
            <FaWind className="text-lg md:text-xl text-blue-500 dark:text-blue-400" aria-hidden="true" />
            <p className="m-0 font-medium">{weather?.current.wind_speed_10m} {weather?.current_units.wind_speed_10m}</p>
          </span>

          <span className="flex items-center justify-center gap-2 md:gap-3 p-2 text-blue-600 bg-blue-100/80 dark:text-blue-300 dark:bg-blue-900/40 rounded-full border border-blue-200/40 dark:border-blue-700/30">
            <IoWaterOutline className="text-lg md:text-xl text-blue-500 dark:text-blue-400" aria-hidden="true" />
            <p className="m-0 font-medium">{weather?.current.relative_humidity_2m} {weather?.current_units.relative_humidity_2m}</p>
          </span>

          {weather?.current.is_day === 1 ? (
            <span className="flex items-center justify-center gap-2 md:gap-3 p-2 text-blue-600 bg-blue-100/80 dark:text-blue-300 dark:bg-blue-900/40 rounded-full border border-blue-200/40 dark:border-blue-700/30">
              <FaSun className="text-lg md:text-xl text-amber-400" aria-hidden="true" />
              <p className="m-0 font-medium">Day</p>
            </span>
          ) : weather !== null && (
            <span className="flex items-center justify-center gap-2 md:gap-3 p-2 text-blue-600 bg-blue-100/80 dark:text-blue-300 dark:bg-blue-900/40 rounded-full border border-blue-200/40 dark:border-blue-700/30">
              <FaMoon className="text-lg md:text-xl text-indigo-300" aria-hidden="true" />
              <p className="m-0 font-medium">Night</p>
            </span>
          )}

          <span className="flex items-center justify-center gap-2 md:gap-3 p-2 text-blue-600 bg-blue-100/80 dark:text-blue-300 dark:bg-blue-900/40 rounded-full border border-blue-200/40 dark:border-blue-700/30">
            <GiHotSurface className="text-lg md:text-xl text-blue-500 dark:text-blue-400" aria-hidden="true" />
            <p className="m-0 font-medium">{weather?.current.surface_pressure} {weather?.current_units.surface_pressure}</p>
          </span>
        </div>
      )}

      {/* Graphs & Custom Widgets */}
      {hourlyTemp && hourlyPrec && (
        <div className="mt-6 md:mt-8">
          <WeatherGraph 
            temp={hourlyTemp}
            prec={hourlyPrec}
          />
        </div>
      )}

      {weather && <Comments
      incTemp = {isTempUp}
       />}

      {dailyTemp && <div className="bg-black/40 rounded-xl mt-6 md:mt-8 p-2 md:p-6 border border-white/5">
        <WeekReport
        dailyReport = {dailyTemp} 
        />
      </div>}
    </section>
  </main>
)
}
