angular.module('MainCtrl', []).controller('MainController', ["$scope", "UserFactory", function ($scope, userFactory) {

	$scope.tagline = 'To the moon and back!';	

    /*$scope.activity; is the dashboard list
            what: 'Recipe to try',
            who: 'Brian Holt',
            when: '3:08PM',
            notes: "We should eat this: Grapefruit, Squash, Corn, and Tomatillo tacos"
    */
	$scope.activity = [];
	$scope.activity.push({
	    what: 'Loading events..',
	    who: '--',
	    when: '--',
        notes: '--'
	});
	$scope.refreshList = function(eventsList)
	{
	    $scope.activity = [];
	    for(var i = 0; i < eventsList.length; i++)
	    {
	        /* THIS WONT WORK UNTIL YOU ATUALLY GET THE INFO OF THE EVENTS-- YOU ONLY HAVE IDS*/
            // Use populate in User get method
	        $scope.activity.push({
	            what: eventsList[i].name,
	            who: 'YOU!',
	            when: '0:00',
	            notes: 'No notes'
	        });
	    }
	}

	$scope.getUserInfo = function () {
	    console.log("Getting user info..");
	    userFactory.getSelf()
        .success(function (userID) {
            userFactory.getUser(userID)
            .success(function (userInfo)
            {
                console.log("User info found..");
                if (userInfo.events != null)
                {
                    console.log("Populating events..");
                    $scope.refreshList(userInfo.events);
                }
                else
                {
                    console.log("Events list was empty..");
                    $scope.activity = fakeActivity;
                }
                console.log(userInfo);
                console.log(userInfo.events[0].name);
            }).error(function (error) {
                console.log('Could not get User Info: ' + error.message);
            });
        }).error(function (error) {
            console.log('Could not get User ID: ' + error.message);
        });
	}

	fakeActivity = [
        {
            what: 'Brunch this weekend?',
            who: 'Ali Conners',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
        },
        {
            what: 'Summer BBQ',
            who: 'to Alex, Scott, Jennifer',
            when: '3:08PM',
            notes: "Wish I could come out but I'm out of town this weekend"
        },
        {
            what: 'Oui Oui',
            who: 'Sandra Adams',
            when: '3:08PM',
            notes: "Do you have Paris recommendations? Have you ever been?"
        },
        {
            what: 'Birthday Gift',
            who: 'Trevor Hansen',
            when: '3:08PM',
            notes: "Have any ideas of what we should get Heidi for her birthday?"
        },
        {
            what: 'Recipe to try',
            who: 'Brian Holt',
            when: '3:08PM',
            notes: "We should eat this: Grapefruit, Squash, Corn, and Tomatillo tacos"
        },
	];

	$scope.getUserInfo();
}]);