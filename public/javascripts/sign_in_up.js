var innerH = '<div class="signin_dialog" id="in_dialog" >'
		innerH+='<div class="signin_dialog_title" id="in_dialog_title"><span class="signin_title"><h3>登&nbsp;陆</h3></span><a class="signin_dialog_closebutton" href="javascript:hideDialog(\'in_dialog\');"></a></div>'
	innerH+='<div class="sign_layer"><form class="signin_layer" action="/login" method="post"><div class="signin_dialog_content">'
		innerH+='<div class="signin_dialog_input"><input type="email" name="userEmail" placeholder="请输入登陆账号" class="sign_dialog_input_username"></div>'
		innerH+='<div class="signin_dialog_input"><input type="password" name="password" placeholder="请输入账户密码" class="sign_dialog_input_password"></div>'
		innerH+='<div class="about_member_password">'
			innerH+='<input class="member_password" id="member_password" type="checkbox" value="member_password" checked="checked">'
			innerH+='<label class="member_passwordlabel" id="member_passwordlabel" for="member_Password">下次自动登录</label>'
			innerH+='<a class="forget_password rf" id="forget_password" href="#" target="_blank">忘记密码？</a>'
		innerH+='</div>'
		innerH+='<div class="signin_dialog_subbox">'
			innerH+='<input type="submit" value="确认登陆" class="signin_dialog_submit">'
			innerH+='<div class="no_account clearfix"><a class="no_account_number rf" id="no_account_number" href="javascript:hideDialog(\'in_dialog\');showDialog(\'up_dialog\');">无账号注册</a></div>'
		innerH+='</div>'
	innerH+= '</div></form></div>'
innerH+='</div>'

innerH+='<div class="signup_dialog" id="up_dialog" >'
	innerH+='<div class="signup_dialog_title" id="up_dialog_title"><span class="signup_title"><h3>注&nbsp;册</h3></span><a class="signiup_dialog_closebutton" href="javascript:hideDialog(\'up_dialog\');"></a></div>'
	innerH+='<div class="sign_layer"><form class="signup_layer" action="/reg" method="post"><div class="signup_dialog_content">'
			innerH+='<div class="signup_dialog_input"><input type="text" name="userNick" placeholder="请输入昵称" class="signup_dialog_input_nickname"></div>'
		innerH+='<div class="signup_dialog_input"><input type="email" name="userEmail" placeholder="请输入注册邮箱" class="sign_dialog_input_username"></div>'
		innerH+='<div class="signup_dialog_input"><input type="password" name="password" placeholder="请输入密码（6-16位,区分大小写,不可用空格）" class="sign_dialog_input_password"></div>'
		innerH+='<div class="signup_dialog_input"><input type="password" name="password-repeat" placeholder="确认密码" class="sign_dialog_input_password"></div>'
		innerH+='<div class="signup_dialog_subbox"><input type="submit" value="确认注册" class="signup_dialog_submit"></div>'
	innerH+='</div></form></div>'
innerH+='</div>'

innerH+='<div class="sign_mask" id="mask" onslectstart="return false"></div>'


var bodyE = document.body;
var login_view_page = document.createElement("div");
/*var lodin_node = document.createTextNode(innerH);
login_view_page.appendChild(lodin_node);*/
bodyE.appendChild(login_view_page);
login_view_page.id='login_view_page';
document.getElementById('login_view_page').innerHTML=innerH;







var option=document.getElementById("option");
var lis = option.childNodes;
for (var i = 0; i < lis.length; i++) {
		bgchange(lis[i]);
};


function bgchange(obj){
         obj.onmouseover = function (){
             obj.style.backgroundColor=' #fff';
         }
           obj.onmouseout = function (){
             obj.style.backgroundColor='';
         }
     }


//获取id
function getId(id){
	return document.getElementById(id);
}
//class
function getByClass(pId,className){
	var Arr = new Array(); //存储获取的c指定lass元素
	var parent = document.getElementById(pId)
	var oElements = parent.getElementsByTagName('*');
	for (var i = 0; i < oElements.length; i++) {
		if(oElements[i].className == className){
		Arr.push(oElements[i]);
	}
	}
	return Arr;
}

//自动居中，登陆浮层
function autoCenter(object){
	var bodyW=document.documentElement.clientWidth;
	var bodyH=document.documentElement.clientHeight;

	var objW = object.offsetWidth;
	var objH = object.offsetHeight;

	object.style.left = (bodyW - objW)/2+'px';
	object.style.top = (bodyH - objH)/2 + 'px';

}


//自动全屏，遮罩全屏
function fillToBody(object){
	object.style.width=document.documentElement.clientWidth + 'px';
	object.style.height=document.documentElement.clientHeight+ 'px';
}


//显示隐藏登录界面
function showDialog(id){
getId(id).style.display='block';
getId('mask').style.display='block';
autoCenter(getId(id));
fillToBody(getId('mask'));
mouseDrag(id);
}
function hideDialog(id){
getId(id).style.display='none';
getId('mask').style.display='none';
}






var isDraging = false;
var mouseOffsetX=0; //偏移
var mouseOffsetY=0;
//鼠标拖动
function mouseDrag(id){


 //是否可拖拽标记

//鼠标事件1 按下相对拖拽元素左上角坐标

getId(id+'_title').addEventListener('mousedown',function(e){
	var e = e || window.event;
	mouseOffsetX = e.pageX - getId(id).offsetLeft;  
	mouseOffsetY = e.pageY - getId(id).offsetTop;
	isDraging = true;
})
//鼠标事件2，移动 元素位置鼠标当前位置-相对拖拽元素位置

}

document.onmousemove = function(e){
	var e = e || window.event;

	var mouseX = e.pageX;//鼠标当前位置
	var mouseY = e.pageY;

	var moveX = 0;  //元素新位置 
	var moveY = 0;
	if (getId('up_dialog').style.display === "block") {
		id = 'up_dialog';

	}else if(getId('in_dialog').style.display === "block"){
		id = 'in_dialog';

	}

	if (isDraging === true ) {
		moveX = mouseX - mouseOffsetX;
		moveY = mouseY - mouseOffsetY;

		//限定可移动范围，move > 0 且 move < 页面宽高-浮层元素宽高
		var pageWidth = document.documentElement.clientWidth;
		var pageHeight = document.documentElement.clientHeight;


		var dialogWidth = getId(id).offsetWidth;
		var dialogHeight = getId(id).offsetHeight;

		var maxX = pageWidth - dialogWidth;
		var maxY = pageHeight - dialogHeight;

		moveX = Math.min( maxX,Math.max(0,moveX));
		moveY = Math.min( maxY,Math.max(0,moveY));

		getId(id).style.left = moveX + 'px';
		getId(id).style.top = moveY + 'px';
	}
}
//鼠标事件3，松开不可拖动
document.onmouseup = function(){
	isDraging = false;
}

window.onresize = function(){
	autoCenter(getId('up_dialog'));
	autoCenter(getId('in_dialog'));
fillToBody(getId('mask'));
}




//鼠标经过登陆区域，弹出个人信息框
var signId = getId('signined');
console.log(signId);
	if(signId){
getId('signined').addEventListener('mouseover',function(){
	getId('pop-message').style.display="block";
})
getId('signined').addEventListener('mouseout',function(){
	getId('pop-message').style.display="none ";
})
}