var model;
(function (model) {
    var Posicion = (function () {
        function Posicion(fila, columna) {
            this.fila = fila;
            this.columna = columna;
        }
        Posicion.prototype.toString = function () {
            return this.fila + ',' + this.columna;
        };
        Posicion.prototype.equals = function (posicion) {
            return this.fila == posicion.fila && this.columna == posicion.columna;
        };
        return Posicion;
    })();
    model.Posicion = Posicion;
})(model || (model = {}));
//# sourceMappingURL=Posicion.js.map
