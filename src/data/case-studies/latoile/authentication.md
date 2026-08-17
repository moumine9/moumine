By default latoile piggybacks on the locally logged-in `acli` (Atlassian) and `glab` (GitLab) CLI sessions — nothing new to set up if those are already configured.

For faster startup, both clients can bypass their CLIs entirely. Setting `LATOILE_JIRA_URL` + `LATOILE_JIRA_EMAIL` + `LATOILE_JIRA_TOKEN` drops per-issue fetch time from roughly 5 seconds (spawning `acli`) to 0.3 seconds. GitLab reads the PAT from the local `glab` config automatically, or via `LATOILE_GITLAB_TOKEN`. No credentials are stored in the repository.
