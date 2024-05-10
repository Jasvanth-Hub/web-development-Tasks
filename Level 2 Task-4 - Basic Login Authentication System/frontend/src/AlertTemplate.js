
import React from 'react';
import { useSelector } from 'react-redux';

const AlertTemplate = ({ message }) => {
    const {success} = useSelector((state) => state.user);

    console.log(success)

    return  success?(
        <div style={{ position: 'fixed', top: '58px', left: '50%', transform: 'translateX(-50%)', background: 'white', padding: '10px', borderRadius: '5px', boxShadow: '2px 3px 10px rgba(1, 0, 0.3, 0.7)', backgroundColor: "green", color: "white", font: "message-box",fontWeight:"bold" }}>
            {message}
        </div>
    ):(
        <div style={{ position: 'fixed', bottom: '35px', left: '50%', transform: 'translateX(-50%)', background: 'white', padding: '10px', borderRadius: '5px', boxShadow: '2px 3px 10px rgba(1, 0, 0.3, 0.7)', backgroundColor: "orangered", color: "white", font: "message-box",fontWeight:"bold" }}>
            {message}
        </div>
    )
};

export default AlertTemplate;
