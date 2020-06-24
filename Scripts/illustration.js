/***********************************/
/*  illustrationに適応するjavascript */
/*  作成日：2020年06月07日            */
/*  更新日：                         */
/*  作成者：Yomogi Mochi             */
/***********************************/
$(function() {

  var query = location.search;
  var query_value = query.split('=');
  query_val = decodeURIComponent(query_value[1]);
  if(query_val=='undefined'){
    query_val='All';
  }
  /**********画像の読み込み****************/
  //クラスを全て取得する
  var classlist = ["Original","FanFiction","Vocaloid","Request"];
  $(window).on('load', function() {
      //初期設定
      $('#All').css("text-decoration","underline");
      $('#All').val('select');
      //表示する画像を設定する
      $.get("./CSV/Image_List.csv",function(data){
          var csv = $.csv.toArrays(data);
          var itemlist = '';
          $(csv).each(function(index){
            //jpgは圧縮されているので　-min.jpgを読み込む
            if (this[2] == 'jpg'){
              var url = "./Images/"+this[0]+"/"+this[1]+'-min.'+this[2];
            }else{
              var url = "./Images/"+this[0]+"/"+this[1]+'.'+this[2];
            }
            if (this[5] == null || this[5] == '') {
              this[5] = "./Illustration.html?val=" + this[0]
              var set_contents = $('<div class="grid '+this[0]+'"><div class="imgholder"><a href="'+this[5]+'"><img class="'+this[0]+'" src="'+url+'"></img></a></div><h2>'+this[4]+'</h2><div class="meta">'+this[3]+'</div></div>')

            }
            //要素を付けていく
            else{
              var set_contents = $('<div class="grid '+this[0]+'"><div class="imgholder"><a href="'+this[5]+'" target="_blank"><img class="'+this[0]+'" src="'+url+'"></img></a></div><h2>'+this[4]+'</h2><div class="meta">'+this[3]+'</div></div>')
            }
            $("div.container").append(set_contents);
            set_contents.ready(function(){
                select_images(query_val)
            });
          });
      });

    //$("img").each(function(){$(this).lazyload()});

    //オブジェクトを選択したものだけを表示するようにする
    $("p").click(function () {
      var id =  $(this).attr("id");
      val = $(this).val();
      //すでに選択中の場合
      if (val != 'select'){
        select_images(id)
      }
    });

  });

function select_images(lavelval){
    //選択中のオブジェクトから選択を外す
    $("p").each(function(){
      if (lavelval ==$(this).attr('id')){
        //選択したオブジェクトを選択中にする
        $(this).val('select');
        $(this).css("text-decoration","underline");
      }else{
        $(this).val('unselect');
        $(this).css("text-decoration","");
      }
    });
  if (lavelval == "All"){
    //全てのオブジェクト以外を表示にする
    $.each(classlist, function(index, value) {
      $("."+value).each(function(){
        $(this).css("display","");
      })
    })
  }else{
    //選択したオブジェクト以外を非表示にする
    $.each(classlist, function(index, value) {
      $("."+value).each(function(){
        if ($(this).hasClass(lavelval)){$(this).css("display","");}
        else{$(this).css("display","none");}
      })
    })
  }
  set_images()
}

var gridArray = [],
    colWidth,
    offsetX = 5,
    offsetY = 5,
    numOfCol = 5,
    elements,
    maringsize = 0/*追加*/,
    winObject;

function set_images(){
  /*********画像の配置(コピペ)*************/
  elements = $('#container');
     winObject = $(window);

     setCol();
     applyPinterestGrid();

     winObject.unbind('resize').resize(function() {
         var containerWidth;
         var winWidth = winObject.width() - offsetX * 2;
         if(winWidth < colWidth * numOfCol) {
             setCol();
             containerWidth =  colWidth * (numOfCol - 1);
         } else if (winWidth > colWidth * (numOfCol + 1)) {
             setCol();
             containerWidth =  colWidth * (numOfCol + 1);
         }
         if (containerWidth) {
             var current = elements.width();
             elements.width(colWidth * numOfCol);
             applyPinterestGrid();
         }
     });
}



  // Pinterest風グリッドレイアウト適用
  function applyPinterestGrid() {
      // 最初にgridArrayを初期化
      gridArray = [];
      // 空のgridArrayを作成する
      for (var i=0; i<numOfCol; i++) {
          pushGridArray(i, 0, 1, -offsetY);
      }

      $('.grid').each(function(index) {
        if ($(this).css('display') != 'none'){
          setPosition($(this));
        }
      });

      //最後にエレメントの高さを設定
      var heightarr = getHeightArray(0, gridArray.length);
      elements.height(heightarr.max + offsetY);
  }

  // カラムの数とwidthを設定する
  function setCol() {
      colWidth = $('.grid').outerWidth() + offsetX * 2;
      numOfCol = Math.floor((winObject.width() - offsetX * 2) / colWidth);
      /*console.log(colWidth)
      console.log(numOfCol)*/
      maringsize =  (winObject.width() - $('.grid').outerWidth() * numOfCol) / (numOfCol+1)
      /*console.log(winObject.width())
      console.log($('.grid').outerWidth())
      console.log(colWidth)
      console.log(numOfCol)
      console.log(maringsize)
      console.log(maringsize*(numOfCol+1)+ $('.grid').outerWidth() * numOfCol)
      */
  }
  // gridArrayに新しいgridを追加
  function pushGridArray(x, y, size, height) {
      for (var i=0; i<size; i++) {
          var grid = [];
          grid.x = x + i;
          grid.endY = y + height + offsetY * 2;
          gridArray.push(grid);
      }
  }
  // gridArrayから指定したx位置にあるgridを削除
  function removeGridArray(x, size) {
      for (var i=0; i<size; i++) {
          var idx = getGridIndex(x + i);
          gridArray.splice(idx, 1);
      }
  }
  // gridArray内にある高さの最小値と最大値および最小値のあるx値を取得
  function getHeightArray(x, size) {
      var heightArray = [];
      var temps = [];
      for (var i=0; i<size; i++) {
          var idx = getGridIndex(x + i);
          temps.push(gridArray[idx].endY);
      }
      heightArray.min = Math.min.apply(Math, temps);
      heightArray.max = Math.max.apply(Math, temps);
      heightArray.x = temps.indexOf(heightArray.min);
      return heightArray;
  }
  // gridのx値を基準にgridのインデックスを検索
  function getGridIndex(x) {
      for (var i=0; i<gridArray.length; i++) {
          var obj = gridArray[i];
          if (obj.x === x) {
              return i;
          }
      }
  }
  // gridを配置
  function setPosition(grid) {
      if(!grid.data('size') || grid.data('size') < 0) {
          grid.data('size', 1);
      }
      // gridの情報を定義
      var pos = [];
      var tempHeight = getHeightArray(0, gridArray.length);
      pos.x = tempHeight.x;
      pos.y = tempHeight.min;
      var gridWidth = colWidth - (grid.outerWidth() - grid.width());
      // gridのスタイルを更新     // ※補足3

      grid.css({
          'left': pos.x * colWidth + maringsize,
          'top': pos.y,
          'position': 'absolute'
      });
      // gridArrayを新しいgridで更新
      removeGridArray(pos.x, grid.data('size'));
      pushGridArray(pos.x, pos.y, grid.data('size'), grid.outerHeight());
  }
  //IE用にArray.indexOfメソッドを追加  // ※補足4
  if (!Array.prototype.indexOf) {
      Array.prototype.indexOf = function(elt /*, from*/) {
          var len = this.length >>> 0;
          var from = Number(arguments[1]) || 0;
          from = (from < 0) ? Math.ceil(from) : Math.floor(from);
          if (from < 0) {
              from += len;
          }
          for (; from < len; from++) {
              if (from in this && this[from] === elt) {
                  return from;
              }
          }
          return -1;
      };
  }


});
