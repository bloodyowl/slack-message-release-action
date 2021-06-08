# Slack release message

> A GitHub Action to push a slack webhook

## Inputs

### version

The version you're releasing (e.g. v1.0.1, 1.0.1)

### changelog

_Optional_, the contents of your changelog file.

Each version needs to start with `## x.y.z`'

### slack_webhook_url

Your slack webhook URL

## Example

```
uses: bloodyowl/slack-message-release-action@v1.0.0
with:
  version: ${GITHUB_REF#refs/tags/}
  changelog: ${cat HISTORY.md}
  slack_webhook_url: ${{ secrets.SLACK_WEBHOOK_URL }}
```