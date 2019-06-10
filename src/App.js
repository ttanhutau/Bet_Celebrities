import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import './css/header.css'
import firebase from './firebase.js';
import SortingButton from './header/sorting_button';
import Card from './card';
import Profil from './header/profil'
import Google from "./header/loginprofil";
import { add } from './Return-db';





class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isconnected: true,
      db_post: firebase.firestore().collection("Peoples"),
      db_User: firebase.firestore().collection("users"),
      tabs: [],
      user_id: "",
      rowtabs: []


    }
    this.checkUser();

  }
  

  componentDidMount() {
  
    this.returnDataBase();
  
  }

  checkUser = () => {
    firebase.auth().onAuthStateChanged(((user) =>{
      if (user) {
        // User is signed in.
        this.setState({ user_id : user.uid.toString() });
        // ...
      } else {
        this.setState({ user_id :"" });
        // User is signed out.
        // ...
      }
    }));
    

  }


  returnDataBase = () => {
    this.setState({ tabs: [] });
    var turn = 1;
    let t = [];
    let row_t = [];
    this.state.db_post.orderBy("price", "desc").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          //console.log(doc.data().url)
          t.push();
          row_t.push()


          var prov = 0;
          row_t.push(<Card name={doc.data().name} funcall={this.returnDataBase} postId ={doc.id}  userid = {this.state.user_id} amount={doc.data().amount} user={doc.data().user} actu={doc.data().news} job={doc.data().job} price={doc.data().price} url={doc.data().image_url}></Card>);
          turn % 3 == 0 ? t.push(<div class="row">{row_t}</div>) : prov++;
          turn % 3 == 0 ? row_t = [] : prov++;
          turn++;



        });
        this.setState({ tabs: t })


      })

  }

  returnlowDataBase = () => {
    this.setState({ tabs: [] });



    var turn = 1;
    let t = [];
    let row_t = [];
    this.state.db_post.orderBy("price", "asc").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          //console.log(doc.data().url)


          row_t.push(<Card name={doc.data().name}postId ={doc.id} funcall={this.returnlowDataBase} userid = {this.state.user_id} amount={doc.data().amount} user={doc.data().user} owner={doc.data().owner_name} price={doc.data().price} url={doc.data().image_url}></Card>);
          turn % 3 == 0 ? t.push(<div class="row">{row_t}</div>) : console.log("");
          turn % 3 == 0 ? row_t = [] : console.log("good");
          turn++;



        });
        this.setState({ tabs: t })
        // const element = <h1>Hello, world</h1>;
        // ReactDOM.render(element, document.getElementById('gridCard'));


      })


  }




  returnPersonelDatabase = () => {
    var dock;
    this.setState({ tabs: [] });

    var t = [];
    var row_t = [];
    this.state.db_User.doc(this.state.user_id).collection("People").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          //console.log(doc.data().url)



          dock = doc.id;
          this.state.db_post.doc(dock).get().then((doc) => {
            if (doc.exists) {
              console.log(doc.data().name)
               t.push(<Card bought={true} postId ={doc.id} funcall={this.returnPersonelDatabase} name={doc.data().name}  amount={doc.data().amount} userid = {this.state.user_id} user={doc.data().user} owner={doc.data().owner_name} price={doc.data().price} url={doc.data().image_url}></Card>);
               //t.push(<div class="row">{row_t}</div>) ;
               console.log("the names are "+ doc.data().name);
   
  
               this.setState({ tabs: t });
  
            } else {
              console.log("No such document!");
              
            }


        });


        console.log("the id is" + dock);

    
        })


      


      })


  }


  render() {
    return (
      <div className="App">
        <body className="App-header">

          <header>
            
            <SortingButton returnDataBaseJob={this.JobreturnDataBase} returnlowDataBase={this.returnlowDataBase} returnDataBase={this.returnDataBase}></SortingButton>


            <Profil returnPersonelDatabase={this.returnPersonelDatabase} ></Profil>
            {/* <Google></Google> */}
          </header>
          <div id="gridCard" class="gridCard">
            {this.state.tabs}

          </div>

        </body>
      </div>
    );
  }

  JobreturnDataBase = (event) => {
    this.setState({ tabs: [] });
    var turn = 1;
    let t = [];
    let row_t = [];
    this.state.db_post.where("job", "==", event).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          //console.log(doc.data().url)
          t.push();
          row_t.push()


          var prov = 0;
          row_t.push(<Card name={doc.data().name} funcall={this.JobreturnDataBase} userid = {this.state.user_id} postId ={doc.id} amount={doc.data().amount} user={doc.data().user} actu={doc.data().news} owner={doc.data().job} price={doc.data().price} url={doc.data().image_url}></Card>);
          turn % 3 == 0 ? t.push(<div class="row">{row_t}</div>) : prov++;
          turn % 3 == 0 ? row_t = [] : prov++;
          turn++;



        });
        this.setState({ tabs: t })


      })

  }


}

export default App;
