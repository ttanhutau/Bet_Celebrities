import React, { Component } from 'react';
import firebase from '../firebase.js';

class SortingButton extends Component {
    constructor(props) {
        super(props);




    }
    render() {
        return (
            <div>
                <h1><span class="title-marvel">People</span> <span class="title-studios">Bet</span></h1>
                <div>
                    <button class="queryButton" onMouseUp={this.props.returnDataBase}>Most High</button>
                    <button class="queryButton" >Trending</button>
                    <button class="queryButton" onMouseUp={this.props.returnlowDataBase} >Most Less</button>
                </div>
                <div id="cat">
                    <button class="SmallqueryButton" onMouseUp={() => this.props.returnDataBaseJob("Athlete")}>Athlete</button>
                    <button class="SmallqueryButton" onMouseUp={() => this.props.returnDataBaseJob("Politician")}>Politician</button>
                    <button class="SmallqueryButton" onMouseUp={() => this.props.returnDataBaseJob("Actor")}>Actor</button>
                    <button class="SmallqueryButton" onMouseUp={() => this.props.returnDataBaseJob("Entrepreneur")}>Entrepreneur</button>
                    <button class="SmallqueryButton" onMouseUp={() => this.props.returnDataBaseJob("Artist")}>Artist</button>



                </div>
            </div>


        )




    }


}


export default SortingButton;