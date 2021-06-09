let core = require("@actions/core");
let slackMessageRelease = require("./slackMessageRelease.js");

try {
  await slackMessageRelease({
    githubRepository: process.env.GITHUB_REPOSITORY,
    version: core.getInput("version"),
    changelog: core.getInput("changelog"),
    githubRunId: process.env.GITHUB_RUN_ID,
    slackWebhookUrl: core.getInput("slack_webhook_url"),
  });
  console.log("Message successfully sent 💬");
} catch (err) {
  console.error("The following error occured");
  console.error(err);
  process.exit(1);
}
