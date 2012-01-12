var command_raw = "";//for gathering raw input
var originalHeight='300px';//for cmd's hide-and-see



$(document).ready(function(){//First steps to take just when the window is loaded
	//loadcode
	show('<pre style=\'font-family: "Courier New", Courier, monospace;line-height:12px;font-size:14px;\'>\n\n  _____                                 \n /  __ \\                                \n | /   \/ ___ _ __  ___  ___  _ __ __ _ \n | |   / _  \| \'_ \ / __|/ _ \ | \'__/ _` |\n | \\__/\ (_) | | | \\__ \\ (_) | |  |(_| |\n  \\____/\___/|_| |_|___/\ ___/|_|  \\__,_|\n');
	$('#input_bar').focus();
	
	$("body").ajaxError(function(e,xhr,opt){
		show("<br><span class='tag error'>[ERROR]</span>Error requesting <span class='quote'>" + opt.url + "</span>: " + xhr.status + " " + xhr.statusText);
	});//setting exception handling
	bindResize(document.getElementById('resize_handle'),document.getElementById('cmd'),20);//Binding elements that need to drag to change the size of the the object
});

function enter(){ //this function is binded to the enter-hitting event in the input bar
	command_raw = document.getElementById("input_bar").value;
	show($('#prompt').html() + HTMLEnCode(command_raw));
	command_set = command_raw.strip().toLowerCase().split(' ');
	exec(command_set);
	command_raw='';
	document.getElementById("input_bar").value='';
};

function show(msg,feed_line)//this function will show you the basic difference between the two selectors: DOM and jQuery
{
	$("#console").append(msg + (feed_line==null?"<br />":''));//append is a method in jQuery, so changing it into "document.getElementById("console")." is absolutely wrong.
	console_object = document.getElementById("console");
	console_object.scrollTop = console_object.scrollHeight;//scrollTop is a method in DOM, so changing it into "$("#console")." is absolutely wrong.
};

// user_created_tiles START
user_created_tile_num=0;
//for coloring generated tiles START
function makeRandomColor_Child() {return parseInt(Math.random()*90)+100;};
function makeRandomColor() {return 'rgb('+makeRandomColor_Child()+','+makeRandomColor_Child()+','+makeRandomColor_Child()+')';};
//for coloring generated tiles END
function tileCreate(content,extental_css) 
{
	if (content == null) content='';
	if (extental_css == null) extental_css='';
	$("#content").append('<div class="big_buttons"  id="user_created_'+user_created_tile_num+'" onclick="$(this).hide();" style="background-color:'+makeRandomColor()+';'+extental_css+'">'+content+"</div>");
	user_created_tile_num+=1;
	return '#user_created_'+(user_created_tile_num-1);
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
program_packs=[['info',',me,']];
programs=[];
function pack_install(pack_name){
		$.getScript(
			'program/pack_'+pack_name+'.js',
			function(){show('<span class="tag">[OKAY]</span>Successfully installed package <span class="quote">'+pack_name+'</span>.');return 0}
		);
		return 0;
};
function program_ins(){return pack_install(command_para)};
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
		{show("<span class='tag error'>[ERROR]</span>Error processing <span class='quote'>"+command_name+'</span>.');};
};
