import "./SearchFlight.css";
import Input_Dropdown_Button from "./Input_Dropdown_Button";
import { FlightOption } from "./FlightOption";
import { useState,useEffect } from "react";
import {airports} from "./Airports";
import { useContext } from "react";
import { Toggle } from "./GlobalState";
import DateButton from "./DateButton";
export function SearchFlight(){
    const [toggle,setToggle]=useContext(Toggle)
    const [list, setList] = useState({
        from: "",
        to: "",
        date: ""
    });
    const [viewflight,setviewflight]=useState(false);
    const handleValue = (data, type) => {
        const selectedAirport = airports.find((airport) => airport.title === data);
        if (!selectedAirport) 
            return;
        const newValue = selectedAirport.city;

        setList((prevList) => {
            if (type === "from" && newValue === prevList.to) {
                alert("Source and Destination can't be same");
                return prevList;
            } else if (type === "to" && newValue === prevList.from) {
                alert("Source and Destination can't be same");
                return prevList;
            }
            return { ...prevList, [type]: newValue };
        });
    };

    const handleDate = (data) => {
        setList((prevList) => ({ ...prevList, date: data }));
    };

    useEffect(() => {
        sessionStorage.setItem("flight", JSON.stringify(list));
    }, [list]);
    return(
        <div className={`search-flight-container-1 ${toggle?"":"main"}`} id={viewflight?"":"non-view"}>
        <div className="search-flight-container-2">
            <div className="search-flight-title">Search Flight</div>
            <div className="search-flight-container-3">
            <div className="search-flight-input">
               <Input_Dropdown_Button data={airports} placeholder={"From"} width={300} type={"text"} onChange={(value) => handleValue(value, "from")}/>
                <div className="two-way"><img src="src/assets/vice-versa.png"/></div>
                <Input_Dropdown_Button data={airports} placeholder={"To"} width={300} type={"text"} onChange={(value) => handleValue(value, "to")} />
            </div>
            <DateButton placeholder={"Date"} onChange={handleDate}></DateButton>
            <div className="search-flight-button" onClick={()=>setviewflight(true)}><img src="src/assets/search-button.png"/></div>
            </div>
            <FlightOption display={viewflight}></FlightOption>
        </div>
        </div>
        
    )
}



