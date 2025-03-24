require('dotenv').config();
const core = require('@actions/core');
const { getMergedPRs, writePRChanges } = require('./github');

// Main function
async function main() {
  try {
    // Get input parameters from Action
    const targetRepository = core.getInput('target_repository', { required: true });
    const daysToCheck = parseInt(core.getInput('days_to_check') || '1', 10);
    const outputFile = core.getInput('output_file', { required: true });
    const outputFormat = core.getInput('output_format') || 'markdown';

    // Validate inputs
    if (!targetRepository.includes('/')) {
      throw new Error('Invalid target_repository format. It should be "owner/repo"');
    }

    const [owner, repo] = targetRepository.split('/');

    console.log(`Checking repository ${owner}/${repo} for merged PRs in the last ${daysToCheck} day(s)...`);

    // Get merged PRs
    const mergedPRs = await getMergedPRs(owner, repo, daysToCheck);
    console.log(`Found ${mergedPRs.length} merged PRs.`);

    // Write to output file
    const result = await writePRChanges(mergedPRs, targetRepository, outputFile, outputFormat);

    console.log(`Successfully wrote ${result.prCount} PRs to ${result.file} in ${result.format} format.`);

    // Set outputs for the action
    core.setOutput('pr_count', result.prCount);
    core.setOutput('output_file', result.file);
  } catch (error) {
    console.error('Error occurred:', error);
    core.setFailed(error.message);
  }
}

// Support for local execution and GitHub Actions
if (require.main === module) {
  // Parse command line arguments when run directly
  const args = process.argv.slice(2);
  const getArg = (flag) => {
    const index = args.indexOf(flag);
    return index !== -1 && index + 1 < args.length ? args[index + 1] : null;
  };

  // Set environment variables from command line for local testing
  if (getArg('--target-repository')) {
    process.env.INPUT_TARGET_REPOSITORY = getArg('--target-repository');
  }
  if (getArg('--days-to-check')) {
    process.env.INPUT_DAYS_TO_CHECK = getArg('--days-to-check');
  }
  if (getArg('--output-file')) {
    process.env.INPUT_OUTPUT_FILE = getArg('--output-file');
  }
  if (getArg('--output-format')) {
    process.env.INPUT_OUTPUT_FORMAT = getArg('--output-format');
  }

  // Mock core module for local execution
  if (!process.env.GITHUB_ACTIONS) {
    core.getInput = (name, options) => {
      const val = process.env[`INPUT_${name.replace(/-/g, '_').toUpperCase()}`];
      if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
      }
      return val || '';
    };
    core.setOutput = (name, value) => console.log(`Setting output ${name}=${value}`);
    core.setFailed = (message) => { console.error(`Action failed: ${message}`); process.exit(1); };
  }

  main();
}

module.exports = { main };
