angular.module('fileUploadEvent', ['ngFileUpload'])
.controller('MyCtrlEvent',['Upload','$window','$http','$scope',function(Upload,$window, $http,$scope){
    var vm = this;
    $scope.data = {
      selectValue: null,
      availableOptions: [ ],
    }
    $scope.getEvents = function(){

      $http({
        method: 'GET',
        url: 'http://45.55.155.151:8081/eventos'
      }).then(function successCallback(response) {
          $scope.data.availableOptions = response.data

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
    }
    $scope.getEvents()
    vm.submit = function(){ //function to call on form submit
        if (vm.upload_form.file.$valid && vm.file && vm.nombre != undefined) { //check if from is valid
            vm.upload(vm.file,vm.nombre,$scope.data.selectValue); //call upload function
        }
    }

    vm.upload = function (file,nombre_acta,pEvento) {
      var obj = new Object();
       obj.nombre_documento = nombre_acta;
       obj.codigo_evento = pEvento
       var body= JSON.stringify(obj);
       console.log(body)
        Upload.upload({
            //url: 'http://localhost:8081/actas/'+body, //webAPI exposed to upload the file
            url: 'http://45.55.155.151:8081/eventos_documentos/'+body, //webAPI exposed to upload the file
            data:{file:file} //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
            if(resp.data.error_code === 0){ //validate success
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
