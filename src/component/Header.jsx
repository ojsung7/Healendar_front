import React, { useEffect, useState } from 'react';

function Header(props) {
    // const [count, setCount] = useState(0);  //count 변수 0으로 초기화
    const [inputID, setInputID] = useState('')
    const [inputPW, setInputPW] = useState('')
    useEffect(() => {
        // setCount(1)
    }, [])
    // const handle = (e) => {
    //     setCount(count + 1)
    // }
    const handleInputID = (e) => {
        setInputID(e.target.value)
    }
    const handleInputPW = (e) => {
        setInputPW(e.target.value)
    }
    const handleLogin = (e) => {
        console.log('login ?')
    }
    const handleJoin = (e) =>{
        console.log('login input window')
    }
    return (
        <header className='App-header'><span>Healendar</span>
            <div className='Login'>
                <div className='LoginInput'>
                    <div className='ID'>
                        <label htmlFor='input_id'>ID : </label>
                        <input type='text' name='input_id' value={inputID} onChange={handleInputID} />
                    </div>
                    <div className='PW'>
                        <label htmlFor='input_pw'>PW : </label>
                        <input type='text' name='input_pw' value={inputPW} onChange={handleInputPW} />
                    </div>
                </div>
                <div className='loginBut'>
                    <button onClick={handleLogin}>Login</button>
                </div>
                <div className='joinBut'>
                    <button onClick={handleJoin}>Join</button>
                </div>
            </div>
        </header>

    );
}

export default Header;

// useEffect : 이 컴포넌트의 렌더링 상태 관리 
// - 렌더링이 불러지고 난 후 호출됨
// hook (useState) : 함수형에서만 사용되는 상태관리
// - 변수의 상태를 관리
// virtual dom - react가 렌더링 시 전체가 아니라 1차적 렌더링을 한 후 
//                  바뀐 부분이 있으면 그 부분을 다시 렌더링

//달력 라이브러리 알아보기