import React, { PureComponent } from 'react'
import './Newsletter.scss'
import axios from 'axios'

class Newsletter extends PureComponent {

  constructor(){
    super()
    this.state = {
      name: '',
      email: '',
      isSubscribed: false,
      responseId: ''
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    const URL = 'http://api.vtexcrm.com.br/corebiz/dataentities/TE/documents'

    axios.post(URL, {
      name: this.state.name,
      email: this.state.email,
      notice: 'asdas', //random
      phone: '387194123' //random
    })
    .then(response => {
      console.log(response.data.Id)
      this.setState({
        isSubscribed: true,
        responseId: response.data.Id
      })
    })
    .catch(error => {
      console.error(error.message)
    })
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render () {
    return (
      <div className='newsletter'>
        <div className='container'>
          <div className='newsletter-content'>
            <div className='left'>
              <h2>Newlestter</h2>
              <p>Receba nossas promoções e novidades. Inscreva-se:</p>
            </div>
            {this.state.isSubscribed ? <p>Obrigado! Seu id: {this.state.responseId} </p> :
              <form onSubmit={e => this.handleSubmit(e)}>
                <input id='name' name='name' onChange={this.handleInput} type='text' placeholder='Seu nome' />
                <input id='email' name='email' onChange={this.handleInput} type='email' placeholder='Seu e-mail' />
                <button>Enviar</button>
              </form>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Newsletter
