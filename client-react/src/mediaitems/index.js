import MediaItems from 'api/models/mediaitems/mediaitems';
import { MediaItems as MediaItemsComponent } from './mediaitems';
import MediaItemDetails from './details/details'
import { MediaItemSearch } from "./search/search";

var mediaItems = {
    name: 'mediaitems',
    url: '/mediaitems',
    component: MediaItemsComponent,
    abstract: true
}

var mediaItemDetails = {
    name: 'mediaitems.details',
    url: '/:id',
    component: MediaItemDetails,
    resolve: [{
        token: 'mediaitem',
        deps: ['$transition$'],
        resolveFn: (trans) => {
            return MediaItems.get(trans.params().id)
                .then((response) =>{
                    return response;
                }
            )}
    }]
}

var mediaItemSearch = {
    name: 'mediaitems.search',
    url: '/search?searchTerm',
    component: MediaItemSearch,
    resolve: [{
        token: 'searchResults',
        deps: ['$transition$'],
        resolveFn: (trans) => {
            return MediaItems.getAll({
                'search_term': trans.params().searchTerm
            }, 'search')
        }
    }]
}

export {mediaItems};
export {mediaItemDetails};
export {mediaItemSearch};