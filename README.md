# Repository Change Watcher

A service that monitors GitHub repository changes daily and creates notifications for important PRs using GitHub Issues and Pull Requests.

## Features

- Automatically monitors changes in specified GitHub repositories daily
- Creates GitHub Issues for important PRs merged the previous day
- Generates Pull Requests to update a changelog file for historical tracking
- Importance criteria configurable through keywords

## Setup

1. Fork this repository (preferably set it as private)
   ```
   # After forking, clone your fork
   git clone https://github.com/yourusername/repo-change-watcher.git
   cd repo-change-watcher
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Edit configuration files
   - `config/repos.yaml`: Edit monitored repositories
   - `config/keywords.json`: Edit keywords for determining importance

4. Push changes to your fork

## How It Works

1. Every day at 18:00 JST (9:00 UTC), the GitHub Action workflow runs automatically
2. The script checks all repositories listed in `repos.yaml` for PRs merged the previous day
3. PRs containing the keywords specified in `keywords.json` are considered important
4. An Issue is created with a list of all important PRs for easy reference
5. A Pull Request is created that updates the CHANGELOG.md file with the important changes
6. Review the PR and merge it to maintain a historical record of important changes

## Usage

### Local Testing

```
# Set required environment variables
export GITHUB_TOKEN=your_github_token
export GITHUB_REPOSITORY_OWNER=your_username
export GITHUB_REPOSITORY_NAME=repo-change-watcher

# Run the script
npm start
```

### Automatic execution via GitHub Actions

The workflow uses the default `GITHUB_TOKEN` provided by GitHub Actions, so no additional secret setup is needed. The repository owner and name are automatically determined from the GitHub context.

## Benefits

- No external email service configuration required
- All notifications stay within the GitHub ecosystem
- Historical record of important changes is maintained in your repository
- Easily searchable and linkable change history

## License

MIT
