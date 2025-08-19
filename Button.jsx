import React from 'react';
import { Link } from 'react-router-dom';

export function Button({onClick}){
    return(
        <Link  to= "/complete-submit">
            <button className="publish-button" onClick={onClick}>Publish</button>
        </Link>
    )
}

export function SubmitButton(){
    return(
        <div className="button-container">
            <Link to="/create">
                <button className="create-but">Create Another One</button>
            </Link>
            <Link to="/memory-books">
                <button className="view-but">View More In Memory Book</button>
            </Link>
            
        </div>
    )
}
