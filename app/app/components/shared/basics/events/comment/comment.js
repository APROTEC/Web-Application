System.register(['../../associate/associate'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var associate_1;
    var Comment;
    return {
        setters:[
            function (associate_1_1) {
                associate_1 = associate_1_1;
            }],
        execute: function() {
            Comment = (function () {
                function Comment() {
                    this.asociado = new associate_1.Associate();
                }
                return Comment;
            }());
            exports_1("Comment", Comment);
        }
    }
});
