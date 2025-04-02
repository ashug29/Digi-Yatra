import { useState, useEffect } from "react";
import "./BoardingPassVerify.css";
import { BoardingPass } from './BoardingPass.jsx';
import { Livefeed } from "./Livefeed.jsx";
import { ErrorBoundary } from './ErrorBoundary.jsx';
import { useContext } from "react";
import { Toggle } from "./GlobalState";

export function BoardingPassVerify() {
  const [toggle,setToggle]=useContext(Toggle)
  const flight = sessionStorage.getItem('flight') ? JSON.parse(sessionStorage.getItem('flight')) : [];
  const Seats = sessionStorage.getItem('seats') ? JSON.parse(sessionStorage.getItem('seats')) : [];
  const details = JSON.parse(sessionStorage.getItem('details')) || [];
  const [visibleIndex, setVisibleIndex] = useState(null);
  const [webcamVerify, setwebcamVerify] = useState(false);
  const [verifiedname, setverifiedname] = useState(null);
  const [updatedDetails, setUpdatedDetails] = useState([]);
  const [verifiedPassengers, setVerifiedPassengers] = useState([]);

  useEffect(() => {
    const updated = details.map((passenger, index) => ({
      ...passenger,
      seat: Seats[index] || null,
    }));
    setUpdatedDetails(updated);
  }, [details, Seats]);

  const handleVisibility = (index) => {
    setVisibleIndex(visibleIndex === index ? null : index);
  };

  const handleVerification = (name) => {
    setverifiedname(name);
    setwebcamVerify(false);

    if (name) {
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
    }
  };

  return (
    <div className={`verify-bp ${toggle?"":"main"}`}>
      <div className="verify-bp-title">One Last Step to Fly</div>
      {verifiedPassengers.map((i, index) => (
        <div key={index} className="name-button-verfied">
          <div className="verfied-names">
            <img src="src/assets/verified.png" alt="Verified" />
            <div>{i.firstName}</div>
            <div>{`${i.lastName},`}</div>
            <div>Verified!</div>
          </div>
          <div>
            <img src="src/assets/BoardingPass.png" alt="Boarding Pass" />
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
                    source={flight[0]}
                    destination={flight[1]}
                    date={flight[2]}
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
      <div>
        {webcamVerify && (
          <div className="webcam-popup">
            <div className="webcam-popup-container">
              <div className="webcam-popup-title">Self Check In</div>
              <div className="webcam-popup-frame">
                <Livefeed onVerification={handleVerification} />
              </div>
              <div className="webcam-popup-button" onClick={() => setwebcamVerify(false)}>CANCEL</div>
            </div>
          </div>
        )}
      </div>
      <div className="passenger-verify">
        <div className="passenger-verify-button" onClick={() => setwebcamVerify(true)}>Verify Passenger</div>
      </div>
    </div>
  );
}
