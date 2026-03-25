#!/usr/bin/env bash
set -euo pipefail

SERVER="u2719-p2xpqhoiu5fx@ssh.lomagundiconstructionservicesltd.co.uk"
PORT="18765"
KEY="$HOME/.ssh/lomagundi.pem"
REMOTE_PATH="~/www/lomagundiconstructionservicesltd.co.uk/public_html"
LOCAL_PATH="$(cd "$(dirname "$0")" && pwd)/out"

echo "▶ Building static export..."
npm run build

echo "▶ Clearing remote public_html (preserving .htaccess)..."
ssh -i "$KEY" -p "$PORT" "$SERVER" \
  "find $REMOTE_PATH -mindepth 1 ! -name '.htaccess' -delete"

echo "▶ Uploading out/ to $REMOTE_PATH ..."
scp -r -P "$PORT" -i "$KEY" "$LOCAL_PATH"/* "$SERVER":"$REMOTE_PATH"/

echo "▶ Copying contact.php to public_html..."
# contact.php is already inside out/ (copied from public/) — nothing extra needed

echo "✓ Deployed to lomagundiconstructionservicesltd.co.uk"
