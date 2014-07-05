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
		return JSON.parse(localStorage.getItem('ckFilters'));
	}

	this.getData = getData;
	this.saveData = saveData;
})(this, jQuery);