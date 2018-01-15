//reference: // http://rembound.com/articles/how-to-make-a-match3-game-with-html5-canvas

window.onload = function() {
    var canvas = document.getElementById("viewport");
    var context = canvas.getContext("2d");

    var lastframe = 0;
    var fpstime = 0;
    var framecount = 0;
    var fps = 0;

    function init() {
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mousedown", onMouseDown);
        canvas.addEventListener("mouseup", onMouseUp);
        canvas.addEventListener("mouseout", onMouseOut);
        main(0);
    }

    function main(tframe) {
        //1. tells browser that you wish to perform an animation
        //2. requests that browser call main to update an animation before the next repaint.
        window.requestAnimationFrame(main);

        update(tframe);
        render();
    }

    function update(tframe) {
        var dt = (tframe - lastframe) / 1000;
        lastframe = tframe;
        updateFps(dt);
    }

    function updateFps(dt) {
        if (fpstime > 0.25) {
            fps = Math.round(framecount / fpstime);

            fpstime = 0; //reset
            framecount = 0;
        }
        fpstime += dt;
        framecount++;
    }

    function render() {
        drawFrame();
    }

    function drawFrame() {
        // Draw background and a border
        context.fillStyle = "#d0d0d0";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#e8eaec";
        context.fillRect(1, 1, canvas.width-2, canvas.height-2);

        // Draw header
        context.fillStyle = "#303030";
        context.fillRect(0, 0, canvas.width, 65);

        // Draw title
        context.fillStyle = "#ffffff";
        context.font = "24px Verdana";
        context.fillText("HTML5 Canvas Basic Framework - Rembound.com", 10, 30);

        // Display fps
        context.fillStyle = "#ffffff";
        context.font = "12px Verdana";
        context.fillText("Fps: " + fps, 13, 50);
    }

    function onMouseMove(e) {}
    function onMouseDown(e) {}
    function onMouseUp(e) {}
    function onMouseOut(e) {}

    function getMousePos(canvas, e) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: Math.round((e.clientX - rect.left)/(rect.right - rect.left)*canvas.width),
            y: Math.round((e.clientY - rect.top)/(rect.bottom - rect.top)*canvas.height)
        };
    }

    init();
};