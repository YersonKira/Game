/// <reference path='Posicion.ts' />
var model;
(function (model) {
    (function (Jugador) {
        Jugador[Jugador["Jugador1"] = 1] = "Jugador1";
        Jugador[Jugador["Jugador2"] = 2] = "Jugador2";
    })(model.Jugador || (model.Jugador = {}));
    var Jugador = model.Jugador;
    var Juego = (function () {
        function Juego(jugador) {
            this.tablero = [
                [-1, -1, -1, -1, -1],
                [-1, 1, 1, 1, -1],
                [-1, 0, 0, 0, -1],
                [-1, 2, 2, 2, -1],
                [-1, -1, -1, -1, -1]
            ];
            this.turno = jugador;
        }
        Juego.prototype.generarPosibilidades = function () {
            var posibilidades = new Array();
            for (var i = 1; i < 4; i++) {
                for (var j = 1; j < 4; j++) {
                    if (this.turno == Jugador.Jugador1) {
                        if (this.tablero[i][j] == 1) {
                            if (this.tablero[i + 1][j] == 0)
                                posibilidades.push(this.crearJugada(new model.Posicion(i, j), new model.Posicion(i + 1, j)));
                            if (this.tablero[i + 1][j - 1] == 2 && this.tablero[i + 1][j - 1] != 1)
                                posibilidades.push(this.crearJugada(new model.Posicion(i, j), new model.Posicion(i + 1, j - 1)));
                            if (this.tablero[i + 1][j + 1] == 2 && this.tablero[i + 1][j + 1] != 1)
                                posibilidades.push(this.crearJugada(new model.Posicion(i, j), new model.Posicion(i + 1, j + 1)));
                        }
                    } else if (this.turno == Jugador.Jugador2) {
                        if (this.tablero[i][j] == 2) {
                            if (this.tablero[i - 1][j] == 0)
                                posibilidades.push(this.crearJugada(new model.Posicion(i, j), new model.Posicion(i - 1, j)));
                            if (this.tablero[i - 1][j - 1] == 1 && this.tablero[i - 1][j - 1] != 2)
                                posibilidades.push(this.crearJugada(new model.Posicion(i, j), new model.Posicion(i - 1, j - 1)));
                            if (this.tablero[i - 1][j + 1] == 1 && this.tablero[i - 1][j + 1] != 2)
                                posibilidades.push(this.crearJugada(new model.Posicion(i, j), new model.Posicion(i - 1, j + 1)));
                        }
                    }
                }
            }
            return posibilidades;
        };
        Juego.prototype.crearJugada = function (origen, destino) {
            var nuevotablero = this.clonarTablero();
            nuevotablero[destino.fila][destino.columna] = nuevotablero[origen.fila][origen.columna];
            nuevotablero[origen.fila][origen.columna] = 0;
            var res;
            if (this.turno == Jugador.Jugador1)
                res = new Juego(Jugador.Jugador2);
else
                res = new Juego(Jugador.Jugador2);
            res.tablero = nuevotablero;
            return res;
        };
        Juego.prototype.clonarTablero = function () {
            var nuevotablero = [
                [-1, -1, -1, -1, -1],
                [-1, 0, 0, 0, -1],
                [-1, 0, 0, 0, -1],
                [-1, 0, 0, 0, -1],
                [-1, -1, -1, -1, -1]
            ];
            for (var i = 1; i < 4; i++) {
                for (var j = 1; j < 4; j++) {
                    nuevotablero[i][j] = this.tablero[i][j];
                }
            }
            return nuevotablero;
        };
        Juego.prototype.obtenerPosiblesMovimientos = function (posicion) {
            var posiciones = new Array();
            var oponente = 2;
            var direccion = 1;
            if (this.turno == model.Jugador.Jugador2) {
                oponente = 1;
                direccion = -1;
            }
            if (this.tablero[posicion.fila + direccion][posicion.columna] == 0)
                posiciones.push(new model.Posicion(posicion.fila + direccion, posicion.columna));
            if (this.tablero[posicion.fila + direccion][posicion.columna - 1] == oponente && this.tablero[posicion.fila + direccion][posicion.columna - 1] != -1)
                posiciones.push(new model.Posicion(posicion.fila + direccion, posicion.columna - 1));
            if (this.tablero[posicion.fila + direccion][posicion.columna + 1] == oponente && this.tablero[posicion.fila + direccion][posicion.columna + 1] != -1)
                posiciones.push(new model.Posicion(posicion.fila + direccion, posicion.columna + 1));
            return posiciones;
        };
        Juego.prototype.verificarTurno = function (posicion) {
            return this.tablero[posicion.fila][posicion.columna] == this.turno;
        };
        Juego.prototype.cambiarTurno = function () {
            if (this.turno == Jugador.Jugador1)
                this.turno = Jugador.Jugador2;
else
                this.turno = Jugador.Jugador1;
        };
        Juego.prototype.obtenerMejorJugada = function () {
            var posibilidades = this.generarPosibilidades();
            var MH = 0;
            var pos = 0;
            this.cambiarTurno();
            var piezas_oponente_actuales = this.CantidadDePiezas();
            this.cambiarTurno();
            for (var i = 0; i < posibilidades.length; i++) {
                var MN = posibilidades[i].obtenerMaximoNivel();
                posibilidades[i].cambiarTurno();
                var piezas_oponente = piezas_oponente_actuales - posibilidades[i].CantidadDePiezas();
                var CMO = posibilidades[i].generarPosibilidades().length;
                if (CMO == 0) {
                    pos = i;
                    break;
                } else if (MN + piezas_oponente + CMO > MH) {
                    MH = MN + CMO + piezas_oponente;
                    pos = i;
                }
            }
            if (posibilidades.length > 0)
                this.tablero = posibilidades[pos].tablero;
        };
        Juego.prototype.moverFicha = function (origen, destino) {
            this.tablero[destino.fila][destino.columna] = this.tablero[origen.fila][origen.columna];
            this.tablero[origen.fila][origen.columna] = 0;
        };
        Juego.prototype.yaGane = function () {
            this.cambiarTurno();
            var cmo = this.generarPosibilidades().length;
            var cfo = this.CantidadDePiezas();
            this.cambiarTurno();
            if (cmo == 0 || cfo == 0 || this.llegueAlOtroExtremo())
                return true;
            return false;
        };
        Juego.prototype.CantidadDePiezas = function () {
            var res = 0;
            for (var i = 1; i < 4; i++) {
                for (var j = 1; j < 4; j++) {
                    if (this.turno == Jugador.Jugador1 && this.tablero[i][j] == Jugador.Jugador1)
                        res++;
                    if (this.turno == Jugador.Jugador2 && this.tablero[i][j] == Jugador.Jugador2)
                        res++;
                }
            }
            return res;
        };
        Juego.prototype.llegueAlOtroExtremo = function () {
            for (var i = 1; i < 4; i++) {
                for (var j = 1; j < 4; j++) {
                    if (this.turno == Jugador.Jugador1 && this.tablero[i][j] == Jugador.Jugador1 && i == 3) {
                        return true;
                    } else if (this.turno == Jugador.Jugador2 && this.tablero[i][j] == Jugador.Jugador2 && i == 1) {
                        return true;
                    }
                }
            }
            return false;
        };
        Juego.prototype.obtenerMaximoNivel = function () {
            var MN = 0;
            for (var i = 1; i < 4; i++) {
                for (var j = 1; j < 4; j++) {
                    if (this.turno == Jugador.Jugador1 && this.tablero[i][j] == Jugador.Jugador1 && i > MN) {
                        MN = i;
                    } else if (this.turno == Jugador.Jugador2 && this.tablero[i][j] == Jugador.Jugador2 && Math.abs(4 - i) > MN) {
                        MN = Math.abs(4 - i);
                    }
                }
            }
            return MN;
        };
        return Juego;
    })();
    model.Juego = Juego;
})(model || (model = {}));
//# sourceMappingURL=Juego.js.map
