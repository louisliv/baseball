function MediaItemController (MediaPlayers, $filter, MediaItems, Comments) {
	var self = this;

	MediaPlayers.addPlayer(self.mediaItem, $filter('camelize')(self.mediaItem.title))
		.then(function (player) {
			self.player = player;
        });
        
    self.toggleUserLoveMedia = function () {
        self.mediaItem.toggleUserLove()
            .then(function (response) {
                self.mediaItem.user_loves = response.data.user_loves;
                self.mediaItem.love_count = response.data.love_count;
            })
    }
};

var mediaItemCard = {
    templateUrl: '/app/mediaitems/details/_components/mediaitem/mediaitem.html',
    controller: MediaItemController,
    bindings: {
        mediaItem: '='
    }
};

angular.module('project.mediaitems.details.mediaitemcard', [
	'project.utils.mediaplayers',
	'project.utils.filters',
	'project.utils.avatar'
])
    .component('mediaItemCard', mediaItemCard);