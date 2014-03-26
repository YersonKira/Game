/// <reference path='Posicion.ts' />
module model{
    export enum Jugador {
        Jugador1 = 1, Jugador2 = 2
    }
    export class Juego{
        tablero: number[][] = [
            [-1, -1, -1, -1, -1],
            [-1, 1, 1, 1, -1],
            [-1, 0, 0, 0, -1],
            [-1, 2, 2, 2, -1],
            [-1, -1, -1, -1, -1]
        ];
        turno: Jugador;
        constructor(jugador: Jugador) {
            this.turno = jugador;
        }
        private generarPosibilidades(): Array<Juego> {
            var posibilidades = new Array<Juego>();
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
        }
        private crearJugada(origen: Posicion, destino: Posicion): Juego{
            var nuevotablero = this.clonarTablero();
            nuevotablero[destino.fila][destino.columna] = nuevotablero[origen.fila][origen.columna];
            nuevotablero[origen.fila][origen.columna] = 0;
            var res: Juego;
            if (this.turno == Jugador.Jugador1) res = new Juego(Jugador.Jugador2);
            else res = new Juego(Jugador.Jugador2);
            res.tablero = nuevotablero;
            return res;
        }
        private clonarTablero(): number[][] {
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
        }
        obtenerPosiblesMovimientos(posicion: model.Posicion): Array<model.Posicion>{
            var posiciones = new Array<model.Posicion>();
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
        }
        verificarTurno(posicion: Posicion): boolean {
            return this.tablero[posicion.fila][posicion.columna] == this.turno;
        }
        cambiarTurno() {
            if (this.turno == Jugador.Jugador1)
                this.turno = Jugador.Jugador2;
            else
                this.turno = Jugador.Jugador1;
        }
        obtenerMejorJugada() {
            var posibilidades = this.generarPosibilidades();
            var MH = 0; // Mejor heuristica
            var pos = 0; 
            this.cambiarTurno();
            var piezas_oponente_actuales = this.CantidadDePiezas();
            this.cambiarTurno();
            for (var i = 0; i < posibilidades.length; i++) {
                var MN = posibilidades[i].obtenerMaximoNivel(); // Maximo nivel alcanzado
                posibilidades[i].cambiarTurno();
                var piezas_opnente = piezas_oponente_actuales - posibilidades[i].CantidadDePiezas();
                var CMO = posibilidades[i].generarPosibilidades().length;  // Cantidad de movimientos del oponente
                if (CMO == 0) {
                    pos = i;
                    break;
                } else if (MN + piezas_opnente + CMO > MH) {
                    MH = MN + CMO + piezas_opnente;
                    pos = i;
                }
            }
            if (posibilidades.length > 0) 
                this.tablero = posibilidades[pos].tablero;
        }
        moverFicha(origen: Posicion, destino: Posicion) {
            this.tablero[destino.fila][destino.columna] = this.tablero[origen.fila][origen.columna];
            this.tablero[origen.fila][origen.columna] = 0;
        }
        yaGane(): boolean {
            this.cambiarTurno();
            var cmo = this.generarPosibilidades().length; // Cantidad de movimientos del oponente
            var cfo = this.CantidadDePiezas(); // Cantidad de piezas del opoente
            this.cambiarTurno();
            if (cmo == 0 || cfo == 0 || this.llegueAlOtroExtremo()) return true;
            return false;
        }
        private CantidadDePiezas(): number {
            var res = 0;
            for (var i = 1; i < 4; i++) {
                for (var j = 1; j < 4; j++) {
                    if (this.turno == Jugador.Jugador1 && this.tablero[i][j] == Jugador.Jugador1) res++;
                    if (this.turno == Jugador.Jugador2 && this.tablero[i][j] == Jugador.Jugador2) res++;
                }
            }
            return res;
        }
        private llegueAlOtroExtremo(): boolean {
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
        }
        private obtenerMaximoNivel(): number {
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
        }
    }
}