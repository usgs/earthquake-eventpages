const express = require('express');
const fs = require('fs');
const ngApimock = require('ng-apimock');
const path = require('path');


// Register all available mocks and generate interface
ngApimock().run({
  src: 'e2e/mocks',
  outputDir: '.tmp/ngApimock',
  done: () => {}
});


const app = express();
// process the api calls through ng-apimock
app.use(require('ng-apimock/lib/utils').ngApimockRequest);
// serve the mocking interface for local development
app.use('/mocking', express.static('.tmp/ngApimock'));


if (fs.existsSync('.tmp/ngApimock.sock')) {
  fs.unlinkSync('.tmp/ngApimock.sock');
}
app.listen(mockSocket, () => {
 process.stdout.write('ngApimock running on .tmp/ngApimock.sock\n');
});
