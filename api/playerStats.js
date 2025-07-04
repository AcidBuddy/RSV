export default async function handler(req, res) {
  const username = 'AcidBuddy%232161045'; // Activision ID URL-encoded
  const platform = 'uno'; // Change to 'xbl', 'psn', etc. if needed

  const url = `https://public-api.tracker.gg/v2/call-of-duty/standard/profile/${platform}/${username}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'TRN-Api-Key': 'fc7bd9ef-b6d7-4618-86a3-1f0a695e5a83'
      }
    });

    if (!response.ok) {
      throw new Error(`Tracker API error: ${response.status}`);
    }

    const data = await response.json();

    const lifetime = data?.data?.segments?.[0]?.stats;

    res.status(200).json({
      kdRatio: lifetime?.kdRatio?.displayValue ?? 'N/A',
      wins: lifetime?.wins?.displayValue ?? 'N/A'
    });

  } catch (err) {
    console.error('Error fetching Tracker stats:', err);
    res.status(500).json({
      error: 'Unable to fetch player stats',
      details: err.message
    });
  }
}
