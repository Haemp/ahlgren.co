;(function () {
    angular.module('co.ahlgren.Texticon', [])
        .directive('texticon', Texticon)
    /**
     * @ngdoc directive
     * @name co.ahlgren.Texticon
     *
     *
     */
    function Texticon(){
        return{
            restrict: 'AE',
            scope:{
                icon: '@',
                layout: '@'
            },
            transclude:true,
            templateUrl: '/components/texticon/texticon.tmpl.html'
        }
    }

})();

