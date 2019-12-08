import React, { PureComponent } from 'react'
import './Header.scss'
import Logo from '../../assets/logo.png'
import Account from '../../atoms/Account/Account'
import Cart from '../../atoms/Cart/Cart'
import { Link } from 'react-router-dom'

class Header extends PureComponent {
  render () {
    return (
      <header>
        <div className='container'>
          <div className='header-content'>
            <Link to='/'>
              <img 
                src={Logo}
                alt='Logo'
              />
            </Link>
            <ul>
              <li><a href='#'>Categoria 01</a></li>
              <li><a href='#'>Categoria 02</a></li>
              <li><a href='#'>Categoria 03</a></li>
              <li><a href='#'>Categoria 04</a></li>
            </ul>
            <div className='right'>

              <Account />
              <Cart />
            </div>
          </div>
        </div>
      </header>
    )
  }
}

export default Header