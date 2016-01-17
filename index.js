var minimist = require('minimist');
var getStream = require('./src/twitch.js');

var args = normalizeArgs();

if (args.version) {
    return view.renderMessage(version());
}

if (args.help) {
    return view.renderMessage(help());
}

return start(args);

function version() {
    return "twitchflix version " + require('./package.json').version;
}

function help() {
    return [].join('\n');
}

function start(options) {
    getStream(options).then(function(url) {
        console.log(url);
    });
}

function normalizeArgs() {
    var args = minimist(process.argv.slice(2), {
        alias: { l: 'limit', g: 'game', o: 'offset', c: 'channel' },
        '--': true
    });
    return args;
}