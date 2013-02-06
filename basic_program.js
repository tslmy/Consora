programs.push('help');
function program_help(){
	show('I won\'t.');
	return 0;
};
programs.push('lock');
function program_lock(){
	$("#semi-transperent_black").fadeIn();
	$('#semi-transperent_black').css('display','table');
	$('#input_bar').blur();
	return 0;
};
programs.push('cls');
function program_cls(){
	document.getElementById('console').innerHTML="";
	return 0;
};
programs.push('echo');
function program_echo(){
	show('<span class="quote">'+HTMLEnCode(command_para)+'</span>');
	return 0;
};
programs.push('reopen');
function program_reopen(){
	if (command_para == parseInt(command_para)) $('#user_created_'+command_para).show()
	else if (command_para[0]=='#') $(command_para).show()
	else if (command_para[0]!='#') $('#'+command_para).show();
	return 0;
};
programs.push('load');
function program_load(){
	$.get(command_para, function(result){
		tileCreate(HTMLEnCode(result));
		show('<span class="quote">'+HTMLEnCode(result)+'</span>');
	});
	return 0;
};
programs.push('prompt');
function program_prompt(){
	$('#prompt').html(command_para);
	show('Changing prompt to <span class="quote">'+command_para+'</span>.')
	return 0;
};
programs.push('h');
function program_h(){
	loadToConsole('text/help.txt');
	return 0;
};
programs.push('hide');
function program_hide(){
	current_height=document.getElementById('cmd').style.height;
	if (current_height!='20px') originalHeight=current_height;
	document.getElementById('cmd').style.height ='20px';
	return 0;
};
programs.push('show');
function program_show(){
	document.getElementById('cmd').style.height =originalHeight;
	return 0;
};
programs.push('exit');
function program_exit(){
	$('#cmd').css('-webkit-animation-name','push-out');
	show('<span class="tag error">[ERROR]</span>User has no right to shutdown the cloud. Contact Administrator <span class="quote">Tslmy</span>.')
	return 0;
};
programs.push('about');
function program_about(){
	loadToConsole('text/about.txt');
	return 0;
};
programs.push('c');
function program_c(){
	show ('<span class="tag">[TILE]</span>Tile <span class="quote">'+tileCreate(HTMLEnCode(command_para))+'</span> successfully created.');
	return 0;
};
programs.push('sort');
function program_sort(){
	i = 1;
	while (i<command_set.length) 
	{
		setTimeout("tileCreate('"+HTMLEnCode(command_set[i])+"');show('"+HTMLEnCode(command_set[i])+"')",command_set[i].length);
		i+=1;
	};
	return 0;
};
programs.push('bg');
function program_bg(){
	if (command_set.length == 1) $('#background').css("background", 'grey')
	else if (command_set.length == 2) $('#background').css("background", command_set[1])
	else if ((command_set.length > 2) && (command_set[1] == 'url')) $('#background').css("background", 'url('+command_set[2]+')');
	return 0;
};