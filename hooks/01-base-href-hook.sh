#!/bin/bash

if [ -z "${DOCUMENT_ROOT}" ]; then
  DOCUMENT_ROOT='.';
fi

if [ -z "${BASE_HREF}" ]; then
  BASE_HREF='event';
fi

# Update bundles to be BASE_HREF aware
SED_SANITIZED_HREF=${BASE_HREF//\//\\/};
sed --in-place
  "s/BASE_HREF/${SED_SANITIZED_HREF}/" \
  ${DOCUMENT_ROOT}/BASE_HREF/index.html;

mkdir -p ${DOCUMENT_ROOT}/$(dirname ${BASE_HREF});
ln -sf ${DOCUMENT_ROOT}/BASE_HREF ${DOCUMENT_ROOT}/${BASE_HREF};