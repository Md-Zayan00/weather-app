'use client'

//imports
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


//export function as a default to be rendered
export default function Home():JSX.Element {
  
  //set states for the coordinates
  const [lat, setLat] = useState<number>(0)
  const [long, setLong] = useState<number>(0)
  const [currentTime, setCurrentTime] = useState<string[]>([])
  const [weather, setWeather] = useState<WeatherInterface | null>(null)
  const [statement, setStatement] = useState("")

  //Declare function for search button
  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>): Promise<void>{
    event.preventDefault()
    const data = await WeatherData(lat,long)
    setWeather(data)
    setCurrentTime (getTimeStamp(data?.current.time))
    setStatement (getWeatherDescription(data?.current.weather_code))
  }

  //Declare function to fetch local time of a given coordinate
  function getTimeStamp(clock: string | undefined): string[]{

    if(!clock){
      return []
    }
    const timeArr = clock.split("T")
    return timeArr
  }

  //Return the jsx element
  return (
    <main>
      <section
      className="text-center mx-auto"
      >
        <div className="flex justify-center mt-4 gap-1 text-sm">
          <MdOutlineShareLocation className="text-xl" aria-hidden='true'/>
        <p className=" m-0 p-0">Enter Coordinates</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-3 flex gap-x-1 mx-auto justify-center">
          <input type="number" placeholder="Latitude" value={lat} onChange={e => setLat(Number(e.target.value))}
          className="bg-black opacity-30 p-2 m-0 pr-0 max-w-10 rounded-md"
          />
          <input type="number" placeholder="Longitude" value={long} onChange={e => setLong(Number(e.target.value))}
           className="bg-black opacity-30 p-2 m-0 pr-0 max-w-10 rounded-md"
          />
          <button className="bg-gray-950 px-3 rounded-md"
          >
            <FaSearch aria-hidden='true' />
            </button>
        </form>
        <section className="text-left mx-12 mt-10 flex justify-between">
          <div>
            <h1 className="text-6xl">{weather?.current.temperature_2m}°</h1>
            <p>{statement.slice(0,-2)}</p>
            <p>Feels like {weather?.current.apparent_temperature}{weather?.current_units.apparent_temperature}</p>
          </div>
          <h1 className="text-9xl">{statement.slice(-2,-1)}</h1>
        </section>
        <DateTime 
        timeStamp = {currentTime[1]}
        currentDate={currentTime[0]}
        />
        <div className="flex justify-evenly mt-4">
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
          </div>
          <WeatherGraph />
      </section>
    </main>
  )
}
