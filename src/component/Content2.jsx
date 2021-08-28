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
                <div key={content.id}>
                    {content.title}
                </div>
            ))}
        </div>
    );
}

export default Content2;


