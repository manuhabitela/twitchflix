# `twitchflix`

`twitchflix` is a command-line application to look for popular streams from twitch and watch them instantly thanks to [livestreamer](http://docs.livestreamer.io/).

This was made to be able to watch twitch streams from a raspberry pi in tty only via omxplayer. *Didn't test this on the raspberry pi yet*.


## Installation

`twitchflix` is a node cli app. After [installing node and npm](https://nodejs.org/), install twitchflix globally on your system:

```
sudo npm install -g twitchflix
```

## Usage

Start using twitchflix with the `twitchflix` command!

All the help you need is visible with `twitchflix --help`:

```
Search streams from twitch, watch them directly thanks to livestreamer.

Usage: twitchflix [OPTIONS] [-- LIVESTREAMER OPTIONS]

Options:
  -h, --help: show this message
  -v, --version: show twitchflix version
  -g, --game: show streams for given game only
              must be typed as shown on twich if no alias if available
  --aliases: show the list of games with an alias available
             an alias can be passed to the --game option instead of the full game name
  -l, --limit: limit the number of streams to choose from. Defaults to 25.

All params typed after -- are passed to livestreamer.
By default, the livestreamer `--default-stream best` option is passed.
Check out the livestreamer doc for more details on possible options.

Examples:
  `twitchflix --game "Mount Your Friends"` # list only mount your friends streams
  `twitchflix --game hots` # list Heroes of the Storm streams
  `twitchflix -- medium` # override default stream quality
  `twitchflix -- --player vlc` # list most popular streams & play the source stream in vlc
  `twitchflix -- -np 'omxplayer -o hdmi'` # play in omx with custom omx options
```

As twitchflix allows you to pass all the options you want to livestreamer without enforcing any defaults, or doesn't have any config file, it can be cumbersome to type the command. [Don't forget about aliases](http://raspberrypi.stackexchange.com/a/4285) :)
