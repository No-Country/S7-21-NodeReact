import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoPay } from '../store/barber/barberSlice';
import { FaChevronLeft } from "react-icons/fa"
export const Pagos = ({id})=> {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const dispatch = useDispatch()
    const loading = useSelector((state)=> state.barber.loadingPay)
    const paybarber = useSelector((state)=> state.barber.payBarber)
    const error = useSelector((state)=> state.barber.errorPay)
    console.log(paybarber, "pay barber")
    useEffect(()=> {
        if (startDate && endDate) {
            const payload = {
                startDate, endDate
            }
            dispatch(getInfoPay(payload, id))
        }
    }, [dispatch, startDate, endDate, id])
    return (
        <div>
            <div className="container_user_info">
            <FaChevronLeft/>
            <img src={paybarber.barberInfo?.profileImage} alt={`img profile ${paybarber.barberInfo?.firstName}`} />
            <div className='title_user'>{paybarber.barberInfo?.firstName}</div>
            </div>
 
            <div className="container_datepicker_and_table">
<div className="container_picker">
<DatePicker
  selected={startDate}
  onChange={(date) => setStartDate(date)}
  selectsStart
  startDate={startDate}
  endDate={endDate}
/>

<DatePicker
  selected={endDate}
  onChange={(date) => setEndDate(date)}
  selectsEnd
  startDate={startDate}
  endDate={endDate}
  minDate={startDate}
/>
</div>
<div className="container_table">
    <table>
        <tr className='title_table'>
            <th>Servicio</th>
            <th>Cantidad</th>
            <th>Valor</th>
            <th>50%</th>
            <th>Total</th>
        </tr>
        {
            paybarber.servicesAnalytics?.map((pay)=> (
                <tr key={pay.id}>
<td>{pay.name}</td>
<td>{pay.quantity}</td>
<td>{pay.totalBarber}</td>
<td>{pay.singleTotalBarber}</td>
<td>{pay.totalCost}</td>
                </tr>
            ))
        }

    </table>
    <div className="container_total">
        Total: {paybarber?.paymentBarber}
    </div>
</div>
            </div>
           
        </div>
    )
}