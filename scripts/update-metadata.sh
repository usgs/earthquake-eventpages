#! /usr/bin/env sh

VERSION=$(git describe || echo 'unknown');
BRANCH=${CI_COMMIT_REF_SLUG:-"unknown"};
COMMIT=${CI_COMMIT_SHA:-"unknown"};

if [[ "${BRANCH}" == 'master' || "${BRANCH}" == 'production' ]]; then
  IMAGE="latest";
else
  IMAGE=${CI_COMMIT_REF_SLUG:-"unknown"};
fi

cat <<-EO_METADATA > metadata.json
{
  "version": "${VERSION}",
  "branch": "${BRANCH}",
  "commit": "${COMMIT}",
  "image": "${IMAGE}"
}
EO_METADATA
