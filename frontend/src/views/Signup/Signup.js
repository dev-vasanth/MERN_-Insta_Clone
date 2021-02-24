import React from 'react'
import './Signup.css'

function Signup() {
    return (
        <div className='container'>
            <div className='center'>
               <p>Instagram</p>
               <div className='align'>
                   <input placeholder='your email'></input>
                   <input placeholder='username'></input>
                   <input placeholder='your Password'></input>
                   <button className='signup'>Signup</button>
               </div>
             
            </div>
        </div>
    )
}

export default Signup
