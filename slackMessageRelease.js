let { IncomingWebhook } = require("@slack/webhook");

async function slackMessageRelease({
  githubRepository,
  githubRunId,
  version,
  changelog,
  slackWebhookUrl,
}) {
  let webhook = new IncomingWebhook(slackWebhookUrl);

  let [org, repository] = githubRepository.split("/");

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

  await webhook.send({
    mrkdwn: true,
    text: `*${repository} ${version}* has been <https://github.com/${githubRepository}/actions/runs/${githubRunId}|released> ✨
${getChangelogForVersion(changelog, version)
  .split("\n")
  .map((x) => `> ${x.replace(/^-/, "•")}`)
  .join("\n")}
`,
  });
}

module.exports = slackMessageRelease;
