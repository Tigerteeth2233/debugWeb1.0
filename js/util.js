/**
 * Created by wsy123 on 2017/6/10.
 */
var timer;

function carousel (){
    clearInterval(timer);
    console.log("15210");
    var cur = 1;
    $("#carousel_list img").each(function(i){
        $("#point").append("<li class='point_li'></li>");
    });
    $("#point li").each(function(i){
        $(this).click(function(){

            cur = i;
            $(this).attr("class","point_li_click").siblings().attr("class","point_li");
            $("#carousel_list li").siblings().fadeOut("3000").eq(i).fadeIn("3000");

        })
    })
    timer = setInterval(function(){
        var go = (cur) % 3;
        $("#point li").eq(go).click();
        cur++;
    },3000);
    $("#carousel_list li,#point li").hover(function(){
        clearInterval(timer);
    },function(){
        timer = setInterval(function(){
            var go = (cur+1) % 3;
            $("#point li").eq(go).click();
            cur++;
        },3000);
    })

};


/**
*
* @param parameter 地址参数
* @param goPage 需要获取的页数
* @param column 每页显示条数
*/
function goPage(parameter,goPage,column){
   var data = getJsonData(parameter,{"page":goPage});
   switch(parameter){
   case "team" :newsList(data);break;
   case "forum" :forumList(data);break;
   }
   
   var pagesSum = data[0]/column+1;
   for(var j=1;j<=pagesSum;j++){
       $("#goPage").append("<a>"+j+"</a>");
   }

   $("#goPage a").each(function(index){
	  
       $(this).bind("click",function(event){
    	   console.log(index);
           var page = {"page":index+1};
           $(this).className = "pageClick";      //todo样式改变
           var listData = getJsonData(parameter,page);
           switch(parameter){
           case "team" :newsList(listData);break;
           case "forum" :forumList(listData);break;
           }

       })
   })
   return data;
}


