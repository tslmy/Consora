var command_raw = "";

//string object enhancing, by Tslmy
if(typeof(String.prototype.strip) === "undefined")
{
    String.prototype.strip = function() 
    {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
};

if(typeof(String.prototype.join) === "undefined")
{
    String.prototype.join = function(set,connector) 
    {
		if (connector == null) connector='';
		output = String(this);
		for (i in set) output+=set[i]+connector;
        return output.slice(0,output.length-connector.length);
    };
};

if(typeof(String.prototype.find) === "undefined")
{
    String.prototype.find = function(for_what) 
    {
		str = String(this);
		result=str.indexOf(for_what);
		if (result==-1) result=str.length;
		return result;
	}
}

//enhancing completed.


$(document).ready(function(){//主过程
	//loadcode
	show('<pre style="line-height:12px;font-size:14px;">\n\n  _____                                 \n /  __ \\                                \n | /   \/ ___ _ __  ___  ___  _ __ __ _ \n | |   / _  \| \'_ \ / __|/ _ \ | \'__/ _` |\n | \\__/\ (_) | | | \\__ \\ (_) | | | (_| |\n  \\____/\___/|_| |_|___/\ ___/|_|  \\__,_|\n\n\n - - La console, un morceau de ciel immense.\n\n                   Présenté par Tslmy\n\n\n>>> Initialization Completed.');
	$('#input_bar').focus();
});

function enter(){
	command_raw = document.getElementById("input_bar").value;
	show("&gt;" + command_raw);
	command_set = command_raw.strip().toLowerCase().split(' ')
	exec(command_set);
	command_raw='';
	document.getElementById("input_bar").value='';
};

function show(msg)
{
	$("#console").append(msg + "<br />");
	document.getElementById("console").scrollTop = 99999;
};


function exec(command_set)
{
	command_name = command_set[0];
	switch (command_name)
	{
		case '':
		break;
		case 'help':
			show('I won\'t.');
		break;
		case 'echo':
			show(command_raw.slice(command_name.length+1,command_raw.length));
		break;
		case 'bg':
			if (command_set.length == 1) $('#background').css("background", 'grey')
			else if (command_set.length == 2) $('#background').css("background", command_set[1])
			else if ((command_set.length > 2) && (command_set[1] == 'url')) $('#background').css("background", 'url('+command_set[2]+')');
		break;
		default:
			show('Unknown command: '+command_name);
	};
};
