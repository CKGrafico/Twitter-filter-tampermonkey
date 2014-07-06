/**
 * Filter Stream
 */
(function(g, $){

	/**
	 * Init Filter
	 */
	function filter() {
		var $container = $('.stream-container .tweet');
		var filters = g.getData();
		var words = toRegex(filters.words.split(','));
		var accounts = toRegex(filters.accounts.split(','));

		$container.each(function() {
			var text = $(this).text();
			var foundWords = text.match(words);
			var foundAccounds = text.match(accounts);

			var message = 'BLOCKED: ';
			if(foundAccounds) {
				foundAccounds = foundAccounds.filter(filterUndefined);
				foundAccounds = foundAccounds.filter(filterDuplicate(foundAccounds));
				message += 'Accounts: ';
				message += foundAccounds.join(', ');
			}

			if(foundWords) {
				foundWords = foundWords.filter(filterUndefined);
				foundWords = foundWords.filter(filterDuplicate(foundWords));
				message += 'Words: ';
				message += foundWords.join(', ');
			}

			if(foundAccounds || foundWords) {
				createBlockedDiv($(this), message);
			}
		});
	}

	/**
	 * Convert array of words to regex
	 */
	function toRegex(arr) {
		var nextReg = '';
		for (var i = 0; i < arr.length; i++) {
			nextReg += '('+arr[i].trim()+')|';
		}

		return new RegExp(nextReg.slice(0,-1),'ig');
	}

	/**
	 * filter undefined
	 */
	function filterUndefined(n) {
		return n !== undefined;
	}

	/**
	 * function filter duplicate element
	 */
	function filterDuplicate(arr) {
		return function(elem, pos) {
			return arr.indexOf(elem) == pos;
		};
	}

	/**
	 * Create a blocked Div
	 */
	function createBlockedDiv ($el, message) {
		var $div = $('<div/>').addClass('ck-message').text(message);
		$el.prepend($div).addClass('ck-blocked');

		$div.on('click', onClickMessage);
	}

	/**
	 * Show or hide blocked message
	 */
	function onClickMessage(e) {
		e.stopPropagation();
		e.preventDefault();
		$(this).parent().toggleClass('ck-blocked');
	}


	g.filterStream = filter;
})(this, jQuery);