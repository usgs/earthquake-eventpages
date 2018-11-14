#!/bin/bash

DOCUMENT_ROOT="${DOCUMENT_ROOT:-.}";
EVENT_TYPE="${EVENT_TYPE:-earthquake}";

if [ "${EVENT_TYPE}" == 'scenario' ]; then
  sed --in-place \
    "s/scenario:false/scenario:true/" \ 
    ${DOCUMENT_ROOT}/BASE_HREF/main.*.js
fi

