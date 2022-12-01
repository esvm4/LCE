var myApp = angular.module("myApp", ["ngRoute", "ngSanitize"]);

<<<<<<< HEAD
myApp.config(function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl: '../views/index.product.html',
        controller:'myController'
=======
myApp.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "home.html",
>>>>>>> c90bc251042ec30a96b4a22c354ddbc11a46e13f
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
myApp.controller(
  "myController",
  function myController($rootScope, $scope, $location, $http) {
    // Gọi file json qua $http
<<<<<<< HEAD
    $http.get('../json/product.json').then(function(response){
        $scope.products=response.data.products;
=======
    $http.get("../json/product.json").then(function (response) {
      $scope.products = response.data.products;
>>>>>>> c90bc251042ec30a96b4a22c354ddbc11a46e13f
    });
    // Hàm khi click vào sản phẩm
    $scope.productClick = function (product) {
      $location.path("/product/" + product.slug);
      $rootScope.product = product;
    };
<<<<<<< HEAD
    $scope.featureLimit=12;
})

  
=======
  }
);
>>>>>>> c90bc251042ec30a96b4a22c354ddbc11a46e13f
