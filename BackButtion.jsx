import { Link } from 'react-router-dom';

export function BackButton() {
    return (
        <div className="back-container">
            <img className="back-arrow" src="../img/back.svg" alt="Back" />
            <Link to="/memory-books" className="back-button">Back</Link>
        </div>
    )
}