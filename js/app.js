var myApp = angular.module("myApp", ["ngRoute", "ngSanitize"]);

myApp.config(function($routeProvider,$locationProvider){
  
  $locationProvider.hashPrefix('');
  // $locationProvider.html5Mode(true);
  $routeProvider
    .when('/home',{
        templateUrl: '../views/home.html'
    })
    .when('/',{
      templateUrl: '../views/home.html'
  })
    .when('/products',{
      templateUrl: '../views/index.product.html'
    })
    .when('/collections/:slug',{
      templateUrl: '../views/collections.all.html'
    })
    .when('/all',{
      templateUrl: '../views/collections.html'
    })
    .when('/register',{
      templateUrl: '../views/register.html'
    })
    .when('/aboutus',{
      templateUrl: '../views/aboutus.html'
    })
    .when('/contact',{
      templateUrl: '../views/contact.html'
    })
    .when('/search',{
      templateUrl: '../views/search.html'
    })
    .when('/returnpolicy',{
      templateUrl: '../views/returnpolicy.html'
    })
    .when('/privacypolicy',{
      templateUrl: '../views/privacypolicy.html'
    })
    .when('/termofservice',{
      templateUrl: '../views/termsofservice.html'
    })
    // :slug để làm url unique và đẹp hơn
    .when("/product/:slug", {
      templateUrl: "../views/collections.single.html"
    })
    .when("/cart", {
      templateUrl: "../views/cart.html"
    })
    .when("/blog", {
      templateUrl: "../views/blog.all.html"
    })
    .when("/blog1", {
      templateUrl: "../views/blog1.html"
    })
    .when("/blog2", {
      templateUrl: "../views/blog2.html"
    })
    //khởi tạo mặc định chạy trang home
    .otherwise({
      redirectTo: "/",
    });
});



myApp.controller("myController",function myController($rootScope, $scope, $location, $http) {
    // test
    $rootScope.cartItem={"quantity":1};
    $rootScope.cartItemCopy={};
    $rootScope.cart=[];
    $rootScope.cartQuantity=0;
    $rootScope.cartValue=0;
    $scope.login={};
    $scope.rangePrice=9999999;
    $scope.search="";
    // Gọi file json qua $http
    $http.get('../json/product.json').then(function(response){
        $scope.products=response.data.products;
    });
    $http.get('../json/account.json').then(function(response){
      $scope.accounts=response.data.accounts;
  });
    // Hàm khi click vào sản phẩm
    $scope.productClick = function (product) {
      $location.path("/product/" + product.slug);
      $rootScope.product = product;
      $rootScope.cartItem={"quantity":1};
      
    };
    $scope.categoryClick = function(category){
      $location.path("/collections/"+category);
      $scope.category=category;

    }
    $scope.searchKey = function(){
      if($scope.search != ""){
        $location.path("/all");
      }
    }
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
      $rootScope.cartItem.totalPrice = product.price * $rootScope.cartItem.quantity;
      $rootScope.cartQuantity+=$rootScope.cartItem.quantity;
      $rootScope.cartValue+=$rootScope.cartItem.totalPrice;
      if ($rootScope.cart.length>0){
        var count=0;
        for (var i =0; i<$rootScope.cart.length;i++){
          if($rootScope.cart[i].product==product){
            $rootScope.cart[i].quantity+=$rootScope.cartItem.quantity;
            $rootScope.cart[i].totalPrice=product.price * $rootScope.cart[i].quantity;
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
    $scope.remove=function(item){
      let removeItem = $rootScope.cart.indexOf(item)
      $rootScope.cart.splice(removeItem,1);
      $rootScope.cartQuantity-=item.quantity;
      $rootScope.cartValue-=item.totalPrice;
    }
    $scope.plusInCart=function(item){
      let index = $rootScope.cart.indexOf(item)
      $rootScope.cart[index].quantity++;
      $rootScope.cart[index].totalPrice+=$rootScope.cart[index].product.price*1;
      $rootScope.cartQuantity++;
      $rootScope.cartValue+=$rootScope.cart[index].product.price*1;
    }
    $scope.minusInCart=function(item){
      let index = $rootScope.cart.indexOf(item)
      if($rootScope.cart[index].quantity>1){
        $rootScope.cart[index].quantity--;
        $rootScope.cart[index].totalPrice-=$rootScope.cart[index].product.price*1;
        $rootScope.cartQuantity--;
        $rootScope.cartValue-=$rootScope.cart[index].product.price*1;
      }
      
    }
    $scope.authen =function(){
      for (var i =0; i<$scope.accounts.length;i++){
        if ($scope.accounts[i].email==$scope.login.email && $scope.accounts[i].password==$scope.login.password){
          $scope.authen = true;
        }
      }
      
    }
})



