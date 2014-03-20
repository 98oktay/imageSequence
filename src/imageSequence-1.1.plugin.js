/**
 * Created by 98Oktay on 30.11.2013.
 */


$.fn.imageSequence = function(opts){
    var o = $.extend({
        namepattern :   "image-#.png",
        startnum:       0,
        endnum:         10,
        repeat:         -1,
        reverse:        0,
        starton:        'load'
    },opts);

    function pad(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

    function getScrollTop(){
        if(typeof pageYOffset!= 'undefined'){
            //most browsers except IE before #9
            return pageYOffset;
        }
        else{
            var B= document.body; //IE 'quirks'
            var D= document.documentElement; //IE with doctype
            D= (D.clientHeight)? D: B;
            return D.scrollTop;
        }
    }

    $(this).each(function(){
        var op = $(this).data();

        var $image = $(this);
            if(!this.id){ this.id = "imageSequence-object-"+(Math.random()*100000000000).toString(16).split(".")[0];}
        var id = this.id;
        var startNum = parseInt(op.startnum,10);
        var endNum = parseInt(op.endnum,10);
        var ncount   = op.namepattern.match(/(#+)/);
            ncount   = ncount?ncount[0].length:1;
        var srcpattern = op.namepattern.replace(".","\\.").replace(/(#+)/,".{"+ncount+"}");
            srcpattern = new RegExp("("+srcpattern+")");
        var orgsrc = this.src;
        var _progress= 0;
        var direction = 1;
        var $progresswrapper = null;
        var $progressnode = null;
        var $wdiv = null;

        var $scrollobj = $wdiv;
        var repeated = 0;



        function _create_progress(){
            $progresswrapper = $('<div class="imageSequence-progress-wrapper"><span></span></div>');

            $progresswrapper.css({width:100,height:6,border:"1px solid #666",position:'absolute',left:"50%",top:"50%","margin-left":-50,"margin-top":-3,background:"rgba(255,255,255,.8)"});
            $progressnode = $progresswrapper.find("span");
            $progressnode.css({display:"block",width:0,height:6,background:"#aaa"});
        }

        function _create_wrapper(){
            $wdiv = $('<div class="imageSequence-wrapper-div"></div>');

            $scrollobj = $wdiv;
            _create_progress();
            if(op.positionfixer){
                if($image.css("marginBottom")){
                    op.positionfixer+=parseInt($image.css("marginBottom"),10);
                }
                $image.css("marginBottom",op.positionfixer);
            }
            var image_css = $image.cssAll("position,left,top,right,bottom,margin-left,margin-top,margin-bottom,margin-right,float,background,border,border-radius,opacity,box-shadow");
            var image_sizes = $image.cssAll("width,height,max-width,max-height");
            image_css.textAlign="left";
			if(image_css.position != "absolute" && image_css.position != "fixed"){
				image_css.position = "relative";
			}
            
            image_css.display=image_css.position=='block'?'block':"inline-block";

            $wdiv.css(image_css);
            if(startNum<endNum) {
                for(var _p=startNum; _p<=endNum; _p++){
                    var numbers = pad(_p,ncount);
                    var nname = op.namepattern.replace(/(#+)/,numbers);

                    var nsrc = orgsrc.replace(srcpattern,nname);
                    var $im = $("<img >");
                    $im.attr('src',nsrc);
                    $im.appendTo($wdiv);
                    $im.css({position:"absolute",visibility:'hidden',left:0,top:0,width:"100%",height:"100%"});
                    if(_p==startNum)$im.css({visibility:'visible'});
                }
            }else {
                for(var _p=startNum; _p>=endNum; _p--){
                    var numbers = pad(_p,ncount);
                    var nname = op.namepattern.replace(/(#+)/,numbers);

                    var nsrc = orgsrc.replace(srcpattern,nname);
                    var $im = $("<img >");
                    $im.attr('src',nsrc);
                    $im.appendTo($wdiv);
                    $im.css({position:"absolute",visibility:'hidden',left:0,top:0,width:"100%",height:"100%"});
                    if(_p==endNum)$im.css({visibility:'visible'});
                }
                var _startNum = endNum;
                endNum = startNum;
                startNum = _startNum;

            }
            var height_val = $image[0].style.height;
            $wdiv.css({height:height_val});
            $wdiv.find("img").eq(0).css({display:'block',position:'relative',maxWidth:image_sizes["max-width"], maxHeight:image_sizes['max-height']});
            _progress = $wdiv.find("img[src*='"+nname+"']").index();

            console.log(_progress, nname);
            $wdiv.children("img").eq(_progress).css({visibility:'visible'}).siblings("img").css({visibility:'hidden'});
            $image.after($wdiv);
            $wdiv.append($progresswrapper);
            if($image.is(".sequence-alternate")){ $wdiv.hide();

                /*var $origin = $("#"+$image.data("alternate-of"));
                $wdiv.width($origin.width());
                $wdiv.find("img").height($origin.height());*/
            }
        }

        function _matchsize_wrapper(img,$div){

            return false;
            var $firstimg = $wdiv.find('img').eq(0);
            var width = $firstimg.width();
            $wdiv.find('img').not($firstimg).width(width);

            return false;
            var sizeproblem = false;
            var hidden = false;
            if($div.is(":visible")){
                hidden = true;
                $div.show();
            }
            if($(img).width() < 5 || $(img).height() < 5) {
                sizeproblem = true;
                $div.parents(".slide").show();
            }

            $div.width($(img).width());
            $div.height($(img).height());

			$div.find("img").width($(img).width());
            $div.find("img").height($(img).height());
            if(sizeproblem == true){
                $div.parents(".slide").hide();
            }
            if(hidden == true){
                $div.hide();
            }
        }

        $(window).on("resize",_matchsize_wrapper);


        var _timer   = null;
        function _start(){
            if(op.starton == "load"){
                _play();
            }else if(op.starton == "scrolling"){
                _scrollevents();
            }else if(op.starton == "navigation"){
                _navigationevents();
            }
            else if(op.starton == "drag"){
                _navigationevents();
                _create_drag();
            }
            else if(op.starton == "win-width"){
                _navigationevents();
                _create_winwidth();
            }
            else if(op.starton == "win-height"){
                _navigationevents();
                _create_winheight();
            }
        }

        function _create_winwidth(){

            $wdiv.children("img").css({'-webkit-user-select': 'none','-webkit-touch-callout':'none'});
            var parc = 1.8;
            $(window).on("mousemove",function(e){

                var pr = (((e.clientX / $(window).width()) -.5 )*parc +.5) * (endNum-startNum);
                var _pos =  Math.round(pr);
                if(op.easing){
                    _pos =  Math.floor(pr);
                    var opac =  (pr-_pos);
                }
                _pos = Math.max(startNum-1,Math.min(endNum,_pos));
                $wdiv.children("img").eq(_pos).css({visibility:'visible', opacity:1}).siblings("img").css({visibility:'hidden', opacity:0});
                if(op.easing){
                    if(opac>=0 && pr>0) {
                        opac = opac * op.easing;
                        $wdiv.children("img").eq(_pos+1).css({visibility:'visible', opacity:opac})
                    }
                }

            });
        }

        function _create_winheight(){

            $wdiv.children("img").css({'-webkit-user-select': 'none','-webkit-touch-callout':'none'});
            var parc = 1.8;
            $(window).on("mousemove",function(e){
                var cY = e.clientY;
                var pr = (((cY / $(window).height()) -.5 )*parc +.5) * (endNum-startNum);
                var _pos =  Math.round(pr);
                if(op.easing){
                    _pos =  Math.floor(pr);
                    var opac =  (pr-_pos);
                }
                _pos = Math.max(startNum-1,Math.min(endNum,_pos));
                $wdiv.children("img").eq(_pos).css({visibility:'visible', opacity:1 }).siblings("img").css({visibility:'hidden', opacity:0});
                if(op.easing){
                    if(opac>=0 && pr>0) {
                        opac = opac * op.easing;
                        $wdiv.children("img").eq(_pos+1).css({visibility:'visible', opacity:opac})
                    }
                }
            });
        }

        var $draghandler = null;
        var dragging = false;
        function _create_drag(){
            $draghandler = $('<div></div>')
            $draghandler.css({position:'absolute',left:0,top:0,width:"100%",height:"100%",background:"red",opacity:0,cursor:'-webkit-grab','-webkit-user-select': 'none','-webkit-touch-callout':'none'}); //cursor:-webkit-grabbing
            $wdiv.children("img").css({'-webkit-user-select': 'none','-webkit-touch-callout':'none'});
            $draghandler.appendTo($wdiv);
            var snappos = {x:0,y:0};
            var curpos  = {x:0,y:0};
            var easingspeed = 0;
            var slower = 50;
            var diff = 0;
            var speedmeter_timer = null;
            $draghandler.on("mousedown",function(e){
                dragging = true;
                ldiff = 0;
                diff = 0;
                easingspeed = 0;
                snappos.x = e.clientX;
                snappos.y = e.clientY;
                curpos.x = e.clientX;
                curpos.y = e.clientY;
                $draghandler.css({cursor:'-webkit-grabbing'});
                if(speedmeter_timer)clearInterval(speedmeter_timer);
                if(_timer)clearTimeout(_timer);
                if(op.easing){

                    speedmeter_timer = setInterval(_speedmeter,20);
                }
            });

            $(document.body).on("mousemove",function(e){
                if(dragging){
                    curpos.x = e.clientX;
                    curpos.y = e.clientY;
                    diff = (curpos.x-snappos.x)/slower;
                    if(op.dragy){
                        diff = (curpos.y-snappos.y)/slower;
                    }

                    var _pos = ((endNum-startNum)+ _progress + Math.round(diff)) % (endNum-startNum+1);

                    $wdiv.children("img").eq(_pos).css({visibility:'visible'}).siblings("img").css({visibility:'hidden'});
                    if($image.is(".sequence-alternate")){
                        var $origin = $("#"+$image.data("alternate-of"));
                        $origin.data('sequence-instance')._positiongoto(_pos);
                    }else {
                        var $mirrors =$(".sequence-alternate[data-alternate-of="+id+"]");
                        $mirrors.each(function(){
                            $(this).data('sequence-instance')._positiongoto(_pos);
                        });
                    }
                }
            });
            $(document.body).on("mouseup",function(){

                if(speedmeter_timer)clearInterval(speedmeter_timer);
                if(dragging){
                    easingspeed = ldiff-diff;
                    dragging = false;
                    diff = (curpos.x-snappos.x)/slower;
                    if(op.dragy){
                        diff = (curpos.y-snappos.y)/slower;
                    }
                    var _pos = ((endNum-startNum) + _progress + Math.round(diff)) % (endNum-startNum);
                    snappos = {x:0,y:0};
                    _progress=_pos;
                    $draghandler.css({cursor:'-webkit-grab'});
                    if(op.easing){
                        var newpo = Math.round(_progress - 10*easingspeed);
                        if(Math.abs(easingspeed)>0.1){
                            if(_timer)clearTimeout(_timer);
                            _positiongoto(newpo,true);
                            if($image.is(".sequence-alternate")){
                                var $origin = $("#"+$image.data("alternate-of"));
                                $origin.data('sequence-instance')._positiongoto(newpo,true);
                            }else {
                                var $mirrors =$(".sequence-alternate[data-alternate-of="+id+"]");
                                $mirrors.each(function(){
                                    $(this).data('sequence-instance')._positiongoto(newpo,true);
                                });
                            }
                        }
                    }
                }

            });

            var ldiff = 0;
            function _speedmeter(){
                ldiff -= (ldiff-diff)/3;
            }
        }


        function _play(){
            if(_timer)clearTimeout(_timer);
            $image.data('playing',1);
            _timer = setInterval(_loop,1000/30);
        }

        function _navigationevents(){
            $(".image-sequence-button[rel='"+id+"']").on('click',function(e){
                e.preventDefault();
                if($(this).is(".image-sequence-pause")){

                }
                else if($(this).is(".image-sequence-play")){

                }
                else if($(this).is(".image-sequence-pause")){

                }else if($(this).is(".select-alternate")){
                    $wdiv.hide();
                    var hrlid = this.href.split("#").pop();
                    var relid = $(this).attr("rel");
                    var $mirrors =$(".sequence-alternate[data-alternate-of="+relid+"]+.imageSequence-wrapper-div");
                    $mirrors.hide();

                    $("#"+hrlid+"+.imageSequence-wrapper-div").hide().fadeIn();




                }
                else {
                    var _p = parseInt(this.href.match(/(\d+)$/).pop(),10);
                    var numbers = pad(_p,ncount);
                    var nname = op.namepattern.replace(/(#+)/,numbers);
                    var pos = $wdiv.children("img").filter("[src*='"+nname+"']").index();
                    _positiongoto(pos);
                }
            });
        }
        var lastposgoto = -1;
        var usecont = false;
        function _positiongoto(pos,cont){

            if(typeof(pos) == "undefined"){
                var pos = lastposgoto;
            }else {
                lastposgoto = pos;
            }
			if(cont) usecont = true;
            if(_timer)clearTimeout(_timer);
            if(_progress<pos){
                _progress++;
            }else if(_progress>pos){
                _progress--;
            }
            var speed = Math.max(3,Math.abs(_progress-pos)*3);
			var _p = _progress;
			if(usecont){
				_p = _progress%(endNum-startNum)
			}
            $wdiv.children("img").eq(_p).css({visibility:'visible'}).siblings("img").css({visibility:'hidden'});
            if(_progress!=pos){
                _timer = setTimeout(_positiongoto,1000/speed);
            }
        }
        this._positiongoto = _positiongoto;
        $image.data('sequence-instance',this);


        function _scrollevents(){
            $(window).on("scroll",function(e){
                var wdivtop = $scrollobj.offset().top;
                var wdivheight = $wdiv.height();
                var winheight = $(window).height();
                var scrollstartpoint = wdivtop+wdivheight-winheight;
                var scrollendpoint = wdivtop;
                var scrposs = getScrollTop();
                if(op.positionfixer){
                    scrollstartpoint = wdivtop - ( winheight - wdivheight) / 2 ;
                    scrollendpoint = scrollstartpoint + op.positionfixer;
                }
                var _p = (scrposs-scrollstartpoint)/(scrollendpoint-scrollstartpoint);
                _p = Math.min(1,Math.max(0,_p));
                _showprogress(_p);
                if(op.positionfixer){
                    _positionfixer(scrposs);
                }

            });
        }

        function _loop(){

            if(op.repeat>0 && repeated>=op.repeat){
                _stop();
            }
            $wdiv.children("img").eq(_progress).css({visibility:'visible'}).siblings("img").css({visibility:'hidden'});
            _progress += direction;
            if(op.yoyo){
                if(_progress>=(endNum-startNum)){
                    direction =-1;
                    _progress--;
                    repeated++;
                    if(op.repeat>0 && repeated>=op.repeat){
                        _progress++;
                    }

                }
                if(_progress<0){
                    direction =1;
                    _progress++;
                    repeated++;
                    if(op.repeat>0 && repeated>=op.repeat){
                        _progress--;
                    }
                }
            }else {
                if(_progress  == (endNum-startNum)) repeated++;
                if(op.repeat == -1)_progress = _progress % (endNum-startNum);
                else if(op.repeat>0 && repeated<op.repeat){
                    _progress = _progress % (endNum-startNum);
                }
            }
        }

        function _showprogress(pr){

            _progress = Math.round(pr*(endNum-startNum));
            $wdiv.children("img").eq(_progress).css({visibility:'visible'}).siblings("img").css({visibility:'hidden'});
        }

        function _positionfixer(pos){
            var topcenterpos = $(window).height()/2 - $image.height()/2;
            if(!$wdiv.hasClass("imageSequence-posfixed") && pos >= $scrollobj.offset().top-topcenterpos
                && pos < $scrollobj.offset().top-topcenterpos + op.positionfixer){

                $wdiv.addClass("imageSequence-posfixed");
                $scrollobj = $image;
                $image.css({visibility:"hidden"});
                $image.show();
                var lfv = $image.offset().left;
                if($image.css("marginLeft")){
                    lfv -= parseInt($image.css("marginLeft"),10);
                }
                var tpv = topcenterpos;
                $wdiv.css({position:"fixed",left:lfv, top:tpv});
                $wdiv.find('img').css({top:0});

            }else if($wdiv.hasClass("imageSequence-posfixed") && pos < $scrollobj.offset().top-topcenterpos){
                $wdiv.removeClass("imageSequence-posfixed");
                $scrollobj = $wdiv;
                $wdiv.css({position:"relative",left:0, top:0});
                $wdiv.find('img').css({top:0});
                $image.hide();
            }else if($wdiv.hasClass("imageSequence-posfixed") && pos >= $scrollobj.offset().top-topcenterpos + op.positionfixer){
                $wdiv.removeClass("imageSequence-posfixed");
                $scrollobj = $wdiv;
                $wdiv.css({position:"relative",left:0, top:0});
                $wdiv.find('img').css({top:op.positionfixer});
                $image.hide();
            }


        }

        function _stop(){
            $image.data('playing',0);
            if(_timer)clearTimeout(_timer);
        }

        _create_wrapper();
        $image.hide();
        /*
        $image.imagesLoaded(function(){
            _matchsize_wrapper(this,$wdiv);
        });*/
        $wdiv.find("img").imagesLoaded(function(){
            $progresswrapper.remove();
            _start();
        },function(ns,s){
            $progressnode.css("width",(s/ns*100)+"%");
        });


    });
};

$.fn.imagesLoaded = $.fn.imagesLoaded || function(callback,steps){
    var elems = this.filter('img'),
        len   = elems.length,
        blank = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

    elems.bind('load.imgloaded',function(){
        if(steps)steps.call(elems,elems.length,elems.length-len);
        if (--len <= 0 && this.src !== blank){
            elems.unbind('load.imgloaded');
            callback.call(elems,this);
        }
    }).each(function(){
            // cached images don't fire load sometimes, so we reset src.
            if (this.complete || this.complete === undefined){
                var src = this.src;
                // webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
                // data uri bypasses webkit log warning (thx doug jones)
                this.src = blank;
                this.src = src;
            }
        });

    return this;
};

$.fn.cssAll = function(css)
{
    var obj = {};

    if(this.length)
    {
        var css = css.split(',');
        var params = [];

        for(var i=0,ii=css.length; i<ii; i++)
        {
            params = css[i].split(':');

            obj[$.trim(params[0])] = $(this).css($.trim(params[1] || params[0]));
        }
    }

    return obj;
};

$("img.image-sequence").imageSequence();