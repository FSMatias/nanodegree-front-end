import React from 'react'
import './css/App.css';
import './css/App-responsive.css';
import PropTypes from 'prop-types'

class ListView extends React.Component {
    
    static propTypes = {
        places: PropTypes.array.isRequired,
     }

    render() {
        return(
            <div>
                <ol className="places-grid">
                    {this.props.places.map((place) => (
                        <li key={place.id}>
                            <p>{place.name}</p>
                        </li>
                    ))}
                </ol>
            </div>       
        )
    }
}

export default ListView