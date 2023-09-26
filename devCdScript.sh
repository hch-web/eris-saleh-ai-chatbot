#!/bin/bash

cd /home/ubuntu/eris-ai-frontend;

git pull;

if [ $? -eq 0 ]; then
  echo 'git pull success.'
else
  echo 'git pull failure.'
  exit 1;
fi

npm run deploy

sudo rm /var/www/html/scripts/bundle.js

sudo cp /home/ubuntu/eris-ai-frontend/bundle/bundle.js /var/www/html/scripts
