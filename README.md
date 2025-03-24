# Repository Change Watcher

A service that monitors GitHub repository changes daily and notifies important changes (PRs) via email.

## Features

- Automatically monitors changes in specified GitHub repositories daily
- Sends email notifications only for important PRs merged the previous day
- Importance criteria configurable through keywords

## Setup

1. Clone the repository
   ```
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

4. Set up environment variables
   - For local development: Create `.env` file (copy from `.env.example`)
   - For GitHub Actions: Set up required environment variables in repository Settings > Secrets

## Usage

### Local execution

```
npm start
```

### Automatic execution via GitHub Actions

Set up the following Secrets in your repository settings for automatic daily execution:

- `GITHUB_TOKEN`: GitHub API token (automatically provided in Actions)
- `SENDGRID_API_KEY`: SendGrid API key
- `NOTIFY_EMAIL`: Email address for notifications
- `FROM_EMAIL`: Sender email address (must be verified in SendGrid)

## License

MIT
