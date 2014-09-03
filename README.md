web-client
===============

The angular web client for the POC openeyes API

###Dependencies:

Sass (`gem install sass --version 3.2.18`)
[Node / npm](http://nodejs.org/download/)

###Install globally:

`npm install -g grunt-cli`
`npm install -g bower`

###Install (in the project root):

`npm install`
`bower install`

###Serving with grunt (from the project root)

`grunt serve`

This will launch the app at [http://localhost:9000](http://localhost:9000)

### Building for deployment

If you're not trying to serve the site locally, you can instead build a static version for distribution and deployment. 

`grunt build` will create a `dist` folder which can be deployed.
