import React, { useEffect, useReducer ,useState} from 'react';
import axios from 'axios';
import "../styles/ticket.css";

const initState={
    chair:[],
    errorMessage:"",
};



const reducer=(state,action)=>{
    switch (action.type) {
        case "success":
            return {...state,chair:action.chairInfo};
        case "failed":
            return {...state,errorMessage:action.error};   
        default:
            return state;
    }
};

const CompTickets=()=>{
    const [data,dispatch]=useReducer(reducer,initState);
    useEffect(()=>{
        axios
            .get("http://localhost:3000/chairs.json")
            .then((response)=>
                dispatch({type:"success",chairInfo:response.data}))
            .catch((error)=>dispatch({type:"failed", error:error.message}));

    },[]);
const [count,setCount]=useState(0);
const [sum,setSum]=useState(0);
const clickHandler=(event)=>{
    // console.log(event.target); 
    // console.log(event.target.name);
    // console.log(event.target.value);
    // console.log(event.target.className);
    // console.log(event.target.title);
    // console.log(event.target.name);
    switch (event.target.className) {
        case "unselected":
            event.target.className="selected";
            break;

        case "selected":
            event.target.className="tempReserv";
            break;

        case "tempReserv":
            event.target.className="permReserv";
            setCount((prevNumber)=>(prevNumber+1));
            setSum((prevSum)=>(prevSum+parseInt(event.target.value)))
            break;

        case "permReserv":
            alert("قبلا رزرو شده");
            break;

        default:
            break;
    }

};

    return(
        <>
        <label className='stageLabel'>Stage</label>
        <div className='topMenu'>
            
            <label className='countLabel'>Count = {count}</label>
            <label className='sumLabel'>Sum = {sum}</label>
        </div>
        <div className='sectionContainer'>

        {data.errorMessage ? (<h3>Error : {data.errorMessage}</h3>):
        (

                // data.chair.map((ch)=>(
                //     <button id={ch.number}>{ch.number}</button>  
                // ))

                // data.chair.map((ch)=>(
                //     <button onClick={clickHandler} className={ch.state} title={ch.section} value={ch.price} id={ch.number} name={ch.number}>{ch.number}{ch.section}</button>  
                // ))

                // data.chair.map((ch)=>(
                //     <>
                //     {ch.section==="A" &&
                //     <button onClick={clickHandler} className={ch.state} title={ch.section} value={ch.price} id={ch.number} name={ch.number}>{ch.number}{ch.section}</button>  
                // }
                // </>
                // ))
                <>
                <div className='sectionA'>
                    {data.chair.map((ch)=>(
                        <>
                            {ch.section==="A" &&
                            <button onClick={clickHandler} className={ch.state} title={ch.section} value={ch.price} id={ch.number} name={ch.number}>{ch.number}{ch.section}</button>  
                            }
                        </>
                    ))}  
                </div>
                <div className='sectionB'>
                    {data.chair.map((ch)=>(
                        <>
                            {ch.section==="B" &&
                            <button onClick={clickHandler} className={ch.state} title={ch.section} value={ch.price} id={ch.number} name={ch.number}>{ch.number}{ch.section}</button>  
                            }
                        </>
                    ))}   
                </div>
                <div className='sectionC'>
                    {data.chair.map((ch)=>(
                        <>
                            {ch.section==="C" &&
                            <button onClick={clickHandler} className={ch.state} title={ch.section} value={ch.price} id={ch.number} name={ch.number}>{ch.number}{ch.section}</button>  
                            }
                        </>
                    ))}   
                </div>
                <div className='sectionD'>
                    {data.chair.map((ch)=>(
                        <>
                            {ch.section==="D" &&
                            <button onClick={clickHandler} className={ch.state} title={ch.section} value={ch.price} id={ch.number} name={ch.number}>{ch.number}{ch.section}</button>  
                            }
                        </>
                    ))}   
                </div>
                </>             
        )}
        </div>
        </>
    );
};
export default CompTickets;