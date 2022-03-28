import React from 'react'
import { Link } from 'react-router-dom'
import Logo from 'assets/images/logo.svg'

const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="header__container">
        <div className="header__content">
          <div className="header__wrapper">
            <Link to="/">
              <img className="header__logo" src={Logo} alt="Logo" />
              <h5>Pulse iD</h5>
            </Link>
          </div>
          <div className="header__title">
            <h5>Gallery App</h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
