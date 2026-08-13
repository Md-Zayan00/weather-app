//import JSX element style
import { JSX } from 'react'

//create the interface of the array received
export interface DailyInterface {
    "time": string[],
    "temperature_2m_mean": number[]
}

interface WeekReportProps{
    "dailyReport": DailyInterface
}

//export default JSX element
export default function WeekReport({dailyReport}: WeekReportProps): JSX.Element {
    return (
        <div>
            <h1>2026-08-13</h1>
            <h2>26°</h2>
        </div>
    )
}