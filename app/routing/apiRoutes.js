const friends = require('../data/friends');

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    var userArr = req.body;
    console.log(JSON.stringify(userArr) + " survey results sent to API!");
    
    //set variables
    var diffArr = [];
    var minScoreDiff;
    var indexOfMatch;
    var totalDiffSum = 0;

    //compatible match logic
    for(var i = 0; i < friends.length; i++) {
      totalDiffSum = 0;
      for(var k = 0; k < (friends[i].scores).length; k++) {
        totalDiffSum += Math.abs(userArr.scores[k] - friends[i].scores[k]);
      }
      diffArr.push(totalDiffSum);
    }

    //response with match from friends api
    minScoreDiff = Array.min(diffArr);
    indexOfMatch = diffArr.indexOf(minScoreDiff);
    res.json(friends[indexOfMatch]);
  })
}

//array prototype function to find smallest integer in array
Array.min = function(array) {
  return Math.min.apply(Math, array);
};
