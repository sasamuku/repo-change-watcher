require('dotenv').config();
const fs = require('fs');
const yaml = require('js-yaml');
const { getImportantPRs, createNotificationIssue, createChangelogPR } = require('./github');

// Main function
async function main() {
  try {
    // Load repo list from YAML
    const reposYaml = fs.readFileSync('./config/repos.yaml', 'utf8');
    const repoList = yaml.load(reposYaml);

    // Load keywords configuration
    const keywordsConfig = JSON.parse(fs.readFileSync('./config/keywords.json', 'utf8'));
    const importantKeywords = keywordsConfig.keywords || [];

    console.log(`Checking ${repoList.length} repositories for important PRs...`);

    // Get important PRs from all repositories
    const allImportantPRs = [];

    for (const repo of repoList) {
      const [owner, repoName] = repo.split('/');
      console.log(`Checking ${owner}/${repoName}...`);

      const importantPRs = await getImportantPRs(owner, repoName, importantKeywords);
      allImportantPRs.push(...importantPRs.map(pr => ({
        ...pr,
        repo: `${owner}/${repoName}`
      })));
    }

    console.log(`Found ${allImportantPRs.length} important PRs.`);

    // Create notification if there are important PRs
    if (allImportantPRs.length > 0) {
      // Create a notification issue
      const issue = await createNotificationIssue(allImportantPRs);
      console.log(`Notification issue created: #${issue.data.number}`);

      // Create a changelog PR
      const pr = await createChangelogPR(allImportantPRs);
      console.log(`Changelog PR created: #${pr.data.number}`);
    } else {
      console.log('No important PRs found. No notification created.');
    }
  } catch (error) {
    console.error('Error occurred:', error);
    process.exit(1);
  }
}

// Run the main function
main();
