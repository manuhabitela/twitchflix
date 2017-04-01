var view = require('cli-view-utils');
var minimist = require('minimist');
var twitch = require('./src/twitch.js');
var playStream = require('./src/streamlink.js');

var args = normalizeArgs();

if (args.version) {
    return view.renderMessage(version());
}

if (args.help) {
    return view.renderMessage(help());
}

if (args.aliases) {
    return twitch.gameAliases();
}

return start(args);

function version() {
    return "twitchflix version " + require('./package.json').version;
}

function help() {
    return [
        'Search streams from twitch, watch them directly thanks to streamlink.',
        '',
        'Usage: twitchflix [OPTIONS] [-- STREAMLINK OPTIONS]',
        '',
        'Options:',
        '  -h, --help: show this message',
        '  -v, --version: show twitchflix version',
        '  -g, --game: show streams for given game only',
        '              must be typed as shown on twich if no alias if available',
        '  --aliases: show the list of games with an alias available',
        '             an alias can be passed to the --game option instead of the full game name',
        '  -l, --limit: limit the number of streams to choose from. Defaults to 25.',
        '',
        'All params typed after -- are passed to streamlink.',
        'By default, the streamlink `--default-stream best` option is passed.',
        'Check out the streamlink doc for more details on possible options.',
        '',
        'Examples:',
        '  `twitchflix --game "Mount Your Friends"` # list only mount your friends streams',
        '  `twitchflix --game hots` # list Heroes of the Storm streams',
        '  `twitchflix -- medium` # override default stream quality',
        '  `twitchflix -- --player vlc` # list most popular streams & play the source stream in vlc',
        '  `twitchflix -- -np \'omxplayer -o hdmi\'` # play in omx with custom omx options',
    ].join('\n');
}

function start(options) {
    twitch.getUrlToStream(options).then(function(url) {
        playStream(url, options.streamlink);
    });
}

function normalizeArgs() {
    var args = minimist(process.argv.slice(2), {
        alias: { h: 'help', v: 'version', l: 'limit', g: 'game', o: 'offset', c: 'channel' },
        '--': true
    });
    args.streamlink = args['--'];
    if (args.streamlink.indexOf('--default-stream') === -1) {
        args.streamlink.push('--default-stream', 'best');
    }
    return args;
}