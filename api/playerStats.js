import API from '@callofduty/api';

export default async function handler(req, res) {
  try {
    const CallOfDutyAPI = new API();

    const email = process.env.ACTIVISION_EMAIL;
    const password = process.env.ACTIVISION_PASSWORD;

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing Activision credentials in environment variables' });
    }

    const { xsrf, sso, atkn } = await CallOfDutyAPI.Authorize(email, password);
    CallOfDutyAPI.UseTokens({ xsrf, sso, atkn });

    const profile = await CallOfDutyAPI.Profile(
      { username: 'AcidBuddy#2161045', platform: 'uno' },
      'wz',
      'mw'
    );

    res.status(200).json({
      kdRatio: profile?.lifetime?.kdRatio ?? 'N/A',
      wins: profile?.lifetime?.wins ?? 'N/A'
    });

  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Failed to fetch player stats', details: error.message });
  }
}