/*
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { tick } from '../actions';
import './clockcss.css'

class Clock extends Component {
    componentDidMount(){
        setInterval(() => {
            this.props.tick();
        }, 1000);
    }

    render(){
        //console.log('Clock Props:', this.props);


        return(
            <div>
                <h2>{this.props.date}</h2>
                <h1>{this.props.time}</h1>
            </div>
        )
    }
}

function mapStateToProps(state){
    //console.log('REDUX', state);
    return {
        time: state.clock.currentTime,
        date: state.clock.date,

    }
}

export default connect(mapStateToProps, {

    tick: tick
})(Clock);*/
