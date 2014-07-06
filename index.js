
// GPLv2 Licensed
// http://www.gnu.org/licenses/gpl-2.0.html
//
// ==UserScript==
// @name            Twitter-Filter
// @description     Active filter on twitter
// @namespace       http://ckgrafico.com
// @version         0.0.1
// @author          CKGrafico
// @include         https://www.twitter.com*
// @include         https://twitter.com*
// @include         http://www.twitter.com*
// @include         http://twitter.com*
// @resource        styles https://raw.githubusercontent.com/CKGrafico/Twitter-filter-tampermonkey/master/styles.css
// @run-at          document-end
// @require         http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js
// ==/UserScript==

(function($){

	GM_addStyle(GM_getResourceText('styles'));

	initializeEditor();
	filterStream();
})(jQuery);