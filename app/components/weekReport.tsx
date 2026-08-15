import { JSX } from 'react';
// Make sure to install: npm install react-icons
import { WiThermometer, WiDaySunny } from 'react-icons/wi'
import { SlCalender } from "react-icons/sl"

export interface DailyInterface {
    time: string[]
    temperature_2m_mean: number[]
}

interface WeekReportProps {
    dailyReport: DailyInterface
}

export default function WeekReport({ dailyReport }: WeekReportProps): JSX.Element {
    
    const dailyArr: JSX.Element[] = dailyReport.time.map((day: string, index: number): JSX.Element => {
        // Formats raw strings (e.g., "2026-08-15") into clean local variations
        const formattedDay = new Date(day).toLocaleDateString('en-US', { weekday: 'short' })
        const formattedDate = new Date(day).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        const temp = dailyReport.temperature_2m_mean[index]

        return (
            <div 
                key={index} 
                className="flex sm:flex-col items-center justify-between sm:justify-center p-4 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md rounded-xl border border-white/40 dark:border-slate-700/40 shadow-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-md hover:bg-white/60 dark:hover:bg-slate-800/60"
            >
                {/* Date & Day Section */}
                <div className="flex sm:flex-col items-center gap-3 sm:gap-1 w-1/3 sm:w-full text-left sm:text-center">
                    <SlCalender className="text-2xl text-blue-500 dark:text-blue-400 shrink-0 sm:hidden" />
                    <div>
                        <h1 className="font-bold text-slate-800 dark:text-slate-100 text-base leading-tight">
                            {formattedDay}
                        </h1>
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block mt-0.5">
                            {formattedDate}
                        </span>
                    </div>
                </div>

                {/* Weather Condition Icon */}
                <div className="flex items-center justify-center w-1/3 sm:w-full my-0 sm:my-3">
                    <div className="p-2 bg-amber-50 dark:bg-amber-950/30 rounded-full">
                        <WiDaySunny className="text-3xl sm:text-4xl text-amber-500" />
                    </div>
                </div>

                {/* Temperature Section */}
                <div className="flex items-center gap-1 justify-end sm:justify-center w-1/3 sm:w-full">
                    <WiThermometer className="text-2xl text-rose-500 sm:hidden" />
                    <h2 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                        {Math.round(temp)}°C
                    </h2>
                </div>
            </div>
        )
    })

    return (
        <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-linear-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-950 rounded-2xl shadow-xl border border-slate-200/60 dark:border-slate-800/80">
            {/* Header Section */}
            <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                        Weekly Weather Forecast
                    </h2>
                    <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                        7-day local average temperatures overview
                    </p>
                </div>
                <span className="self-start sm:self-auto px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100/80 dark:text-blue-300 dark:bg-blue-900/40 rounded-full border border-blue-200/40 dark:border-blue-700/30">
                    Live Data
                </span>
            </header>
            
            {/* Responsive Grid Layout Container */}
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
                {dailyArr}
            </div>
        </div>
    )
}
