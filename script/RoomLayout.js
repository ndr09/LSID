var RoomStatus = 2;
var PhaseStatus = 0;
var Grid = [];
var Room = [];
var Long = [];
var Short = [];
var roomNumber;
var id;
var frm = "Room";
var dragType;
var two;
var temp;
var group;
var RightID;
var resize = false;
var target;
var lastY;
var lastX;
var blockStatus = []; //false == free true == used
var obj = {
    "Long": [
        {"0": "Y5X4"},
        {"1": "Y10X4"}],
    "Short": [
        {"0": "Y1X1"},
        {"1": "Y2X2"}],
    "Block": [
        {"0": [{"frm": "Y5X6"}, {"to": "Y6X7"}]}]
};
var LTtexture;
var mouseDownFlag;
var LTRtexture;
var STtexture;
var lastClicked;


const ROW = 20;
const COL = 20;
const GREY = "rgb(127,127,127)";
const WHYTE = "rgb(255,255,255)";
const BLACK = "rgb(0,0,0)";


function main(idTag) {

    tabel(idTag);
    //HouseLayout();

    //clearPLAN();
    roomProprieties(1, 1, COL, ROW);
    // draw(FromPlanToRoom(rooms));

}


function tabel(idTag) {

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
        Grid[j] = [];
        blockStatus[j] = [];
        for (var i = 1; i < ROW; i++) {
            Grid[j][i] = ShortTable(i, j, 0);
            blockStatus[j][i] = false;
        }
    }
    two.update();


}

/*room stuff */

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
    var posX = fromIDtoPosX(str);
    var posY = fromIDtoPosY(str);
    if (str != "boundary" && !isUsed(posX, posY)) {
        //console.log("target",ev.target.id);

        //console.log(str);
        if (dragType == "short") {

            //console.log("pos",Grid[posX][posY]);

            var rect = ShortTable(posX, posY, 1);
            Short[Short.length] = rect;
            variation(2);
            RoomStatus = 2;
            two.update;
            ShortTableProprieties(rect);

            //ev.target.appendChild(document.getElementById("square")); //elimina cio che sposti

        } else if (dragType == "long") {

            if (NearFreeBlock(posX, posY)) {
                var rect = LongTable(posX, posY);
                Long[Long.length] = rect;
                variation(4);
                RoomStatus = 4;
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

    if (filler == 0) {
        rect.fill = WHYTE;
        rect.id = "Y";
        rect.id += posY + "X" + posX;
    }
    if (filler == 1) {
        rect.fill = STtexture;
        rect.id = "ShortY";
        rect.id += posY + "X" + posX;
        useBlock(posX, posY);
    }
    if (filler == 2) {
        rect.fill = GREY;
        rect.stroke = GREY;
        rect.id = "BlockY";
        rect.id += posY + "X" + posX;
    }

    return rect;
}

function ShortTableProprieties(re) {
    $(re._renderer.elem)
        .click(function (e) {
            if (RoomStatus == 1) {
                //console.log("Grid ",Grid[posY][posX].id);
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
    //console.log("roomStatus   wwwwww", RoomStatus);
    $(re._renderer.elem)
        .click(function (e) {
            //.log("roomStatus   ddd", RoomStatus);
            if (e.button == 0) {
                var str = e["currentTarget"]["id"];
                var posX = fromIDtoPosX(str);
                var posY = fromIDtoPosY(str);
                lastClicked = str;
                RoomStatus = RoomStatus * 1;
                //console.log("!isUSed", !isUsed(posX, posY));
                //console.log("roomStatus", RoomStatus);
                if (!isUsed(posX, posY)) {
                    if (RoomStatus == 2) {
                        var rect = ShortTable(posX, posY, 1);
                        Short[Short.length] = rect;
                        blockStatus[posY][posX] = true;
                        two.update();
                        ShortTableProprieties(rect);
                    }
                    if (RoomStatus == 4) {
                        if (NearFreeBlock(posX, posY)) {
                            var rect = LongTable(posX, posY);
                            Long[Long.length] = rect;
                            two.update();
                            LongTableProprieties(rect);
                        }
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
            if (RoomStatus == 1) {
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
    //console.log("right Room RoomStatus  ", blockStatus[Y][X + 1]);
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

function isUsed(X, Y) {

    return blockStatus[Y][X];
}

function NearFreeBlock(X, Y) {
    var free = false;
    if ((X + 1 < ROW && !blockStatus[Y][X + 1]) || (Y + 1 < COL && !blockStatus[Y + 1][X])
        || (X - 1 > 0 && !blockStatus[Y][X - 1]) || (Y - 1 > 0 && !blockStatus[Y - 1][X]))
        free = true;

    return free;
}

/*
*
*
* miscellaneous
*
*
* */
function fromRoomIdToArrayBound(str) {
    var pos = [];
    var exitFlag = true;
    var firstXFlag = true;
    for (var index = 0; index < str.length; index++) {
        //console.log(index);
        if (str[index] == "F") {
            index++;
            if (str[index + 1] != "X")
                pos[0] = (str[index] + str[index + 1]) * 1;
            else
                pos[0] = str[index] * 1;
        }
        if (str[index] == "X" && firstXFlag) {
            index++;
            if (str[index + 1] != "T")
                pos[1] = (str[index] + str[index + 1]) * 1;
            else
                pos[1] = str[index] * 1;
            firstXFlag = false;
        }
        if (str[index] == "T") {
            index++;
            if (str[index + 1] != "X")
                pos[2] = (str[index] + str[index + 1]) * 1;
            else
                pos[2] = str[index] * 1;
        }
        if (str[index] == "X" && !firstXFlag) {
            index++;
            if (index + 1 < str.length)
                pos[3] = (str[index] + str[index + 1]) * 1;
            else
                pos[3] = str[index] * 1;
        }
    }
    return pos;
}

function roomProprieties(FC, FR, C, R) {
    //console.log("    ",FC,"    ",FR,"    ",C,"    ",R);
    for (var j = FC; j < C; j++) {
        for (var i = FR; i < R; i++) {
            var re = Grid[j][i];
            //console.log("this ", re.id);
            WhyteCellProprieties(re);
        }
    }
}

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
        Room[Room.length] = b;
        two.update();
        BlockPropreties(b);

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
    if (RoomStatus == 1) {
        document.getElementById("DelSel").className = "list-group-item";
    }
    if (RoomStatus == 2) {
        document.getElementById("TableSel").className = "list-group-item";
    }
    if (RoomStatus == 3) {
        document.getElementById("BlockSel").className = "list-group-item";
    }
    if (RoomStatus == 4) {
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
    RoomStatus = type;
    //console.log(RoomStatus);

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


/* house layout stuff */

/* BLOCK (rooms) */
function MouseDown(ev) {
    ev.preventDefault();
    //console.log(ev);
    mouseDownFlag = true;
    frm = ev.target.id;
    if (frm == "boundary") {
        frm = "Room";
    }
    //temp = new
}

function MouseUp(ev) {
    ev.preventDefault();
    mouseDownFlag = false;
    //console.log(ev);
    //console.log("mouse up", resize);
    if (resize) {
        resize = false;
        document.body.style.cursor = "default";
    } else {
        var id = frm.substring(0, 5);
        if (id != "Room" && RoomStatus == 3 && ev.button == 0) {

            var to = ev.target.id;
            var Xfrom = fromIDtoPosX(frm);
            var Yfrom = fromIDtoPosY(frm);
            var Xto = fromIDtoPosX(to);
            var Yto = fromIDtoPosY(to);
            var room = CreateBlock(Xfrom, Yfrom, Xto, Yto);

            Room[Room.length] = room;
            console.log(Xfrom, "   ", Yfrom, "   ", Xto, "   ", Yto, "   ", room.id);
            two.update();

            BlockPropreties(room);
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
    /*var Xcentro = (Xto - Xfrom) / 2 + Xfrom;
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
    //console.log(rect);*/
    var room = two.makeGroup();
    var color = getRandomColor();
    for (var i = Xfrom; i <= Xto; i++)
        for (var j = Yfrom; j <= Yto; j++) {
            Grid[j][i].fill = color;
            Grid[j][i].linewidth = 1;
            Grid[j][i].stroke = color;
            //useBlock(i, j);
            //console.log(blockStatus[j][i], "  ", j, "  ", i);
            room.add(Grid[j][i]);
        }
    room.id = "roomF"
    room.id += Yfrom + "X" + Xfrom + "T" + Yto + "X" + Xto;

    //console.log(room);
    return room;

}

function BlockPropreties(room) {
    $(room._renderer.elem)
        .click(function (e) {
            //.log("  d ", lastClicked);
            if (RoomStatus == 1) {

                removeRoom(room["id"]);
            }
        });
    $(room._renderer.elem).draggable = "false";
    /*$(room._renderer.elem)
        .mousedown(function (ev) {
            ev.preventDefault();
            resize = true;
            //console.log(mouseY(ev));
            target = ev["currentTarget"];
            lastY = mouseY(ev);
        });*/

}

function mouseMove(ev) {
    if(mouseDownFlag)
        console.log(ev);
    /*var area;
    if (resize) {

        for (var i = 0; i < Room.length; i++) {
            // console.log("------->   ", Room.length, "    ", i);
            if (Room[i].id == target["id"]) {
                //console.log(target["id"], "    -----    ", Room[i].id);
                area = Room[i];
            }
        }
        //console.log(ev);
        var Y = -1;
        var X = -1;
        var wait = false;

        //if(typeFromID(ev["target"].id) != "Room"){
        //console.log("id ",ev["target"].id);
        Y = mouseY(ev);
        X = mouseX(ev);
        //console.log("posy Y assign ",Y);
        //   wait = false;
        //}else{
        //    wait=true;
        // }
        //console.log("y   ",area.height );

        if (X > lastX + 25) {
            lastY = Y;
            //console.log(" +++++++++++++++++");
            if (area.width != -25) {
                area.width += 25;
                area.translation.x = area.translation.x + 12.5;
            } else {
                area.width += 75;
                area.translation.x = area.translation.x + 12.5;
            }

            document.body.style.cursor = "e-resize";
            //console.log( area.translation.y);
            two.update();

        } else if (X < lastX - 25) {
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
    }*/

}

function removeRoom(id) {
    var notFound = true;
    for (var i = 0; i < Room.length && notFound; i++) {
        if (id == Room[i].id) {
            notFound = false;
            //console.log(Room[i]);
            Room[i].fill = WHYTE;
            Room[i].stroke = BLACK;
            Room[i].remove();
            Room.splice(i, 1);
        }
    }

}

function ClearHouseToRoom() {
    for (var j = 0; j < Room.length; j++) {
        if (id == Room[j].id) {
            //console.log(Room[i]);
            var house = Room[j].children;
            var idRooms = [];
            //console.log(Room[j].id);
            for (var i = 0; i < house.length; i++) {
                var id = house[i].id;
                clearBlock(fromIDtoPosX(id), fromIDtoPosY(id));
            }
            Room[i].fill = WHYTE;
            Room[i].stroke = BLACK;
            Room[i].remove();
        }
    }

}

function clearForOtherRoom() {
    for (var j = 1; j < COL; j++) {
        for (var i = 1; i < ROW; i++) {
            Grid[j][i] = ShortTable(i,j,0);
        }
    }
}

function unavailableArea(i, j) {
    blockArea = ShortTable(i, j, 2);
    return blockArea;
}

function nextRoom() {
    if (Room.length > roomNumber + 1) {
        //clearForOtherRoom();

        roomNumber++;
        console.log(roomNumber);
        drawRoom(roomNumber);
    }


}

function preRoom() {
    if (roomNumber - 1 > -1) {
        //clearForOtherRoom();

        roomNumber--;
        console.log(roomNumber);
        drawRoom(roomNumber);
    }

}

function nextStep(build, next, pre) {

    if (Room.length > 0) {
        document.getElementById("build").className = "hide";
        document.getElementById("next").className = "btn btn-primary";
        document.getElementById("pre").className = "btn btn-primary";
        ClearHouseToRoom();
        drawRoom(0);
    }


}

function drawRoom(number) {
    roomNumber = number;
    var house = Room[roomNumber].children;
    var idRooms = [];
    console.log("pre   ",idRooms.length);
    for (var i = 0; i < house.length; i++) {
        idRooms[idRooms.length] = house[i].id;
    }
    console.log("post   ",idRooms.length);
    for (var j = 1; j < COL; j++) {
        for (var i = 1; i < ROW; i++) {
            console.log(Grid[j][i].id);
            var type = typeFromID(Grid[j][i].id);
            var id;

            if(type == "Block"){
                id = (Grid[j][i].id).substring(5,(Grid[j][i].id).length);

            }else{
                id = Grid[j][i].id;
            }
            if (!idRooms.includes(id)) {
                //console.log("not av");
                Grid[j][i] = unavailableArea(i, j);
                useBlock(i, j);
            } else {
               // console.log("av");
                clearBlock(i,j);
                Grid[j][i] = ShortTable(i, j, 0);
            }
        }
    }
    var pos = fromRoomIdToArrayBound(Room[roomNumber].id);
    two.update();
    //console.log(pos);
    roomProprieties(pos[0], pos[1], (pos[2] + 1), (pos[3] + 1));
}
