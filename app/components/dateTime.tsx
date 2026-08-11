//imports
import { timeStamp } from 'console'
import { JSX } from 'react'

interface Time {
    timeStamp: String,
    currentDate: String
}

//export
export default function DateTime(props: Time):JSX.Element{
    return (
        <div className="mt-7">
          <h1 className="text-7xl">{props.timeStamp}</h1>
          <p>{props.currentDate}</p>
        </div>
    )
}