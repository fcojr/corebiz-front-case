import React, { PureComponent } from 'react'
import CartIcon from '../../assets/shopping-cart.svg'
import WhiteCartIcon from '../../assets/shopping-cart-white.svg'
import PubSub from "pubsub-js"
import numeral from 'numeral'
import './Cart.scss'

class Cart extends PureComponent {
  
  constructor () {
    super ()
    this.state = {
      isOpen: false,
      itemsOnCart: [],
      totalValue: 0
    }
  }

  addToCart = (msg, data) => {
    this.setState({
      itemsOnCart: [
        ...this.state.itemsOnCart,
        data
      ],
      totalValue: this.state.totalValue + data.price
    })
  }

  componentDidMount = () => {
    PubSub.subscribe("ADD_TO_CART", this.addToCart)
  }

  toggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  showItems = () => {
    if(this.state.itemsOnCart.length === 0) {
      return (
        <p>Carrinho vazio!</p>
      )
    }

    return (
      this.state.itemsOnCart.map(product => (
        <div className='product' key={product.productId} data-id={product.productId}>
          <span className='remove-item' onClick={() => this.removeItem(product.productId)}>x</span>
          <img 
            src={product.imageUrl}
            alt={product.productName}
          />
          <div className='content-right'>
            <h3>{product.productName}</h3>
            <div className='quantity'>
              <span className='sub'>-</span>
              <span className='number'></span>
              <span className='add'>+</span>
            </div>
            <span className='price'>{numeral(product.price).format('$0,00.00')}</span>
          </div>
        </div>
      ))
    )
  }

  clearCart = () => {
    this.setState({
      itemsOnCart: [],
      totalValue: 0
    })
  }

  removeItem = id => {
    const withoutItem = this.state.itemsOnCart.filter(item => item.productId !== id)
    const product = this.state.itemsOnCart.find(obj => {
      return obj.productId === id
    })
    this.setState({
      itemsOnCart: withoutItem,
      totalValue: this.state.totalValue - product.price
    })
  }

  render () {
    return (
      <div className='cart'>
        <img
          src={CartIcon}
          alt='Shopping Cart'
          onClick={this.toggleOpen}
        />
        {this.state.itemsOnCart.length > 0 ? <span className='cart-length'>{this.state.itemsOnCart.length}</span> : null }
        {this.state.isOpen ? (
          <div className='cart-content'>
            <div className='cart-content-title'>
              <h3>Meu carrinho</h3>
              <span>{this.state.itemsOnCart.length} Item(s)</span>
              <span className='close' onClick={this.toggleOpen}>x</span>
            </div>
            
            <div className='cart-content-list'>
              {this.showItems()}
            </div>

            <div className='cart-content-footer'>
              <span className='total'>Total: {numeral(this.state.totalValue).format('$0,00.00')}</span>
              <button>Comprar <img src={WhiteCartIcon} alt='Shopping Cart' /></button>
              <span className='clear-cart' onClick={this.clearCart}>x Limpar Carrinho</span>
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

export default Cart
