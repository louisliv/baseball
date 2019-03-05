import Profiles from 'api/models/profiles/profiles';
import { Profiles as ProfilesComponent } from './profiles';
import { ProfileDetails } from './details/details'


var profiles = {
    name: 'profiles',
    url: '/profiles',
    component: ProfilesComponent,
    abstract: true
}

var profilesDetails = {
    name: 'profiles.details',
    url: '/:id',
    component: ProfileDetails,
    resolve: [{
        token: 'profile',
        deps: ['$transition$'],
        resolveFn: (trans) => {
            return Profiles.get(trans.params().id)
                .then((response) =>{
                    return response.data;
                }
            )}
    }]
}

export {profiles};
export {profilesDetails};