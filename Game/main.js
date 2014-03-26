/// <reference path='Model/Juego.ts' />
var Principal = (function () {
    function Principal(canvas) {
        var _this = this;
        this.posiblesmovimientos = null;
        this.juego = new model.Juego(1 /* Jugador1 */);
        document.getElementById('text').textContent = 'Jugador ' + this.juego.turno;
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        var posicionseleccionada = null;

        //setTimeout(() => {
        //    this.juego.obtenerMejorJugada();
        //    this.dibujarTablero();
        //    if (this.juego.yaGane()) {
        //        alert('Ganador Jugador 2');
        //    }
        //    this.juego.cambiarTurno();
        //}, 500);
        this.canvas.onclick = function (e) {
            var lado = _this.canvas.width / 3;
            var columna = Math.ceil((e.x - _this.canvas.offsetLeft) / lado);
            var fila = Math.ceil((e.y - _this.canvas.offsetTop) / lado);
            var pos = new model.Posicion(fila, columna);
            if ((_this.posiblesmovimientos == null || _this.juego.verificarTurno(pos)) && _this.juego.tablero[pos.fila][pos.columna] != 0) {
                if (_this.juego.verificarTurno(pos)) {
                    posicionseleccionada = pos;
                    _this.posiblesmovimientos = _this.juego.obtenerPosiblesMovimientos(pos);
                    _this.mostrarPosibilidades();
                }
            } else if (_this.posiblesmovimientos != null) {
                for (var i = 0; i < _this.posiblesmovimientos.length; i++) {
                    if (_this.posiblesmovimientos[i].equals(pos)) {
                        _this.juego.moverFicha(posicionseleccionada, pos);
                        _this.dibujarTablero();
                        if (_this.juego.yaGane()) {
                            alert('Ganador Jugador 1');
                        }
                        _this.juego.cambiarTurno();
                        if (_this.juego.turno == 2 /* Jugador2 */) {
                            // Hacer jugada
                            setTimeout(function () {
                                _this.juego.obtenerMejorJugada();
                                _this.dibujarTablero();
                                if (_this.juego.yaGane()) {
                                    alert('Ganador Jugador 2');
                                }
                                _this.juego.cambiarTurno();
                            }, 500);
                        }
                        document.getElementById('text').textContent = 'Jugador ' + _this.juego.turno;
                        break;
                    }
                }
                delete _this.posiblesmovimientos;
                delete posicionseleccionada;
                _this.posiblesmovimientos = null;
            }
        };
        this.dibujarTablero();
    }
    Principal.prototype.mostrarPosibilidades = function () {
        this.dibujarTablero();
        this.context.strokeStyle = '#f00';
        this.context.lineWidth = 5;
        var lado = this.canvas.width / 3;
        for (var i = 0; i < this.posiblesmovimientos.length; i++) {
            this.context.strokeRect(lado * (this.posiblesmovimientos[i].columna - 1), lado * (this.posiblesmovimientos[i].fila - 1), lado, lado);
        }
    };
    Principal.prototype.dibujarTablero = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.strokeStyle = '#fff';
        this.context.lineWidth = 2;
        var lado = this.canvas.width / 3;
        var radio = lado / 2;
        var constant = 5;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                this.context.strokeRect(lado * i, lado * j, lado, lado);
                if (this.juego.tablero[j + 1][i + 1] == 1) {
                    this.context.fillStyle = '#fff';
                    this.context.beginPath();
                    this.context.arc((i * lado) + radio, (j * lado) + radio, radio - constant, 0, Math.PI * 2, true);
                    this.context.closePath();
                    this.context.fill();
                } else if (this.juego.tablero[j + 1][i + 1] == 2) {
                    this.context.fillStyle = '#000';
                    this.context.beginPath();
                    this.context.arc((i * lado) + radio, (j * lado) + radio, radio - constant, 0, Math.PI * 2, true);
                    this.context.closePath();
                    this.context.fill();
                }
            }
        }
    };
    return Principal;
})();
window.onload = function (e) {
    var main = new Principal(document.getElementById('canvas'));
};
//# sourceMappingURL=main.js.map
