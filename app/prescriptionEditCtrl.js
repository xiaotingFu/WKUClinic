app.controller('prescriptionEditCtrl', function ($scope, $modalInstance, item3, Data) {

       $scope.prescription = { pscid: '', mid: '', did: '', customusage: '', quantity: ''};
   
        Data.get('prescription').then(function(data){
            $scope.prescriptions = data.data;
        });
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
        //$scope.title = (item.pscid > 0) ? 'Edit Product' : 'Add Product';
        //$scope.buttonText = (item.pscid > 0) ? 'Update Product' : 'Add New Product';

        var original = item3;
        $scope.isClean = function() {
            return angular.equals(original, $scope.prescription);
        }
        
        $scope.saveProduct = function (prescription) {

             //prescription.pscid =  
             prescription.mid =  $scope.medicine.mid;
             prescription.did = $scope.prescription.did;//problem here, can't find did here


             //alert(product.pid);
            // product.status = 'Active';
                Data.post('prescription', prescription).then(function (result) {
                     //if(result.status != 'error'){
                        //alert(prescription.pscid);
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
