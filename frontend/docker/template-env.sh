#!/usr/bin/env bash

## NOTE: this file is sent to the client. It should not contain any sensitive values
cat << EOF > /usr/share/nginx/html/runtime-env.js
window.ENV = {
  NODE_ENV: '${NODE_ENV:-DEVELOPMENT}',
  API_URL: '${API_URL:-http://localhost:3000/api}',
};
EOF
