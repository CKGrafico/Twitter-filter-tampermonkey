/**
 * Functions for data
 */
(function(g, $){

	/**
	 * Save on localstorage all data
	 */
	function saveData() {
		localStorage.setItem('ckFilters', JSON.stringify({
			words: $('#ck-input-words').val(),
			accounts: $('#ck-input-accounts').val()
		}));
	}

	/**
	 * Get data from localstorage
	 */
	function getData() {
		if(localStorage.getItem('ckFilters')){
			return JSON.parse(localStorage.getItem('ckFilters'));
		}

		return false;
	}

	g.getData = getData;
	g.saveData = saveData;
})(this, jQuery);