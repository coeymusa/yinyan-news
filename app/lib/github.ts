// Commit a single file back to the repo via the GitHub Contents API.
// Used by the auto-pair cron to append today's pairing to
// `app/lib/generated-pairings.json`. The commit triggers a Vercel
// rebuild — that is the only "publish" step.
//
// Required env:
//   GITHUB_TOKEN  — fine-grained PAT with contents:write on the repo
//   GITHUB_REPO   — "owner/name", e.g. "coeymusa/yinyan-news"
//   GITHUB_BRANCH — defaults to "main"

const API = "https://api.github.com";

function repoEnv() {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";
  if (!token || !repo) {
    throw new Error("GITHUB_TOKEN and GITHUB_REPO are required");
  }
  return { token, repo, branch };
}

function headers(token: string) {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "yinyan-auto-pair",
  };
}

export async function getFile(path: string): Promise<{ content: string; sha: string }> {
  const { token, repo, branch } = repoEnv();
  const r = await fetch(`${API}/repos/${repo}/contents/${path}?ref=${encodeURIComponent(branch)}`, {
    headers: headers(token),
    cache: "no-store",
  });
  if (!r.ok) {
    const t = await r.text().catch(() => "");
    throw new Error(`GitHub getFile ${r.status}: ${t.slice(0, 200)}`);
  }
  const j = (await r.json()) as { content: string; sha: string; encoding: string };
  if (j.encoding !== "base64") throw new Error(`unexpected encoding ${j.encoding}`);
  const decoded = Buffer.from(j.content, "base64").toString("utf8");
  return { content: decoded, sha: j.sha };
}

export async function putFile(opts: {
  path: string;
  content: string;
  sha: string;
  message: string;
}): Promise<void> {
  const { token, repo, branch } = repoEnv();
  const r = await fetch(`${API}/repos/${repo}/contents/${opts.path}`, {
    method: "PUT",
    headers: { ...headers(token), "Content-Type": "application/json" },
    body: JSON.stringify({
      message: opts.message,
      content: Buffer.from(opts.content, "utf8").toString("base64"),
      sha: opts.sha,
      branch,
      committer: {
        name: "yinyan auto-pair",
        email: "auto-pair@yinyan.news",
      },
    }),
  });
  if (!r.ok) {
    const t = await r.text().catch(() => "");
    throw new Error(`GitHub putFile ${r.status}: ${t.slice(0, 200)}`);
  }
}
