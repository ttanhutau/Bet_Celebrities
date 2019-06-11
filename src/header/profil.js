import React, { Component } from 'react';
import firebase from '../firebase.js';
import { setTimeout } from 'timers';
import Login from './loginprofil'
var vu;
var vc;
class Profil extends Component{
    
    constructor(props){
      
        super(props);
        this.state = {
         
           // db_user: firebase.firestore().collection("users").doc(userid),
            cash: "",
            name: "",
            //returnPersonelDatabase: returnPersonelDatabase,
            page: "loginprofil",
            auth: firebase.auth()



        }
        
        this.state.auth.onAuthStateChanged((user) => {
            if (user) {
              // User is signed in.
              console.log("user is really signed in" + user.uid)
              this.setState({page: "profil"});
              firebase.firestore().collection("users").doc(user.uid).onSnapshot((doc) => {
                if (doc.exists) {
                    this.setState({cash : doc.data().cash})
                    this.setState({name : doc.data().name})
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            })
            
              // ...
            } else {

              // User is signed out.
              // ...
            }
          });
      


        this.showUserData()
    }
    changePage = event => {
		this.setState({page: event.toString()})
    }

    
    signOut = () => {
        firebase.auth().signOut().then(function() {
            console.log("it successfully disconned")
            // Sign-out successful.
          }).catch(function(error) {
            // An error happened.
            console.log("the error is" + error)

          });
          this.changePage("loginprofil");
    }
 
    showUserData = () => {
        var turn = 1;
  
        // this.state.db_user.get().then(function(doc) {
        //     if (doc.exists) {
        //         // console.log("Document data:", doc.data());
        //         console.log("data user: " + doc.data().user_name+ " has " + doc.data().cash + "money");
        //         vu =  doc.data().user_name;
        //         vc =  doc.data().cash;


              

               
        //         // this.state.price = doc.data().price;
        //     } else {
        //         // doc.data() will be undefined in this case
               
        //         console.log("No such document!");
        //     }
         
          
           
        //     })
      }






      componentDidMount() {

      }
      
    render(){

        switch (this.state.page) {


        case "profil":

       
        return(
            <div class = "profilBorder">
                <h5>{ this.state.name == "" ? "User loading ..." : this.state.name}</h5>
                <h4>{Math.floor(this.state.cash == 0 ? "0" : this.state.cash)} Cash </h4>
                <button class="button_log" onMouseUp={this.props.returnPersonelDatabase}>Personel</button>
                <div class="pay">
                    <button class="button_log"> buy cash </button>
                    <button class="button_log"> sell cash </button>
                </div>
                <button class="button_log" onClick={this.signOut}>Log out</button>
            </div>


        )

        break;


        case "loginprofil":

       
        return(
            <Login  changePage={this.changePage} ></Login>
        )

        break;


    }
    }




}



export default Profil;