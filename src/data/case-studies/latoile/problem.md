Answering "what's the state of this ticket?" well means reading it in *both* Jira (the intent, the acceptance criteria, the parent story) and GitLab (the merge requests, the branches, the commits that actually shipped). An LLM asked that question ends up making dozens of small round trips to two APIs and stitches partial answers together.

latoile does that stitching once, up front, and hands the LLM a single graph it can reason over.
