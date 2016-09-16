(function (window, document) {
    'use strict';
    var registered = null;

    function media(){
        var windowWidth = window.innerWidth;
        // get all registered media breakpoints
        if( registered == null){
            registered = Array.prototype.slice.call(document.body.attributes).filter(function(attr){
                if(attr.name.indexOf('break-') != -1){
                    return attr;
                }

                // make them into name: size
            }).map(function(attribute){
                var o = {
                    name: attribute.name.replace('break-', ''),
                    value: parseInt(attribute.value)
                };
                return o;
            });
        }

        // set the width to apply the breakpoint at
        var bp = getBreakpoint(registered);

        // remove all classes starting with break-
        Array.prototype.slice.call(document.body.classList).forEach(function(c, index){
            if(c.indexOf('break-') != -1)
                document.body.classList.remove(c);
        });

        if(bp){
            document.body.classList.add('break-'+bp.name);
        }else{
            document.body.classList.add('break-default');
        }

        function getBreakpoint(breakpoints){

            // get the breakpoint that is
            return breakpoints.filter(function(breakpoint){
                return breakpoint.value >= windowWidth;
            }).reduce(function(previous, current){
                return (current.value < previous.value) ? current : previous;
            }, {value: 9999999, name: 'default'})
        }
    }

    window.onresize = media;
    document.addEventListener('DOMContentLoaded', media);

})(window, document);
