#!/bin/bash
# Bumps the patch version, builds, commits and pushes.
# Publishing to npm is done by the "Publish to npm" GitHub workflow
# (.github/workflows/publish.yml) so there is a single publish path.

set -e

# Read the current package.json version
current_version=$(node -p "require('./package.json').version")
echo "Current version: $current_version"

# Increment the version number
new_version=$(npm version --no-git-tag-version patch)
echo "New version: $new_version"

# Build the project
pnpm run build

# Commit the changes
git add .
git commit -m "new release $new_version"
git push origin "$(git branch --show-current)"

# Inform the user
echo "Version bumped to $new_version — trigger the 'Publish to npm' workflow to publish."
