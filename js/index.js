/*
$(function(){
    $("#content").load("templates/in_content.jsp",in_content);

    $(".nav_menu li").click(function(){
        $(this).attr("class","active").siblings().attr("class","unactive");
        var loadId = this.id;
        var url ="templates/"+ loadId +".jsp";

        switch (loadId){
            case "in_content":
                console.log(loadId)
                $("#content").load(url,in_content);
                break;
            case "friends":
                $("#content").load(url,friends);
                break;
            case "team":
                $("#content").load(url,team);
                break;
            case "studyCont":
                $("#content").load(url,studyCont);
                break;
            case "forum":
                $("#content").load(url,forum);
                break;

        }

    });
});
*/

function in_content(){
    //var data = getJsonData("in_content");

    carousel();
}

function friends(){
    var data = getJsonData("friends");
    var line = Math.round(data.length/4);
    console.log(line);
    var flag = "<img src='#'>";
    
    for( var i = 0;i < line;i++ ){
    	$("#conent_over").append("<ul class='img_column'></ul>")
    	 for( var j = 0;j<Math.min(4,data.length-4*i);j++ ){
    		 var num = i*4+j;
    	    	if(data[num]["graduation"]){
    	    		flag = "<img src='img/jiangpai.png' class='jiangpai'>";
    	    	}
    	    	
    	    	$(".img_column").eq(i).append(
    	    			" <li>" +
	    	    			"<div class='img_cover'>" +
    	    					"<h2>"+ data[num]["name"]+"</h2>" +
    	    					"<p>debug"+data[num]["enrollmentYear"]+"毕业生</p>" +
    	    					"<p"+data[num]["nowadays"]+"</p>" +
	    	    			"</div>" +
	    	    			"<img src='"+ data[num]["profilePicUrl"]+"' class='zhaopian'>" 
	    	    			+flag+
    	    			"</li>"
	    	    			);
    	    }
    }
    
    $("#conent_over li").each(function(index,e){
    	
    	e.onclick = function(){
    		for(var i = 0;i < data.length;i++){
    			friendInfo(data[index]);
    		}
    	};
    });
   
    
}

/**
 * 成员详细介绍
 * @param data 
 */
function friendInfo(data){
	console.log(data);
	 $("#content").load("templates/friends_detail.jsp",function(){
		 $("#head_txt").append("<span>"+data["name"]+"</span>");
		 $("#friends_over").append("<div class='friend_img'>" +
		 								"<img src='"+data["pictureUrl"]+"' class='friend_zhaopian'>" +
 									"</div>" +
									"<div class='friend_txt'>" +
										"<h2>"+data["name"]+"</h2>" +
										"<div class='biaoqian'><span>"+data["enrollmentYear"]+"级学生</span><span>"+data["nowadays"]+"</span></div>" +
		 								"<p>"+data["introduce"]+"</p>" +
 									"</div>");
 									})
	
}

/**
 * 良师益友
 */
function team(){
	var data = getJsonData("team",{"page":1});
	
    var i;
    for(i=1;i<=3;i++){
           $("#carousel_list").append("<li style='display: block' > " +
           "<img src="+ data[i]["bannerUrl"] +" class='carousel_img'> " +
           "<div class='ban_bg'> " +
           "<h2 class='ban_bg_title'>"+ data[i]["title"]+"</h2> " +
           "<p class='ban_bg_content'>" +
           + data[i]["text"]+
           "</p> " +
           "</div> " +
           "</li>");
   }
    carousel();
    goPage("team",{"page":1},3);

}

/**
 * 学习内容
 */
function studyCont(){
    var data = getJsonData("studyCont");
    console.log(Math.round(data.length/4));
    var sum = Math.round(data.length/4)+1;
    for(var i = 0;i < sum ;i++){
    	$("#studyContent").append("<div class='node'><ul></ul></div>");
    	for(var j = 0;j<Math.min(4,data.length-4*i);j++){
    		var num = i*4+j;
    		$("#studyContent ul").eq(i).append("<li class='show_img'>" +
							    				"<img src='"+data[num]["spicUrl"]+"' >" +
					    						"<div class='show_img_txt'>" +
				    								"<h3>【学习"+data[num]["stitle"]+"】</h3>" +
				    								"<p>"+data[num]["stxt"]+"</p>" +
			    								"</div>" +
    										"</li>");
    	}
    	
    }
    
    $("in_content li").each(function(index,e){
    	
    	e.onclick = function(){
    		goDetailList(data[index]["name"]);  ///TODO
    	};
    });
}

function forum(){
    var data = getJsonData("forum",{"page":1});
    forumList(data);
    goPage("forum",{"page":1},6);
    $("#submit").click(function(){
    	var submintData = {
    			fFitle: $("#fFitle").val(),
    			fTxt:$("#fTxt").val(),
    			fName:$("#fName").val()
    	};
    	
    	getJsonData("subForum",submintData);
        $("#content").load("templates/forum.jsp",forum);
    });
    
   
}


function forumList(data){
	   console.log(data);
		$("#newsOver").empty();
	   for(var i = 1;i<data.length;i++){
		   time=data[i]["fTime"].split("-");
	    	$("#newsOver").append("<div class='news' id = '"+data[i]["fId"]+"'>" +
	    								"<div class='date'>" +
	    									"<h3 class='day'>"+time[2]+"</h3>" +
	    									"<p class='year'>"+time[0]+"-"+time[1]+"</p>" +
	    								"</div>" +
	    									"<div class='newsTxt'>" +
	    											"<h3>"+data[i]["fTitle"]+"</h3>" +
	    											"<h5>"+data[i]["fAuthor"]+"</h5>" +
	    											"<p class ='skeletonize'>"+data[i]["fTxt"]+"</p>" +
	    									"</div>" +
	    							"</div>");
	    }
	   
	   var newsId = null;
	   $(".news").each(function(index,e){
		   e.onclick = function(){
			   newsId = this.id;
			   console.log(newsId);
			   for(var i=0;i<data.length;i++){
				   if(data[i]["fId"] == newsId){
					  goForumDetail(data[i]);
				   }
			   }
		   };
	   });
	   
	   
}

function goForumDetail(data){
	console.log(data);
	  $("#content").load("templates/txt_content.jsp",function(){
	        $("#head_line").append(" <p class='head_txt'><span>"+data["fTitle"]+"</span></p>")
	        $("#team_news_txt").append(" <div class='team_news_txt'> " +
	        "<h2>"+data["fTitle"]+"</h2> " +
	        "<div class='biaoqian'><span>日期："+data["fTime"]+"</span><span>作者："+data["fAuthor"]+"</span></div> " +
	        "<img src="+ data["photoUrl_1"]+" class='news_img'> " +
	        "<img src="+ data["photoUrl_2"]+" class='news_img'> " +
	        "<div class='txt'><p>"+data["fTxt"]+"</p></div> " +
	        "</div>");
	    });
}

function goNews(data){
    console.log(data);
    $("#content").load("templates/txt_content.jsp",function(){
        $("#head_line").append(" <p class='head_txt'><span>"+data["title"]+"</span></p>")
        $("#team_news_txt").append(" <div class='team_news_txt'> " +
        "<h2>"+data["title"]+"</h2> " +
        "<div class='biaoqian'><span>日期："+data["date"]+"</span><span>作者："+data["author"]+"</span></div> " +
        "<img src="+ data["photoUrl_1"]+" class='news_img'> " +
        "<img src="+ data["photoUrl_2"]+" class='news_img'> " +
        "<div class='txt'>"+data["text"]+"</div> " +
        "</div>")
    });


}


function newsList(data){
	$("#news_over").empty();
    for(var i=1;i<data.length;i++){

        var time = [];
        time=data[i]["date"].split("-");
        $("#news_over").append(" <div class='news' id  = "+data[i]['id']+" >" +
        "<div class='date'> " +
        "<h3 class='day'>"+time[2]+"</h3> " +
        "<p class='year'>"+time[0]+"-"+time[1]+"</p> " +
        "</div> " +
        "<div class='newsTxt'> " +
        "<h3>"+data[i]["title"]+"</h3>" +
        "<span class='skeletonize'>"+data[i]["text"]+"</span> " +
        "</div> " +
        "</div>")
    }
    var newsList = document.getElementsByClassName("news");
    for(var i=0;i<newsList.length;i++){
        newsList[i].onclick = function(){
            goNews(data[this.id]);
        }
    }
}
