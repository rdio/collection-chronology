h1. Chronological Collection

A simple example of how to use the Rdio API

h2. Forking instructions

1. Fork this repo on github and download it.

    $ git clone git@github.com:username/collection-chronology.git

2. Get a heroku account then make an app to push to.

    `heroku create collection-chronology-<person>`

3. Get an Rdio API key pair.

* Don't put your keys in your source! *

4. Copy env.sh.sample to env.sh for local testing and fill in:

    $ cp env.sh.sample env.sh
    $ vim env.sh

  Leave DOMAIN alone for local development, but set your RDIO_API_KEY and RDIO_API_SHARED_SECRET_KEY

    $ source env.sh

5. Add config variables to your app and push your code:

    $ heroku config:add DOMAIN=collection-chronology-person
    $ heroku config:add RDIO_API_KEY=<your key>
    $ heroku config:add RDIO_SHARED_SECRET_KEY=<your key>
    $ git push heroku master
