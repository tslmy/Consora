$(document).ready(function(){
	loadCss('css/search.css');
	$('body').append('<aside id="search" style="display:none;"></aside>');
});//set the display area

var search_config = {
	perPage				: 8,	// A maximum of 8 is allowed by Google
	nowPage				: 0,		// The start page
	estimatedResultCount: 0,
	query				: ''
}
var resultsDiv = $('#search');
var apiURL = 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&callback=?';// URL of Google's AJAX search API

function search_process_result(result_object) {
	if(result_object.responseData==null){
		console.log('no results returned.');
	} else {
		search_config.estimatedResultCount = parseInt(result_object.responseData.cursor.estimatedResultCount);
		var results = result_object.responseData.results;
		resultsDiv.html('');//clear the battlefield
		for(var i=0;i<results.length;i++){
			result=results[i];//each result
			resultsDiv.append('<section class="search_result"><a class="search_cache" href="'+result.cacheUrl+'">&gt;</a><a class="search_title" href="'+result.unescapedUrl+'">'+result.title+'</a><span class="search_content">'+result.content+'</span></section>');
			show(i+'. <span class="quote">'+result.title+'</span>');
		}
	};
};

function search_more () {
	if(search_config.estimatedResultCount > (++search_config.nowPage)*search_config.perPage){
		command_para = search_config.query;
		program_s();
	} else {
		show('No more pages available.');
	};
};

function program_s(search_settings){
	switch (command_para)
	{
	case '': {
		//when no input is given, clear the battlefield.
		if (resultsDiv.css('display')=='none') {
			resultsDiv.show('slide',"fast");
		} else {
			resultsDiv.hide('slide',"fast");
		};
	}; break;
	
	case 'more': {
		search_more();
	}; break;
	
	default:
	//if it is a real search query,
		// If no parameters are supplied to the function,
		// it takes its defaults from the search_config object above:
		search_settings = $.extend({},search_config,search_settings);
		search_config.query=command_para;
		$.getJSON(
			apiURL,
			{//this gives parameters to jQuery's getJSON function, which will construct the final URL by itself
				q:command_para,
				rsz:search_settings.perPage,
				start:search_settings.nowPage*search_settings.perPage
			},
			search_process_result
		);
		resultsDiv.show('slide',"fast");
		
	};
	return 0;
};
programs.push('s');
