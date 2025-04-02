import './PassengerField.css'
import { useEffect, useState } from 'react'
import InputBox from './InputBox.jsx'
import { useContext } from 'react';
import { AppContext } from './GlobalState';
import { WebcamCapture } from './WebcamCapture.jsx'
import { ErrorBoundary } from './ErrorBoundary.jsx';
export function PassengerField({index=1,onChange=()=>{}}){
    const{hide,sethide}=useContext(AppContext)
    const [capturedImages, setCapturedImages] = useState([]);
    const [passengerData, setPassengerData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        images: []
    });
    const handleValue = (field, value) => {
        setPassengerData((prev) => ({ ...prev, [field]: value }));
    };

    useEffect(() => {
        setPassengerData((prev) => ({ ...prev, images: capturedImages }));
    }, [capturedImages]);

    useEffect(() => {
        if (passengerData.firstName && passengerData.lastName && passengerData.email && passengerData.images) {
            const timer = setTimeout(() => {
                onChange(passengerData);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [passengerData, onChange]);
    return(
        <div className='passenger-field-container'>
            <div className='person-count'>{`Passenger ${index}`}</div>
            <div className='passenger-field-inputs'>
                <div className='full-name'>
                    <InputBox placeholder={"First Name"} onChange={(value) => handleValue("firstName", value)}/>
                    <InputBox placeholder={"Last Name"} onChange={(value) => handleValue("lastName", value)}/>
                </div>
                <InputBox placeholder={"Email Address"} onChange={(value) => handleValue("email", value)}/>
            </div>
            
            <div className='passenger-field-capture-container'>
                <div className='instruction'>Capture your face from different angles 
                    <span className='instruction-expanded'>i
                        <div className='instruction-tooltip'>Open the webcam, click and hold the button, then rotate your face from left to right and back to left for accurate results.</div>
                        </span></div>
                <div className='motion-gif'><img src='src/assets/rotateface.gif'/></div>
                <div className={`webcam-button ${hide?"":"wb-hide"}`} onClick={()=>{sethide(false)}}>
                    <img src="src/assets/webcam.png"/>
                    <span>Webcam</span>
                </div> 
                <ErrorBoundary><WebcamCapture onCapture={setCapturedImages}/></ErrorBoundary> 
            </div>
        </div>
    )
}
