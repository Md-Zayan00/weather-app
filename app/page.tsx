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
    <main>
      <section
      className="text-center mx-auto md:text-2xl"
      >
        <div className="flex justify-center md:text-2xl pt-4 gap-1 text-sm">
          <MdOutlineShareLocation className="text-xl md:text-3xl" aria-hidden='true'/>
        <p className=" m-0 p-0">Enter Coordinates</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-3 md:text-4xl flex gap-x-1 mx-auto justify-center">
          <input type="number" placeholder="Latitude" value={lat} onChange={e => setLat(Number(e.target.value))}
          className="bg-black md:px-8 hover:opacity-90 transition ease-in-out hover:translate-y-1 active:scale-105 opacity-30 p-2 m-0 pr-0 max-w-10 rounded-md"
          />
          <input type="number" placeholder="Longitude" value={long} onChange={e => setLong(Number(e.target.value))}
           className="bg-black md:px-8 hover:opacity-90 transition ease-in-out hover:translate-y-1 active:scale-105 opacity-30 p-2 m-0 pr-0 max-w-10 rounded-md"
          />
          <button className="bg-gray-950 md:p-4 hover:bg-mist-900 hover:scale-120 hover:translate-x-1 active:scale-135 transition ease-in-out px-3 rounded-md"
          >
            <FaSearch aria-hidden='true' />
            </button>
        </form>
        {loading && <LoadingPulse />}
        <div className="md:flex md:justify-between">
          {weather && <section className="text-left mx-12 md:flex-row-reverse md:gap-3 mt-10 flex justify-between">
          <div>
            <h1 className="text-6xl md:text-7xl">{weather?.current.temperature_2m}°</h1>
            <p>{statement?.label}</p>
            <p>Feels like {weather?.current.apparent_temperature}{weather?.current_units.apparent_temperature}</p>
          </div>
          {statement && (
          <statement.Icon className="text-8xl md:text-9xl text-white" aria-hidden="true" />
        )}
        </section>}
        <DateTime
        timeStamp = {currentTime[1]}
        currentDate={currentTime[0]}
        />
        </div>
        {weather && <div className="flex justify-evenly mt-4">
            <span className="flex gap-1">
              <FaWind className="mt-1" aria-hidden='true'/>
              <p>{weather?.current.wind_speed_10m} {weather?.current_units.wind_speed_10m}</p>
            </span>
            <span className="flex gap-1">
              <IoWaterOutline className="mt-1" aria-hidden='true'/>
              <p>{weather?.current.relative_humidity_2m} {weather?.current_units.relative_humidity_2m}</p>
            </span>
            { weather?.current.is_day === 1 ? 
            <span className="flex gap-1">
              <FaSun className="mt-1" aria-hidden='true'/>
              <p>Day</p>
            </span> : weather !== null &&
            <span className="flex gap-1">
              <FaMoon className="mt-1" aria-hidden='true'/>
              <p>Night</p>
            </span>
            } 
            <span className="flex gap-1">
              <GiHotSurface className="mt-1" aria-hidden='true'/>
              <p>{weather?.current.surface_pressure} {weather?.current_units.surface_pressure}</p>
            </span>
          </div>}
          {hourlyTemp && hourlyPrec && <WeatherGraph 
          temp = {hourlyTemp}
          prec = {hourlyPrec}
          />}
          <div className="bg-black/40 rounded-md m-4">
          <WeekReport />
          </div>
      </section>
    </main>
  )
}
