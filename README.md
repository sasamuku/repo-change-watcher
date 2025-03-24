# Repository Change Watcher

A GitHub Action that monitors merged PRs and automatically records change history to a specified file, organized by date.

## Features

- Periodically monitors merged PRs in specified GitHub repositories
- Automatically records all merged PRs to a designated file, grouped by date
- Maintains a comprehensive history of all changes over time
- Avoids duplicate entries when run multiple times
- Flexible configuration of monitoring targets and output destinations within your workflow

## Usage

### Workflow Configuration

Add the following to your `.github/workflows/pr-watcher.yml`:

```yaml
name: PR Change Watcher

on:
  schedule:
    # Run daily at 9:00 UTC (18:00 JST)
    - cron: '0 9 * * *'
  # Manual trigger option
  workflow_dispatch:

jobs:
  watch-changes:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Monitor PR Changes
        uses: sasamuku/repo-change-watcher@v1
        with:
          # Target repository to monitor (owner/repo format)
          target_repository: 'octocat/Hello-World'
          # Number of days to look back (default is 1)
          days_to_check: 1
          # File path to output results
          output_file: 'docs/CHANGES.md'
          # Output format (markdown/json/yaml)
          output_format: 'markdown'
          # GitHub token for API authentication
          github_token: ${{ secrets.GITHUB_TOKEN }}

      - name: Commit changes
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add docs/CHANGES.md
          git diff --quiet && git diff --staged --quiet || git commit -m "Update PR changes [skip ci]"

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

## Output Format Examples

### Markdown Format (Default)

```markdown
# PR Change History (2023-04-01)

## 2023-04-01

- [#123](https://github.com/octocat/Hello-World/pull/123) Add new feature A (@octocat)
- [#124](https://github.com/octocat/Hello-World/pull/124) Fix bug (@octodev)

## 2023-03-31

- [#125](https://github.com/octocat/Hello-World/pull/125) Update documentation (@octofan)
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
        "mergedAt": "2023-04-01T14:32:25Z"
      },
      {
        "number": 124,
        "title": "Fix bug",
        "url": "https://github.com/octocat/Hello-World/pull/124",
        "author": "octodev",
        "mergedAt": "2023-04-01T10:15:30Z"
      }
    ],
    "2023-03-31": [
      {
        "number": 125,
        "title": "Update documentation",
        "url": "https://github.com/octocat/Hello-World/pull/125",
        "author": "octofan",
        "mergedAt": "2023-03-31T18:45:12Z"
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
    - number: 124
      title: Fix bug
      url: https://github.com/octocat/Hello-World/pull/124
      author: octodev
      mergedAt: '2023-04-01T10:15:30Z'
  '2023-03-31':
    - number: 125
      title: Update documentation
      url: https://github.com/octocat/Hello-World/pull/125
      author: octofan
      mergedAt: '2023-03-31T18:45:12Z'
```

## Local Testing

You can test this tool locally using either command line arguments or environment variables:

### Using Command Line Arguments

```bash
# Set GitHub token (required)
export GITHUB_TOKEN=your_github_token

# Run with command line arguments (preferred method)
npm start -- --target-repository="octocat/Hello-World" --days-to-check="1" --output-file="changes.md" --output-format="markdown"

# Alternative format with equals sign
npm start -- --target-repository=octocat/Hello-World --output-file=changes.md
```

### Using a .env File

Create a `.env` file in the project root with the following content:

```
# GitHub API authentication token (required)
GITHUB_TOKEN=your_github_token

# Action inputs
INPUT_TARGET_REPOSITORY=octocat/Hello-World
INPUT_DAYS_TO_CHECK=1
INPUT_OUTPUT_FILE=changes.md
INPUT_OUTPUT_FORMAT=markdown
```

Then run the application:

```bash
npm start
```

**Note:** Command line arguments take precedence over values in the `.env` file.

## How It Works

1. The action queries the GitHub API to find PRs that were merged during the specified time period
2. It collects information about these PRs (number, title, author, merge date)
3. It organizes PRs by their merge date
4. It reads the existing output file (if any) to avoid adding duplicate entries
5. It updates the file with new PRs while preserving the historical data
6. The resulting file is a chronological record of all merged PRs

## Future Enhancements

- AI-powered PR summary generation
- Customizable PR filtering options
- Statistical analysis of PR trends
- Integration with notification platforms

## Benefits

- No external service integration needed, works entirely within GitHub Actions
- Monitor PR changes in any repository
- Automatically record change history and manage it within your project
- Chronological organization of PRs by date
- Customizable output format

## License

MIT
