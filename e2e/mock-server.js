const express = require('express');
const fs = require('fs');
const ngApimock = require('ng-apimock');
const path = require('path');


// Register all available mocks and generate interface
ngApimock().run({
  "src": "e2e/mocks",
  "outputDir": ".tmp/ngApimock",
  "done": function() {}
});


const app = express();
// process the api calls through ng-apimock
app.use(require('ng-apimock/lib/utils').ngApimockRequest);
// serve the mocking interface for local development
app.use('/mocking', express.static('.tmp/ngApimock'));


const mockSocket = '.tmp/ngApimock.sock';
if (fs.existsSync(mockSocket)) {
  fs.unlinkSync(mockSocket);
}
app.listen(mockSocket, function() {
 console.log('ngApimock running on ' + mockSocket);
});
