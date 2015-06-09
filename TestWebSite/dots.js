
    var canvas,
    ctx,
    colors = ['black', 'gray'],
    dots = [],
    maxDots = 35;

    function Dot() {
        this.alive = true;
        this.x = Math.round(Math.random() * canvas.width);
        this.y = Math.round(Math.random() * canvas.height);
        this.size = Math.round(Math.random() * 7);
        this.velocity = {
            x: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.7,
            y: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.7
        }
        this.alpha = 0.01;
        this.hexColor = colors[Math.round(Math.random() * (colors.length - 1))];
        this.rgbaStringColor = getRGBA(this.hexColor, this.alpha);
    }

    Dot.prototype.draw = function () {
        ctx.beginPath();
        ctx.fillStyle = this.rgbaStringColor;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    function getRGBA(hex, alpha) {
        var r = parseInt(hex.substring(1, 3), 16),
        g = parseInt(hex.substring(3, 5), 16),
        b = parseInt(hex.substring(6, 8), 16),
        a = alpha;
        return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
    }

    /*updates both colors and position of the dot*/
    Dot.prototype.update = function () {
        if (this.alpha < 0.7) {
            this.alpha += 0.01;
            this.rgbaStringColor = getRGBA(this.hexColor, this.alpha);
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if (this.x > (canvas.width) + 5 || this.x < -5) {
            this.alive = false;
        }
        if (this.y > (canvas.height) - 15 || this.y < -5) {
            this.alpha -= 0.05;
            if (this.alpha <= 0.1) {
                this.alive = false;
            }
        }
    }


    function createDots() {
        dots = dots.filter(function (dot) {
            return dot.alive;
        });
        for (var length = dots.length; length < maxDots; length++) {
            dots.push(new Dot());
        }
    }

    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < dots.length; i++) {
            dots[i].draw();
            dots[i].update();
        }
        createDots();
        window.requestAnimationFrame(update);
    }

    function init() {
        createDots();
        update();
    }


    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    document.addEventListener('DOMContentLoaded', function () {
        canvas = document.getElementById('universe');
        ctx = canvas.getContext('2d');
        setCanvasSize();
        init();
    });