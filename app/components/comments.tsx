import { JSX } from "react"

import { WiThermometer } from "react-icons/wi"
import { FaArrowTrendUp } from "react-icons/fa6"
import { FaArrowTrendDown } from "react-icons/fa6"
import randomComments from "../utils/randomComments"

interface CommentsProps{
    incTemp: boolean
}

export default function Comments(props : CommentsProps): JSX.Element {

    const isTempIncreasing = props.incTemp
    const comment = randomComments(isTempIncreasing)

    return (
        <div className="w-full max-w-7xl mx-auto p-4 sm:p-1 mt-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white/60 dark:bg-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-200/60 dark:border-slate-700/40 shadow-sm transition-all duration-300 hover:shadow-md">
                
                {/* Main Content & Status Block */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    {/* Thermometer Visual Anchor */}
                    <div className="p-3 bg-blue-50 dark:bg-slate-900/50 text-blue-600 dark:text-blue-400 rounded-xl shrink-0 shadow-inner">
                        <WiThermometer className="text-3xl sm:text-4xl animate-pulse" />
                    </div>

                    {/* Dynamic Text Container */}
                    <div className="space-y-0.5">
                        <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">
                            Daily Comparison Trend
                        </span>
                        <h1 className="text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-200 leading-relaxed max-w-xl">
                            {comment}
                        </h1>
                    </div>
                </div>

                {/* Trend Dynamic Indicator Badge */}
                <div className="w-full sm:w-auto flex justify-end sm:justify-center border-t border-slate-100 dark:border-slate-800/60 sm:border-0 pt-3 sm:pt-0">
                    {isTempIncreasing ? (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/30 rounded-full border border-rose-100 dark:border-rose-900/30 shadow-sm">
                            <FaArrowTrendUp className="text-xl shrink-0" />
                            <span>Temperature Up</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-teal-600 bg-teal-50 dark:text-teal-400 dark:bg-teal-950/30 rounded-full border border-teal-100 dark:border-teal-900/30 shadow-sm">
                            <FaArrowTrendDown className="text-xl shrink-0" />
                            <span>Temperature Down</span>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
