System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Event, EventType;
    return {
        setters:[],
        execute: function() {
            Event = (function () {
                function Event() {
                    this.nombre = "";
                    this.tipo_evento = new EventType();
                    this.acompanantes = 0;
                    this.confirmedParticipants = 0;
                    this.noConfirmedParticipants = 0;
                    this.precio_entrada_asociados = 0;
                    this.codigo_tipo_evento = 0;
                }
                return Event;
            }());
            exports_1("Event", Event);
            EventType = (function () {
                function EventType() {
                    this.codigo_tipo_evento = 0;
                    this.descripcion = "";
                }
                return EventType;
            }());
            exports_1("EventType", EventType);
        }
    }
});
