import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./BoardingPassVerify.css";
import { BoardingPass } from "./BoardingPass.jsx";
import { Livefeed } from "./Livefeed.jsx";
import { ErrorBoundary } from "./ErrorBoundary.jsx";
import verified from '../assets/verified.png';
import { Toggle } from "./GlobalState";
import boardingpass from '../assets/BoardingPass.png'

export function BoardingPassVerify() {
  const [toggle] = useContext(Toggle);
  const navigate = useNavigate();

  const flight = sessionStorage.getItem('flight') ? JSON.parse(sessionStorage.getItem('flight')) : {};
  const Seats = JSON.parse(sessionStorage.getItem("seats")) || [];
  const details = JSON.parse(sessionStorage.getItem("details")) || [];

  const [visibleIndex, setVisibleIndex] = useState(null);
  const [webcamVerify, setWebcamVerify] = useState(false);
  const [verifiedPassengers, setVerifiedPassengers] = useState([]);
  const [updatedDetails, setUpdatedDetails] = useState([]);
  
  useEffect(() => {
    if (details.length > 0 && Seats.length > 0) {
      const newUpdatedDetails = details.map((passenger, index) => ({
        ...passenger,
        seat: Seats[index] || null,
      }));
      if (JSON.stringify(updatedDetails) !== JSON.stringify(newUpdatedDetails)) {
        setUpdatedDetails(newUpdatedDetails);
      }
    }
  }, [details, Seats]);

  const handleVisibility = (index) => {
    setVisibleIndex(visibleIndex === index ? null : index);
  };

  const handleVerification = (name) => {
    if (!name) return;
    
    const matchedPassenger = updatedDetails.find(
      (passenger) =>
        passenger.firstName === name.firstName &&
        passenger.lastName === name.lastName
    );

    if (matchedPassenger) {
      setVerifiedPassengers((prev) => {
        const alreadyVerified = prev.some(
          (p) => p.firstName === name.firstName && p.lastName === name.lastName
        );
        return alreadyVerified ? prev : [...prev, matchedPassenger];
      });
    }
    setWebcamVerify(false);
  };

  return (
    <div className={`verify-bp ${toggle ? "" : "main"}`}>
      <div className="verify-bp-title">One Last Step to Fly</div>
      {verifiedPassengers.map((i, index) => (
        <div key={index} className="name-button-verified">
          <div className="verified-names">
            <img src={verified} alt="Verified" />
            <div>{i.firstName}</div>
            <div>{`${i.lastName},`}</div>
            <div>Verified!</div>
          </div>
          <div>
            <img src={boardingpass} alt="Boarding Pass" />
            <span onClick={() => handleVisibility(index)}>BOARDING PASS</span>
          </div>
          {visibleIndex === index && (
            <div className="display-popup-verified" onClick={() => setVisibleIndex(null)}>
              <div className="display-screen-container-verified" onClick={(e) => e.stopPropagation()}>
                <div className="display-screen-title-verified">
                  <b>Approved Boarding Pass</b> (Self-Check-in Completed)
                </div>
                <ErrorBoundary>
                  <BoardingPass
                    source={flight.from}
                    destination={flight.to}
                    date={flight.date}
                    firstname={i.firstName}
                    lastname={i.lastName}
                    verified={true}
                    seat={i.seat}
                  />
                </ErrorBoundary>
                <div className="display-screen-buttons-verified">
                  <div onClick={() => setVisibleIndex(null)}>CANCEL</div>
                  <div onClick={() => window.print()}>PRINT</div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      {webcamVerify && (
        <div className="webcam-popup">
          <div className="webcam-popup-container">
            <div className="webcam-popup-title">Self Check In</div>
            <div className="webcam-popup-frame">
              <Livefeed onVerification={handleVerification} />
            </div>
            <div className="webcam-popup-button" onClick={() => setWebcamVerify(false)}>CANCEL</div>
          </div>
        </div>
      )}
      <div className="passenger-verify">
        <div className="passenger-verify-button" onClick={() => setWebcamVerify(true)}>Verify Passenger</div>
      </div>
    </div>
  );
}
