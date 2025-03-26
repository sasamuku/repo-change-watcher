# Repository Sprint Digest

A GitHub Action that monitors merged PRs and automatically records change history to a specified file, organized by date for effective sprint reviews and team progress tracking.

For a complete example of the output, see the [SAMPLE-DIGEST.md](SAMPLE-DIGEST.md) file.

## Features

- Periodically monitors merged PRs in specified GitHub repositories
- Automatically records all merged PRs to a designated file, grouped by date
- Facilitates daily and weekly team reviews of development activities
- Maintains a comprehensive history of all changes over time
- Avoids duplicate entries when run multiple times
- Flexible configuration of monitoring targets and output destinations within your workflow

## Usage

### Workflow Configuration

Add the following to your `.github/workflows/sprint-digest.yml`:

```yaml
name: PR Sprint Digest

on:
  schedule:
    # Run daily at 9:00 UTC (18:00 JST)
    - cron: '0 9 * * *'
  # Manual trigger option
  workflow_dispatch:

permissions:
  contents: write

jobs:
  generate-digest:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Generate PR Digest
        uses: sasamuku/repo-sprint-digest@v1.0.0
        with:
          # Target repository to monitor (owner/repo format)
          target_repository: 'octocat/Hello-World'
          # Number of days to look back (default is 1)
          days_to_check: 1
          # File path to output results
          output_file: 'docs/SPRINT-DIGEST.md'
          # Output format (markdown/json/yaml)
          output_format: 'markdown'
          # GitHub token for API authentication
          github_token: ${{ secrets.GITHUB_TOKEN }}
          # OpenAI API Key for generating PR summaries (optional)
          openai_api_key: ${{ secrets.OPENAI_API_KEY }}

      - name: Commit changes
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add docs/SPRINT-DIGEST.md
          git diff --quiet && git diff --staged --quiet || git commit -m "Update sprint digest [skip ci]"

      - name: Push changes
        uses: ad-m/github-push-action@master
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          branch: ${{ github.ref }}
```

## Input Parameters

| Parameter | Required | Description | Default |
|-----------|----------|-------------|---------|
| `target_repository` | ✅ | Target repository to monitor (owner/repo format) | - |
| `days_to_check` | ❌ | Number of days to look back for PRs | `1` |
| `output_file` | ✅ | File path to write results | - |
| `output_format` | ❌ | Output format (markdown/json/yaml) | `markdown` |
| `github_token` | ✅ | GitHub token for API authentication | - |
| `openai_api_key` | ❌ | OpenAI API Key for generating PR summaries | - |

### Markdown Format (Default)

```markdown
# PR Change History (2023-04-01)

## 2023-04-01

- [#123](https://github.com/octocat/Hello-World/pull/123) Add new feature A (@octocat)
  > **AI Summary**: This PR adds Feature A, implementing two-factor authentication to enhance security. Main changes include modifications to the authentication controller and user model.

- [#124](https://github.com/octocat/Hello-World/pull/124) Fix bug (@octodev)
  > **AI Summary**: Fixes an error that occurred on the login screen under specific conditions. Improves error handling and enhances user experience.

## 2023-03-31

- [#125](https://github.com/octocat/Hello-World/pull/125) Update documentation (@octofan)
  > **AI Summary**: Updates API documentation by adding descriptions for new endpoints and revising existing examples to match the latest specifications.
```

### JSON Format

```json
{
  "repository": "octocat/Hello-World",
  "created_at": "2023-04-01",
  "last_updated": "2023-04-01",
  "pr_history": {
    "2023-04-01": [
      {
        "number": 123,
        "title": "Add new feature A",
        "url": "https://github.com/octocat/Hello-World/pull/123",
        "author": "octocat",
        "mergedAt": "2023-04-01T14:32:25Z",
        "summary": "This PR adds Feature A, implementing two-factor authentication to enhance security. Main changes include modifications to the authentication controller and user model."
      },
      {
        "number": 124,
        "title": "Fix bug",
        "url": "https://github.com/octocat/Hello-World/pull/124",
        "author": "octodev",
        "mergedAt": "2023-04-01T10:15:30Z",
        "summary": "Fixes an error that occurred on the login screen under specific conditions. Improves error handling and enhances user experience."
      }
    ],
    "2023-03-31": [
      {
        "number": 125,
        "title": "Update documentation",
        "url": "https://github.com/octocat/Hello-World/pull/125",
        "author": "octofan",
        "mergedAt": "2023-03-31T18:45:12Z",
        "summary": "Updates API documentation by adding descriptions for new endpoints and revising existing examples to match the latest specifications."
      }
    ]
  }
}
```

### YAML Format

```yaml
repository: octocat/Hello-World
created_at: '2023-04-01'
last_updated: '2023-04-01'
pr_history:
  '2023-04-01':
    - number: 123
      title: Add new feature A
      url: https://github.com/octocat/Hello-World/pull/123
      author: octocat
      mergedAt: '2023-04-01T14:32:25Z'
      summary: 'This PR adds Feature A, implementing two-factor authentication to enhance security. Main changes include modifications to the authentication controller and user model.'
    - number: 124
      title: Fix bug
      url: https://github.com/octocat/Hello-World/pull/124
      author: octodev
      mergedAt: '2023-04-01T10:15:30Z'
      summary: 'Fixes an error that occurred on the login screen under specific conditions. Improves error handling and enhances user experience.'
  '2023-03-31':
    - number: 125
      title: Update documentation
      url: https://github.com/octocat/Hello-World/pull/125
      author: octofan
      mergedAt: '2023-03-31T18:45:12Z'
      summary: 'Updates API documentation by adding descriptions for new endpoints and revising existing examples to match the latest specifications.'
```

## Local Testing

You can test this tool locally using either command line arguments or environment variables:

### Using Command Line Arguments

```bash
# Set GitHub token (required)
export GITHUB_TOKEN=your_github_token

# Set OpenAI API key (optional - for AI summaries)
export OPENAI_API_KEY=your_openai_api_key

# Run with command line arguments (preferred method)
npm start -- --target-repository="octocat/Hello-World" --days-to-check="1" --output-file="sprint-digest.md" --output-format="markdown"

# Alternative format with equals sign
npm start -- --target-repository=octocat/Hello-World --output-file=sprint-digest.md
```

### Using a .env File

Create a `.env` file in the project root with the following content:

```
# GitHub API authentication token (required)
GITHUB_TOKEN=your_github_token

# OpenAI API Key for AI-powered PR summaries (optional)
# If not provided, summaries will be skipped
OPENAI_API_KEY=your_openai_api_key_here

# Action inputs
INPUT_TARGET_REPOSITORY=octocat/Hello-World
INPUT_DAYS_TO_CHECK=1
INPUT_OUTPUT_FILE=sprint-digest.md
INPUT_OUTPUT_FORMAT=markdown
```

Then run the application:

```bash
npm start
```

**Note:** Command line arguments take precedence over values in the `.env` file.

### AI Summaries

The tool can generate AI-powered summaries for each PR using OpenAI's API. This feature is optional:

- If you provide an `OPENAI_API_KEY`, the tool will generate summaries for each PR
- If no API key is provided, the tool will skip the summary generation
- Summaries appear in the output under each PR entry

## How It Works

1. The action queries the GitHub API to find PRs that were merged during the specified time period
2. It collects information about these PRs (number, title, author, merge date)
3. It organizes PRs by their merge date for easy daily/weekly review
4. It reads the existing output file (if any) to avoid adding duplicate entries
5. It updates the file with new PRs while preserving the historical data
6. The resulting file is a chronological record of all merged PRs, perfect for sprint reviews and team meetings

## Future Enhancements

- AI-powered PR summary generation to highlight key development achievements (in progress)
- Weekly/sprint rollup summaries for management reporting
- Customizable PR filtering options
- Statistical analysis of PR trends and development velocity
- Integration with notification platforms and team communication tools
- Automated meeting agenda generation based on PR activities

## Benefits

- Facilitates effective sprint reviews and team standups with organized PR history
- Supports agile development by providing clear visibility into daily/weekly accomplishments
- No external service integration needed, works entirely within GitHub Actions
- Monitor PR changes in any repository
- Automatically record change history and manage it within your project
- Chronological organization of PRs by date
- Customizable output format

## License

MIT
