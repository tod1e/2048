const SIZE_FIELD = 4;
const MAX_TILE = 2048;
var CLASSES_TILE = [];
var CLASSES_POS = [];
var score = 0;
var gameStop = false;

var value = 2;
var i = 1;
CLASSES_TILE[0] = "cell";
while (value <= MAX_TILE) {
	CLASSES_TILE[i] = "cell-" + value;
	value *= 2;
	i++;
}

var k = 0, i = j = 1;
while (k < SIZE_FIELD * SIZE_FIELD) {
	CLASSES_POS[k] = "cell-" + i + "-" + j;
	j++;
	if (j > SIZE_FIELD) {
		j = 1;
		i++;
	}
	k++;
}

function Cell(name, color, size, value) {
	this.value = value;	
	this.name = name;
	this.color = color;
	this.size = size;
}

var matrix = [SIZE_FIELD];
for (var i = 0; i < SIZE_FIELD; i++) {
	matrix[i] = [SIZE_FIELD];
}

function setColor(i, j, str) {
	document.querySelector("." + CLASSES_POS[i  * SIZE_FIELD + j]).style.background = str;
}

function setValueAndSize(i, j) {
	document.querySelector("." + CLASSES_POS[i  * SIZE_FIELD + j]).style.fontSize = matrix[i][j].size;
	document.querySelector("." + CLASSES_POS[i  * SIZE_FIELD + j]).innerHTML = (matrix[i][j].value) ?  matrix[i][j].value : "";
}

function removeAllClasses() {
	for (var i = 1; i < CLASSES_TILE.length; i++) {
		document.querySelector(".cell").classList.remove(CLASSES_TILE[i]);
	}
}

function cellUpdate(name, color, size, i, j, value) {
	matrix[i][j].value = value;	
	matrix[i][j].name = name;
	matrix[i][j].color = color;
	matrix[i][j].size = size;
}

function startTiles() {
	var i1 = Math.floor(Math.random() * SIZE_FIELD);
	var j1 = Math.floor(Math.random() * SIZE_FIELD);
	var value = (Math.random() <= 0.5) ? 2 : 4;
	cellUpdate(getName(value), getColor(value), getSize(value), i1, j1, value);
	do {
	var i2 = Math.floor(Math.random() * SIZE_FIELD);
	var j2 = Math.floor(Math.random() * SIZE_FIELD);
	} while ((i1 == i2) && (j1 == j2));
	var value = (Math.random() <= 0.5) ? 2 : 4;
	cellUpdate(getName(value), getColor(value), getSize(value), i2, j2, value);
}

function getName(value) { 
	return (value != 0) ? "cell-" + value : "cell";
}

function getColor(value){
	switch (value) {
		case 0:
			return "#cdc1b4";
		case 2: 
			return "#eee4da";
		case 4: 
			return "#ede0c8";
		case 8: 
			return "#f2b179";
		case 16: 
			return "#f59563";
		case 32: 
			return "#f67c5f";
		case 64: 
			return "#f59563";
		case 128: 
			return "#edcf72";
		case 256: 
			return "#edcc61";
		case 512: 
			return "#edc850";
		case 1024: 
			return "#edc850";
		case 2048:
			return "#edc22e";
	}
}

function getSize(value) {
	switch (value) {
		case 0: case 2: case 4: case 8: 
			return "55px";
		case 16: case 32: case 64: 
			return "50px";
		case 128: case 256: case 512:
				return "40px";
		default: 
			return "30px";
	}
}

function newTile(value) {
	do {
	var i = Math.floor(Math.random() * SIZE_FIELD);
	var j = Math.floor(Math.random() * SIZE_FIELD);
	var value = (Math.random() <= 0.5) ? 2 : 4;
	} while (matrix[i][j].value);
	cellUpdate(getName(value), getColor(value), getSize(value), i, j, value);
	setValueAndSize(i, j, matrix[i][j]);
	setColor(i, j, matrix[i][j].color);
}

function newGame() {
	removeAllClasses();
	score = 0;
	document.querySelector("#score-info").innerHTML = score;
	document.querySelector("#msg-info").innerHTML = "";
	for (var i = 0; i < SIZE_FIELD; i++) {
		for (var j = 0; j < SIZE_FIELD; j++) {
			matrix[i][j] = new Cell(getName(0), getColor(0), getSize(0), 0);
		}
	}
	startTiles();
	for (var i = 0; i < SIZE_FIELD; i++) {
		for (var j = 0; j < SIZE_FIELD; j++) {
			setValueAndSize(i, j, matrix[i][j]);
			setColor(i, j, matrix[i][j].color);
		}	
	}
}

function sortLeft() { 
	var k = 0; 
	while (k < SIZE_FIELD) {
		for (var i = 0; i < SIZE_FIELD; i++) {
			for (var j = 0; j < SIZE_FIELD - i - 1; j++) {
				if (!matrix[k][j].value) {
					var f = matrix[k][j].value;
					matrix[k][j].value = matrix[k][j + 1].value;
					matrix[k][j + 1].value = f; 
				}
			}
		}
		k++;
	}
}	

function sortUp() { 
	var k = 0; 
	while (k < SIZE_FIELD) {
		for (var i = 0; i < SIZE_FIELD; i++) {
			for (var j = 0; j < SIZE_FIELD - i - 1; j++) {
				if (!matrix[j][k].value) {
					var f = matrix[j][k].value;
					matrix[j][k].value = matrix[j + 1][k].value;
					matrix[j + 1][k].value = f; 
				}
			}
		}
		k++;
	}
}	

function sortRight() { 
	var k = 0; 
	while (k < SIZE_FIELD) {
		for (var i = 0; i < SIZE_FIELD; i++) {
			for (var j = SIZE_FIELD - i - 1; j >= 1; j--) {
				if (!matrix[k][j].value) {
					var f = matrix[k][j].value;
					matrix[k][j].value = matrix[k][j - 1].value;
					matrix[k][j - 1].value = f; 
				}
			}
		}
		k++;
	}
}	

function sortDown() { 
	var k = 0; 
	while (k < SIZE_FIELD) {
		for (var i = 0; i < SIZE_FIELD; i++) {
			for (var j = SIZE_FIELD - i - 1; j >= 1; j--) {
				if (!matrix[j][k].value) {
					var f = matrix[j][k].value;
					matrix[j][k].value = matrix[j - 1][k].value;
					matrix[j - 1][k].value = f; 
				}
			}
		}
		k++;
	}
}	

function moveLeft() {
	sortLeft();
	var k = 0; 
	while (k < SIZE_FIELD) {
		for (var j = 0; j < SIZE_FIELD - 1; j++) {
			if (matrix[k][j].value == matrix[k][j + 1].value) {
				score += matrix[k][j].value *= 2;
				matrix[k][j + 1].value = 0;
			}
		}
	k++;
	}
	sortLeft();
}

function moveUp() {
	sortUp();
	var k = 0; 
	while (k < SIZE_FIELD) {
		for (var j = 0; j < SIZE_FIELD - 1; j++) {
			if (matrix[j][k].value == matrix[j + 1][k].value) {
				score +=  matrix[j + 1][k].value *= 2;
				matrix[j][k].value = 0;
			}
		}
	k++;
	}
	sortUp();
}

function moveRight() {
	sortRight();
	var k = 0; 
	while (k < SIZE_FIELD) {
		for (var j = SIZE_FIELD - 1; j >= 1; j--) {
			if (matrix[k][j].value == matrix[k][j - 1].value) {
				score += matrix[k][j].value *= 2;
				matrix[k][j - 1].value = 0;
			}
		}
	k++;
	}
	sortRight();
}

function moveDown() {
	sortDown();
	var k = 0; 
	while (k < SIZE_FIELD) {
		for (var j = SIZE_FIELD - 1; j >= 1; j--) {
			if (matrix[j][k].value == matrix[j - 1][k].value) {
				score += matrix[j][k].value *= 2;
				matrix[j - 1][k].value = 0;
			}
		}
	k++;
	}
	sortDown();
}

function isLose() {
	for (var i = 0; i < SIZE_FIELD; i++) {
		for (var j = 0; j < SIZE_FIELD; j++) {
			if (!matrix[i][j].value) return false;
		}
	}
	for (var i = 0; i < SIZE_FIELD; i++) {
		for (var j = 0; j < SIZE_FIELD - 1; j++) {
			if ((matrix[i][j].value == matrix[i][j + 1].value) ||
			 	(matrix[j][i].value == matrix[j + 1][i].value)) return false;
		}
	}
	return true;
}

function isWin() {
	for (var i = 0; i < SIZE_FIELD; i++) {
		for (var j = 0; j < SIZE_FIELD; j++) {
			if (matrix[i][j].value == MAX_TILE) return true;
		}
	}
	return false;
}

function Stop(msg, color) {
	gameStop = true;
	document.querySelector("#msg").style.display = "block";
	document.querySelector("#msg-info").style.background = color;
	document.querySelector("#msg-info").innerHTML = msg;
	setTimeout(function () {
		gameStop = false;
		document.querySelector("#msg").style.display = "";
		newGame();
	}, 2000);
}

document.onkeydown = function(e) {
	if (!gameStop) {
	step = false;
	var clone = [SIZE_FIELD];
	for (var i = 0; i < SIZE_FIELD; i++) {
		clone[i] = [SIZE_FIELD];
	}
	for (var i = 0; i < SIZE_FIELD; i++) {
		for (var j = 0; j < SIZE_FIELD; j++) {
			clone[i][j] = matrix[i][j].value;
		}
	}
	switch (e.keyCode) {
		case 37: moveLeft();
		break;
		case 38: moveUp();
		break;
		case 39: moveRight();
		break;
		case 40: moveDown();
		break;
	}
	for (var i = 0; i < SIZE_FIELD; i++) {
		for (var j = 0; j < SIZE_FIELD; j++) {
			cellUpdate(getName(matrix[i][j].value), getColor(matrix[i][j].value), getSize(matrix[i][j].value), i, j, matrix[i][j].value);
			setValueAndSize(i, j, matrix[i][j]);
			setColor(i, j, matrix[i][j].color);
		}	
	}
	document.querySelector("#score-info").innerHTML = score;
	for (var i = 0; i < SIZE_FIELD; i++) {
		for (var j = 0; j < SIZE_FIELD; j++) {
			if (clone[i][j] != matrix[i][j].value) {
				step = true;
				break;
			}
		}
		if (step) break;
	}
	if (step) newTile();	
	if (isWin()) Stop("ВЫ ВЫЙГРАЛИ", "#3fff00");
	if (isLose()) Stop("ВЫ ПРОИГРАЛИ", "#99badd");
	}
}


newGame();


