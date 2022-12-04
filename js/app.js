var myApp = angular.module("myApp", ["ngRoute", "ngSanitize"]);

myApp.config(function($routeProvider){
  
  $routeProvider
    .when('/',{
        templateUrl: '../views/index.product.html'
    })
    // :slug để làm url unique và đẹp hơn
    .when("/product/:slug", {
      templateUrl: "../views/product.single.html"
    })
    //khởi tạo mặc định chạy trang home
    .otherwise({
      redirectTo: "/",
    });
});
myApp.controller("myController",function myController($rootScope, $scope, $location, $http) {
    // test
    

    $scope.login={};
    // Gọi file json qua $http
    $http.get('../json/product.json').then(function(response){
        $scope.products=response.data.products;
    });
    // Hàm khi click vào sản phẩm
    $scope.productClick = function (product) {
      $location.path("/product/" + product.slug);
      $rootScope.product = product;
      $rootScope.cartItem={"quantity":1};
      console.log(login);
    };
    // Hàm tăng số lượng sản phẩm
    $rootScope.plusQuantity =function(){
      $rootScope.cartItem.quantity++;
      
    }
    // Hàm giảm số lượng sản phẩm
    $rootScope.minusQuantity =function(){
      if($rootScope.cartItem.quantity>1){
        $rootScope.cartItem.quantity--;
      }
    }
    // Hàm khi thêm sản phẩm vào
    $rootScope.addToCart= function(product){
      $rootScope.cartItem.product = product;
      $rootScope.cartItem.total = product.price * $rootScope.cartItem.quantity;
      if ($rootScope.cart.length>0){
        var count=0;
        for (var i =0; i<$rootScope.cart.length;i++){
          if($rootScope.cart[i].product==product){
            $rootScope.cart[i].quantity+=$rootScope.cartItem.quantity;
            $rootScope.cart[i].total=product.price * $rootScope.cart[i].quantity;
            count++;  
          }  
        };
        if(count==0){
          $rootScope.cartItemCopy = Object.assign({}, $rootScope.cartItem);
          $rootScope.cart.push($rootScope.cartItemCopy);
        }  
      }
      else{
        //copy ra object giả để push
        $rootScope.cartItemCopy = Object.assign({}, $rootScope.cartItem);
        $rootScope.cart.push($rootScope.cartItemCopy);
      }
    };
    $rootScope.cartItem={"quantity":1};
    $rootScope.cartItemCopy={};
    $rootScope.cart=[];

    
    
})


