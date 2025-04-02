import Webcam from "react-webcam";
import './WebcamCapture.css'
import { useContext} from 'react';
import { AppContext } from './GlobalState';
import React, { useRef, useState } from "react";
import { useEffect } from "react";
export function WebcamCapture({ onCapture }){
    const{hide,sethide}=useContext(AppContext)
    const webcamRef = useRef(null);
    const [images, setImages] = useState([]);
    const captureIntervalRef = useRef(null);
    const maxScreenshots = 10;
    const videoConstraints = {
        width: 350,
        height: 200,
        facingMode: "user"
      };

    const handleMouseDown = () => {
        setImages([]);
        let count = 0;
        captureIntervalRef.current = setInterval(() => {
            if (webcamRef.current && count < maxScreenshots) {
                const screenshot = webcamRef.current.getScreenshot();
                if (screenshot) {
                    setImages((prevImages) => [...prevImages, screenshot]);
                    count++;
                }
            }
            if (count >= maxScreenshots) {
                clearInterval(captureIntervalRef.current);
            }
        }, 200);
    };
    const handleMouseUp = () => {
        clearInterval(captureIntervalRef.current);
    };
    useEffect(() => {
        return () => clearInterval(captureIntervalRef.current);
    }, []);

    useEffect(() => {
        onCapture(images);
    }, [images, onCapture]);

        return(
            <>
        <div className={`camera-frame ${hide?"cf-hide":""}`}>
                <div className="title-exit">
                    <div className="frame-title">Webcam</div>
                    <div className="frame-exit" onClick={()=>{sethide(true)}}>x</div>
                </div>
            {!hide &&(
                <Webcam
                ref={webcamRef}
                audio={false}
                height={200}
                screenshotFormat="image/jpeg"
                width={350}
                videoConstraints={videoConstraints}
                mirrored={true}
                ></Webcam>
            )}
            <div className="capture-button"
            onMouseDown={handleMouseDown} 
            onMouseUp={handleMouseUp} 
            onMouseLeave={handleMouseUp}
            >Hold To Capture</div>
        </div>
            <div className="captures">
                {images.map((img, index) => (
                    <img key={index} src={img}/>
                ))}
            </div>
            </>
)
}