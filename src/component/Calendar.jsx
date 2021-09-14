import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Content2 from './Content2';
import axios from 'axios';

function Calendar(props) {
    const [getDate, setDate] = useState(moment());
    const [getDBdata, setDBdata] = useState([])

    //요청할 날짜
    const [reqDate, setReqdate] = useState();
    const [inputExer, setExer] = useState('');
    const [inputCount, setCount] = useState('');

    //const [tabletest, getvalue] = useState(['1','2','3']);
    //const [tabletest2, getvalue2] = useState([['스쿼트'], ['45회'], ['1']]);
    const [testsplit, getvalue3] = useState([[],[],[]]);

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
    const test = (e) => {
        setReqdate(e.target.id);
        console.log(reqDate)

        // axios.post('http://localhost:8080/todo/findTodo',{
        //     id: "test",
        //     date: "2021-09-21"
        // })
        // .then(function(response){
        //     console.log(response.data);
        //     let tempstring = [(response.data.exercise).split(', '), (response.data.done).split(','), (response.data.checked).split(',')]
        //     //getvalue3(tempstring)
        //     for(let i=0;i<tempstring[0].length;i++){
        //         getvalue3(testsplit[0].push(tempstring[0][i]))
        //         getvalue3(testsplit[1].push(tempstring[1][i]))
        //         getvalue3(testsplit[2].push(tempstring[2][i]))
        //     }
     

        // })
        // .catch(function(error){
        //     console.log(error);
        // })
       

    }
    const inputExercise = (e) => {
        setExer(e.target.value)
    }
    const inputExerCount = (e) => {
        setCount(e.target.value)
    }
    const AddType = (e) => {
        // getvalue2(tabletest2[0].push(inputExer))
        // getvalue2(tabletest2[1].push(inputCount))
        // getvalue2(tabletest2[2].push('0'))
        // console.log(tabletest2)
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
        let tempstring = [[], [], []]

        axios.post('http://localhost:8080/todo/findTodo', {
            id: "test",
            date: "2021-09-21"
        }).then(function (response) {
            tempstring = [(response.data.exercise).split(', '), (response.data.done).split(','), (response.data.checked).split(',')]
            getvalue3(tempstring)
            //console.log(testsplit[0])
            // for(let i=0;i<tempstring[0].length;i++){
            //     getvalue3(testsplit.exercise.push(tempstring[0][i]))
            //     getvalue3(testsplit.count.push(tempstring[1][i]))
            //     getvalue3(testsplit.check.push(tempstring[2][i]))
            // }
        }).catch(function (error) {
            console.log(error);
        })

        //tempstring = [(response.data.exercise).split(', '), (response.data.done).split(','), (response.data.checked).split(',')]

        for(let i=0;i<testsplit[0].length;i++){
            tabledata = tabledata.concat(
                <tr>
                    <td><input type='checkbox'  /></td>
                    <td>{testsplit[0][i]}</td>
                    <td>{testsplit[1][i]}</td>
                    <td>{testsplit[2][i]}</td>
                </tr>
            )
        }
        return tabledata
    }
    function getCheckboxValue(){
        console.log('checked')
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


// * 09150010 HW ; 09-21날짜의 test 아이디에 해당하는 데이터 가져와서 띄우기 했음 
// - 그런데 test함수에서 request보내서 데이터 받고싶었으나, 그 과정에서 오래 헤매었고 해결못함
// 결론 ; todotable이라는 렌더링관련 함수에서 바로 request하고 출력시킴 => 웹이 지나치게 느려짐.. (현재상태)