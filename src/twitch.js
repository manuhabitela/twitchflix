var view = require('cli-view-utils');
var request = require('request');
var Q = require('q');
var gameAliases = {
    'hots': 'Heroes of the Storm',
    'hs': 'Hearthstone: Heroes of Warcraft',
    'lol': 'League of Legends',
    'cs': 'Counter-Strike: Global Offensive',
    'dota': 'Dota 2',
    'ow': 'Overwatch'
};

module.exports.getUrlToStream = function getUrlToStream(searchParams) {
    var deferred = Q.defer();
    searchStreams(searchParams)
        .then(listStreams)
        .then(selectStream)
        .then(function(stream) {
            deferred.resolve(stream.channel.url);
        });
    return deferred.promise;
};

module.exports.gameAliases = function games() {
    for (var alias in gameAliases) {
        view.renderMessage(view.colors.yellow(alias) + ' for ' + view.colors.green(gameAliases[alias]));
    }
    view.renderMessage('You can pass any ' + view.colors.yellow('alias') + ' to the --game option.');
};

function searchStreams(searchParams) {
    var deferred = Q.defer();

    request({
        qs: normalizeSearchParams(searchParams),
        json: true,
        url: 'https://api.twitch.tv/kraken/streams',
        headers: {
            'Client-ID': 'axxj92ty0xbi1pvj1ksga3ca7ehiff',
            'Accept': 'application/vnd.twitchtv.v5+json'
        }
    }, function(err, response, data) {
        deferred.resolve(data.streams);
    });

    return deferred.promise;
}

function normalizeSearchParams(searchParams) {
    var params = {
        limit: searchParams.limit || 25,
        offset: searchParams.offset || 0,
    };
    ['channel', 'game'].forEach(function(prop) {
        if (searchParams[prop]) {
            params[prop] = searchParams[prop];
        }
    });
    if (searchParams.game && gameAliases[searchParams.game]) {
        params.game = gameAliases[searchParams.game];
    }
    return params;
}

function listStreams(streams) {
    view.renderTable(streams, {head: ['Channel', 'Game', 'Viewers']}, renderStreamLine);
    return streams;
}

function renderStreamLine(stream) {
    var channel = view.colors.yellow.bold(stream.channel.name);
    var viewers = view.colors.cyan(stream.viewers + ' viewers');
    var game = view.colors.green(stream.game);
    return [channel, game, viewers];
}

function selectStream(streams) {
    var deferred = Q.defer();
    view.selectItem(streams, "What do you want to watch?").then(function(item) {
        deferred.resolve(item);
    });
    return deferred.promise;
}

return module.exports;