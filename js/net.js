/**
 * 异步获取Json数据
 * @param {Object} u
 * @param {Object} parameter
 * @param {Object} iData
 */
function getJsonData(parameter, iData) {
    console.log(		);
    var dataJson;
    $.ajax({
        type: "post",
        url: "/DebugWeb1.0/" + parameter,
        dataType: "json",
        data: iData,
        async: false,
        success:function(data){
        	dataJson = data;
        	console.log(data);
        },
        error:function (XMLHttpRequest, textStatus, errorThrown) {      
            console.log("失败");
        }
    });
    
    	return dataJson;
   
    

}

