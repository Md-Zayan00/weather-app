//import the jsx type from react
import { JSX } from 'react'

//export the default pulsating loading screen
export default function LoadingPulse(): JSX.Element{
    return (
  <div className="mx-auto mt-8 w-full max-w-4xl lg:max-w-6xl animate-pulse space-y-6 px-4 md:px-8">
    
    {/* Hero Card Skeleton (Temperature + Icon + DateTime) */}
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl bg-black/30 p-6 md:p-8 border border-white/10 backdrop-blur-sm">
      
      {/* Weather Icon & Temp Skeleton */}
      <div className="flex items-center gap-6 w-full md:w-auto">
        <div className="size-20 md:size-24 rounded-full bg-white/10 shrink-0"></div>
        <div className="space-y-3 w-32">
          <div className="h-12 md:h-16 w-full rounded-lg bg-white/10"></div>
          <div className="h-4 w-3/4 rounded bg-white/5"></div>
        </div>
      </div>

      {/* Date & Time Skeleton */}
      <div className="w-full md:w-48 space-y-2 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
        <div className="h-5 w-2/3 rounded bg-white/10"></div>
        <div className="h-4 w-full rounded bg-white/5"></div>
      </div>
    </div>

    {/* Secondary Metrics Bar Skeleton (4 Grid Cards) */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-black/30 rounded-xl p-4 md:p-6 border border-white/10 backdrop-blur-sm">
      <div className="h-10 rounded-lg bg-white/10"></div>
      <div className="h-10 rounded-lg bg-white/10"></div>
      <div className="h-10 rounded-lg bg-white/10"></div>
      <div className="h-10 rounded-lg bg-white/10"></div>
    </div>

    {/* Graph Placeholder Skeleton */}
    <div className="h-48 md:h-64 w-full rounded-xl bg-black/30 border border-white/10 backdrop-blur-sm p-6 flex items-end gap-3">
      <div className="h-1/3 w-full rounded-t bg-white/5"></div>
      <div className="h-2/3 w-full rounded-t bg-white/10"></div>
      <div className="h-1/2 w-full rounded-t bg-white/5"></div>
      <div className="h-3/4 w-full rounded-t bg-white/10"></div>
      <div className="h-2/5 w-full rounded-t bg-white/5"></div>
    </div>

  </div>
)
}