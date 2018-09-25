import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'
import './css/App.css';
import './css/App-responsive.css';
import ListView from './ListView';

var places = [
  { 
    id: 1,
    name: 'Palaphita',
    position: {
      lat: -22.9770927,
      lng: -43.2000606
    }
  },
  { 
    id: 2,
    name: 'Zuka',
    position: {
      lat: -22.9831935,
      lng: -43.2302561
    }
  },
  { 
    id: 3,
    name: 'Sushimar',
    position: {
      lat: -22.9741533,
      lng: -43.2278477
    }
  },
  { 
    id: 4,
    name: 'Banana Jack',
    position: {
      lat: -22.9848573,
      lng: -43.19824
    }
  },
  { 
    id: 5,
    name: 'Outback Steakhouse',
    position: {
      lat: -22.9826983,
      lng: -43.2168294
    }
  }
];

class App extends Component {
  state = {
    places: places
  }

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
          <ListView 
            places={this.state.places}
          />
        </section>
        <section className='map-container'>
          <Map 
            google={this.props.google} 
            initialCenter={{
              lat: -22.9826983,
              lng: -43.2168294
            }}
            zoom={14}
          >
          {/* Add Markers to all places listed under state.places */}
          {this.state.places.map((place) => (
            <Marker key={place.id}
              title={place.name}
              position={
                {
                  lat: place.position.lat, 
                  lng: place.position.lng
                }
              } 
            />
          ))}
          </Map>           
        </section>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'API-KEY'
})(App);
