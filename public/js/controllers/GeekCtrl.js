angular.module('GeekCtrl', []).controller('GeekController', function($scope) {

	$scope.tagline = 'MapsAPI stuff put here temporarily';	

    // ALL the maps stuff!
	var map;

	function initialize() {
	    var mapOptions = { zoom: 15 };
	    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	    // Try HTML5 geolocation
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(function (position) {
	            var pos = new google.maps.LatLng(position.coords.latitude,
                                                 position.coords.longitude);

	            var infowindow = new google.maps.InfoWindow(
                {
                    map: map,
                    position: pos,
                    content: 'Location found using HTML5.'
                });

	            map.setCenter(pos);
	        },
            function () {
                handleNoGeolocation(true);
            });
	    }
	    else {
	        // Browser doesn't support Geolocation
	        handleNoGeolocation(false);
	    }

	    infoWindow = new google.maps.InfoWindow();
	    service = new google.maps.places.PlacesService(map);

	    google.maps.event.addListenerOnce(map, 'bounds_changed', performSearch);
	}

	function handleNoGeolocation(errorFlag) {
	    if (errorFlag)
	    {
	        var content = 'Error: The Geolocation service failed.';
	    }
	    else
	    {
	        var content = 'Error: Your browser doesn\'t support geolocation.';
	    }

	    var options =
        {
            map: map,
            position: new google.maps.LatLng(60, 105),
            content: content
        };

	    var infowindow = new google.maps.InfoWindow(options);
	    map.setCenter(options.position);
	}


	function performSearch()
	{
	    var request =
        {
            bounds: map.getBounds(),
            radius: '100',
	        types: ['library', 'cafe',]

        };
	    //service.radarSearch(request, callback); // Radar search gets us more options with less variety
	    service.nearbySearch(request, callback);
	}

	function callback(results, status)
	{
	    if (status != google.maps.places.PlacesServiceStatus.OK)
	    {
	        alert(status);
	        return;
	    }
	    //for (var i = 0, result; result = results[i]; i++) // Iterates through results
	    //{}
	        createMarker(results[0]);
	}

	function createMarker(place)
	{
	    var marker = new google.maps.Marker(
        {
            map: map,
            position: place.geometry.location,
            icon:
            {
                // Star
                path: 'M 0,-24 6,-7 24,-7 10,4 15,21 0,11 -15,21 -10,4 -24,-7 -6,-7 z',
                fillColor: '#ff0000',
                fillOpacity: 1,
                scale: 1 / 4,
                strokeColor: '#bd8d2c',
                strokeWeight: 1
            }
        });

	    google.maps.event.addListener(marker, 'click', function () {
	        service.getDetails(place, function (result, status) {
	            if (status != google.maps.places.PlacesServiceStatus.OK) {
	                alert(status);
	                return;
	            }
	            infoWindow.setContent(result.name);
	            infoWindow.open(map, marker);
	        });
	    });
	}

	initialize();
});