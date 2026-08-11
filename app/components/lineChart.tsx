'use client'

//imports
import { JSX } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

//Data
const data = [
  { time: "3 AM", emoji: "☀️", temp: -3, rainProb: 10 },
  { time: "4 AM", emoji: "🌤️", temp: -2, rainProb: 13 },
  { time: "5 AM", emoji: "🌇", temp: -3, rainProb: 20 },
  { time: "6 AM", emoji: "🌅", temp: -4, rainProb: 21 },
  { time: "7 AM", emoji: "🌃", temp: -4, rainProb: 30 },
  { time: "8 AM", emoji: "🌙", temp: -5, rainProb: 30 },
]

//creating a custom x axis tick
const CustomXAxisTopTick = (props: any):JSX.Element => {
  // x and y are the exact coordinates provided by Recharts for each tick
  // payload contains the data row for that specific tick
  const { x, y, payload } = props
  
  // Find the full data object matching the current tick value
  const currentItem = data[payload.index]

  return (
    // textAnchor="middle" perfectly centers both lines underneath the data point
    <text x={x} y={y} dy={16} textAnchor="middle" fill="#666" fontSize={14}>

      <tspan x={x} dy="0">{payload.value}</tspan>
      
      <tspan x={x} dy="28" fontSize={24}>{currentItem?.emoji}</tspan>

      <tspan x={x} dy="28" fontSize={20}>{currentItem.temp}°</tspan>
    </text>
  )
}

const CustomXAxisBottomTick = (props: any):JSX.Element => {
    const {x, y, payload} = props
    const currentItem = data[payload.index]

    return(

        <text x={x} y={y} dy={16} textAnchor='middle' fill='#666' fontSize={14}>
            <tspan x={x} dy="15">☔︎︎ {currentItem.rainProb}%</tspan>
        </text>
    )
}

//export
export default function LineChartComponent():JSX.Element {
  return (
    <div style={{ width: "100%", height: 175 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 60, right: 30, left: 30, bottom: 15 }}
        >
          <XAxis 
          xAxisId='TopAxis'
          dataKey="time"
           orientation='top' 
           tick={<CustomXAxisTopTick />} 
           tickMargin={60} />
           <XAxis 
           xAxisId='BottomAxis'
           dataKey='time'
           orientation='bottom'
           tick={<CustomXAxisBottomTick />}
           />
          <YAxis hide={true}/>

          <Tooltip />

          <Line
            type="monotone"
            dataKey="temp"
            stroke="#ffffff"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}