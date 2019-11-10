import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';
import './map.css';

export const WebMapView = () => {
    const mapRef = useRef();

    useEffect(
      () => {
        // lazy load the required ArcGIS API for JavaScript modules and CSS
        loadModules([  "esri/Map",
  "esri/views/MapView",
  "esri/Graphic",
  "esri/tasks/RouteTask",
  "esri/tasks/support/RouteParameters",
  "esri/tasks/support/FeatureSet"], { css: true })
        .then(([ArcGISMap, MapView, Graphic, RouteTask, RouteParameters, FeatureSet]) => {
          const map = new ArcGISMap({
            basemap: 'topo-vector'
          });

          // Point the URL to a valid route service
          const routeTask = new RouteTask({
            url: "https://utility.arcgis.com/usrsvcs/appservices/SMRg4m0TcY16cxdU/rest/services/World/Route/NAServer/Route_World/solve"
          });


          // load the map view at the ref's DOM node
          const view = new MapView({
            container: mapRef.current,
            map: map,
            center: [-105, 39],
            zoom: 8
          });

          const origin = new Graphic({
              symbol: {
                type: "simple-marker",
                color: "cyan"
              },
              geometry: {
                type: "point",
                longitude: -104.9903,
                latitude: 39.7392
              }
            });

            const destination = new Graphic({
              symbol: {
                type: "simple-marker",
                color: "yellow"
              },
              geometry: {
                type: "point",
                longitude: -105.2705,
                latitude: 40.0150
              }
            });
            const destinationTwo = new Graphic({
              symbol: {
                type: "simple-marker",
                color: "yellow"
              },
              geometry: {
                type: "point",
                longitude: -105.2705,
                latitude: 44.0150
              }
            });

            const route = [origin, destination];
            const routeTwo = [origin, destinationTwo];

            view.graphics.addMany([route,routeTwo]);

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
                  width: "4px"
                };

                view.graphics.add(result.route);

              });
            });

            const routeParamsTwo = new RouteParameters({
              stops: new FeatureSet({
                features: routeTwo
              })
            });

            routeTask.solve(routeParamsTwo).then(function(data) {
              data.routeResults.forEach(function(result) {
                result.routeTwo.symbol = {
                  type: "simple-line",
                  color: "blue",
                  width: "4px"
                };

                view.graphics.add(result.routeTwo);

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
    );

    return <div className="webmap" ref={mapRef} />;
};
export default WebMapView
