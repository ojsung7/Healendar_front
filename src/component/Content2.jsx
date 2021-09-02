import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Content2(props) {
    const [content, setContent] = useState([]);

    return (
        <>
            <label><input type="checkbox"></input>스쿼트</label>
            <label><input type="checkbox"></input>윗몸일으키기</label>
            <label><input type="checkbox"></input>걷기</label>
            <label><input type="checkbox"></input>달리기</label>
            <label><input type="checkbox"></input>아령</label>
        </>
    );
}

export default Content2;


