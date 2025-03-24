const { Octokit } = require('@octokit/rest');

// Initialize GitHub client
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

// Repository owner and name for creating issues/PRs
const REPO_OWNER = process.env.GITHUB_REPOSITORY_OWNER;
const REPO_NAME = process.env.GITHUB_REPOSITORY_NAME;

/**
 * Get PRs that were closed and merged the previous day
 * @param {string} owner - Repository owner
 * @param {string} repo - Repository name
 * @param {string[]} importantKeywords - Keywords to identify important PRs
 * @returns {Array} Array of important PRs
 */
async function getImportantPRs(owner, repo, importantKeywords) {
  // Calculate yesterday's date range in ISO format
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Set to start of day
  yesterday.setHours(0, 0, 0, 0);
  const yesterdayStart = yesterday.toISOString();

  // Set to end of day
  yesterday.setHours(23, 59, 59, 999);
  const yesterdayEnd = yesterday.toISOString();

  // Get PRs merged yesterday
  const { data: prs } = await octokit.pulls.list({
    owner,
    repo,
    state: 'closed',
    sort: 'updated',
    direction: 'desc',
    per_page: 100
  });

  // Filter PRs that were merged yesterday
  const mergedYesterday = prs.filter(pr => {
    const mergedAt = pr.merged_at ? new Date(pr.merged_at) : null;
    return pr.merged && mergedAt
      && mergedAt >= new Date(yesterdayStart)
      && mergedAt <= new Date(yesterdayEnd);
  });

  // Filter important PRs based on keywords
  const importantPRs = mergedYesterday.filter(pr => {
    const titleLower = pr.title.toLowerCase();
    const bodyLower = pr.body ? pr.body.toLowerCase() : '';

    return importantKeywords.some(keyword =>
      titleLower.includes(keyword.toLowerCase()) ||
      bodyLower.includes(keyword.toLowerCase())
    );
  });

  return importantPRs.map(pr => ({
    number: pr.number,
    title: pr.title,
    url: pr.html_url,
    author: pr.user.login,
    mergedAt: pr.merged_at
  }));
}

/**
 * Create an issue with important PRs information
 * @param {Array} importantPRs - List of important PRs to notify
 * @returns {Promise} GitHub API response
 */
async function createNotificationIssue(importantPRs) {
  const date = new Date();
  const formattedDate = date.toISOString().split('T')[0];

  // Build issue body
  let issueBody = '## Important PRs merged yesterday\n\n';

  for (const pr of importantPRs) {
    issueBody += `- **${pr.repo}**: [PR #${pr.number}: ${pr.title}](${pr.url}) (by @${pr.author})\n`;
  }

  // Add summary information
  issueBody += `\n\n---\n*This issue was automatically generated on ${formattedDate}*`;

  // Create issue
  const issue = await octokit.issues.create({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    title: `Important PR Notification: ${formattedDate}`,
    body: issueBody,
    labels: ['notification', 'important-changes']
  });

  return issue;
}

/**
 * Create a PR that updates the changelog with important PRs
 * @param {Array} importantPRs - List of important PRs to add to changelog
 * @returns {Promise} GitHub API response
 */
async function createChangelogPR(importantPRs) {
  const date = new Date();
  const formattedDate = date.toISOString().split('T')[0];
  const branchName = `changelog-update-${formattedDate}`;

  // Get the current reference to create a new branch
  const reference = await octokit.git.getRef({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    ref: 'heads/main'
  });

  // Create a new branch
  await octokit.git.createRef({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    ref: `refs/heads/${branchName}`,
    sha: reference.data.object.sha
  });

  // Build changelog content
  let changelogContent = `# ${formattedDate}\n\n`;

  for (const pr of importantPRs) {
    changelogContent += `- **${pr.repo}**: [PR #${pr.number}: ${pr.title}](${pr.url}) (by @${pr.author})\n`;
  }

  changelogContent += '\n\n';

  // Get existing changelog
  let existingContent = '';
  try {
    const content = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: 'CHANGELOG.md'
    });

    existingContent = Buffer.from(content.data.content, 'base64').toString();
  } catch (error) {
    // File doesn't exist yet, that's ok
  }

  // Update the changelog file
  await octokit.repos.createOrUpdateFileContents({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    path: 'CHANGELOG.md',
    message: `Update changelog for ${formattedDate}`,
    content: Buffer.from(changelogContent + existingContent).toString('base64'),
    branch: branchName
  });

  // Create PR
  const pr = await octokit.pulls.create({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    title: `Update: Important changes for ${formattedDate}`,
    body: 'Updated changelog with important PRs. Please review and merge to keep the history of changes.',
    head: branchName,
    base: 'main'
  });

  return pr;
}

module.exports = { getImportantPRs, createNotificationIssue, createChangelogPR };
