'use client'

//import the jsx type and line chart
import { JSX } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

//Import the IconType for typescript and all the icons
import { IconType } from "react-icons"

//Export the default interface for the Hourly Forecast
export interface HourlyForecast {
  time: string
  Icon: IconType
  temp: number
  rainProb: number
}

interface LineChartProps{
  newData: HourlyForecast[]
}


//export the default function to return the graph
export default function LineChartComponent({newData} : LineChartProps):JSX.Element {
  
  const hourlyData = newData

  //creating a custom x axis tick
const CustomXAxisTopTick = (propsA: any):JSX.Element => {
  // x and y are the exact coordinates provided by Recharts for each tick
  // payload contains the data row for that specific tick
  const { x, y, payload } = propsA
  
  // Find the full data object matching the current tick value
  const currentItem = hourlyData[payload.index]

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Time Text */}
      <text x={0} dy={8} textAnchor="middle" fill="#ffffff" fontSize={14}>
        {payload.value}
      </text>
      
      {/* Icon Frame - Centered horizontally by offsetting half its width (e.g., -12 for 24px width) */}
      <foreignObject x={-12} y={16} width={24} height={24}>
        <div style={{ color: '#ffffff', display: 'flex', justifyContent: 'center' }}>
          <currentItem.Icon size={24} />
        </div>
      </foreignObject>

      {/* Temperature Text */}
      <text x={0} dy={58} textAnchor="middle" fill="#ffffff" fontSize={16}>
        {currentItem.temp}°
      </text>
    </g>
  )
}

//creating a custom bottom tick for the x axis
const CustomXAxisBottomTick = (propsB: any):JSX.Element => {
    const {x, y, payload} = propsB
    const currentItem = hourlyData[payload.index]

    return(

        <text x={x} y={y} dy={16} textAnchor='middle' fill='#ffffff' fontSize={14}>
            <tspan x={x} dy="15">☔︎︎ {currentItem.rainProb}%</tspan>
        </text>
    )
}
  
  return (
    <div style={{ minWidth: "1500px", height: 200 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={newData}
          margin={{ top: 50, right: 30, left: 30, bottom: 15 }}
        >
          <XAxis 
          xAxisId='TopAxis'
          dataKey="time"
           orientation='top' 
           tick={<CustomXAxisTopTick />} 
           tickMargin={60}
           interval={0} />
           <XAxis 
           xAxisId='BottomAxis'
           dataKey='time'
           orientation='bottom'
           tick={<CustomXAxisBottomTick />}
           interval={0}
           />
          <YAxis domain={['dataMin - 2','dataMax + 2']}
          hide={true}/>

          <Tooltip 
            contentStyle={{ backgroundColor: '#000', borderColor: '#000' }}
            itemStyle={{ color: '#fff' }}
            labelStyle={{ color: '#fff' }}
          />


          <Line
            type="monotone"
            dataKey="temp"
            stroke="#cce2ff"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}