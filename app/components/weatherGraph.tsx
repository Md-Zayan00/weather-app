//import the jsx type for typescript and the graph from line chart
import { JSX } from 'react'
import LineChartComponent from './lineChart'
//Import the IconType for typescript and all the icons
import { IconType } from "react-icons";
import { 
  FaMoon, 
  FaSun, 
  FaCloudSun, 
  FaCloudMoon, 
  FaCloudRain 
} from "react-icons/fa"
import { HourlyForecast } from './lineChart';

//declare inteface for the props received
interface HourlyProps{
    temp: number[],
    prec: number[]
}

//Declare the interface for the hourly data
interface HourlyInterface{
    time: string,
    Icon: IconType
}

//Declare the hourly data
const hourlyData: HourlyInterface[] = [
  { time: "12 AM", Icon: FaMoon, },
  { time: "1 AM", Icon: FaMoon, },
  { time: "2 AM", Icon: FaMoon, },
  { time: "3 AM", Icon: FaCloudMoon, },
  { time: "4 AM", Icon: FaCloudMoon, },
  { time: "5 AM", Icon: FaCloudMoon, },
  { time: "6 AM", Icon: FaCloudSun, },
  { time: "7 AM", Icon: FaCloudSun, },
  { time: "8 AM", Icon: FaSun, },
  { time: "9 AM", Icon: FaSun, },
  { time: "10 AM", Icon: FaSun, },
  { time: "11 AM", Icon: FaSun, },
  { time: "12 PM", Icon: FaSun, },
  { time: "1 PM", Icon: FaSun, },
  { time: "2 PM", Icon: FaSun, },
  { time: "3 PM", Icon: FaCloudSun, },
  { time: "4 PM", Icon: FaCloudSun, },
  { time: "5 PM", Icon: FaCloudSun, },
  { time: "6 PM", Icon: FaCloudMoon, },
  { time: "7 PM", Icon: FaCloudRain, },
  { time: "8 PM", Icon: FaCloudRain, },
  { time: "9 PM", Icon: FaCloudMoon, },
  { time: "10 PM", Icon: FaMoon, },
  { time: "11 PM", Icon: FaMoon, },
];

//export the default function to return the jsx element
export default function WeatherGraph(props: HourlyProps):JSX.Element {

    //Map over the hourly data with the props received to create new data
    const newHourlyData : HourlyForecast[] = hourlyData.map((obj, index) =>{

        return {
            time: obj.time,
            Icon: obj.Icon,
            temp: props.temp[index] ,
            rainProb: props.prec[index]
        }
    })

    //Return the jsx elements
    return (
        <section>
            <div className='bg-black/20 my-4 rounded-md' style={{ overflowX: 'auto', width: '100%' }}>
                <LineChartComponent 
                newData = {newHourlyData}
                />
            </div>
        </section>
    )
}