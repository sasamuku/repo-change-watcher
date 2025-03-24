const { Octokit } = require('@octokit/rest');

// Initialize GitHub client
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

/**
 * Get PRs that were closed and merged within the specified days
 * @param {string} owner - Repository owner
 * @param {string} repo - Repository name
 * @param {number} daysToCheck - Number of days to look back
 * @returns {Array} Array of merged PRs
 */
async function getMergedPRs(owner, repo, daysToCheck = 1) {
  // Calculate date range in ISO format
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - daysToCheck);

  // Set to start of day
  startDate.setHours(0, 0, 0, 0);
  const startDateISO = startDate.toISOString();

  // Set end date to now
  const endDateISO = today.toISOString();

  console.log(`Checking PRs merged between ${startDateISO} and ${endDateISO}`);

  // Get PRs merged in the date range
  const { data: prs } = await octokit.pulls.list({
    owner,
    repo,
    state: 'closed',
    sort: 'updated',
    direction: 'desc',
    per_page: 100
  });

  // Filter PRs that were merged in the specified date range
  const mergedPRs = prs.filter(pr => {
    const mergedAt = pr.merged_at ? new Date(pr.merged_at) : null;
    return pr.merged && mergedAt
      && mergedAt >= new Date(startDateISO)
      && mergedAt <= new Date(endDateISO);
  });

  return mergedPRs.map(pr => ({
    number: pr.number,
    title: pr.title,
    url: pr.html_url,
    author: pr.user.login,
    mergedAt: pr.merged_at
  }));
}

/**
 * Generate markdown formatted content with merged PRs
 * @param {Array} mergedPRs - List of merged PRs
 * @param {string} repository - Repository in owner/repo format
 * @returns {string} Markdown formatted content
 */
function generateMarkdownContent(mergedPRs, repository) {
  const [owner, repo] = repository.split('/');
  const date = new Date();
  const formattedDate = date.toISOString().split('T')[0];

  let content = `# PR Change History (${formattedDate})\n\n`;

  if (mergedPRs.length === 0) {
    content += 'No PRs were merged during the specified timeframe.\n';
    return content;
  }

  for (const pr of mergedPRs) {
    content += `- [#${pr.number}](https://github.com/${owner}/${repo}/pull/${pr.number}) ${pr.title} (@${pr.author})\n`;
  }

  return content;
}

/**
 * Generate JSON formatted content with merged PRs
 * @param {Array} mergedPRs - List of merged PRs
 * @param {string} repository - Repository in owner/repo format
 * @returns {string} JSON formatted content
 */
function generateJsonContent(mergedPRs, repository) {
  const date = new Date();
  const formattedDate = date.toISOString().split('T')[0];

  const jsonData = {
    date: formattedDate,
    repository: repository,
    pull_requests: mergedPRs
  };

  return JSON.stringify(jsonData, null, 2);
}

/**
 * Generate YAML formatted content with merged PRs
 * @param {Array} mergedPRs - List of merged PRs
 * @param {string} repository - Repository in owner/repo format
 * @returns {string} YAML formatted content
 */
function generateYamlContent(mergedPRs, repository) {
  const yaml = require('js-yaml');
  const date = new Date();
  const formattedDate = date.toISOString().split('T')[0];

  const yamlData = {
    date: formattedDate,
    repository: repository,
    pull_requests: mergedPRs
  };

  return yaml.dump(yamlData);
}

/**
 * Write PR changes to file
 * @param {Array} mergedPRs - List of merged PRs
 * @param {string} repository - Repository in owner/repo format
 * @param {string} outputFile - Path to output file
 * @param {string} format - Output format (markdown, json, yaml)
 * @returns {Promise} Write operation result
 */
async function writePRChanges(mergedPRs, repository, outputFile, format = 'markdown') {
  const fs = require('fs').promises;
  const path = require('path');

  let content;

  switch (format.toLowerCase()) {
    case 'json':
      content = generateJsonContent(mergedPRs, repository);
      break;
    case 'yaml':
      content = generateYamlContent(mergedPRs, repository);
      break;
    case 'markdown':
    default:
      content = generateMarkdownContent(mergedPRs, repository);
      break;
  }

  // Create directory if it doesn't exist
  const dir = path.dirname(outputFile);
  await fs.mkdir(dir, { recursive: true });

  // Write to file
  await fs.writeFile(outputFile, content);

  return {
    file: outputFile,
    format: format,
    prCount: mergedPRs.length
  };
}

module.exports = { getMergedPRs, writePRChanges };
