
# Neighborhood-map application

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks on this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md). 

The project uses glyphicon for the icons in the application.

## Table of Contents

- [Introduction](#introduction)
- [Requirements](#requirements)
- [Instructions](#instructions)

## Introduction
This project is a single-page application using React featuring a map of a neighborhood. This application is the last project of the Udacity Nanodegree Front End Web Developer. 

## Requirements
- Install TSLint to get the warinings in your Editor (if using VSCode)
- To be able to call Yelp API, use the CORS proxy. More information [ here ](https://stackoverflow.com/questions/48940347/is-there-any-alternative-to-cors-google-chrome-extension-how-to-make-successful)

## Instructions

The app uses Google Maps API and Yelp API. Before running the app you will need to replace:

1. `<your GOOGLE API key>` with a [ Google Maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key) and
2. `<your YELP API key>` with a [ Yelp API key](https://www.yelp.com/developers/documentation/v3/authentication)

After replacing all API keys, you can use the following cmds:

1. Run ``npm install`` cmd to install dependencies
2. Run ``npm start`` to build and run the the applcaiiton

## Service Worker

When creating the react app using [create-react-app](https://github.com/facebookincubator/create-react-app), a service worker is already built in. You can find the registration of the service worker under registerServiceWorker.js file. The register() function helps to register the service worker to the React app only if its in a production mode and if the browser supports Service workers. To test it, you should prepare the React app for production. Run ``npm run build`` command. This command builds the app for production to the build folder and correctly bundles React in production mode and optimizes the build for the best performance. It also registers the service worker. 

To serve the app, you need to: 
1. install serve: ``npm i serve -g``
2. run command ``serve -s build``. The app should be running at http://localhost:5000. 


Check more instructions on this [article](https://medium.com/front-end-hacking/build-a-realtime-pwa-with-react-99e7b0fd3270).