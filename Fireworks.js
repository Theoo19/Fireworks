var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function(event) {
	canvas.width  = innerWidth;
	canvas.height = innerHeight;
})

window.addEventListener("click", function(event) {
	FireworkArray.push(new Firework(randint(25, 35)))
})

function randint(a, b){
	var c = b - a;
	return Math.floor(Math.random() * c) + a;
}

function randbool(){
	return [true, false][randint(0, 2)]
}

function randnegative(){
	return [-1, 1][randint(0, 2)]
}

function randitem(list){
	return list[randint(0, list.length)]
}

function circle(x, y, radius, color){
	c.beginPath();
	c.arc(x, y, radius, 0, Math.PI * 2, false);
	c.fillStyle = color;
	c.fill();
	c.closePath();
}

function line(x, y, x2, y2, width, color){
	c.beginPath();
	c.moveTo(x, y);
	c.lineTo(x2, y2);
	c.lineWidth = width;
	c.strokeStyle = color;
	c.stroke();
	c.closePath();
}

function Particle(x, y, dx, dy, radius, color){
	this.x = x
	this.y = y
	this.last_x = this.x - dx
	this.last_y = this.y - dy
	this.radius = radius
	this.color = color

	this.dx = function(){
		return this.x - this.last_x
	}

	this.dy = function(){
		return this.y - this.last_y
	}

	this.move = function(){
		dx = this.x - this.last_x
		dy = this.y - this.last_y

		this.last_x = this.x
		this.last_y = this.y

		this.x += dx - gravity / 10 * (Math.abs(dx) / dx)
		this.y += dy + gravity
	}

	this.display = function(){
		circle(this.x, this.y, this.radius, this.color)
		line(this.x, this.y, this.last_x, this.last_y, this.radius * 1.5, this.color)
	}

	this.update = function(){
		this.move()
		this.display()
	}
}

function Firework(particle_amount){
	arrival_x = randint(0, (innerWidth / 4))
	arrival_y = innerHeight - randint(0, (innerHeight / 2.5))
	x = randint((innerWidth / 30), (innerWidth - (innerWidth / 30)))
	y = innerHeight
	dx =  Math.round(Math.sqrt(2 * arrival_x * (gravity / 5))) * randnegative()
	dy = -Math.round(Math.sqrt(2 * arrival_y *  gravity))
	radius = 5
	color = "rgb(255,255,255)"

	this.firework = new Particle(x, y, dx, dy, radius, color)
	this.sparkArray = []
	this.exploded = false
	this.particle_amount = particle_amount

	this.explode = function(){
		this.exploded = true
		color_palette = randitem(ColorArray)

		for (this.particle_amount; this.particle_amount > 0; this.particle_amount--){
			dx = randint(-50, 50) / 10
			dy = randint(-100, 10) / 10
			radius = randint(4, 5)
			color = randitem(color_palette)
			spark = new Particle(this.firework.x, this.firework.y, dx, dy, radius, color)
			this.sparkArray.push(spark)
		}
		delete this.particle_amount
	}

	this.finished = function(){
		if (this.exploded && this.sparkArray.length == 0){
			return true
		}
	}

	this.update = function(){
		if (this.firework.dy() >= gravity * 10 && !this.exploded){
			this.explode()
		}

		if (!this.exploded){
			this.firework.update()
			if (this.firework.radius > 1){
				this.firework.radius -= lifetimer}
		}

		for (let i = 0; i < this.sparkArray.length; i++){
			spark = this.sparkArray[i]
			spark.update()
			spark.radius -= lifetimer
			if (Math.round(spark.radius) == 0){
				this.sparkArray.splice(i, 1)
			}
		}
	}
}

var ColorArray = [["rgb(250,0,0)", "rgb(255,50,0)", "rgb(255,0,100)"],
				  ["rgb(0,250,0)", "rgb(50,250,0)", "rgb(0,250,100)"],
				  ["rgb(0,0,250)", "rgb(0,100,250)", "rgb(50,0,250)"],
				  ["rgb(255,255,0)", "rgb(255,200,0)", "rgb(255,150,0)"],
				  ["rgb(255,0,255)", "rgb(130,0,130)", "rgb(255,20,150)"],
				  ["rgb(0,255,255)", "rgb(100,160,160)", "rgb(180,240,240)"],
				  ["rgb(255,10,50)", "rgb(255,110,50)", "rgb(245,50,100)"],
				  ["rgb(145,240,50)", "rgb(45,225,100)", "rgb(205,250,50)"],
				  ["rgb(65,100,220)", "rgb(100,65,220)", "rgb(50,160,210)"],
				  ["rgb(255,90,5)", "rgb(255,155,5)", "rgb(255,200,5)"]]
var FireworkArray = [];
var lifetimer = 0.1
var gravity = 0.2
var timer = 0;

function animate(){
	requestAnimationFrame(animate);
	c.fillStyle = "rgba(0, 0, 0, 0.5)"
	c.fillRect(0, 0, canvas.width, canvas.height)

	
	
	if (timer % 10 == 0){
		FireworkArray.push(new Firework(randint(25, 35)))
		timer = 0
	}

	for (let i = FireworkArray.length - 1; i >= 0; i--){
		console.log(i)
		FireworkArray[i].update()
		if (FireworkArray[i].finished()){
			FireworkArray.splice(i, 1)
		}
	}
	
	ctx.font = "30px Comic Sans MS";
	ctx.fillStyle = "red";
	ctx.textAlign = "center";
	ctx.fillText("Hello World", canvas.width/2, canvas.height/2)

	timer += 1
}

animate();
