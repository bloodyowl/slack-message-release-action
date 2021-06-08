let { IncomingWebhook } = require("@slack/webhook");

let webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);

let [org, repository] = process.env.GITHUB_REPOSITORY.split("/");
let version = core.getInput("version");
let changelog = core.getInput("changelog");

function getChangelogForVersion(changelog, version) {
  if (!changelog) {
    return "No changelog provided";
  }
  version = version.startsWith("v") ? version.slice(1) : version;
  let startText = `## ${version}\n`;
  let start = changelog.indexOf(startText);
  if (start == -1) {
    return "No changelog found";
  }
  let end = changelog.indexOf("\n##", start + startText.length);
  return changelog.slice(start + startText.length, end - start).trim();
}

let formattedChangelog = getChangelogForVersion(changelog, version)
  .split("\n")
  .map((item) => `> ${item}`)
  .join("\n");

await webhook.send({
  text: `${repository} ${version} has been [released](https://github.com/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}) ✨

${formattedChangelog}`,
});
