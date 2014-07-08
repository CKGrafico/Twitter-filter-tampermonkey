/**
 * Filter Stream
 */
(function(g, $){

	var lastUrl;

	/**
	 * Init Filter
	 */
	function filter() {
		var $container = $('.js-stream-item');
		var filters = g.getData();
		var wordsArray = filters.words.split(',');
		for (var i = 0; i < wordsArray.length; i++) {
			wordsArray[i] = wordsArray[i].trim();
		}
		var words = toRegex(wordsArray);

		var accountsArray = filters.accounts.split(',');
		for (i = 0; i < accountsArray.length; i++) {
			accountsArray[i] = accountsArray[i].trim();
			accountsArray[i] = (accountsArray[i][0] !== '@') ? '\\@'+accountsArray[i] : accountsArray[i];
		}
		var accounts = toRegex(accountsArray);

		// Check if change page
		// because twitter async..
		var url = document.URL;
		if(lastUrl != url) {
			lastUrl = url;
			$('.ck-filtered').removeClass('ck-filtered ck-blocked');
			$('.ck-message').remove();
		}

		$container.each(function() {
			if(!$(this).hasClass('ck-filtered')) {
				var text = $(this).text();

				var message = '<b>BLOCKED </b>';

				if(accountsArray.length > 0) {
					var foundAccounds = text.match(accounts);
					if(foundAccounds) {
						foundAccounds = foundAccounds.filter(filterUndefined);
						foundAccounds = foundAccounds.filter(filterDuplicate(foundAccounds));
						message += 'Accounts: <i>';
						message += foundAccounds.join(', ');
						message += '</i>';
					}
				}

				if(wordsArray.length > 0) {
					var foundWords = text.match(words);
					if(foundWords) {
						foundWords = foundWords.filter(filterUndefined);
						foundWords = foundWords.filter(filterDuplicate(foundWords));
						message += ' Words: <i>';
						message += foundWords.join(', ');
						message += '</i>';
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
		var $div = $('<div/>').addClass('ck-message').html(message);
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