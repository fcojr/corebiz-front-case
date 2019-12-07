import React, { PureComponent } from 'react'
import './Home.scss'
import Header from '../../molecules/Header/Header'
import Products from '../../molecules/Products/Products'
import Newsletter from '../../molecules/Newsletter/Newsletter'
import Footer from '../../molecules/Footer/Footer'

class Home extends PureComponent {
  render () {
    return (
      <div className='home'>
        <Header />
        <main>
          <Products />
        </main>
        <Newsletter />
        <Footer />
      </div>
    )
  }
}

export default Home;
