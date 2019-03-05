function CommentsController (Comments) {
    var self = this;
    
    self.formIsOpen = false;

    self.openCommentForm = function () {
        self.formIsOpen = true;
    }

    self.closeCommentForm = function () {
        self.formIsOpen = false;
        self.newCommentText = '';
    }

    self.submitCommentForm = function () {
        self.mediaItem.addComment(self.newCommentText)
            .then(function (response) {
                self.comments.push(response.data);
                self.closeCommentForm();
            });
    }

    self.mediaItem.comments()
		.then(function (response) {
			self.comments = response.data;
		})

    self.toggleUserLoveComment = function (comment) {
        Comments.toggleUserLove(comment.id)
            .then(function (response) {
                comment.user_loves = response.data.user_loves;
                comment.love_count = response.data.love_count;
            })
    }

    self.sortObjects = [
        {
            label: 'Newest',
            expression: '-commented_on'
        },
        {
            label: 'Most Loves',
            expression: '-love_count'
        }
    ];
};

var comments = {
    templateUrl: '/app/mediaitems/details/_components/comments/comments.html',
    controller: CommentsController,
    bindings: {
        mediaItem: '='
    }
};

angular.module('project.mediaitems.details.comments', [
	'project.utils.filters',
    'project.utils.avatar',
    'project.utils.sort-menu',
    'project.api.comments',
])
    .component('comments', comments);