app.controller('patientsCtrl', function ($scope, $modal, $filter, Data) {
   $scope.product = { pid: '', name: '', identity: '', insurance: '', birthday: '', gender: '', pasthistory: '', allergichistory: '' , height: '' ,weight: '', status :'Active'};
   
   Data.get('patient').then(function(data){
        $scope.products = data.data;
        
    });

    $scope.changeProductStatus = function(product){
        product.status = (product.status=="Active" ? "Inactive" : "Active");
        Data.put("patient/"+product.pid,{status:product.status});
    };
    $scope.deleteProduct = function(product){
        if(confirm("Are you sure to remove the product")){
            Data.delete("patient/"+product.pid).then(function(result){
                $scope.products = _.without($scope.products, _.findWhere($scope.products, {pid:product.pid}));
            });
        }
    };
    $scope.open = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/patientInfoEdit.html',
          controller: 'patientInfoEditCtrl',
          size: size,
          resolve: {
            item: function () {
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
    };
    
 $scope.columns = [
                    {text:"ID",predicate:"pid",sortable:true,dataType:"number"},
                    {text:"Name",predicate:"name",sortable:true},
                    {text:"Identity",predicate:"identity",sortable:true},
                    {text:"Birthday",predicate:"birthday",sortable:true},
                    {text:"Gender",predicate:"gender",reverse:true,sortable:true},
                    {text:"Status",predicate:"status",sortable:true},
                    {text:"Action",predicate:"",sortable:false}
                ];

});


app.controller('patientInfoEditCtrl', function ($scope, $modalInstance, item, Data) {

     $scope.product = angular.copy(item);
      
        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
        $scope.title = (item.pid > 0) ? 'Edit Product' : 'Add Product';
        $scope.buttonText = (item.pid > 0) ? 'Update Product' : 'Add New Product';

        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.product);
        }
        $scope.saveProduct = function (product) {
             product.pid = $scope.product.pid;
             //alert(product.pid);
             product.status = 'Active';
                Data.post('patient', product).then(function (result) {
                     if(result.status != 'error'){
                        alert(product.pid);
                        var x = angular.copy(product);
                        x.save = 'insert';
                        x.pid = result.data;
                        //alert(result.data);
                        $modalInstance.close(x);
                     }else{
                        //find error
                         alert(product.pid);
                         console.log(result);

                     }
                });
           
        };
});
