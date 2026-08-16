#!/bin/bash
# Release helper.
#
# Usage:
#   sh .scripts/release.sh [patch|minor|major] [--publish]
#
# Locally: bumps the version, builds, commits and pushes the current
# branch. Add --publish to also publish to npm (used by the
# "Publish to npm" GitHub workflow — see .github/workflows/publish.yml).
#
# The version bump is published BEFORE the commit/push, so a failed
# publish does not leave a bumped version on the remote.

set -e

bump_type="${1:-patch}"
publish=""
[ "$2" = "--publish" ] && publish=1

# Read the current package.json version
current_version=$(node -p "require('./package.json').version")
echo "Current version: $current_version"

# Increment the version number
new_version=$(npm version --no-git-tag-version "$bump_type")
echo "New version: $new_version"

# Build the project
pnpm run build

# Publish (CI only)
if [ -n "$publish" ]; then
  pnpm publish --provenance --access public --no-git-checks
fi

# Commit and push the version bump
git add .
git commit -m "new release $new_version"
git push origin "$(git branch --show-current)"

# Inform the user
echo "Released $new_version"
