var view = require('cli-view-utils');
var minimist = require('minimist');

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
}

function normalizeArgs() {
    var args = minimist(process.argv.slice(2), {
        alias: { c: 'count', g: 'game' },
        default: { count: 20 },
        '--': true
    });
    return args;
}