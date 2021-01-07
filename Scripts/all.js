/********************************/
/*  全てのページに適応するjavascript */
/*  作成日：2020年06月06日         */
/*  更新日：2020年08月27日         */
/*  作成者：Yomogi Mochi          */
/********************************/
$(function() {
    //スクロールによるヘッダーの動き
    /*
    var startPos = 0,scrollnum = 50;
    $(window).on('scroll',function(){
        winScrollTop = $(this).scrollTop();
        if (winScrollTop>=startPos || winScrollTop>=scrollnum) {
          $('#Header').addClass('hide');
        } else {
          $('#Header').removeClass('hide');
        }
        startPos = winScrollTop;
    });
    */


    function keep_scroll_reload() {
      console.log('leep scroll reload')
      //コピペ：https://qiita.com/tukiyo3/items/7f79d8217a0e46ecc64f
      // リロード TODO: ?が無い場合対応
      var re = /&page_x=(\d+)&page_y=(\d+)/;
      var page_x = document.documentElement ? document.documentElement.scrollLeft : document.body.scrollLeft;
      var page_y = document.documentElement ? document.documentElement.scrollTop : document.body.scrollTop;
      var position = '&page_x=' + page_x + '&page_y=' + page_y;
      if(!url.match(re)) {//初回
              location.href = url + position;
      } else {//2回目以降
              location.href = url.replace(/&page_x=(\d+)&page_y=(\d+)/,position);
      }
    }

    // スクロール位置を復元
    function restore_scroll() {
      var re = /&page_x=(\d+)&page_y=(\d+)/;
      if(window.location.href.match(re)) {
              var position = window.location.href.match(re)
              window.scrollTo(position[1],position[2]);
              console.log('スクロール位置を正す')
      }
    }

    $(window).load(function() {
          restore_scroll();
          console.log('windwo load完了')
    });


    // ユーザーエージェントの判別
    var userAgent = navigator.userAgent;

    // スマートフォンの場合はorientationchangeイベントを監視する
    if (userAgent.indexOf("iPhone") >= 0 || userAgent.indexOf("iPad") >= 0 || userAgent.indexOf("Android") >= 0)
        window.addEventListener("orientationchange", resizeHandler);
    else
        window.addEventListener("resize", resizeHandler);

    function resizeHandler() {
      console.log('resize')
      location.reload();
    }
});
