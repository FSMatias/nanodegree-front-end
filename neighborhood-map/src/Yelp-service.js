const apiUrl = "https://api.yelp.com/v3/businesses"

// CORS proxy is a free service for developers who need to bypass same-origin policy related to performing standard AJAX requests to 3rd party services.
// Should only be used under development
const corsProxy = "https://cors-anywhere.herokuapp.com"

const token = "<your YELP API key>"

const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
}

export const getBusinessInfo = (businessId) =>
    fetch(
        `${corsProxy}/${apiUrl}/${businessId}`, {
            headers
        }
    )
    .then((response) => {
        if(response.ok) {
            return response.json()
        } else {
            throw Error(response.statusText)
        }
    })
    .catch((error) => {
        console.log('Could not find business info on Yelp')
    })