import React from 'react'
import '../App.css'

export default function Country(props) {
    console.log(props.country);
    const data = props.country


  return (
    <div className='country'>
        <img className='flag' src={data.flags.svg} alt='falg'/>
      {data.name.common}
    </div>
  )
}
