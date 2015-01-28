/*!
 * @author liujiaqi@cmcm.com
 */
;
(function($, win, doc, undefined){
    "use strict";

    $('#header').css(K.transition,'background 600ms ease,border-color 600ms ease').find('a').css(K.transition,'color 600ms ease');

//    添加视频
    var Play=createClass(function(){
        var src,
            self=this;

        this.frame=$('<div class="mediaframe wrapper"><div class="v"><a href="javascript:;" class="close"></a></div></div>').appendTo('body');

        if(H5Media.video){
            if(H5Media.video.ogg){

                src='video/baomi.ogv';
            }else if(H5Media.video.mp4){
                src='video/baomi'+(/android/i.test(navigator.userAgent)?'1':'')+'.mp4';
            }else if(H5Media.video.webm){
                src='video/baomi.webm';
            }
        }

        if(src){
            this.video=new H5Media({src:src,preload:'auto',className:'video',poster:'video/baomi.jpg'});
            !K.isMobile && !/played/.test(doc.cookie||'') && this.video.on('canplay',function(){
                if(!self.played){
                    self.show();
                    self.played=true;
                    var date=new Date();
                    date.setTime(+date+30*24*3600*1000);
                    doc.cookie='played=1;expires='+date.toUTCString()+';path=/;';
                }
            });
            this.video.on('end',function(){
                self.hide();
            });
            this.frame.find('.v').append(this.video.media);
        }else{
            this.frame.find('.v').append('<embed src="http://imgcache.qq.com/tencentvideo_v1/player/TPout.swf?autoplay=1&outhost=http://cf.qq.com/&skin=http://imgcache.qq.com/minivideo_v1/vd/res/skins/TencentPlayerMiniSkin.swf&vid=n0139biry2e&auto=1" allowFullScreen="true" quality="high" width="853" height="480" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>');
        }

        this.bindEvent();
    },{
        bindEvent:function(){
            var self=this;
            this.frame.find('.close').tap(function(){
                self.hide();
            });
        },
        show:function(){
            this.frame.fadeIn();
            this.play();
        },
        hide:function(){
            this.frame.fadeOut();
            this.stop();
        },
        play:function(){
            this.video && this.video.play();
        },
        stop:function(){
            this.video && this.video.pause().reset();
        }
    });

    $(doc).ready(function(){
//        创建整屏切换的class
        var PS=new pageSwitch('pageSwitch',{mousewheel:true,arrowkey:true}),
            body=$('body'),
//            创建导航navs:
//                <div id="navs">
//                      <a href="javascript:;"></a>*N
//                      N由#pageSwitch里的section数目决定
//                </div>
//            navs为导航下的每一个a标签
            navs=$('<div id="navs">'+$('#pageSwitch section').map(function(){
                return '<a href="javascript:;"></a>'
            }).get().join('')+'</div>').appendTo('#wrap').children(),
            footer=$('#footer'),
            play=new Play(),
            slider;


//      导航圆点点击页面切换
        navs.click(function(){
            PS.slide($(this).index());
            return false;
        }).eq(PS.current).addClass('active');
//      当页面不是前两页时，body的背景是light
        PS.on('before',function(prev,now){
            if(1<now){
                body.addClass('light');
            }else{
                body.removeClass('light');
            }
            if(prev!=now){
                navs.eq(prev).removeClass('active').end().eq(now).addClass('active');
            }
            /* 鏈睆鍥剧墖闆�
             if(!slider && now==5){
             slider=new pageSwitch($('#p6 ul')[0],{direction:0,transition:'scroll',loop:true});
             $('#p6 .nav').tap(function(){
             if($(this).hasClass('prev')){
             slider.prev();
             }else{
             slider.next();
             }
             });
             }
             */

            if(now==PS.length-1){
                footer.show();
            }else{
                footer.hide();
            }
        });

        $('#p1 .play').tap(function(){
            play.show();
        });

        $('#menu .apply, #p1 .apply').tap(function(){
            _hmt.push(['_trackEvent', 'link', 'click', '鐢宠鍏祴鎸夐挳', 1]);
        });
        $('#p1 .play').tap(function(){
            _hmt.push(['_trackEvent', 'link', 'click', '鎾斁鎸夐挳', 1]);
        });

    }).on('touchmove',function(ev){
            ev.preventDefault();
        });


})(jQuery, window, document);
