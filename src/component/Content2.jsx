import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Content2(props) {
    const [content, setContent] = useState([]);
    useEffect(async () => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setContent(response.data);
        console.log(response.data);
    }, [])
    return (
        <div className='content2'>
            {content.map((content) => (
                <div>
                    {content.title}
                </div>
            ))}
        </div>
    );
}

export default Content2;



//axios - api서버랑 서로 통신해서 데이터 주고, 요청하는것을 할 수 있게 
// async, await - 비동기(코드가 순차적으로 실행) //동기(한꺼번에 같이 실행)
// await 있는 코드가 실행될때까지 기다린다!!

//mvc패턴에대해 알아보기