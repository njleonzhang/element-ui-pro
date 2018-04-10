set -e

if [[ -z $1 ]]; then
  echo "Enter new version: "
  read VERSION
else
  VERSION=$1
fi

read -p "Releasing $VERSION - are you sure? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "Releasing $VERSION ..."

  # stash
  has_stash=false
  if [[ `git status --porcelain` ]]; then
    git stash
    has_stash=true
  fi

  # build
  VERSION=$VERSION npm run build

  # commit
  git add -f \
    dist/*
  git commit -m "build: build $VERSION"
  npm version $VERSION --message "build: release $VERSION"

  # push
  git push origin refs/tags/v$VERSION
  git push

  # stash pop
  if [ "$has_stash" = true ]; then
    git stash pop
  fi
fi
