//import
import { JSX } from 'react'
import LineChartComponent from './lineChart'

//export
export default function WeatherGraph():JSX.Element {
    return (
        <section>
            <div className='bg-black/40 m-4 rounded-md'>
                <div>
                    
                </div>
                <LineChartComponent />
            </div>
        </section>
    )
}