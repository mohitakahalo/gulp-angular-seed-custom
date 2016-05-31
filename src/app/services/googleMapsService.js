/*
** Google Maps service that handles initialization and rendering
** author: @ishmeet
*/
(function(){
  'use strict';

  angular
    .module('services')
    .factory('googleMapsService', googleMapsService);

  /** @ngInject */
  function googleMapsService($q) {
    // Google Map related functions below
    /*params = {
        lat: //default latitude,
        lng: //default longitude,
        container: //container to render to
      }
    */
    function renderMap(params) {
      var defaultLatLang = {
            lat: params.lat || 12.9716,   //Co-ordinates of bangalore
            lng: params.lng || 77.5946
          };

      var mapElements = render(defaultLatLang, params);
      return mapElements;
    }

    function render(defaultLatLang, params) {
      if(!params.container) {
        return;
      }
      var map = new google.maps.Map(params.container, {
          center: defaultLatLang,
          zoom: 6,
          streetViewControl: false
      });

      var marker = new google.maps.Marker({
                position: defaultLatLang,
                map: map,
                title: 'current_location'
      });

      // Create the DIV to hold the control and call the constructor passing in this DIV
      var geolocationDiv = document.createElement('div');
      initGeolocationControls(geolocationDiv, map);
      map.controls[google.maps.ControlPosition.TOP_RIGHT].push(geolocationDiv);
      return {
        map:map, 
        marker: marker, 
        currentLocationButton:geolocationDiv
      };
    }

    //Creates a go to location button
    function initGeolocationControls(controlDiv) {
        var controlUI = document.createElement('button');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = 'none';
        controlUI.style.outline = 'none';
        controlUI.style.width = '28px';
        controlUI.style.height = '28px';
        controlUI.style.borderRadius = '2px';
        controlUI.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginRight = '10px';
        controlUI.style.padding = '0px';
        controlUI.title = 'Your Location';
        controlDiv.appendChild(controlUI);

        var controlText = document.createElement('div');
        controlText.style.margin = '5px';
        controlText.style.width = '18px';
        controlText.style.height = '18px';
        controlText.style.backgroundImage = 'url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-1x.png)';
        controlText.style.backgroundSize = '180px 18px';
        controlText.style.backgroundPosition = '0px 0px';
        controlText.style.backgroundRepeat = 'no-repeat';
        controlUI.appendChild(controlText);
    }

    //Function to set current location
    function geoLocate(){
      var deferred = $q.defer();
      $.getJSON("http://ipinfo.io", function(ipinfo){
          var latLong = ipinfo.loc.split(",");
          var pos = {
              lat: +latLong[0],
              lng: +latLong[1]
          };
          deferred.resolve(pos);
      });
      // navigator.geolocation.getCurrentPosition(function(position) {
      //     var pos = {
      //         lat: position.coords.latitude,
      //         lng: position.coords.longitude
      //     };
      //     deferred.resolve(pos);
      // }, function(error) { 
      //   // Check for known errors
      //   switch (error.code) {
      //       case error.PERMISSION_DENIED:
      //           deferred.reject("Geo location services appears to be disabled on your device.");
      //           break;
      //       case error.POSITION_UNAVAILABLE:
      //           deferred.reject("The current position could not be determined.");
      //           break;
      //       case error.PERMISSION_DENIED_TIMEOUT:
      //           deferred.reject("The current position could not be determined within the specified timeout period.");            
      //           break;
      //   }
      // });
      return deferred.promise;
    }

    // the smooth zoom function
    function smoothZoom (map, max, cnt) {
      if (cnt >= max) {
              return;
          }
      else {
          var z = google.maps.event.addListener(map, 'zoom_changed', function(){
              google.maps.event.removeListener(z);
              smoothZoom(map, max, cnt + 1);
          });
          window.setTimeout(function(){map.setZoom(cnt)}, 80);
      }
    }

    //Gives list of addresses using the latitude and longitude 
    function getAddressesFromLatLng(lat, lng) {
      var geocoder = new google.maps.Geocoder();
      var deferred = $q.defer();
      geocoder.geocode({
        "latLng": new google.maps.LatLng(lat, lng)
      }, function (results) { 
        if(!results) {
          deferred.resolve([]);
        }
        deferred.resolve(results);
      });

      return deferred.promise;
    }

    //Get address and display
    function getAddressFromLatLng(pos) {
      var deferred = $q.defer();
      getAddressesFromLatLng(pos.lat, pos.lng).then(function(response) {
        if(!response.length) {
          deferred.resolve({});
        }
        deferred.resolve(response[0]);
      },function(error){
        deferred.reject(error);
      });

      return deferred.promise;
    }

    return {
      renderMap: renderMap,
      geoLocate: geoLocate,
      getAddressFromLatLng: getAddressFromLatLng,
      smoothZoom: smoothZoom 
    };
  }
})();