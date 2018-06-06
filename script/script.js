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
var resize = false;
var target;
var lastY;
var blockStatus = []; //false == free true == used
var obj = {
    "Long": [
        {"0": "Y5X4"},
        {"1": "Y10X4"}],
    "Short": [
        {"0": "Y1X1"},
        {"1": "Y2X2"}],
    "Block": [
        {"0": [{"frm":"Y5X6"}, {"to":"Y6X7"}]}]
};
var LTtexture;
var LTRtexture;
var STtexture;

const ROW = 20;
const COL = 20;
const GREY = "rgb(127,127,127)";
const WHYTE = "rgb(255,255,255)";
const BROWN = "rgb(153,76,0)";


function main() {

    test();

}


function test(idTag) {

    if (!idTag) {
        idTag = "test";
    }

    var elem = document.getElementById(idTag);


    var params = {
        width: 500,
        height: 500,
        autostart: true
    };

    two = new Two(params).appendTo(elem);
    LTtexture = new Two.Texture("img/small_table_2_1.png");
    LTRtexture = new Two.Texture("img/small_table_1_2.png");
    STtexture = new Two.Texture("img/small_table_1_1.png");
    var contorno = two.makeRectangle(250, 250, 500, 500);
    contorno.id = "boundary";
    contorno.linewidth = 0;
    group = two.makeGroup();
    for (var j = 1; j < COL; j++) {
        list[j] = [];
        blockStatus[j] = [];
        for (var i = 1; i < ROW; i++) {
            list[j][i] = ShortTable(i, j, 0);
            blockStatus[j][i] = false;
        }
    }
    two.update();

    for (var j = 1; j < COL; j++) {
        for (var i = 1; i < ROW; i++) {
            var re = list[j][i];
            WhyteCellProprieties(re);
        }
    }

}


/*
*
*   DRAG AND DROP
*
* */


function allowDrop(ev) {
    ev.preventDefault();
}

function dragStart(ev) {

    ev.dataTransfer.setData('text/plain', 'anything');
}

function drop(ev) {


    ev.preventDefault();
    var str = ev.target.id;
    if (str != "boundary") {
        //console.log("target",ev.target.id);
        var posX = fromIDtoPosX(str);
        var posY = fromIDtoPosY(str);
        //console.log(str);
        if (dragType == "short") {

            //console.log("pos",list[posX][posY]);

            var rect = ShortTable(posX, posY, 1);
            Short[Short.length] = rect;
            variation(2);
            status = 2;
            two.update;
            ShortTableProprieties(rect);

            //ev.target.appendChild(document.getElementById("square")); //elimina cio che sposti

        } else if (dragType == "long") {

            if (FreeBlock(posX, posY)) {
                var rect = LongTable(posX, posY);
                Long[Long.length] = rect;
                variation(4);
                status = 4;
                two.update();

                LongTableProprieties(rect);
            }

        }
    }
}

function dragST(ev) {
    //console.log("ev ",ev);

    dragType = "short";
}

function dragLT(ev) {

    //console.log("ev ",ev);
    dragType = "long";
}


function ShortTable(posX, posY, filler) {
    var rect = two.makeRectangle(posX * 25, posY * 25, 25, 25);

    if (filler == 1) {
        rect.fill = STtexture;
        rect.id = "ShortY";
        rect.id += posY + "X" + posX;
        useBlock(posX, posY);
    }
    if (filler == 0) {
        rect.fill = WHYTE;
        rect.id = "Y";
        rect.id += posY + "X" + posX;
    }

    return rect;
}

function ShortTableProprieties(re) {
    $(re._renderer.elem)
        .click(function (e) {
            if (status == 1) {
                //console.log("list ",list[posY][posX].id);
                id = e["currentTarget"]["id"];
                RemoveShortTable(e["currentTarget"]);
            }

        });
}

function RemoveShortTable(target) {
    for (var i = 0; i < Short.length; i++) {
        if (Short[i].id == target["id"]) {
            clearBlock(fromIDtoPosX(Short[i].id), fromIDtoPosY(Short[i].id));
            target.remove();
            Short.splice(i, 1);
        }
    }

}

function WhyteCellProprieties(re) {

    $(re._renderer.elem)
        .click(function (e) {
            if (e.button == 0) {
                var str = e["currentTarget"]["id"];
                var posX = fromIDtoPosX(str);
                var posY = fromIDtoPosY(str);
                status = status * 1;
                if (status == 2) {
                    var rect = ShortTable(posX, posY, 1);
                    Short[Short.length] = rect;
                    blockStatus[posY][posX] = true;
                    two.update();
                    ShortTableProprieties(rect);
                }
                if (status == 4) {
                    if (FreeBlock(posX, posY)) {
                        var rect = LongTable(posX, posY);
                        Long[Long.length] = rect;
                        two.update();
                        LongTableProprieties(rect);
                    }
                }
            }
        });
}


/*
*       LONG TABLE
*
*
*
*
*
*/
function LongTable(posX, posY, ori) {

    if (ori || ori == 0) {
        orientation = ori
    } else {
        orientation = getFreeOrientation(posX, posY, 0);
    }
    var rect;
    centerX = (2 * posX + 1) / 2;
    centerY = posY;
    switch (orientation) {

        case 0:
            rect = two.makeRectangle((centerX) * 25, (centerY) * 25, 50, 25);

            rect.id = "Long";
            rect.id += "Y" + centerY + "X" + centerX + "D0";
            //console.log("orientation  ", orientation, "  posX ", centerX, "  posY ", centerY);
            useBlock(posX, posY, 0);
            rect.fill = LTtexture;
            break;
        case 1:
            centerX -= 0.5;
            centerY += 0.5;
            rect = two.makeRectangle((centerX) * 25, centerY * 25, 25, 50);

            rect.id = "Long";
            rect.id += "Y" + centerY + "X" + centerX + "D1";
            //console.log("orientation  ", orientation, "  posX ", posX, "  posY ", posY);
            useBlock(posX, posY, 1);
            rect.fill = LTRtexture;
            break;
        case 2:
            centerX -= 1;

            rect = two.makeRectangle((centerX) * 25, centerY * 25, 50, 25);

            rect.id = "Long";
            rect.id += "Y" + centerY + "X" + centerX + "D2";
            //console.log("orientation  ", orientation, "  posX ", posX, "  posY ", posY);
            useBlock(posX, posY, 2);
            rect.fill = LTtexture;
            break;
        case 3:
            centerX -= 0.5;
            centerY -= 0.5;
            rect = two.makeRectangle((centerX) * 25, centerY * 25, 25, 50);

            rect.id = "Long";
            rect.id += "Y" + centerY + "X" + centerX + "D3";
            //console.log("orientation  ", orientation, "  posX ", posX, "  posY ", posY);
            useBlock(posX, posY, 3);
            rect.fill = LTRtexture;
            break;
        default:


    }

    //console.log("id in creation   ",rect.id);
    return rect;
}

function RemoveLongTable(target) {
    for (var i = 0; i < Long.length; i++) {
        if (Long[i].id == target["id"]) {

            var X = fromIDtoPosX(Long[i].id);
            var Y = fromIDtoPosY(Long[i].id);
            var dir = orientationFromID(Long[i].id);

            switch (dir) {
                case 0:
                    X -= 0.5;
                    break;
                case 1:
                    Y -= 0.5;
                    break;
                case 2:
                    X += 0.5;
                    break;
                case 3:
                    Y += 0.5;

                default:
            }
            clearBlock(X, Y, dir);
            target.remove();
            Long.splice(i, 1);
        }
    }
}

function LongTableProprieties(rect) {
    menu(rect);

    $(rect._renderer.elem)
        .click(function (e) {
            if (status == 1) {
                var id = e["currentTarget"]["id"].substring(0, 4);
                if (id == "Long") {
                    RemoveLongTable(e["currentTarget"]);
                }
            }
        });
}

function menu(elem) {
    if (elem._renderer.elem.addEventListener) {
        elem._renderer.elem.addEventListener('contextmenu', function (e) {
            //console.log("tet ",e.button,"  ", e.which);
            //console.log(document.getElementById("rmenu"));
            document.getElementById("rmenu").className = "show";
            document.getElementById("rmenu").style.top = mouseY(e) + 'px';
            document.getElementById("rmenu").style.left = mouseX(e) + 'px';

            RightID = e["currentTarget"]["id"];
            target = e["currentTarget"];
            //console.log(elem._renderer.elem);
            e.preventDefault();
        }, false);
    } else {

        document.getElementById("test").attachEvent('oncontextmenu', function () {
            //$(".test").bind('contextmenu', function() {
            // elem.on('contextmenu', 'a.test', function() {


            //alert("contextmenu"+event);
            document.getElementById("rmenu").className = "show";
            document.getElementById("rmenu").style.top = mouseY(event) + 'px';
            document.getElementById("rmenu").style.left = mouseX(event) + 'px';

            window.event.returnValue = false;
            //}}

        });
    }


}

$(document).bind("click", function (event) {
    document.getElementById("rmenu").className = "hide";
});

function rotate() {
    var dir = RightID[RightID.length - 1] * 1;
    //console.log("dir ",RightID);
    var rect;
    var pos;
    for (var i = 0; i < Long.length; i++) {
        if (Long[i].id == RightID) {
            //console.log("try  " +Long[i].id);
            pos = i;
        }
    }
    var posX = fromIDtoPosX(RightID);
    var posY = fromIDtoPosY(RightID);
    //console.log(posY,"    ",posX);
    var rect;
    //console.log(blockStatus[3][1],"    #############   ",blockStatus[2][1]);
    var X = posX;
    var Y = posY;
    switch (dir) {
        case 0:
            X -= 0.5;
            break;
        case 1:
            Y -= 0.5;
            break;
        case 2:
            X += 0.5;
            break;
        case 3:
            Y += 0.5;

        default:
    }
    //console.log("posX ",posX,"  posY ",posY);
    //console.log("rrotation check  X  ", X, "    Y   ", Y, "   ", dir);
    //console.log("right block status  ", blockStatus[Y][X + 1]);
    var freeRotationDir = getFreeOrientation(X, Y, (dir + 1) % 4);

    //console.log("rot  ", freeRotationDir);
    if (freeRotationDir != -1) {
        clearBlock(X, Y, dir);
        rect = LongTable(X, Y, freeRotationDir * 1);
        //console.log("sto per chiamare clear   ", Y, "    ", X," di ", rect.id);


        target.remove();
        Long[pos] = rect;
        two.update();

        LongTableProprieties(rect);
    }
}

function removeTableOnclick() {
    var pos;
    for (var i = 0; i < Long.length; i++) {
        if (Long[i].id == RightID) {
            var X = fromIDtoPosX(Long[i].id);
            var Y = fromIDtoPosY(Long[i].id);
            var dir = orientationFromID(Long[i].id);
            switch (dir) {
                case 0:
                    X -= 0.5;
                    break;
                case 1:
                    Y -= 0.5;
                    break;
                case 2:
                    X += 0.5;
                    break;
                case 3:
                    Y += 0.5;

                default:
            }

            clearBlock(X, Y, dir);
            pos = i;
        }
    }
    target.remove();
    Long.splice(pos, 1);


}


/*
*   BLOCK
*
*
*
*
* */
function MouseDown(ev) {
    //console.log("WRONG");
    frm = ev.target.id;
    if (frm == "boundary") {
        frm = "block";
    }
}

function MouseUp(ev) {
    //console.log("mouse up", resize);
    if (resize) {
        resize = false;
        document.body.style.cursor = "default";
    } else {
        var id = frm.substring(0, 5);
        if (id != "block" && status == 3 && ev.button == 0) {
            var to = ev.target.id;
            var Xfrom = fromIDtoPosX(frm);
            var Yfrom = fromIDtoPosY(frm);
            var Xto = fromIDtoPosX(to);
            var Yto = fromIDtoPosY(to);
            var rect = CreateBlock(Xfrom, Yfrom, Xto, Yto);

            block[block.length] = rect;
            //console.log(block.length, " <----------");
            two.update();
            BlockPropreties(rect);
        }
    }
}

function CreateBlock(Xfrom, Yfrom, Xto, Yto) {

    if (Xto < Xfrom) {
        var temp = Xto;
        Xto = Xfrom;
        Xfrom = temp;
    }
    if (Yto < Yfrom) {
        var temp = Yto;
        Yto = Yfrom;
        Yfrom = temp;
    }
    var Xcentro = (Xto - Xfrom) / 2 + Xfrom;
    var Ycentro = (Yto - Yfrom) / 2 + Yfrom;
    var X = Xto - Xfrom + 1;
    var Y = Yto - Yfrom + 1;
    var rect = two.makeRectangle(Xcentro * 25, Ycentro * 25, X * 25, Y * 25);
    rect.id = "blockF"
    rect.id += Yfrom + "X" + Xfrom + "T" + Yto + "X" + Xto;
    rect.fill = GREY;
    for(i = Yfrom; i<= Yto; i++)
        for(j= Xfrom; j<=Xto;j++){

            useBlock(j,i);

        }
    //console.log(rect);
    return rect;

}


function BlockPropreties(rect) {
    $(rect._renderer.elem)
        .click(function (e) {
            if (status == 1) {
                var id = e["currentTarget"]["id"].substring(0, 5);
                if (id == "block") {
                    RemoveBlock(e["currentTarget"]);
                }
            }
        });
    $(rect._renderer.elem).draggable = "false";
    $(rect._renderer.elem)
        .mousedown(function (ev) {
            ev.preventDefault();
            resize = true;
            //console.log(mouseY(ev));
            target = ev["currentTarget"];
            lastY = mouseY(ev);
        });

}

function RemoveBlock(target) {
    for (var i = 0; i < block.length; i++)
        if (block[i].id == target["id"]) {
            //console.log("try  " +block[i].id);
            target.remove();
            block.splice(i, 1);
        }
}

function resizer(ev) {

    //console.log("RESIZE CALL");
    var area;
    //var t = (mouseY(ev) - 265) / 25;

    //console.log("y    ", Math.floor(t));
    if (resize) {

        for (var i = 0; i < block.length; i++) {
            // console.log("------->   ", block.length, "    ", i);
            if (block[i].id == target["id"]) {
                //console.log(target["id"], "    -----    ", block[i].id);
                area = block[i];
            }
        }
        //console.log(ev);
        var Y = -1;
        var wait = false;

        //if(typeFromID(ev["target"].id) != "block"){
        //console.log("id ",ev["target"].id);
        Y = mouseY(ev);
        //console.log("posy Y assign ",Y);
        //   wait = false;
        //}else{
        //    wait=true;
        // }
        //console.log("y   ",area.height );
        if (Y > lastY + 25) {
            lastY = Y;
            //console.log(" +++++++++++++++++");
            if (area.height != -25) {
                area.height += 25;
                area.translation.y = area.translation.y + 12.5;
            } else {
                area.height += 75;
                area.translation.y = area.translation.y + 12.5;
            }

            document.body.style.cursor = "n-resize";
            //console.log( area.translation.y);
            two.update();

        } else if (Y < lastY - 25) {
            lastY = Y;
            //console.log("------------------");
            if (area.height != 25) {
                area.height -= 25;
                area.translation.y = area.translation.y - 12.5;
            } else {
                area.height -= 75;
                area.translation.y = area.translation.y - 12.5;
            }

            document.body.style.cursor = "n-resize";
            //console.log( area.translation.y);
            two.update();
        }
    }

}

/*
*
*
* miscellaneous
*
*
* */


function RemoveAll() {


    if (Short.length && Short.length > 0) {
        for (var i = Short.length - 1; i >= 0; i--) {
            RemoveShortTable(document.getElementById(Short[i].id));
        }
    }
    if (Long.length && Long.length > 0) {
        for (var i = Long.length - 1; i >= 0; i--) {
            RemoveLongTable(document.getElementById(Long[i].id));
        }
    }


}

function draw(data) {

    if (!data) {
        data = obj;
    }

    for (var i = 0; i < data["Long"].length; i++) {
        var t = data["Long"][i];
        posX = fromIDtoPosX(t[i]);
        posY = fromIDtoPosY(t[i]);
        //console.log(posX, "   ", posY);
        var rect = LongTable(posX, posY);
        Long[Long.length] = rect;
        two.update();
        LongTableProprieties(rect);

    }
    for (var i = 0; i < data["Short"].length; i++) {
        var t = data["Short"][i];
        posX = fromIDtoPosX(t[i]);
        posY = fromIDtoPosY(t[i]);
        //console.log(posX, " ohi  ", posY);
        var rect = ShortTable(posX, posY, 1);
        Short[Short.length] = rect;
        two.update();
        ShortTableProprieties(rect);

    }
    for (var i = 0; i < data["Block"].length; i++) {
        var t = data["Block"][i][0];
        //console.log(t);
        frmX = fromIDtoPosX(t[0]["frm"]);
        frmY = fromIDtoPosY(t[0]["frm"]);
        toX = fromIDtoPosX(t[1]["to"]);
        toY = fromIDtoPosY(t[1]["to"]);

        var b = CreateBlock(frmX, frmY, toX, toY);
        block[block.length] = b;
        two.update();
        ShortTableProprieties(b);

    }

}

function typeFromID(str) {
    var flag = false;
    var type = "";
    for (var index = 0; index < str.length; index++) {
        //console.log("str[index]  ",str[index]);
        if (str[index] == "Y" || str[index] == "F") {
            flag = true;
            //console.log("FLAG ",flag);

        }
        if (!flag) {
            type += str[index];
        }
    }
    //console.log(" @@@@@@@@@@@@@@@  ",type);
    return type;
}

function orientationFromID(str) {
    var flag = false;
    var ret = "";
    for (var index = 0; index < str.length; index++) {
        if (str[index] == "D") {
            flag = true;
            index++;
        }
        if (flag) {
            ret += str[index];
        }
    }
    //console.log(ret);
    return ret * 1;

}

function fromIDtoPosY(str) {
    var flag = false;
    var ret = "";
    for (var index = 0; index < str.length; index++) {
        //console.log("ret    ",ret);
        if (str[index] == "Y") {
            flag = true;
            index++;
        } else if (str[index] == "X") {
            flag = false;
            index++;
        }
        if (flag) {
            ret += str[index];
        }
    }
    //console.log(ret);
    return ret * 1;
}

function fromIDtoPosX(str) {
    var flag = false;
    var ret = "";
    for (var index = 1; index < str.length; index++) {
        if (str[index] == "X") {
            flag = true;
            index++;
        } else if (str[index] == "D") {
            flag = false;
            index++;
        }
        if (flag) {
            ret += str[index];
        }
    }
    //console.log(ret);
    return ret * 1;
}

function variation(type) {
    if (status == 1) {
        document.getElementById("DelSel").className = "list-group-item";
    }
    if (status == 2) {
        document.getElementById("TableSel").className = "list-group-item";
    }
    if (status == 3) {
        document.getElementById("BlockSel").className = "list-group-item";
    }
    if (status == 4) {
        document.getElementById("LTableSel").className = "list-group-item";
    }

    if (type == 1) {
        document.getElementById("DelSel").className = "list-group-item active";
    }
    if (type == 2) {
        document.getElementById("TableSel").className = "list-group-item active";
    }
    if (type == 3) {
        document.getElementById("BlockSel").className = "list-group-item active";
    }
    if (type == 4) {
        document.getElementById("LTableSel").className = "list-group-item active";
    }


}

function stat(type) {

    variation(type);
    status = type;
    //console.log(status);

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

function getRandomColor() {
    return 'rgb('
        + Math.floor(Math.random() * 255) + ','
        + Math.floor(Math.random() * 255) + ','
        + Math.floor(Math.random() * 255) + ')';
}


/*
*
* BOOLEAN GRID
*
* */
function useBlock(X, Y, dir) {

    blockStatus[Y][X] = true;
    if (dir || dir == 0) {
        switch (dir) {
            case 0:
                blockStatus[Y][X + 1] = true;
                break;
            case 1:
                blockStatus[Y + 1][X] = true;
                break;
            case 2:
                blockStatus[Y][X - 1] = true;
                break;
            case 3:
                blockStatus[Y - 1][X] = true;
        }
    }

}

function getFreeOrientation(X, Y, count) {

    var free = -1;
    var flag = true;
    for (var i = 0; i < 4 && flag; i++) {
        switch (count) {

            case 0:

                if (X + 1 < ROW && !blockStatus[Y][X + 1]) {
                    free = 0;
                    flag = false;
                } else {
                    count = (count + 1) % 4;
                }
                break;
            case 1:
                if (Y + 1 < COL && !blockStatus[Y + 1][X]) {
                    free = 1;
                    flag = false;
                } else {
                    count = (count + 1) % 4;
                }
                break;
            case 2:

                if (X - 1 > 0 && !blockStatus[Y][X - 1]) {
                    free = 2;
                    flag = false;
                }
            {
                count = (count + 1) % 4;
            }
                break;
            case 3:

                if (Y - 1 > 0 && !blockStatus[Y - 1][X]) {
                    free = 3;
                    flag = false;
                } else {
                    count = (count + 1) % 4;
                }
        }
    }
    return free;

}

function clearBlock(X, Y, dir) {
    dir = dir * 1;
    blockStatus[Y][X] = false;
    if (dir || dir == 0) {
        switch (dir) {
            case 0:
                blockStatus[Y][X + 1] = false;
                break;
            case 1:
                blockStatus[Y + 1][X] = false;
                break;
            case 2:
                blockStatus[Y][X - 1] = false;
                break;
            case 3:
                blockStatus[Y - 1][X] = false;
            default:

        }

    }

}

function FreeBlock(X, Y) {
    var free = false;
    if ((X + 1 < ROW && !blockStatus[Y][X + 1]) || (Y + 1 < COL && !blockStatus[Y + 1][X])
        || (X - 1 > 0 && !blockStatus[Y][X - 1]) || (Y - 1 > 0 && !blockStatus[Y - 1][X]))
        free = true;

    return free;
}








