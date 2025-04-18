import './PassengerField.css'
import { useEffect, useState } from 'react'
import InputBox from './InputBox.jsx'
import { useContext } from 'react';
import { AppContext } from './GlobalState';
import { WebcamCapture } from './WebcamCapture.jsx'
import { ErrorBoundary } from './ErrorBoundary.jsx';
import rotateface from '../assets/rotateface.gif'
import webcam from '../assets/webcam.png'

export function PassengerField({ index = 1, onChange = () => {} }) {
    const { hide, sethide } = useContext(AppContext);
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
        console.log("Captured Images Updated:", capturedImages);
        setPassengerData((prev) => ({ ...prev, images: capturedImages }));
    }, [capturedImages]);

    useEffect(() => {
        console.log("Passenger Data Updated:", passengerData);
        if (
            passengerData.firstName &&
            passengerData.lastName &&
            passengerData.email &&
            passengerData.images.length > 0
        ) {
            const timer = setTimeout(() => {
                console.log("Submitting Passenger Data:", passengerData);
                onChange(passengerData);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [passengerData, capturedImages, onChange]);

    return (
        <div className='passenger-field-container'>
            <div className='person-count'>{`Passenger ${index}`}</div>
            <div className='passenger-field-inputs'>
                <div className='full-name'>
                    <InputBox placeholder={"First Name"} onChange={(value) => handleValue("firstName", value)} />
                    <InputBox placeholder={"Last Name"} onChange={(value) => handleValue("lastName", value)} />
                </div>
                <InputBox placeholder={"Email Address"} onChange={(value) => handleValue("email", value)} />
            </div>

            <div className='passenger-field-capture-container'>
                <div className='instruction'>Capture your face from different angles
                    <span className='instruction-expanded'>i
                        <div className='instruction-tooltip'>Open the webcam, click and hold the button, then rotate your face from left to right and back to left for accurate results.</div>
                    </span>
                </div>
                <div className='motion-gif'><img src={rotateface} alt="Rotate Face" /></div>
                <div className={`webcam-button ${hide ? "" : "wb-hide"}`} onClick={() => { sethide(false) }}>
                    <img src={webcam} alt="Webcam Icon" />
                    <span>Webcam</span>
                </div>
                <ErrorBoundary>
                    <WebcamCapture onCapture={setCapturedImages} />
                </ErrorBoundary>
            </div>
        </div>
    );
}