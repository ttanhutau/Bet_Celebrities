import React, { Component } from 'react';
import firebase from '../firebase';


class Loginprofil extends Component {



    constructor(props) {
        super(props);
        this.state = {

            auth: firebase.auth(),
            page: "login",
            mail: "",
            password: "",
            password2: "",
            username: "",
            id_user: "",



        }



        this.changeMail = this.changeMail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changePassword2 = this.changePassword2.bind(this);
        this.CreateUser = this.CreateUser.bind(this);
        this.changeUsername = this.changeUsername.bind(this);
        this.signInUser = this.signInUser.bind(this);
        this.changePage = props.changePage.bind(this);
        var user = this.state.auth.currentUser;

        if (user) {
            console.log("user is signed in" + user.uid)
            console.log(user.email);


            // User is signed in.
        } else {
            console.log("user isn't signed in")

            // No user is signed in.
        }




    }




    changeMail(event) {
        this.setState({ mail: event.target.value })
    }
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    changePassword(event) {
        this.setState({ password: event.target.value })
    }
    changePassword2(event) {
        this.setState({ password2: event.target.value })
    }
    changeUsername(event) {
        this.setState({ username: event.target.value })
    }
    CreateUser(event) {
        event.preventDefault();
        //this.props.appFunction(this.state.mail);

        var mail = this.state.mail;
        var password = this.state.password;


        if (this.validateEmail(mail) && password.length > 6 && password == this.state.password2) {


            this.state.auth.createUserWithEmailAndPassword(mail, password);

  

            this.state.auth.onAuthStateChanged((user) => {
                if (user) {
                  // User is signed in.
           
                  firebase.firestore().collection("users").doc(user.uid).set({
                    name: this.state.username,
                    cash: 0,

                })
                
                
                  // ...
                } else {
    
            
                }
              });



        } else {
            console.log("the email adress is wrond")

        }

    }

    signInUser(event) {

        this.state.auth.signInWithEmailAndPassword(this.state.mail, this.state.password);
    }





    register = () => {



    }




    gotosign = () => {
        this.setState({ page: "sign" })
    }
    gotologin = () => {
        this.setState({ page: "login" })
    }
    gotoregister = () => {
        this.setState({ page: "register" })
    }



    render() {
        switch (this.state.page) {
            case "login":

                return (


                    <div class="profilBorder">

                        <button class="button_login" onClick={this.gotosign} > Sign In </button>

                        <button class="button_login" onClick={this.gotoregister} > Register </button>
                    </div>
                );

                break;
            case "sign":

                return (



                    <div class="profilBorder">

                        <label for="mail">Enter your mail</label><input name="mail" type="mail" onChange={this.changeMail} class="loginfield"></input>
                        <label for="password">Enter your password</label><input name="password" onChange={this.changePassword} type="password" class="loginfield"></input>
                        <button class="button_login" onClick={this.signInUser}>Sign up</button>

                        <button class="button_login" onClick={this.gotologin} > goback </button>
                    </div>

                );


                break;
            case "register":

                return (



                    <div class="profilBorder">
                        <form onSubmit={this.CreateUser}>
                            <label for="mail">Enter your mail</label><input name="mail" type="mail" onChange={this.changeMail} class="loginfield"></input>
                            <label for="password">Enter your password</label><input name="password" onChange={this.changePassword} type="password" class="loginfield"></input>
                            <label for="c_password">Reinsert your password</label><input name="c_password" onChange={this.changePassword2} type="password" class="loginfield"></input>
                            <label for="username">write your username</label><input name="username" type="username" onChange={this.changeUsername} class="loginfield"></input>
                            <input type="submit" class="button_login" value="create a user" />
                        </form>
                        <button class="button_login" onClick={this.gotologin} > goback </button>


                    </div>

                );

                break;


        }
    }








}









export default Loginprofil;
