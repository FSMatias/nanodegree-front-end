# Mobile Web Specialist Certification Course
---
#### _Three Stage Course Material Project - Restaurant Reviews_

## Project Overview: Stage 1

For the **Restaurant Reviews** projects, you will incrementally convert a static webpage to a mobile-ready web application. In **Stage One**, you will take a static design that lacks accessibility and convert the design to be responsive on different sized displays and accessible for screen reader use. You will also add a service worker to begin the process of creating a seamless offline experience for your users.

### Specification

You have been provided the code for a restaurant reviews website. The code has a lot of issues. It’s barely usable on a desktop browser, much less a mobile device. It also doesn’t include any standard accessibility features, and it doesn’t work offline at all. Your job is to update the code to resolve these issues while still maintaining the included functionality. 

## Pre-requisites



### Leaflet.js and Mapbox:

This repository uses [leafletjs](https://leafletjs.com/) with [Mapbox](https://www.mapbox.com/). You need to replace `<your MAPBOX API KEY HERE>` with a token from [Mapbox](https://www.mapbox.com/). Mapbox is free to use, and does not require any payment information. 


## Instructions

1. Before running, you need to generate the responsive images:
    1. Run ``npm install`` cmd
    2. Install GraphicsMagick and add it to PATH env. variable
    3. Run ``grunt`` cmd to generate images under the img-responsive folder

2. Start the HTTP server:
    1. In this folder, start up a simple HTTP server to serve up the site files on your local computer. 
In a terminal, check the version of Python you have: `python -V`. If you have Python 2.x, spin up the server with `python -m SimpleHTTPServer 8000` (or some other port, if port 8000 is already in use.) For Python 3.x, you can use `python3 -m http.server 8000`. If you don't have Python installed, navigate to Python's [website](https://www.python.org/) to download and install the software.
    2. With your server running, visit the site: `http://localhost:8000` 



### Responsive Images General Instructions

Here you can find instructions to create responsive images on a new project.

To create resposive images you can use [grunt-responsive-images](https://www.npmjs.com/package/grunt-responsive-images) package. 

1. Follow the grunt-responsive-images page instructions. The package require the installation of either GraphicsMagick or ImageMagick. After installing, add the application's executable path under the PATH env. variable
2. Run `grunt` cmd to regenerate responsive images.
3. Use the picture HTML element to set the responsive images for different screen sizes. See example below:

```
<picture>
  <source media="(min-width: 650px)" srcset="img_medium.jpg">
  <source media="(min-width: 465px)" srcset="img_small.jpg">
  <img src="img_original.jpg" alt="Flowers" style="width:auto;">
</picture>
```

### ARIA practices:
1. [Breadcrumb](https://www.w3.org/TR/waI-aria-practices/examples/breadcrumb/index.html)

2. [Tabindex](https://developers.google.com/web/fundamentals/accessibility/focus/using-tabindex)