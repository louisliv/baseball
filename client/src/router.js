import homeState from 'home';
import { teamsState, teamDetail, teams } from 'teams';
import { players, playerDetails } from 'players';
import { 
    scorebook, 
    teamList, 
    teamSchedule, 
    game,
    setLineups,
    scorecard
} from 'scorebook';
import { auth, login } from 'auth';
import dashboardState from 'dashboard';
import { UIRouterReact, servicesPlugin, pushStateLocationPlugin } from '@uirouter/react';
import App from './App';
import AuthApi from './api/models-server/auth/auth'

import CurrentStateActions from './store/action-creators/current-state';
import AuthActions from './store/action-creators/auth';

export const router = new UIRouterReact();

router.plugin(servicesPlugin);
router.plugin(pushStateLocationPlugin);

router.transitionService.onBefore(true, function(trans) {
    let toRoute= trans.to()
    AuthActions.setCurrent();
    if (toRoute.requireAuth) {
        return AuthApi.isAuthenticated()
            .then((response) => {
                if (!response) {
                    return trans.router.stateService.target('dashboard')
                }
            })
    }
})

router.transitionService.onSuccess(true, function(trans) {
    CurrentStateActions.set(trans.router.globals.current);
});

const app = {
    name: 'app',
    redirectTo: 'welcome',
    component: App,
    data: {
        excludeSidebar: false
    },
    requireAuth: false
};

const routes = [
    app,
    homeState,
    dashboardState,
    teams,
    teamsState,
    teamDetail,
    players,
    playerDetails,
    scorebook,
    teamList,
    teamSchedule,
    game,
    setLineups,
    scorecard,
    auth,
    login
]

routes.forEach(route => router.stateRegistry.register(route));