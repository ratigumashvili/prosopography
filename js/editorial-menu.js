(function(){
    var ul=$("#editorial-navs"),li=$("#editorial-navs li"),i=li.length,n=i-1,r=70;
    ul.click(function(){
        $(this).toggleClass('active');
        if($(this).hasClass('active')){
            for(var a=0;a<i;a++){
                li.eq(a).css({
                    'transition-delay':""+(50*a)+"ms",
                    '-webkit-transition-delay':""+(50*a)+"ms",
                    'left':(r*Math.cos(90/n*a*(Math.PI/180))),
                    'top':(-r*Math.sin(90/n*a*(Math.PI/180)))	
                });
            }
        }else{
            li.removeAttr('style');
        }
    });
})($);