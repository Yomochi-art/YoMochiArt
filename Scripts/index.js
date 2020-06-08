/********************************/
/*  ホームのみに適応するjavascript  */
/*  作成日：2020年06月06日         */
/*  更新日：                      */
/*  作成者：Yomogi Mochi          */
/********************************/
//$(function() {
  $(document).ready(function(){
    $.get("./CSV/Image_List.csv",function(data){
        var csv = $.csv.toArrays(data);
        var itemlist = '';
        $(csv).each(function(index){
          //jpgのみ圧縮されている
          if (this[2] == 'jpg'){
            var url = "./Images/"+this[0]+"/"+this[1]+'-min.'+this[2];
          }else{
            var url = "./Images/"+this[0]+"/"+this[1]+'.'+this[2];
          }
          object = $('<img class="Illustration_images" src="'+url+'"></img>')
          $("#Illustration_"+this[0]+"_Illusts").append(object);
          //画像のサイズを正方形にトリミングする
          /*$("img.Illustration_images").each(function(){
            $(this).width($(this).height());
          });
          */
          object.width(object.height())
          
          //$("img").each(function(){$(this).lazyload()});

      });
    });

});
