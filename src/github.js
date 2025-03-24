const { Octokit } = require('@octokit/rest');
const fs = require('fs').promises;
const path = require('path');

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

    return mergedAt
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
 * Check if a file exists
 * @param {string} filePath - Path to check
 * @returns {Promise<boolean>} Whether file exists
 */
async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Extract existing PR IDs from content to avoid duplicates
 * @param {string} content - File content
 * @param {string} format - File format
 * @returns {Set} Set of PR IDs
 */
function extractExistingPRIds(content, format) {
  const prIds = new Set();

  if (!content.trim()) {
    return prIds;
  }

  switch (format.toLowerCase()) {
    case 'json': {
      try {
        const json = JSON.parse(content);

        // Handle new format with pr_history
        if (json.pr_history) {
          Object.values(json.pr_history).forEach(prs => {
            prs.forEach(pr => {
              if (pr.number) prIds.add(pr.number);
            });
          });
        }
        // Handle old format with pull_requests array
        else if (json.pull_requests && Array.isArray(json.pull_requests)) {
          json.pull_requests.forEach(pr => {
            if (pr.number) prIds.add(pr.number);
          });
        }
      } catch (e) {
        console.error('Error parsing JSON file:', e);
      }
      break;
    }
    case 'yaml': {
      try {
        const yaml = require('js-yaml');
        const data = yaml.load(content);

        // Handle new format with pr_history
        if (data.pr_history) {
          Object.values(data.pr_history).forEach(prs => {
            prs.forEach(pr => {
              if (pr.number) prIds.add(pr.number);
            });
          });
        }
        // Handle old format with pull_requests array
        else if (data.pull_requests && Array.isArray(data.pull_requests)) {
          data.pull_requests.forEach(pr => {
            if (pr.number) prIds.add(pr.number);
          });
        }
      } catch (e) {
        console.error('Error parsing YAML file:', e);
      }
      break;
    }
    case 'markdown':
    default: {
      // Extract PR numbers from markdown links
      const prMatches = content.matchAll(/\[#(\d+)\]/g);
      for (const match of prMatches) {
        prIds.add(parseInt(match[1], 10));
      }
      break;
    }
  }

  return prIds;
}

/**
 * Generate markdown formatted content with merged PRs grouped by date
 * @param {Object} prsByDate - PRs grouped by date
 * @param {string} repository - Repository in owner/repo format
 * @returns {string} Markdown formatted content
 */
function generateGroupedMarkdownContent(prsByDate, repository) {
  const [owner, repo] = repository.split('/');
  const date = new Date();
  const formattedDate = date.toISOString().split('T')[0];

  let content = `# PR Change History (${formattedDate})\n\n`;

  // Check if there are any PRs at all
  const totalPRs = Object.values(prsByDate).reduce((sum, prs) => sum + prs.length, 0);
  if (totalPRs === 0) {
    content += 'No PRs were merged during the specified timeframe.\n';
    return content;
  }

  // Sort dates in descending order
  const dates = Object.keys(prsByDate).sort().reverse();

  for (const date of dates) {
    // Add date header
    content += `## ${date}\n\n`;

    // Add PRs for this date
    for (const pr of prsByDate[date]) {
      content += `- [#${pr.number}](https://github.com/${owner}/${repo}/pull/${pr.number}) ${pr.title} (@${pr.author})\n`;
    }
    content += '\n';
  }

  return content;
}

/**
 * Generate JSON formatted content with merged PRs grouped by date
 * @param {Object} prsByDate - PRs grouped by date
 * @param {string} repository - Repository in owner/repo format
 * @returns {Object} JSON data
 */
function generateGroupedJsonData(prsByDate, repository) {
  const date = new Date();
  const formattedDate = date.toISOString().split('T')[0];

  return {
    repository: repository,
    created_at: formattedDate,
    last_updated: formattedDate,
    pr_history: prsByDate
  };
}

/**
 * Generate YAML formatted content with merged PRs grouped by date
 * @param {Object} prsByDate - PRs grouped by date
 * @param {string} repository - Repository in owner/repo format
 * @returns {Object} YAML data
 */
function generateGroupedYamlData(prsByDate, repository) {
  const date = new Date();
  const formattedDate = date.toISOString().split('T')[0];

  return {
    repository: repository,
    created_at: formattedDate,
    last_updated: formattedDate,
    pr_history: prsByDate
  };
}

/**
 * Write PR changes to file, appending to existing content with daily grouping
 * @param {Array} mergedPRs - List of merged PRs
 * @param {string} repository - Repository in owner/repo format
 * @param {string} outputFile - Path to output file
 * @param {string} format - Output format (markdown, json, yaml)
 * @returns {Promise} Write operation result
 */
async function writePRChanges(mergedPRs, repository, outputFile, format = 'markdown') {
  // Create directory if it doesn't exist
  const dir = path.dirname(outputFile);
  await fs.mkdir(dir, { recursive: true });

  // Check if file exists and read contents
  let existingContent = '';
  let existingPRIds = new Set();

  const fileExistsFlag = await fileExists(outputFile);
  if (fileExistsFlag) {
    existingContent = await fs.readFile(outputFile, 'utf8');
    existingPRIds = extractExistingPRIds(existingContent, format);
  }

  // Filter out PRs that have already been recorded
  const newPRs = mergedPRs.filter(pr => !existingPRIds.has(pr.number));

  if (newPRs.length === 0) {
    console.log('No new PRs to add to the file.');
    return {
      file: outputFile,
      format: format,
      prCount: 0
    };
  }

  // Group new PRs by date
  const prsByDate = {};
  newPRs.forEach(pr => {
    const prDate = new Date(pr.mergedAt).toISOString().split('T')[0];
    if (!prsByDate[prDate]) {
      prsByDate[prDate] = [];
    }
    prsByDate[prDate].push(pr);
  });

  // Create the content
  let content;
  const date = new Date();
  const formattedDate = date.toISOString().split('T')[0];

  switch (format.toLowerCase()) {
    case 'json': {
      let jsonData;

      if (existingContent) {
        try {
          // Parse existing JSON
          jsonData = JSON.parse(existingContent);

          // Group PRs by date
          if (!jsonData.pr_history) {
            // Convert old format to new format if needed
            jsonData = {
              repository: jsonData.repository || repository,
              last_updated: formattedDate,
              pr_history: {}
            };

            // Move any existing PRs to their dates
            if (jsonData.pull_requests) {
              jsonData.pull_requests.forEach(pr => {
                const prDate = new Date(pr.mergedAt).toISOString().split('T')[0];
                if (!jsonData.pr_history[prDate]) {
                  jsonData.pr_history[prDate] = [];
                }
                jsonData.pr_history[prDate].push(pr);
              });
              delete jsonData.pull_requests;
            }
          }

          // Add new PRs to their respective dates
          Object.entries(prsByDate).forEach(([date, prs]) => {
            if (!jsonData.pr_history[date]) {
              jsonData.pr_history[date] = [];
            }
            jsonData.pr_history[date] = [...prs, ...jsonData.pr_history[date]];
          });

          // Update date
          jsonData.last_updated = formattedDate;
        } catch (e) {
          console.error('Error parsing existing JSON. Creating new file.', e);
          // Create a new JSON structure with dates as keys
          jsonData = generateGroupedJsonData(prsByDate, repository);
        }
      } else {
        // Create new JSON content with date-based structure
        jsonData = generateGroupedJsonData(prsByDate, repository);
      }

      content = JSON.stringify(jsonData, null, 2);
      break;
    }
    case 'yaml': {
      const yaml = require('js-yaml');
      let yamlData;

      if (existingContent) {
        try {
          // Parse existing YAML
          yamlData = yaml.load(existingContent);

          // Group PRs by date
          if (!yamlData.pr_history) {
            // Convert old format to new format if needed
            yamlData = {
              repository: yamlData.repository || repository,
              last_updated: formattedDate,
              pr_history: {}
            };

            // Move any existing PRs to their dates
            if (yamlData.pull_requests) {
              yamlData.pull_requests.forEach(pr => {
                const prDate = new Date(pr.mergedAt).toISOString().split('T')[0];
                if (!yamlData.pr_history[prDate]) {
                  yamlData.pr_history[prDate] = [];
                }
                yamlData.pr_history[prDate].push(pr);
              });
              delete yamlData.pull_requests;
            }
          }

          // Add new PRs to their respective dates
          Object.entries(prsByDate).forEach(([date, prs]) => {
            if (!yamlData.pr_history[date]) {
              yamlData.pr_history[date] = [];
            }
            yamlData.pr_history[date] = [...prs, ...yamlData.pr_history[date]];
          });

          // Update date
          yamlData.last_updated = formattedDate;
        } catch (e) {
          console.error('Error parsing existing YAML. Creating new file.', e);
          yamlData = generateGroupedYamlData(prsByDate, repository);
        }
      } else {
        // Create new YAML content with date-based structure
        yamlData = generateGroupedYamlData(prsByDate, repository);
      }

      content = yaml.dump(yamlData);
      break;
    }
    case 'markdown':
    default: {
      if (existingContent) {
        // For markdown, preserve the main header
        const headerMatch = existingContent.match(/^(# PR Change History.*?\n\n)/);

        if (headerMatch) {
          const header = headerMatch[1];
          const existingContent_withoutHeader = existingContent.substring(header.length);

          // Group existing PRs by date sections
          const dateRegex = /^## (\d{4}-\d{2}-\d{2})/gm;
          let match;
          let lastIndex = 0;
          const existingSections = {};

          while ((match = dateRegex.exec(existingContent_withoutHeader)) !== null) {
            const date = match[1];
            const startIndex = match.index;

            // If this is not the first match, extract content from previous date to this date
            if (lastIndex > 0) {
              const prevSectionContent = existingContent_withoutHeader.substring(lastIndex, startIndex);
              const prevDate = Object.keys(existingSections)[Object.keys(existingSections).length - 1];
              existingSections[prevDate] = prevSectionContent;
            }

            // Store the start index for the next iteration
            lastIndex = startIndex;

            // Initialize section
            existingSections[date] = '';
          }

          // Handle the last section
          if (lastIndex > 0) {
            const lastSectionContent = existingContent_withoutHeader.substring(lastIndex);
            const lastDate = Object.keys(existingSections)[Object.keys(existingSections).length - 1];
            existingSections[lastDate] = lastSectionContent;
          }

          // Build new content with new PRs at the top of each date section
          let newContent = header;

          // Get all dates from both new and existing content
          const allDates = [...new Set([...Object.keys(prsByDate), ...Object.keys(existingSections)])];
          allDates.sort().reverse(); // Sort in descending order

          for (const date of allDates) {
            newContent += `## ${date}\n\n`;

            // Add new PRs for this date
            if (prsByDate[date]) {
              for (const pr of prsByDate[date]) {
                newContent += `- [#${pr.number}](https://github.com/${repository.split('/')[0]}/${repository.split('/')[1]}/pull/${pr.number}) ${pr.title} (@${pr.author})\n`;
              }
            }

            // Add existing content for this date (excluding the date header)
            if (existingSections[date]) {
              const sectionContent = existingSections[date];
              // Skip the date header line and the newline after it
              const contentWithoutHeader = sectionContent.substring(sectionContent.indexOf('\n\n') + 2);
              newContent += contentWithoutHeader;
            } else {
              newContent += '\n';
            }
          }

          content = newContent;
        } else {
          // No header found, create new content with date grouping
          content = generateGroupedMarkdownContent(prsByDate, repository) + existingContent;
        }
      } else {
        // Create new markdown content with date grouping
        content = generateGroupedMarkdownContent(prsByDate, repository);
      }
      break;
    }
  }

  // Write to file
  await fs.writeFile(outputFile, content);

  return {
    file: outputFile,
    format: format,
    prCount: newPRs.length
  };
}

module.exports = { getMergedPRs, writePRChanges };
