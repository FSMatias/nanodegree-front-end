import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react'
import './css/App.css';
import './css/App-responsive.css';

class App extends Component {
 render() {
  return (
      <div className="app">
        <header className="app-header">
          <div className="app-header-logo">
            <img src={require('./icons/map.png')} className="app-logo" alt="logo" />
          </div> 
          <h1 className="app-header-title">Neighborhood Map</h1>
        </header>
        <section className='list-container'>
          <h1> List item section </h1>
        </section>
        <section className='map-container'>
          <Map google={this.props.google} /> 
        </section>
      </div>
    );
  }
}

export default GoogleApiWrapper({
 apiKey: 'API-KEY'
})(App);
