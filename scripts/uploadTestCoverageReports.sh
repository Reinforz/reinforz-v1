#!/usr/bin/env bash

codecov_file="${GITHUB_WORKSPACE}/scripts/codecov.sh"

curl -s https://codecov.io/bash > $codecov_file
chmod +x $codecov_file

cd "${GITHUB_WORKSPACE}/packages";

file="${GITHUB_WORKSPACE}/coverage/lcov.info"
$codecov_file -t $CODECOV_TOKEN -f $file -v