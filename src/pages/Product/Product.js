import React, { PureComponent } from 'react'
import Header from '../../molecules/Header/Header'
import Newsletter from '../../molecules/Newsletter/Newsletter'
import Footer from '../../molecules/Footer/Footer'
import WhiteCart from '../../assets/shopping-cart-white.svg'
import axios from 'axios'
import numeral from 'numeral'
import './Product.scss'

class Product extends PureComponent {
  
  constructor () {
    super ()
    this.state = {
      product: [],
      quantity: 1,
      totalValue: 0
    }
  }

  decreaseQuantity = () => {
    if (this.state.quantity > 1) {
      this.setState({
        quantity: this.state.quantity - 1,
        totalValue: this.state.totalValue - this.state.product.price
      })
    }
  }

  increaseQuantity = () => {
    this.setState({ 
      quantity: this.state.quantity + 1,
      totalValue: this.state.totalValue + this.state.product.price
    })
  }

  componentDidMount = () => {
    const PRODUCT_ID = this.props.match.params.id
    const URL = `https://desolate-brushlands-20405.herokuapp.com/api/v1/product/${PRODUCT_ID}`
    axios.get(URL)
    .then(res => {
      this.setState({
        product: res.data[0],
        totalValue: res.data[0].price
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  render () {
    return (
      <div className='product'>
        <Header />
        <main>
          <div className='container'>
            <div className='product-content'>
              <div className='row align-items-center'>
                <div className='col-12 col-md-6'>
                  <img
                    src={this.state.product.imageUrl}
                    alt={this.state.product.productName}
                  />
                </div>
                <div className='col-12 col-md-6'>
                  <h1>{this.state.product.productName}</h1>
                  <span className='full-price'>{numeral(this.state.product.price + 1).format('$0,0.00')}</span>
                  <span className='price'>{numeral(this.state.totalValue).format('$0,0.00')}</span>
                  <div className='bottom'>
                    <div className='quantity'>
                      <span className='minus' onClick={this.decreaseQuantity}>-</span>
                      <span>{this.state.quantity}</span>
                      <span className='plus' onClick={this.increaseQuantity}>+</span>
                    </div>
                    <button onClick={e => this.handleBuyClick(e)}>Comprar <img src={WhiteCart} alt='Shopping Cart' /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Newsletter />
        <Footer />
      </div>
    )
  }
}

export default Product
