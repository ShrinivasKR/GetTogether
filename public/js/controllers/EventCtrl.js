//, 'rgkevin.datetimeRangePicker', 'vr.directives.slider', 'ngTouch'], [require('angular-touch')]
angular.module('EventCtrl', ['ngMaterial', 'ngMessages']).controller('EventController', ["$scope", '$location',"EventFactory", function ($scope, $location, eventFactory) {
    // stripped out: , 'ui.bootstrap'

    $scope.myTime = { date: new Date() }; // This will be the time used to create the final event


    $scope.setTime = function () {

    }


        
    // stripped out: , 'ui.bootstrap'

    /* ======= Scope variables  ======= */
    $scope.user = {
        username: 'Enter Username',
        password: 'Enter Password',
    };
    $scope.myUserName = "Test User";
    $scope.eventName = {text:""};
    $scope.myLocation = { latitude: null, longitude: null }; // As above, for the location
    $scope.userId = ''; // Example of our user creating the event
    $scope.fullUsersList = [];
    $scope.userNames = ['Test User UW Bothell', 'Test User UW Seattle', 'Test User Everett']; // These example names live in database
    var usersData = ['']; // This becomes the list of IDs sent to the database, used to create the event

    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;

    /* ======= Maps variables ======= */
    var map;
    var initialZoom = 15;
    var zoomIncriment = 2;
    var expanionNum = 0;
    var maxExpansionNum = 4;
    $scope.locationStatus = "Please enter users in order to auto-generate a place";
    var chooseButtonText = "Choose this place!";

    /* ======= Scope functions ======= */
    $scope.toggleMode = function () {
        $scope.ismeridian = !$scope.ismeridian;
    };

    $scope.update = function () {
        var d = new Date();
        d.setHours(14);
        d.setMinutes(0);
        $scope.mytime = d;
    };

    $scope.changed = function () {
        console.log('Time changed to: ' + $scope.mytime);
    };

    $scope.clear = function () {
        $scope.mytime = null;
    };

    $scope.createEvent = function ()
    {
        eventFactory.getSelf()
            .success(function (userID) {
                $scope.userId = userID;

                eventFactory.verifyUsers($scope.userNames)
                .success(function (usersList) {
                    console.log("Retrived users info");
                    usersData = usersList;
                    // Create an event
                    console.log('Date: ' + $scope.myTime.date);
                    var userDataIDList = [];
                    for (var i = 0; i < usersData.length; i++)
                    {
                        userDataIDList.push(usersData[i]._id);
                    }
                    var event = {
                        name: $scope.eventName.text,
                        date: $scope.myTime.date,
                        location: $scope.myLocation,
                        users: userDataIDList, // People attending
                        creator: $scope.userId // The person creating
                    };
                    eventFactory.createEvent(event).success(function (userIDList) {
                        $location.path('/dashboard');
                    }).error(function (error) {
                        console.log('Could not get save event: ' + error.message);
                        $location.path('/dashboard');
                    });
                }).error(function (error) {
                    console.log('Unable to load users IDs: ' + error.message);
                });
            }).error(function (error) {
                console.log('Could not get User ID: ' + error.message);
            });
                $scope.showPeople = function (ev) {
                    $mdDialog.show({
                            controller: DialogController,
                            template: '<md-dialog aria-label="Mango (Fruit)"> <md-content class="md-padding"> <label>Search: <input ng-model="searchText"></label><table id="searchTextResults"> <tr> <th>Name</th> </tr><tr ng-repeat="user in fullUsersList | filter:searchText"> <td>{{user.name}}</td></tr></table><hr><label>Any: <input ng-model="search.$"></label><br><label>Name only <input ng-model="search.name"></label><br><br><table id="searchObjResults"> <tr> <th>Name</th> </tr><tr ng-repeat="userObj in fullUsersList | filter:search:strict"> <td>{{userObj.name}}</td></tr></table> </md-content> <div class="md-actions" layout="row"> <span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="answer(\'useful\')" class="md-primary"> Save </md-button> </div></md-dialog>',
                            targetEvent: ev,
                        })
                        .then(function (answer) {
                            $scope.alert = 'You said the information was "' + answer + '".';
                        }, function () {
                            $scope.alert = 'You cancelled the dialog.';
                        });
                };
    };

    $scope.suggestLocation = function()
    {
        eventFactory.verifyUsers($scope.userNames)
            .success(function (userList) {
                console.log("Retrived users info.");
                usersData = userList;
                var userDataIDList = [];
                for (var i = 0; i < usersData.length; i++) {
                    userDataIDList.push(usersData[i]._id);
                }
                eventFactory.suggestEventLocaiton(userDataIDList)
                .success(function (locationData) {
                    myLocation = locationData; // Set the event location here, for now.

                    $scope.locationStatus = "Retrived Location: " + locationData.latitude + ", " + locationData.longitude;

                    var pos = new google.maps.LatLng(locationData.latitude, locationData.longitude);

                    var infowindow = new google.maps.InfoWindow();

                    map.setCenter(pos);

                    infoWindow = new google.maps.InfoWindow();
                    service = new google.maps.places.PlacesService(map);

                    google.maps.event.addListenerOnce(map, 'bounds_changed', performSearch);
                })
                .error(function (error) {
                    $scope.locationStatus = 'Unable to load location: ' + error.message;
                });
            }).error(function (error) {
                console.log('Unable to load users IDs: ' + error.message);
            });
    }

    $scope.suggestTime = function()
    {
        var useresToVerify = $scope.userNames;
        useresToVerify.push($scope.myUserName);
        eventFactory.verifyUsers(useresToVerify)
            .success(function (usersList) {
                usersData = usersList;
                if (usersData != null && usersData[0].schedule != null)
                {
                    var tempSchedule = usersData[0].schedule; // Start with our 0 schedule
                    for (var i = 1; i < usersData.length; i++) // Check the rest of the peoples' schedules
                    {
                        if (usersData[i].schedule == null || usersData[i].schedule == []) // Skip a scheudle if it's empty
                            i++;

                        for(var sNum = 0; sNum < usersData[i].schedule.length; sNum++) // Go through the entire schedule
                        {
                            if (usersData[i].schedule[sNum] == true) // True means that the scheudle is busy
                            {
                                tempSchedule[sNum] = true;
                            }
                        }
                    }
                    var keepGoing = true; // pseudo 'break' statement, because I wouldn't trust Javascript with my [insert joke]
                    var scheduleStepper;
                    for (scheduleStepper = 0; scheduleStepper < tempSchedule.length && keepGoing; scheduleStepper++)
                    {
                        if (tempSchedule[scheduleStepper] != true)
                        {
                            keepGoing = false;
                        }
                    }
                    var dayVar = scheduleStepper % 7;
                    var timeOfDayVar = Math.floor(scheduleStepper / 7); // Equivlent of integer division (there is no int in javascript). Of course there isn't.
                    console.log(usersData);
                    console.log(tempSchedule);
                    console.log(usersData[3].schedule);
                    console.log("ScheduleStepper: " + scheduleStepper + ", DAY: " + dayVar + ", TIME: " + timeOfDayVar);

                    var reccDate = new Date(); //Today's date
                    // Account for Saturday:
                    dayVar--;
                    if (dayVar == -1)
                        dayVar = 6; // Saturday should be day 6

                    dayVar = dayVar - reccDate.getDay();

                    if (dayVar < 1) // Acount for days earlier in the week than currentDate
                    {
                        dayVar += 7;
                    }

                    reccDate.setUTCHours(reccDate.getUTCHours() + (dayVar * 24));
                    reccDate.setMinutes(0);
                    var hours = 6 + timeOfDayVar;
                    
                    reccDate.setHours(hours);
                    console.log(reccDate.toLocaleString());

                    $scope.myTime.date = reccDate;
                }
            }).error(function (error) {
                console.log("Could not verify users: " + error);
            });
    }

    $scope.getEventLocation = function () // Should probably take paramaters
    {
        
        var eventID = '556a43bf27c78d1011059d2b';
        eventFactory.getEventLocation(eventID)
            .success(function (locationData) {
                $scope.locationStatus = "Retrived Location: " + locationData.latitude + ", " + locationData.longitude;

                //$scope.nerdData = nerdList;
            })
            .error(function (error) {
                $scope.locationStatus = 'Unable to load location: ' + error.message;
            });
    };

    $scope.getEvent = function()
    {
        var eventID = '556b547708dc1bfc0ecf774d';
        eventFactory.getEvent(eventID)
            .success(function (eventData) {
                console.log(eventData);
                $scope.locationStatus = "Retrived Event: " + eventData.location.latitude;
            }).error(function (error) {
                $scope.locationStatus = 'Unable to load event: ' + error.message;
            });
    }

    $scope.verifyUsers = function()
    {
        eventFactory.verifyUsers($scope.userNames)
            .success(function (userIDList) {
                console.log("Retrived user IDs: " + userIDList);
                usersData = userIDList;
            }).error(function (error) {
                console.log('Unable to load users IDs: ' + error.message);
            });
    }

    $scope.getAllUsers = function()
    {
        eventFactory.getAllUsers($scope.userNames)
            .success(function (usersList) {
                console.log("Retrived all users");
                $scope.fullUsersList = usersList;
            }).error(function (error) {
                console.log('Unable to load all users: ' + error.message);
            });
    }

    $scope.getAllUsers();

    /* ======= Maps functions ======= */

    $scope.initialize = function () {
        var mapOptions = { zoom: initialZoom };
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        //getPosition();
    }

    function getPosition() {
        eventFactory.getEventLocation('556a76819db8d8f0102ef159') // Random temp ID
            .success(function (location) {
                $scope.locationStatus = "Retrieving location..";

                var pos = new google.maps.LatLng(location.latitude, location.longitude);

                var infowindow = new google.maps.InfoWindow();

                map.setCenter(pos);

                infoWindow = new google.maps.InfoWindow();
                service = new google.maps.places.PlacesService(map);
                $scope.locationStatus = "Marking nearby locations.."
                google.maps.event.addListenerOnce(map, 'bounds_changed', performSearch);
            })
            .error(function (error) {
                $scope.locationStatus = 'Unable to retrieve location: ' + error.message;
            });

    }

    function performSearch() {
        expanionNum++;
        var typesList = ['library', 'cafe'];
        var radius = 5000;
        switch (expanionNum) {
            case 1:
                radius = 5000;
                break;
            case 2:
                radius = 10000;
                break;
            case 3:
                radius = 25000;
                break;
            case 4:
                radius = 35000;
                break;
            case 5:
                radius = 50000;
                typesList += ['city_hall', 'park', 'establishment', 'food', 'night_club'];
                break;
            default:
                expansionNum = maxExpansionNum + 1; // Uhoh. Ensure we're past max num
        }
        var request =
        {
            bounds: map.getBounds(),
            radius: '' + radius, // dirty string conversion
            types: typesList

        };
        //service.radarSearch(request, callback); // Radar search gets us more options with less variety
        service.nearbySearch(request, callback);
    }

    function callback(results, status) {
        if (status != google.maps.places.PlacesServiceStatus.OK) {
            console.log("Error: Unable to display search results: " + status);
            if (expanionNum < maxExpansionNum) {
                console.log("Expanding search paramaters..");
                google.maps.event.addListenerOnce(map, 'bounds_changed', performSearch);
                map.setZoom(map.getZoom() - zoomIncriment);
            }
            return;
        }
        map.setCenter(results[0].geometry.location);
        for (var i = 0, result; result = results[i]; i++) // Iterates through results
        {
            createMarker(results[i]);
        }
    }

    function createMarker(place) {
        var marker = new google.maps.Marker(
        {
            map: map,
            position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function () {
            service.getDetails(place, function (result, status) {
                if (status != google.maps.places.PlacesServiceStatus.OK) {
                    alert(status);
                    return;
                }

                infoWindow.setContent("<b>" + result.name + "</b></br> " + result.formatted_address + '</br><button onclick="chooseLocation(\'' + result.name + '\',\'' + result.formatted_address + '\','+ result.geometry.location.lat() + ',' + result.geometry.location.lng() + ')">' + chooseButtonText + '</button>');
                infoWindow.open(map, marker);
            });
        });
    }

    //Method used by the markers' 'choose location' button. 
    // Returns the name, formated address, latitude, and longitude
    chooseLocation = function(name, addr, lat, long)
    {
        $scope.myLocation = {
            latitude: lat,
            longitude: long
        };
        var position = new google.maps.LatLng(lat, long)
        map.setCenter(position);
    }

}])
.config(function ($mdThemingProvider) {

        // Configure a dark theme with primary foreground yellow

        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('yellow')
            .dark();
});