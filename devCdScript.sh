#!/bin/bash

cd /home/ubuntu/eris-ai-frontend;

git pull;

if [ $? -eq 0 ]; then
  echo 'git pull success.'
else
  echo 'git pull failure.'
  exit 1;
fi

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

nvm install v18.18.0

nvm use v18.18.0

npm run deploy

sudo rm /var/www/html/scripts/bundle.js

sudo cp /home/ubuntu/eris-ai-frontend/bundle/bundle.js /var/www/html/scripts
