import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Toggle } from "./GlobalState";
import normalseat from '../assets/NormalSeat.png'
import selectedseat from '../assets/SelectedSeat.png'
import './SeatSelection.css';
export function SeatSelection(){
    const [toggle,setToggle]=useContext(Toggle)
    const navigate = useNavigate();
    const count=Number(sessionStorage.getItem('count'))
    const [list,setlist]=useState([])
    const handleClick = (event) => {
        const n = event.target;
        const seatKey = n.getAttribute("data-key");
        setlist((prevList) => {
            const newSelection = !prevList.includes(seatKey);
            n.src = newSelection 
                ? selectedseat 
                : normalseat;

                if (newSelection) {
                    return prevList.length < count 
                        ? [...prevList, seatKey] 
                        : (() => {
                            const firstElement = prevList[0];
                            document.querySelector(`[data-key='${firstElement}']`)?.setAttribute("src", normalseat);
                            return prevList.slice(1).concat(seatKey);
                        })();
                }  
            else {
                n.src = normalseat;
                return prevList.filter((seat) => (seat !== seatKey));
            }
        });
    };
    const handleNext = () => {
        sessionStorage.setItem("seats", JSON.stringify(list));
        navigate('/boarding-pass')
    };
    const rows=(x)=>{
        return(
        <div className='rows'>
            <div className='row-left'>
                <div className='row-left-seats'>
                    <img src={normalseat} data-key={`${x}A`} className='seat-image' onClick={handleClick}/>
                    <img src={normalseat} data-key={`${x}B`} className='seat-image' onClick={handleClick}/>
                    <img src={normalseat} data-key={`${x}C`} className='seat-image' onClick={handleClick}/>
                </div>
                <div className='row-left-no'>
                    <div className='seat-no'>{`${x}A`}</div>
                    <div className='seat-no'>{`${x}B`}</div>
                    <div className='seat-no'>{`${x}C`}</div>
                </div>
            </div>
            <div className='row-right'>
                <div className='row-right-seats'>
                    <img src={normalseat} data-key={`${x}D`} className='seat-image' onClick={handleClick}/>
                    <img src={normalseat} data-key={`${x}E`} className='seat-image' onClick={handleClick}/>
                    <img src={normalseat} data-key={`${x}F`} className='seat-image' onClick={handleClick}/>
                </div>
                <div className='row-right-no'>
                    <div className='seat-no'>{`${x}D`}</div>
                    <div className='seat-no'>{`${x}E`}</div>
                    <div className='seat-no'>{`${x}F`}</div>
                </div>
            </div>
        </div>
        )
    }
    return(
        <div className={`seat-selection ${toggle?"":"main"}`}>
            <div className='seat-selection-title'>{`Select ${count} Seat(s)`}</div>
            <div className='selection-previous-next'>
                <div className='selection-previous' onClick={()=>navigate('/passenger-details')}>Previous</div>
                <div className='selection-next' onClick={handleNext}>Next</div>
            </div>
            <div className='aircraft'>
                <div className='aircraft-face'></div>
                <div className='aircraft-seats'>
                {[...Array(14)].map((_, i) => (
                    rows(i+1)
                ))}
                </div>
                <div className='aircraft-vision'></div>
                <div className='aircraft-wings'></div>
            </div>
        </div>
    )
}