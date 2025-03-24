# Repository Change Watcher

A GitHub Action that monitors merged PRs and automatically records change history to a specified file.

## Features

- Periodically monitors merged PRs in specified GitHub repositories
- Automatically records all merged PRs to a designated file
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

- [#123](https://github.com/octocat/Hello-World/pull/123) Add new feature A (@octocat)
- [#124](https://github.com/octocat/Hello-World/pull/124) Fix bug (@octodev)
- [#125](https://github.com/octocat/Hello-World/pull/125) Update documentation (@octofan)
```

## Local Testing

```bash
# Set required environment variables
export GITHUB_TOKEN=your_github_token

# Run the script
npm start -- --target-repository=octocat/Hello-World --output-file=changes.md
```

## Benefits

- No external service integration needed, works entirely within GitHub Actions
- Monitor PR changes in any repository
- Automatically record change history and manage it within your project
- Customizable output format

## License

MIT
