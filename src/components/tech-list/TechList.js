;(function () {
    angular.module('co.ahlgren.TechList', [])
        .directive('techList', TechList)

    /**
     * @ngdocs directive
     * @name co.ahlgren.TechList
     */
    function TechList($parse){
        return{
            restrict: 'AE',
            scope:{
                tech: '@'
            },
            templateUrl: '/components/tech-list/tech-list.tmpl.html',
            link: function(scope){

                var labels = {
                    angular: 'Angular',
                    html5: 'HTML5',
                    sass: 'SASS',
                    git: 'Git',
                    grunt: 'Grunt',
                    bower: 'Bower',
                    node: 'NodeJS',
                    fireworks: 'Fireworks',
                    mongodb: 'MongoDB',
                    'google-cloud': 'Google Cloud',
                    lead: 'Lead',
                    code: 'code',
                    concept: 'Concept',
                    design: 'Design',
                    testing: 'Testing'
                };

                var techList = $parse(scope.tech)(scope);
                scope.techList = techList.map(function(item){
                    return{id: item, label: labels[item]};
                })
            }
        }
    }
})();
