var myApp = angular.module("myApp", ["ngRoute", "ngSanitize"]);

myApp.config(function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl: '../views/index.product.html',
        controller:'myController'
    })
    // :slug để làm url unique và đẹp hơn
    .when("/product/:slug", {
      templateUrl: "product.html",
      controller: "myController",
    })
    //khởi tạo mặc định chạy trang home
    .otherwise({
      redirectTo: "/",
    });
});
myApp.controller("myController",function myController($rootScope, $scope, $location, $http) {
    // Gọi file json qua $http
    $http.get('../json/product.json').then(function(response){
        $scope.products=response.data.products;
    });
    // Hàm khi click vào sản phẩm
    $scope.productClick = function (product) {
      $location.path("/product/" + product.slug);
      $rootScope.product = product;
    };
    $scope.featureLimit=12;
})

  
