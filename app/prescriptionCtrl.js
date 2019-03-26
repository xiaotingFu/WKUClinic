app.controller('prescriptionCtrl', function ($scope, $modal, $filter, Data) {
   $scope.prescription = { pscid: '', name: '', sid: '', customusage: '', quantity: ''};
   
    Data.get('prescription').then(function(data){
        $scope.prescriptions = data.data;
 });
 
    $scope.open = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/prescriptionEdit.html',
          controller: 'prescriptionEditCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){
                 Data.get('prescription').then(function(data) {
                    $scope.prescriptions = data.data;
                });
                //$scope.products.push(selectedObject);
                $scope.prescriptions = $filter('orderBy')($scope.prescriptions, 'pscid', 'reverse');
            }else if(selectedObject.save == "update"){
                 Data.get('prescription').then(function(data) {
                    $scope.prescriptions = data.data;
                });
            }
        });
    };
    
 $scope.columns = [
                    {text:"Prescription ID",predicate:"pscid",sortable:true,dataType:"number"},
                    {text:"Medicine Name",predicate:"name",sortable:true},
                    {text:"Diagnosis Content",predicate:"sid",sortable:true},
                    {text:"Custom Usage ",predicate:"customusage",sortable:false},
                    {text:"Quantity ",predicate:"quantity",sortable:false}
                    
                   
                ];


});


app.controller('prescriptionEditCtrl', function ($scope, $modalInstance, item, Data) {

        $scope.prescription = angular.copy(item);
        $scope.medicine = { mid: '', name: '', inventory: '', specification: '', producer: '', price: '', paytype:'' , defaultusage:'' , category:'' , pinyin:''};
       
        $scope.medicines = [];

        Data.get('medicine').then(function(data) {

               $scope.medicines = data.data;
               
        });
        
        
   $scope.changed = function(selectedID) {
        
        $scope.medicine.mid = selectedID;
        alert(selectedID);
    };


       
        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
        $scope.title = (item.pscid > 0) ? 'Edit Product' : 'Add Product';
        $scope.buttonText = (item.pscid > 0) ? 'Update Product' : 'Add New Product';

        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.prescription);
        }
        
        $scope.saveProduct = function (prescription) {

             prescription.pscid = 
             prescription.mid =  $scope.medicine.mid;

             //prescription.did = 1;
             //alert(product.pid);
            // product.status = 'Active';
                Data.post('prescription', prescription).then(function (result) {
                     //if(result.status != 'error'){
                        alert(prescription.pscid);
                        var x = angular.copy(prescription);
                        x.save = 'insert';
                        x.pscid = result.data;
                        //alert(result.data);
                        $modalInstance.close(x);
                    // }else{
                        //find error
                         alert(prescription.pscid);
                         console.log(result);

                    // }
                });
           
        };
});
