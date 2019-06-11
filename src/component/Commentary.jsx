import React, { Component } from 'react';
import like from '../images/like.png'
import '../css/App.css';


class Commentary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            like: 0,
            show: false,        
        };
    }

    IncrementLike = () => {
        this.setState({ like: this.setState.like = 1 });
      }

  render() {  
  return (

<div className="commentary__pstrong">

        <p> <strong>{this.props.profil} </strong> </p>
        <p> {this.props.text}    
            <img className="like__"
            src={like}
            onClick={this.IncrementLike} 
            height="15"
            width="15"
            alt="like">
            </img> {this.state.like} </p>
           
</div> 
  );
}
}

export default Commentary;
