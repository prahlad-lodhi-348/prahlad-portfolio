const githubUsername = 'prahlad657';
const starsCountEl = document.getElementById('stars-count');
const commitsCountEl = document.getElementById('commits-count');

async function fetchGitHubStats() {
  try {
    const [reposRes, eventsRes] = await Promise.all([
      fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100`),
      fetch(`https://api.github.com/users/${githubUsername}/events/public`)
    ]);

    if (!reposRes.ok || !eventsRes.ok) throw new Error('GitHub API limit');

    const repos = await reposRes.json();
    const events = await eventsRes.json();

    const stars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const commits = events.reduce((sum, event) => {
      if (event.type === 'PushEvent') {
        return sum + (event.payload?.size || 0);
      }
      return sum;
    }, 0);

    if (starsCountEl) starsCountEl.textContent = stars.toString();
    if (commitsCountEl) commitsCountEl.textContent = commits.toString();
  } catch (error) {
    console.warn('GitHub stats fallback', error);
  }
}

fetchGitHubStats();
setInterval(fetchGitHubStats, 30000);



