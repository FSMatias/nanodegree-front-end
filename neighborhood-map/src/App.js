import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import './css/App.css';
import './css/App-responsive.css';
import ListView from './ListView';

var inactiveMarkerIcon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
var activeMarkerIcon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';

// Static data
var places = [{
    id: 1,
    name: 'Palaphita',
    position: {
      lat: -22.9770927,
      lng: -43.2000606
    },
    isActive: false,
  },
  {
    id: 2,
    name: 'Zuka',
    position: {
      lat: -22.9831935,
      lng: -43.2302561
    },
    isActive: false,
  },
  {
    id: 3,
    name: 'Sushimar',
    position: {
      lat: -22.9741533,
      lng: -43.2278477
    },
    isActive: false,
  },
  {
    id: 4,
    name: 'Banana Jack',
    position: {
      lat: -22.9848573,
      lng: -43.19824
    },
    isActive: false,
  },
  {
    id: 5,
    name: 'Outback Steakhouse',
    position: {
      lat: -22.9826983,
      lng: -43.2168294
    },
    isActive: false,
  }
];

class App extends Component {
  state = {
    places: places
  }

  onMarkerClick = (marker) => {
    console.log(`Marker '${marker.title}' was clicked`)
    this.updateMarkerState(marker.title)
  }

  updateMarkerState = (markerTitle) => {
    console.log(markerTitle)
    let placesUpdated = this.state.places
    console.log(placesUpdated)
    placesUpdated.forEach(function (place) {
      if (place.name === markerTitle) {
        place.isActive = true
      } else {
        place.isActive = false
      }
    });

    this.setState({
      places: placesUpdated
    })
  }

  getMarkerIcon = (placeisActive) => {
    if(placeisActive) {
      return activeMarkerIcon;
    } else {
      return inactiveMarkerIcon;
    }
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
            onListItemClick = {this.updateMarkerState}
          />
        </section>
        <section className='map-container'>
          <Map 
            google={ this.props.google } 
            initialCenter={{
              lat: -22.9826983,
              lng: -43.2168294
            }}
            zoom={ 14 }
          >
          {/* Add Markers to all places listed under state.places */}
          {this.state.places.map((place) => (
            <Marker key={ place.id }
              title={ place.name }
              position={
                {
                  lat: place.position.lat, 
                  lng: place.position.lng
                }
              } 
              icon={ this.getMarkerIcon(place.isActive) }
              onClick = { this.onMarkerClick }
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
