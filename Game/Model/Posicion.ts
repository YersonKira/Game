module model {
    export class Posicion {
        columna: number;
        fila: number;
        constructor(fila: number, columna: number) {
            this.fila = fila;
            this.columna = columna;
        }
        toString(): string{
            return this.fila + ',' + this.columna;
        }
        equals(posicion: Posicion): boolean {
            return this.fila == posicion.fila && this.columna == posicion.columna;
        }
    }
}
