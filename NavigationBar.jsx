import { NavLink } from 'react-router-dom';

export function NavigationBar({ onSignOut, user }) {
    return (
        <div className="nav-bar">
            <img
                className="logo"
                src="../img/logo.png"
                alt="Logo saying TraveLog with a globe"
            />
            <NavLink to="/home" className="nav-link">
                Home
            </NavLink>

            {!user? (
                <NavLink to="/sign-in" className="nav-link">
                Create Journal
            </NavLink>
                
            ) : (
                <NavLink to="/create" className="nav-link">
                Create Journal
                </NavLink>
            )}
            
            {!user? (
                <NavLink to="/sign-in" className="nav-link">
                Memory Books
            </NavLink>
                
            ) : (
                <NavLink to="/memory-books" className="nav-link">
                Memory Books
                </NavLink>
            )}
            
            
            {/* part below isassisted by chatGPT */}
            {!user? (
                <NavLink to="/sign-in" className="nav-link">
                Sign In
                </NavLink>
                
            ) : (
                <button onClick={onSignOut} className="nav-link">
                Sign Out
                </button>
            )}
        </div>
    );
}
