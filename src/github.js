const { Octokit } = require('@octokit/rest');

// Initialize GitHub client
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

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

module.exports = { getImportantPRs };
