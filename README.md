# Slack release message

<img src="./icon-rounded.png" width="128" height="128" alt="" />

> A GitHub Action to push a slack webhook

## Inputs

### version

The version you're releasing (e.g. v1.0.1, 1.0.1)

### changelog

_Optional_, the contents of your changelog file.

Each version needs to start with `## x.y.z`

### slack_webhook_url

Your slack webhook URL

## Example

```yaml
- name: Get changelog
  id: changelog
  shell: bash
  # trick for multiline variables
  run: |
    changelog=$(head -100 HISTORY.md)
    changelog="${changelog//'%'/'%25'}"
    changelog="${changelog//$'\n'/'%0A'}"
    changelog="${changelog//$'\r'/'%0D'}"
    echo "::set-output name=changelog::$changelog"

- name: Get version
  id: version
  run: echo "::set-output name=version::${GITHUB_REF#refs/tags/}"

- name: Notify on Slack
  uses: bloodyowl/slack-message-release-action@v1.1.5
  with:
    version: ${{ steps.version.outputs.version }}
    changelog: ${{ steps.changelog.outputs.changelog }}
    slack_webhook_url: ${{ secrets.SLACK_WEBHOOK_URL }}
```