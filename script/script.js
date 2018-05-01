var status = 1;
var list = [];
var block = [];
var Long = [];
var id;
var frm;
var dragType;
var two;
var group;
var RightID;
var target;
const ROW =20;
const COL =20;
const GREY = "rgb(127,127,127)";
const WHYTE = "rgb(255,255,255)";
const BROWN = "rgb(153,76,0)";


function stat(type){
	status = type;
	//console.log(status);
	
}
function main(){
	
	test();
	sq();
	Lsq();
}

function sq(){
	var elem = document.getElementById('square');
	var params = {width:30, height: 30, autostart: true };
	var t = new Two(params).appendTo(elem);
	var rect = t.makeRectangle(15, 15, 30, 30);
	//console.log(rect);
	rect.fill = BROWN;
	rect.id = "short";
	
	t.update();
	$(rect._renderer.elem)
					.click(function(e) {
						status=2;
					});
}
function Lsq(){
	var elem = document.getElementById('Lsquare');
	var params = {width:60, height: 30, autostart: true };
	var t = new Two(params).appendTo(elem);
	var rect = t.makeRectangle(30, 15, 60, 30);
	//console.log(rect);
	rect.fill = BROWN;
	rect.id = "long";
	
	t.update();
	
	$(rect._renderer.elem)
					.click(function(e) {
						status=4;
					});
}
function test(){
	
	var elem = document.getElementById('test');
	//menu(elem);
	
	var params = {width:500, height: 500, autostart: true };
	
	two = new Two(params).appendTo(elem);
	// two has convenience methods to create shapes.
	//console.log(two.width);
	//two.width=300;
	//console.log(two.width);
	var contorno = two.makeRectangle(250,250,500,500);
	contorno.linewidth=0;
	group = two.makeGroup();
	for(var j = 1; j<COL; j++){
		list[j] = [];
		for(var i = 1; i<ROW; i++){
			var rect = two.makeRectangle(i*25, j*25, 25, 25);
			rect.id="Y";
			rect.id+=j+"X"+i;
			//console.log(rect.fill);
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
						//console.log(e["currentTarget"]["id"]);
							var str = e["currentTarget"]["id"];
							var posX = fromIDtoPosX(str);
							var posY = fromIDtoPosY(str);
							switch(status) {
								case 1:
									if(list[posY][posX].fill == BROWN){
										list[posY][posX].fill = WHYTE;
									}
									break;
								case 2:
									list[posY][posX].fill = BROWN;
									break;
								case 4:
									var rect = LongTable(posX,posY);
									Long[Long.length] = rect;
									two.update();
									//console.log(rect);
									LongTableProprieties(rect);
									break;
								default:
									console.log("not a click ",status);
							}
						
					});
		}
	}
	
}
function fromIDtoPosY(str){
	var flag = false;
	var ret = "";
	for(var index = 0; index < str.length; index++){
		if(str[index] == "Y"){
			flag = true;
			index++;
		}else if(str[index] == "X"){
			flag=false;
			index++;
		}
		if(flag){
			ret += str[index];
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
			flag = true;
			index++;
		}else if(str[index] == "D"){
			flag = false;
			index++;
		}if(flag){
			ret += str[index];
		}
	}
	//console.log(ret);
	return ret*1;
}

function allowDrop(ev) {
	//console.log(ev);
    ev.preventDefault();
}

function dragST(ev) {
	//console.log(ev);
	//id = ev.target.id

	dragType= "short";
}
function dragLT(ev) {
	//console.log(ev);
	//id = ev.target.id
    //ev.dataTransfer.setData("text", "long");
	dragType= "long";
}
function drop(ev) {
	
    ev.preventDefault();
	
	var str = ev.target.id;
	if(str != "two_1"){
		//console.log("target",ev.target.id);
		var posX = fromIDtoPosX(str);
		var posY = fromIDtoPosY(str);
		//console.log(str);
		if(dragType == "short"){
			
			//console.log("pos",list[posX][posY]);							
			list[posY][posX].fill = BROWN ;
			status = 2;
			//ev.target.appendChild(document.getElementById("square")); //elimina cio che sposti
			
		}else if(dragType == "long"){
			var rect = LongTable(posX,posY);
			Long[Long.length] = rect;
			status = 4;
			two.update();
			
			LongTableProprieties(rect);
			
			
		}
	}
}

function LongTable(posX,posY){
	posX = (2*posX+1)/2;
	var rect = two.makeRectangle((posX)*25,(posY)*25,50,25);
	rect.id = "Long";
	rect.id += "Y"+posY+"X"+posX+"D0";
	rect.fill= BROWN;
	return rect;
}
function RemoveLongTable(target){
	
	for(var i = 0; i<Long.length; i++){
		if(Long[i].id == target["currentTarget"]["id"] ){
			//console.log("try  " +Long[i].id);
			target["currentTarget"].remove();
			Long.splice(i,1);
		}
	}
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
	
	var rect = CreateBlock(Xfrom,Yfrom,Xto,Yto);
	//console.log(Yfrom,"   ", Xfrom);
	//console.log(Yto,"   ", Xto);
	
	block[block.length] = rect;
	
	//console.log(rect.id);
	/*for(var j = Xfrom; j<= Xto && j <ROW; j++)
		for(var i = Yfrom; i<= Yto && i <COL; i++){
			list[i][j].fill= GREY;
		}*/
	two.update();
	BlockPropreties(rect);
	
	
	}
}
function CreateBlock(Xfrom,Yfrom,Xto,Yto){
	
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
	var rect = two.makeRectangle(Xcentro*25,Ycentro*25,X*25, Y*25);
	rect.id = "blockF"
	rect.id += Yfrom+"X"+Xfrom+"T"+Yto+"X"+Xto;
	rect.fill= GREY;
	
	return rect;
	
}
function BlockPropreties(rect){
	$(rect._renderer.elem)
					.click(function(e) {
						if(status == 1){	
							var id = e["currentTarget"]["id"].substring(0,5);
							if(id== "block"){
								RemoveBlock(e);
							}
						}
					});
}
function RemoveBlock(target){
		for(var i = 0; i<block.length;i++)
									if(block[i].id == target["currentTarget"]["id"] ){
										//console.log("try  " +block[i].id);
										target["currentTarget"].remove();
										block.splice(i,1);									
									}
}

function getRandomColor() {
            return 'rgb('
              + Math.floor(Math.random() * 255) + ','
              + Math.floor(Math.random() * 255) + ','
              + Math.floor(Math.random() * 255) + ')';
          }
		  
		  
	  
function menu(elem){
	if (elem._renderer.elem.addEventListener) {
        elem._renderer.elem.addEventListener('contextmenu', function(e) {
            document.getElementById("rmenu").className = "show";  
            document.getElementById("rmenu").style.top =  mouseY(event) + 'px';
            document.getElementById("rmenu").style.left = mouseX(event) + 'px';
			
			RightID = e["currentTarget"]["id"];
			target = e["currentTarget"];
			//console.log(elem._renderer.elem);
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
function removeTableOnclick(){
	var pos;
	for(var i = 0; i<Long.length;i++){
		if(Long[i].id == RightID ){
		//console.log("try  " +Long[i].id);
		pos = i;
		}
	}
	target.remove();
	Long.splice(target,1);
		
	
}
function rotate(){
	var dir = RightID[RightID.length-1]*1;
	//console.log("dir ",RightID);
	var rect;
	var pos;
	for(var i = 0; i<Long.length;i++){
		if(Long[i].id == RightID ){
		//console.log("try  " +Long[i].id);
		pos = i;
		}
	}
	var posX = fromIDtoPosX(RightID);
	var posY = fromIDtoPosY(RightID);
	//console.log(posY,"    ",posX);
	var rect;
	switch(dir) {
    case 0:	
		posX -=0.5;
		posY +=0.5;
		rect = two.makeRectangle((posX)*25,posY*25,25,50);
        break;
    case 1:
		posX -=0.5;
		posY -=0.5;
		rect = two.makeRectangle((posX)*25,posY*25,50,25);
        break;
	case 2:
		posX +=0.5;
		posY -=0.5;
		rect = two.makeRectangle((posX)*25,posY*25,25,50);
        break;
	case 3:
		posX +=0.5;
		posY +=0.5;
		rect = two.makeRectangle((posX)*25,posY*25,50,25);
        break;
	default:
		console.log("error rotating");
	
	}
	dir = (dir+1)%4;
	var id = Long[pos].id.slice(0,Long[pos].id.length-1);
	
	rect.id = "Long";
	rect.id += "Y"+posY+"X"+posX+"D";
	rect.fill = BROWN;
	rect.id += dir;
	
	target.remove();
	
	Long[pos] = rect
	
	two.update();
	
	LongTableProprieties(rect);
	
}

function LongTableProprieties(rect){
	menu(rect);
	
	$(rect._renderer.elem)
				.click(function(e) {
					//console.log(e["currentTarget"]["id"]);
					if(status == 1){	
						var id = e["currentTarget"]["id"].substring(0,4);
						if(id == "Long"){
							//console.log("from prop, ",status);
							RemoveLongTable(e);
						}
					}
				});
}
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
}