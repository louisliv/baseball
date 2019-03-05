function RelatedMediaController () {
	var self = this;

    self.mediaItem.related()
        .then(function (response) {
            self.mediaItems = response.data;
        })
};

var relatedMedia = {
    templateUrl: '/app/mediaitems/details/_components/related-media/related-media.html',
    controller: RelatedMediaController,
    bindings: {
        mediaItem: '='
    }
};

angular.module('project.mediaitems.details.related-media', [])
    .component('relatedMedia', relatedMedia);