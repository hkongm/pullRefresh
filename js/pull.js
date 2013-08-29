(function ($) {
  $.fn.pullBar = function (options) {

    var defaults = {
      txt_refreshing: '刷新中...',
      txt_refreshtip: '下拉刷新',
      txt_errorMsg: 'AJAX加载出错',
      barid : 'pullBar',
      callback: function () {
        return confirm('关闭么?')
      }
    };

    var options = $.extend(defaults, options);

    var scrollbox = $('#wrapper'),
      loading = false,
      startY,
      tipbox = $('<div id="'+options.barid+'"><i class="fi-loop rotate"></i><em></em><i class="fi-x"></i></div>').prependTo(scrollbox);
    
    // 点击黄条叉子，关闭黄条
    tipbox.find('.fi-x').on('touchend',closeBar)
    
    $(document)
    // 开始
    .on('touchstart', function (e) {
      scrollbox.removeClass('trans');
      startY = e.touches[0].screenY;
    })
    // 结束
    .on('touchend', function (e) {
      if (loading) {
        tipbox.find('em').text(options.txt_refreshing);
        scrollbox
          .addClass('trans shown')
          .css('-webkit-transform', '')
        // 判断回调函数的返回值，关闭bar或者更改bar的文本
        if (options.callback()) {
          closeBar()
        } else {
          tipbox.find('em').text(options.txt_errorMsg);
        }
        loading = false;
      }
    })
    // 移动中
    .on('touchmove', function (e) {
      var currentY = e.touches[0].screenY;
      // 当前处于首屏，50像素容差值 && 向下滑动
      if (document.body.scrollTop < 50 && currentY > startY) {
        e.preventDefault(); // 重要！否则只捕获一次touchmove
        loading = true;
        tipbox.find('em').text(options.txt_refreshtip);
        var distance = currentY - startY;
        scrollbox.css('-webkit-transform', 'translateY(' + distance + 'px)');
      } else {
        loading = false;
      }
    })

    // 关掉Bar
    function closeBar() {
      scrollbox.css('-webkit-transform', 'translateY(0)')
    }
  }
})(Zepto)