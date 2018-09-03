const friends = require('../data/friends');

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    var userArr = req.body;

    console.log(JSON.stringify(userArr))
    
    var diffArr = [];
    var totalDiffSum = 0;
    for(var i = 0; i < friends.length; i++) {
      totalDiffSum = 0;
      for(var k = 0; k < (friends[i].scores).length; k++) {
        totalDiffSum += Math.abs(userArr.scores[k] - friends[i].scores[k]);
          diffArr.push(totalDiffSum);
      }
    }
    console.log(diffArr);
    res.json(friends[0]);
  })
}
