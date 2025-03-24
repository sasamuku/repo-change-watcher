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

  // Improved command line argument parser
  const getArg = (flag) => {
    // Check for --key=value format
    const keyValueArg = args.find(arg => arg.startsWith(`${flag}=`));
    if (keyValueArg) {
      return keyValueArg.split('=')[1];
    }

    // Check for --key value format
    const index = args.indexOf(flag);
    if (index !== -1 && index + 1 < args.length) {
      return args[index + 1];
    }

    return null;
  };

  // Get command line arguments
  const cliArgs = {
    targetRepository: getArg('--target-repository'),
    daysToCheck: getArg('--days-to-check'),
    outputFile: getArg('--output-file'),
    outputFormat: getArg('--output-format')
  };

  // Backup values loaded from .env file
  const envBackup = {
    targetRepository: process.env.INPUT_TARGET_REPOSITORY,
    daysToCheck: process.env.INPUT_DAYS_TO_CHECK,
    outputFile: process.env.INPUT_OUTPUT_FILE,
    outputFormat: process.env.INPUT_OUTPUT_FORMAT
  };

  // Prioritize command line arguments over .env values
  if (cliArgs.targetRepository) process.env.INPUT_TARGET_REPOSITORY = cliArgs.targetRepository;
  if (cliArgs.daysToCheck) process.env.INPUT_DAYS_TO_CHECK = cliArgs.daysToCheck;
  if (cliArgs.outputFile) process.env.INPUT_OUTPUT_FILE = cliArgs.outputFile;
  if (cliArgs.outputFormat) process.env.INPUT_OUTPUT_FORMAT = cliArgs.outputFormat;

  // Debug output for used parameters
  if (!process.env.GITHUB_ACTIONS) {
    console.log('Configuration:');
    // Clearly show the source of each parameter
    console.log(`- Repository: ${process.env.INPUT_TARGET_REPOSITORY}${
      cliArgs.targetRepository ? ' (from CLI)' :
      envBackup.targetRepository ? ' (from .env file)' : ' (not set)'
    }`);
    console.log(`- Days to check: ${process.env.INPUT_DAYS_TO_CHECK || '1'}${
      cliArgs.daysToCheck ? ' (from CLI)' :
      envBackup.daysToCheck ? ' (from .env file)' : ' (default)'
    }`);
    console.log(`- Output file: ${process.env.INPUT_OUTPUT_FILE}${
      cliArgs.outputFile ? ' (from CLI)' :
      envBackup.outputFile ? ' (from .env file)' : ' (not set)'
    }`);
    console.log(`- Output format: ${process.env.INPUT_OUTPUT_FORMAT || 'markdown'}${
      cliArgs.outputFormat ? ' (from CLI)' :
      envBackup.outputFormat ? ' (from .env file)' : ' (default)'
    }`);
    console.log('---');
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
