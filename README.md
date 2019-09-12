# Rattic React Frontend

A simple react-based frontend for the RatticDB password manager incl. search and credential caching.

![List](doc/img/list.png "Password List")

## Technologies

 * React
 * Webpack
 * Bootstrap
 * clipboard.js

## Development

The ``src/Globals.js`` file defines the URL that the application tries to connect to. During development, this is likely going to be blocked by the Same-Origin-Policy, so you need to start Chrome without web-security (you can do so by adding the following command line arguments ``--args --disable-web-security``).

To compile everything and run it locally you can use:
```
npm install

# connect to an actual rattic API (defined in src/Globals.js)
npm run prod

# use a fixture (src/service/MockedRatticService.js)
npm run dev
```

## Building

To build the app alone (results are in the ``dist`` folder):
```
npm install
npm install -g webpack@3.10.0
webpack -p --define MOCK_API=false
```

## Production Deployment

To deploy Rattic React, you need nothing but a web-server to serve the static assets. A deployment on a fresh Ubuntu 18.04 install with Apache httpd goes like this:
```
# install httpd
apt-get update
apt-get install -y apache2

# install nodejs & webpack
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
apt-get install -y nodejs
npm install -g npm

# clone rattic-react and run webpack
mkdir -p /opt && cd /opt
git clone https://github.com/rieder91/ratticReact.git
cd ratticReact
npm install
npm install -g webpack@3.10.0
# adapt src/Globals.js to point to point to your rattic instance
webpack -p --define MOCK_API=false

# symlink the files into /var/www to serve them with httpd
mkdir -p /var/www/html/rattic-react && cd /var/www/html/rattic-react
ln -s /opt/ratticReact/index.html .
ln -s /opt/ratticReact/img .
ln -s /opt/ratticReact/dist/* .

# point your browser to http://localhost/rattic-react
```