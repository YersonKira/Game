var Turno;
(function (Turno) {
    Turno[Turno["Jugador1"] = 0] = "Jugador1";
    Turno[Turno["Jugador2"] = 1] = "Jugador2";
})(Turno || (Turno = {}));
var Juego = (function () {
    // Ficha Seleccionada
    function Juego(canvas) {
        var _this = this;
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        var lado = this.canvas.width / 3;
        this.canvas.addEventListener('click', function (e) {
            var x = Math.ceil((e.x - _this.canvas.offsetLeft) / lado);
            var y = Math.ceil((e.y - _this.canvas.offsetTop) / lado);
        });

        //        setInterval(() => {
        //
        //        }, 1000);
        this.nuevoJuego();
        this.dibujarTablero();
    }
    Juego.prototype.mostrarPosibilidades = function (jugador) {
    };
    Juego.prototype.nuevoJuego = function () {
        this.tablero = [
            [-1, -1, -1, -1, -1],
            [-1, 1, 1, 1, -1],
            [-1, 0, 0, 0, -1],
            [-1, 2, 2, 2, -1],
            [-1, -1, -1, -1, -1]
        ];
    };
    Juego.prototype.dibujarTablero = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.strokeStyle = '#fff';
        this.context.lineWidth = 2;
        var lado = this.canvas.width / 3;
        var radio = lado / 2;
        var constant = 5;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                this.context.strokeRect(lado * i, lado * j, lado, lado);
                if (this.tablero[j + 1][i + 1] == 1) {
                    this.context.fillStyle = '#fff';
                    this.context.beginPath();
                    this.context.arc((i * lado) + radio, (j * lado) + radio, radio - constant, 0, Math.PI * 2, true);
                    this.context.closePath();
                    this.context.fill();
                } else if (this.tablero[j + 1][i + 1] == 2) {
                    this.context.fillStyle = '#000';
                    this.context.beginPath();
                    this.context.arc((i * lado) + radio, (j * lado) + radio, radio - constant, 0, Math.PI * 2, true);
                    this.context.closePath();
                    this.context.fill();
                }
            }
        }
    };
    return Juego;
})();
;
window.onload = function (e) {
    var juego = new Juego(document.getElementById('canvas'));
};
//# sourceMappingURL=app.js.map
