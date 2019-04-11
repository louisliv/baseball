export default {
    teamSchedule: (schedules, teamId) => {
        return schedules.byTeam[teamId] ? schedules.byTeam[teamId] : [];
    },
};