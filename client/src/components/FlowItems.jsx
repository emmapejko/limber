import React from 'react';


const FlowItems = ({ flow }, props) => {
 

  return (
    <div>
      <div style={props.style}>{flow.name}</div>
      
    </div>
  )

}

export default FlowItems;