import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Content2 from './Content2';
import axios from 'axios';

function Calendar(props) {
    const [getDate, setDate] = useState(moment());
    const [getDBdata, setDBdata] = useState([{
        gid: '',
        id: '',
        date: '',
        todo: ''
    }])

    //요청할 날짜
    const [reqDate, setReqdate] = useState();
    const [inputExer, setExer] = useState('');
    const [inputCount, setCount] = useState('');

    const [tabletest, getvalue] = useState(['1','2','3']);
    const [tabletest2, getvalue2] = useState([['스쿼트'],['45회'],['1']]);

    useEffect(async () => {
        try {
            const data = await axios.post("http://localhost:8080/todo/get");
            for (let i = 0; i < data.data.length; i++) {
                setDBdata(getDBdata.push(data.data[i]));
            }
            console.log(getDBdata)

        } catch (e) {
            console.error(e.message)
        }

    }, [])
    const getTodo = async (e) => {
        setReqdate(e.target.id);
        const param = {
            id:"tester",
            date:e.target.id
        }
        const data = await axios.post("http://localhost:8080/todo/findTodo", param);
        console.log(data.data);
    }
    const inputExercise = (e) => {
        setExer(e.target.value)
    }
    const inputExerCount = (e) => {
        setCount(e.target.value)
    }
    const AddType = (e) => {
        getvalue(tabletest2[0].push(inputExer))
        getvalue(tabletest2[1].push(inputCount))
        getvalue(tabletest2[2].push('0'))
        console.log(tabletest2)
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
                                <td id={getDate.format('YYYY-MM-') + days.format('DD')} onClick={getTodo} key={index} style={{ backgroundColor: '#FFEBFE' }}>
                                    {days.format('D')}
                                </td>
                            );
                        } else if (days.format('MM') !== today.format('MM')) {  //이번 달 아닌 날짜
                            if (days.format('DD') > 20) {
                                return (
                                    <td id={getDate.format('YYYY-') + getDate.clone().subtract(1, 'month').format("MM-") + days.format('DD')} onClick={getTodo} key={index} style={{ backgroundColor: '#F6F6F6' }}>
                                        {days.format('D')}
                                    </td>
                                )
                            }
                            else if (days.format('DD') < 10) {
                                return (
                                    <td id={getDate.format('YYYY-') + getDate.clone().add(1, 'month').format("MM-") + days.format('DD')} onClick={getTodo} key={index} style={{ backgroundColor: '#F6F6F6' }}>
                                        {days.format('D')}
                                    </td>
                                )
                            }
                        } else {
                            return (
                                <td id={getDate.format('YYYY-MM-') + days.format('DD')} onClick={getTodo} key={index} >
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
    //const tableheader = ["√", "운동명", "count/time", "×"];
    
    // const finddate = (target) => {
    //     console.log(getDBdata.length)
    //     for (let i = 0; i < getDBdata.length; i++) {
    //         console.log(getDBdata[i].date, getDBdata[i].todo);
    //         if (getDBdata[i].date == reqDate) return getDBdata[i].todo;
    //     }
    //     const nonedata = ['none'];
    //     return nonedata;
    // }
    const todotable = () => {
        let tabledata = []
        for(let i=0;i<tabletest2[0].length;i++){
            tabledata = tabledata.concat(
                <tr>
                    <td><input type='checkbox' /></td>
                    <td>{tabletest2[0][i]}</td>
                    <td>{tabletest2[1][i]}</td>
                    <td>{tabletest2[2][i]}</td>
                </tr>
            )
        }
        return tabledata
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
                        <div className='Adding'>
                            <table>
                                <thead>
                                    <tr>
                                        <th className='check'>√</th>
                                        <th className='title'>운동명</th>
                                        <th className='count'>count/time</th>
                                        <th className='delete'>×</th>
                                        {/* {tableheader.map(i => <th>{i}</th>)} */}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td><input type='text' name='input_name' value={inputExer} onChange={inputExercise} /></td>
                                        <td><input type='text' name='input_count' value={inputCount} onChange={inputExerCount} /></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td colSpan='4'><button onClick={AddType}>Add</button></td>
                                    </tr>
                                    
                                    {todotable()}
                                </tbody>

                            </table>

                        </div>
                        {/* {finddate(reqDate).map((item) => (
                            <label><input type="checkbox"></input>
                                {item}
                            </label>
                        ))
                        } */}
                        {/* {finddate(reqDate).map((item) => (
                                <label><input type="checkbox"></input>
                                    {item}
                                </label>
                            ))
                            } */}
                        {/* <label><input type="checkbox"></input>스쿼트</label>
                        <label><input type="checkbox"></input>윗몸일으키기</label>
                        <label><input type="checkbox"></input>걷기</label>
                        <label><input type="checkbox"></input>달리기</label>
                        <label><input type="checkbox"></input>아령</label> */}


                    </div>
                    : null}
            </div>



        </>
    );
}

export default Calendar;


// * lastweek - 삼항연산자 의미 ; (1년 = 52주+몇일) => 마지막 주가 첫주로 표현될 때, 53주로 만들어주기 위해 사용 (아마)
