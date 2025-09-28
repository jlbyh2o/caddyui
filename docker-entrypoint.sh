#!/bin/sh
export PATH="/usr/local/bin:$PATH"
cd /usr/app
ls -l
npm run db:push
exec npm run start
