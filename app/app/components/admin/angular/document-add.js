angular.module('fileUpload', ['ngFileUpload'])
.controller('MyCtrl',['Upload','$window',function(Upload,$window){
    var vm = this;
    vm.submit = function(){ //function to call on form submit
        if (vm.upload_form.file.$valid && vm.file && vm.nombre != undefined) { //check if from is valid
            vm.upload(vm.file,vm.nombre,vm.descripcion); //call upload function
        }
    }

    vm.upload = function (file,nombre_acta,descripcion_acta) {
      var obj = new Object();
       obj.nombre_acta = nombre_acta;
       obj.descripcion_acta  = descripcion_acta;
       var body= JSON.stringify(obj);
        Upload.upload({
            //url: 'http://localhost:5000/actas/'+body, //webAPI exposed to upload the file
            url: 'http://45.55.155.151:8081/actas/'+body, //webAPI exposed to upload the file
            data:{file:file} //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
            if(resp.data.error_code != 0){ //validate success
                $window.alert('El archivo ha sido agregado');
            } else {
                $window.alert('Ha ocurrido un error');
            }
        }, function (resp) { //catch error
            $window.alert('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });
    };
}]);
