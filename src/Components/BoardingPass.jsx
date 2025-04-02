import './BoardingPass.css'
import QRCode from 'react-qr-code'
export function BoardingPass({firstname=undefined,lastname=undefined,source=undefined,destination=undefined,seat=undefined,date=undefined,verified=false}){
    return(
        <div className='overlap'>
        <table id="BoardingPass">
        <tr className='top-row'>
            <th className='top-row-content-1'><img src="src/assets/flight-1.png"/>Boarding Pass (Web Check In)</th>
            <th className='top-row-content-2'>Your Departure Terminal is T1<img src="src/assets/flight-1.png"/></th>
        </tr>
        <tr className='second-row'>
        <td className='part-1'>
                <div className='part-1-name-journey'>
                    <div>{`${firstname}/${lastname}`}</div>
                    <div>{`${source} (T1) To ${destination}`}</div>
                </div>
                <tr className='middle-table'>
                    <td>
                        <div>Flight</div>
                        <div>6E 6182</div>
                    </td>
                    <td>
                        <div>Gate A21</div>
                        <div>6E 6182</div>
                    </td>
                    <td>
                        <div>Boarding Time</div>
                        <div>1500</div>
                    </td>
                    <td>
                        <div>Boarding</div>
                        <div>Zone 1</div>
                    </td>
                    <td>
                        <div>Seat</div>
                        <div>{seat}</div>
                    </td>
                </tr>
                <div className='part-1-container-1'>
                    <QRCode value={`${firstname} ${lastname}` || "No Name"} className='qr-1'/>
                    <div className='part-1-container-2'>
                        <div className='bp-down-container'>
                            <div className='bp-down-content'>
                                <div>Date</div>
                                <div>Seq</div>
                            </div>
                            <div className='bp-down-content'>
                                <div>{date}</div>
                                <div>0102</div>
                            </div>
                            <div className='bp-down-content'>
                                <div>Departure</div>
                                <div>Services</div>
                            </div>
                            <div className='bp-down-content'>
                                <div>1555 Hrs</div>
                                <div>NIL</div>
                            </div>
                        </div>
                        <div className='warning'>Gate is subject to change and will close 25 minutes prior to departure.</div>
                    </div>
                </div>
        </td>
        <td className='part-2'>
            <div>{`${firstname}/${lastname}`}</div>
            <div>{`${source} (T1) To ${destination}`}</div>
            <div className='part-2-content'>
                <div>Flight</div>
                <div>6E 6182</div>
            </div>
            <div className='part-2-content'>
                <div>Date</div>
                <div>{date}</div>
            </div>
            <div className='part-2-content'>
                <div>PNR</div>
                <div>KV4FXW</div>
            </div>
            <div className='part-2-content'>
                <div>Service</div>
                <div>NIL</div>
            </div>
            <div className='qr-2-container'>
                <QRCode value={`${firstname} ${lastname}` || "No Name"} className='qr-2'/>
                <div className='seat-seq'>
                <div className='part-2-content'>
                    <div>Seat</div>
                    <div>{seat}</div>
                </div>
                <div className='part-2-content'>
                    <div>Seq</div>
                    <div>0102</div>
                </div>
                </div>
            </div>
        </td>
        </tr>
       </table>
       { verified && (
       <img src='src/assets/approved.png' className='approved'/>
       )}
       </div>
    )
}
