import React, { Component } from 'react';
import firebase from './firebase.js';
import './css/card.css'
import Modal from 'react-modal';
import BackCard from './backcard/backCard.js'
import { throws } from 'assert';



class Card extends Component {
    constructor(props) {
        super(props);
        const { job, name, price, url, userid ,actu, amount, user, postId } = this.props;
        
        this.state = {
            name: name,
            job: job,
            price: Math.floor(price),
            url: url, 
            actu: actu,
            amount: amount,
            user: user,
            userid: userid,
            postId: postId
        }
    }
     ReactHeader = ()  => {
        return (
          <h1>
           Salut
          </h1>
        )
      }

      componentDidMount() {
        Modal.setAppElement(this.el);
    }

    render() {
        return (
            <div class="card">
                <div class="innerCard">
                    <div class="frontCard" style={{ backgroundImage: 'url("'+this.state.url+'")' }}>
                        <h2>{this.state.name}</h2>
                        <div class="ownerInfo">
                            <h3>
                                {this.state.job}
                            </h3>
                            <h4 class="cashprice">
                                {this.state.price}
                            </h4>
                        </div>
                    </div>
                    <BackCard bought={this.props.bought} name={this.state.name} funcall={this.props.funcall} actu={this.state.actu} postId={this.state.postId} userid={this.state.userid} price={this.state.price} user={this.state.user} amount={this.state.amount}></BackCard>
                </div>
            </div>

        )




    }





}


export default Card;