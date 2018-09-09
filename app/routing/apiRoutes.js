const friends = require('../data/friends');

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    var userData = req.body;
    console.log(JSON.stringify(userData) + " survey results sent to API!");
    
    //set variables
    var diffArr = [];
    var intArr = [];
    var minScoreDiff;
    var indexOfMatch;
    var totalDiffSum = 0;

    //compatible match logic
    for(var i = 0; i < friends.length; i++) {
      totalDiffSum = 0;
      for(var k = 0; k < (friends[i].scores).length; k++) {
        totalDiffSum += Math.abs(userData.scores[k] - friends[i].scores[k]);
      }
      diffArr.push(totalDiffSum);
    }

    //response with match from friends api
    minScoreDiff = Array.min(diffArr);
    indexOfMatch = diffArr.indexOf(minScoreDiff);
    res.json(friends[indexOfMatch]);

    //parse string array to integers
    for(let int of userData.scores) {
      intArr.push(parseInt(int));
    }
    //push new user info into friends api
    friends.push({
      "name": userData.name,
      "photo": userData.image,
      "scores": intArr
    })
  })
}

//array prototype function to find smallest integer in array
Array.min = function(array) {
  return Math.min.apply(Math, array);
};
