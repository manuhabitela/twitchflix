var view = require('cli-view-utils');
var request = require('request');
var Q = require('q');

module.exports = function getUrlToStream(searchParams) {
    var deferred = Q.defer();
    searchStreams(searchParams)
        .then(listStreams)
        .then(selectStream)
        .then(deferred.resolve);
    return deferred.promise;
}

function searchStreams(searchParams) {
    var deferred = Q.defer();

    request({
        qs: normalizeSearchParams(searchParams),
        json: true,
        url: "https://api.twitch.tv/kraken/streams"
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
    var gameAliases = {
        'hots': 'Heroes of the Storm',
        'hs': 'Hearthstone: Heroes of Warcraft',
        'lol': 'League of Legends',
        'cs': 'Counter-Strike: Global Offensive',
        'dota': 'Dota 2'
    };
    if (searchParams.game && gameAliases[searchParams.game]) {
        params.game = gameAliases[searchParams.game];
    }
    return params;
}

function listStreams(streams) {
    view.renderList(streams, renderStreamLine);
    return streams;
}

function renderStreamLine(stream) {
    var channel = view.colors.yellow.bold(stream.channel.name);
    var viewers = view.colors.cyan(stream.viewers + ' viewers');
    var game = view.colors.green(stream.game);
    return [channel, viewers, game].join( view.colors.gray(" - ") );
}

function selectStream(streams) {
    var deferred = Q.defer();
    view.selectItem(streams, "What do you want to watch?").then(function(item) {
        deferred.resolve(item);
    });
    return deferred.promise;
}

return module.exports;