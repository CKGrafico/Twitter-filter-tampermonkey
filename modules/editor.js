/**
 * Create all things about filter
 */
(function(g, $){

	/**
	 * Initialize module
	 */
	var initialize = function() {
		createButton();
		createPanel();
		bindEvents();
	};

	/**
	 * Create config button and append in twitter menu
	 */
	function createButton() {
		var $container = $('.js-global-actions');
		var $li = $('<li/>').addClass('ck-filters');
		var $a = $('<a/>').addClass('js-nav').attr('href', '#').attr('title', 'Filter');
		var $span1 = $('<span/>').addClass('Icon Icon--newsBadge Icon--large');
		var $span2 = $('<span/>').addClass('text').text('Filters');
		$li.append($a.append($span1).append($span2)).appendTo($container);
	}

	/**
	 * Create config panel and append to body
	 */
	function createPanel() {
		$container = $('<div/>').addClass('modal-container ck-filter-container');
		$close = $('<div/>').addClass('close-modal-background-target ck-filter-close');
		$modal = $('<div/>').addClass('modal-content ck-modal-content').text('testong');

		$container.append($close).append($modal).appendTo($('body'));
	}

	/**
	 * Bind events of this module
	 */
	function bindEvents() {
		$('.ck-filter-close, .ck-filters').on('click', togglePanel);
		$('.ck-filter-close').on('click', closePanel);
		$(".ck-filter-dialog").draggable();
	}

	/**
	 * Open/Close configuration panel
	 */
	function togglePanel(e) {
		e.preventDefault();

		var nextState = 'block';

		if($('.ck-filter-container').css('display') === 'block') {
			nextState = 'none';
		}

		$('.ck-filter-container, .modal-overlay').css('display', nextState);
	}

	this.initializeEditor = initialize;
})(this, jQuery);