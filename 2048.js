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

var k = 0, i = 1, j = 1;
while (k < SIZE_FIELD * SIZE_FIELD) {
	CLASSES_POS[k] = "cell-" + i + "-" + j;
	j++;
	if (j > SIZE_FIELD) {
		j = 1;
		i++;
	}
	k++;
}

// КОНСТРУКТОР: КЛЕТКА
function Cell(name, color, size, value) {
	this.value = value;	
	this.name = name;
	this.color = color;
	this.size = size;
}

// ИГРОВАЯ МАТРИЦА
var matrix = [SIZE_FIELD];
for (var i = 0; i < SIZE_FIELD; i++) {
	matrix[i] = [SIZE_FIELD];
}

// ЦВЕТ КАЖДОЙ КЛЕТКИ
function setColor(i, j, str) {
	document.querySelector("." + CLASSES_POS[i  * SIZE_FIELD + j]).style.background = str;
}

function setValueAndSize(i, j) {
	// УСТАНОВИМ РАЗМЕР ТЕКСТА
	document.querySelector("." + CLASSES_POS[i  * SIZE_FIELD + j]).style.fontSize = matrix[i][j].size;
	// УТСАНОВИМ ЗНАЧЕНИЕ В ЯЧЕЙКУ
	if (matrix[i][j].value) document.querySelector("." + CLASSES_POS[i  * SIZE_FIELD + j]).innerHTML = matrix[i][j].value;
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

// ПОЛУЧАЕМ ИМЯ ДЛЯ КЛАССА
function getName(value) { 
	return (value != 0) ? "cell-" + value : "cell";
}

// ПОЛУЧАЕМ ЦВЕТ ДЛЯ ПЛИТКИ
function getColor(value){
	switch (value) {
		case 0:
			return "#cdc1b4";
			break;
		case 2: 
			return "#eee4da";
			break;
		case 4: 
			return "#eee4da";
			break;
		case 8: 
			return "#f2b179";
		break;
		case 16: 
			return "#f59563";
			break;
		case 32: 
			return "#f67c5f";
			break;
		case 64: 
			return "#f59563";
			break;
		case 128: 
			return "#edcf72";
			break;
		case 256: 
			return "#edcc61";
			break;
		case 512: 
			return "#edc850";
			break;
		case 1024: 
			return "#edc850";
			break;
		case 2048:
			return "#edc22e";
			break;
	}
}

// ПОЛУЧАЕМ РАЗМЕР ДЛЯ ТЕКСТА НА ПЛИТКЕ
function getSize(value) {
	switch (value) {
		case 0: case 2: case 4: case 8: 
			return "70px";
		break;
		case 16: case 32: case 64: 
			return "60px";
		break;
		default: 
			return "50px";
	}
}

// НОВАЯ ПЛИТКА
function newTile(value) {

}

// НОВАЯ ИГРА
function newGame() {
	removeAllClasses(); // УДАЛЯЕМ ЛИШНИЕ КЛАССЫ НА КЛЕТКАХ
	score = 0;
	for (var i = 0; i < SIZE_FIELD; i++) {
		for (var j = 0; j < SIZE_FIELD; j++) {
			//СОЗДАЕМ ЭКЗ ОБЪЕКТА КАЖДОЙ КЛЕТКИ
			matrix[i][j] = new Cell(getName(0), getColor(0), getSize(0), 0);
			// УСТАНАВЛИВАЕМ ЦВЕТ КАЖДОЙ КЛЕТКИ
			setColor(i, j, matrix[i][j].color);
		}
	}
	startTiles(); // СОЗДАЕМ 2 НАЧАЛЬНЫЕ ПЛИТКИ
	// ПРИРОСКА НА ПОЛЕ
	for (var i = 0; i < SIZE_FIELD; i++) {
		for (var j = 0; j < SIZE_FIELD; j++) {
			setValueAndSize(i, j, matrix[i][j]);
			setColor(i, j, matrix[i][j].color);
		}	
	}
}

function Update() {

}

// НАЧИНАЕМ ИГРУ
newGame();


