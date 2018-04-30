var status = 1;
var s;
var list = [];
var block = [];
var id;
var frm;
var two;
var group;
const ROW =20;
const COL =20;
const GREY = "rgb(127,127,127)";
const WHYTE = "rgb(255,255,255)";
const BROWN = "rgb(153,76,0)";
function stat(type){
	status = type;
	console.log(status);
	
}
function main(){
	
	test();
	sq();
}

function sq(){
	var elem = document.getElementById('square');
	var params = {width:30, height: 30, autostart: true };
	var t = new Two(params).appendTo(elem);
	var rect = t.makeRectangle(15, 15, 30, 30);
	//console.log(rect);
	rect.fill = BROWN;
	s = rect;
	t.update();
}
function test(){
	
	var elem = document.getElementById('test');
	//menu(elem);
	
	var params = {width:600, height: 500, autostart: true };
	two = new Two(params).appendTo(elem);
	// two has convenience methods to create shapes.
	//console.log(two.width);
	//two.width=300;
	//console.log(two.width);
	group = two.makeGroup();
	for(var j = 1; j<COL; j++){
		list[j] = [];
		for(var i = 1; i<ROW; i++){
			var rect = two.makeRectangle(i*25, j*25, 25, 25);
			rect.id="Y";
			rect.id+=j+"X"+i;
			console.log(rect.fill);
			list[j][i] = rect;
			
			//console.log(list);
		}
	}
	//console.log("test ",list);
	//console.log("group ",group.children);
	two.update();
	for(var j = 1; j<COL; j++){
		for(var i = 1; i<ROW;i++){
			var re = list[j][i];
			//console.log($(re._renderer.elem));
			$(re._renderer.elem)
					.click(function(e) {
						if(status == 1){	
								var str = e["currentTarget"]["id"];
								var posX = fromIDtoPosX(str);
								var posY = fromIDtoPosY(str);
								//console.log(fromIDtoPosX(str))
								//console.log("pos",list[posX][posY]);
								if(list[posY][posX].fill != "#fff")
									list[posY][posX].fill = WHYTE;
							}else{

									
								console.log("target",e["currentTarget"]["id"]);
								var str = e["currentTarget"]["id"];
								var posX = fromIDtoPosX(str);
								var posY = fromIDtoPosY(str);
								//console.log(fromIDtoPosX(str))
								//console.log("pos",list[posX][posY]);
								list[posY][posX].fill = s.fill;
								//two.remove(list[posY][posX]);
							}
						}
					);
		}
	}
	
}
function fromIDtoPosY(str){
	var flag = false;
	var ret = "";
	for(var index = 1; index < str.length && flag==false; index++){
		if(str[index] != "X"){
			ret += str[index];
		}else{
			flag=true;
		}
	}
	//console.log(ret);
	return ret*1;
}
function fromIDtoPosX(str){
	var flag = false;
	var ret = "";
	for(var index = 1; index < str.length; index++){
		if(str[index] == "X"){
			flag=true;
			index++;
		}if(flag){
			ret += str[index];
		}
	}
	//console.log(ret);
	return ret*1;
}

function allowDrop(ev) {
	//console.log(ev.target.id);
    ev.preventDefault();
}

function drag(ev) {
	//console.log(ev.target.id);
	//id = ev.target.id
    //ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
	
    ev.preventDefault();

	//console.log(str);
	
	console.log("target",ev.target.id);
	var str = ev.target.id;
	var posX = fromIDtoPosX(str);
	var posY = fromIDtoPosY(str);
	//console.log("pos",list[posX][posY]);							
	list[posY][posX].fill = s.fill;
	//s.fill = getRandomColor();
    //ev.target.appendChild(document.getElementById("square")); //elimina cio che sposti
}
function MouseDown(ev){
	//console.log("from",ev.target.id);
	frm = ev.target.id;
}
function MouseUp(ev){
	var id = frm.substring(0,5);
	if(id != "block" && status == 3){
	//console.log("to",ev.target.id);	
	var to=ev.target.id;
	var Xfrom = fromIDtoPosX(frm);
	var Yfrom = fromIDtoPosY(frm);
	
	var Xto = fromIDtoPosX(to);
	var Yto = fromIDtoPosY(to);
	
	if(Xto < Xfrom){
		var temp = Xto;
			Xto = Xfrom;
			Xfrom = temp;
	}
	if(Yto < Yfrom){
		var temp = Yto;
			Yto = Yfrom;
			Yfrom = temp;
	}
	var Xcentro = (Xto-Xfrom)/2 + Xfrom;
	var Ycentro = (Yto-Yfrom)/2 + Yfrom;
	var X = Xto-Xfrom+1;
	var Y = Yto-Yfrom+1;
	//console.log(Yfrom,"   ", Xfrom);
	//console.log(Yto,"   ", Xto);
	var rect = two.makeRectangle(Xcentro*25,Ycentro*25,X*25, Y*25);
	rect.id = "blockF"
	rect.id += Yfrom+"X"+Xfrom+"T"+Yto+"X"+Xto;
	rect.fill= GREY;
	block[block.length] = rect;

	//console.log(rect.id);
	/*for(var j = Xfrom; j<= Xto && j <ROW; j++)
		for(var i = Yfrom; i<= Yto && i <COL; i++){
			list[i][j].fill= GREY;
		}*/
	two.update();
	$(rect._renderer.elem)
					.click(function(e) {
						if(status == 1){	
							var id = e["currentTarget"]["id"].substring(0,5);
							if(id== "block"){
								for(var i = 0; i<block.length;i++)
									if(block[i].id == e["currentTarget"]["id"] ){
										//console.log("try  " +block[i].id);
										e["currentTarget"].remove();
										//block.splice(i,1);
									}
						}}});
	
	
	}
}
function getRandomColor() {
            return 'rgb('
              + Math.floor(Math.random() * 255) + ','
              + Math.floor(Math.random() * 255) + ','
              + Math.floor(Math.random() * 255) + ')';
          }
		  
		  
/*		  
function menu(elem){
	if (elem.addEventListener) {
        elem.addEventListener('contextmenu', function(e) {
            document.getElementById("rmenu").className = "show";  
            document.getElementById("rmenu").style.top =  mouseY(event) + 'px';
            document.getElementById("rmenu").style.left = mouseX(event) + 'px';
            e.preventDefault();
        }, false);
    } else {

        //document.getElementById("test").attachEvent('oncontextmenu', function() {
        //$(".test").bind('contextmenu', function() {
            elem.on('contextmenu', 'a.test', function() {


            //alert("contextmenu"+event);
            document.getElementById("rmenu").className = "show";  
            document.getElementById("rmenu").style.top =  mouseY(event) + 'px';
            document.getElementById("rmenu").style.left = mouseX(event) + 'px';

            window.event.returnValue = false;


        });
    }
	
	
}	  
$(document).bind("click", function(event) {
	document.getElementById("rmenu").className = "hide";
});



function mouseX(evt) {
    if (evt.pageX) {
        return evt.pageX;
    } else if (evt.clientX) {
       return evt.clientX + (document.documentElement.scrollLeft ?
           document.documentElement.scrollLeft :
           document.body.scrollLeft);
    } else {
        return null;
    }
}

function mouseY(evt) {
    if (evt.pageY) {
        return evt.pageY;
    } else if (evt.clientY) {
       return evt.clientY + (document.documentElement.scrollTop ?
       document.documentElement.scrollTop :
       document.body.scrollTop);
    } else {
        return null;
    }
}*/