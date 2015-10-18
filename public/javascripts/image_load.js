window.onload=function(){
	//waterfall('image_page','image_box');
	var dataInt = {"data":[{"src":'1.jpg'},{"src":'1.jpg'},{"src":'1.jpg'},{"src":'1.jpg'},{"src":'1.jpg'},{"src":'1.jpg'},{"src":'1.jpg'}]};
	window.onscroll=function(){		
		if(checkScrollSlide) {
			//数据库渲染到当前页面尾部
			var oParent = document.getElementById('image_page');
			for (var i = 0; i < dataInt.data.length; i++) {
				var oBox = document.createElement('div');oBox.className='image_box';oParent.appendChild(oBox);
				 var oPic = document.createElement('div');oPic.className='pic_style';oBox.appendChild(oPic);
				  var aImg = document.createElement('a');aImg.className='image';oPic.appendChild(aImg);
				   var oImg = document.createElement('img');oImg.src="images/"+dataInt.data[i].src;aImg.appendChild(oImg);
				   var ul= document.createElement('ul');oPic.appendChild(ul);
					var li1= document.createElement('li');ul.appendChild(li1);
					 var alike= document.createElement('a');alike.className='like';li1.appendChild(alike);
					  var like_num= document.createElement('span');like_num.className='like_num';alike.appendChild(like_num);
				    var li2= document.createElement('li');ul.appendChild(li2);
					 var acollect = document.createElement('a');acollect.className='collect';li2.appendChild(acollect);
				      var collect_num= document.createElement('span');collect_num.className='collect_num';acollect.appendChild(collect_num);
			}

		} 
	}

//over_view();
}

/*function waterfall(parent,box){
	//将parent下所有class为box元素取出
	var oBoxs=getByClass(parent,box);
	
}
*/
function getByClass(pId,className){
	var boxArr = new Array(); //存储获取的c指定lass元素
	var parent = document.getElementById(pId)
	var oElements = parent.getElementsByTagName('*');
	for (var i = 0; i < oElements.length; i++) {
		if(oElements[i].className == className){
		boxArr.push(oElements[i]);
	}
	}
	return boxArr;
}

function checkScrollSlide(){
	//检测是否加载数据块


	var oBoxs = getByClass('image_page','image_box');


	var lastBoxH = oBoxs[oBoxs.length-1].offsetTop + Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
console.log(lastBoxH);

    var  h=document.documentElement.scrollHeight
   || document.body.scrollHeight;
console.log(h);
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	var height = document.body.clientHeight || document.documentElement.clientHeight; 
console.log(scrollTop+height);


	return (h <= scrollTop+height) ? true :false;
}


//鼠标移动到图片上时，显示或隐藏喜欢与收藏图标
function over_view(){
var aImages = getByClass('image_page','image');
for (var i = 0; i < aImages.length; i++) {

	aImages[i].addEventListener('mouseover',function(){
		var ul_view = this.nextSibling;
		while (ul_view && ul_view.nodeType != 1) {
			ul_view = ul_view.nextSibling;
		} 
		ul_view.style.display='block';
	})
	aImages[i].addEventListener('mouseout',function(){
		var ul_view = this.nextSibling;
		while (ul_view && ul_view.nodeType != 1) {
			ul_view = ul_view.nextSibling;
		} 
		ul_view.style.display='none';
	})
}
}