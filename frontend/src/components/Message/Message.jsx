import React from 'react';

const Message = ({children,color}) => {
    return (
        <div>
            <h4 style={{color:color}}>{children}</h4>
        </div>
    );
}
 
export default Message;