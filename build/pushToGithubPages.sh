#!/usr/bin/env bash

git checkout release_to_githubpages
git merge master
npm run build
git add .
git commit -m 'update demo'
git push
npm run doc
git checkout master
