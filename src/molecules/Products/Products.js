import React, { PureComponent } from 'react'
import './Products.scss'
import WhiteCart from '../../assets/shopping-cart-white.svg'
import { Link } from 'react-router-dom'
import axios from 'axios'
import PubSub from 'pubsub-js'
import numeral from 'numeral'

class Products extends PureComponent {

  constructor () {
    super ()
    this.state = {
      products: []
    }
  }

  handleBuyClick = (e) => {
    e.preventDefault()
    const ID = e.target.parentNode.getAttribute('data-id')
    const product = this.state.products.find(obj => {
      return obj.productId === ID
    })
    PubSub.publish("ADD_TO_CART", product)
  }

  componentDidMount () {
    const URL = `https://desolate-brushlands-20405.herokuapp.com/api/v1/products`
    axios.get(URL)
    .then(res => {
      this.setState ({
        products: res.data
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  render () {
    return (
      <div className='products'>
        <div className='container'>
          <h1>Produtos em Destaque</h1>
          <div className='products-list'>
            {this.state.products.map(product => {
              return (
                <Link to={`product/${product.productId}`} key={product.productId}>
                  <div className='product' data-id={product.productId}>
                    <img 
                      src={product.imageUrl}
                      alt={product.productName}
                    />
                    <h3>{product.productName}</h3>
                    <div className='price'>
                      <span className='value'>{numeral(product.price).format('$0,00.00')}</span>
                    </div>
                    <button onClick={e => this.handleBuyClick(e)}>Comprar <img src={WhiteCart} alt='Shopping Cart' /></button>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default Products
