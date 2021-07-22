import React, {useState} from 'react'
import {Alert} from "react-bootstrap";
import '../assets/css/Notice.css'

const Notice = (props) => {
    const [show, setShow] = useState(true);
    if (show) {
        return (
            <>
                <Alert variant={props.notice.code === 200? 'success' : 'warning'} className='notice' onClick={() => setShow(false)} dismissible>
                    {props.notice.message}
                </Alert>
            </>
        );
    }

    return (<></>)
}
export default Notice