import { useState } from "react";
import "./BoardingPassPrint.css";
import { BoardingPass } from './BoardingPass.jsx';
import { ErrorBoundary } from './ErrorBoundary.jsx';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Toggle } from "./GlobalState";
export function BoardingPassPrint() {
  const [toggle,setToggle]=useContext(Toggle)
  const Seats=sessionStorage.getItem('seats') ? JSON.parse(sessionStorage.getItem('seats')) : [];
  const navigate = useNavigate();
  const flight = sessionStorage.getItem('flight') ? JSON.parse(sessionStorage.getItem('flight')) : {};
  const details = JSON.parse(sessionStorage.getItem('details')) || [];
  const [visibleIndex, setVisibleIndex] = useState(null);
  const handleVisibility = (index) => {
    if (visibleIndex === index) {
      setVisibleIndex(null);
    } else {
      setVisibleIndex(index);
    }
  };
  const updatedDetails = details.map((passenger, index) => ({
    ...passenger,
    seat: Seats[index] || null,
  }));
  return (
    <div className={`collect-bp ${toggle?"":"main"}`}>
      <div className="collect-bp-title">Collect Your Boarding Pass</div>

      {updatedDetails.map((i, index) => (
        <div key={index} className="name-button">
          <div>{i.firstName}</div>
          <div>
            <img src="src/assets/BoardingPass.png" alt="Boarding Pass" />
            <span onClick={() => handleVisibility(index)}>BOARDING PASS</span>
          </div>
          {visibleIndex === index && (
            <div className="display-popup" onClick={() => setVisibleIndex(null)}>
              <div className="display-screen-container" onClick={(e) => e.stopPropagation()}>
                <div className="display-screen-title">
                  <b>Boarding Pass Issued</b> (Final Approval Pending)
                </div>
                <ErrorBoundary>
                  <BoardingPass source={flight.from} destination={flight.to} date={flight.date} firstname={i.firstName} lastname={i.lastName} seat={i.seat}/>
                </ErrorBoundary>
                <div className="display-screen-buttons">
                  <div onClick={() => setVisibleIndex(null)}>CANCEL</div>
                  <div onClick={() => window.print()}>PRINT</div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      <div className="check-in-previous">
      <div className="check-in-button" onClick={()=>{navigate('/self-checkin')}}>Check In</div>
      <div className="bp-previous-button" onClick={()=>{navigate('/select-seat')}}>Previous</div>
      </div>
    </div>
  );
}
