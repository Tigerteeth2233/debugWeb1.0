/**
 * 异步获取Json数据
 * @param {Object} u
 * @param {Object} parameter
 * @param {Object} iData
 */
function getJson(parameter, iData) {
    console.log(iData);
    $.ajax({
        type: "get",
        url: "http://localhost/" + parameter,
        dataType: "json",
        data: iData,
        jsonp: "callback",
        jsonpCallback: "response",
        async: true
    });


}