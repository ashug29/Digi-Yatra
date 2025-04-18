import "./FlightOption.css"
import { airports } from "./Airports";
import {Flights} from './Flights'
import akasa from '../Airlines/akasa.png'
import indigo from '../Airlines/IndiGo.png'
import spicejet from '../Airlines/spicejet.png'
import airindia from '../Airlines/Air-india.png'
import { useNavigate } from "react-router-dom";
export function FlightOption({code1="XYZ",code2="XYZ",display=false}){
    const airportData=sessionStorage.getItem('flight') ? JSON.parse(sessionStorage.getItem('flight')) : {};
    const imgpath=[akasa,indigo,spicejet,airindia]
    const navigate = useNavigate();
    airports.map((x)=>{
        if(x.city===airportData.from){
            code1=x.code
        }
        else if(x.city===airportData.to)
        {
            code2=x.code
        }
        }
    )
    return(
        <div className={`flight-options-container ${display ? "" : "none"}`}>
        {
        Flights.map((x,index)=>(
        <>
        <div className="flight-options">
            <div className="airline"><img src={imgpath[index]}/></div>
            <div className="content">
                <div className="departure">
                    <span>{x.departure}</span>
                    <span>{code1}</span>
                </div>
                <div className="duration-nonstop">
                    <span>2hr 15min</span>
                    <hr/>
                    <span>Non Stop</span>
                </div>
                <div className="arrival">
                    <span>{x.arrival}</span>
                    <span>{code2}</span>
                </div>
            </div>
            <div className="price-select">
                <span>{x.price}</span>
                <div onClick={()=>{navigate("/passenger-details")}}>Select</div>
            </div>
        </div>
        </>
        ))
    }
    </div>
    )
}