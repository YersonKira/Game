/// <reference path='Model/Juego.ts' />
class Principal {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    juego: model.Juego;
    posiblesmovimientos: Array<model.Posicion> = null;
    constructor(canvas: HTMLCanvasElement) {
        this.juego = new model.Juego(model.Jugador.Jugador1);
        document.getElementById('text').textContent = 'Jugador ' + this.juego.turno;
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        var posicionseleccionada: model.Posicion = null;

        //setTimeout(() => {
        //    this.juego.obtenerMejorJugada();
        //    this.dibujarTablero();
        //    if (this.juego.yaGane()) {
        //        alert('Ganador Jugador 2');
        //    }
        //    this.juego.cambiarTurno();
        //}, 500);

        this.canvas.onclick = (e: MouseEvent) => {
            var lado = this.canvas.width / 3;
            var columna = Math.ceil((e.x - this.canvas.offsetLeft) / lado);
            var fila = Math.ceil((e.y - this.canvas.offsetTop) / lado);
            var pos = new model.Posicion(fila, columna);
            if ((this.posiblesmovimientos == null || this.juego.verificarTurno(pos)) && this.juego.tablero[pos.fila][pos.columna] != 0) {
                if (this.juego.verificarTurno(pos)) {
                    posicionseleccionada = pos;
                    this.posiblesmovimientos = this.juego.obtenerPosiblesMovimientos(pos);
                    this.mostrarPosibilidades();
                }
            }else if (this.posiblesmovimientos != null) {
                for (var i = 0; i < this.posiblesmovimientos.length; i++) {
                    if (this.posiblesmovimientos[i].equals(pos)) {
                        this.juego.moverFicha(posicionseleccionada, pos);
                        this.dibujarTablero();
                        if (this.juego.yaGane()) {
                            alert('Ganador Jugador 1');
                        }
                        this.juego.cambiarTurno();
                        if (this.juego.turno == model.Jugador.Jugador2) {
                            // Hacer jugada
                            setTimeout(() => {
                                this.juego.obtenerMejorJugada();
                                this.dibujarTablero();
                                if (this.juego.yaGane()) {
                                    alert('Ganador Jugador 2');
                                }
                                this.juego.cambiarTurno();
                            }, 500);
                        }
                        document.getElementById('text').textContent = 'Jugador ' + this.juego.turno;
                        break;
                    }
                }
                delete this.posiblesmovimientos;
                delete posicionseleccionada;
                this.posiblesmovimientos = null;
            }
        };
        this.dibujarTablero();
    }
    mostrarPosibilidades(): void {
        this.dibujarTablero();
        this.context.strokeStyle = '#f00';
        this.context.lineWidth = 5;
        var lado = this.canvas.width / 3;
        for (var i = 0; i < this.posiblesmovimientos.length; i++) {
            this.context.strokeRect(lado * (this.posiblesmovimientos[i].columna - 1), lado * (this.posiblesmovimientos[i].fila - 1), lado, lado);
        }
    }
    dibujarTablero(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.strokeStyle = '#fff';
        this.context.lineWidth = 2;
        var lado = this.canvas.width / 3;
        var radio = lado / 2;
        var constant = 5;
        for (var i = 0; i < 3; i++) {
            for(var j = 0; j < 3; j++) {
                this.context.strokeRect(lado * i, lado * j, lado, lado);
                if(this.juego.tablero[j + 1][i + 1] == 1) {
                    this.context.fillStyle = '#fff';
                    this.context.beginPath();
                    this.context.arc((i * lado) + radio, (j * lado) + radio, radio - constant, 0, Math.PI * 2, true);
                    this.context.closePath();
                    this.context.fill();
                }else if (this.juego.tablero[j + 1][i + 1] == 2) {
                    this.context.fillStyle = '#000';
                    this.context.beginPath();
                    this.context.arc((i * lado) + radio, (j * lado) + radio, radio - constant, 0, Math.PI * 2, true);
                    this.context.closePath();
                    this.context.fill();
                }
            }
        }
    }
}
window.onload = (e: Event) =>{
    var main = new Principal(<HTMLCanvasElement>document.getElementById('canvas'));
};