const SIZE_FIELD = 4;
const MAX_TILE = 2048;
var CLASSES_TILE = [];
var CLASSES_POS = [];
var score = 0;

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
			return "#eee4da";
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
			return "70px";
		case 16: case 32: case 64: 
			return "65px";
		case 128: case 256: case 512:
				return "60px";
		default: 
			return "50px";
	}
}

function newTile(value) {
	do {
	var i = Math.floor(Math.random() * SIZE_FIELD);
	var j = Math.floor(Math.random() * SIZE_FIELD);
	var value = (Math.random() <= 0.5) ? 2 : 4;
	} while (matrix[i][j]);
	cellUpdate(getName(value), getColor(value), getSize(value), i, j, value);
}

function newGame() {
	removeAllClasses();
	score = 0;
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

function Update() {

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
				matrix[k][j].value = matrix[k][j].value * 2;
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
				matrix[j + 1][k].value = matrix[j + 1][k].value * 2;
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
				matrix[k][j].value = matrix[k][j].value * 2;
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
				matrix[j][k].value = matrix[j][k].value * 2;
				matrix[j - 1][k].value = 0;
			}
		}
	k++;
	}
	sortDown();
}

document.onkeydown = function(e) {
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
	console.log(matrix);
	for (var i = 0; i < SIZE_FIELD; i++) {
		for (var j = 0; j < SIZE_FIELD; j++) {
			cellUpdate(getName(matrix[i][j].value), getColor(matrix[i][j].value), getSize(matrix[i][j].value), i, j, matrix[i][j].value);
			setValueAndSize(i, j, matrix[i][j]);
			setColor(i, j, matrix[i][j].color);
		}	
	}
}


newGame();


