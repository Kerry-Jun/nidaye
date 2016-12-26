window.onload = function(){
	var Carousel = new Box("banner");
	Carousel.init();
}
function Box(id){
	this.box = document.getElementById(id);
	this.ul = this.box.getElementsByTagName("ul")[0];
	this.li = this.box.getElementsByTagName("li");
	this.left = this.box.getElementsByClassName("left");
	this.right = this.box.getElementsByClassName("right");
	this.span = this.box.getElementsByTagName("span");
	this.num = 0;
	this.per = "";
}
Box.prototype.init = function(){
	var width = parseInt(document.documentElement.clientWidth);
	var timer;
	for( var i = 0 ; i < this.li.length ; i++ )	{
		this.li[i].index = i;
		this.span[i].index = i;
	}
	this.interval(this,width);
	this.mouseover(this);
	this.mouseout(this,width);
	this.click(this,width);
}
Box.prototype.interval = function(n,width){
	var This = n;
	timer = setInterval (function(){
		width = parseInt(document.documentElement.clientWidth);
		for( var i = 0 ; i < This.li.length ; i++ ){
			This.li[i].style.width = document.documentElement.clientWidth + "px";
		}
		n.time(This,width);
	},3000)
}
Box.prototype.time = function(n,width){
		n.num += 1;
		if( n.num > n.li.length - 1 ) {
			n.num = 0;
		}
		$(n.ul).animate({
			"left" : - ( n.num * width ) + "px"
		},1000);
		$(n.span).eq(n.num).css("background","#fc2200");
		if(n.li[n.num].getAttribute("black") == "1")
		{
			setTimeout(function(){
				$(".nav .nav-list").find("a").addClass("white");
				$(".nav .head").find("a").addClass("change");
			},500)
		}
		else {
			setTimeout(function(){
				$(".nav .nav-list").find("a").removeClass("white");
				$(".nav .head").find("a").removeClass("change");
			},500)
		}
		if(n.per !=""){
			$(n.span).eq(n.per).css("background","#aaa");
		}
		else{
			$(n.span).eq(0).css("background","#aaa");
		}
		n.per = n.num;
}
Box.prototype.mouseout = function(n,width){
	var This = n;
	$(n.span).mouseout(function(){
		n.interval(This,width);
	})
}
Box.prototype.mouseover = function(n){
	var This = n;
	$(n.span).mouseover(function(){
		clearInterval(timer);
	})
}
Box.prototype.click = function(n,width){
	var This = n ;
	$(n.left).click(function(){
		This.sub(This,width);
	});
	$(n.right).click(function(){
		This.add(This,width);
	});
	$(n.span).click(function(){
		This.turnTo(This,this,width);
	});
}
Box.prototype.sub = function(n,width){
	n.num -= 1;
	if(n.num < 0){
		n.num = n.li.length - 1;
	}
	$(n.ul).animate({
		"left" : - ( n.num * width ) + "px"
	},1000);
	n.span[n.num].style.background = "#fc2200";
	if(n.per != ""){
		n.span[n.per].style.background = "#aaa";
	}
	else {
		n.span[0].style.background = "#aaa";
	}
	n.per = n.num;
}

Box.prototype.add = function(n,width){
	n.num += 1;
	if(n.num > n.li.length - 1){
		n.num = 0;
	}
	$(n.ul).animate({
		"left" : - ( n.num * width ) + "px"
	},1000);
	n.span[n.num].style.background = "#fc2200";
	if(n.per != ""){
		n.span[n.per].style.background = "#aaa";
	}
	else {
		n.span[0].style.background = "#aaa";
	}
	n.per = n.num;
}
Box.prototype.turnTo = function(n,span,width){
		n.num = span.index;
		if(n.li[n.num].getAttribute("black") == "1")
		{
			setTimeout(function(){
				$(".nav .nav-list").find("a").addClass("white");
				$(".nav .head").find("a").addClass("change")
			},800)
		}
		else {
			setTimeout(function(){
				$(".nav .nav-list").find("a").removeClass("white");
				$(".nav .head").find("a").removeClass("change")
			},800)
		}
		$(n.ul).animate({
			"left" : - ( n.num * width ) + "px"
		},1000);
		span.style.background = "#fc2200";
		if(n.per != ""){
			n.span[n.per].style.background = "#aaa";
		}
		else {
			n.span[0].style.background = "#aaa";
		}
		n.per = span.index;	
}

