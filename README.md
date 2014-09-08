web-client
===============

The angular web client for the POC openeyes API

###Dependencies:

Install Sass gem.

```
gem install sass --version 3.2.18
```

Install [Node](http://nodejs.org/download/)

###Install globally:

```
sudo npm install -g grunt-cli
sudo npm install -g bower
```

###Install (in the project root):

```
npm start
```

###Serving with grunt (from the project root)

```
grunt serve
```

This will launch the app at [http://localhost:9000](http://localhost:9000)

### Building for deployment

If you're not trying to serve the site locally, you can instead build a static version for distribution and deployment.

```
npm run deploy
```

This will install npm / bower dependencies and then create a *dist* folder which can be deployed.
