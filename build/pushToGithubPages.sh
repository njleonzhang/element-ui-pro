#!/usr/bin/env bash

git checkout release_to_githubpages
git merge master
npm run build
npm run doc
git checkout master
