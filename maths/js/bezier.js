(function(app){
	var comb = (function(height){	// generate pascals pyramid of height height
		var data = [[1], [1, 1]]
		for(var i = 2; i < height; i++){
			var priv = data[i - 1];
			var row = [1]
			for(var j = 0; j < data.length - 1; j++){
				row.push(priv[j] + priv[j+1]);
			}
			row.push(1);
			data.push(row);
		}
		return data;
	})(1000);

	function Point(x, y){
		this.x = x;
		this.y = y;
	}

	function bezierCurve2nd(u, p0, p1, p2){
		var p = new Point(0, 0);
		p.x = ((1 - u) * (1 - u) * p0.x) + (2 * (1 - u) * u * p1.x) + (u * u * p2.x);
		p.y = ((1 - u) * (1 - u) * p0.y) + (2 * (1 - u) * u * p1.y) + (u * u * p2.y);

		return p;
	}


	function bezierCurve(u){
		var controlPts = Array.prototype.splice.call(arguments, 1);
		var p = new Point(0, 0);
		var n = controlPts.length  - 1;
		for(var i = 0; i <= n; i++){
			p.x += B(u, n, i) * controlPts[i].x;
			p.y += B(u, n, i) * controlPts[i].y;
		}
		return p;

	}

	function fact(n){
		if(n <= 1) return 1;
		return n * fact(n - 1);
	}

	function B(u, n, i){
		return comb[n][i] * Math.pow(1 - u, n - i) * Math.pow(u, i);
	}

	app.onload = function(){

		var canvas = document.getElementById("twoCtrlPoints");
		var ctx = canvas.getContext("2d");

		var w = canvas.width;
		var h = canvas.height;
		
		var p0 = new Point(10, h - 10);
		var p1 = new Point(w/2, 10);
		var p2 = new Point(w - 10, h - 10);

		ctx.beginPath();
		ctx.moveTo(p0.x, p0.y);
		ctx.lineTo(p1.x, p1.y);
		ctx.strokeStyle = "rgb(0,255,0)";
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(p1.x, p1.y);
		ctx.lineTo(p2.x, p2.y);
		ctx.strokeStyle = "rgb(0,0,0)";
		ctx.stroke();

		
		ctx.beginPath();
		ctx.strokeStyle = "rgb(232,136,241)";
		for(var u = 0.0; u < 1.0; u += 0.01){
			var a = bezierCurve(u, p0, p1, p2);
			var b = bezierCurve(u + 0.01, p0, p1, p2);
			ctx.moveTo(a.x, a.y);
			ctx.lineTo(b.x, b.y);		
			ctx.stroke();
		}

		bezierCurve(100, p0, p1, p2);
		
	}
})(window);