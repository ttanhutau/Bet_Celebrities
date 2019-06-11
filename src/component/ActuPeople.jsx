import React, { Component } from 'react';
import Commentary from './Commentary';
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
import instagram from '../images/instagram.svg';
import biography from '../images/biography.png';
import actualite from '../images/actualite.png';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import '../css/App.css';
import {Bar, Line, Pie} from 'react-chartjs-2';
import selfie from '../images/selfie.jpg';


class ActuPeople extends Component {
    constructor(props) {
        super(props);
        var actugoogle =  'https://www.google.com/search?q='+`${this.props.name}`+'&source=lnms&tbm=nws&sa=X&ved=0ahUKEwiGuYDb78_iAhXwDmMBHWQ-CvcQ_AUIECgB&biw=1440&bih=739&dpr=2';
        var biogoogle = 'https://www.google.com/search?q='+`${this.props.name}`+'+biography&source=lnms&sa=X&ved=0ahUKEwjIjPvqxdTiAhWlxoUKHbV-Ak0Q_AUICSgA&biw=1440&bih=788&dpr=2';
        var socialgoogle = 'https://www.google.com/search?q='+`${this.props.name}`+'+instagram&source=lnms&sa=X&ved=0ahUKEwjIjPvqxdTiAhWlxoUKHbV-Ak0Q_AUICSgA&biw=1440&bih=788&dpr=2';
        console.log(this.props.name);
        
        this.state = {
            actugoogle: actugoogle,
            biogoogle: biogoogle,
            socialgoogle: socialgoogle,
            isPaneOpen: false,
            isPaneOpenLeft: false,
            chartData: {
              // Donnée ANALYTICS
              labels: this.props.user,
                datasets: [
                    {
                        label: "this week",
                        backgroundColor: "#3D6EFC",
                        data:  this.props.amount ,
                    },
                    {
                        label: "Average",
                        backgroundColor: "rgba(255,0,255,0.4)",
                        data: [0, 10, 5, 20, 20, 30, 45],
                    },
 
                ]
            }
            

        };

    }

    static defaultProps = {
        displayTitle:true,
        displayLegend: true,
        legendPosition:'right',
        location:'City'
      }


    componentDidMount() {
        Modal.setAppElement(this.el);
    }

    render() {
        return( <div ref={ref => this.el = ref}>
            {/* <button >Click me to open right pane!</button> */}
            <button class="buybutton" onClick={() => this.setState({ isPaneOpenLeft: true }) }>
                <strong>ANALYTICS</strong>
            </button>
            <button class="buybutton" onClick={() => this.setState({ isPaneOpen: true })}> <strong>ACTUALITIES</strong></button>
            
        
            <SlidingPane
                className='some-custom-class'
                overlayClassName='some-custom-overlay-class'
                isOpen={this.state.isPaneOpen}
                title={this.props.title}
                subtitle={this.props.value}
                onRequestClose={() => {
                    // triggered on "<" on left top click or on outside click
                    this.setState({ isPaneOpen: false });
                }}>
                <div className="menu_slidingpane">
                        <a className="instagram__logo" href={this.state.socialgoogle} target="_blank" title="Instagram">
                            <img
                                src={instagram}
                                height="50"
                                width="50"
                                alt="insta">
                            </img>
                        </a>
                        <a className="biography__logo" href={this.state.biogoogle} target="_blank" title="Biography">
                            <img
                                src={biography}
                                height="50"
                                width="50"
                                alt="wiki">
                            </img>
                        </a>
                        <a className="actu__logo"  href={this.state.actugoogle} target="_blank" title="Actualities">
                            <img
                                src={actualite}
                                height="50"
                                width="50"
                                alt="actu">
                            </img>
                        </a>
                </div>
                <div className="commentary_slidingpane">
                    <Commentary profil={"Nicolas"} text={"trop beau"} />

                    <Commentary profil={"Valentin"} text={"nice"} />

                    <Commentary profil={"Titouan"} text={"trop bien"} />

                    <Commentary profil={"El-Hadj"} text={"trop belle"} />

                    <Commentary profil={"Lucas"} text={"incroyable"} />

                    <Commentary profil={"Mickael"} text={"je l'aime"} />

                    <Commentary profil={"Sacha"} text={"propre"} />

                    <Commentary profil={"Soufiane"} text={"pas mal"} />
                </div>
               <div className="inputcom_slidingpane"> 
                <form>
                    <label>
                      <img
                                className="selfie_img"
                                src={selfie}
                                height="35"
                                width="35"
                                alt="selfie">
                            </img>
                      <input type="text" name="name" placeholder="Your commentary" onChange={this.commentary} />
                    </label>
                    <input type="submit" value="Publish" />
                </form>
              </div> 
            </SlidingPane>
            
            <SlidingPane
                className='some-custom-class'
                overlayClassName='some-custom-overlay-class'
                isOpen={ this.state.isPaneOpenLeft }
                title={this.props.name}
                from='left'
                width='700px'
                onRequestClose={ () => this.setState({ isPaneOpenLeft: false }) }>
                <div>
                    <strong> Statistics of {this.props.name} </strong>
                </div>
              <div className="chart">

                <Bar
                  data={this.state.chartData}
                  options={{
                    title:{
                      display:this.props.displayTitle,
                      text:'day',
                      fontSize:25
                    },
                    legend:{
                      display:this.props.displayLegend,
                      position:this.props.legendPosition
                    }
                  }}
                />

                <Line
                  data={this.state.chartData}
                  options={{
                    title:{
                      display:this.props.displayTitle,
                      text:'Week',
                      fontSize:25
                    },
                    legend:{
                      display:this.props.displayLegend,
                      position:this.props.legendPosition
                    }
                  }}
                />

                <Pie
                  data={this.state.chartData}
                  options={{
                    title:{
                      display:this.props.displayTitle,
                      text:'Interval between each transaction',
                      fontSize:25
                    },
                    legend:{
                      display:this.props.displayLegend,
                      position:this.props.legendPosition
                    }
                  }}
                />
            </div>
                
            </SlidingPane>


        </div>);

    }
}


export default ActuPeople;