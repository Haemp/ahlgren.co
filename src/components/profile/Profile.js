;(function () {
    angular.module('co.ahlgren.Profile', [])
        .directive('profile', Profile)


    function Profile($compile){

        return{
            scope: {
                githubUrl: '@',
                image:'@',

            },
            transclude: true,
            templateUrl: '/components/profile/profile.tmpl.html',
            link: function(scope, element){
                var description = $compile(element.find('description')[0].innerHTML)(scope.$parent);
                $(element).find('.Profile-description-container').append(description);


                // remove the desciption
                element.find('description').remove()
            }
        }
    }


})();

