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


//export function as a default to be rendered
export default function Home():JSX.Element {
  
  //set states for the coordinates
  const [lat, setLat] = useState<number>(0)
  const [long, setLong] = useState<number>(0)

  //Declare function for search button
  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>): void{
    event.preventDefault()
  }

  //Return the jsx element
  return (
    <main>
      <section
      className="text-center mx-auto"
      >
        <div className="flex justify-center mt-4 gap-1 text-sm">
          <MdOutlineShareLocation className="text-xl"/>
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
        <section className="text-left ml-12 mt-10">
          <h1 className="text-6xl">23°</h1>
          <p>Party Sunny</p>
          <p>Feels like 20°</p>
        </section>
        <div className="mt-7">
          <h1 className="text-7xl">15:00</h1>
          <p>2026-08-10</p>
        </div>
        <div className="flex justify-evenly mt-4">
            <span className="flex gap-1">
              <FaWind className="mt-1"/>
              <p>11 km/hr</p>
            </span>
            <span className="flex gap-1">
              <IoWaterOutline className="mt-1"/>
              <p>02 %</p>
            </span>
            <span className="flex gap-1">
              <FaSun className="mt-1"/>
              <p>Day</p>
            </span>
            <span className="flex gap-1">
              <GiHotSurface className="mt-1"/>
              <p>767 mm</p>
            </span>
          </div>
      </section>
    </main>
  )
}
