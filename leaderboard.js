// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

Players = new Meteor.Collection("players");

/**
 * Separate player logic into an own service singleton for better testability and reusability.
 * @type {{}}
 */
PlayersService = {
  getPlayerList: function () {
    return Players.find({}, {sort: {score: -1, name: 1}});
  },
  getPlayer: function (playerId) {
    return Players.findOne(playerId);
  },
  rewardPlayer: function (playerId) {
    Players.update(playerId, {$inc: {score: 5}});
  },
  playersExist: function () {
    return Players.find().count() > 0;
  },
  generateRandomPlayers: function () {
    var names = ["Ada Lovelace",
                 "Grace Hopper",
                 "Marie Curie",
                 "Carl Friedrich Gauss",
                 "Nikola Tesla",
                 "Claude Shannon"];
    for (var i = 0; i < names.length; i++) {
      Players.insert({name: names[i], score: this._randomScore()});
    }
  },
  _randomScore: function () {
    return Math.floor(Random.fraction() * 10) * 5
  }
};

if (Meteor.isClient) {
  Template.leaderboard.players = function () {
    return PlayersService.getPlayerList();
  };

  Template.leaderboard.selected_name = function () {
    var player = PlayersService.getPlayer(Session.get("selected_player"));
    return player && player.name;
  };

  Template.player.selected = function () {
    return Session.equals("selected_player", this._id) ? "selected" : '';
  };

  Template.leaderboard.events({
    'click input.inc': function () {
      PlayersService.rewardPlayer(Session.get("selected_player"));
    }
  });

  Template.player.events({
    'click': function () {
      Session.set("selected_player", this._id);
    }
  });
}

// On server startup, create some players if the database is empty.
if (Meteor.isServer) {
  Meteor.startup(function () {
    if (!PlayersService.playersExist()) {
      //this works
      //PlayersService.generateRandomPlayers();

      //however, to get a consistent Nightwatch walkthrough
      //we need to be more specific about our players
      Meteor.publish('players', function(){
        return Players.find();
      });
      if (Players.find().count() === 0) {
        Players.insert({
          name: 'Ada Lovelace',
          score: 50
        });
        Players.insert({
          name: 'Grace Hopper',
          score: 40
        });
        Players.insert({
          name: 'Marie Curie',
          score: 20
        });
        Players.insert({
          name: 'Carl Friedrich Gauss',
          score: 5
        });
        Players.insert({
          name: 'Nikola Tesla',
          score: 25
        });
        Players.insert({
          name: 'Claude Shannon',
          score: 35
        });
      }


    }
  });
}
