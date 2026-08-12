//import JSX for typescript
import { JSX } from 'react'

//Declare interface for typescript
interface Time {
    timeStamp: String,
    currentDate: String
}

//export the default function which renders the time and date as a JSX element
export default function DateTime(props: Time):JSX.Element{
    
    //Return the jsx element
    return (
        <div className="mt-7">
          <h1 className="text-7xl">{props.timeStamp}</h1>
          <p>{props.currentDate}</p>
        </div>
    )
}