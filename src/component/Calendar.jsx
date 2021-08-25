import React, { useState } from 'react';
import moment from 'moment';
import Content2 from './Content2';

function Calendar(props) {
    const [getDate, setDate] = useState(moment());

    const today = getDate;
    const firstWeek = today.clone().startOf('month').week(); 
    const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week(); 
    const calArr = () => {
        let result = [];
        let week = firstWeek;
        for (week; week <= lastWeek; week++) { //한달
            result = result.concat(     //concat 
                <tr key={week}>{
                    Array(7).fill(0).map((data, index) => {
                        let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day');   //index(0~6)로 day+index 하면서 한 주 기록
                        if (moment().format('YYYYMMDD') === days.format('YYYYMMDD')) {  //오늘
                            return (
                                <td key={index} style={{ backgroundColor: 'skyblue' }}>
                                    <span>{days.format('D')}</span>
                                </td>
                            );
                        } else if (days.format('MM') !== today.format('MM')) {  //이번 달 아닌 날짜
                            return (
                                <td key={index} style={{ backgroundColor: '#dcdcdc' }}>
                                    <span>{days.format('D')}</span>
                                </td>
                            );
                        } else {  
                            return (
                                <td key={index} >
                                    <span>{days.format('D')}</span>
                                </td>
                            );
                        }
                    })
                }</tr>
            )
        }
        return result;
    }


    return (
        <>
            <div className='Calendar'>
                <div className='CalTop'>
                    <button onClick={() => { setDate(getDate.clone().subtract(1, 'month')) }}>previous month</button>   
                    <h1>{today.format('YYYY.MM')}</h1>
                    <button onClick={() => { setDate(getDate.clone().add(1, 'month')) }}>next month</button>
                </div>

                <table>
                    <tbody>
                        {calArr()}
                    </tbody>
                </table>
            </div>
            <Content2 />
        </>
    );
}

export default Calendar;


// * lastweek - 삼항연산자 의미 ; (1년 = 52주+몇일) => 마지막 주가 첫주로 표현될 때, 53주로 만들어주기 위해 사용 (아마)
