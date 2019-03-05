function camelize(){
    return function (str) {
    	return str.replace(/\W+(.)/g, function(match, chr)
	    {
		  return chr.toUpperCase();
	    });
    }
}

function toInitials() {
	return function (user) {
		if (user) {
			return user.first_name.charAt(0).toUpperCase() + 
				   user.last_name.charAt(0).toUpperCase();
		} else {
			return;
		}
	}
}

function fromNow() {
	return function (dateString) {
		return moment(dateString).fromNow();
	}
}

function capitilizeFirst() {
	return function (string) {
		return string.charAt(0).toUpperCase() + string.substr(1)
	}
}

function uploadedOn() {
	return function (dateString) {
		return moment(dateString).format('MMM D[,] YYYY') 
	}
}

angular.module('project.utils.filters', [])
	.filter('camelize', camelize)
	.filter('toInitials', toInitials)
	.filter('fromNow', fromNow)
	.filter('capitilizeFirst', capitilizeFirst)
	.filter('uploadedOn', uploadedOn);