app.controller('diagnosisCtrl', function ($scope, $modal, $filter, Data) {
   $scope.diagnosis = { did: '', iname: '', name: '', time: '', description: '', temperature: '', systolicBP: '', diastolicBP: '', heartrate: '', advice: ''};
   
    Data.get('diagnosis').then(function(data){

        $scope.diagnosises = data.data;

    });
    $scope.open = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/diagnoseEdit.html',
          controller: 'diagnosisEditCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){
                 Data.get('diagnosis').then(function(data) {
                    $scope.diagnosises = data.data;
                });
                //$scope.products.push(selectedObject);
                $scope.diagnosises = $filter('orderBy')($scope.diagnosises, 'did', 'reverse');
            }else if(selectedObject.save == "update"){
                 Data.get('diagnosis').then(function(data) {
                    $scope.diagnosises = data.data;
                });
            }
        });
    };
       $scope.openNew = function (p,size) {

        var modalInstance = $modal.open({
          templateUrl: 'partials/leaveApplicationEdit.html',
          controller: 'leaveApplicationEditCtrl',
          size: size,
          resolve: {
            item2: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){
                 Data.get('patient').then(function(data) {
                    $scope.products = data.data;
                });
                //$scope.products.push(selectedObject);
                $scope.products = $filter('orderBy')($scope.products, 'pid', 'reverse');
            }else if(selectedObject.save == "update"){
                 Data.get('patient').then(function(data) {
                    $scope.products = data.data;
                });
            }
        });
    }; //end

       $scope.openPsc = function (did, size) {

        var modalInstance = $modal.open({
          templateUrl: 'partials/prescriptionEdit.html',
          controller: 'prescriptionEditCtrl',
          size: size,
          resolve: {
            item3: function () {
              return did;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
           
                 Data.get('diagnosis').then(function(data) {
                    $scope.dignosises = data.data;
                });
              
        });
    }; //end
 $scope.columns = [
                    {text:"Diagnosis ID",predicate:"did",sortable:true,dataType:"number"},
                    {text:"Disease Name",predicate:"iname",sortable:false},
                    {text:"Patient Name",predicate:"name",sortable:false},
                    {text:"Time ",predicate:"time",sortable:true},
                    {text:"Description ",predicate:"description",sortable:false},
                    {text:"Suggestion ",predicate:"advice",sortable:false}
                   
                ];

});


app.controller('diagnosisEditCtrl', function ($scope, $modalInstance, item, Data) {

        $scope.diagnosis = { did: '', sid: '', pid: '', time: '', description: '', temperature: '', systolicBP: '', diastolicBP: '', heartrate: '', advice: ''};
        //$scope.diagnosis = angular.copy(item);
        $scope.illness = { sid: '', iname: '', categorya: '', categoryb: '', defaultdescription: '', defaultadvice: '', pinyin:''};
       
        $scope.illnesses = [];
        // $scope.selectedId = '';
        Data.get('illness').then(function(data) {

              $scope.illnesses = data.data;
              

        });
        
        
       $scope.changed = function(selectedID) {
        
        $scope.illness.sid = selectedID;
       // alert(selectedID);
    };

       
        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
        $scope.title = (item.did > 0) ? 'Edit Product' : 'Add Product';
        $scope.buttonText = (item.did > 0) ? 'Update Product' : 'Add New Product';

        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.diagnosis);
        }
        $scope.saveProduct = function (diagnosis,illness) {
             diagnosis.did = $scope.diagnosis.did;
             diagnosis.sid =  $scope.illness.sid;
             var time = new Date();
            alert(time);
              diagnosis.time = time;
             //alert(product.pid);
            // product.status = 'Active';
                Data.post('diagnosis', diagnosis).then(function (result) {
                     //if(result.status != 'error'){
                        alert(diagnosis.sid);
                        var x = angular.copy(diagnosis);
                        x.save = 'insert';
                        x.did = result.data;
                        //alert(result.data);
                        $modalInstance.close(x);
                    // }else{
                        //find error
                        
                         console.log(result);

                    // }
                });
           
        };
});

//Controller of Leave Application
app.controller('leaveApplicationEditCtrl', function ($scope, $modalInstance, item2, Data) {

        $scope.diagnosisrich = { did: '', sid: '', pid: '', time: '', description: '', temperature: '', systolicBP: '', diastolicBP: '', heartrate: '', advice: '', sname: '', pname:''};
  
        $scope.diagnosisrich = angular.copy(item2);
        
        $scope.illness = { sid: '', iname: '', categorya: '', categoryb: '', defaultdescription: '', defaultadvice: '', pinyin:''};
       
        $scope.illnesses = [];
        // $scope.selectedId = '';
        Data.get('illness').then(function(data) {

              $scope.illnesses = data.data;

              //alert(data.data.length);

              for (var i = data.data.length - 1; i >= 0; i--) 
              {

                if ( data.data[i].sid == $scope.diagnosisrich.sid) 
                {
                    $scope.diagnosisrich.sname = data.data[i].name;
                    alert('sname '.$scope.diagnosisrich.sname);
              }


        }

        });

        $scope.patient = { pid: '', name: '', identity: '', insurance: '', birthday: '', gender: '', pasthistory: '', allergichistory: '' , height: '' ,weight: '', status :'Active'};
        
        Data.get('patient').then(function(data){
        $scope.patients = data.data;

              //alert('patient '.data.data.length);

              for (var i = data.data.length - 1; i >= 0; i--) {
              if ( data.data[i].pid==$scope.diagnosisrich.pid) {
              $scope.diagnosisrich.pname=data.data[i].name;
              alert('pname '.$scope.diagnosisrich.pname);
            }
        }
        
});
        
        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
       
        var original = item2;
        $scope.isClean = function() {
            return angular.equals(original, $scope.diagnosis);
        }
   
});

