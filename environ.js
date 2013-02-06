//Google Analysitcs. START
            var _gaq = _gaq || [];
            _gaq.push(['_setAccount', 'UA-21290300-1']);
            _gaq.push(['_trackPageview']); (function() {
                var ga = document.createElement('script');
                ga.type = 'text/javascript';
                ga.async = true;
                ga.src = ('https:' == document.location.protocol ? 'https://ssl': 'http://www') + '.google-analytics.com/ga.js';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(ga, s);
            })();
//Google Analysitcs. END

//string prototype enhancing, by Tslmy
function enhance_string_like_python (){
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
};
enhance_string_like_python();
//enhancing completed.

// drag to unlock START
$(function() {
	$("#slider").draggable({
		axis		: 'x',
		containment	: 'parent',
		drag		: function(event, ui) {if (ui.position.left > 210) 				{
							$("#semi-transperent_black").fadeOut();
							$('#input_bar').focus();
						}},
		stop		: function(event, ui) {
						if (ui.position.left <= 210) {
							$('#content').sticky('<div style="font-size:20px;text-align:center;font-family:Tahoma;font-weight:bold;">I AM<br />[][][][]<br />LOCKED</div>');
						}
						$(this).animate({left: 0});
						}
	});
});
// drag to unlock END

//HTML en/decoding START
function HTMLEnCode(str) {
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/&/g, "&gt;");
    s = s.replace(/</g, "&lt;");
    s = s.replace(/>/g, "&gt;");
    s = s.replace(/    /g, "&nbsp;");
    s = s.replace(/\'/g, "&#39;");
    s = s.replace(/\"/g, "&quot;");
    s = s.replace(/\n/g, "<br>");
    return s;
}
function HTMLDeCode(str) {
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/&gt;/g, "&");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&nbsp;/g, "    ");
    s = s.replace(/&#39;/g, "\'");
    s = s.replace(/&quot;/g, "\"");
    s = s.replace(/<br>/g, "\n");
    return s;
}
//HTML en/decoding END

function bindResize(handler, target) {
    //����Ҫ��ק�ı��С��Ԫ�ض���
    //handler ��ק�ֱ�; target Ҫ���ĳߴ��Ŀ��; minH ��С�߶�
    $(handler).mousedown(function(e) {
        handler.setCapture ? (//��׽����
        handler.setCapture(),
        handler.onmousemove = mouseMove,
        handler.onmouseup = mouseUp) : ($(document).bind("mousemove", mouseMove).bind("mouseup", mouseUp))//���¼�
        e.preventDefault()//��ֹĬ���¼�����
		windowHeight=document.body.clientHeight;
		maxHeight=parseInt(windowHeight*0.9);
		//��mouseMove�á���Ϊ����ס��handlerʱ���û���û���ı���������ڴ�С�ġ�
		preserve_height=parseInt($('#window').css('padding-bottom'));//window.getComputedStyle(document.getElementById('preserved_area')).height);
    });
    function mouseMove(e) {//�ƶ��¼�
		
        nowHeight = windowHeight - e.clientY - preserve_height;
		//����߶ȡ���Ϊ������Ǵ����濪ʼ������������������Ҫ�õ�ǰ��������ڸ߶�ȥ����
		if (nowHeight > maxHeight) {nowHeight = maxHeight};//���Ƹ߿�
        target.style.height = nowHeight + 'px'//���ô�С
    }
    //ֹͣ�¼�
    function mouseUp() {
        //��֧�� rhandlereaseCapture ��Щ����
        handler.rhandlereaseCapture ? (
        //�ͷŽ���
        handler.rhandlereaseCapture(),
        //�Ƴ��¼�
        handler.onmousemove = handler.onmouseup = null) : (
        //ж���¼�
        $(document).unbind("mousemove", mouseMove).unbind("mouseup", mouseUp))
    }
}

// levenshtein
function levenshtein(s1,s2){if(s1==s2){return 0}var s1_len=s1.length;var s2_len=s2.length;if(s1_len===0){return s2_len}if(s2_len===0){return s1_len}var split=false;try{split=!('0')[0]}catch(e){split=true}if(split){s1=s1.split('');s2=s2.split('')}var v0=new Array(s1_len+1);var v1=new Array(s1_len+1);var s1_idx=0,s2_idx=0,cost=0;for(s1_idx=0;s1_idx<s1_len+1;s1_idx++){v0[s1_idx]=s1_idx}var char_s1='',char_s2='';for(s2_idx=1;s2_idx<=s2_len;s2_idx++){v1[0]=s2_idx;char_s2=s2[s2_idx-1];for(s1_idx=0;s1_idx<s1_len;s1_idx++){char_s1=s1[s1_idx];cost=(char_s1==char_s2)?0:1;var m_min=v0[s1_idx+1]+1;var b=v1[s1_idx]+1;var c=v0[s1_idx]+cost;if(b<m_min){m_min=b}if(c<m_min){m_min=c}v1[s1_idx+1]=m_min}var v_tmp=v0;v0=v1;v1=v_tmp}return v0[s1_len]};


function loadJs(file){
    var scriptTag = document.getElementById('loadScript');
    var head = document.getElementsByTagName('head').item(0);
    if(scriptTag) head.removeChild(scriptTag);
    script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.id = 'loadScript';
    head.appendChild(script);
};
function loadCss(file){
    var cssTag = document.getElementById('loadCss');
    var head = document.getElementsByTagName('head').item(0);
    if(cssTag) head.removeChild(cssTag);
    css = document.createElement('link');
    css.href = file;
    css.rel = 'stylesheet';
    css.type = 'text/css';
    css.id = 'loadCss';
    head.appendChild(css);
}