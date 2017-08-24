var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function(event) {
	canvas.width  = innerWidth;
	canvas.height = innerHeight;
})

function randint(a, b){
	var c = b - a;
	return Math.floor(Math.random() * c) + a;
}

function circle(x, y, radius, color){
	c.beginPath();
	c.arc(x, y, radius, 0, Math.PI * 2, false);
	c.fillStyle = color;
	c.fill();
	c.closePath();
}

function Spark(x, y, color){
	this.x = x;
	this.y = y;
	this.dx = randint(-50,50) / 10;
	this.dy = randint(-80,30) / 10;
	this.color = color;
	this.lifetime = randint(40, 50);

	this.move = function(){
		this.x += this.dx;
		this.y += this.dy;

		this.dx *= 0.99;
		this.dy += 0.3;
	}

	this.time = function(){
		this.lifetime -= 1;
		if (this.lifetime == 0){
			return true;
		}
	}

	this.display = function(){
		circle(this.x, this.y, this.lifetime / 10, this.color);
	}
}

function Firework(x, y, dx, dy){
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.sparkArray = [];
	this.color = "rgb(255,255,255)";
	this.radius = 5;
	this.fired = true;

	this.move = function(){
		this.x += this.dx
		this.y += this.dy

		this.dx *= 0.99
		this.dy += 0.5
	}

	this.explode = function(){
		if ((this.dy >= 5 || this.y <= innerHeight / 10 || this.x <= 0 || this.x >= innerWidth) && this.fired){
			this.fired = false;
			colortype = ColorArray[randint(0, ColorArray.length)];
			for (var i = 0; i < 30; i++){
				color = colortype[randint(0, colortype.length)];
				spark = new Spark(this.x, this.y, color);
				this.sparkArray.push(spark)
			}
		}
	}

	this.sparks = function(){
		for (var i = 0; i < this.sparkArray.length; i++){
			spark = this.sparkArray[i];
			spark.move();
			spark.display();
			if (spark.time()){
				index = this.sparkArray.indexOf(spark);
				this.sparkArray.splice(index, 1);
			}
		}
	}

	this.display = function(){
		circle(this.x, this.y, this.radius, this.color);
		if (this.radius - 0.1 >= 0){
			this.radius -= 0.1
		}
	}

	this.update = function(){
		if (this.fired){
			this.move();
			this.display();
		}
		this.explode();
		this.sparks();
		if (this.fired == false && this.sparkArray.length == 0){
			index = FireworkArray.indexOf(this);
			FireworkArray.splice(index, 1)
		}
	}
}

function create(){
	x = randint((innerWidth / 10), (innerWidth - (innerWidth / 10)));
	y = innerHeight;
	dx = randint(-100, 100) / 10;
	dy = randint(-200, -300) / 10;
	firework = new Firework(x, y, dx, dy);
	FireworkArray.push(firework)
}

var ColorArray = [["rgb(255,0,0)", "rgb(255,50,0)", "rgb(255,0,100)"],
				  ["rgb(0,255,0)", "rgb(50,255,0)", "rgb(0,255,100)"],
				  ["rgb(0,0,255)", "rgb(0,100,255)", "rgb(50,0,255)"],
				  ["rgb(255,255,0)", "rgb(255,200,0)", "rgb(255,150,0)"],
				  ["rgb(255,0,255)", "rgb(130,0,130)", "rgb(255,20,150)"],
				  ["rgb(0,255,255)", "rgb(100,160,160)", "rgb(180,240,240)"]]
var FireworkArray = [];
var timer = 0

function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);

	if (timer % 20 == 0){
		create();
	}
	timer += 1
	for (var i = 0; i < FireworkArray.length; i++){
		firework = FireworkArray[i];
		firework.update();
	}
}

animate();