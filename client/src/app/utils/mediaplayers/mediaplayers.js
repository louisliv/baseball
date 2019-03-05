function MediaPlayers ($q, $rootScope) {
    var self = this;
	var _players = [];
    var factoryObject = {}

    factoryObject.addPlayer = function (mediaSrc, elementId) {
        self.player = {
            elementId: elementId,
            elementSelector: '#' + elementId,
            type: mediaSrc.file_type,
            title: mediaSrc.title,
            url: mediaSrc.url,
            subtitles: mediaSrc.subtitles,
            poster: mediaSrc.poster,
            sources: [
                {
                    src: mediaSrc.url,
                    type: mediaSrc.file_type + '/' + mediaSrc.url.split('.').pop(),
                    size: 720,
                },
            ]
        }

        _players.push(self.player);

        $rootScope.$$postDigest(function () {
            self._intializePlyrs();
        });

        return $q.resolve(self.player);
    };

    factoryObject.getList = function () {
        return _players;
    };

    factoryObject.removeAll = function () {
        _players = [];
    };

    self._intializePlyrs = function () {
        _.forEach(_players, function (player) {
            self.plyr = new Plyr(player.elementSelector, {
                keyboard: { focused: true, global: true},
                autoplay: true
            });

            self.tracks = []

            if (player.subtitles.length && player.type == 'video') {
                _.forEach(player.subtitles, function (sub) {
                    self.tracks.push({
                        kind: 'captions',
                        label: sub.label,
                        srclang: sub.source_language,
                        src: sub.url,
                    })
                })
            }
            
            self.plyr.source = {
                type: player.type,
                title: player.title,
                sources: player.sources,
                tracks: self.tracks,
                poster: player.poster
            };
            
            player.plyr = self.plyr;
        })
    }

	return factoryObject;
};

angular.module('project.utils.mediaplayers', [])
	.factory('MediaPlayers', ['$q', '$rootScope', MediaPlayers]);