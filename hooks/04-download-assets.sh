#!/bin/bash -e

##
# Global configuration for downloader
##

# Host to make requests against
ASSET_HOSTNAME="${ASSET_HOSTNAME:-localhost}";
# Base path where assets live on host
BASE_HREF="${BASE_HREF:-event}";
# File containing list of assets to download
OLD_ASSETS="${OLD_ASSETS:-/old_assets.txt}";
# Directory where to store old assets
OUTPUT_DIR="${OUTPUT_DIR:-/usr/share/nginx/html/BASE_HREF/previous}";


##
# Helper functions
##

##
# Downloads a file from the ASSET_HOSTNAME and stores it in the OUTPUT_DIR
# with the same name as the original file.
#
# @param $1 {String}
#      File name to download
##
downloadAsset () {
  local asset=$1;
  local url="http://${ASSET_HOSTNAME}/${BASE_HREF}/${asset}";
  local output="${OUTPUT_DIR}/${asset}";

  set +e;
  curl -o ${output} ${url};
  if [ $? -ne 0 ]; then
    echo "Failed downloading asset '${asset}'" >&2;
  fi
  set -e
}


##
# Main body of script
##

mkdir -p ${OUTPUT_DIR};

if [ -f ${OLD_ASSETS} ]
  while IFS='' read -r asset || [[ -n "${asset}" ]]; do
    if [ "${asset:0:1}" != "#" ]; then
      downloadAsset "${asset}";
    fi
  done < ${OLD_ASSETS};
fi