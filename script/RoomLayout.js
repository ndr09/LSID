// note: some of the texture comes from all-free-download.com

var RoomStatus = 1;
var PhaseStatus = 0;
var Grid = [];
var Room = [];
var RoomConf = [{}];
var RoomOptions = {};
var conf = 0;
var Long = [];
var Short = [];
var Armchair = [];
var Bidet = [];
var WC = [];
var Sink = [];
var Bath = [];
var Bed = [];
var Wardrobe = [];
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
var bidetTexture = [];
var armchairTexture = [];
var wcTexture = [];
var sinkTexture = [];
var bathTexture = [];
var bedTexture = [];
var wardrobeTexture = [];
var lastClicked;
var frmParent;
var flag = true;
var API = "https://lsid-server.herokuapp.com/request/s";
let lastSquare;

const ROW = 20;
const COL = 20;


let blockTexture = "rgb(127,127,127)";
const WHYTE = "rgb(255,255,255)";
const BLACK = "rgb(0,0,0)";
const TRANSPARENT = "rgba(0,0,0,0)";
const TEMP_COLOR = "rgba(0, 255, 0, 0.3)";
const leftMenu = "<div class=\"list-group\" id=\"menuTable\" hidden=\"true\">\n" +
    "\n" +
    "                    <a id=\"TableSel\" onclick=\"stat(2)\" class=\"list-group-item active\">Table <img height=\"28\" width=\"28\"\n" +
    "                                                                                                 class=\"img-responsive\"\n" +
    "                                                                                                 src=\"img/small_table_1_1.png\"\n" +
    "                                                                                                 ondrag=\"drag('short')\"\n" +
    "                                                                                                 draggable=\"true\"\n" +
    "                                                                                                 ondragstart=\"dragStart(event)\"></a>\n" +
    "                    <a id=\"LTableSel\" onclick=\"stat(3)\" class=\"list-group-item\">Long Table <img height=\"28\" width=\"56\"\n" +
    "                                                                                                class=\"img-responsive\"\n" +
    "                                                                                                src=\"img/small_table_2_1.png\"\n" +
    "                                                                                                ondrag=\"drag('long')\"\n" +
    "                                                                                                draggable=\"true\"\n" +
    "                                                                                                ondragstart=\"dragStart(event)\">\n" +
    "                    </a>\n" +
    "                    <a id=\"ArmchairSel\" onclick=\"stat(4)\" class=\"list-group-item\">Armchair <img height=\"28\" width=\"28\"\n" +
    "                                                                                                 class=\"img-responsive\"\n" +
    "                                                                                                 src=\"img/armchair_e.png\"\n" +
    "                                                                                                 ondrag=\"drag('armchair')\"\n" +
    "                                                                                                 draggable=\"true\"\n" +
    "                                                                                                 ondragstart=\"dragStart(event)\"></a>\n" +
    "                    <a id=\"BedSel\" onclick=\"stat(9)\" class=\"list-group-item\">Bed <img height=\"28\" width=\"28\"\n" +
    "                                                                                                class=\"img-responsive\"\n" +
    "                                                                                                src=\"img/bed_e.png\"\n" +
    "                                                                                                ondrag=\"drag('bed')\"\n" +
    "                                                                                                draggable=\"true\"\n" +
    "                                                                                                ondragstart=\"dragStart(event)\">\n" +
    "                    </a>\n" +
    "                    <a id=\"WardrobeSel\" onclick=\"stat(10)\" class=\"list-group-item\">Wardrobe <img height=\"28\" width=\"56\"\n" +
    "                                                                                                class=\"img-responsive\"\n" +
    "                                                                                                src=\"img/wardrobe_h.png\"\n" +
    "                                                                                                ondrag=\"drag('wardrobe')\"\n" +
    "                                                                                                draggable=\"true\"\n" +
    "                                                                                                ondragstart=\"dragStart(event)\">\n" +
    "                    </a>\n" +
    "                    <a id=\"BidetSel\" onclick=\"stat(5)\" class=\"list-group-item\">Bidet <img height=\"21\" width=\"28\"\n" +
    "                                                                                                class=\"img-responsive\"\n" +
    "                                                                                                src=\"img/bidet_e.png\"\n" +
    "                                                                                                ondrag=\"drag('bidet')\"\n" +
    "                                                                                                draggable=\"true\"\n" +
    "                                                                                                ondragstart=\"dragStart(event)\">\n" +
    "                    </a>\n" +
    "                    <a id=\"WCSel\" onclick=\"stat(6)\" class=\"list-group-item\">WC <img height=\"19\" width=\"28\"\n" +
    "                                                                                                class=\"img-responsive\"\n" +
    "                                                                                                src=\"img/WC_e.png\"\n" +
    "                                                                                                ondrag=\"drag('WC')\"\n" +
    "                                                                                                draggable=\"true\"\n" +
    "                                                                                                ondragstart=\"dragStart(event)\">\n" +
    "                    </a>\n" +
    "                    <a id=\"SinkSel\" onclick=\"stat(7)\" class=\"list-group-item\">Sink <img height=\"28\" width=\"18\"\n" +
    "                                                                                                class=\"img-responsive\"\n" +
    "                                                                                                src=\"img/sink_e.png\"\n" +
    "                                                                                                ondrag=\"drag('sink')\"\n" +
    "                                                                                                draggable=\"true\"\n" +
    "                                                                                                ondragstart=\"dragStart(event)\">\n" +
    "                    </a>\n" +
    "                    <a id=\"BathSel\" onclick=\"stat(8)\" class=\"list-group-item\">Bath <img height=\"28\" width=\"56\"\n" +
    "                                                                                                class=\"img-responsive\"\n" +
    "                                                                                                src=\"img/bath_e.png\"\n" +
    "                                                                                                ondrag=\"drag('bath')\"\n" +
    "                                                                                                draggable=\"true\"\n" +
    "                                                                                                ondragstart=\"dragStart(event)\">\n" +
    "                    </a>\n" +

    "                    <a id=\"DelElement\" onclick=\"stat(1)\" class=\"list-group-item\">Delete element</a>\n" +
    "                </div>\n" +
    "                <div class=\"list-goup\" id=\"menuRoom\">\n" +
    "                    <a id=\"addRoom\" onclick=\"stat(1)\" class=\"list-group-item active\">Add Room</a>\n" +
    "                    <a id=\"MoveRoom\" onclick=\"stat(2)\" class=\"list-group-item\">Move Room</a>\n" +
    "                    <a id=\"ResizeRoom\" onclick=\"stat(3)\" class=\"list-group-item\">Resize room</a>\n" +
    "                    <a id=\"Rubber\" onclick=\"stat(4)\" class=\"list-group-item\">Rubber</a>\n" +
    "                    <a id=\"RemoveRoom\" onclick=\"stat(5)\" class=\"list-group-item\">RemoveRoom</a>\n" +
    "                </div>";
const options = "<ul>\n" +
    "    <li><a href=\"#options\">General</a></li>\n" +
    "    <li><a href=\"#itemOptions\">Items</a></li>\n" +
    "</ul>\n" +
    "<div class=\"list-group\" id=\"options\">\n" +
    "                    <a id=\"minXdistance\" class=\"list-group-item\">Min X distance\n" +
    "                        <div id=\"sliderMiXD\"></div>\n" +
    "                    </a>\n" +
    "                    <a id=\"maxXdistance\" class=\"list-group-item\">Max X distance\n" +
    "                        <div id=\"sliderMaXD\"></div>\n" +
    "                    </a>\n" +
    "                    <a id=\"minYdistance\" class=\"list-group-item\">Min Y distance\n" +
    "                        <div id=\"sliderMiYD\"></div>\n" +
    "                    </a>\n" +
    "                    <a id=\"maxYdistance\" class=\"list-group-item\">Max Y distance\n" +
    "                        <div id=\"sliderMaYD\"></div>\n" +
    "                    </a>\n" +
    "                    <a id=\"minWallsdistance\" class=\"list-group-item\">Min distance from walls\n" +
    "                        <div id=\"sliderMiWD\"></div>\n" +
    "                    </a>\n" +
    "                    <a id=\"maxWallsdistance\" class=\"list-group-item\">Max distance from walls\n" +
    "                        <div id=\"sliderMaWD\"></div>\n" +
    "                    </a>\n" +
    "                    <a id=\"minBordersdistance\" class=\"list-group-item\">Min distance from borders\n" +
    "                        <div id=\"sliderMiBD\"></div>\n" +
    "                    </a>\n" +
    "                    <a id=\"maxBordersdistance\" class=\"list-group-item\">Max distance from borders\n" +
    "                        <div id=\"sliderMaBD\"></div>\n" +
    "                    </a>\n" +
    "                </div>\n" +
    "<div class=\"list-group\" id=\"itemOptions\">\n" +
    "    <a id=\"numberST\" class=\"list-group-item\">Number of square tables\"\n" +
    "        <div id=\"sliderSTN\"></div>\n" +
    "    </a>\n" +
    "    <a id=\"numberD\" class=\"list-group-item\">Number of desks\"\n" +
    "        <div id=\"sliderDN\"></div>\n" +
    "    </a>\n" +
    "    <a id=\"numberArmchair\" class=\"list-group-item\">Number of armchairs\"\n" +
    "        <div id=\"sliderARM\"></div>\n" +
    "    </a>\n" +
    "    <a id=\"numberBed\" class=\"list-group-item\">Number of beds\"\n" +
    "        <div id=\"sliderBED\"></div>\n" +
    "    </a>\n" +
    "    <a id=\"numberWar\" class=\"list-group-item\">Number of wardrobes\"\n" +
    "        <div id=\"sliderWAR\"></div>\n" +
    "    </a>\n" +
    "    <a id=\"numberBidet\" class=\"list-group-item\">Number of bidets\"\n" +
    "        <div id=\"sliderBDT\"></div>\n" +
    "    </a>\n" +
    "    <a id=\"numberWC\" class=\"list-group-item\">Number of wc\"\n" +
    "        <div id=\"sliderWC\"></div>\n" +
    "    </a>\n" +
    "    <a id=\"numberSink\" class=\"list-group-item\">Number of sinks\"\n" +
    "        <div id=\"sliderSNK\"></div>\n" +
    "    </a>\n" +
    "    <a id=\"numberBath\" class=\"list-group-item\">Number of baths\"\n" +
    "        <div id=\"sliderBTH\"></div>\n" +
    "    </a>\n" +
    "</div>";
const generalButton = "<button class=\"btn btn-danger\" onclick=\"RemoveAll()\">clean</button>\n" +
    "    <button class=\"btn btn-warning\" onclick=\"draw()\">draw</button>\n" +
    "    <button id=\"build\" class=\"btn btn-primary\" onclick=\"nextStep()\">build</button>";
const confMenu = "    <div class=\"row\">\n" +
    "        <div class=\"col-md-4\" >\n" +
    "            <button id=\"nextConf\" align=\"center\" class=\"hide\" onclick=\"nextConf()\">Next configuration</button>\n" +
    "        </div>\n" +
    "        <div  class=\"col-md-4\">\n" +
    "            <button id=\"newConf\" align=\"center\"class=\"hide\" onclick=\"newConf()\">New configuration</button>\n" +
    "\n" +
    "        </div>\n" +
    "        <div  class=\"col-md-4\">\n" +
    "            <button id=\"preConf\" align=\"center\" class=\"hide\" onclick=\"preConf()\">Previous configuration</button>\n" +
    "        </div>\n" +
    "    </div>";
const contextMenuCode = "<div class=\"hide\" id=\"rmenu\">\n" +
    "        <ul>\n" +
    "            <li>\n" +
    "                <a onclick=\"rotate()\">rotate</a>\n" +
    "            </li>\n" +
    "\n" +
    "            <li>\n" +
    "                <a onclick=\"removeTableOnclick()\">delete</a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>";
const roomButton = " <div class=\"row\">\n" +
    "        <div class=\"col-md-4\" >\n" +
    "            <button id=\"pre\" align=\"center\" class=\"hide\" onclick=\"preRoom()\">previous</button>\n" +
    "        </div>\n" +
    "        <div  class=\"col-md-4\">\n" +
    "            <button id=\"send\" align=\"center\" class =\"hide\" onClick=\"collectAndSend()\">Send request</button>\n" +
    "\n" +
    "        </div>\n" +
    "        <div  class=\"col-md-4\">\n" +
    "            <button id=\"next\" align=\"center\" class=\"hide\" onclick=\"nextRoom()\">next</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    ";

function main(idTag, idLeft, idRight, idConf,idGeneral, address) {
    menuLeft(idLeft);
    menuRight(idRight);
    general(idGeneral);
    contextMenu();

    $(document).bind("click", function (event) {
        document.getElementById("rmenu").className = "hide";
    });
    $(document).keydown(function (e) {
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
                    selectedRoom = moveRight(selectedRoom, selectedRoom.fill, children);
                    break;
                case 37: //ArrowLeft
                    selectedRoom = moveLeft(selectedRoom, selectedRoom.fill, children);
                    break;
            }
        }
    });

    if (address != null) {
        API = address;
    }
    roomButtons(idConf);
    tabel(idTag);
    confButtons(idConf);
    roomProprieties(1, 1, COL, ROW);

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
    elem.onmousemove = function (event) {
        mouseMove(event)
    };
    elem.onmousedown = function (event) {
        MouseDown(event)
    };
    elem.onmouseup = function (event) {
        MouseUp(event)
    };
    elem.ondrop = function (event) {
        drop(event)
    };
    elem.ondragover = function (event) {
        allowDrop(event)
    };
    elem.draggable = false;
    elem.contextmenu = false;

    LTtexture = new Two.Texture("img/small_table_2_1.png");
    LTRtexture = new Two.Texture("img/small_table_1_2.png");
    STtexture = new Two.Texture("img/small_table_1_1.png");

    armchairTexture[0] = new Two.Texture("img/armchair_e.png");
    armchairTexture[1] = new Two.Texture("img/armchair_s.png");
    armchairTexture[2] = new Two.Texture("img/armchair_w.png");
    armchairTexture[3] = new Two.Texture("img/armchair_n.png");

    bidetTexture[0] = new Two.Texture("img/bidet_e.png");
    bidetTexture[1] = new Two.Texture("img/bidet_s.png");
    bidetTexture[2] = new Two.Texture("img/bidet_w.png");
    bidetTexture[3] = new Two.Texture("img/bidet_n.png");

    wcTexture[0] = new Two.Texture("img/WC_e.png");
    wcTexture[1] = new Two.Texture("img/WC_s.png");
    wcTexture[2] = new Two.Texture("img/WC_w.png");
    wcTexture[3] = new Two.Texture("img/WC_n.png");

    sinkTexture[0] = new Two.Texture("img/sink_e.png");
    sinkTexture[1] = new Two.Texture("img/sink_s.png");
    sinkTexture[2] = new Two.Texture("img/sink_w.png");
    sinkTexture[3] = new Two.Texture("img/sink_n.png");

    bathTexture[0] = new Two.Texture("img/bath_e.png");
    bathTexture[1] = new Two.Texture("img/bath_s.png");
    bathTexture[2] = new Two.Texture("img/bath_w.png");
    bathTexture[3] = new Two.Texture("img/bath_n.png");

    bedTexture[0] = new Two.Texture("img/bed_e.png");
    bedTexture[1] = new Two.Texture("img/bed_s.png");
    bedTexture[2] = new Two.Texture("img/bed_w.png");
    bedTexture[3] = new Two.Texture("img/bed_n.png");

    wardrobeTexture[0] = new Two.Texture("img/wardrobe_h.png");
    wardrobeTexture[1] = new Two.Texture("img/wardrobe_v.png");


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

function menuLeft(id) {

    let leftID = "#" + id;
    $(leftID).append(leftMenu);
}

function menuRight(id) {

    let rightID = "#" + id;
    $(rightID).append(options);
    $(rightID).tabs();
    $("#sliderMiXD").slider({min: 0, max: 10});
    $("#sliderMaXD").slider({min: 0, max: 10});
    $("#sliderMiYD").slider({min: 0, max: 10});
    $("#sliderMaYD").slider({min: 0, max: 10});
    $("#sliderMiWD").slider({min: 0, max: 10});
    $("#sliderMaWD").slider({min: 0, max: 10});
    $("#sliderMiBD").slider({min: 0, max: 10});
    $("#sliderMaBD").slider({min: 0, max: 10});

    $("#sliderSTN").slider({min: 0, max: 10});
    $("#sliderDN").slider({min: 0, max: 10});
    $("#sliderARM").slider({min: 0, max: 10});
    $("#sliderBED").slider({min: 0, max: 10});
    $("#sliderWAR").slider({min: 0, max: 10});
    $("#sliderBDT").slider({min: 0, max: 10});
    $("#sliderWC").slider({min: 0, max: 10});
    $("#sliderSNK").slider({min: 0, max: 10});
    $("#sliderBTH").slider({min: 0, max: 10});

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
    $("#sliderARM").on("slidestop", function (event, ui) {
        RoomOptions.ARM = ui.value;
    });
    $("#sliderBED").on("slidestop", function (event, ui) {
        RoomOptions.BED = ui.value;
    });
    $("#sliderWAR").on("slidestop", function (event, ui) {
        RoomOptions.WAR = ui.value;
    });
    $("#sliderBDT").on("slidestop", function (event, ui) {
        RoomOptions.BDT = ui.value;
    });
    $("#sliderWC").on("slidestop", function (event, ui) {
        RoomOptions.WC = ui.value;
    });
    $("#sliderSNK").on("slidestop", function (event, ui) {
        RoomOptions.SNK = ui.value;
    });
    $("#sliderBTH").on("slidestop", function (event, ui) {
        RoomOptions.BTH = ui.value;
    });

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
    RoomOptions.ARM = 0;
    RoomOptions.BED = 0;
    RoomOptions.WAR = 0;
    RoomOptions.BDT = 0;
    RoomOptions.WC = 0;
    RoomOptions.SNK = 0;
    RoomOptions.BTH = 0;

}

function confButtons(id) {
    let confId = "#" + id;
    $(confId).append(confMenu);
}
function roomButtons(id) {
    let confId = "#" + id;
    $(confId).append(roomButton);
}
function contextMenu() {
    $("body").append(contextMenuCode);
}

function general(id) {
    let confId = "#" + id;
    $(confId).append(generalButton);
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
        if (dragType == "short") {

            var rect = ShortTable(posX, posY, 1);
            Short[Short.length] = rect;
            stat(2);
            two.update;
            ShortTableProprieties(rect);

        } else if (dragType == "long") {

            if (NearFreeBlock(posX, posY)) {
                var rect = LongTable(posX, posY);
                Long[Long.length] = rect;
                stat(3);
                two.update();

                LongTableProprieties(rect);
            }

        } else if (dragType === "armchair") {
            let rect = ShortTable(posX, posY, 2);
            Armchair[Armchair.length] = rect;
            stat(4);
            two.update();
            ArmchairProprieties(rect);
        } else if (dragType === "bidet") {
            let rect = ShortTable(posX, posY, 3);
            Bidet[Bidet.length] = rect;
            stat(5);
            two.update();
            bidetProprieties(rect);
        } else if (dragType === "WC") {
            let rect = ShortTable(posX, posY, 4);
            WC[WC.length] = rect;
            stat(6);
            two.update();
            WCProprieties(rect);
        } else if (dragType === "sink") {
            let rect = ShortTable(posX, posY, 5);
            Sink[Sink.length] = rect;
            stat(7);
            two.update();
            sinkProprieties(rect);
        } else if (dragType == "bath") {

            if (NearFreeBlock(posX, posY)) {
                var rect = bath(posX, posY);
                Bath[Bath.length] = rect;
                stat(8);
                two.update();

                bathProprieties(rect);
            }

        } else if (dragType == "bed") {

            if (SquareFreeBlock(posX, posY)) {
                var rect = bed(posX, posY);
                Bed[Bed.length] = rect;
                stat(9);
                two.update();

                bedProprieties(rect);
            }

        }
    }
}

function drag(dragItem) {
    dragType = dragItem;
}

/*
*       1X1 ITEMS
*
*
*
*
*
*/

function ShortTable(posX, posY, filler) {
    let rect = two.makeRectangle(posX * 25, posY * 25, 25, 25);

    if (filler === 0) {
        rect.fill = WHYTE;
        rect.id = "Y";
        rect.id += posY + "X" + posX;
    }
    if (filler === 1) {
        rect.fill = STtexture;
        rect.id = "ShortY";
        rect.id += posY + "X" + posX;
        useBlock(posX, posY);
    }
    if (filler === 2) {
        rect.fill = armchairTexture[0];
        rect.id = "ArmchairY";
        rect.id += posY + "X" + posX + "D" + 0;
        useBlock(posX, posY);
    }
    if (filler === 3) {
        rect.fill = bidetTexture[0];
        rect.id = "BidetY";
        rect.id += posY + "X" + posX + "D" + 0;
        useBlock(posX, posY);
    }
    if (filler === 4) {
        rect.fill = wcTexture[0];
        rect.id = "WCY";
        rect.id += posY + "X" + posX + "D" + 0;
        useBlock(posX, posY);
    }
    if (filler === 5) {
        rect.fill = sinkTexture[0];
        rect.id = "SinkY";
        rect.id += posY + "X" + posX + "D" + 0;
        useBlock(posX, posY);
    }

    return rect;
}

function ShortTableProprieties(re) {
    $(re._renderer.elem)
        .click(function (e) {
            if (RoomStatus == 1 && PhaseStatus == 1) {
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

                console.log("something here");
                var str = e["currentTarget"]["id"];
                var posX = fromIDtoPosX(str);
                var posY = fromIDtoPosY(str);
                lastClicked = str;
                RoomStatus = RoomStatus * 1;
                if (!isUsed(posX, posY)) {
                    if (RoomStatus === 2 && PhaseStatus === 1) {
                        var rect = ShortTable(posX, posY, 1);
                        Short[Short.length] = rect;
                        two.update();
                        ShortTableProprieties(rect);
                    }
                    if (RoomStatus === 3 && PhaseStatus === 1) {
                        if (NearFreeBlock(posX, posY)) {
                            let rect = LongTable(posX, posY);
                            Long[Long.length] = rect;
                            two.update();
                            LongTableProprieties(rect);
                        }
                    }
                    if (RoomStatus === 4 && PhaseStatus === 1) {
                        var rect = ShortTable(posX, posY, 2);
                        Armchair[Armchair.length] = rect;
                        two.update();
                        ArmchairProprieties(rect);
                    }
                    if (RoomStatus === 5 && PhaseStatus === 1) {
                        var rect = ShortTable(posX, posY, 3);
                        Bidet[Bidet.length] = rect;
                        two.update();
                        bidetProprieties(rect);
                    }
                    if (RoomStatus === 6 && PhaseStatus === 1) {
                        var rect = ShortTable(posX, posY, 4);
                        WC[WC.length] = rect;
                        two.update();
                        WCProprieties(rect);
                    }
                    if (RoomStatus === 7 && PhaseStatus === 1) {
                        var rect = ShortTable(posX, posY, 5);
                        Sink[Sink.length] = rect;
                        two.update();
                        sinkProprieties(rect);
                    }
                    if (RoomStatus === 8 && PhaseStatus === 1) {
                        if (NearFreeBlock(posX, posY)) {
                            var rect = bath(posX, posY);
                            Bath[Bath.length] = rect;
                            two.update();
                            bathProprieties(rect);
                        }
                    }
                    if (RoomStatus === 9 && PhaseStatus === 1) {
                        if (SquareFreeBlock(posX, posY)) {
                            var rect = bed(posX, posY);
                            Bed[Bed.length] = rect;
                            two.update();
                            bedProprieties(rect);
                        }
                    }
                    if (RoomStatus === 10 && PhaseStatus === 1) {
                        if (lineFreeBlock(posX, posY)) {
                            var rect = wardrobe(posX, posY);
                            Wardrobe[Wardrobe.length] = rect;
                            two.update();
                            wardrobeProprieties(rect);
                        }
                    }

                }
            }
        });
}

function ArmchairProprieties(armchair) {
    menu(armchair);
    $(armchair._renderer.elem)
        .click(function (e) {
            if (RoomStatus == 1 && PhaseStatus == 1) {
                id = e["currentTarget"]["id"];
                removeArmchair(e["currentTarget"]);
            }

        });
}

function removeArmchair(armchair) {
    let pos;
    for (let i = 0; i < Armchair.length; i++) {
        if (Armchair[i].id == armchair.id) {
            let X = fromIDtoPosX(Armchair[i].id);
            let Y = fromIDtoPosY(Armchair[i].id);

            clearBlock(X, Y);
            pos = i;
        }
    }
    armchair.remove();
    Armchair.splice(pos, 1);
}

function bidetProprieties(bidet) {
    menu(bidet);
    $(bidet._renderer.elem)
        .click(function (e) {
            if (RoomStatus == 1 && PhaseStatus == 1) {
                id = e["currentTarget"]["id"];
                removeBidet(e["currentTarget"]);
            }

        });
}

function removeBidet(target) {
    for (var i = 0; i < Bidet.length; i++) {
        if (Bidet[i].id == target["id"]) {
            clearBlock(fromIDtoPosX(Bidet[i].id), fromIDtoPosY(Bidet[i].id));
            target.remove();
            Bidet.splice(i, 1);
        }
    }

}

function WCProprieties(wc) {
    menu(wc);
    $(wc._renderer.elem)
        .click(function (e) {
            if (RoomStatus == 1 && PhaseStatus == 1) {
                id = e["currentTarget"]["id"];
                removeWC(e["currentTarget"]);
            }

        });
}

function removeWC(target) {
    for (var i = 0; i < WC.length; i++) {
        if (WC[i].id == target["id"]) {
            clearBlock(fromIDtoPosX(WC[i].id), fromIDtoPosY(WC[i].id));
            target.remove();
            WC.splice(i, 1);
        }
    }

}

function sinkProprieties(sink) {
    menu(sink);
    $(sink._renderer.elem)
        .click(function (e) {
            if (RoomStatus == 1 && PhaseStatus == 1) {
                id = e["currentTarget"]["id"];
                removeSink(e["currentTarget"]);
            }

        });
}

function removeSink(target) {
    for (var i = 0; i < Sink.length; i++) {
        if (Sink[i].id == target["id"]) {
            clearBlock(fromIDtoPosX(Sink[i].id), fromIDtoPosY(Sink[i].id));
            target.remove();
            Sink.splice(i, 1);
        }
    }

}

/*
*       2X1 ITEMS
*
*
*
*
*
*/

function LongTable(posX, posY, ori) {
    let orientation;
    if (ori || ori == 0) {
        orientation = ori
    } else {
        orientation = getFreeOrientation(posX, posY, 0);
    }
    let rect;
    let centerX = (2 * posX + 1) / 2;
    let centerY = posY;
    switch (orientation) {

        case 0:
            rect = two.makeRectangle((centerX) * 25, (centerY) * 25, 50, 25);

            rect.id = "Long";
            rect.id += "Y" + centerY + "X" + centerX + "D0";
            useBlock(posX, posY, 0);
            rect.fill = LTtexture;
            break;
        case 1:
            centerX -= 0.5;
            centerY += 0.5;
            rect = two.makeRectangle((centerX) * 25, centerY * 25, 25, 50);

            rect.id = "Long";
            rect.id += "Y" + centerY + "X" + centerX + "D1";
            useBlock(posX, posY, 1);
            rect.fill = LTRtexture;
            break;
        case 2:
            centerX -= 1;

            rect = two.makeRectangle((centerX) * 25, centerY * 25, 50, 25);

            rect.id = "Long";
            rect.id += "Y" + centerY + "X" + centerX + "D2";
            useBlock(posX, posY, 2);
            rect.fill = LTtexture;
            break;
        case 3:
            centerX -= 0.5;
            centerY -= 0.5;
            rect = two.makeRectangle((centerX) * 25, centerY * 25, 25, 50);

            rect.id = "Long";
            rect.id += "Y" + centerY + "X" + centerX + "D3";
            useBlock(posX, posY, 3);
            rect.fill = LTRtexture;
            break;
        default:


    }

    return rect;
}

function RemoveLongTable(target) {
    for (let i = 0; i < Long.length; i++) {
        if (Long[i].id == target["id"]) {

            let X = fromIDtoPosX(Long[i].id);
            let Y = fromIDtoPosY(Long[i].id);
            let dir = orientationFromID(Long[i].id);

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
                default: {
                }
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
                let id = e["currentTarget"]["id"].substring(0, 4);
                if (id == "Long") {
                    RemoveLongTable(e["currentTarget"]);
                }
            }
        });
}

function bath(posX, posY, ori) {
    let orientation;
    if (ori || ori == 0) {
        orientation = ori
    } else {
        orientation = getFreeOrientation(posX, posY, 0);
    }
    let rect;
    let centerX = (2 * posX + 1) / 2;
    let centerY = posY;
    switch (orientation) {

        case 0:
            rect = two.makeRectangle((centerX) * 25, (centerY) * 25, 50, 25);

            rect.id = "Bath";
            rect.id += "Y" + centerY + "X" + centerX + "D0";
            useBlock(posX, posY, 0);
            rect.fill = bathTexture[orientation];
            break;
        case 1:
            centerX -= 0.5;
            centerY += 0.5;
            rect = two.makeRectangle((centerX) * 25, centerY * 25, 25, 50);

            rect.id = "Bath";
            rect.id += "Y" + centerY + "X" + centerX + "D1";
            useBlock(posX, posY, 1);
            rect.fill = bathTexture[orientation];
            break;
        case 2:
            centerX -= 1;

            rect = two.makeRectangle((centerX) * 25, centerY * 25, 50, 25);

            rect.id = "Bath";
            rect.id += "Y" + centerY + "X" + centerX + "D2";
            useBlock(posX, posY, 2);
            rect.fill = bathTexture[orientation];

            break;
        case 3:
            centerX -= 0.5;
            centerY -= 0.5;
            rect = two.makeRectangle((centerX) * 25, centerY * 25, 25, 50);

            rect.id = "Bath";
            rect.id += "Y" + centerY + "X" + centerX + "D3";
            useBlock(posX, posY, 3);
            rect.fill = bathTexture[orientation];

            break;
        default:


    }
    return rect;
}

function removeBath(target) {
    for (let i = 0; i < Bath.length; i++) {
        if (Bath[i].id == target["id"]) {

            let X = fromIDtoPosX(Bath[i].id);
            let Y = fromIDtoPosY(Bath[i].id);
            let dir = orientationFromID(Bath[i].id);

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
                default: {
                }
            }
            clearBlock(X, Y, dir);
            target.remove();
            Bath.splice(i, 1);
        }
    }
}

function bathProprieties(rect) {
    menu(rect);

    $(rect._renderer.elem)
        .click(function (e) {
            if (RoomStatus == 1 && PhaseStatus == 1) {
                let id = typeFromID(e["currentTarget"]["id"]);
                if (id == "Bath") {
                    removeBath(e["currentTarget"]);
                }
            }
        });
}

/*
*       2X2 ITEMS
*
*
*
*
*
*/

function bed(posX, posY, ori) {
    let orientation;
    if (ori || ori == 0) {
        orientation = ori
    } else {
        orientation = getFreeOrientation(posX, posY, 0);
    }
    let rect;
    let centerX = (2 * posX + 1) / 2;
    let centerY = (2 * posY + 1) / 2;
    switch (orientation) {

        case 0:
            rect = two.makeRectangle((centerX) * 25, (centerY) * 25, 50, 50);
            rect.id = "Bed";
            rect.id += "Y" + centerY + "X" + centerX + "D0";
            console.log("orientation  ", orientation, "  posX ", posX, "  posY ", posY);
            useSquare(posX, posY);
            rect.fill = bedTexture[orientation];
            break;
        case 1:
            rect = two.makeRectangle((centerX) * 25, centerY * 25, 50, 50);
            rect.id = "Bed";
            rect.id += "Y" + centerY + "X" + centerX + "D1";
            useSquare(posX, posY);
            rect.fill = bedTexture[orientation];
            break;
        case 2:
            rect = two.makeRectangle((centerX) * 25, centerY * 25, 50, 50);
            rect.id = "Bed";
            rect.id += "Y" + centerY + "X" + centerX + "D2";
            useSquare(posX, posY);
            rect.fill = bedTexture[orientation];
            break;
        case 3:
            rect = two.makeRectangle((centerX) * 25, centerY * 25, 50, 50);
            rect.id = "Bed";
            rect.id += "Y" + centerY + "X" + centerX + "D3";
            useSquare(posX, posY);
            rect.fill = bedTexture[orientation];
            break;
        default:


    }
    return rect;
}

function removeBed(target) {
    for (let i = 0; i < Bed.length; i++) {
        if (Bed[i].id == target["id"]) {

            let X = fromIDtoPosX(Bed[i].id) - 0.5;
            let Y = fromIDtoPosY(Bed[i].id) - 0.5;
            let dir = orientationFromID(Bed[i].id);

            clearSquare(X, Y);
            target.remove();
            Bed.splice(i, 1);
        }
    }
}

function bedProprieties(rect) {
    menu(rect);

    $(rect._renderer.elem)
        .click(function (e) {
            if (RoomStatus == 1 && PhaseStatus == 1) {
                let id = typeFromID(e["currentTarget"]["id"]);
                if (id == "Bed") {
                    removeBed(e["currentTarget"]);
                }
            }
        });
}

/*
*       3X1 ITEMS
*
*
*
*
*
*/

function wardrobe(posX, posY, ori) {
    let orientation;
    if (ori || ori == 0) {
        orientation = ori
    } else {
        orientation = getFreeOrientationLine(posX, posY, 0);
    }
    let rect;
    let centerX = (posX + 1);
    let centerY = posY;
    switch (orientation) {

        case 0:
            rect = two.makeRectangle((centerX) * 25, (centerY) * 25, 75, 25);

            rect.id = "Wardrobe";
            rect.id += "Y" + centerY + "X" + centerX + "D0";
            useLine(posX, posY, 0);
            rect.fill = wardrobeTexture[0];
            break;
        case 1:
            centerX -= 1;
            centerY += 1;
            rect = two.makeRectangle((centerX) * 25, centerY * 25, 25, 75);

            rect.id = "Wardrobe";
            rect.id += "Y" + centerY + "X" + centerX + "D1";
            useLine(posX, posY, 1);

            rect.fill = wardrobeTexture[1];
            break;
        case 2:
            centerX -= 2;

            rect = two.makeRectangle((centerX) * 25, centerY * 25, 75, 25);

            rect.id = "Wardrobe";
            rect.id += "Y" + centerY + "X" + centerX + "D2";
            useLine(posX, posY, 2);

            rect.fill = wardrobeTexture[0];
            break;
        case 3:
            centerX -= 1;
            centerY -= 1;
            rect = two.makeRectangle((centerX) * 25, centerY * 25, 25, 75);

            rect.id = "Wardrobe";
            rect.id += "Y" + centerY + "X" + centerX + "D3";
            useLine(posX, posY, 3);

            rect.fill = wardrobeTexture[1];
            break;
        default:


    }
    return rect;
}

function removeWardrobe(target) {
    for (let i = 0; i < Wardrobe.length; i++) {
        if (Wardrobe[i].id == target["id"]) {

            let X = fromIDtoPosX(Wardrobe[i].id);
            let Y = fromIDtoPosY(Wardrobe[i].id);
            let dir = orientationFromID(Wardrobe[i].id);

            switch (dir) {
                case 0:
                    X -= 1;
                    break;
                case 1:
                    Y -= 1;
                    break;
                case 2:
                    X += 1;
                    break;
                case 3:
                    Y += 1;
                    break;
                default: {
                }
            }
            clearLine(X, Y, dir);
            target.remove();
            Wardrobe.splice(i, 1);
        }
    }
}

function wardrobeProprieties(rect) {
    menu(rect);

    $(rect._renderer.elem)
        .click(function (e) {
            if (RoomStatus == 1 && PhaseStatus == 1) {
                let id = typeFromID(e["currentTarget"]["id"]);
                if (id == "Wardrobe") {
                    removeWardrobe(e["currentTarget"]);
                }
            }
        });
}


function menu(elem) {

    if (elem._renderer.elem.addEventListener) {
        elem._renderer.elem.addEventListener('contextmenu', function (e) {
            document.getElementById("rmenu").className = "show";
            document.getElementById("rmenu").style.top = mouseY(e) + 'px';
            document.getElementById("rmenu").style.left = mouseX(e) + 'px';

            RightID = e["currentTarget"]["id"];
            target = e["currentTarget"];
            e.preventDefault();
        }, false);
    } else {

        document.getElementById("test").attachEvent('oncontextmenu', function () {
            document.getElementById("rmenu").className = "show";
            document.getElementById("rmenu").style.top = mouseY(event) + 'px';
            document.getElementById("rmenu").style.left = mouseX(event) + 'px';

            window.event.returnValue = false;


        });
    }


}


function rotate() {
    console.log(RightID);
    let type = typeFromID(RightID);
    if (type === "Long") {
        var dir = RightID[RightID.length - 1] * 1;
        var rect;
        var pos;
        for (var i = 0; i < Long.length; i++) {
            if (Long[i].id == RightID) {
                pos = i;
            }
        }
        var posX = fromIDtoPosX(RightID);
        var posY = fromIDtoPosY(RightID);
        var rect;
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
        var freeRotationDir = getFreeOrientation(X, Y, (dir + 1) % 4);

        if (freeRotationDir != -1) {
            clearBlock(X, Y, dir);
            rect = LongTable(X, Y, freeRotationDir * 1);


            target.remove();
            Long[pos] = rect;
            two.update();

            LongTableProprieties(rect);
        }
    } else if (type === "Armchair") {
        let dir = RightID[RightID.length - 1] * 1;
        let pos;
        for (let i = 0; i < Armchair.length; i++) {
            if (Armchair[i].id == RightID) {
                pos = i;
            }
        }
        let posY = fromIDtoPosY(RightID);
        let posX = fromIDtoPosX(RightID);

        clearBlock(posX, posY);

        let armchair = ShortTable(posX, posY, 2);
        armchair.fill = armchairTexture[(dir + 1) % 4];
        let ori = ((dir + 1) % 4);
        armchair.id = "ArmchairY" + posY + "X" + posX + "D" + ori;

        target.remove();
        Armchair[pos] = armchair;
        two.update();
        ArmchairProprieties(armchair);

    } else if (type === "Bidet") {
        let dir = RightID[RightID.length - 1] * 1;
        let pos;
        for (let i = 0; i < Bidet.length; i++) {
            if (Bidet[i].id == RightID) {
                pos = i;
            }
        }
        let posY = fromIDtoPosY(RightID);
        let posX = fromIDtoPosX(RightID);

        clearBlock(posX, posY);

        let bidet = ShortTable(posX, posY, 3);
        bidet.fill = bidetTexture[(dir + 1) % 4];
        let ori = ((dir + 1) % 4);
        bidet.id = "BidetY" + posY + "X" + posX + "D" + ori;

        target.remove();
        Bidet[pos] = bidet;
        two.update();
        bidetProprieties(bidet);
    } else if (type === "WC") {
        let dir = RightID[RightID.length - 1] * 1;
        let pos;
        for (let i = 0; i < WC.length; i++) {
            if (WC[i].id == RightID) {
                pos = i;
            }
        }
        let posY = fromIDtoPosY(RightID);
        let posX = fromIDtoPosX(RightID);

        clearBlock(posX, posY);

        let wc = ShortTable(posX, posY, 4);
        wc.fill = wcTexture[(dir + 1) % 4];
        let ori = ((dir + 1) % 4);
        wc.id = "WCY" + posY + "X" + posX + "D" + ori;

        target.remove();
        WC[pos] = wc;
        two.update();
        WCProprieties(wc);
    }
    else if (type === "Sink") {
        let dir = RightID[RightID.length - 1] * 1;
        let pos;
        for (let i = 0; i < Sink.length; i++) {
            if (Sink[i].id == RightID) {
                pos = i;
            }
        }
        let posY = fromIDtoPosY(RightID);
        let posX = fromIDtoPosX(RightID);

        clearBlock(posX, posY);

        let sink = ShortTable(posX, posY, 5);
        sink.fill = sinkTexture[(dir + 1) % 4];
        let ori = ((dir + 1) % 4);
        sink.id = "SinkY" + posY + "X" + posX + "D" + ori;

        target.remove();
        Sink[pos] = sink;
        two.update();
        sinkProprieties(sink);
    } else if (type === "Bath") {
        var dir = RightID[RightID.length - 1] * 1;
        console.log("dir ", RightID);
        var rect;
        var pos;
        for (var i = 0; i < Bath.length; i++) {
            if (Bath[i].id == RightID) {
                pos = i;
            }
        }
        var posX = fromIDtoPosX(RightID);
        var posY = fromIDtoPosY(RightID);
        var rect;
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
        var freeRotationDir = getFreeOrientation(X, Y, (dir + 1) % 4);
        console.log("next pos ", freeRotationDir);
        if (freeRotationDir != -1) {
            clearBlock(X, Y, dir);
            rect = bath(X, Y, freeRotationDir * 1);
            target.remove();
            Bath[pos] = rect;
            two.update();

            bathProprieties(rect);
        }
    } else if (type === "Bed") {

        let dir = RightID[RightID.length - 1] * 1;
        let pos;
        for (let i = 0; i < Bed.length; i++) {
            if (Bed[i].id == RightID) {
                pos = i;
            }
        }
        let posY = fromIDtoPosY(RightID);
        let posX = fromIDtoPosX(RightID);

        clearSquare(posX - 0.5, posY - 0.5);

        let rect = bed(posX - 0.5, posY - 0.5, (dir + 1) % 4);

        let ori = ((dir + 1) % 4);
        rect.fill = bedTexture[ori];
        rect.id = "BedY" + posY + "X" + posX + "D" + ori;

        target.remove();
        Bed[pos] = rect;
        two.update();
        bedProprieties(rect);
    } else if ("Wardrobe") {
        var dir = RightID[RightID.length - 1] * 1;
        var rect;
        var pos;
        for (var i = 0; i < Wardrobe.length; i++) {
            if (Wardrobe[i].id == RightID) {
                pos = i;
            }
        }
        var posX = fromIDtoPosX(RightID);
        var posY = fromIDtoPosY(RightID);
        var rect;
        var X = posX;
        var Y = posY;
        switch (dir) {
            case 0:
                X -= 1;
                break;
            case 1:
                Y -= 1;
                break;
            case 2:
                X += 1;
                break;
            case 3:
                Y += 1;
                break;
            default:
        }
        var freeRotationDir = getFreeOrientationLine(X, Y, (dir + 1) % 4);

        if (freeRotationDir != -1) {
            clearLine(X, Y, dir);
            rect = wardrobe(X, Y, freeRotationDir * 1);


            target.remove();
            Wardrobe[pos] = rect;
            two.update();

            wardrobeProprieties(rect);
        }
    }
}

function removeTableOnclick(ev) {

    let type = typeFromID(RightID);
    console.log(type, " ", Sink, " ", RightID);
    if (type === "Long") {
        console.log("long");

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
    } else if (type === "Armchair") {
        console.log("armchair");

        for (var i = 0; i < Armchair.length; i++) {
            if (Armchair[i].id == RightID) {
                var X = fromIDtoPosX(Armchair[i].id);
                var Y = fromIDtoPosY(Armchair[i].id);

                clearBlock(X, Y);
                pos = i;
            }
        }
        target.remove();
        Armchair.splice(pos, 1);

    } else if (type === "Bidet") {
        console.log("bidet");
        for (var i = 0; i < Bidet.length; i++) {
            if (Bidet[i].id == RightID) {
                var X = fromIDtoPosX(Bidet[i].id);
                var Y = fromIDtoPosY(Bidet[i].id);

                clearBlock(X, Y);
                pos = i;
            }
        }
        target.remove();
        Bidet.splice(pos, 1);
    } else if (type === "WC") {
        console.log("WC");
        for (var i = 0; i < WC.length; i++) {
            if (WC[i].id == RightID) {
                var X = fromIDtoPosX(WC[i].id);
                var Y = fromIDtoPosY(WC[i].id);

                clearBlock(X, Y);
                pos = i;
            }
        }
        target.remove();
        WC.splice(pos, 1);
    }
    else if (type === "Sink") {
        console.log("sink ", RightID);
        for (var i = 0; i < Sink.length; i++) {
            if (Sink[i].id == RightID) {
                var X = fromIDtoPosX(Sink[i].id);
                var Y = fromIDtoPosY(Sink[i].id);

                clearBlock(X, Y);
                pos = i;
            }
        }
        target.remove();
        Sink.splice(pos, 1);
    } else if (type === "Bath") {
        var pos;
        for (var i = 0; i < Bath.length; i++) {
            if (Bath[i].id == RightID) {
                var X = fromIDtoPosX(Bath[i].id);
                var Y = fromIDtoPosY(Bath[i].id);
                var dir = orientationFromID(Bath[i].id);
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
        Bath.splice(pos, 1);
    } else if (type === "Bed") {
        console.log(RightID);
        for (var i = 0; i < Bed.length; i++) {
            if (Bed[i].id == RightID) {
                var X = fromIDtoPosX(Bed[i].id) - 0.5;
                var Y = fromIDtoPosY(Bed[i].id) - 0.5;

                clearSquare(X, Y);
                pos = i;
            }
        }
        target.remove();
        Bed.splice(pos, 1);
    } else if (type === "Wardrobe") {
        var pos;
        for (var i = 0; i < Long.length; i++) {
            if (Wardrobe[i].id == RightID) {
                var X = fromIDtoPosX(Wardrobe[i].id);
                var Y = fromIDtoPosY(Wardrobe[i].id);
                var dir = orientationFromID(Wardrobe[i].id);
                switch (dir) {
                    case 0:
                        X -= 1;
                        break;
                    case 1:
                        Y -= 1;
                        break;
                    case 2:
                        X += 1;
                        break;
                    case 3:
                        Y += 1;
                        break;
                    default:
                }

                clearLine(X, Y, dir);
                pos = i;
            }
        }
        target.remove();
        Wardrobe.splice(pos, 1);
    }

}


/*
*
* BOOLEAN GRID
*
* */
function useBlock(X, Y, dir) {

    blockStatus[Y][X] = true;
    if (dir || dir === 0) {
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

function useLine(X, Y, dir) {

    blockStatus[Y][X] = true;
    switch (dir) {
        case 0:
            blockStatus[Y][X + 1] = true;
            blockStatus[Y][X + 2] = true;

            break;
        case 1:
            blockStatus[Y + 1][X] = true;
            blockStatus[Y + 2][X] = true;

            break;
        case 2:
            blockStatus[Y][X - 1] = true;
            blockStatus[Y][X - 2] = true;

            break;
        case 3:
            blockStatus[Y - 1][X] = true;
            blockStatus[Y - 2][X] = true;
            break;
    }


}

function useSquare(X, Y) {
    blockStatus[Y][X] = true;
    blockStatus[Y + 1][X] = true;
    blockStatus[Y][X + 1] = true;
    blockStatus[Y + 1][X + 1] = true;
}

function getFreeOrientation(X, Y, count) {

    var free = -1;
    var flag = true;
    for (let i = 0; i < 4 && flag; i++) {
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

function getFreeOrientationLine(X, Y, count) {

    var free = -1;
    var flag = true;
    for (let i = 0; i < 4 && flag; i++) {
        switch (count) {

            case 0:

                if (X + 2 < ROW && !blockStatus[Y][X + 1] && !blockStatus[Y][X + 2]) {
                    free = 0;
                    flag = false;
                } else {
                    count = (count + 1) % 4;
                }
                break;
            case 1:
                if (Y + 2 < COL && !blockStatus[Y + 1][X] && !blockStatus[Y + 2][X]) {
                    free = 1;
                    flag = false;
                } else {
                    count = (count + 1) % 4;
                }
                break;
            case 2:

                if (X - 2 > 0 && !blockStatus[Y][X - 1] && !blockStatus[Y][X - 2]) {
                    free = 2;
                    flag = false;
                }
            {
                count = (count + 1) % 4;
            }
                break;
            case 3:

                if (Y - 2 > 0 && !blockStatus[Y - 1][X] && !blockStatus[Y - 2][X]) {
                    free = 3;
                    flag = false;
                } else {
                    count = (count + 1) % 4;
                }
                break;
        }
    }
    return free;

}

function clearBlock(X, Y, dir) {
    dir = dir * 1;
    blockStatus[Y][X] = false;
    if (dir || dir === 0) {
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
                break;
            default: {
            }

        }

    }

}

function clearSquare(X, Y) {
    blockStatus[Y][X] = false;
    blockStatus[Y + 1][X] = false;
    blockStatus[Y][X + 1] = false;
    blockStatus[Y + 1][X + 1] = false;
}

function clearLine(X, Y, dir) {
    blockStatus[Y][X] = true;
    switch (dir) {
        case 0:
            blockStatus[Y][X + 1] = false;
            blockStatus[Y][X + 2] = false;

            break;
        case 1:
            blockStatus[Y + 1][X] = false;
            blockStatus[Y + 2][X] = false;

            break;
        case 2:
            blockStatus[Y][X - 1] = false;
            blockStatus[Y][X - 2] = false;

            break;
        case 3:
            blockStatus[Y - 1][X] = false;
            blockStatus[Y - 2][X] = false;
            break;
    }
}

function isUsed(X, Y) {

    return blockStatus[Y][X];
}

function NearFreeBlock(X, Y) {
    let free = false;
    if ((X + 1 < ROW && !blockStatus[Y][X + 1]) || (Y + 1 < COL && !blockStatus[Y + 1][X])
        || (X - 1 > 0 && !blockStatus[Y][X - 1]) || (Y - 1 > 0 && !blockStatus[Y - 1][X]))
        free = true;

    return free;
}

function SquareFreeBlock(X, Y) {
    let free = false;
    if ((X + 1 < ROW && !blockStatus[Y][X + 1]) && (Y + 1 < COL && !blockStatus[Y + 1][X]) && (!blockStatus[Y + 1][X + 1])) {
        free = true;
    }
    return free;
}

function lineFreeBlock(X, Y) {
    let free = false;
    console.log(X + 2 < ROW, " ", !blockStatus[Y][X + 1], " ", !blockStatus[Y][X + 2]);
    if ((X + 2 < ROW && !blockStatus[Y][X + 1] && !blockStatus[Y][X + 2]) || (Y + 2 < COL && !blockStatus[Y + 1][X] && !blockStatus[Y + 2][X])
        || (X - 2 > 0 && !blockStatus[Y][X - 1] && !blockStatus[Y][X - 2]) || (Y - 2 > 0 && !blockStatus[Y - 1][X] && !blockStatus[Y - 2][X]))
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
    for (var j = FC; j < C; j++) {
        for (var i = FR; i < R; i++) {
            var re = Grid[j][i];
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
    if (Armchair.length && Armchair.length > 0) {
        for (var i = Armchair.length - 1; i >= 0; i--) {
            removeArmchair(document.getElementById(Armchair[i].id));

        }
    }
    if (Bidet.length && Bidet.length > 0) {
        for (var i = Bidet.length - 1; i >= 0; i--) {
            removeBidet(document.getElementById(Bidet[i].id));

        }
    }
    if (WC.length && WC.length > 0) {
        for (var i = WC.length - 1; i >= 0; i--) {
            removeWC(document.getElementById(WC[i].id));

        }
    }
    if (Sink.length && Sink.length > 0) {
        for (var i = Sink.length - 1; i >= 0; i--) {
            removeSink(document.getElementById(Sink[i].id));

        }
    }
    if (Bath.length && Bath.length > 0) {
        for (var i = Bath.length - 1; i >= 0; i--) {
            removeBath(document.getElementById(Bath[i].id));

        }
    }
    if (Bed.length && Bed.length > 0) {
        for (var i = Bed.length - 1; i >= 0; i--) {
            removeBed(document.getElementById(Bed[i].id));

        }
    }
    if (Wardrobe.length && Bed.length > 0) {
        for (var i = Wardrobe.length - 1; i >= 0; i--) {
            removeWardrobe(document.getElementById(Wardrobe[i].id));

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
        if (Armchair.length && Armchair.length > 0) {
            for (var i = Armchair.length - 1; i >= 0; i--) {
                removeArmchair(document.getElementById(Armchair[i].id));

            }
        }
        if (Bidet.length && Bidet.length > 0) {
            for (var i = Bidet.length - 1; i >= 0; i--) {
                removeBidet(document.getElementById(Bidet[i].id));

            }
        }
        if (WC.length && WC.length > 0) {
            for (var i = WC.length - 1; i >= 0; i--) {
                removeWC(document.getElementById(WC[i].id));

            }
        }
        if (Sink.length && Sink.length > 0) {
            for (var i = Sink.length - 1; i >= 0; i--) {
                removeSink(document.getElementById(Sink[i].id));

            }
        }
        if (Bath.length && Bath.length > 0) {
            for (var i = Bath.length - 1; i >= 0; i--) {
                removeBath(document.getElementById(Bath[i].id));

            }
        }
        if (Bed.length && Bed.length > 0) {
            for (var i = Bed.length - 1; i >= 0; i--) {
                removeBed(document.getElementById(Bed[i].id));

            }
        }
        if (Wardrobe.length && Bed.length > 0) {
            for (var i = Wardrobe.length - 1; i >= 0; i--) {
                removeWardrobe(document.getElementById(Wardrobe[i].id));

            }
        }

    }


}

function draw(data) {
    console.log(data);
    for (let i = 0; i < data["Long"].length; i++) {

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
        let rect = LongTable(posX, posY, direction);
        Long[Long.length] = rect;
        two.update();
        LongTableProprieties(rect);

    }
    for (let i = 0; i < data["Short"].length; i++) {
        let t = data["Short"][i];
        let posX = fromIDtoPosX(t["id"]);
        let posY = fromIDtoPosY(t["id"]);
        let rect = ShortTable(posX, posY, 1);
        Short[Short.length] = rect;
        two.update();
        ShortTableProprieties(rect);

    }
    for (let i = 0; i < data["Armchair"].length; i++) {
        let t = data["Armchair"][i];
        let posX = fromIDtoPosX(t["id"]);
        let posY = fromIDtoPosY(t["id"]);
        let ori = orientationFromID(t["id"]);
        let rect = ShortTable(posX, posY, 2);
        if (ori !== 0) {
            rect.fill = armchairTexture[ori];
            rect.id = "ArmchairY" + posY + "X" + posX + "D" + ori;
        }
        Armchair[Armchair.length] = rect;

        two.update();
        ArmchairProprieties(rect);

    }
    for (let i = 0; i < data["Bidet"].length; i++) {
        let t = data["Bidet"][i];
        let posX = fromIDtoPosX(t["id"]);
        let posY = fromIDtoPosY(t["id"]);
        let ori = orientationFromID(t["id"]);
        let rect = ShortTable(posX, posY, 3);
        if (ori !== 0) {
            rect.fill = bidetTexture[ori];
            rect.id = "BidetY" + posY + "X" + posX + "D" + ori;
        }
        Bidet[Bidet.length] = rect;

        two.update();
        bidetProprieties(rect);

    }
    for (let i = 0; i < data["WC"].length; i++) {
        let t = data["WC"][i];
        let posX = fromIDtoPosX(t["id"]);
        let posY = fromIDtoPosY(t["id"]);
        let ori = orientationFromID(t["id"]);
        let rect = ShortTable(posX, posY, 4);
        if (ori !== 0) {
            rect.fill = bidetTexture[ori];
            rect.id = "BidetY" + posY + "X" + posX + "D" + ori;
        }
        WC[WC.length] = rect;

        two.update();
        WCProprieties(rect);

    }
    for (let i = 0; i < data["Sink"].length; i++) {
        let t = data["Sink"][i];
        let posX = fromIDtoPosX(t["id"]);
        let posY = fromIDtoPosY(t["id"]);
        let ori = orientationFromID(t["id"]);
        let rect = ShortTable(posX, posY, 5);
        if (ori !== 0) {
            rect.fill = sinkTexture[ori];
            rect.id = "SinkY" + posY + "X" + posX + "D" + ori;
        }
        Sink[Sink.length] = rect;

        two.update();
        sinkProprieties(rect);

    }
    for (let i = 0; i < data["Bath"].length; i++) {
        let t = data["Bath"][i];

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
        let rect = bath(posX, posY, direction);
        Bath[Bath.length] = rect;
        two.update();
        bathProprieties(rect);

    }
    for (let i = 0; i < data["Bed"].length; i++) {
        let t = data["Bed"][i];

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
        let rect = bed(posX - 0.5, posY - 0.5, direction);
        Bed[Bed.length] = rect;
        two.update();
        bedProprieties(rect);

    }
    for (let i = 0; i < data["Long"].length; i++) {

        let t = data["Wardrobe"][i];

        let posX = fromIDtoPosX(t["id"]);

        let posY = fromIDtoPosY(t["id"]);
        let direction = orientationFromID(t["id"]);
        switch (direction) {
            case 0:
                posX -= 1.5;
                break;
            case 1:
                posY -= 1.5;
                break;
            case 2:
                posX += 1.5;
                break;
            case 3:
                posY += 1.5;
                break;
        }
        let rect = wardrobe(posX, posY, direction);
        Wardrobe[Wardrobe.length] = rect;
        two.update();
        wardrobeProprieties(rect);

    }


}

function typeFromID(str) {
    var flag = false;
    var type = "";
    for (var index = 0; index < str.length; index++) {
        if (str[index] == "Y" || str[index] == "F") {
            flag = true;

        }
        if (!flag) {
            type += str[index];
        }
    }
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
    return ret * 1;

}

function fromIDtoPosY(str) {
    var flag = false;
    var ret = "";
    for (var index = 0; index < str.length; index++) {
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
    return ret * 1;
}

function variation(type) {
    if (PhaseStatus == 0) {
        if (bound != null) {
            removeBoundary();
        }
        if (selectedRoom != null) {
            selectedRoom = null;
        }
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
        if (RoomStatus == 4) {
            document.getElementById("ArmchairSel").className = "list-group-item";
        }
        if (RoomStatus == 5) {
            document.getElementById("BidetSel").className = "list-group-item";
        }
        if (RoomStatus == 6) {
            document.getElementById("WCSel").className = "list-group-item";
        }
        if (RoomStatus == 7) {
            document.getElementById("SinkSel").className = "list-group-item";
        }
        if (RoomStatus == 8) {
            document.getElementById("BathSel").className = "list-group-item";
        }
        if (RoomStatus == 9) {
            document.getElementById("BedSel").className = "list-group-item";
        }
        if (RoomStatus == 10) {
            document.getElementById("WardrobeSel").className = "list-group-item";
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
        if (type == 4) {
            document.getElementById("ArmchairSel").className = "list-group-item active";
        }
        if (type == 5) {
            document.getElementById("BidetSel").className = "list-group-item active";
        }
        if (type == 6) {
            document.getElementById("WCSel").className = "list-group-item active";
        }
        if (type == 7) {
            document.getElementById("SinkSel").className = "list-group-item active";
        }
        if (type == 8) {
            document.getElementById("BathSel").className = "list-group-item active";
        }
        if (type == 9) {
            document.getElementById("BedSel").className = "list-group-item active";
        }
        if (type == 10) {
            document.getElementById("WardrobeSel").className = "list-group-item active";
        }
    }


}

function stat(type) {

    variation(type);
    RoomStatus = type;

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
function checkAndValidateID(room) {
    let id = room.id;
    let roomDimension = fromRoomIdToArrayBound(id);
    let validDimension = [27, 27, 0, 0];
    for (let i = 0; i < selectedRoom.children.length; i++) {
        let Y = fromIDtoPosY(selectedRoom.children[i].id);
        let X = fromIDtoPosX(selectedRoom.children[i].id);

        if (Y < validDimension[0]) {
            validDimension[0] = Y;
        } else if (Y > validDimension[2]) {
            validDimension[2] = Y;
        }
        if (X < validDimension[1]) {
            validDimension[1] = X;
        } else if (X > validDimension[3]) {
            validDimension[3] = X;
        }
    }
    room.id = "roomF" + validDimension[0] + "X" + validDimension[1] + "T" + validDimension[2] + "X" + validDimension[3];

}

/* resize aux function */
function resizingPopolater(resizeGrid, frmX, frmY, toX, toY) {
    for (let j = frmY; j < toY; j++)
        for (let i = frmX; i < toX; i++) {
            resizeGrid[j][i] = true;
        }
}

function resizingChecker(resizeGrid, frmX, frmY, toX, toY) {
    let count = 0;
    let res;
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
    let height = y1 * y2;

    let resGrid = [];
    for (let j = 0; j < height; j++) {
        resGrid[j] = [];
        for (let i = 0; i < width; i++) {

            resGrid[j][i] = false;
        }
    }
    for (let j = 0; j < y1; j++) {
        for (let i = 0; i < x1; i++) {
            let id = "Y" + (j + Yoffset) + "X" + (i + Xoffset);

            if (children.indexOf(id) > -1) {
                let frmX = i * steps(x1, x2);
                let frmY = j * steps(y1, y2);
                if (!(frmY + steps(y1, y2) > height) && !(frmX + steps(x1, x2) > width)) {
                    resizingPopolater(resGrid, frmX, frmY, frmX + steps(x1, x2), frmY + steps(y1, y2));
                } else {
                }
            }
        }
    }
    let resizedChildren = [];
    for (let j = 0; j < y2; j++) {
        for (let i = 0; i < x2; i++) {
            let frmX = i * steps(x2, x1);
            let frmY = j * steps(y2, y1);

            if ((!(frmX + steps(x2, x1) > width)) && (!(frmY + steps(y2, y1) > height))) {
                if (resizingChecker(resGrid, frmX, frmY, frmX + steps(x2, x1), frmY + steps(y2, y1))) {
                    let id = "Y" + j + "X" + i;
                    resizedChildren[resizedChildren.length] = id;
                }
            }
        }
    }
    resGrid = [];
    return resizedChildren;


}

/* house layout stuff */

/* BLOCK (rooms) */
function MouseDown(ev) {
    if (PhaseStatus === 0) {
        if (mouseDownFlag) {
            MouseUp(ev);
        } else {
            ev.preventDefault();
            mouseDownFlag = true;
            if (RoomStatus === 2 || RoomStatus === 3) {
                lastY = mouseY(ev);
                lastX = mouseX(ev);
            } else if (RoomStatus === 1) {
                let id = ev.target.id;
                let X = fromIDtoPosX(id);
                let Y = fromIDtoPosY(id);
                lastY = mouseY(ev);
                lastX = mouseX(ev);
                tempRoom = createTempRoom(X, Y, X, Y);
                flag = true;

            }
            frm = ev.target.id;
            let t = ev["target"];
            frmParent = t["parentElement"]["id"];

            if (frm == "boundary") {
                frm = "Room";
            }
            lastSquare = frm;
        }
    }
}

function mouseMove(ev) {
    let area;
    let fill;
    if (RoomStatus === 1 && PhaseStatus === 0 && mouseDownFlag && frm !== "Room") {
        let X = mouseX(ev);
        let Y = mouseY(ev);
        let valid = ((Math.abs(lastX - X) > 25) || (Math.abs(lastY - Y) > 25)) && (ev.target.id && ev.target.id !== "test");

        if (valid) {

            let Yfrom = fromIDtoPosY(frm);
            let Xfrom = fromIDtoPosX(frm);
            let Yto;
            let Xto;

            Yto = fromIDtoPosY(ev.target.id);
            Xto = fromIDtoPosX(ev.target.id);
            lastX = X;
            lastY = Y;
            if (tempRoom != null) {
                removeTempRoom();
            }
            if (Xto < Xfrom) {
                let temp = Xto;
                Xto = Xfrom;
                Xfrom = temp;
            }
            if (Yto < Yfrom) {
                let temp = Yto;
                Yto = Yfrom;
                Yfrom = temp;
            }
            let centerX = ((Xto - Xfrom) / 2) + Xfrom;
            let centerY = ((Yto - Yfrom) / 2) + Yfrom;

            tempRoom = createTempRoom(Xfrom, Yfrom, Xto, Yto);
        }

    }
    if (RoomStatus === 2 && PhaseStatus === 0 && mouseDownFlag) {

        for (let i = 0; i < Room.length; i++) {
            if (Room[i].id === ev["target"]["parentNode"]["id"]) {
                area = Room[i];
            }
        }

        let Y = mouseY(ev);
        let X = mouseX(ev);
        if (area != null) {
            fill = area.fill;
            let children = [];
            for (let i = 0; i < area.children.length; i++) {
                children[i] = area.children[i].id;
            }
            let flag = true;
            if (X > lastX + 25 && Y < lastY - 25 && flag) { //NE
                lastX = X;
                flag = false;
                selectedRoom = moveNE(area, fill, children);

            } else if (X < lastX - 25 && Y < lastY - 25 && flag) { //NO
                lastX = X;
                flag = false;
                selectedRoom = moveNO(area, fill, children);
            }
            if (Y > lastY + 25 && X > lastX + 25 && flag) { //SE
                lastY = Y;
                flag = false;
                selectedRoom = moveSE(area, fill, children);

            } else if (Y > lastY + 25 && X < lastX - 25 && flag) { //SO
                lastY = Y;
                flag = false;
                selectedRoom = moveSO(area, fill, children);
            }


            if (X > lastX + 25 && flag) {
                lastX = X;
                flag = false;
                selectedRoom = moveRight(area, fill, children);

            } else if (X < lastX - 25 && flag) {
                lastX = X;
                flag = false;
                selectedRoom = moveLeft(area, fill, children);
            }
            if (Y > lastY + 25 && flag) {
                lastY = Y;
                flag = false;
                selectedRoom = moveDown(area, fill, children);

            } else if (Y < lastY - 25 && flag) {
                lastY = Y;
                flag = false;
                selectedRoom = moveUp(area, fill, children);
            }
        }
    }
    if (RoomStatus === 3 && PhaseStatus === 0 && resizeFlag) {
        area = selectedRoom;
        let Y = mouseY(ev);
        let X = mouseX(ev);
        if (area != null) {
            fill = area.fill;
            let children = [];

            for (let i = 0; i < area.children.length; i++) {
                children[i] = area.children[i].id;
            }

            let flag = true;
            if (resizingDirection === "RC") {
                if (X > lastX + 25 && flag) { //N
                    lastX = X;
                    flag = false;
                    if (bound != null) {
                        removeBoundary(bound);
                    }

                    let dimension = fromRoomIdToArrayBound(area.id);
                    if (tempRoom != null) {
                        dimension = fromRoomIdToArrayBound(tempRoom.id);
                        tempRoom._renderer.elem.remove();
                        tempRoom = null;
                        two.update();
                    }
                    if (dimension[3] + 2 > ROW) {

                        dimension[3]--;
                    }
                    let centerX = ((dimension[3] + 1 - dimension[1]) / 2) + dimension[1];
                    let centerY = ((dimension[2] - dimension[0]) / 2) + dimension[0];
                    tempRoom = two.makeRectangle(centerX * 25, centerY * 25, (dimension[3] - dimension[1] + 2) * 25, (dimension[2] - dimension[0] + 1) * 25);
                    tempRoom.id = "roomF";
                    tempRoom.id += dimension[0] + "X" + dimension[1] + "T" + dimension[2] + "X" + (dimension[3] + 1);

                    tempRoom.fill = "rgba(0, 255, 0, 0.3)";
                    createResizeBoundary(tempRoom);
                } else if (X < lastX - 25 && flag) {
                    lastX = X;
                    flag = false;
                    if (bound != null) {
                        removeBoundary(bound);
                    }

                    let dimension = fromRoomIdToArrayBound(area.id);
                    if (tempRoom != null) {
                        dimension = fromRoomIdToArrayBound(tempRoom.id);

                        tempRoom._renderer.elem.remove();
                        tempRoom = null;
                        two.update();
                    }
                    if (dimension[3] - 2 < dimension[1]) {
                        dimension[3]++;
                    }
                    let centerX = ((dimension[3] - 1 - dimension[1]) / 2) + dimension[1];
                    let centerY = ((dimension[2] - dimension[0]) / 2) + dimension[0];
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
                    if (bound != null) {
                        removeBoundary(bound);
                    }

                    let dimension = fromRoomIdToArrayBound(area.id);
                    if (tempRoom != null) {
                        dimension = fromRoomIdToArrayBound(tempRoom.id);
                        tempRoom._renderer.elem.remove();
                        tempRoom = null;
                        two.update();
                    }
                    if (dimension[1] + 1 > dimension[3]) {
                        dimension[1]--;
                    }
                    let centerX = ((dimension[3] - (dimension[1] + 1)) / 2) + (dimension[1] + 1);
                    let centerY = ((dimension[2] - dimension[0]) / 2) + dimension[0];
                    tempRoom = two.makeRectangle(centerX * 25, centerY * 25, (dimension[3] - dimension[1]) * 25, (dimension[2] - dimension[0] + 1) * 25);
                    tempRoom.id = "roomF";
                    tempRoom.id += dimension[0] + "X" + (dimension[1] + 1) + "T" + dimension[2] + "X" + (dimension[3]);

                    tempRoom.fill = "rgba(0, 255, 0, 0.3)";
                    createResizeBoundary(tempRoom);
                } else if (X < lastX - 25 && flag) {
                    lastX = X;
                    flag = false;
                    if (bound != null) {
                        removeBoundary(bound);
                    }

                    let dimension = fromRoomIdToArrayBound(area.id);
                    if (tempRoom != null) {
                        dimension = fromRoomIdToArrayBound(tempRoom.id);

                        tempRoom._renderer.elem.remove();
                        tempRoom = null;
                        two.update();
                    }
                    if (dimension[1] - 1 < 0) {
                        dimension[1]++;
                    }
                    let centerX = ((dimension[3] - (dimension[1] - 1)) / 2) + (dimension[1] - 1);
                    let centerY = ((dimension[2] - dimension[0]) / 2) + dimension[0];
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
                    if (bound != null) {
                        removeBoundary(bound);
                    }

                    let dimension = fromRoomIdToArrayBound(area.id);
                    if (tempRoom != null) {
                        dimension = fromRoomIdToArrayBound(tempRoom.id);

                        tempRoom._renderer.elem.remove();
                        tempRoom = null;
                        two.update();
                    }
                    if (dimension[0] + 1 > dimension[2]) {
                        dimension[0]--;
                    }
                    let centerX = ((dimension[3] - dimension[1]) / 2) + dimension[1];
                    let centerY = ((dimension[2] - (dimension[0] + 1)) / 2) + (dimension[0] + 1);
                    tempRoom = two.makeRectangle(centerX * 25, centerY * 25, (dimension[3] - dimension[1] + 1) * 25, (dimension[2] - dimension[0]) * 25);
                    tempRoom.id = "roomF";
                    tempRoom.id += (dimension[0] + 1) + "X" + (dimension[1]) + "T" + dimension[2] + "X" + (dimension[3]);

                    tempRoom.fill = "rgba(0, 255, 0, 0.3)";
                    createResizeBoundary(tempRoom);
                } else if (Y < lastY - 25 && flag) {
                    lastY = Y;
                    flag = false;
                    if (bound != null) {
                        removeBoundary(bound);
                    }

                    let dimension = fromRoomIdToArrayBound(area.id);
                    if (tempRoom != null) {
                        dimension = fromRoomIdToArrayBound(tempRoom.id);
                        tempRoom._renderer.elem.remove();
                        tempRoom = null;
                        two.update();
                    }
                    if (dimension[0] - 1 < 0) {
                        dimension[0]++;
                    }
                    let centerX = ((dimension[3] - dimension[1]) / 2) + dimension[1];
                    let centerY = ((dimension[2] - (dimension[0] - 1)) / 2) + (dimension[0] - 1);
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
                    if (bound != null) {
                        removeBoundary(bound);
                    }

                    let dimension = fromRoomIdToArrayBound(area.id);
                    if (tempRoom != null) {
                        dimension = fromRoomIdToArrayBound(tempRoom.id);

                        tempRoom._renderer.elem.remove();
                        tempRoom = null;
                        two.update();
                    }
                    if (dimension[2] + 1 > COL) {
                        dimension[2]--;
                    }
                    let centerX = ((dimension[3] - dimension[1]) / 2) + dimension[1];
                    let centerY = (((dimension[2] + 1) - (dimension[0])) / 2) + (dimension[0]);
                    tempRoom = two.makeRectangle(centerX * 25, centerY * 25, (dimension[3] - dimension[1] + 1) * 25, (dimension[2] - dimension[0] + 2) * 25);
                    tempRoom.id = "roomF";
                    tempRoom.id += (dimension[0]) + "X" + (dimension[1]) + "T" + (dimension[2] + 1) + "X" + (dimension[3]);

                    tempRoom.fill = "rgba(0, 255, 0, 0.3)";
                    createResizeBoundary(tempRoom);
                } else if (Y < lastY - 25 && flag) {
                    lastY = Y;
                    flag = false;
                    if (bound != null) {
                        removeBoundary(bound);
                    }

                    let dimension = fromRoomIdToArrayBound(area.id);
                    if (tempRoom != null) {
                        dimension = fromRoomIdToArrayBound(tempRoom.id);

                        tempRoom._renderer.elem.remove();
                        tempRoom = null;
                        two.update();
                    }
                    if (dimension[2] - 1 < dimension[0]) {
                        dimension[2]++;
                    }
                    let centerX = ((dimension[3] - dimension[1]) / 2) + dimension[1];
                    let centerY = ((dimension[2] - 1 - (dimension[0])) / 2) + (dimension[0]);
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
                    if (bound != null) {
                        removeBoundary(bound);
                    }

                    let dimension = fromRoomIdToArrayBound(area.id);
                    if (tempRoom != null) {
                        dimension = fromRoomIdToArrayBound(tempRoom.id);

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
                    let centerX = (((dimension[3] + 1) - dimension[1]) / 2) + dimension[1];
                    let centerY = (((dimension[2] + 1) - dimension[0]) / 2) + dimension[0];
                    tempRoom = two.makeRectangle(centerX * 25, centerY * 25, (dimension[3] - dimension[1] + 2) * 25, (dimension[2] - dimension[0] + 2) * 25);
                    tempRoom.id = "roomF";
                    tempRoom.id += (dimension[0]) + "X" + (dimension[1]) + "T" + (dimension[2] + 1) + "X" + (dimension[3] + 1);

                    tempRoom.fill = "rgba(0, 255, 0, 0.3)";
                    createResizeBoundary(tempRoom);
                } else if (Y < lastY - 25 && X < lastX - 25 && flag) {
                    lastY = Y;
                    lastX = X;
                    flag = false;
                    if (bound != null) {
                        removeBoundary(bound);
                    }

                    let dimension = fromRoomIdToArrayBound(area.id);
                    if (tempRoom != null) {
                        dimension = fromRoomIdToArrayBound(tempRoom.id);

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
                    if (bound != null) {
                        removeBoundary(bound);
                    }

                    let dimension = fromRoomIdToArrayBound(area.id);
                    if (tempRoom != null) {
                        dimension = fromRoomIdToArrayBound(tempRoom.id);

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
                    let centerX = (((dimension[3] + 1) - dimension[1]) / 2) + dimension[1];
                    let centerY = ((dimension[2] - (dimension[0] - 1)) / 2) + (dimension[0] - 1);
                    tempRoom = two.makeRectangle(centerX * 25, centerY * 25, (dimension[3] - dimension[1] + 2) * 25, (dimension[2] - dimension[0] + 2) * 25);
                    tempRoom.id = "roomF";
                    tempRoom.id += (dimension[0] - 1) + "X" + (dimension[1]) + "T" + (dimension[2]) + "X" + (dimension[3] + 1);

                    tempRoom.fill = "rgba(0, 255, 0, 0.3)";
                    createResizeBoundary(tempRoom);
                } else if (Y > lastY + 25 && X < lastX - 25 && flag) {
                    lastY = Y;
                    lastX = X;
                    flag = false;
                    if (bound != null) {
                        removeBoundary(bound);
                    }

                    let dimension = fromRoomIdToArrayBound(area.id);
                    if (tempRoom != null) {
                        dimension = fromRoomIdToArrayBound(tempRoom.id);

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
                    if (bound != null) {
                        removeBoundary(bound);
                    }

                    let dimension = fromRoomIdToArrayBound(area.id);
                    if (tempRoom != null) {
                        dimension = fromRoomIdToArrayBound(tempRoom.id);
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
                    let centerX = (((dimension[3]) - (dimension[1] - 1)) / 2) + (dimension[1] - 1);
                    let centerY = (((dimension[2] + 1) - dimension[0]) / 2) + dimension[0];
                    tempRoom = two.makeRectangle(centerX * 25, centerY * 25, (dimension[3] - dimension[1] + 2) * 25, (dimension[2] - dimension[0] + 2) * 25);
                    tempRoom.id = "roomF";
                    tempRoom.id += (dimension[0]) + "X" + (dimension[1] - 1) + "T" + (dimension[2] + 1) + "X" + (dimension[3]);

                    tempRoom.fill = "rgba(0, 255, 0, 0.3)";
                    createResizeBoundary(tempRoom);
                } else if (Y < lastY - 25 && X > lastX + 25 && flag) {
                    lastY = Y;
                    lastX = X;
                    flag = false;
                    if (bound != null) {
                        removeBoundary(bound);
                    }

                    let dimension = fromRoomIdToArrayBound(area.id);
                    if (tempRoom != null) {
                        dimension = fromRoomIdToArrayBound(tempRoom.id);

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
                    let centerX = (((dimension[3]) - (dimension[1] + 1)) / 2) + (dimension[1] + 1);
                    let centerY = (((dimension[2] - 1) - (dimension[0])) / 2) + (dimension[0]);
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
                    if (bound != null) {
                        removeBoundary(bound);
                    }

                    let dimension = fromRoomIdToArrayBound(area.id);
                    if (tempRoom != null) {
                        dimension = fromRoomIdToArrayBound(tempRoom.id);

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
                    let centerX = (((dimension[3]) - (dimension[1] - 1)) / 2) + (dimension[1] - 1);
                    let centerY = ((dimension[2] - (dimension[0] - 1)) / 2) + (dimension[0] - 1);
                    tempRoom = two.makeRectangle(centerX * 25, centerY * 25, (dimension[3] - dimension[1] + 2) * 25, (dimension[2] - dimension[0] + 2) * 25);
                    tempRoom.id = "roomF";
                    tempRoom.id += (dimension[0] - 1) + "X" + (dimension[1] - 1) + "T" + (dimension[2]) + "X" + (dimension[3]);

                    tempRoom.fill = "rgba(0, 255, 0, 0.3)";
                    createResizeBoundary(tempRoom);
                } else if (Y > lastY + 25 && X > lastX + 25 && flag) {
                    lastY = Y;
                    lastX = X;
                    flag = false;
                    if (bound != null) {
                        removeBoundary(bound);
                    }

                    let dimension = fromRoomIdToArrayBound(area.id);
                    if (tempRoom != null) {
                        dimension = fromRoomIdToArrayBound(tempRoom.id);

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

function MouseUp(ev) {
    ev.preventDefault();
    mouseDownFlag = false;
    document.getElementById("main").style.cursor = "auto";
    if (RoomStatus === 3 && PhaseStatus === 0 && resizeFlag) {
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
            let newFilterChildren = resizingGrid(x1, y1, x2, y2, children, dimension[1], dimension[0]);

            removeRoom(selectedRoom);
            let room = CreateBlockFiltered(newDimension[1], newDimension[0], newDimension[3], newDimension[2], newFilterChildren, newDimension[1], newDimension[0]);
            room.fill = fill;
            room.stroke = fill;
            Room[Room.length] = room;
            resizeFlag = false;
            two.update();
            BlockPropreties(room);
        }}else if (bound != null && resizeFlag) {
            removeBoundary();
            createResizeBoundary(selectedRoom);
            resizeFlag = false;
        }
        if (RoomStatus === 1 && PhaseStatus === 0 && frm !== "Room" && tempRoom !== null) {
            let dimension = fromRoomIdToArrayBound(tempRoom.id);
            removeTempRoom();
            let room = CreateBlock(dimension[1], dimension[0], dimension[3], dimension[2]);

            Room[Room.length] = room;
            two.update();
            BlockPropreties(room);

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
            room.add(Grid[j][i]);
        }
    room.fill = nextFillTexture(Room.length);
    room.stroke = nextFillTexture(Room.length);
    room.id = "roomF"
    room.id += Yfrom + "X" + Xfrom + "T" + Yto + "X" + Xto;
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
    var room = two.makeGroup();
    var color = getRandomColor();
    for (var j = Yfrom; j <= Yto; j++)
        for (var i = Xfrom; i <= Xto; i++) {
            let position = "Y" + (j - Yoffset) + "X" + (i - Xoffset);
            if (filter.indexOf(position) > -1) {
                Grid[j][i].fill = color;
                countV++;
                Grid[j][i].linewidth = 1;
                Grid[j][i].stroke = color;
                room.add(Grid[j][i]);
            }
        }
    room.fill = color;
    room.id = "roomF";
    room.id += Yfrom + "X" + Xfrom + "T" + Yto + "X" + Xto;
    return room;

}

function createResizeBoundary(room) {

    let dimension = fromRoomIdToArrayBound(room.id);
    let centerX = ((dimension[3] - dimension[1]) / 2) + dimension[1];
    let centerY = ((dimension[2] - dimension[0]) / 2) + dimension[0];
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
    two.update();
    boundaryProprieties(g);
}

function createTempRoom(Xfrom, Yfrom, Xto, Yto) {
    let room = two.makeGroup();
    if (Xto < Xfrom) {
        let temp = Xto;
        Xto = Xfrom;
        Xfrom = temp;
    }
    if (Yto < Yfrom) {
        let temp = Yto;
        Yto = Yfrom;
        Yfrom = temp;
    }


    for (let posY = Yfrom; posY <= Yto; posY++)
        for (let posX = Xfrom; posX <= Xto; posX++) {
            let rect = two.makeRectangle(posX * 25, posY * 25, 25, 25);
            rect.id = "Y" + posY + "X" + posX;
            room.add(rect);
        }
    room.noStroke();
    room.id = "roomF";
    room.id += Yfrom + "X" + Xfrom + "T" + Yto + "X" + Xto;
    room.fill = TEMP_COLOR;
    return room;
}

function removeTempRoom() {

    for (let i = 0; i < tempRoom["children"].length; i++) {
        tempRoom.children[i]._renderer.elem.remove();
    }
    tempRoom = null;
    two.clear();
}

function removeBoundary() {
    for (let i = 0; i < bound["children"].length; i++) {
        bound.children[i]._renderer.elem.remove();
    }
    bound = null;

}

function boundaryProprieties(boundary) {

    $(boundary.children.ids["boundary"]._renderer.elem)
        .click(function (e) {

            }
        );
    $(boundary.children.ids["RC"]._renderer.elem)
        .mousedown(function (e) {
            mouseDownFlag = true;
            resizeFlag = true;
            resizingDirection = "RC";
            document.getElementById("main").style.cursor = "w-resize";
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

    if (posArray[3] + 1 < ROW) {
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

    if (posArray[1] - 1 > 0) {
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

    if (posArray[0] - 1 > 0) {
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

    if (posArray[2] + 1 < COL) {
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

    if (posArray[3] + 1 < ROW && posArray[0] - 1 > 0) {

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
    if (posArray[1] - 1 > 0 && posArray[0] - 1 > 0) {
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
    if (posArray[0] - 1 > 0 && posArray[3] + 1 < ROW) {

        let room = CreateBlockFiltered(posArray[1] + 1, posArray[0] + 1, posArray[3] + 1, posArray[2] + 1, children, 1, 1);
        Room[Room.length] = room;
        removeRoom(group);
        room.fill = fill;
        room.stroke = fill;
        two.update();
        BlockPropreties(room);
    }
}

function moveSO(group, fill, children) {
    let posArray = fromRoomIdToArrayBound(group.id);
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


function removeSinglePieceOfRoom(room, target) {

    let children = room.children;

    for (let i = 0; i < children.length; i++) {
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
            var house = Room[j].children;
            var idRooms = [];
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
    if (RoomConf.length > conf + 1) {
        saveConf(conf);
        conf++;
        if (RoomConf.hasOwnProperty(conf)) {
            restoreRoomConf(conf);
        }
    }
}

function preConf() {
    if (conf - 1 > -1) {
        saveConf(conf);
        conf--;
        if (RoomConf.hasOwnProperty(conf)) {
            restoreRoomConf(conf);
        }
    }
}

function newConf() {

    saveConf(conf);
    conf = RoomConf.length;
    RoomConf[RoomConf.length] = {};
    RemoveAllInRoom();
}

function saveConf(number) {
    RoomConf[number].Short = Short.slice();
    RoomConf[number].Long = Long.slice();
    RoomConf[number].Armchair = Armchair.slice();
    RoomConf[number].Bidet = Bidet.slice();
    RoomConf[number].WC = WC.slice();
    RoomConf[number].Sink = Sink.slice();
    RoomConf[number].Bath = Bath.slice();
    RoomConf[number].Bed = Bed.slice();
    RoomConf[number].Wardrobe = Wardrobe.slice();
    RemoveAllInRoom();
}

function restoreRoomConf(number) {
    var room = {
        "Long": RoomConf[number]["Long"],
        "Short": RoomConf[number]["Short"],
        "Armchair": RoomConf[number]["Armchair"],
        "Bidet": RoomConf[number]["Bidet"],
        "WC": RoomConf[number]["WC"],
        "Sink": RoomConf[number]["Sink"],
        "Bath": RoomConf[number]["Bath"],
        "Bed": RoomConf[number]["Bed"],
        "Wardrobe": RoomConf[number]["Wardrobe"]
    };
    draw(room);
}

function nextRoom() {
    if (Room.length > roomNumber + 1) {
        saveRoom(roomNumber);
        roomNumber++;
        id = "Room" + roomNumber;
        conf = 0;
        drawRoom(roomNumber);
        if (savedRoom.hasOwnProperty(id)) {


            RoomConf = savedRoom[id];
            restoreRoom(roomNumber);
        } else {
            RoomConf = [];
            RoomConf[0] = {};
        }

    }


}

function preRoom() {
    if (roomNumber - 1 > -1) {
        saveRoom(roomNumber);
        roomNumber--;
        id = "Room" + roomNumber;
        drawRoom(roomNumber);
        conf = 0;
        if (savedRoom.hasOwnProperty(id)) {
            RoomConf = savedRoom[id];
            restoreRoom(roomNumber);
        } else {
            RoomConf = [];
            RoomConf[0] = {};
        }
    }

}

function saveRoom(number) {
    id = "Room" + number;
    savedRoom[id] = [];
    RoomConf[conf].Short = Short.slice();
    RoomConf[conf].Long = Long.slice();
    RoomConf[conf].Armchair = Armchair.slice();
    RoomConf[conf].Bidet = Bidet.slice();
    RoomConf[conf].WC = WC.slice();
    RoomConf[conf].Sink = Sink.slice();
    RoomConf[conf].Bath = Bath.slice();
    RoomConf[conf].Bed = Bed.slice();
    RoomConf[conf].Wardrobe = Wardrobe.slice();

    for (let i = 0; i < RoomConf.length; i++) {
        savedRoom[id][i] = {};
        savedRoom[id][i]["Short"] = RoomConf[i].Short.slice();
        savedRoom[id][i]["Long"] = RoomConf[i].Long.slice();
        savedRoom[id][i]["Armchair"] = RoomConf[i].Armchair.slice();
        savedRoom[id][i]["Bidet"] = RoomConf[i].Bidet.slice();
        savedRoom[id][i]["WC"] = RoomConf[i].WC.slice();
        savedRoom[id][i]["Sink"] = RoomConf[i].Sink.slice();
        savedRoom[id][i]["Bath"] = RoomConf[i].Bath.slice();
        savedRoom[id][i]["Bed"] = RoomConf[i].Bed.slice();
        savedRoom[id][i]["Wardrobe"] = RoomConf[i].Wardrobe.slice();
    }
    RoomConf = [];
    RemoveAllInRoom();

}

function restoreRoom(number) {
    id = "Room" + number;

    var room = {
        "Long": savedRoom[id][0]["Long"],
        "Short": savedRoom[id][0]["Short"],
        "Armchair": savedRoom[id][0]["Armchair"],
        "Bidet": savedRoom[id][0]["Bidet"],
        "WC": savedRoom[id][0]["WC"],
        "Sink": savedRoom[id][0]["Sink"],
        "Bath": savedRoom[id][0]["Bath"],
        "Bed": savedRoom[id][0]["Bed"],
        "Wardrobe": savedRoom[id][0]["Wardrobe"]
    };
    for (let i = 0; i < savedRoom[id].length; i++) {
        RoomConf[i].Short = savedRoom[id][i]["Short"].slice();
        RoomConf[i].Long = savedRoom[id][i]["Long"].slice();
        RoomConf[i].Armchair = savedRoom[id][i]["Armchair"].slice();
        RoomConf[i].Bidet = savedRoom[id][i]["Bidet"].slice();
        RoomConf[i].WC = savedRoom[id][i]["WC"].slice();
        RoomConf[i].Sink = savedRoom[id][i]["Sink"].slice();
        RoomConf[i].Bath = savedRoom[id][i]["Bath"].slice();
        RoomConf[i].Bed = savedRoom[id][i]["Bed"].slice();
        RoomConf[i].Wardrobe = savedRoom[id][i]["Wardrobe"].slice();
    }
    draw(room);

}

function nextStep() {
    if (bound != null) {
        removeBoundary();
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
        document.getElementById("next").className = "btn btn-primary btn-sm btn-block";
        document.getElementById("pre").className = "btn btn-primary btn-sm btn-block";
        document.getElementById("send").className = "btn btn-warning btn-sm btn-block";
        document.getElementById("nextConf").className = "btn btn-primary btn-sm btn-block";
        document.getElementById("preConf").className = "btn btn-primary btn-sm btn-block";
        document.getElementById("newConf").className = "btn btn-primary btn-sm btn-block";
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
    for (let i = 0; i < RoomConf[conf].Short.length; i++) {
        shortID[shortID.length] = RoomConf[conf].Short[i].id;

    }
    let longID = [];
    for (let i = 0; i < RoomConf[conf].Long.length; i++) {
        longID[longID.length] = RoomConf[conf].Long[i].id;

    }
    let armchairID = [];
    for (let i = 0; i < RoomConf[conf].Armchair.length; i++) {
        armchairID[armchairID.length] = RoomConf[conf].Armchair[i].id;

    }
    let bidetID = [];
    for (let i = 0; i < RoomConf[conf].Bidet.length; i++) {
        bidetID[bidetID.length] = RoomConf[conf].Bidet[i].id;

    }
    let wcID = [];
    for (let i = 0; i < RoomConf[conf].WC.length; i++) {
        wcID[wcID.length] = RoomConf[conf].WC[i].id;

    }
    let sinkID = [];
    for (let i = 0; i < RoomConf[conf].Sink.length; i++) {
        sinkID[sinkID.length] = RoomConf[conf].Sink[i].id;

    }
    let bathID = [];
    for (let i = 0; i < RoomConf[conf].Bath.length; i++) {
        bathID[bathID.length] = RoomConf[conf].Bath[i].id;

    }
    let bedID = [];
    for (let i = 0; i < RoomConf[conf].Bed.length; i++) {
        bedID[bedID.length] = RoomConf[conf].Bed[i].id;

    }
    let wardrobeID = [];
    for (let i = 0; i < RoomConf[conf].Wardrobe.length; i++) {
        wardrobeID[wardrobeID.length] = RoomConf[conf].Wardrobe[i].id;

    }

    data.Option = Object.assign({}, RoomOptions);
    data.Room = Room[roomNumber].id.slice();
    data.RoomNumber = roomNumber;
    data.Short = shortID.slice();
    data.Long = longID.slice();
    data.Armchair = armchairID.slice();
    data.Bidet = bidetID.slice();
    data.WC = wcID.slice();
    data.Sink = sinkID.slice();
    data.Bath = bathID.slice();
    data.Bed = bedID.slice();
    data.Wardrobe = wardrobeID.slice();
    data.children = idRooms.slice();


    fetch(API, {

        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(data)

    }).then((response) => {
        return response.json();
    })
        .then(function (response) {
            let roomNumber = response.roomNumber;
            var room = {
                "Long": response["Long"],
                "Short": response["Short"],
                "Armchair": response["Armchair"],
                "Bidet": response["Bidet"],
                "WC": response["WC"],
                "Sink": response["Sink"],
                "Bath": response["Bath"],
                "Bed": response["Bed"],
                "Wardrobe": response["Wardrobe"]
            };
            draw(room);
        });


}

function drawRoom(number) {
    roomNumber = number;
    let house = Room[roomNumber].children;
    let fill = Room[roomNumber].fill;
    let idRooms = [];
    for (var i = 0; i < house.length; i++) {
        idRooms[idRooms.length] = house[i].id;
    }
    for (var j = 1; j < COL; j++) {
        for (var i = 1; i < ROW; i++) {
            var type = typeFromID(Grid[j][i].id);
            var id;

            if (type == "Block") {
                id = (Grid[j][i].id).substring(5, (Grid[j][i].id).length);

            } else {
                id = Grid[j][i].id;
            }
            if (!idRooms.includes(id)) {
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
    roomProprieties(pos[0], pos[1], (pos[2] + 1), (pos[3] + 1));
}