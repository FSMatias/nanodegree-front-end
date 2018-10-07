import React, { Component } from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import './css/App.css';
import './css/App-responsive.css';
import * as YelpService from './Yelp-service';
import ListView from './ListView';

var inactiveMarkerIcon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
var activeMarkerIcon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';

// Static data
var originalPlaces = [{
    id: 1,
    title: 'Palaphita',
    position: {
      lat: -22.9770927,
      lng: -43.2000606
    },
    isActive: false,
    yelpBusinessId: 'palaphita-kitch-rio-de-janeiro'
  },
  {
    id: 2,
    title: 'Zuka',
    position: {
      lat: -22.9831935,
      lng: -43.2302561
    },
    isActive: false,
    yelpBusinessId: 'zuka-rio-de-janeiro'
  },
  {
    id: 3,
    title: 'Sushimar',
    position: {
      lat: -22.9741533,
      lng: -43.2278477
    },
    isActive: false,
    yelpBusinessId: 'sushimar-gávea-rio-de-janeiro'
  },
  {
    id: 4,
    title: 'Banana Jack',
    position: {
      lat: -22.9848573,
      lng: -43.19824
    },
    isActive: false,
    yelpBusinessId: '' // empty - used to test case when there is no ID available
  },
  {
    id: 5,
    title: 'Outback Steakhouse',
    position: {
      lat: -22.9826983,
      lng: -43.2168294
    },
    isActive: false,
    yelpBusinessId: 'rf' //wrong id - used to test failed fetch case
  }
];

var emptyMarker = {
  title: '',
  position: {
    lat: null,
    lng: null
  },
  yelpBusinessId: ''
}

class App extends Component {
  state = {
    places: originalPlaces,
    activeMarker: emptyMarker,
    activeMarkerYelpInfo: {},
    waitingYelpToRespond: false,
    showingInfoWindow: false
  }

  onMarkerClick = (marker) => {
    const markerTitle = marker.title
    console.log(`Marker '${marker.title}' was clicked`)
    
    this.updateMarkerState(markerTitle)
  }

  getYelpBusinessInfo = (yelpBusinessId) => {
    if(yelpBusinessId === undefined || yelpBusinessId === '') {
      this.setState({
        activeMarkerYelpInfo: {}
      })
    } else {
      this.setState({
        waitingYelpToRespond: true
      })

      YelpService.getBusinessInfo(yelpBusinessId).then((businessInfo) => {
        this.setState({
          activeMarkerYelpInfo: {
            rating: businessInfo.rating,
            name: businessInfo.name,
            image_url: businessInfo.image_url
          },
          waitingYelpToRespond: false
        })
      }).catch(() => {
        this.setState({
          activeMarkerYelpInfo: {},
          waitingYelpToRespond: false
        })
      })
    } 
  }

  updateMarkerState = (markerTitle) => {
    let marker = emptyMarker;
    let placesUpdated = this.state.places
    placesUpdated.forEach(function (place) {
      if (place.title === markerTitle) {
        place.isActive = true
        marker.position = place.position
        marker.title = place.title
        marker.yelpBusinessId = place.yelpBusinessId
      } else {
        place.isActive = false
      }
    });

    this.getYelpBusinessInfo(marker.yelpBusinessId)
  
    this.setState({
      places: placesUpdated,
      activeMarker: marker,
      showingInfoWindow: true
    })
  }

  getMarkerIcon = (placeisActive) => {
    if(placeisActive) {
      return activeMarkerIcon;
    } else {
      return inactiveMarkerIcon;
    }
  }

  handleKeyUp = (event) => {
    event.preventDefault()
    const query = event.target.value

    let filteredPlaces
    if (query === '') {
      filteredPlaces = originalPlaces
    } else {
      filteredPlaces = originalPlaces.filter(place => place.title.toLowerCase().includes(query.toLowerCase()))
    }

    this.setState({
      places: this.resetMarkerState(filteredPlaces),
      activeMarker: emptyMarker,
      activeMarkerYelpInfo: {},
      showingInfoWindow: false
    })
  }

  resetMarkerState = (places) => {
    places.forEach(function (place) {
      place.isActive = false
    });

    return places
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
          <div className="search-places-input-wrapper">
            <form onKeyUp={this.handleKeyUp}>
              <input className="search-input-text" type="text" name="query" placeholder="Search by place name"/>
            </form>
          </div>
          <ListView 
            places={this.state.places}
            onListItemClick = {this.updateMarkerState}
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
                title={place.title}
                position={
                  {
                    lat: place.position.lat, 
                    lng: place.position.lng
                  }
                } 
                icon={this.getMarkerIcon(place.isActive)}
                onClick = {this.onMarkerClick}
              />
            ))}

            {/* Show InfoWindow on the Active marker */}
              <InfoWindow
                visible={this.state.showingInfoWindow}
                position={{
                  lat: this.state.activeMarker.position.lat,
                  lng: this.state.activeMarker.position.lng
                }}
                pixelOffset={new this.props.google.maps.Size(0, -30)}>
                <div className="info-window">
                  <div className="info-window-header">
                    <h3 className="info-window-title"> {this.state.activeMarker.title} </h3>
                  </div>
                  <div className="info-window-content">
                    {/* Info window content cointain:
                        - Loading info, if waiting for fetch to respond
                        - No available info, if the business has no Yelp ID registered or the fetch response is different than 200
                        - Business info, if yelp returns info about specific business
                    */}
                    {this.state.waitingYelpToRespond && (
                      <div>
                        <span id="loading-rotate" className="glyphicon glyphicon glyphicon-refresh" aria-hidden="true"></span>
                      </div>
                    )}
                    
                    {(Object.keys(this.state.activeMarkerYelpInfo).length > 0) && !this.state.waitingYelpToRespond && (
                        <div>
                          <p> Rating: {this.state.activeMarkerYelpInfo.rating} </p>
                          <img src={this.state.activeMarkerYelpInfo.image_url} alt={this.state.activeMarkerYelpInfo.name} height="110" width="110"/>
                        </div>                      
                    )}
                    
                    {(Object.keys(this.state.activeMarkerYelpInfo).length <= 0) && !this.state.waitingYelpToRespond && (
                      <div>
                        <p> Sorry! </p>
                        <p> There is no available info about this business. </p>
                      </div>
                    )}
                  </div>
                </div>
              </InfoWindow>              
          </Map>   
        </section>
      </div>
    );
  }
}

export default GoogleApiWrapper({   
  apiKey: '<your GOOGLE API key>'
})(App);
