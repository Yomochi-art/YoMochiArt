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
          //$("img").each(function(){$(this).lazyload()});
          if (this[5] == null || this[5] == '') {
            this[5] = "./Illustration.html?val=" + this[0]
          }

          object = $('<a href="'+this[5]+'" class="Illustration_images"></a>')
          object2 = $('<img class="Illustration_images" src="'+url+'"></img>')
          object.append(object2); //リンクの下に画像を添付
          $("#Illustration_"+this[0]+"_Illusts").append(object);
          object.width(object.height())
          object2.width(object.height())//画像を正方形にする
          object2.height(object.height())//画像を正方形にする
      });
    });

});
