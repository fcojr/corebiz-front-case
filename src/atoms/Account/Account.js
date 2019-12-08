import React, { PureComponent } from 'react'
import './Account.scss'
import UserIcon from '../../assets/user-icon.svg'
import axios from 'axios'
import numeral from 'numeral'

class Account extends PureComponent {
  constructor () {
    super ()
    this.state = {
      isOpen: false,
      currentUser: {
        name: 'Willian',
        email: 'willian@corebiz.com',
        lastPurchase: []
      }
    }
  }

  componentDidMount = () => {
    const URL = `https://desolate-brushlands-20405.herokuapp.com/api/v1/product/12`
    axios.get(URL)
    .then(res => {
      this.setState({
        currentUser: {
          ...this.state.currentUser,
          lastPurchase: res.data[0]
        }
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  toggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render () {
    return (
      <div className='my-account'>
        <img 
          src={UserIcon}
          alt='My Account'
        />
        <a href='#' onClick={this.toggleOpen}>
          Minha conta
        </a>
        {this.state.isOpen ? (
          <div className='account-content'>
            <div className='account-content-title'>
              <span className='close' onClick={this.toggleOpen}>x</span>
              <p className='name'>Ola, {this.state.currentUser.name}</p>
              <p className='email'>{this.state.currentUser.email}</p>
              <span>Sair</span>
            </div>
            <div className='last-purchase'>
              <h3>Ultima compra</h3>
              <div className='product'>
                <img 
                  src={this.state.currentUser.lastPurchase.imageUrl}
                  alt={this.state.currentUser.lastPurchase.productName}
                />
                <h4>{this.state.currentUser.lastPurchase.productName}</h4>
                <span className='price'>{numeral(this.state.currentUser.lastPurchase.price).format('$0,0.00')}</span>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

export default Account
