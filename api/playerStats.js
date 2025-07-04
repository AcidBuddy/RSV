import API from '@callofduty/api'
// { xsrf, sso, atkn } are assumed to be defined already (see first example)
const CallOfDutyAPI = new API({ xsrf, sso, atkn })
// API.Accounts() - Get all platform profiles for this account
const { uno, xbl, psn, battle, steam } = await API.Accounts()
const { username } = uno // uno = activision, swap for other platforms as needed
// API.Friends() - Get all friend profiles for this account
const { uno, incomingInvitations, outgoingInvitations, blocked } = await API.Friends()
// uno is an array of friend profiles
for(const friend of uno) {
    const { username, platform, accountId, status: { online, curentTitleId } } = friend
    // ... do the things ...
}
// incomingInvitations and outgoingInvitations share the same schema as friends without currentTitleId
for(const stans of incomingInvitations) {
    const { username, platform, accountId, status: { online } } = friend
    // ... do the things ...
}
