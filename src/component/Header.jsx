import React, { useEffect, useState } from 'react';

function Header(props) {
    const[count,setCount] = useState(0);  //count 변수 0으로 초기화
    useEffect(()=>{
        setCount(1)
    },[])
    const handle = (e)=>{
        setCount(count+1)
    }
    return (
        <header className='App-header'>Work-out <button onClick={handle}>Butt {count}</button></header>
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