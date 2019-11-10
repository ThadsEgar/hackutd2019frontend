import React, { useState, useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';
import './map.css';
import axios from "axios"

export const WebMapView = () => {

    const mapRef = useRef();

    const [userlocation, setLocation] = useState({
        latitude: "",
        longitude:""
    })

    useEffect(
      () => {
        axios.get("/login", {params:{
            username: localStorage.getItem("data-username"),
            userpassword: localStorage.getItem("data-password")
        }}
        ).then ((response) =>{
            console.log(response)
            setLocation({
                latitude:response.data.userlatitude,
                longitude: response.data.userlongitude
            })
        })
        // lazy load the required ArcGIS API for JavaScript modules and CSS
        loadModules([  "esri/Map",
                    "esri/views/MapView",
                    'esri/WebMap',
                    "esri/Graphic",
                    "esri/tasks/RouteTask",
                    "esri/tasks/support/RouteParameters",
                    "esri/tasks/support/FeatureSet"], { css: true })
        .then(([ArcGISMap, MapView,WebMap, Graphic, RouteTask, RouteParameters, FeatureSet]) => {

          var webmap = new WebMap({
            portalItem: { // autocasts as new PortalItem()
              id: '09c0adc9d5344186b9284e929e461384'
              //09c0adc9d5344186b9284e929e461384
            }
          });

          // Point the URL to a valid route service
          const routeTask = new RouteTask({
            url: "https://utility.arcgis.com/usrsvcs/appservices/SMRg4m0TcY16cxdU/rest/services/World/Route/NAServer/Route_World/solve"
          });


          // load the map view at the ref's DOM node
          const view = new MapView({
            container: mapRef.current,
            map: webmap,
            center: [-96.75, 32.99],
            zoom: 8
          });

          const origin = new Graphic({
              symbol: {
                type: "simple-marker",
                color: "cyan"
              },
              geometry: {
                type: "point",
                longitude: -96.75, // user
                latitude:  32.99// user
              }
            });

            const destination = new Graphic({
              symbol: {
                type: "simple-marker",
                color: "yellow"
              },
              geometry: {
                type: "point",
                longitude: -96.78, // shelter
                latitude: 33.00 // shelter
              }
            });

            const route = [origin, destination];

            view.graphics.addMany(route);

            const routeParams = new RouteParameters({
              stops: new FeatureSet({
                features: route
              })
            });

            routeTask.solve(routeParams).then(function(data) {
              data.routeResults.forEach(function(result) {
                result.route.symbol = {
                  type: "simple-line",
                  color: "blue",
                  width: "5px"
                };

                view.graphics.add(result.route);

              });
            });

          return () => {
            if (view) {
              // destroy the map view
              view.container = null;
            }
          };
        });
      }
    ,[origin]);


    return <div className="webmap" ref={mapRef} />;
};
export default WebMapView