import { NavLink } from 'react-router-dom';

export function Homepage({ user }) {

  return (
    <>
      <header className="home-header">
        <div className="home-banner">
          <div className="home-banner-text">
            <h1>TraveLog</h1>
            <h2>Your every step around the world.</h2>
          </div>



          <div className="home-banner-button">
            {!user? (
              <NavLink to="/sign-in" className="nav-link">
                Sign in
              </NavLink>
            ) : (
              <NavLink to="/create" className="nav-link">
                Start Your Journey
              </NavLink>
            )}
          </div>
        </div>
      </header>
    </>
  )
}
