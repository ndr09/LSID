var RoomStatus = 1;
var PhaseStatus = 0;
var Grid = [];
var Room = [];
var RoomConf = [{}];
var RoomOptions = {};
var conf = 0;
var Long = [];
var Short = [];
var bound;
var roomNumber;
var selectedRoom;
var id;
var resizeFlag = false;
var resizingDirection;
var frm = "Room";
var dragType;
var two;
var temp;
var tempRoom;
var group;
var RightID;
var target;
var lastY;
var lastX = 0;
var blockStatus = []; //false == free true == used
var savedRoom = {
    /*"1": [
        {"Short":Short},
        {"Long": Long},
    ]*/
};
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
var floorTexture = [];
var lastClicked;
var frmParent;

const ROW = 20;
const COL = 20;
let blockTexture = "rgb(127,127,127)";
const WHYTE = "rgb(255,255,255)";
const BLACK = "rgb(0,0,0)";
const TRANSPARENT = "rgba(0,0,0,0)";


function main(idTag) {
    $(document).bind("click", function (event) {
        document.getElementById("rmenu").className = "hide";
    });
    $(document).keypress(function (e) {
        e.preventDefault();

        if (selectedRoom != null && PhaseStatus == 0 && RoomStatus == 2) {
            let children = [];
            for (let i = 0; i < selectedRoom.children.length; i++) {
                children[i] = selectedRoom.children[i].id;
            }
            switch (e.keyCode) {
                case 38: //ArrowUp

                    selectedRoom = moveUp(selectedRoom, selectedRoom.fill, children);
                    break;
                case 40: //ArrowDown
                    selectedRoom = moveDown(selectedRoom, selectedRoom.fill, children);
                    break;
                case 39: //ArrowRight

                    //console.log(selectedRoom, "   ", selectedRoom.fill,"  ", children.length);
                    selectedRoom = moveRight(selectedRoom, selectedRoom.fill, children);
                    break;
                case 37: //ArrowLeft
                    selectedRoom = moveLeft(selectedRoom, selectedRoom.fill, children);
                    break;
            }
        }
    });
    $("#sliderST").on("slidestop", function (event, ui) {
        RoomOptions.ST = ui.value;
    });
    $("#sliderMiXD").on("slidestop", function (event, ui) {
        RoomOptions.MiXD = ui.value;
    });
    $("#sliderMaXD").on("slidestop", function (event, ui) {
        RoomOptions.MaXD = ui.value;

    });
    $("#sliderMiYD").on("slidestop", function (event, ui) {
        RoomOptions.MiYD = ui.value;
    });
    $("#sliderMaYD").on("slidestop", function (event, ui) {
        RoomOptions.MaYD = ui.value;
    });
    $("#sliderMiWD").on("slidestop", function (event, ui) {
        RoomOptions.MiWD = ui.value;
    });
    $("#sliderMaWD").on("slidestop", function (event, ui) {
        RoomOptions.MaWD = ui.value;
    });
    $("#sliderMiBD").on("slidestop", function (event, ui) {
        RoomOptions.MiBD = ui.value;
    });
    $("#sliderMaBD").on("slidestop", function (event, ui) {
        RoomOptions.MaBD = ui.value;
    });
    $("#sliderSTN").on("slidestop", function (event, ui) {
        RoomOptions.STN = ui.value;
    });
    $("#sliderDN").on("slidestop", function (event, ui) {
        RoomOptions.DN = ui.value;
    });

    RoomOptions.ST = 0;
    RoomOptions.MiXD = 0;
    RoomOptions.MaXD = 0;
    RoomOptions.MiYD = 0;
    RoomOptions.MaYD = 0;
    RoomOptions.MiWD = 0;
    RoomOptions.MaWD = 0;
    RoomOptions.MiBD = 0;
    RoomOptions.MaBD = 0;
    RoomOptions.STN = 0;
    RoomOptions.DN = 0;

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
    //Two.Texture.repeat = true;
    floorTexture[0] = "#FFFF66";
    floorTexture[1] = "#987654";
    floorTexture[2] = "#77DD77";
    floorTexture[3] = "#0F52BA";
    floorTexture[4] = "#DC143C";
    blockTexture = new Two.Texture("img/floor/block.png");
    var contorno = two.makeRectangle(250, 250, 475, 475);
    contorno.id = "boundary";
    contorno.linewidth = 2;
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

    return rect;
}

function ShortTableProprieties(re) {
    $(re._renderer.elem)
        .click(function (e) {
            if (RoomStatus == 1 && PhaseStatus == 1) {
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
                    if (RoomStatus == 2 && PhaseStatus == 1) {
                        var rect = ShortTable(posX, posY, 1);
                        Short[Short.length] = rect;
                        blockStatus[posY][posX] = true;
                        two.update();
                        ShortTableProprieties(rect);
                    }
                    if (RoomStatus == 3 && PhaseStatus == 1) {
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
            if (RoomStatus == 1 && PhaseStatus == 1) {
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
                    break;
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
// pos[0]=frmY; pos[1]=frmX;pos[2]=toY; pos[3]=toX;
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

function RemoveAllInRoom() {


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

function RemoveAll() {

    if (PhaseStatus == 0) {
        if (Room.length && Room.length > 0) {
            for (var i = Room.length - 1; i >= 0; i--) {
                removeRoom(document.getElementById(Room[i].id));
            }
        }
    } else {
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


}

function draw(data) {

    //if (!data) {
    //  data = obj;
    //}
    //console.log(data);
    ////console.log("Long ", Long.length);
    let max = data["Long"].length;
    for (let i = 0; i < max; i++) {

        let t = data["Long"][i];

        let posX = fromIDtoPosX(t["id"]);

        let posY = fromIDtoPosY(t["id"]);
        let direction = orientationFromID(t["id"]);
        switch (direction) {
            case 0:
                posX -= 0.5;
                break;
            case 1:
                posY -= 0.5;
                break;
            case 2:
                posX += 0.5;
                break;
            case 3:
                posY += 0.5;
                break;
        }
        //console.log(posX, "   ", posY);
        let rect = LongTable(posX, posY, direction);
        Long[Long.length] = rect;
        //console.log("Long ", Long.length);
        two.update();
        LongTableProprieties(rect);

    }
    //console.log(Long.length);
    //console.log("Short ",data["Short"].length);
    for (let i = 0; i < data["Short"].length; i++) {
        //console.log("Short ",data["Short"].length);
        let t = data["Short"][i];
        let posX = fromIDtoPosX(t["id"]);
        let posY = fromIDtoPosY(t["id"]);
        //console.log(posX, " ohi  ", posY);
        let rect = ShortTable(posX, posY, 1);
        Short[Short.length] = rect;
        two.update();
        ShortTableProprieties(rect);

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
    //console.log("type ", type, "  RoomStatus " + RoomStatus);
    if (PhaseStatus == 0) {
        if (RoomStatus == 1) {
            document.getElementById("addRoom").className = "list-group-item";
        }
        if (RoomStatus == 2) {
            document.getElementById("MoveRoom").className = "list-group-item";
        }
        if (RoomStatus == 3) {
            document.getElementById("ResizeRoom").className = "list-group-item";
        }
        if (RoomStatus == 4) {
            document.getElementById("Rubber").className = "list-group-item";
        }
        if (RoomStatus == 5) {
            document.getElementById("RemoveRoom").className = "list-group-item";
        }

        if (type == 1) {
            document.getElementById("addRoom").className = "list-group-item active";
        }
        if (type == 2) {
            document.getElementById("MoveRoom").className = "list-group-item active";
        }
        if (type == 3) {
            document.getElementById("ResizeRoom").className = "list-group-item active";
        }
        if (type == 4) {
            document.getElementById("Rubber").className = "list-group-item active";
        }
        if (type == 5) {
            document.getElementById("RemoveRoom").className = "list-group-item active";
        }


    } else if (PhaseStatus == 1) {
        if (RoomStatus == 1) {
            document.getElementById("DelElement").className = "list-group-item";
        }
        if (RoomStatus == 2) {
            document.getElementById("TableSel").className = "list-group-item";
        }
        if (RoomStatus == 3) {
            document.getElementById("LTableSel").className = "list-group-item";
        }

        if (type == 1) {
            document.getElementById("DelElement").className = "list-group-item active";
        }
        if (type == 2) {
            document.getElementById("TableSel").className = "list-group-item active";
        }
        if (type == 3) {
            document.getElementById("LTableSel").className = "list-group-item active";
        }
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

function GCD(a, b) {
    if (!b) return b === 0 ? a : NaN;
    return GCD(b, a % b);
}

function LCM(a, b) {
    return (a * b) / GCD(a, b);
}
// pos[0]=frmY; pos[1]=frmX;pos[2]=toY; pos[3]=toX;
function checkAndValidateID(room){
    let id = room.id;
    let roomDimension = fromRoomIdToArrayBound(id);
    let validDimension = [27,27,0,0];
    for (let i = 0; i < selectedRoom.children.length; i++) {
        let Y = fromIDtoPosY(selectedRoom.children[i].id);
        let X = fromIDtoPosX(selectedRoom.children[i].id);

        if(Y <validDimension[0]){
            validDimension[0] = Y;
        }else if(Y > validDimension[2]){
            validDimension[2] = Y;
        }
        if(X <validDimension[1]){
            validDimension[1] = X;
        }else if(X > validDimension[3]){
            validDimension[3] = X;
        }
    }
    console.log(id);
    let newId = "roomF"+validDimension[0]+"X"+validDimension[1]+"T"+validDimension[2]+"X"+validDimension[3];
    console.log(newId)
    room.id = newId;
};

/* resize aux function */
function resizingPopolater(resizeGrid, frmX, frmY, toX, toY) {
    //console.log("frmY ",frmY," toY ",toY);
    for (let j = frmY; j < toY; j++)
        for (let i = frmX; i < toX; i++) {
            resizeGrid[j][i] = true;
        }
}

function resizingChecker(resizeGrid, frmX, frmY, toX, toY) {
    let count = 0;
    let res;
    //console.log("frmY ",frmY," toY ",toY);
    for (let j = frmY; j < toY; j++)
        for (let i = frmX; i < toX; i++) {
            if (resizeGrid[j][i] === true) {
                count++;
            }
        }
    let width = toX - frmX;
    let height = toY - frmY;
    res = count > ((width * height) / 2);
    return res;
}

function steps(a, b) {
    let res;
    if (a === b) {
        res = 1;
    } else {
        res = b;
    }
    return res;
}

function resizingGrid(x1, y1, x2, y2, children, Xoffset, Yoffset) {
    let width = x1 * x2;
    //console.log(y1,y2);
    let height = y1 * y2;

    let resGrid = [];
    //console.log("max j ",height);
    for (let j = 0; j < height; j++) {
        resGrid[j] = [];
        for (let i = 0; i < width; i++) {

            resGrid[j][i] = false;
            //console.log(j," °°° ",i,"   ",resGrid[j][i]);
            //console.log(resGrid);
        }
    }
    //console.log("first");

    //piu efficente se controllo solo i figli
    //console.log("y ", y1, "   ", y2);
    //console.log("x ", x1, "   ", x2);
    for (let j = 0; j < y1; j++) {
        for (let i = 0; i < x1; i++) {
            let id = "Y" + (j + Yoffset) + "X" + (i + Xoffset);
            //console.log(j, "   ", i);
            //console.log(id, "   ", children);
            if (children.indexOf(id) > -1) {
                let frmX = i * steps(x1, x2);
                let frmY = j * steps(y1, y2);
                //console.log(i, " °°° ", j);
                //console.log(frmX, " -------- ", frmY, " ## ", frmX + steps(x1, x2), " -------- ", frmY + steps(y1, y2));
                if (!(frmY + steps(y1, y2) > height) && !(frmX + steps(x1, x2) > width)) {
                    resizingPopolater(resGrid, frmX, frmY, frmX + steps(x1, x2), frmY + steps(y1, y2));
                } else {
                    //console.log("blocke by check",frmY + steps(y1, y2) ,"   ", height, "  ", frmX + steps(x1, x2) ,"  ", width );
                }
            }
        }
    }
    //console.log("==============================");
    ////console.log(y2," ####  ",x2);
    ////console.log(resGrid);
    //cercare di migliorare efficenza
    let resizedChildren = [];
    for (let j = 0; j < y2; j++) {
        for (let i = 0; i < x2; i++) {
            let frmX = i * steps(x2, x1);
            let frmY = j * steps(y2, y1);

            if ((!(frmX + steps(x2, x1) > width)) && (!(frmY + steps(y2, y1) > height))) {
                if (resizingChecker(resGrid, frmX, frmY, frmX + steps(x2, x1), frmY + steps(y2, y1))) {
                    let id = "Y" + j + "X" + i;
                    //console.log("new child ", id);
                    resizedChildren[resizedChildren.length] = id;
                }
            } else {
                //console.log(i, " °°° ", j);
                //console.log("blocked by check y",frmY + steps(y2, y1) ,"   ", height,"  " ,(!(frmX + steps(y2, y1) > height))," x ", frmX + steps(x2, x1) ,"  ", width, "  ",(!(frmY + steps(x2, x1) > width)) );
            }

        }
    }
    ////console.log("==============================");
    ////console.log(resizedChildren);
    resGrid = [];
    return resizedChildren;


}

/* house layout stuff */

/* BLOCK (rooms) */
function MouseDown(ev) {

    ev.preventDefault();
    mouseDownFlag = true;
    if (RoomStatus === 2 || RoomStatus === 3) {
        lastY = mouseY(ev);
        lastX = mouseX(ev);
        //console.log(ev);
    }
    frm = ev.target.id;
    let t = ev["target"];
    frmParent = t["parentElement"]["id"];

    if (frm == "boundary") {
        frm = "Room";
    }
    //temp = new
}

function MouseUp(ev) {
    ev.preventDefault();
    mouseDownFlag = false;
    document.getElementById("main").style.cursor = "auto";
    //console.log('remove', bound, '   ', resizeFlag);
    if (tempRoom != null) {
        let dimension = fromRoomIdToArrayBound(selectedRoom.id);
        let newDimension = fromRoomIdToArrayBound(tempRoom.id);
        let fill = selectedRoom.fill;
        removeBoundary();
        removeRoom(selectedRoom);
        tempRoom._renderer.elem.remove();

        tempRoom = null;
        let x1 = dimension[3] - dimension[1] + 1;
        let y1 = dimension[2] - dimension[0] + 1;
        let x2 = newDimension[3] - newDimension[1] + 1;
        let y2 = newDimension[2] - newDimension[0] + 1;
        let children = [];
        for (let i = 0; i < selectedRoom.children.length; i++) {
            children[i] = selectedRoom.children[i].id;
        }
        console.log("dimension ", dimension);
        console.log("new dimension", newDimension);
        let newFilterChildren = resizingGrid(x1, y1, x2, y2, children, dimension[1], dimension[0]);
        console.log("filter children ", newFilterChildren);
        //console.log("offset ",x1,"   " ,y1);

        removeRoom(selectedRoom);
        //console.log("new position ",position[1],"  " , position[0],"  " , position[3] + 1,"  " , position[2]);
        //console.log("=================");
        let room = CreateBlockFiltered(newDimension[1], newDimension[0], newDimension[3], newDimension[2], newFilterChildren, newDimension[1], newDimension[0]);
        room.fill = fill;
        room.stroke = fill;
        Room[Room.length] = room;
        //console.log("new room",room);
        resizeFlag = false;
        two.update();
        BlockPropreties(room);
    } else if (bound != null && resizeFlag) {
        //console.log("second if");
        removeBoundary();
        createResizeBoundary(selectedRoom);
        resizeFlag = false;
    } else {
        //console.log("third if");
        lastX = 0;
        var id = frm.substring(0, 5);
        if (id != "Room" && RoomStatus == 1 && ev.button == 0 && PhaseStatus == 0) {

            var to = ev.target.id;
            var Xfrom = fromIDtoPosX(frm);
            var Yfrom = fromIDtoPosY(frm);
            var Xto = fromIDtoPosX(to);
            var Yto = fromIDtoPosY(to);
            var room = CreateBlock(Xfrom, Yfrom, Xto, Yto);

            Room[Room.length] = room;
            //console.log(Xfrom, "   ", Yfrom, "   ", Xto, "   ", Yto, "   ", room.id);
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
    var room = two.makeGroup();
    var color = getRandomColor();
    for (var i = Xfrom; i <= Xto; i++)
        for (var j = Yfrom; j <= Yto; j++) {
            //Grid[j][i].fill = color;
            //Grid[j][i].fill = floorTexture[0];
            //Grid[j][i].linewidth = 0;
            //Grid[j][i].stroke = TRANSPARENT;

            //useBlock(i, j);
            //console.log(blockStatus[j][i], "  ", j, "  ", i);
            room.add(Grid[j][i]);
        }
    //room.fill = color;
    room.fill = nextFillTexture(Room.length);
    //room.noStroke();
    room.stroke = nextFillTexture(Room.length);
    room.id = "roomF"
    room.id += Yfrom + "X" + Xfrom + "T" + Yto + "X" + Xto;

    //console.log(room);
    return room;

}

function nextFillTexture(pos) {

    return floorTexture[(pos % floorTexture.length)];

}

function CreateBlockFiltered(Xfrom, Yfrom, Xto, Yto, filter, Xoffset, Yoffset) {
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
    let countV = 0;
    let countW = 0;
    //console.log(Yfrom, "  ",Xfrom , "  ",Yto , "   ",Xto );
    var room = two.makeGroup();
    var color = getRandomColor();
    //console.log("Xoff ",Xoffset," Yoff ",Yoffset);
    //console.log(filter);
    for (var j = Yfrom; j <= Yto; j++)
        for (var i = Xfrom; i <= Xto; i++) {
            let position = "Y" + (j - Yoffset) + "X" + (i - Xoffset);

            //console.log("position ",position, "   ",filter);
            //console.log(filter.indexOf(position));
            if (filter.indexOf(position) > -1) {
                Grid[j][i].fill = color;
                countV++;
                Grid[j][i].linewidth = 1;
                Grid[j][i].stroke = color;
                room.add(Grid[j][i]);
            } else {
                //console.log("###############");
                /*countW++;
                Grid[j][i].fill = WHYTE;
                Grid[j][i].linewidth = 1;
                Grid[j][i].stroke = BLACK;*/
            }
        }
    //console.log("room ",countV," whyte ",countW," total ", countV+countW);
    //console.log(room.children);
    room.fill = color;
    room.id = "roomF";
    room.id += Yfrom + "X" + Xfrom + "T" + Yto + "X" + Xto;

    //console.log(room);
    return room;

}

function createResizeBoundary(room) {

    let dimension = fromRoomIdToArrayBound(room.id);
    //console.log("d ", dimension);
    let centerX = ((dimension[3] - dimension[1]) / 2) + dimension[1];
    let centerY = ((dimension[2] - dimension[0]) / 2) + dimension[0];
    //console.log(centerX, "   ", centerY);
    let g = two.makeGroup();
    let boundary = two.makeRectangle(centerX * 25, centerY * 25, (dimension[3] - dimension[1] + 1) * 25, (dimension[2] - dimension[0] + 1) * 25);
    boundary.id = "boundary";
    boundary.fill = TRANSPARENT;
    boundary.stroke = "#FF0000";

    g.add(boundary);

    let RD = two.makeCircle((dimension[3] * 25) + 12.5, (dimension[2] * 25) + 12.5, 5);
    RD.id = "RD";
    let RC = two.makeCircle((dimension[3] * 25) + 12.5, (centerY * 25), 5);
    RC.id = "RC";
    let RU = two.makeCircle((dimension[3] * 25) + 12.5, (dimension[0] * 25) - 12.5, 5);
    RU.id = "RU";

    let CD = two.makeCircle(centerX * 25, (dimension[2] * 25) + 12.5, 5);
    CD.id = "CD";
    let CU = two.makeCircle(centerX * 25, (dimension[0] * 25) - 12.5, 5);
    CU.id = "CU";

    let LD = two.makeCircle((dimension[1] * 25) - 12.5, (dimension[2] * 25) + 12.5, 5);
    LD.id = "LD";
    let LC = two.makeCircle((dimension[1] * 25) - 12.5, (centerY * 25), 5);
    LC.id = "LC";
    let LU = two.makeCircle((dimension[1] * 25) - 12.5, (dimension[0] * 25) - 12.5, 5);
    LU.id = "LU";

    g.add(RD, RC, RU, CD, CU, LD, LC, LU);
    g.id = "B" + room.id;
    bound = g;
    //console.log(" not null of course ",bound);
    two.update();
    boundaryProprieties(g);
}

function removeBoundary() {
    for (let i = 0; i < bound["children"].length; i++) {
        bound.children[i]._renderer.elem.remove();
    }
    bound = null;

}

function boundaryProprieties(boundary) {
    //console.log(boundary);
    /*$(boundary._renderer.elem) .click(function (e) {
        boundary.remove();
    });*/
    $(boundary.children.ids["boundary"]._renderer.elem)
        .click(function (e) {

                removeBoundary(boundary);
            }
        );
    $(boundary.children.ids["RC"]._renderer.elem)
        .mousedown(function (e) {
            mouseDownFlag = true;
            resizeFlag = true;
            resizingDirection = "RC";
            document.getElementById("main").style.cursor = "w-resize";
            //console.log("how ", e);
        });
    $(boundary.children.ids["RD"]._renderer.elem)
        .mousedown(function (e) {
            mouseDownFlag = true;
            resizeFlag = true;
            resizingDirection = "RD";
            document.getElementById("main").style.cursor = "w-resize";
        });
    $(boundary.children.ids["LC"]._renderer.elem)
        .mousedown(function (e) {
            document.getElementById("main").style.cursor = "w-resize";
            mouseDownFlag = true;
            resizeFlag = true;
            resizingDirection = "LC";

        });
    $(boundary.children.ids["CU"]._renderer.elem)
        .mousedown(function (e) {
            mouseDownFlag = true;
            resizeFlag = true;
            resizingDirection = "CU";
            document.getElementById("main").style.cursor = "ns-resize";
        });
    $(boundary.children.ids["CD"]._renderer.elem)
        .mousedown(function (e) {
            mouseDownFlag = true;
            resizeFlag = true;
            resizingDirection = "CD";
            document.getElementById("main").style.cursor = "ns-resize";
        });

    $(boundary.children.ids["RD"]._renderer.elem).mousedown(function (e) {
        resizeFlag = true;
        mouseDownFlag = true;
        resizingDirection = "RD";
        //console.log('here');
        document.getElementById("main").style.cursor = "se-resize";
    });
    $(boundary.children.ids["RU"]._renderer.elem).mousedown(function (e) {
        resizeFlag = true;
        mouseDownFlag = true;
        resizingDirection = "RU";

    });
    $(boundary.children.ids["LD"]._renderer.elem).mousedown(function (e) {
        resizeFlag = true;
        mouseDownFlag = true;
        resizingDirection = "LD";
        //console.log('here');
        document.getElementById("main").style.cursor = "sw-resize";
    });
    $(boundary.children.ids["LU"]._renderer.elem).mousedown(function (e) {
        resizeFlag = true;
        mouseDownFlag = true;
        resizingDirection = "LU";
        document.getElementById("main").style.cursor = "se-resize";
    });
}

function BlockPropreties(room) {
    $(room._renderer.elem)
        .click(function (e) {
            //.log("  d ", lastClicked);
            //console.log(e);

            if (PhaseStatus === 0) {
                if (bound != null && room.id !== selectedRoom.id) {
                    removeBoundary();
                }
                if (RoomStatus === 2) {
                    for (let i = 0; i < Room.length; i++) {
                        if (Room[i].id === room.id) {
                            selectedRoom = room;

                        }
                    }
                }
                if (RoomStatus === 3) {
                    for (let i = 0; i < Room.length; i++) {
                        if (Room[i].id === room.id) {
                            selectedRoom = room;
                            checkAndValidateID(selectedRoom);
                            createResizeBoundary(room);
                            console.log(room);
                        }
                    }
                }
                if (RoomStatus === 4) {
                    removeSinglePieceOfRoom(room, e["target"]);
                }
                if (RoomStatus === 5) {
                    removeRoom(room);
                }

            }
        });
    $(room._renderer.elem).draggable = "false";


}

function moveRight(group, fill, children) {
    let posArray = fromRoomIdToArrayBound(group.id);
    //console.log(group,fill,children.length);
    //console.log(posArray[1] + 1);
    //console.log(posArray[1] + 1 < ROW);
    if (posArray[3] + 1 < ROW) {
        //console.log(posArray);
        /*console.log("R");
       //console.log(group.children.length);
       //console.log(children.length);*/
        removeRoom(group);
        let room = CreateBlockFiltered(posArray[1] + 1, posArray[0], posArray[3] + 1, posArray[2], children, 1, 0);
        Room[Room.length] = room;
        room.fill = fill;
        room.stroke = fill;
        two.update();
        BlockPropreties(room);
        return room;
    } else {
        return group;
    }
}

function moveLeft(group, fill, children) {
    let posArray = fromRoomIdToArrayBound(group.id);
    //console.log(posArray[1] - 1);
    //console.log(posArray[1] - 1 >= 1);
    if (posArray[1] - 1 > 0) {
        //console.log(posArray);
        removeRoom(group);
        let room = CreateBlockFiltered(posArray[1] - 1, posArray[0], posArray[3] - 1, posArray[2], children, -1, 0);
        Room[Room.length] = room;
        room.fill = fill;
        room.stroke = fill;
        two.update();
        BlockPropreties(room);
        return room;
    } else {
        return group;
    }
}

function moveUp(group, fill, children) {

    let posArray = fromRoomIdToArrayBound(group.id);
    //console.log(posArray[1] + 1);
    //console.log(posArray[1] + 1 < ROW);
    if (posArray[0] - 1 > 0) {
        //console.log(posArray);
        removeRoom(group);
        let room = CreateBlockFiltered(posArray[1], posArray[0] - 1, posArray[3], posArray[2] - 1, children, 0, -1);
        Room[Room.length] = room;
        room.fill = fill;
        room.stroke = fill;
        two.update();
        BlockPropreties(room);
        return room;
    } else {
        return group;
    }
}

function moveDown(group, fill, children) {
    let posArray = fromRoomIdToArrayBound(group.id);
    //console.log(posArray[1] - 1);
    //console.log(posArray[1] - 1 >= 1);
    if (posArray[2] + 1 < COL) {
        //console.log("here ", group["children"]);
        /*console.log("S");
       //console.log(group.children.length);
       //console.log(children.length);*/
        removeRoom(group);
        let room = CreateBlockFiltered(posArray[1], posArray[0] + 1, posArray[3], posArray[2] + 1, children, 0, 1);
        Room[Room.length] = room;
        room.fill = fill;
        room.stroke = fill;
        two.update();
        BlockPropreties(room);
        return room;
    } else {
        return group;
    }
}

function moveNE(group, fill, children) {
    let posArray = fromRoomIdToArrayBound(group.id);
    //console.log(posArray[1] + 1);
    //console.log(posArray[1] + 1 < ROW);
    if (posArray[3] + 1 < ROW && posArray[0] - 1 > 0) {
        //console.log(posArray);
        removeRoom(group);
        let room = CreateBlockFiltered(posArray[1] + 1, posArray[0] - 1, posArray[3] + 1, posArray[2] - 1, children, 1, -1);
        Room[Room.length] = room;
        room.fill = fill;
        room.stroke = fill;
        two.update();
        BlockPropreties(room);
    }
}

function moveNO(group, fill, children) {
    let posArray = fromRoomIdToArrayBound(group.id);
    //console.log(posArray[1] - 1);
    //console.log(posArray[1] - 1 >= 1);
    if (posArray[1] - 1 > 0 && posArray[0] - 1 > 0) {
        //console.log(posArray);
        //console.log("here ", group["children"]["0"]["fill"]);
        removeRoom(group);
        let room = CreateBlockFiltered(posArray[1] - 1, posArray[0] - 1, posArray[3] - 1, posArray[2] - 1, children, -1, -1);
        Room[Room.length] = room;
        room.fill = fill;
        room.stroke = fill;
        two.update();
        BlockPropreties(room);
    }
}

function moveSE(group, fill, children) {
    let posArray = fromRoomIdToArrayBound(group.id);
    //console.log("SE");
    //console.log(group.children.length);
    //console.log(children.length);
    if (posArray[0] - 1 > 0 && posArray[3] + 1 < ROW) {
        //console.log("----------------");
        //console.log(group.id);

        let room = CreateBlockFiltered(posArray[1] + 1, posArray[0] + 1, posArray[3] + 1, posArray[2] + 1, children, 1, 1);
        Room[Room.length] = room;
        //console.log("New ",room.children.length);
        removeRoom(group);
        room.fill = fill;
        room.stroke = fill;
        two.update();
        BlockPropreties(room);
    }
}

function moveSO(group, fill, children) {
    let posArray = fromRoomIdToArrayBound(group.id);
    //console.log(posArray[1] - 1);
    //console.log(posArray[1] - 1 >= 1);
    if (posArray[2] + 1 < COL && posArray[1] - 1 > 0) {
        removeRoom(group);
        let room = CreateBlockFiltered(posArray[1] - 1, posArray[0] + 1, posArray[3] - 1, posArray[2] + 1, children, -1, 1);
        Room[Room.length] = room;
        room.fill = fill;
        room.stroke = fill;
        two.update();
        BlockPropreties(room);
    }
}

function mouseMove(ev) {
    //console.log(ev);
    //if (mouseDownFlag)
    //console.log(ev);

    let area;
    let fill;
    if (RoomStatus === 2 && PhaseStatus === 0 && mouseDownFlag) {

        for (let i = 0; i < Room.length; i++) {
            if (Room[i].id === ev["target"]["parentNode"]["id"]) {
                area = Room[i];
                //console.log("######## ", area.children.length);
            }
        }

        let Y = mouseY(ev);
        let X = mouseX(ev);
        //console.log("___________________ ");
        if (area != null) {
            fill = area.fill;
            let children = [];
            for (let i = 0; i < area.children.length; i++) {
                children[i] = area.children[i].id;
            }
            //console.log("children array ",children.length);
            let flag = true;
            if (X > lastX + 25 && Y < lastY - 25 && flag) { //NE
                lastX = X;
                ///console.log("NE");
                flag = false;
                selectedRoom = moveNE(area, fill, children);

            } else if (X < lastX - 25 && Y < lastY - 25 && flag) { //NO
                lastX = X;
                //console.log("NO");
                flag = false;
                selectedRoom = moveNO(area, fill, children);
            }
            if (Y > lastY + 25 && X > lastX + 25 && flag) { //SE
                lastY = Y;
                //console.log("SE");
                flag = false;
                selectedRoom = moveSE(area, fill, children);

            } else if (Y > lastY + 25 && X < lastX - 25 && flag) { //SO
                lastY = Y;
                //console.log("SO");
                flag = false;
                selectedRoom = moveSO(area, fill, children);
            }


            if (X > lastX + 25 && flag) {
                lastX = X;
                //console.log("E");
                flag = false;
                selectedRoom = moveRight(area, fill, children);

            } else if (X < lastX - 25 && flag) {
                lastX = X;
                ////console.log("O");
                flag = false;
                selectedRoom = moveLeft(area, fill, children);
            }
            if (Y > lastY + 25 && flag) {
                lastY = Y;
                //console.log("S");
                flag = false;
                selectedRoom = moveDown(area, fill, children);

            } else if (Y < lastY - 25 && flag) {
                lastY = Y;
                //console.log("N");
                flag = false;
                selectedRoom = moveUp(area, fill, children);
            }
        }
    }
    if (RoomStatus === 3 && PhaseStatus === 0 && resizeFlag) {
        area = selectedRoom;
        //console.log('   erhi', area);
        let Y = mouseY(ev);
        let X = mouseX(ev);
        //console.log("___________________ ");
        if (area != null) {
            //console.log("quii entra");
            fill = area.fill;
            let children = [];

            for (let i = 0; i < area.children.length; i++) {
                children[i] = area.children[i].id;
            }

            let flag = true;
            //console.log("resizing", resizingDirection);
            if (resizingDirection === "RC") {
                if (X > lastX + 25 && flag) { //N
                    lastX = X;
                    flag = false;
                    //console.log((bound == null), "  ", (tempRoom == null));
                    if (bound != null) {
                        removeBoundary(bound);
                        //console.log("delete bound");
                    }

                    let dimension = fromRoomIdToArrayBound(area.id);
                    if (tempRoom != null) {
                        dimension = fromRoomIdToArrayBound(tempRoom.id);

                        //removeRoom(tempRoom);
                        tempRoom._renderer.elem.remove();
                        tempRoom = null;
                        two.update();
                    }
                    if (dimension[3] + 2 > ROW) {

                        dimension[3]--;
                    }
                    let centerX = ((dimension[3] + 1 - dimension[1]) / 2) + dimension[1];
                    let centerY = ((dimension[2] - dimension[0]) / 2) + dimension[0];
                    //console.log(centerX, "   ", centerY);
                    tempRoom = two.makeRectangle(centerX * 25, centerY * 25, (dimension[3] - dimension[1] + 2) * 25, (dimension[2] - dimension[0] + 1) * 25);
                    tempRoom.id = "roomF";
                    tempRoom.id += dimension[0] + "X" + dimension[1] + "T" + dimension[2] + "X" + (dimension[3] + 1);

                    tempRoom.fill = "rgba(0, 255, 0, 0.3)";
                    // Room[Room.length] = tempRoom;
                    createResizeBoundary(tempRoom);
                } else if (X < lastX - 25 && flag) {
                    lastX = X;
                    flag = false;
                    if (bound != null) {
                        removeBoundary(bound);
                        //console.log("delete bound");
                    }

                    let dimension = fromRoomIdToArrayBound(area.id);
                    if (tempRoom != null) {
                        dimension = fromRoomIdToArrayBound(tempRoom.id);

                        //removeRoom(tempRoom);
                        tempRoom._renderer.elem.remove();
                        tempRoom = null;
                        two.update();
                    }
                    if (dimension[3] - 2 < dimension[1]) {
                        //console.log('ciao');
                        dimension[3]++;
                    }
                    let centerX = ((dimension[3] - 1 - dimension[1]) / 2) + dimension[1];
                    let centerY = ((dimension[2] - dimension[0]) / 2) + dimension[0];
                    //console.log(centerX, " the  ", centerY);
                    tempRoom = two.makeRectangle(centerX * 25, centerY * 25, (dimension[1] - dimension[3]) * 25, (dimension[2] - dimension[0] + 1) * 25);
                    tempRoom.id = "roomF";
                    tempRoom.id += dimension[0] + "X" + dimension[1] + "T" + dimension[2] + "X" + (dimension[3] - 1);

                    tempRoom.fill = "rgba(0, 255, 0, 0.3)";
                    createResizeBoundary(tempRoom);
                }
            }
            if (resizingDirection === "LC") {
                if (X > lastX + 25 && flag) { //N
                    lastX = X;
                    flag = false;
                    //console.log((bound == null), "  ", (tempRoom == null));
                    if (bound != null) {
                        removeBoundary(bound);
                        //console.log("delete bound");
                    }

                    let dimension = fromRoomIdToArrayBound(area.id);
                    if (tempRoom != null) {
                        dimension = fromRoomIdToArrayBound(tempRoom.id);

                        //removeRoom(tempRoom);
                        tempRoom._renderer.elem.remove();
                        tempRoom = null;
                        two.update();
                    }
                    if (dimension[1] + 1 > dimension[3]) {
                        dimension[1]--;
                    }
                    //console.log("d ", dimension);
                    let centerX = ((dimension[3] - (dimension[1] + 1)) / 2) + (dimension[1] + 1);
                    let centerY = ((dimension[2] - dimension[0]) / 2) + dimension[0];
                    //console.log(centerX, "   ", centerY);
                    tempRoom = two.makeRectangle(centerX * 25, centerY * 25, (dimension[3] - dimension[1]) * 25, (dimension[2] - dimension[0] + 1) * 25);
                    tempRoom.id = "roomF";
                    tempRoom.id += dimension[0] + "X" + (dimension[1] + 1) + "T" + dimension[2] + "X" + (dimension[3]);

                    tempRoom.fill = "rgba(0, 255, 0, 0.3)";
                    // Room[Room.length] = tempRoom;
                    createResizeBoundary(tempRoom);
                } else if (X < lastX - 25 && flag) {
                    lastX = X;
                    flag = false;
                    if (bound != null) {
                        removeBoundary(bound);
                        //console.log("delete bound");
                    }

                    let dimension = fromRoomIdToArrayBound(area.id);
                    if (tempRoom != null) {
                        dimension = fromRoomIdToArrayBound(tempRoom.id);

                        //removeRoom(tempRoom);
                        tempRoom._renderer.elem.remove();
                        tempRoom = null;
                        two.update();
                    }
                    if (dimension[1] - 1 < 0) {
                        dimension[1]++;
                    }
                    let centerX = ((dimension[3] - (dimension[1] - 1)) / 2) + (dimension[1] - 1);
                    let centerY = ((dimension[2] - dimension[0]) / 2) + dimension[0];
                    //console.log(dimension);
                    //console.log(centerX, " center  ", centerY);
                    tempRoom = two.makeRectangle(centerX * 25, centerY * 25, (dimension[3] - dimension[1] + 2) * 25, (dimension[2] - dimension[0] + 1) * 25);
                    tempRoom.id = "roomF";
                    tempRoom.id += dimension[0] + "X" + (dimension[1] - 1) + "T" + dimension[2] + "X" + (dimension[3]);

                    tempRoom.fill = "rgba(0, 255, 0, 0.3)";
                    createResizeBoundary(tempRoom);
                }
            }
            if (resizingDirection === "CU") {
                if (Y > lastY + 25 && flag) { //N
                    lastY = Y;
                    flag = false;
                    //console.log((bound == null), "  ", (tempRoom == null));
                    if (bound != null) {
                        removeBoundary(bound);
                        //console.log("delete bound");
                    }

                    let dimension = fromRoomIdToArrayBound(area.id);
                    if (tempRoom != null) {
                        dimension = fromRoomIdToArrayBound(tempRoom.id);

                        //removeRoom(tempRoom);
                        tempRoom._renderer.elem.remove();
                        tempRoom = null;
                        two.update();
                    }
                    if (dimension[0] + 1 > dimension[2]) {
                        dimension[0]--;
                    }
                    //console.log("d ", dimension);
                    let centerX = ((dimension[3] - dimension[1]) / 2) + dimension[1];
                    let centerY = ((dimension[2] - (dimension[0] + 1)) / 2) + (dimension[0] + 1);
                    //console.log(centerX, "   ", centerY);
                    tempRoom = two.makeRectangle(centerX * 25, centerY * 25, (dimension[3] - dimension[1] + 1) * 25, (dimension[2] - dimension[0]) * 25);
                    tempRoom.id = "roomF";
                    tempRoom.id += (dimension[0] + 1) + "X" + (dimension[1]) + "T" + dimension[2] + "X" + (dimension[3]);

                    tempRoom.fill = "rgba(0, 255, 0, 0.3)";
                    // Room[Room.length] = tempRoom;
                    createResizeBoundary(tempRoom);
                } else if (Y < lastY - 25 && flag) {
                    lastY = Y;
                    flag = false;
                    if (bound != null) {
                        removeBoundary(bound);
                        //console.log("delete bound");
                    }

                    let dimension = fromRoomIdToArrayBound(area.id);
                    if (tempRoom != null) {
                        dimension = fromRoomIdToArrayBound(tempRoom.id);

                        //removeRoom(tempRoom);
                        tempRoom._renderer.elem.remove();
                        tempRoom = null;
                        two.update();
                    }
                    if (dimension[0] - 1 < 0) {
                        dimension[0]++;
                    }
                    let centerX = ((dimension[3] - dimension[1]) / 2) + dimension[1];
                    let centerY = ((dimension[2] - (dimension[0] - 1)) / 2) + (dimension[0] - 1);
                    //console.log(dimension);
                    //console.log(centerX, " center  ", centerY);
                    tempRoom = two.makeRectangle(centerX * 25, centerY * 25, (dimension[3] - dimension[1] + 1) * 25, (dimension[2] - dimension[0] + 2) * 25);
                    tempRoom.id = "roomF";
                    tempRoom.id += (dimension[0] - 1) + "X" + (dimension[1]) + "T" + dimension[2] + "X" + (dimension[3]);

                    tempRoom.fill = "rgba(0, 255, 0, 0.3)";
                    createResizeBoundary(tempRoom);
                }
            }
            if (resizingDirection === "CD") {
                if (Y > lastY + 25 && flag) { //N
                    lastY = Y;
                    flag = false;
                    //console.log((bound == null), "  ", (tempRoom == null));
                    if (bound != null) {
                        removeBoundary(bound);
                        //console.log("delete bound");
                    }

                    let dimension = fromRoomIdToArrayBound(area.id);
                    if (tempRoom != null) {
                        dimension = fromRoomIdToArrayBound(tempRoom.id);

                        //removeRoom(tempRoom);
                        tempRoom._renderer.elem.remove();
                        tempRoom = null;
                        two.update();
                    }
                    if (dimension[2] + 1 > COL) {
                        dimension[2]--;
                    }
                    // //console.log("d ", dimension);
                    let centerX = ((dimension[3] - dimension[1]) / 2) + dimension[1];
                    let centerY = (((dimension[2] + 1) - (dimension[0])) / 2) + (dimension[0]);
                    //console.log(centerX, "   ", centerY);
                    tempRoom = two.makeRectangle(centerX * 25, centerY * 25, (dimension[3] - dimension[1] + 1) * 25, (dimension[2] - dimension[0] + 2) * 25);
                    tempRoom.id = "roomF";
                    tempRoom.id += (dimension[0]) + "X" + (dimension[1]) + "T" + (dimension[2] + 1) + "X" + (dimension[3]);

                    tempRoom.fill = "rgba(0, 255, 0, 0.3)";
                    // Room[Room.length] = tempRoom;
                    createResizeBoundary(tempRoom);
                } else if (Y < lastY - 25 && flag) {
                    lastY = Y;
                    flag = false;
                    if (bound != null) {
                        removeBoundary(bound);
                        //console.log("delete bound");
                    }

                    let dimension = fromRoomIdToArrayBound(area.id);
                    if (tempRoom != null) {
                        dimension = fromRoomIdToArrayBound(tempRoom.id);

                        //removeRoom(tempRoom);
                        tempRoom._renderer.elem.remove();
                        tempRoom = null;
                        two.update();
                    }
                    if (dimension[2] - 1 < dimension[0]) {
                        dimension[2]++;
                    }
                    let centerX = ((dimension[3] - dimension[1]) / 2) + dimension[1];
                    let centerY = ((dimension[2] - 1 - (dimension[0])) / 2) + (dimension[0]);
                    //console.log(dimension);
                    //console.log(centerX, " center  ", centerY);
                    tempRoom = two.makeRectangle(centerX * 25, centerY * 25, (dimension[3] - dimension[1] + 1) * 25, (dimension[2] - dimension[0]) * 25);
                    tempRoom.id = "roomF";
                    tempRoom.id += (dimension[0]) + "X" + (dimension[1]) + "T" + (dimension[2] - 1) + "X" + (dimension[3]);

                    tempRoom.fill = "rgba(0, 255, 0, 0.3)";
                    createResizeBoundary(tempRoom);
                }
            }
            if (resizingDirection === "RD") {
                if (Y > lastY + 25 && X > lastX + 25 && flag) { //N
                    lastY = Y;
                    lastX = X;
                    flag = false;
                    //console.log((bound == null), "  ", (tempRoom == null));
                    if (bound != null) {
                        removeBoundary(bound);
                        //console.log("delete bound");
                    }

                    let dimension = fromRoomIdToArrayBound(area.id);
                    if (tempRoom != null) {
                        dimension = fromRoomIdToArrayBound(tempRoom.id);

                        //removeRoom(tempRoom);
                        tempRoom._renderer.elem.remove();
                        tempRoom = null;
                        two.update();
                    }
                    if (dimension[2] + 1 > COL) {
                        dimension[2]--;
                    }
                    if (dimension[3] + 1 > ROW) {
                        dimension[3]--;
                    }
                    // //console.log("d ", dimension);
                    let centerX = (((dimension[3] + 1) - dimension[1]) / 2) + dimension[1];
                    let centerY = (((dimension[2] + 1) - dimension[0]) / 2) + dimension[0];
                    //console.log(centerX, "   ", centerY);
                    tempRoom = two.makeRectangle(centerX * 25, centerY * 25, (dimension[3] - dimension[1] + 2) * 25, (dimension[2] - dimension[0] + 2) * 25);
                    tempRoom.id = "roomF";
                    tempRoom.id += (dimension[0]) + "X" + (dimension[1]) + "T" + (dimension[2] + 1) + "X" + (dimension[3] + 1);

                    tempRoom.fill = "rgba(0, 255, 0, 0.3)";
                    // Room[Room.length] = tempRoom;
                    createResizeBoundary(tempRoom);
                } else if (Y < lastY - 25 && X < lastX - 25 && flag) {
                    lastY = Y;
                    lastX = X;
                    flag = false;
                    if (bound != null) {
                        removeBoundary(bound);
                        //console.log("delete bound");
                    }

                    let dimension = fromRoomIdToArrayBound(area.id);
                    if (tempRoom != null) {
                        dimension = fromRoomIdToArrayBound(tempRoom.id);

                        //removeRoom(tempRoom);
                        tempRoom._renderer.elem.remove();
                        tempRoom = null;
                        two.update();
                    }
                    if (dimension[2] - 1 < dimension[0]) {
                        dimension[2]++;

                    }
                    if (dimension[3] - 1 < dimension[1]) {
                        dimension[3]++;
                    }
                    let centerX = ((dimension[3] - 1 - dimension[1]) / 2) + dimension[1];
                    let centerY = ((dimension[2] - 1 - dimension[0]) / 2) + dimension[0];
                    //console.log(dimension);
                    //console.log(centerX, " center  ", centerY);
                    tempRoom = two.makeRectangle(centerX * 25, centerY * 25, (dimension[3] - dimension[1]) * 25, (dimension[2] - dimension[0]) * 25);
                    tempRoom.id = "roomF";
                    tempRoom.id += (dimension[0]) + "X" + (dimension[1]) + "T" + (dimension[2] - 1) + "X" + (dimension[3] - 1);

                    tempRoom.fill = "rgba(0, 255, 0, 0.3)";
                    createResizeBoundary(tempRoom);
                }
            }
            if (resizingDirection === "RU") {
                if (Y < lastY - 25 && X > lastX + 25 && flag) { //N
                    lastY = Y;
                    lastX = X;
                    flag = false;
                    //console.log((bound == null), "  ", (tempRoom == null));
                    if (bound != null) {
                        removeBoundary(bound);
                        //console.log("delete bound");
                    }

                    let dimension = fromRoomIdToArrayBound(area.id);
                    if (tempRoom != null) {
                        dimension = fromRoomIdToArrayBound(tempRoom.id);

                        //removeRoom(tempRoom);
                        tempRoom._renderer.elem.remove();
                        tempRoom = null;
                        two.update();
                    }
                    if (dimension[0] - 1 < 0) {
                        dimension[0]--;
                    }
                    if (dimension[3] + 1 > ROW) {
                        dimension[3]--;
                    }
                    // //console.log("d ", dimension);
                    let centerX = (((dimension[3] + 1) - dimension[1]) / 2) + dimension[1];
                    let centerY = ((dimension[2] - (dimension[0] - 1)) / 2) + (dimension[0] - 1);
                    //console.log(centerX, "   ", centerY);
                    tempRoom = two.makeRectangle(centerX * 25, centerY * 25, (dimension[3] - dimension[1] + 2) * 25, (dimension[2] - dimension[0] + 2) * 25);
                    tempRoom.id = "roomF";
                    tempRoom.id += (dimension[0] - 1) + "X" + (dimension[1]) + "T" + (dimension[2]) + "X" + (dimension[3] + 1);

                    tempRoom.fill = "rgba(0, 255, 0, 0.3)";
                    // Room[Room.length] = tempRoom;
                    createResizeBoundary(tempRoom);
                } else if (Y > lastY + 25 && X < lastX - 25 && flag) {
                    lastY = Y;
                    lastX = X;
                    flag = false;
                    if (bound != null) {
                        removeBoundary(bound);
                        //console.log("delete bound");
                    }

                    let dimension = fromRoomIdToArrayBound(area.id);
                    if (tempRoom != null) {
                        dimension = fromRoomIdToArrayBound(tempRoom.id);

                        //removeRoom(tempRoom);
                        tempRoom._renderer.elem.remove();
                        tempRoom = null;
                        two.update();
                    }
                    if (dimension[0] + 1 > dimension[2]) {
                        dimension[0]--;

                    }
                    if (dimension[3] - 1 < dimension[1]) {
                        dimension[3]++;
                    }
                    let centerX = (((dimension[3] - 1) - dimension[1]) / 2) + dimension[1];
                    let centerY = (((dimension[2]) - (dimension[0] + 1)) / 2) + (dimension[0] + 1);
                    //console.log(dimension);
                    //console.log(centerX, " center  ", centerY);
                    tempRoom = two.makeRectangle(centerX * 25, centerY * 25, (dimension[3] - dimension[1]) * 25, (dimension[2] - dimension[0]) * 25);
                    tempRoom.id = "roomF";
                    tempRoom.id += (dimension[0] + 1) + "X" + (dimension[1]) + "T" + (dimension[2]) + "X" + (dimension[3] - 1);

                    tempRoom.fill = "rgba(0, 255, 0, 0.3)";
                    createResizeBoundary(tempRoom);
                }
            }

            if (resizingDirection === "LD") {
                if (Y > lastY + 25 && X < lastX - 25 && flag) { //N
                    lastY = Y;
                    lastX = X;
                    flag = false;
                    ////console.log((bound == null), "  ", (tempRoom == null));
                    if (bound != null) {
                        removeBoundary(bound);
                        //console.log("delete bound");
                    }

                    let dimension = fromRoomIdToArrayBound(area.id);
                    if (tempRoom != null) {
                        dimension = fromRoomIdToArrayBound(tempRoom.id);

                        //removeRoom(tempRoom);
                        tempRoom._renderer.elem.remove();
                        tempRoom = null;
                        two.update();
                    }
                    if (dimension[2] + 1 > COL) {
                        dimension[2]--;
                    }
                    if (dimension[1] - 1 < 0) {
                        dimension[1]++;
                    }
                    // //console.log("d ", dimension);
                    let centerX = (((dimension[3]) - (dimension[1] - 1)) / 2) + (dimension[1] - 1);
                    let centerY = (((dimension[2] + 1) - dimension[0]) / 2) + dimension[0];
                    //console.log(centerX, "   ", centerY);
                    tempRoom = two.makeRectangle(centerX * 25, centerY * 25, (dimension[3] - dimension[1] + 2) * 25, (dimension[2] - dimension[0] + 2) * 25);
                    tempRoom.id = "roomF";
                    tempRoom.id += (dimension[0]) + "X" + (dimension[1] - 1) + "T" + (dimension[2] + 1) + "X" + (dimension[3]);

                    tempRoom.fill = "rgba(0, 255, 0, 0.3)";
                    // Room[Room.length] = tempRoom;
                    createResizeBoundary(tempRoom);
                } else if (Y < lastY - 25 && X > lastX + 25 && flag) {
                    //console.log(resizingDirection,"  ",Y,"   ",lastY,"   ",X,"   ",lastX);
                    lastY = Y;
                    lastX = X;
                    flag = false;
                    if (bound != null) {
                        removeBoundary(bound);
                        //console.log("delete bound");
                    }

                    let dimension = fromRoomIdToArrayBound(area.id);
                    if (tempRoom != null) {
                        dimension = fromRoomIdToArrayBound(tempRoom.id);

                        //removeRoom(tempRoom);
                        tempRoom._renderer.elem.remove();
                        tempRoom = null;
                        two.update();
                    }
                    if (dimension[2] - 1 < dimension[0]) {
                        ////console.log("Y secure");
                        dimension[2]++;

                    }
                    if (dimension[3] - 1 < dimension[1]) {
                        // //console.log("X secure");

                        dimension[3]++;
                    }
                    let centerX = (((dimension[3]) - (dimension[1] + 1)) / 2) + (dimension[1] + 1);
                    let centerY = (((dimension[2] - 1) - (dimension[0])) / 2) + (dimension[0]);
                    //console.log(dimension);
                    //console.log(centerX, " center  ", centerY);
                    tempRoom = two.makeRectangle(centerX * 25, centerY * 25, (dimension[3] - dimension[1]) * 25, (dimension[2] - dimension[0]) * 25);
                    tempRoom.id = "roomF";
                    tempRoom.id += (dimension[0]) + "X" + (dimension[1] + 1) + "T" + (dimension[2] - 1) + "X" + (dimension[3]);

                    tempRoom.fill = "rgba(0, 255, 0, 0.3)";
                    createResizeBoundary(tempRoom);
                }
            }
            if (resizingDirection === "LU") {
                if (Y < lastY - 25 && X < lastX - 25 && flag) { //N
                    lastY = Y;
                    lastX = X;
                    flag = false;
                    ////console.log((bound == null), "  ", (tempRoom == null));
                    if (bound != null) {
                        removeBoundary(bound);
                        //console.log("delete bound");
                    }

                    let dimension = fromRoomIdToArrayBound(area.id);
                    if (tempRoom != null) {
                        dimension = fromRoomIdToArrayBound(tempRoom.id);

                        //removeRoom(tempRoom);
                        tempRoom._renderer.elem.remove();
                        tempRoom = null;
                        two.update();
                    }
                    if (dimension[0] - 1 < 0) {
                        dimension[0]++;
                    }
                    if (dimension[1] - 1 < 0) {
                        dimension[1]++;
                    }
                    // //console.log("d ", dimension);
                    let centerX = (((dimension[3]) - (dimension[1] - 1)) / 2) + (dimension[1] - 1);
                    let centerY = ((dimension[2] - (dimension[0] - 1)) / 2) + (dimension[0] - 1);
                    //console.log(centerX, "   ", centerY);
                    tempRoom = two.makeRectangle(centerX * 25, centerY * 25, (dimension[3] - dimension[1] + 2) * 25, (dimension[2] - dimension[0] + 2) * 25);
                    tempRoom.id = "roomF";
                    tempRoom.id += (dimension[0] - 1) + "X" + (dimension[1] - 1) + "T" + (dimension[2]) + "X" + (dimension[3]);

                    tempRoom.fill = "rgba(0, 255, 0, 0.3)";
                    // Room[Room.length] = tempRoom;
                    createResizeBoundary(tempRoom);
                } else if (Y > lastY + 25 && X > lastX + 25 && flag) {
                    lastY = Y;
                    lastX = X;
                    flag = false;
                    if (bound != null) {
                        removeBoundary(bound);
                        //console.log("delete bound");
                    }

                    let dimension = fromRoomIdToArrayBound(area.id);
                    if (tempRoom != null) {
                        dimension = fromRoomIdToArrayBound(tempRoom.id);

                        //removeRoom(tempRoom);
                        tempRoom._renderer.elem.remove();
                        tempRoom = null;
                        two.update();
                    }
                    if (dimension[0] + 1 > dimension[2]) {
                        dimension[0]--;

                    }
                    if (dimension[1] + 1 > dimension[3]) {
                        dimension[1]--;
                    }
                    let centerX = ((dimension[3] - (dimension[1] + 1)) / 2) + (dimension[1] + 1);
                    let centerY = ((dimension[2] - (dimension[0] + 1)) / 2) + (dimension[0] + 1);
                    //console.log(dimension);
                    //console.log(centerX, " center  ", centerY);
                    tempRoom = two.makeRectangle(centerX * 25, centerY * 25, (dimension[3] - dimension[1]) * 25, (dimension[2] - dimension[0]) * 25);
                    tempRoom.id = "roomF";
                    tempRoom.id += (dimension[0] + 1) + "X" + (dimension[1] + 1) + "T" + (dimension[2]) + "X" + (dimension[3]);

                    tempRoom.fill = "rgba(0, 255, 0, 0.3)";
                    createResizeBoundary(tempRoom);
                }
            }
        }
    }
}

function removeSinglePieceOfRoom(room, target) {

    let children = room.children;

    for (let i = 0; i < children.length; i++) {
        //console.log(children[i].id);
        if (children[i].id === target.id) {
            let posX = fromIDtoPosX(children[i].id);
            let posY = fromIDtoPosY(children[i].id);
            room.remove(children[i]);
            Grid[posY][posX] = ShortTable(posX, posY, 0);
        }
    }
}

function removeRoom(target) {
    var notFound = true;
    for (var i = 0; i < Room.length && notFound; i++) {

        if (target["id"] == Room[i].id) {
            notFound = false;
            //console.log(Room[i]);
            Room[i].fill = WHYTE;
            Room[i].stroke = BLACK;
            two.clear();
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
            Grid[j][i] = ShortTable(i, j, 0);
        }
    }
}

function unavailableArea(cell) {
    cell.noStroke();
    cell.fill = blockTexture;
    cell.stroke = blockTexture;
}

function nextConf() {
    console.log(conf, ' ciao ', RoomConf.length);
    if (RoomConf.length > conf + 1) {
        saveConf(conf);
        conf++;
        console.log('next', conf);
        //console.log(RoomConf);
        if (RoomConf.hasOwnProperty(conf)) {
            restoreRoomConf(conf);
        }
    }
}

function preConf() {
    if (conf - 1 > -1) {
        //console.log(RoomConf);
        saveConf(conf);
        conf--;
        console.log('pre', conf);
        if (RoomConf.hasOwnProperty(conf)) {
            console.log("her");
            restoreRoomConf(conf);
        }
    }
}

function newConf() {

    console.log(conf);
    saveConf(conf);
    conf = RoomConf.length;
    RoomConf[RoomConf.length] = {};
    console.log(conf);
    console.log(RoomConf);
    RemoveAllInRoom;
}

function saveConf(number) {
    console.log('po ', RoomConf);
    RoomConf[number].Short = Short.slice();
    RoomConf[number].Long = Long.slice();

    RemoveAllInRoom();
}

function restoreRoomConf(number) {
    var room = {
        "Long": RoomConf[number]["Long"],
        "Short": RoomConf[number]["Short"]
    };
    console.log(room);
    draw(room);
}

function nextRoom() {
    if (Room.length > roomNumber + 1) {
        //clearForOtherRoom();
        saveRoom(roomNumber);

        //console.log(savedRoom);
        roomNumber++;
        id = "Room" + roomNumber;
        conf = 0;
        drawRoom(roomNumber);
        if (savedRoom.hasOwnProperty(id)) {
            //console.log("#####
            RoomConf = savedRoom[id];
            restoreRoom(roomNumber);
            //recreateRoom(savedRoom[roomNumber]);
        } else {
            RoomConf = [];
            RoomConf[0] = {};
        }

    }


}

function preRoom() {
    if (roomNumber - 1 > -1) {
        //clearForOtherRoom();

        saveRoom(roomNumber);
        //console.log("long lenght "+Long.length);
        roomNumber--;
        id = "Room" + roomNumber;

        //console.log(roomNumber);
        drawRoom(roomNumber);
        conf = 0;
        //console.log("    "+savedRoom[id]);
        if (savedRoom.hasOwnProperty(id)) {
            //console.log(savedRoom[id].length);
            RoomConf = savedRoom[id];
            //console.log(RoomConf.length);
            restoreRoom(roomNumber);
            //console.log(Long.length);
            //recreateRoom(savedRoom[roomNumber]);
        } else {
            RoomConf = [];
            RoomConf[0] = {};
        }
    }

}

function saveRoom(number) {
    id = "Room" + number;
    savedRoom[id] = [];
    console.log('ehi');
    console.log(RoomConf);
    console.log(RoomConf.length);
    /*let pos = RoomConf.length;
    RoomConf[pos] = {};*/
    RoomConf[conf].Short = Short.slice();
    RoomConf[conf].Long = Long.slice();
    console.log(savedRoom);
    for (let i = 0; i < RoomConf.length; i++) {
        savedRoom[id][i] = {};
        savedRoom[id][i]["Short"] = RoomConf[i].Short.slice();
        savedRoom[id][i]["Long"] = RoomConf[i].Long.slice();
    }
    RoomConf = [];
    /*console.log("SAVING " + id);
   //console.log("##################");
   //console.log(Long);
   //console.log("-------------------");
   //console.log(savedRoom[id]["Long"]);
   //console.log("##################");*/
    RemoveAllInRoom();

}

function restoreRoom(number) {
    id = "Room" + number;
    /*console.log("RESTORING " + id);
   //console.log("##################");
   //console.log(Long);
   //console.log("-------------------");
   //console.log(savedRoom[id]["Long"]);
   //console.log("##################");*/
    var room = {
        "Long": savedRoom[id][0]["Long"],
        "Short": savedRoom[id][0]["Short"]
    };
    for (let i = 0; i < savedRoom[id].length; i++) {
        RoomConf[i].Short = savedRoom[id][i]["Short"].slice();
        RoomConf[i].Long = savedRoom[id][i]["Long"].slice();

    }
    //Short = savedRoom[id]["Short"];
    //Long  = savedRoom[id]["Long"];

    draw(room);

}

function nextStep() {
    if(bound != null){
       //removeBoundary();
    }
    for (let i = 0; i < Room.length; i++) {
        if (Room[i].children.length === 0) {
            removeRoom(Room[i]);
        }
    }
    if (Room.length > 0) {
        PhaseStatus = 1;
        RoomStatus = 2;
        document.getElementById("build").className = "hide";
        document.getElementById("menuRoom").hidden = true;
        document.getElementById("menuTable").hidden = false;
        document.getElementById("next").className = "btn btn-primary";
        document.getElementById("pre").className = "btn btn-primary";
        document.getElementById("send").className = "btn btn-warning";
        document.getElementById("nextConf").className = "btn btn-primary";
        document.getElementById("preConf").className = "btn btn-primary";
        document.getElementById("newConf").className = "btn btn-primary";
        //ClearHouseToRoom();
        Room[0].stroke = TRANSPARENT;
        drawRoom(0);
    }


}

function collectAndSend() {

    saveConf(conf);
    restoreRoomConf(conf);
    let data = {};
    let idRooms = [];
    for (var i = 0; i < Room[roomNumber].children.length; i++) {
        idRooms[idRooms.length] = Room[roomNumber].children[i].id;
    }
    let shortID = [];
    for(let i = 0; i <RoomConf[conf].Short.length;i++){
        shortID[shortID.length] = RoomConf[conf].Short[i].id;

    }
    let longID = [];
    for(let i = 0; i <RoomConf[conf].Long.length;i++){
        longID[longID.length] = RoomConf[conf].Long[i].id;

    }

    data.option = Object.assign({}, RoomOptions);
    data.room = Room[roomNumber].id.slice();
    data.Short = shortID.slice();
    data.Long = longID.slice();
    data.children = idRooms.slice();
    fetch("https://lsid-server.herokuapp.com/request/s", {

        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(data)

    }).then((response) => {

       console.log(response);

    });



}

function drawRoom(number) {
    roomNumber = number;
    let house = Room[roomNumber].children;
    let fill =Room[roomNumber].fill ;
    let idRooms = [];
    //console.log("pre   ",idRooms.length);
    for (var i = 0; i < house.length; i++) {
        idRooms[idRooms.length] = house[i].id;
    }
    console.log(idRooms,"  ",idRooms.length);
    for (var j = 1; j < COL; j++) {
        for (var i = 1; i < ROW; i++) {
            //console.log(Grid[j][i]);
            var type = typeFromID(Grid[j][i].id);
            var id;

            if (type == "Block") {
                id = (Grid[j][i].id).substring(5, (Grid[j][i].id).length);

            } else {
                id = Grid[j][i].id;
            }
            if (!idRooms.includes(id)) {
                console.log("not av");
                //two.remove(Grid[j][i]);

                unavailableArea(Grid[j][i]);
                useBlock(i, j);
            } else {
                clearBlock(i, j);
                Grid[j][i] = ShortTable(i, j, 0);
                Grid[j][i].fill = fill;
            }
        }
    }
    var pos = fromRoomIdToArrayBound(Room[roomNumber].id);
    two.update();
    //console.log(pos);
    roomProprieties(pos[0], pos[1], (pos[2] + 1), (pos[3] + 1));
}