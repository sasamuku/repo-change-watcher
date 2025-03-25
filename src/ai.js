const { ChatOpenAI } = require('@langchain/openai');
const { PromptTemplate } = require('@langchain/core/prompts');

const chatModel = new ChatOpenAI({
  modelName: 'gpt-3.5-turbo',
  temperature: 0.2
});

const summarizeTemplate = PromptTemplate.fromTemplate(
  `You are an expert at summarizing GitHub Pull Requests.
   Please provide a concise summary of the following PR information.
   Focus on the main changes, purpose, and impact areas.

   PR Title: {title}
   PR Description: {description}
   Changed Files: {files}

   Summary:`
);

/**
 * Summarize a PR using OpenAI
 * @param {Object} prDetails - PR details including title, description, and changed files
 * @returns {Promise<string>} AI-generated summary
 */
async function summarizePR(prDetails) {
  try {
    // Check if we're using a valid API key
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
      console.log('Using mock summary for testing (no valid API key provided)');
      return generateMockSummary(prDetails);
    }

    const filesInfo = prDetails.changedFiles.map(file =>
      `${file.filename} (${file.status}, +${file.additions}, -${file.deletions})`
    ).join('\n');

    const prompt = await summarizeTemplate.format({
      title: prDetails.title,
      description: prDetails.description || 'No description provided',
      files: filesInfo
    });

    const response = await chatModel.invoke(prompt);
    return response.content.trim();
  } catch (error) {
    console.error('Error generating PR summary:', error);
    return 'Unable to generate summary due to an error.';
  }
}

/**
 * Generate a mock summary for testing without API key
 * @param {Object} prDetails - PR details
 * @returns {string} Mock summary
 */
function generateMockSummary(prDetails) {
  const fileCount = prDetails.changedFiles.length;
  const additions = prDetails.changedFiles.reduce((sum, file) => sum + file.additions, 0);
  const deletions = prDetails.changedFiles.reduce((sum, file) => sum + file.deletions, 0);

  return `This PR ${prDetails.title.toLowerCase().includes('fix') ? 'fixes a bug' : 'implements a new feature'}. ` +
    `It modifies ${fileCount} files with ${additions} additions and ${deletions} deletions. ` +
    `The main changes focus on ${prDetails.changedFiles[0]?.filename || 'project files'}.`;
}

module.exports = { summarizePR };
