export const explorePopularRepos = async (req, res) => {
	const { language } = req.params;

	
		// 5000 requests per hour for authenticated requests
		try {
			const response = await fetch(`https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=10`,{
				headers: {
					authorization: `token ${process.env.GITHUB_API_APP}`,
				   },
			})
			;
		if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }
		const data = await response.json();

		res.status(200).json({ repos: data.items });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};