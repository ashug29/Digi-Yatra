import { useState,useEffect } from 'react'
import './PassengerDetails.css'
import { useNavigate } from "react-router-dom";
import { PassengerField } from './PassengerField'
import { useContext } from "react";
import { Toggle } from "./GlobalState";
import person from '../assets/person.png'
export function PassengerDetails(){
    const navigate = useNavigate();
    const [toggle,setToggle]=useContext(Toggle)
    const [PassengerData, setPassengerData] = useState(() => {
        const savedData = sessionStorage.getItem('details');
        return savedData ? JSON.parse(savedData) : [];
    });
    const [passengerCount, setPassengerCount] = useState(PassengerData.length || 1);
    useEffect(() => {
        const savedData = sessionStorage.getItem('details');
        if (savedData) {
            setPassengerData(JSON.parse(savedData));
        }
    }, []);
    const handleData = (data, index) => {
        setPassengerData((prev) => {
            const updatedData = [...prev];
            updatedData[index] = data;
            return updatedData;
        });
    };
    useEffect(() => {
        if (PassengerData.length > 0) { 
            sessionStorage.setItem('details', JSON.stringify(PassengerData));
        }
    }, [PassengerData]); 

    const handleAddPassenger = () => {
        if (passengerCount < 4) {
            setPassengerCount(passengerCount + 1);
            setPassengerData((prev) => [...prev, {}]);
        } else {
            alert("You can add up to 4 Passengers only");
        }
    };
    
    const handleNavigation = (path) => {
        if (passengerCount===PassengerData.length){
            sessionStorage.setItem('details', JSON.stringify(PassengerData));
            sessionStorage.setItem('count', JSON.stringify(passengerCount));
            navigate(path);
        }
    }; 
    return(
        <div className={`passenger-details ${toggle?"":"main"}`}>
            <div className='passenger-details-container-2'>
                <div className='profile'><div><img src={person}/></div></div>
                <div className='title'>Enter Details</div>
                {[...Array(passengerCount)].map((_, i) => (
                    <PassengerField key={i} index={i+1} onChange={(data) => handleData(data, i)} />
                ))}
                <div className='add-passenger'onClick={handleAddPassenger}>+ Add Passenger</div>
                <div className='passenger-detail-submit' onClick={() => handleNavigation('/select-seat')}>Submit</div>
            </div>
            <div className='previous-next-button'>
                <div className='previous' onClick={()=>{navigate('/search-flight')}}>Previous</div>
                <div className='next' onClick={()=>{navigate('/select-seat')}}>Next</div>
            </div>
        </div>
    )
}