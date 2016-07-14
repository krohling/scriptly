var scripts = [];
// { url: 'script/url', complete: true, error: Error }

module.exports = {
    loadScript: function(scriptURL) {
        return new Promise((resolve, reject) => {
            var poll = function() {
                setTimeout(function() { checkScript(scriptURL) }, 1000);
            }

            var checkScript = function(scriptURL) {
                var script = this.findScriptRecord(scriptURL);

                if(!script.complete) {
                    poll();
                }
                else if(script.error) {
                    reject(script.error);
                }
                else {
                    resolve();
                }
            }.bind(this);

            var script = this.findScriptRecord(scriptURL);
            if(script) {
                checkScript(scriptURL);
            }
            else {
                script = {
                    url: scriptURL,
                    complete: false,
                    error: null
                }
                scripts.push(script);
                this.addScriptTag(scriptURL);
                poll();
            }
        });
    },
    findScriptRecord: function(scriptURL) {
        return scripts.find(function(script) {
            return script.url === scriptURL;
        });
    },
    addScriptTag: function(scriptURL) {
        var tag = document.createElement('script');
		tag.src = scriptURL;
		tag.async = 1;
        
        tag.onload = function() {
            var script = this.findScriptRecord(scriptURL);
            if(script) {
                script.complete = true;
            }
		}.bind(this);

		tag.onreadystatechange = function () {
            if (this.readyState === 'complete' || this.readyState === 'loaded') {
                tag.onload();
            }
        };

		tag.onerror = function(event) {
			var script = this.findScriptRecord(scriptURL);
            if(script) {
                script.complete = true;
                script.error = Error("Script failed to load: " + scriptURL);
            }
		}.bind(this);
		
		document.body.appendChild(tag);
    }
};
