import React from "react";
 

export const Frequency = ({ updateFrequency, frequency }) => {

    

    return (
        <div className="m-3 border pl-2 pr-2 d-inline-flex p-2" lang="he">
            <div className="col">Frequency: {frequency}</div>
            <button type="button" className="btn btn-light col" onClick={() => updateFrequency(100)} >100</button>
            <button type="button" className="btn btn-light col" onClick={() => updateFrequency(80)} >80</button>
            <button type="button" className="btn btn-light col" onClick={() => updateFrequency(60)} >60</button>
            <button type="button" className="btn btn-light col" onClick={() => updateFrequency(40)} >40</button>
            <button type="button" className="btn btn-light col" onClick={() => updateFrequency(20)} >20</button>
        </div>
    );
}