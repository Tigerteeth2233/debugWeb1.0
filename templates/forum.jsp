<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<div class="head_line other">
    <p class="head_txt"><span>论坛</span></p>
</div>

<div class="cover">
    <div class="in_content">
        <div class="node">
            <div class="news_over" id = "newsOver">
            </div>
        </div>
         <div class = "goPage" id = "goPage">
         </div>
    </div>
    <div class="write_report" accept-charset="utf-8" action="" method="post">
        <input type = "text"  id="fFitle" placeholder="标题">
     <!--    <input type="file" name="file">
    -->     <textarea placeholder="输入正文" id="fTxt"></textarea>
        <input placeholder="姓名" type="text" id="fName">
        <button id="submit" >提交</button>
    </div>

</div>