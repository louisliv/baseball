import homeState from "home";
import { mediaItems, mediaItemDetails, mediaItemSearch } from "mediaitems"
import { auth, profile, login } from "./auth";
import { profiles, profilesDetails } from "./profiles";
import { UIRouterReact, servicesPlugin, pushStateLocationPlugin } from '@uirouter/react';

export const router = new UIRouterReact();

router.plugin(servicesPlugin);
router.plugin(pushStateLocationPlugin);

const routes = [
    homeState,
    mediaItems,
    mediaItemDetails,
    mediaItemSearch,
    auth,
    profile,
    login,
    profiles,
    profilesDetails
]

routes.forEach(route => router.stateRegistry.register(route));