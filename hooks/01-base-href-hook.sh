#!/bin/bash

if [ -z $BASE_HREF ]; then
  BASE_HREF='event';
fi

# Update bundles to be BASE_HREF aware
SED_SANITIZED_HREF=${BASE_HREF//\//\\/};
sed "s/BASE_HREF/${SED_SANITIZED_HREF}/" \
  ${DOCUMENT_ROOT}/BASE_HREF/index.html \
  > ${DOCUMENT_ROOT}/BASE_HREF/index-base-href.html;

mv ${DOCUMENT_ROOT}/BASE_HREF/index-base-href.html \
  ${DOCUMENT_ROOT}/BASE_HREF/index.html

mkdir -p ${DOCUMENT_ROOT}/$(dirname ${BASE_HREF});
ln -sf ${DOCUMENT_ROOT}/BASE_HREF ${DOCUMENT_ROOT}/${BASE_HREF};