var spawn = require('child_process').spawn;
module.exports = {};

module.exports = function play(url, streamlinkArguments, opts) {
    var options = parseOptions(opts || {});
    streamlinkArguments.unshift(url);
    spawn(options.bin, streamlinkArguments, { stdio: 'inherit' });
};

function parseOptions(opts) {
    var options = {};
    options.bin = opts.bin || 'streamlink';
    return options;
}
