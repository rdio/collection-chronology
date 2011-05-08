# Chronological Collection

A simple example of how to use the Rdio API.

## Getting Started

Fork this repo on github and download it.

            $ git clone git@github.com:username/collection-chronology.git

Get a heroku account then make an app to push to.

            $ heroku create

Get an Rdio API key pair.

   *Don't put your keys in your source!*

Copy env.sh.sample to env.sh for local testing and fill in your API keys.

            $ cp env.sh.sample env.sh
            $ vim env.sh

Install the required ruby gems

            $ gem install bundler
            $ bundle

Leave DOMAIN alone for local development, but set your RDIO_API_KEY and RDIO_API_SHARED_SECRET_KEY. Now source the file for local testing.

            $ source env.sh
            $ bundle exec thin start

Your site will be at http://localhost:3000/. Music playback will not work! You'll need to push the code to the public internet to enable music playback.

Add config variables to your app and push your code live:

            $ heroku config:add DOMAIN=<your heroku app name>
            $ heroku config:add RDIO_API_KEY=<your key>
            $ heroku config:add RDIO_SHARED_SECRET_KEY=<your key>
            $ git push heroku master

