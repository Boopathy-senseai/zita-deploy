import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import styles from './calendar.module.css';
const Calendar = () => {
    const calendarHandler = (e:React.MouseEvent,x:number) => {
        e.preventDefault();
        // console.log(x)
        dispatch({type:'display',date:x})
    }
    const v = useSelector((state:{date:0,showDate:false}) => state.date)
    const dispatch = useDispatch()
    console.log(v);
    const date=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
    return (
        <div>
            <ul className={styles.weekdays}>
                <li>Mo</li>
                <li>Tu</li>
                <li>We</li>
                <li>Th</li>
                <li>Fr</li>
                <li>Sa</li>
                <li>Su</li>
            </ul>
            <ul className={styles.days}>
                {date.map((x,index) => {
                    return <li key={index} ><button onClick={e => calendarHandler(e,x)}>{x}</button></li>
                }
                )}
            </ul>
        </div>
    )
}
export default Calendar;