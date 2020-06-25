import React from 'react';

export default function ValidationError(props){
    if(props.massage){
        return (
        <div className='error'>{props.massage}</div>
        );
    }
    return<></>
}