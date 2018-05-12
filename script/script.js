var status = 2;
var list = [];
var block = [];
var Long = [];
var Short = [];
var id;
var frm = "block";
var dragType;
var two;
var group;
var RightID;
var target;
var obj = {
				"Long":[
				{"0" : "Y5X4"},
				{"1"   : "Y10X4"}],
				"Short":[
				{"0" : "Y1X1"},
				{"1"   : "Y2X2"}]
			};
var LTtexture;
var LTRtexture;
var STtexture;

const ROW =20;
const COL =20;
const GREY = "rgb(127,127,127)";
const WHYTE = "rgb(255,255,255)";
const BROWN = "rgb(153,76,0)";
function variation(type){
		if(status == 1){
			document.getElementById("DelSel").className="list-group-item";
		}
		if(status == 2){
			document.getElementById("TableSel").className="list-group-item";							
		}
		if(status == 3){
			document.getElementById("BlockSel").className="list-group-item";
		}
		if(status == 4){			
			document.getElementById("LTableSel").className="list-group-item";
		}
	
		if(type == 1){ 
			document.getElementById("DelSel").className="list-group-item active";
		}
		if(type == 2){
			document.getElementById("TableSel").className="list-group-item active";
		}
		if(type == 3){
			document.getElementById("BlockSel").className="list-group-item active";
		}
		if(type == 4){ 
			document.getElementById("LTableSel").className="list-group-item active";
		}

		
	
}


function stat(type){
	
	variation(type);
	status = type;
	//console.log(status);
	
}
function main(){
	
	test();
	//sq();
	//Lsq();
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
						//console.log("status ", status);
						variation(2);
						status=2;
					});
					
}
function Lsq(){
	/*
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
						variation(4);
						status=4;
						
						//console.log("status ", status);
					});
					*/
}
function draw(data){
	
	if(!data){
		data = obj;
	}
	
	for(var i= 0; i<data["Long"].length; i++){
		var t = data["Long"][i];
		posX = fromIDtoPosX(t[i]);
		posY = fromIDtoPosY(t[i]);
		//console.log(posX, "   ", posY);
		var rect = LongTable(posX,posY);
		Long[Long.length] = rect;
		two.update();
		LongTableProprieties(rect);
		
	}
	for(var i= 0; i<data["Short"].length; i++){
		var t = data["Short"][i];
		posX = fromIDtoPosX(t[i]);
		posY = fromIDtoPosY(t[i]);
		//console.log(posX, " ohi  ", posY);
		var rect = ShortTable(posX,posY,1);
		Short[Short.length] = rect;
		two.update();
		ShortTableProprieties(rect);
		
	}
	
}
function test(){
	
	
	//console.log(obj["Long"]);
	for(var i= 0; i<obj["Long"].length; i++){
		var t = obj["Long"][i];
		var j = i+"";
		console.log(t[i+1]);
		//console.log(a);
		
	}
	
	
	var elem = document.getElementById('test');
	//menu(elem);
	
	var params = {
					width:500, 
					height: 500, 
					autostart: true };
	
	two = new Two(params).appendTo(elem);
	// two has convenience methods to create shapes.
	//console.log(two.width);
	//two.width=300;
	//console.log(two.width);
	//LTtexture = two.makeSprite("img/nice_table_2_1.png");
	
	//var img = scaleImage("img/small_table_2_1.png",56,28);
	LTtexture = new Two.Texture("img/small_table_2_1.png");
	LTRtexture = new Two.Texture("img/small_table_1_2.png");
	STtexture = new Two.Texture("img/small_table_1_1.png");
	//LTtexture.scale=COL/two.width;
	//LTtexture.translation.set(50,25);//=0.75;
	//console.log(STtexture);
	var contorno = two.makeRectangle(250,250,500,500);
	contorno.linewidth=0;
	group = two.makeGroup();
	for(var j = 1; j<COL; j++){
		list[j] = [];
		for(var i = 1; i<ROW; i++){
			//ShortTable(i,j,WHYTE);
			list[j][i] = ShortTable(i,j,0);
			//console.log(list);
		}
	}
	//console.log(list);
	//console.log("test ",list);
	//console.log("group ",group.children);
	two.update();
	
	for(var j = 1; j<COL; j++){
		for(var i = 1; i<ROW;i++){
			var re = list[j][i];
			//console.log($(re._renderer.elem));
			WhyteCellProprieties(re);
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
function dragStart(ev) {
	
	ev.dataTransfer.setData('text/plain', 'anything');
}
function dragST(ev) {
	//console.log("ev ",ev);
	//id = ev.target.id

	dragType= "short";
}
function dragLT(ev) {

	//console.log("ev ",ev);
	//id = ev.target.id
    //ev.dataTransfer.setData('text/plain', 'anything');
	dragType= "long";
}
function drop(ev) {
	//console.log("dsdasdsada");
    ev.preventDefault();
	
	var str = ev.target.id;
	if(str != "two_1"){
		//console.log("target",ev.target.id);
		var posX = fromIDtoPosX(str);
		var posY = fromIDtoPosY(str);
		//console.log(str);
		if(dragType == "short"){
			
			//console.log("pos",list[posX][posY]);							
			var rect = ShortTable(posX,posY,1);
			Short[Short.length] = rect;
			variation(2);
			status = 2;
			two.update;
			ShortTableProprieties(rect);
			//ev.target.appendChild(document.getElementById("square")); //elimina cio che sposti
			
		}else if(dragType == "long"){
			var rect = LongTable(posX,posY);
			Long[Long.length] = rect;
			variation(4);
			status = 4;
			two.update();
			
			LongTableProprieties(rect);
			
			
		}
	}
}

function ShortTable(posX, posY, filler){
	var rect = two.makeRectangle(posX*25, posY*25, 25, 25);
	
	if(filler == 1){
		rect.fill = STtexture;
		rect.id="ShortY";
		rect.id+=posY+"X"+posX;
	}
	if(filler == 0){
		rect.fill = WHYTE;
		rect.id="Y";
		rect.id+=posY+"X"+posX;
	}
	return rect;
}

function LongTable(posX,posY){

		posX = (2*posX+1)/2;
		var rect = two.makeRectangle((posX)*25,(posY)*25,50,25);
		rect.id = "Long";
		rect.id += "Y"+posY+"X"+posX+"D0";
		rect.fill= LTtexture;
	
	return rect;
}

function RemoveShortTable(target){
	//console.log("remove id ",target["id"]);
	
	for(var i = 0; i<Short.length; i++){
		if(Short[i].id == target["id"]){
			//console.log("i ", i, " Short[i] ", Short[i]);
			target.remove();
			Short.splice(i,1);
		}
	}
	
}

function RemoveLongTable(target){
	for(var i = 0; i<Long.length; i++){
		if(Long[i].id == target["id"] ){
			//console.log("try  " +Long[i].id);
			target.remove();
			Long.splice(i,1);
		}
	}
}
function MouseDown(ev){
	//console.log("from",ev.target.id);
	frm = ev.target.id;
	if(frm == "two_1"){
		frm = "block";
	}
}
function MouseUp(ev){
	var id = frm.substring(0,5);
	if(id != "block" && status == 3 && ev.button == 0){
	//console.log("to",ev.target.id);	
	var to=ev.target.id;
	var Xfrom = fromIDtoPosX(frm);
	var Yfrom = fromIDtoPosY(frm);
	
	var Xto = fromIDtoPosX(to);
	var Yto = fromIDtoPosY(to);
	
	var rect = CreateBlock(Xfrom,Yfrom,Xto,Yto);
	//console.log("from ",Yfrom,"   ", Xfrom);
	//console.log("to ",Yto,"   ", Xto);
	
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
			//console.log("tet ",e.button,"  ", e.which);
			//console.log(document.getElementById("rmenu"));
            document.getElementById("rmenu").className = "show";  
            document.getElementById("rmenu").style.top =  mouseY(e) + 'px';
            document.getElementById("rmenu").style.left = mouseX(e) + 'px';
			
			RightID = e["currentTarget"]["id"];
			target = e["currentTarget"];
			//console.log(elem._renderer.elem);
            e.preventDefault();
        }, false);
    } else {

        document.getElementById("test").attachEvent('oncontextmenu', function() {
        //$(".test").bind('contextmenu', function() {
           // elem.on('contextmenu', 'a.test', function() {


            //alert("contextmenu"+event);
            document.getElementById("rmenu").className = "show";  
            document.getElementById("rmenu").style.top =  mouseY(event) + 'px';
            document.getElementById("rmenu").style.left = mouseX(event) + 'px';

            window.event.returnValue = false;
		//}}

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
		rect.fill = LTRtexture;
        break;
    case 1:
		posX -=0.5;
		posY -=0.5;
		rect = two.makeRectangle((posX)*25,posY*25,50,25);
		
		rect.fill = LTtexture;
        break;
	case 2:
		posX +=0.5;
		posY -=0.5;
		rect = two.makeRectangle((posX)*25,posY*25,25,50);
		//var texture = new Two.Texture("script/small_table_2_1.png");
		rect.fill = LTRtexture;
        break;
	case 3:
		posX +=0.5;
		posY +=0.5;
		rect = two.makeRectangle((posX)*25,posY*25,50,25);
		rect.fill = LTtexture;
        break;
	default:
		//console.log("error rotating");
	
	}
	dir = (dir+1)%4;
	var id = Long[pos].id.slice(0,Long[pos].id.length-1);
	
	rect.id = "Long";
	rect.id += "Y"+posY+"X"+posX+"D";
	
	rect.id += dir;
	//console.log(target);
	target.remove();
	
	Long[pos] = rect
	
	two.update();
	
	LongTableProprieties(rect);
	
}

function ShortTableProprieties(re){
	$(re._renderer.elem)
					.click(function(e) {
								if(status == 1){
									//console.log("list ",list[posY][posX].id);
									id = e["currentTarget"]["id"];
									RemoveShortTable(e["currentTarget"]);
								}
						
					});
}

function RemoveAll(){
	
	console.log("short ",Short);
	//console.log("pre ",Short," lunghezza ", Short.length);
	if(Short.length && Short.length > 0){
		for(var i=Short.length-1; i >= 0; i--){
			//console.log("i ",i," short[i] ",Short[i]);
			//console.log(document.getElementById(Short[i].id));
			RemoveShortTable(document.getElementById(Short[i].id));
		}
	}
	//console.log("after ",Short.length);
	console.log("long ",Long);
	if(Long.length && Long.length > 0){
		for(var i=Long.length-1; i >= 0; i--){
			//console.log("i ",i," long[i] ",Long[i]);
			RemoveLongTable(document.getElementById(Long[i].id));
		}
	}
	
	
	
}

function WhyteCellProprieties(re){

	$(re._renderer.elem)
					.click(function(e) {
						//console.log("tet ",e.button,"  ", e.which);
						//console.log(document.getElementById(e["currentTarget"]["id"]) == e["currentTarget"]);
						if(e.button == 0){
							var str = e["currentTarget"]["id"];
							var posX = fromIDtoPosX(str);
							var posY = fromIDtoPosY(str);
							status = status*1;
							//console.log("pre switch ",status);

							if(status == 2){
								//console.log("ma siamo sicuri che sia questo print? Y ",posY," X ",posX);
								var rect = ShortTable(posX,posY,1);
								//console.log("rect ");
								Short[Short.length] = rect;
								//console.log(Short[Short.length-1]);
								two.update();
								ShortTableProprieties(rect);
								//list[posY][posX].fill = STtexture;
								//console.log("id to put ",list[posY][posX].id);
								//Short[Short.length] = list[posY][posX].id; 
								//console.log("id short ",Short[Short.length-1]);
							}
							if(status == 4){
								var rect = LongTable(posX,posY);
								Long[Long.length] = rect;
								two.update();
								//console.log(Long);
								LongTableProprieties(rect);
								
							}
						}				
					});
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
							RemoveLongTable(e["currentTarget"]);
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