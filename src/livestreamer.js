var spawn = require('child_process').spawn;
module.exports = {};

module.exports = function play(url, livestreamerArguments, opts) {
    var options = parseOptions(opts || {});
    livestreamerArguments.unshift(url);
    spawn(options.bin, livestreamerArguments, { stdio: 'inherit' });
};

function parseOptions(opts) {
    var options = {};
    options.bin = opts.bin || 'livestreamer';
    return options;
}
