let core = require("@actions/core");
let slackMessageRelease = require("./slackMessageRelease.js");

slackMessageRelease({
  githubRepository: process.env.GITHUB_REPOSITORY,
  version: core.getInput("version"),
  environment: core.getInput("environment"),
  changelog: core.getInput("changelog"),
  githubRunId: process.env.GITHUB_RUN_ID,
  slackWebhookUrl: core.getInput("slack_webhook_url"),
}).then(
  () => {
    console.log("Message successfully sent 💬");
  },
  (err) => {
    console.error("The following error occured");
    console.error(err);
    process.exit(1);
  }
);
