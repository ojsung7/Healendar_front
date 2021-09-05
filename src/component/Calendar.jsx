import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Content2 from './Content2';

function Calendar(props) {
    const [getDate, setDate] = useState(moment());

    //요청할 날짜
    const [reqDate, setReqdate] = useState();
    const [inputExer, setExer] = useState('');
    // const [ExerTypes, setType] = useState([])

    useEffect(() => {
    }, [])
    const test = (e) => {
        setReqdate(e.target.id);
        console.log(reqDate)
    }
    const inputExercise = (e) => {
        setExer(e.target.value)
    }
    const AddType = (e) => {
        console.log('added')
    }


    const today = getDate;
    //이번달의 첫주의 (총 주차)
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
                                <td id={getDate.format('YYYY-MM-') + days.format('DD')} onClick={test} key={index} style={{ backgroundColor: '#FFEBFE' }}>
                                    {days.format('D')}
                                </td>
                            );
                        } else if (days.format('MM') !== today.format('MM')) {  //이번 달 아닌 날짜
                            if (days.format('DD') > 20) {
                                return (
                                    <td id={getDate.format('YYYY-') + getDate.clone().subtract(1, 'month').format("MM-") + days.format('DD')} onClick={test} key={index} style={{ backgroundColor: '#F6F6F6' }}>
                                        {days.format('D')}
                                    </td>
                                )
                            }
                            else if (days.format('DD') < 10) {
                                return (
                                    <td id={getDate.format('YYYY-') + getDate.clone().add(1, 'month').format("MM-") + days.format('DD')} onClick={test} key={index} style={{ backgroundColor: '#F6F6F6' }}>
                                        {days.format('D')}
                                    </td>
                                )
                            }
                        } else {
                            return (
                                <td id={getDate.format('YYYY-MM-') + days.format('DD')} onClick={test} key={index} >
                                    {days.format('D')}
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
                <div className='realCal'>
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

                {/*클릭한 날짜가 있을 때 Content2 컴포넌트 출력*/}
                {reqDate != null
                    ? <div className='AboutToday'>
                        <h3>{reqDate}</h3>
                        <label><input type="checkbox"></input>스쿼트</label>
                        <label><input type="checkbox"></input>윗몸일으키기</label>
                        <label><input type="checkbox"></input>걷기</label>
                        <label><input type="checkbox"></input>달리기</label>
                        <label><input type="checkbox"></input>아령</label>

                        <div className='Adding'>
                            <input type='text' name='input_detail' value={inputExer} onChange={inputExercise} />                        
                            <button onClick={AddType}>Add</button>
                        </div>
                    </div>
                    : null}
            </div>



        </>
    );
}

export default Calendar;


// * lastweek - 삼항연산자 의미 ; (1년 = 52주+몇일) => 마지막 주가 첫주로 표현될 때, 53주로 만들어주기 위해 사용 (아마)
