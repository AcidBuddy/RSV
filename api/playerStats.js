import API from '@callofduty/api';

export default async function handler(req, res) {
  const CallOfDutyAPI = new API();
  const { xsrf, sso, atkn } = await CallOfDutyAPI.Authorize(
  process.env.ACTIVISION_EMAIL,
  process.env.ACTIVISION_PASSWORD
);

  const profile = await CallOfDutyAPI.Profile(
    { username: 'AcidBuddy#2161045', platform: 'uno' },
    'wz',
    'mw'
  );

  res.status(200).json({
    kdRatio: profile.lifetime.kdRatio,
    wins: profile.lifetime.wins
  });
}
