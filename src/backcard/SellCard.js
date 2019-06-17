import React, { Component } from 'react';
import firebase from '../firebase.js';
import { Line } from 'react-chartjs-2';


class SellCard extends Component {


    constructor(props) {
        super(props);
        const {userid, postid, price} = this.props;

        this.state = {
            cote: 0,
            userid: userid,
            postid: postid,
            price: price,
            cashinit: 0,
            cote_now: price,
            newcash: 0
        }

    }

    componentDidMount(){
        this.checkUserPersonel()

    }


    checkUserPersonel = () => {
        firebase.firestore().collection("users").doc(this.state.userid).collection("People").doc(this.state.postid).get()
        .then((doc) => {


                this.setState({ cote :     doc.data().cote       });
                this.setState({ cashinit :    doc.data().cashinit  });
                this.setState({ newcash : this.state.cashinit * (this.state.price / this.state.cote) });



      })
      
    
    }


    render() {



        return (
            <div class="backCard">
                <div>you can withdraw :  <div class="cashcote"> {Math.floor(this.state.newcash)} §</div></div>
                <div>

                <div >your initial investment was : {this.state.cashinit} §</div>

                </div>

                <button id="botbut" class="buybutton" onClick={this.concludeTransaction}>sell</button>
            </div>

        );
    }


    concludeTransaction = () => {



        //add the amount of money to the user

        var theDb = firebase.firestore();
        var userId = this.state.userid;
        var thePostId =this.state.postid;
        var newcash = this.state.newcash;
        var sfDocRef = theDb.collection("users").doc(userId);
        theDb.runTransaction((transaction) => {
            // This code may get re-run multiple times if there are conflicts.


            return transaction.get(sfDocRef).then(function (sfDoc) {
                if (!sfDoc.exists) {
                    throw "Document does not exist!";
                }
                console.log(sfDoc.data().cash);
                var newcashupdate = sfDoc.data().cash + newcash;
                transaction.update(sfDocRef, { cash: newcashupdate });
            });
        }).then(function () {
            console.log("transaction")
        });


        //delet the people document inside the user collection
        theDb.collection("users").doc("dLW6SCRRGmTXXMg97IqAdT304Vy2").collection("people").doc("pUmxtYtobAxZUPxf1QDz").delete().then(function () {
        }).then(function () {
            console.log("document deleted successfully")
        });

     
        


        //reset the new price of the People
        
        var PeopleRef = theDb.collection("Peoples").doc(thePostId);


        var user_tab_post = [];
        var amount_tab_post = [];


        PeopleRef.get().then(function (doc) {
            if (doc.exists) {
                var price_post = parseInt(doc.data().price) - newcash;
                console.log("value" + price_post)


                user_tab_post = doc.data().user;
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                user_tab_post[Object.keys(user_tab_post).length] = time;


                amount_tab_post = doc.data().amount

                amount_tab_post[Object.keys(amount_tab_post).length] = price_post


                PeopleRef.set({
                    price: price_post,
                    amount: amount_tab_post,
                    user: user_tab_post
                }, { merge: true });

                // window.location.reload();

            } else {
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });

        //delete the document owned by the user
        //
        setTimeout(() => {                 this.props.funcall();                }, 2000);
    }



}







export default SellCard;