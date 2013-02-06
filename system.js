var command_raw = "";//for gathering raw input
var command_para = "";
var command_set = [];
var command_para_set = [];
var originalHeight='300px';//for view's hide-and-see
/*_____                                 
 /  __ \                                
 | /   / ___ _ __  ___  ___  _ __ __ _ 
 | |   / _  | '_  / __|/ _  | '__/ _` |
 | \__/ (_) | | | \__ \ (_) | |  |(_| |
  \____/___/|_| |_|___/ ___/|_|  \__,_|
======================================================================
 */
$(document).ready(function(){//First steps to take just when the window is loaded
	//loadcode
	show('<pre style=\'font-family: "Courier New", Courier, monospace;line-height:12px;font-size:14px;\'>\n  _____                                 \n /  __ \\                                \n | /   \/ ___ _ __  ___  ___  _ __ __ _ \n | |   / _  \| \'_ \ / __|/ _ \ | \'__/ _` |\n | \\__/\ (_) | | | \\__ \\ (_) | |  |(_| |\n  \\____/\___/|_| |_|___/\ ___/|_|  \\__,_|\n\n\n - - La console, un morceau de ciel immense.\n\n                   Présenté par Tslmy\n\n\n>>> Initialization Completed.');
	$('#input_bar').focus();
	$('#view').dragscrollable({preventDefault: false});
	$("body").ajaxError(function(e,xhr,opt){
		show("<br><span class='tag error'>[ERROR]</span>Error requesting <span class='quote'>" + opt.url + "</span>: " + xhr.status + " " + xhr.statusText);
	});//setting exception handling
	bindResize(document.getElementById('resize_handle'),document.getElementById('view'));//Binding elements that need to drag to change the size of the the object
	$user_creatures=$("#user_creatures");
	$user_creatures.droppable({
		accept: "#dropbox .big_buttons",
		hoverClass: "content_hover",
		drop: function( event, ui ) {
				$user_creatures.append(ui.draggable);
				ui.draggable.removeClass('in_box');
			}
	});
	$dropbox=$('#dropbox');
	$dropbox.sortable({
		revert: true
	});
	$dropbox.droppable({
		accept: "#user_creatures .big_buttons",
		hoverClass: "dropbox_hover",
		drop: function( event, ui ) {
				$dropbox.append(ui.draggable);
				ui.draggable.addClass('in_box');
				ui.draggable.css({'left':'0','top':'0'});
				//ui.draggable.connectToSortable("#user_creatures");
				$dropbox.css('height',(parseInt($dropbox.children().length/4)+2)*50);
			}
	});
	$('#load_mask_text').html('Loaded.');
	$('#load_mask').fadeOut('slow',function(){$('#content').sticky('The page has loaded!');});
});


function enter(input_text){ //this function is binded to the enter-hitting event in the input bar
	if (typeof(input_text)=="undefined"){input_text = document.getElementById("input_bar").value};
	show($('#prompt').html() + HTMLEnCode(input_text));
	command_raw = input_text;
	command_set = input_text.strip().toLowerCase().split(' ');
	exec(command_set);
	//input_text='';
	document.getElementById("input_bar").value='';
};

function show(msg,feed_line)//this function will show you the basic difference between the two selectors: DOM and jQuery
{
	$("#console").append(msg + (feed_line==null?"<br />":''));//append is a method in jQuery, so changing it into "document.getElementById("console")." is absolutely wrong.
	view_object = document.getElementById("view");
	view_object.scrollTop = view_object.scrollHeight;//scrollTop is a method in DOM, so changing it into "$("#view")." is absolutely wrong.
};

// user_created_tiles START
user_created_tile_num=1;
//for coloring generated tiles START
function makeRandomColor_Child() {return parseInt(Math.random()*90)+100;};
function makeRandomColor() {return 'rgb('+makeRandomColor_Child()+','+makeRandomColor_Child()+','+makeRandomColor_Child()+')';};
//for coloring generated tiles END
function tileCreate(content,extental_css) 
{
	if (content == null) content='';
	if (extental_css == null) extental_css='';
	var id='user_created_'+user_created_tile_num;
	$("#user_creatures").append('<li class="big_buttons"  id="'+id+'" style="background-color:'+makeRandomColor()+';'+extental_css+'">'+content+"</li>");//onclick="$(this).hide();" 
	this_big_button = $('#'+id);
	this_big_button.draggable({
		revert: "invalid",
		start : function (event, ui) {
			$dropbox.addClass('box_open');//$dropbox.show('slide',"fast");
		},
		stop  : function (event, ui) {
			$dropbox.removeClass('box_open');//$dropbox.hide('slide',"fast");
		}
		//,cursor: "move"
	});
	user_created_tile_num+=1;
	return id;
};
// user_created_tiles END

//ajax START
function loadToConsole(fileName){
	show('<span class="tag">[AJAX]</span>Retrieving from server...',false);
	$.get(fileName, function(result){
		show('OK!<br><span class="quote">'+HTMLEnCode(result)+'</span>');
	});
	return 0;
}
//ajax END

//program manager START
program_packs=[
		['info',',me,'],
		['search',',s,']
		/* ,['overwrite_test',',cls,echo,'] */
	];
packs_installed=['basic'];
programs=['ins'];
//$( "#input_bar" ).autocomplete({source: programs, position: { my: "left bottom", at: "left top", collision: "none" }});
function pack_install(pack_name){
/* 		loadJs('program/pack_'+pack_name+'.js');
		show('<span class="tag">[OKAY]</span>Successfully installed package <span class="quote">'+pack_name+'</span>.'); */
		$.getScript(
			'program/pack_'+pack_name+'.js',
			function(){
				show('<span class="tag">[OKAY]</span>Successfully installed package <span class="quote">'+pack_name+'</span>.');
				packs_installed.push(pack_name);
				return 0;
			}
		);
		return 0;
};
function program_ins(){
	pack_name=command_para_set[0];
	if (packs_installed.indexOf(pack_name)>-1) {
		show('Package already installed.');
		return -1;
	};
	found_this=false;
	for (i in program_packs) {
		if (program_packs[i][0]==pack_name) {
			overwritten_programs=[];
			pack_content=program_packs[i][1];
			for (o in programs) {
				this_program=programs[o];
				if (pack_content.indexOf(','+this_program+',')>-1) 
				{
					overwritten_programs.push('<span class="quote">'+this_program+'</span>');
					overwritten_programs.push(', ');
				};
			};
			if (overwritten_programs.length>0) {
			show('Program '.join(overwritten_programs.slice(0,-1))+' will be overwritten/reloaded.');
			};
			found_this=true;
			break;
		};
	};
	if (!found_this) {show('<i>Warning! Package not logged in database.</i>')};
	return pack_install(pack_name);
};
//program manager END
function exec(command_set)
{
	command_name = command_set[0];
	command_para = command_raw.slice(command_name.length+1,command_raw.length);
	command_para_set = command_set.slice(1,command_set.length);
	//solution #1
	process_name = HTMLEnCode('program_'+command_name);
	process_result = 0;
	try
	   {
			eval('process_result='+process_name+'();');
	   }
	catch(err)
	   {
			show("<span class='tag error'>[ERROR]</span>"+err.message);
			console.log(err);
			if (err.name=='ReferenceError')
			{
				to_search=','+command_name+',';
				for (each_pack_num in program_packs) {
					if (program_packs[each_pack_num][1].search(to_search)>-1)//put your hands on the pack
					{
						show("<span class='tag'>[HINT]</span>You may want to install <span class='quote'>"+program_packs[each_pack_num][0]+'</span> pack first.');
						break;
					};
				};
				//levenshtein
				lv_commands=programs.sort(function(a,b){
				return levenshtein(command_name,a)-levenshtein(command_name,b)});
				show('<span class="hint">Did you mean: <span class="quote">'+lv_commands[0]+'</span>, <span class="quote">'+lv_commands[1]+'</span>, or <span class="quote">'+lv_commands[2]+'</span>?</span>');
			};
		};
   if (process_result!=0) 
		{show("<span class='tag error'>[Runtime Error]</span>Error processing <span class='quote'>"+command_name+'</span>.');};
};


