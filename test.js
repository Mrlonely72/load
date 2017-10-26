window.onload = function () {

    function obj2string(o) {
        var r = [];
        if (typeof o == 'string') {
            return '\"' + o.replace(/([\'\"\\])/g, '\\$1').replace(/(\n)/g, '\\n').replace(/(\r)/g, '\\r').replace(/(\t)/g, '\\t') + '\"';
        }
        if (typeof o == 'object') {
            if (!o.sort) {
                for (var i in o) {
                    r.push('\"' + i + '\"' + ':' + obj2string(o[i]));
                }
                if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {
                    r.push('toString:' + o.toString.toString());
                }
                r = '{' + r.join() + '}';
            } else {
                for (var i = 0; i < o.length; i++) {
                    r.push(obj2string(o[i]))
                }
                r = '[' + r.join() + ']';
            }
            return r;
        }
        return o.toString();
    }

    function JSONstringify(params) {
        try {
            if (performance && performance.timing) {
                var result =obj2string(performance.timing);
                return result;
            } else {
                return '{}'
            }
        } catch (e) {
            console.log('====performance JSONstringify error:' + e);
        }
    }

    function box() {
        var defaultParams = {
            min_v: 2
        };
        try {
            var json = JSONstringify(defaultParams);

            console.log('====performance star:' + json);
            confirm(json);

        } catch (e) {
            console.log('====performance box  error:' + e);
        }
    }
    setTimeout(box, 200);
};
