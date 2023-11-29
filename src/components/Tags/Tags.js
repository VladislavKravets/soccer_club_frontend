import React from 'react';
import './Tags.css';

function Tags(props) {
    return (
        <div className="tag-item">
            <div className="tag-text">
                {props.tag}
            </div>
        </div>
    );
}

export default Tags;