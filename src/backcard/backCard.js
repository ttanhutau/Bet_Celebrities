import React, { Component } from 'react';
import firebase from '../firebase.js';
import { Line } from 'react-chartjs-2';
import SellCard from './SellCard.js';



class Backcard extends Component {
    constructor(props) {
        super(props);
        const { cash, actu, user, amount, userid, postId, price } = this.props;
        console.log("post1" + postId)
        this.state = {
            page: "graph",
            actu: actu,
            cash: amount,
            price: price,
            userid: userid, 
            valueAction: 0,
            postid: postId,
            db: firebase.firestore(),
            data: {
                labels: user == null ? ["00:00", "01:00", "2:00", "3:00", "4:00", "5:00", "6:00"] : user,

                datasets: [
                    {
                        label: "this week",
                        backgroundColor: "rgba(255,0,255,0.75)",
                        data: amount == null ? [0, 10, 5, 2, 20, 30, 45] : amount,
                    },
                    {
                        label: "Average",
                        backgroundColor: "rgba(255,0,255,0.4)",
                        data: [0, 10, 5, 20, 20, 30, 45],
                    },

                ]
            }



        }

    }


    changePage = () => {
    
        if (this.props.bought == true) {
            this.setState({ page: "sell"})

        } else {

            this.setState({ page: "amount" })

        }

    }

    textSelectedHandler = event => {

        this.state.valueAction = event.target.value;


    }



    concludeTransaction = () => {
        if (this.state.valueAction != 0) {
            // console.log("it passed" + this.state.valueAction );

            var newcash = 293;
            var price_post ;



            var thevalueAction = this.state.valueAction;
            var theDb = this.state.db;

            var theUserId = this.state.userid;
            var thePostId = this.state.postid;
            console.log("thePostId " + thePostId)

            console.log(this.state.userid);
            //Lose the amount of money
            var sfDocRef = this.state.db.collection("users").doc(this.state.userid);
            this.state.db.runTransaction((transaction) => {
                // This code may get re-run multiple times if there are conflicts.


                return transaction.get(sfDocRef).then(function (sfDoc) {
                    if (!sfDoc.exists) {
                        throw "Document does not exist!";
                    }
                    console.log(sfDoc.data().cash);
                    // console.log("value" + thevalueAction);
                     newcash = sfDoc.data().cash - thevalueAction;
                    transaction.update(sfDocRef, { cash: newcash });
                });
            }).then(function () {



                console.log("Transaction successfully committed!");

                //add the user bet to the dataset of the personallity
                var PeopleRef = theDb.collection("Peoples").doc(thePostId);


                var user_tab_post = [];
                var amount_tab_post = [];


                PeopleRef.get().then(function (doc) {
                    if (doc.exists) {
                        price_post = parseInt(doc.data().price) + parseInt(thevalueAction);
                        console.log("value" + price_post)


                        user_tab_post = doc.data().user;
                        var today = new Date();
                        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                        user_tab_post[Object.keys(user_tab_post).length] = time;

                        amount_tab_post = doc.data().amount
                        // console.log("importantttt" + amount_tab_post);
                        amount_tab_post[Object.keys(amount_tab_post).length] = price_post

                        // console.log("efkefjeifjief" + amount_tab_post);

                        // console.log("macxime " +typeof hello);

                        PeopleRef.set({
                            price: price_post,
                            amount: amount_tab_post,
                            user: user_tab_post
                        }, { merge: true });

                           //create a document for user placement
                        var userRef = theDb.collection('users').doc(theUserId).collection("People").doc(thePostId);
                        console.log(price_post);
                        userRef.set({
                            cashinit: parseInt(thevalueAction),
                            cote: price_post,
                        });


                    } else {
                        console.log("No such document!");
                    }
                }).catch(function (error) {
                    console.log("Error getting document:", error);
                });




            }).then(() => {
                console.log("Transaction successfully committed!");
                this.props.funcall();
             

            }).catch(function (error) {
                console.log("Transaction failed: ", error);
            });








        }

    }




    render() {
        switch (this.state.page) {
            case "graph":
                return (
                    <div class="backCard">
                        <div style={{ width: '100%', height: '50%' }}>
                            <Line
                                options={{
                                    responsive: true
                                }}
                                data={this.state.data} />
                        </div>
                        <p>American Actor</p>
                        <div class="backcardmainbutton">
                            <button class="buybutton" onClick={this.changePage}>Buy</button>
                            <button class="buybutton" ><a href={this.state.actu} target="_blank" >Actu</a></button>
                        </div>

                    </div>

                );
                break;
            case "amount":
                return (
                    <div class="backCard">
                        <p>Le prochaine personne devra payer</p>
                        <input type="text" onChange={this.textSelectedHandler} placeholder="entrez un montant"></input>
                        <button class="buybutton" onClick={this.concludeTransaction}>buy</button>
                    </div>

                )
            case "sell":
                return (
                    <SellCard price={this.props.price} userid={this.state.userid}  funcall={this.props.funcall} postid={this.state.postid}/>

                )

        }

    }








}


export default Backcard;