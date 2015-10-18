window.onload=function(){
	

}

function contentChange(){
	var person_Publish_Collect = document.getElementById('person_Publish_Collect');
	var lis = person_Publish_Collect.getElementsByTagName("li");
	var content_divs = person_Publish_Collect.getElementsByTagName
	for (var i = 0; i < lis.length; i++) {
		lis[i].index=i;
		lis[i].onclick = function(){
			for (var n = 0; n < lis.length; n++) {
				lis[i].className="";
			}
		}
	}

}

