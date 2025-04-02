import { Route, Routes,Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'
import {ErrorBoundary} from './Components/ErrorBoundary'
import { Sidebar } from './Components/Sidebar'
import { SearchFlight } from './Components/SearchFlight'
import { Conclusion } from './Components/Conclusion'
import { PassengerDetails } from './Components/PassengerDetails'
import { PassengerField } from './Components/PassengerField'
import { BoardingPassPrint} from './Components/BoardingPassPrint'
import { BoardingPassVerify} from './Components/BoardingPassVerify'
import { SeatSelection } from './Components/SeatSelection'
function App() {
  useEffect(() => {
    const handleBeforeUnload = () => {
        sessionStorage.clear();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
    };
}, []);

  return (
    <>
    <ErrorBoundary><Sidebar/></ErrorBoundary>
      <Routes>
        <Route path="/" element={<Navigate to="/search-flight"/>}/>
        <Route path="/search-flight" element={<ErrorBoundary><SearchFlight/></ErrorBoundary>} />
        <Route path="/conclusion" element={<ErrorBoundary><Conclusion/></ErrorBoundary>} />
        <Route path="/passenger-details" element={<ErrorBoundary><PassengerDetails/></ErrorBoundary>}/>
        <Route path="/passenger-field" element={<ErrorBoundary><PassengerField/></ErrorBoundary>}/>
        <Route path="/boarding-pass" element={<ErrorBoundary><BoardingPassPrint/></ErrorBoundary>} />
        <Route path="/self-checkin" element={<ErrorBoundary><BoardingPassVerify/></ErrorBoundary>} />
        <Route path="/select-seat" element={<ErrorBoundary><SeatSelection/></ErrorBoundary>} />
      </Routes>
    </>
  )
}

export default App
