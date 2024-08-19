import React, { useState } from 'react';
import './styles.css'

function CoinInfo({name,desc}) {
    const shortDesc = desc.slice(0,200) + "<p style='color:var(--grey)'> Read more</p>";
    const longDesc = desc + "<p style='color:var(--grey)'> Read less</p>";
    const [flag,setFlag] = useState(false);



  return (
    <div className='grey-wrapper'>
        <h2 className='coin-info-heading'>{name}</h2>
        <p onClick={() => setFlag(!flag)} className='coin-info-desc' dangerouslySetInnerHTML={{__html: flag ? longDesc : shortDesc }}/>
    </div>
    
  )
}

export default CoinInfo