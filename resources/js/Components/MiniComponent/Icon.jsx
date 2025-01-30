import React from 'react';

export default function Icon({ 
  onClick = () => {}, 
  parentClass = "", 
  iconClass = "", 
  iconStyle = { fontSize: '18px' } 
}) {
    return (
        <span className={parentClass}>
            <i className={iconClass} onClick={onClick} style={iconStyle}></i>
        </span>
    );
}
