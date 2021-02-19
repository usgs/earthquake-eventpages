'use strict';

const fs = require('fs');
const version = require('./package.json').version;

const metadata = {
  branch: process.env.GIT_BRANCH_NAME || 'local/branchname',
  commit: process.env.GIT_COMMIT_SHA || null,
  image: process.env.DOCKER_IMAGE || 'local/earthquake-latest-earthquakes',
  version
};

fs.writeFileSync('metadata.json', JSON.stringify(metadata, null, 2) + '\n');

process.exit(0);
