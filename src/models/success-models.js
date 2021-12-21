import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Alert } from 'react-bootstrap';

export default function SuccessModel(props) {
    
 
    return (
        <>
            <Alert variant="success" show={!!props.success}  >
                {props.success}
            </Alert>
        </>
    );
}
