const scripts = [];

const POLL_FREQUENCY = 1000;
const JS_SCRIPT_TYPE = 'js';
const CSS_SCRIPT_TYPE = 'css';

module.exports = {
    loadAll: function(all) {
        var promises = all.map(function(s) {
            return this.loadScript(s.url, s.type);
        }.bind(this));
        return Promise.all(promises);
    },
    loadCSS: function(cssURL) {
        if(cssURL.constructor === Array) {
            var promises = cssURL.map(function(url) {
                return this.loadScript(url, CSS_SCRIPT_TYPE);
            }.bind(this));
            return Promise.all(promises);
        }
        else {
            return this.loadScript(cssURL, CSS_SCRIPT_TYPE);
        }
    },
    loadJavascript: function(scriptURL) {
        if(scriptURL.constructor === Array) {
            var promises = scriptURL.map(function(url) {
                return this.loadScript(url, JS_SCRIPT_TYPE);
            }.bind(this));
            return Promise.all(promises);
        }
        else {
            return this.loadScript(scriptURL, JS_SCRIPT_TYPE);
        }
    },

    loadScript: function(scriptURL, type) {
        type = type || JS_SCRIPT_TYPE;

        return new Promise(function(resolve, reject) {
            var checkScript = function(scriptURL) {
                var script = scripts.find(function(s) {
                    return s.url === scriptURL;
                });

                if(!script) {
                    this.addScript(scriptURL, type);
                    poll();
                }
                else if(!script.complete) {
                    poll();
                }
                else if(script.error) {
                    reject(script.error);
                }
                else {
                    resolve();
                }
            }.bind(this);

            var poll = function() {
                setTimeout(function() { checkScript(scriptURL) }, POLL_FREQUENCY);
            }

            checkScript(scriptURL);
        }.bind(this));
    },
    addScript: function(scriptURL, type) {
        var tag;
        if(type === JS_SCRIPT_TYPE) {
            tag = this.jsTag(scriptURL);
        }
        else if(type === CSS_SCRIPT_TYPE) {
            tag = this.cssTag(scriptURL);
        }

        var script = {
            url: scriptURL,
            tag: tag,
            complete: false,
            error: null
        }
        scripts.push(script);
        
        this.addTagToBody(tag, function() {
            script.complete = true;
        }, function() {
            script.complete = true;
            script.error = Error("Script failed to load: " + script.scriptURL);
        });

        return script;
    },
    cssTag: function(url) {
        var tag = document.createElement('link');
		tag.href = url;
        tag.rel = "stylesheet";
		tag.async = 1;
        return tag;
    },
    jsTag: function(url) {
        var tag = document.createElement('script');
		tag.src = url;
		tag.async = 1;
        return tag;
    },
    addTagToBody: function(tag, success, failure) {
        tag.onload = success;
        tag.onerror = failure;

		tag.onreadystatechange = function () {
            if (this.readyState === 'complete' || this.readyState === 'loaded') {
                tag.onload();
            }
        };
		
		document.body.appendChild(tag);
    }
};
