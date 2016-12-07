(function () {
    'use strict';

    angular
        .module('app')
        .controller('Main', main);

    function main() {
        var vm = this;
        vm.width = 257;
        vm.items = new Array(vm.width);
        var lower = 0;
        var upper = vm.items.length - 1;
        vm.items[lower] = 275;
        vm.items[upper] = 275;

        function findMiddle(lower, upper) {
            var mid = (lower + upper) / 2
            if (mid == parseInt(mid)) {
                var random = (Math.random() - 0.5) * (upper - lower) * 1.5;
                vm.items[mid] = parseInt((vm.items[lower] + vm.items[upper]) / 2 + random);
                findMiddle(lower, mid);
                findMiddle(mid, upper);
            }
        }

        function refreshCanvas() {
            var c = document.getElementById("myCanvas");
            var ctx = c.getContext("2d");
            ctx.clearRect(0, 0, c.width, c.height);

            ctx.beginPath();
            //ctx.moveTo(0, 0);
            var x = 0;
            for (var y = 0; y < vm.items.length ; y++) {
                ctx.lineTo(x, vm.items[y]);
                x += 5;
            }
            ctx.lineTo(c.width, c.height);
            ctx.lineTo(0, c.height);
            ctx.closePath();
            ctx.lineWidth = 2;
            ctx.fillStyle = 'green';
            ctx.fill();
            ctx.strokeStyle = 'black';
            ctx.stroke();
        }

        setInterval(function () {
            findMiddle(lower, upper);
            refreshCanvas();
        }, 1000);

    }

})();

//sliders to change speed, end points, colours