google.load("feeds", "1");
function initialize() {
  var username = $(".entry-footer span[data-user-name]").html();
  $(".tab-prof-img").append("<img src='http://cdn1.www.st-hatena.com/users/ml/"+username+"/profile.gif'>")
  $(".tab-profile > span").hide();
  $(".prof-"+username).show();
  var feedurl = "http://blog.monocklab.com/feed/category/"+username;
  var feed = new google.feeds.Feed(feedurl);
  feed.setNumEntries(10);
  feed.load(function (result){
    if (!result.error){
      for (var i = 0; i < result.feed.entries.length; i++) {
        var entry = result.feed.entries[i];
        var title = '<a href="' + entry.link + '">' + entry.title + '</a>';
        $('#feed').append('<li class="post"><ul>' + title + '</ul></li>');
        if ( i > 5 ) break;
      }
    }
  });
}
google.setOnLoadCallback(initialize);
(function($) {

  $.fn.ljTabs = function(options) {

      $(this).each(function(){

          var settings = $.extend({
              tabsList: 'ul:first-of-type',
              tabsListItems: 'li',
              tabsContent: '.tabs-content',
              tabsSections: 'article',
              inlineStyles: true
          }, options );

          var tabs = $(this),
              tabsList = tabs.find(settings.tabsList),
              tabsListItems = tabsList.children(settings.tabsListItems),
              tabsListItemsFirst = tabsListItems.first(),
              tabsContent = tabs.find(settings.tabsContent),
              tabsSections = tabsContent.find(settings.tabsSections),
              tabsSectionsFirst = tabsSections.first();

          // Add active class to first items
          if(!tabsList.find('.active').length) {
              tabsListItemsFirst.addClass('active');
          }

          if(!tabsContent.find('.active').length) {
              tabsSectionsFirst.addClass('active');
          }

          console.log(!tabsSections.find('.active').length);

          if(settings.inlineStyles === true) {

              tabsContent.css({
                  'position': 'relative',
                  'overflow': 'hidden',
                  'width': '100%'
              });

              tabsSections.css({
                  'position': 'absolute',
                  'top': 0,
                  'left': 0,
                  'opacity': 0
              });

              if(!tabsContent.find('.active').length) {
                  tabsSectionsFirst.css({
                      'opacity': 1
                  });
              } else {
                  tabsContent.find('.active').css({
                      'opacity': 1
                  });
              }

          }

          $(window).resize(function() {

              // アクティブタブのサイズ調整
              var activeHeight = tabsContent.find('.active').outerHeight();
              tabsContent.css({height: activeHeight});

          });

          $(window).trigger('resize');

          // タブクリック
          tabsListItems.click(function(){

              // クリックしたタグがアクティブ担ってる場合は何もしない
              if($(this).hasClass('active')){
                  return;
              };

              // .active クラスをはずす
              tabsListItems.removeClass('active');
              tabsSections.removeClass('active');

              if(settings.inlineStyles === true) {
                  tabsSections.css({'opacity': 0});
              }

              // .active クラスを付与
              $(this).addClass('active');

              // 表示するタブの高さ取得
              var newSection = tabsSections.eq($(this).index()),
                  newHeight = newSection.outerHeight();

              // 高さ調整と表示アニメーション
              tabsContent.animate({
                  height: newHeight
              },300, function(){
                  if(settings.inlineStyles === true) {
                      newSection.animate({opacity: 1});
                  } else {
                      newSection.addClass('active');
                  }
              });

          });

      });

   }
 $(document).ready(function() {
  $('.tabs').ljTabs();
});
})(jQuery);
