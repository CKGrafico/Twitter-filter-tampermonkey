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
	 * Bind events of this module
	 */
	function bindEvents() {
		$('.ck-filter-close, .ck-filters').on('click', togglePanel);
		$('.ck-save').on('click', onSave);
	}

	/**
	 * Create config button and append in twitter menu
	 */
	function createButton() {
		var $container = $('.js-global-actions');
		var $li = $('<li/>').addClass('ck-filters');
		var $a = $('<a/>').addClass('js-nav').attr('href', '#').attr('title', 'Filter');
		var $span1 = $('<span/>').addClass('Icon Icon--newsBadge Icon--large');
		var $span2 = $('<span/>').addClass('text').text('Filters');

		$li
			.append(
				$a
					.append($span1)
					.append($span2)
				)
			.appendTo($container);
	}

	/**
	 * Create config panel and append to body
	 */
	function createPanel() {
		var local = g.getData();

		$container = $('<div/>').addClass('modal-container ck-filter-container');
		$close = $('<div/>').addClass('close-modal-background-target ck-filter-close');
		$modal = $('<div/>').addClass('modal-content ck-modal-content');
		$h2 = $('<h2/>').text('Filters configuration');
		$save = $('<button/>').addClass('small-follow-btn follow-btn btn small ck-save').text('Save');

		var $input1 = createInput(
			{
				label: 'Twitter accounts',
				name: 'accounts',
				placeholder: 'Charles, twitter, hater',
				description: 'Write twitter accounts to exclude, separated by commas',
				value: local.accounts || ''
			}
		);

		var $input2 = createInput(
			{
				label: 'Specific words',
				name: 'words',
				placeholder: 'hello, money, idiot',
				description: 'Write specific words to exclude, separated by commas',
				value: local.words || ''
			}
		);

		$modal
			.append($h2)
			.append($input1)
			.append($input2)
			.append($save);

		$container
			.append($close)
			.append($modal);

		$('body').append($container);
	}


	/**
	 * Open/Close configuration panel
	 */
	function togglePanel(e) {
		if(e) e.preventDefault();

		var nextState = 'block';

		if($('.ck-filter-container').css('display') === 'block') {
			nextState = 'none';
		}

		$('.ck-filter-container, .modal-overlay').css('display', nextState);
	}

	/**
	 * Create an input for the filter
	 */
	function createInput(options) {

		$inputContainer = $('<div/>').addClass('control-group');
		$label = $('<label/>').attr('for', 'ck-input-' + options.name).addClass('t1-label control-label').text(options.label);
		$controls = $('<div/>').addClass('controls');
		$input = $('<input/>').attr('id', 'ck-input-' + options.name).attr('type', 'text').attr('placeholder', options.placeholder).val(options.value);
		$p = $('<p/>').addClass('notification').text(options.description);

		$inputContainer
			.append($label)
			.append(
				$controls
					.append($input)
					.append($p)
			);

		return $inputContainer;
	}

	/**
	 * On click save button
	 */
	function onSave() {
		g.saveData();
		togglePanel();
		location.reload();
	}

	g.initializeEditor = initialize;
})(this, jQuery);