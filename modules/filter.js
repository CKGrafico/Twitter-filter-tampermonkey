/**
 * Filter Stream
 */
(function(g, $){

	/**
	 * Init Filter
	 */
	function filter() {
		var $container = $('.stream-items .js-stream-item');
		var filters = g.getData();
		var wordsArray = filters.words.split(',');
		var words = toRegex(wordsArray);

		var accountsArray = filters.accounts.split(',');
		var accounts = toRegex(accountsArray);

		$container.each(function() {
			if(!$(this).hasClass('ck-filtered')) {
				var text = $(this).text();

				var message = 'BLOCKED: ';

				if(accountsArray.length > 1) {
					var foundAccounds = text.match(accounts);
					if(foundAccounds) {
						foundAccounds = foundAccounds.filter(filterUndefined);
						foundAccounds = foundAccounds.filter(filterDuplicate(foundAccounds));
						message += 'Accounts: ';
						message += foundAccounds.join(', ');
					}
				}

				if(wordsArray.length > 1) {
					var foundWords = text.match(words);
					if(foundWords) {
						foundWords = foundWords.filter(filterUndefined);
						foundWords = foundWords.filter(filterDuplicate(foundWords));
						message += ' Words: ';
						message += foundWords.join(', ');
					}
				}

				if(foundAccounds || foundWords) {
					createBlockedDiv($(this), message);
				}
			}
		});

		requestAnimationFrame(filterStream);
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
		$el.prepend($div).addClass('ck-filtered ck-blocked');

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