(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _deku = require('deku');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _elementsIndex = require('./elements/index');

var _libApi = require('./lib/api');

var _libApi2 = _interopRequireDefault(_libApi);

/*
  App + Config
*/

var app = (0, _deku.tree)();

app.set(_config2['default']);

(function callee$0$0() {
    var response, items;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.next = 2;
                return regeneratorRuntime.awrap(_libApi2['default'].getRaw('a23dcfd3022db00dffbc', 'gistfile1.json'));

            case 2:
                response = context$1$0.sent;
                items = response.data.items;

                app.mount((0, _deku.element)(_elementsIndex.Grid, { items: items }));
                (0, _deku.render)(app, document.querySelector('app'));

            case 6:
            case 'end':
                return context$1$0.stop();
        }
    }, null, this);
})();

},{"./config":2,"./elements/index":4,"./lib/api":5,"deku":25}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = {
	stripe_pk: undefined
};
module.exports = exports["default"];

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _deku = require("deku");

var GridItem = {
    render: function render(c) {
        var state = c.state;
        var props = c.props;

        var item = props.item;
        var go = function go() {
            document.location.href = item.url;
        };
        return (0, _deku.element)(
            "div",
            { "class": "proxy", "data-width": "250px", "data-height": "250px", onClick: go },
            (0, _deku.element)(
                "h4",
                null,
                item.name
            ),
            (0, _deku.element)(
                "p",
                null,
                item.description
            )
        );
    }
};

var Grid = {
    afterMount: function afterMount(c, el, setState) {
        var pack, onResize;
        return regeneratorRuntime.async(function afterMount$(context$1$0) {
            while (1) switch (context$1$0.prev = context$1$0.next) {
                case 0:
                    pack = new HorizontalGridPacking(el, {
                        padding: 10,
                        height: 250
                    });
                    onResize = window.addEventListener("resize", function () {
                        pack.width = el.clientWidth;
                        pack.reload();
                    });
                    return context$1$0.abrupt("return", {
                        pack: pack,
                        onResize: onResize
                    });

                case 3:
                case "end":
                    return context$1$0.stop();
            }
        }, null, this);
    },
    beforeUnmount: function beforeUnmount(component, el) {
        var props = component.props;
        var state = component.state;
        var id = component.id;

        state.onResize();
    },
    afterUpdate: function afterUpdate(c, el, setState) {
        var state = c.state;

        state.pack.reload();
    },
    render: function render(c, setState) {
        var props = c.props;

        var items = props.items.map(function (v) {
            return (0, _deku.element)(GridItem, { item: v });
        });
        console.log(items);
        return (0, _deku.element)(
            "div",
            { "class": "grid" },
            items
        );
    }
};

exports["default"] = Grid;
module.exports = exports["default"];

},{"deku":25}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _grid = require('./grid');

var _grid2 = _interopRequireDefault(_grid);

exports['default'] = {
    Grid: _grid2['default']
};
module.exports = exports['default'];

},{"./grid":3}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _this = this;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var Api = {};

/**
 * List Applications
 */

Api.getGist = function (id) {
  return (0, _axios2['default'])({
    method: 'get',
    url: 'https://api.github.com/gists/' + id
  });
};

Api.getRaw = function callee$0$0(id, file) {
  var res;
  return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return regeneratorRuntime.awrap(Api.getGist(id));

      case 2:
        res = context$1$0.sent;
        return context$1$0.abrupt('return', _axios2['default'].get(res.data.files[file].raw_url));

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this);
};
exports['default'] = Api;
module.exports = exports['default'];

},{"axios":6}],6:[function(require,module,exports){
module.exports = require('./lib/axios');
},{"./lib/axios":8}],7:[function(require,module,exports){
'use strict';

/*global ActiveXObject:true*/

var defaults = require('./../defaults');
var utils = require('./../utils');
var buildUrl = require('./../helpers/buildUrl');
var cookies = require('./../helpers/cookies');
var parseHeaders = require('./../helpers/parseHeaders');
var transformData = require('./../helpers/transformData');
var urlIsSameOrigin = require('./../helpers/urlIsSameOrigin');

module.exports = function xhrAdapter(resolve, reject, config) {
  // Transform request data
  var data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Merge headers
  var requestHeaders = utils.merge(
    defaults.headers.common,
    defaults.headers[config.method] || {},
    config.headers || {}
  );

  if (utils.isFormData(data)) {
    delete requestHeaders['Content-Type']; // Let the browser set it
  }

  // Create the request
  var request = new (XMLHttpRequest || ActiveXObject)('Microsoft.XMLHTTP');
  request.open(config.method.toUpperCase(), buildUrl(config.url, config.params), true);

  // Listen for ready state
  request.onreadystatechange = function () {
    if (request && request.readyState === 4) {
      // Prepare the response
      var responseHeaders = parseHeaders(request.getAllResponseHeaders());
      var responseData = ['text', ''].indexOf(config.responseType || '') !== -1 ? request.responseText : request.response;
      var response = {
        data: transformData(
          responseData,
          responseHeaders,
          config.transformResponse
        ),
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config
      };

      // Resolve or reject the Promise based on the status
      (request.status >= 200 && request.status < 300 ?
        resolve :
        reject)(response);

      // Clean up request
      request = null;
    }
  };

  // Add xsrf header
  var xsrfValue = urlIsSameOrigin(config.url) ?
      cookies.read(config.xsrfCookieName || defaults.xsrfCookieName) :
      undefined;
  if (xsrfValue) {
    requestHeaders[config.xsrfHeaderName || defaults.xsrfHeaderName] = xsrfValue;
  }

  // Add headers to the request
  utils.forEach(requestHeaders, function (val, key) {
    // Remove Content-Type if data is undefined
    if (!data && key.toLowerCase() === 'content-type') {
      delete requestHeaders[key];
    }
    // Otherwise add header to the request
    else {
      request.setRequestHeader(key, val);
    }
  });

  // Add withCredentials to request if needed
  if (config.withCredentials) {
    request.withCredentials = true;
  }

  // Add responseType to request if needed
  if (config.responseType) {
    try {
      request.responseType = config.responseType;
    } catch (e) {
      if (request.responseType !== 'json') {
        throw e;
      }
    }
  }

  if (utils.isArrayBuffer(data)) {
    data = new DataView(data);
  }

  // Send the request
  request.send(data);
};

},{"./../defaults":11,"./../helpers/buildUrl":12,"./../helpers/cookies":13,"./../helpers/parseHeaders":15,"./../helpers/transformData":17,"./../helpers/urlIsSameOrigin":18,"./../utils":19}],8:[function(require,module,exports){
'use strict';

var defaults = require('./defaults');
var utils = require('./utils');
var deprecatedMethod = require('./helpers/deprecatedMethod');
var dispatchRequest = require('./core/dispatchRequest');
var InterceptorManager = require('./core/InterceptorManager');

// Polyfill ES6 Promise if needed
(function () {
  // webpack is being used to set es6-promise to the native Promise
  // for the standalone build. It's necessary to make sure polyfill exists.
  var P = require('es6-promise');
  if (P && typeof P.polyfill === 'function') {
    P.polyfill();
  }
})();

var axios = module.exports = function axios(config) {
  config = utils.merge({
    method: 'get',
    headers: {},
    transformRequest: defaults.transformRequest,
    transformResponse: defaults.transformResponse
  }, config);

  // Don't allow overriding defaults.withCredentials
  config.withCredentials = config.withCredentials || defaults.withCredentials;

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  axios.interceptors.request.forEach(function (interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  axios.interceptors.response.forEach(function (interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  // Provide alias for success
  promise.success = function success(fn) {
    deprecatedMethod('success', 'then', 'https://github.com/mzabriskie/axios/blob/master/README.md#response-api');

    promise.then(function(response) {
      fn(response.data, response.status, response.headers, response.config);
    });
    return promise;
  };

  // Provide alias for error
  promise.error = function error(fn) {
    deprecatedMethod('error', 'catch', 'https://github.com/mzabriskie/axios/blob/master/README.md#response-api');

    promise.then(null, function(response) {
      fn(response.data, response.status, response.headers, response.config);
    });
    return promise;
  };

  return promise;
};

// Expose defaults
axios.defaults = defaults;

// Expose all/spread
axios.all = function (promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

// Expose interceptors
axios.interceptors = {
  request: new InterceptorManager(),
  response: new InterceptorManager()
};

// Provide aliases for supported request methods
(function () {
  function createShortMethods() {
    utils.forEach(arguments, function (method) {
      axios[method] = function (url, config) {
        return axios(utils.merge(config || {}, {
          method: method,
          url: url
        }));
      };
    });
  }

  function createShortMethodsWithData() {
    utils.forEach(arguments, function (method) {
      axios[method] = function (url, data, config) {
        return axios(utils.merge(config || {}, {
          method: method,
          url: url,
          data: data
        }));
      };
    });
  }

  createShortMethods('delete', 'get', 'head');
  createShortMethodsWithData('post', 'put', 'patch');
})();

},{"./core/InterceptorManager":9,"./core/dispatchRequest":10,"./defaults":11,"./helpers/deprecatedMethod":14,"./helpers/spread":16,"./utils":19,"es6-promise":20}],9:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function (fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function (id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `remove`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function (fn) {
  utils.forEach(this.handlers, function (h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

},{"./../utils":19}],10:[function(require,module,exports){
(function (process){
'use strict';

/**
 * Dispatch a request to the server using whichever adapter
 * is supported by the current environment.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  return new Promise(function (resolve, reject) {
    try {
      // For browsers use XHR adapter
      if (typeof window !== 'undefined') {
        require('../adapters/xhr')(resolve, reject, config);
      }
      // For node use HTTP adapter
      else if (typeof process !== 'undefined') {
        require('../adapters/http')(resolve, reject, config);
      }
    } catch (e) {
      reject(e);
    }
  });
};


}).call(this,require('_process'))

},{"../adapters/http":7,"../adapters/xhr":7,"_process":21}],11:[function(require,module,exports){
'use strict';

var utils = require('./utils');

var PROTECTION_PREFIX = /^\)\]\}',?\n/;
var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

module.exports = {
  transformRequest: [function (data, headers) {
    if(utils.isFormData(data)) {
      return data;
    }
    if (utils.isArrayBuffer(data)) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isObject(data) && !utils.isFile(data) && !utils.isBlob(data)) {
      // Set application/json if no Content-Type has been specified
      if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
        headers['Content-Type'] = 'application/json;charset=utf-8';
      }
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function (data) {
    if (typeof data === 'string') {
      data = data.replace(PROTECTION_PREFIX, '');
      try {
        data = JSON.parse(data);
      } catch (e) {}
    }
    return data;
  }],

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*'
    },
    patch: utils.merge(DEFAULT_CONTENT_TYPE),
    post: utils.merge(DEFAULT_CONTENT_TYPE),
    put: utils.merge(DEFAULT_CONTENT_TYPE)
  },

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN'
};

},{"./utils":19}],12:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildUrl(url, params) {
  if (!params) {
    return url;
  }

  var parts = [];

  utils.forEach(params, function (val, key) {
    if (val === null || typeof val === 'undefined') {
      return;
    }
    if (!utils.isArray(val)) {
      val = [val];
    }

    utils.forEach(val, function (v) {
      if (utils.isDate(v)) {
        v = v.toISOString();
      }
      else if (utils.isObject(v)) {
        v = JSON.stringify(v);
      }
      parts.push(encode(key) + '=' + encode(v));
    });
  });

  if (parts.length > 0) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + parts.join('&');
  }

  return url;
};

},{"./../utils":19}],13:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

module.exports = {
  write: function write(name, value, expires, path, domain, secure) {
    var cookie = [];
    cookie.push(name + '=' + encodeURIComponent(value));

    if (utils.isNumber(expires)) {
      cookie.push('expires=' + new Date(expires).toGMTString());
    }

    if (utils.isString(path)) {
      cookie.push('path=' + path);
    }

    if (utils.isString(domain)) {
      cookie.push('domain=' + domain);
    }

    if (secure === true) {
      cookie.push('secure');
    }

    document.cookie = cookie.join('; ');
  },

  read: function read(name) {
    var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
    return (match ? decodeURIComponent(match[3]) : null);
  },

  remove: function remove(name) {
    this.write(name, '', Date.now() - 86400000);
  }
};

},{"./../utils":19}],14:[function(require,module,exports){
'use strict';

/**
 * Supply a warning to the developer that a method they are using
 * has been deprecated.
 *
 * @param {string} method The name of the deprecated method
 * @param {string} [instead] The alternate method to use if applicable
 * @param {string} [docs] The documentation URL to get further details
 */
module.exports = function deprecatedMethod(method, instead, docs) {
  try {
    console.warn(
      'DEPRECATED method `' + method + '`.' +
      (instead ? ' Use `' + instead + '` instead.' : '') +
      ' This method will be removed in a future release.');

    if (docs) {
      console.warn('For more information about usage see ' + docs);
    }
  } catch (e) {}
};

},{}],15:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {}, key, val, i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};

},{"./../utils":19}],16:[function(require,module,exports){
'use strict';

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function (arr) {
    callback.apply(null, arr);
  };
};

},{}],17:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  utils.forEach(fns, function (fn) {
    data = fn(data, headers);
  });

  return data;
};

},{"./../utils":19}],18:[function(require,module,exports){
'use strict';

var utils = require('./../utils');
var msie = /(msie|trident)/i.test(navigator.userAgent);
var urlParsingNode = document.createElement('a');
var originUrl;

/**
 * Parse a URL to discover it's components
 *
 * @param {String} url The URL to be parsed
 * @returns {Object}
 */
function urlResolve(url) {
  var href = url;

  if (msie) {
    // IE needs attribute set twice to normalize properties
    urlParsingNode.setAttribute('href', href);
    href = urlParsingNode.href;
  }

  urlParsingNode.setAttribute('href', href);

  // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
  return {
    href: urlParsingNode.href,
    protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
    host: urlParsingNode.host,
    search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
    hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
    hostname: urlParsingNode.hostname,
    port: urlParsingNode.port,
    pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
              urlParsingNode.pathname :
              '/' + urlParsingNode.pathname
  };
}

originUrl = urlResolve(window.location.href);

/**
 * Determine if a URL shares the same origin as the current location
 *
 * @param {String} requestUrl The URL to test
 * @returns {boolean} True if URL shares the same origin, otherwise false
 */
module.exports = function urlIsSameOrigin(requestUrl) {
  var parsed = (utils.isString(requestUrl)) ? urlResolve(requestUrl) : requestUrl;
  return (parsed.protocol === originUrl.protocol &&
        parsed.host === originUrl.host);
};

},{"./../utils":19}],19:[function(require,module,exports){
'use strict';

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return toString.call(val) === '[object FormData]';
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    return ArrayBuffer.isView(val);
  } else {
    return (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array or arguments callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Check if obj is array-like
  var isArrayLike = isArray(obj) || (typeof obj === 'object' && !isNaN(obj.length));

  // Force an array if not already something iterable
  if (typeof obj !== 'object' && !isArrayLike) {
    obj = [obj];
  }

  // Iterate over array values
  if (isArrayLike) {
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  }
  // Iterate over object keys
  else {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/*obj1, obj2, obj3, ...*/) {
  var result = {};
  forEach(arguments, function (obj) {
    forEach(obj, function (val, key) {
      result[key] = val;
    });
  });
  return result;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  forEach: forEach,
  merge: merge,
  trim: trim
};

},{}],20:[function(require,module,exports){
(function (process,global){
/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
 * @version   2.3.0
 */

(function() {
    "use strict";
    function lib$es6$promise$utils$$objectOrFunction(x) {
      return typeof x === 'function' || (typeof x === 'object' && x !== null);
    }

    function lib$es6$promise$utils$$isFunction(x) {
      return typeof x === 'function';
    }

    function lib$es6$promise$utils$$isMaybeThenable(x) {
      return typeof x === 'object' && x !== null;
    }

    var lib$es6$promise$utils$$_isArray;
    if (!Array.isArray) {
      lib$es6$promise$utils$$_isArray = function (x) {
        return Object.prototype.toString.call(x) === '[object Array]';
      };
    } else {
      lib$es6$promise$utils$$_isArray = Array.isArray;
    }

    var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray;
    var lib$es6$promise$asap$$len = 0;
    var lib$es6$promise$asap$$toString = {}.toString;
    var lib$es6$promise$asap$$vertxNext;
    var lib$es6$promise$asap$$customSchedulerFn;

    var lib$es6$promise$asap$$asap = function asap(callback, arg) {
      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback;
      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg;
      lib$es6$promise$asap$$len += 2;
      if (lib$es6$promise$asap$$len === 2) {
        // If len is 2, that means that we need to schedule an async flush.
        // If additional callbacks are queued before the queue is flushed, they
        // will be processed by this flush that we are scheduling.
        if (lib$es6$promise$asap$$customSchedulerFn) {
          lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush);
        } else {
          lib$es6$promise$asap$$scheduleFlush();
        }
      }
    }

    function lib$es6$promise$asap$$setScheduler(scheduleFn) {
      lib$es6$promise$asap$$customSchedulerFn = scheduleFn;
    }

    function lib$es6$promise$asap$$setAsap(asapFn) {
      lib$es6$promise$asap$$asap = asapFn;
    }

    var lib$es6$promise$asap$$browserWindow = (typeof window !== 'undefined') ? window : undefined;
    var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {};
    var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;
    var lib$es6$promise$asap$$isNode = typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

    // test for web worker but not in IE10
    var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
      typeof importScripts !== 'undefined' &&
      typeof MessageChannel !== 'undefined';

    // node
    function lib$es6$promise$asap$$useNextTick() {
      var nextTick = process.nextTick;
      // node version 0.10.x displays a deprecation warning when nextTick is used recursively
      // setImmediate should be used instead instead
      var version = process.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);
      if (Array.isArray(version) && version[1] === '0' && version[2] === '10') {
        nextTick = setImmediate;
      }
      return function() {
        nextTick(lib$es6$promise$asap$$flush);
      };
    }

    // vertx
    function lib$es6$promise$asap$$useVertxTimer() {
      return function() {
        lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush);
      };
    }

    function lib$es6$promise$asap$$useMutationObserver() {
      var iterations = 0;
      var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);
      var node = document.createTextNode('');
      observer.observe(node, { characterData: true });

      return function() {
        node.data = (iterations = ++iterations % 2);
      };
    }

    // web worker
    function lib$es6$promise$asap$$useMessageChannel() {
      var channel = new MessageChannel();
      channel.port1.onmessage = lib$es6$promise$asap$$flush;
      return function () {
        channel.port2.postMessage(0);
      };
    }

    function lib$es6$promise$asap$$useSetTimeout() {
      return function() {
        setTimeout(lib$es6$promise$asap$$flush, 1);
      };
    }

    var lib$es6$promise$asap$$queue = new Array(1000);
    function lib$es6$promise$asap$$flush() {
      for (var i = 0; i < lib$es6$promise$asap$$len; i+=2) {
        var callback = lib$es6$promise$asap$$queue[i];
        var arg = lib$es6$promise$asap$$queue[i+1];

        callback(arg);

        lib$es6$promise$asap$$queue[i] = undefined;
        lib$es6$promise$asap$$queue[i+1] = undefined;
      }

      lib$es6$promise$asap$$len = 0;
    }

    function lib$es6$promise$asap$$attemptVertex() {
      try {
        var r = require;
        var vertx = r('vertx');
        lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
        return lib$es6$promise$asap$$useVertxTimer();
      } catch(e) {
        return lib$es6$promise$asap$$useSetTimeout();
      }
    }

    var lib$es6$promise$asap$$scheduleFlush;
    // Decide what async method to use to triggering processing of queued callbacks:
    if (lib$es6$promise$asap$$isNode) {
      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useNextTick();
    } else if (lib$es6$promise$asap$$BrowserMutationObserver) {
      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMutationObserver();
    } else if (lib$es6$promise$asap$$isWorker) {
      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMessageChannel();
    } else if (lib$es6$promise$asap$$browserWindow === undefined && typeof require === 'function') {
      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$attemptVertex();
    } else {
      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useSetTimeout();
    }

    function lib$es6$promise$$internal$$noop() {}

    var lib$es6$promise$$internal$$PENDING   = void 0;
    var lib$es6$promise$$internal$$FULFILLED = 1;
    var lib$es6$promise$$internal$$REJECTED  = 2;

    var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject();

    function lib$es6$promise$$internal$$selfFullfillment() {
      return new TypeError("You cannot resolve a promise with itself");
    }

    function lib$es6$promise$$internal$$cannotReturnOwn() {
      return new TypeError('A promises callback cannot return that same promise.');
    }

    function lib$es6$promise$$internal$$getThen(promise) {
      try {
        return promise.then;
      } catch(error) {
        lib$es6$promise$$internal$$GET_THEN_ERROR.error = error;
        return lib$es6$promise$$internal$$GET_THEN_ERROR;
      }
    }

    function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
      try {
        then.call(value, fulfillmentHandler, rejectionHandler);
      } catch(e) {
        return e;
      }
    }

    function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
       lib$es6$promise$asap$$asap(function(promise) {
        var sealed = false;
        var error = lib$es6$promise$$internal$$tryThen(then, thenable, function(value) {
          if (sealed) { return; }
          sealed = true;
          if (thenable !== value) {
            lib$es6$promise$$internal$$resolve(promise, value);
          } else {
            lib$es6$promise$$internal$$fulfill(promise, value);
          }
        }, function(reason) {
          if (sealed) { return; }
          sealed = true;

          lib$es6$promise$$internal$$reject(promise, reason);
        }, 'Settle: ' + (promise._label || ' unknown promise'));

        if (!sealed && error) {
          sealed = true;
          lib$es6$promise$$internal$$reject(promise, error);
        }
      }, promise);
    }

    function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) {
      if (thenable._state === lib$es6$promise$$internal$$FULFILLED) {
        lib$es6$promise$$internal$$fulfill(promise, thenable._result);
      } else if (thenable._state === lib$es6$promise$$internal$$REJECTED) {
        lib$es6$promise$$internal$$reject(promise, thenable._result);
      } else {
        lib$es6$promise$$internal$$subscribe(thenable, undefined, function(value) {
          lib$es6$promise$$internal$$resolve(promise, value);
        }, function(reason) {
          lib$es6$promise$$internal$$reject(promise, reason);
        });
      }
    }

    function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable) {
      if (maybeThenable.constructor === promise.constructor) {
        lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable);
      } else {
        var then = lib$es6$promise$$internal$$getThen(maybeThenable);

        if (then === lib$es6$promise$$internal$$GET_THEN_ERROR) {
          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error);
        } else if (then === undefined) {
          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
        } else if (lib$es6$promise$utils$$isFunction(then)) {
          lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then);
        } else {
          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
        }
      }
    }

    function lib$es6$promise$$internal$$resolve(promise, value) {
      if (promise === value) {
        lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFullfillment());
      } else if (lib$es6$promise$utils$$objectOrFunction(value)) {
        lib$es6$promise$$internal$$handleMaybeThenable(promise, value);
      } else {
        lib$es6$promise$$internal$$fulfill(promise, value);
      }
    }

    function lib$es6$promise$$internal$$publishRejection(promise) {
      if (promise._onerror) {
        promise._onerror(promise._result);
      }

      lib$es6$promise$$internal$$publish(promise);
    }

    function lib$es6$promise$$internal$$fulfill(promise, value) {
      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }

      promise._result = value;
      promise._state = lib$es6$promise$$internal$$FULFILLED;

      if (promise._subscribers.length !== 0) {
        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, promise);
      }
    }

    function lib$es6$promise$$internal$$reject(promise, reason) {
      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
      promise._state = lib$es6$promise$$internal$$REJECTED;
      promise._result = reason;

      lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection, promise);
    }

    function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
      var subscribers = parent._subscribers;
      var length = subscribers.length;

      parent._onerror = null;

      subscribers[length] = child;
      subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment;
      subscribers[length + lib$es6$promise$$internal$$REJECTED]  = onRejection;

      if (length === 0 && parent._state) {
        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, parent);
      }
    }

    function lib$es6$promise$$internal$$publish(promise) {
      var subscribers = promise._subscribers;
      var settled = promise._state;

      if (subscribers.length === 0) { return; }

      var child, callback, detail = promise._result;

      for (var i = 0; i < subscribers.length; i += 3) {
        child = subscribers[i];
        callback = subscribers[i + settled];

        if (child) {
          lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail);
        } else {
          callback(detail);
        }
      }

      promise._subscribers.length = 0;
    }

    function lib$es6$promise$$internal$$ErrorObject() {
      this.error = null;
    }

    var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject();

    function lib$es6$promise$$internal$$tryCatch(callback, detail) {
      try {
        return callback(detail);
      } catch(e) {
        lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e;
        return lib$es6$promise$$internal$$TRY_CATCH_ERROR;
      }
    }

    function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
      var hasCallback = lib$es6$promise$utils$$isFunction(callback),
          value, error, succeeded, failed;

      if (hasCallback) {
        value = lib$es6$promise$$internal$$tryCatch(callback, detail);

        if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) {
          failed = true;
          error = value.error;
          value = null;
        } else {
          succeeded = true;
        }

        if (promise === value) {
          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn());
          return;
        }

      } else {
        value = detail;
        succeeded = true;
      }

      if (promise._state !== lib$es6$promise$$internal$$PENDING) {
        // noop
      } else if (hasCallback && succeeded) {
        lib$es6$promise$$internal$$resolve(promise, value);
      } else if (failed) {
        lib$es6$promise$$internal$$reject(promise, error);
      } else if (settled === lib$es6$promise$$internal$$FULFILLED) {
        lib$es6$promise$$internal$$fulfill(promise, value);
      } else if (settled === lib$es6$promise$$internal$$REJECTED) {
        lib$es6$promise$$internal$$reject(promise, value);
      }
    }

    function lib$es6$promise$$internal$$initializePromise(promise, resolver) {
      try {
        resolver(function resolvePromise(value){
          lib$es6$promise$$internal$$resolve(promise, value);
        }, function rejectPromise(reason) {
          lib$es6$promise$$internal$$reject(promise, reason);
        });
      } catch(e) {
        lib$es6$promise$$internal$$reject(promise, e);
      }
    }

    function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
      var enumerator = this;

      enumerator._instanceConstructor = Constructor;
      enumerator.promise = new Constructor(lib$es6$promise$$internal$$noop);

      if (enumerator._validateInput(input)) {
        enumerator._input     = input;
        enumerator.length     = input.length;
        enumerator._remaining = input.length;

        enumerator._init();

        if (enumerator.length === 0) {
          lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result);
        } else {
          enumerator.length = enumerator.length || 0;
          enumerator._enumerate();
          if (enumerator._remaining === 0) {
            lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result);
          }
        }
      } else {
        lib$es6$promise$$internal$$reject(enumerator.promise, enumerator._validationError());
      }
    }

    lib$es6$promise$enumerator$$Enumerator.prototype._validateInput = function(input) {
      return lib$es6$promise$utils$$isArray(input);
    };

    lib$es6$promise$enumerator$$Enumerator.prototype._validationError = function() {
      return new Error('Array Methods must be provided an Array');
    };

    lib$es6$promise$enumerator$$Enumerator.prototype._init = function() {
      this._result = new Array(this.length);
    };

    var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;

    lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function() {
      var enumerator = this;

      var length  = enumerator.length;
      var promise = enumerator.promise;
      var input   = enumerator._input;

      for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
        enumerator._eachEntry(input[i], i);
      }
    };

    lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
      var enumerator = this;
      var c = enumerator._instanceConstructor;

      if (lib$es6$promise$utils$$isMaybeThenable(entry)) {
        if (entry.constructor === c && entry._state !== lib$es6$promise$$internal$$PENDING) {
          entry._onerror = null;
          enumerator._settledAt(entry._state, i, entry._result);
        } else {
          enumerator._willSettleAt(c.resolve(entry), i);
        }
      } else {
        enumerator._remaining--;
        enumerator._result[i] = entry;
      }
    };

    lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
      var enumerator = this;
      var promise = enumerator.promise;

      if (promise._state === lib$es6$promise$$internal$$PENDING) {
        enumerator._remaining--;

        if (state === lib$es6$promise$$internal$$REJECTED) {
          lib$es6$promise$$internal$$reject(promise, value);
        } else {
          enumerator._result[i] = value;
        }
      }

      if (enumerator._remaining === 0) {
        lib$es6$promise$$internal$$fulfill(promise, enumerator._result);
      }
    };

    lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
      var enumerator = this;

      lib$es6$promise$$internal$$subscribe(promise, undefined, function(value) {
        enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value);
      }, function(reason) {
        enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason);
      });
    };
    function lib$es6$promise$promise$all$$all(entries) {
      return new lib$es6$promise$enumerator$$default(this, entries).promise;
    }
    var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;
    function lib$es6$promise$promise$race$$race(entries) {
      /*jshint validthis:true */
      var Constructor = this;

      var promise = new Constructor(lib$es6$promise$$internal$$noop);

      if (!lib$es6$promise$utils$$isArray(entries)) {
        lib$es6$promise$$internal$$reject(promise, new TypeError('You must pass an array to race.'));
        return promise;
      }

      var length = entries.length;

      function onFulfillment(value) {
        lib$es6$promise$$internal$$resolve(promise, value);
      }

      function onRejection(reason) {
        lib$es6$promise$$internal$$reject(promise, reason);
      }

      for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
        lib$es6$promise$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection);
      }

      return promise;
    }
    var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race;
    function lib$es6$promise$promise$resolve$$resolve(object) {
      /*jshint validthis:true */
      var Constructor = this;

      if (object && typeof object === 'object' && object.constructor === Constructor) {
        return object;
      }

      var promise = new Constructor(lib$es6$promise$$internal$$noop);
      lib$es6$promise$$internal$$resolve(promise, object);
      return promise;
    }
    var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve;
    function lib$es6$promise$promise$reject$$reject(reason) {
      /*jshint validthis:true */
      var Constructor = this;
      var promise = new Constructor(lib$es6$promise$$internal$$noop);
      lib$es6$promise$$internal$$reject(promise, reason);
      return promise;
    }
    var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject;

    var lib$es6$promise$promise$$counter = 0;

    function lib$es6$promise$promise$$needsResolver() {
      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
    }

    function lib$es6$promise$promise$$needsNew() {
      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
    }

    var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise;
    /**
      Promise objects represent the eventual result of an asynchronous operation. The
      primary way of interacting with a promise is through its `then` method, which
      registers callbacks to receive either a promise's eventual value or the reason
      why the promise cannot be fulfilled.

      Terminology
      -----------

      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
      - `thenable` is an object or function that defines a `then` method.
      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
      - `exception` is a value that is thrown using the throw statement.
      - `reason` is a value that indicates why a promise was rejected.
      - `settled` the final resting state of a promise, fulfilled or rejected.

      A promise can be in one of three states: pending, fulfilled, or rejected.

      Promises that are fulfilled have a fulfillment value and are in the fulfilled
      state.  Promises that are rejected have a rejection reason and are in the
      rejected state.  A fulfillment value is never a thenable.

      Promises can also be said to *resolve* a value.  If this value is also a
      promise, then the original promise's settled state will match the value's
      settled state.  So a promise that *resolves* a promise that rejects will
      itself reject, and a promise that *resolves* a promise that fulfills will
      itself fulfill.


      Basic Usage:
      ------------

      ```js
      var promise = new Promise(function(resolve, reject) {
        // on success
        resolve(value);

        // on failure
        reject(reason);
      });

      promise.then(function(value) {
        // on fulfillment
      }, function(reason) {
        // on rejection
      });
      ```

      Advanced Usage:
      ---------------

      Promises shine when abstracting away asynchronous interactions such as
      `XMLHttpRequest`s.

      ```js
      function getJSON(url) {
        return new Promise(function(resolve, reject){
          var xhr = new XMLHttpRequest();

          xhr.open('GET', url);
          xhr.onreadystatechange = handler;
          xhr.responseType = 'json';
          xhr.setRequestHeader('Accept', 'application/json');
          xhr.send();

          function handler() {
            if (this.readyState === this.DONE) {
              if (this.status === 200) {
                resolve(this.response);
              } else {
                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
              }
            }
          };
        });
      }

      getJSON('/posts.json').then(function(json) {
        // on fulfillment
      }, function(reason) {
        // on rejection
      });
      ```

      Unlike callbacks, promises are great composable primitives.

      ```js
      Promise.all([
        getJSON('/posts'),
        getJSON('/comments')
      ]).then(function(values){
        values[0] // => postsJSON
        values[1] // => commentsJSON

        return values;
      });
      ```

      @class Promise
      @param {function} resolver
      Useful for tooling.
      @constructor
    */
    function lib$es6$promise$promise$$Promise(resolver) {
      this._id = lib$es6$promise$promise$$counter++;
      this._state = undefined;
      this._result = undefined;
      this._subscribers = [];

      if (lib$es6$promise$$internal$$noop !== resolver) {
        if (!lib$es6$promise$utils$$isFunction(resolver)) {
          lib$es6$promise$promise$$needsResolver();
        }

        if (!(this instanceof lib$es6$promise$promise$$Promise)) {
          lib$es6$promise$promise$$needsNew();
        }

        lib$es6$promise$$internal$$initializePromise(this, resolver);
      }
    }

    lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default;
    lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default;
    lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default;
    lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default;
    lib$es6$promise$promise$$Promise._setScheduler = lib$es6$promise$asap$$setScheduler;
    lib$es6$promise$promise$$Promise._setAsap = lib$es6$promise$asap$$setAsap;
    lib$es6$promise$promise$$Promise._asap = lib$es6$promise$asap$$asap;

    lib$es6$promise$promise$$Promise.prototype = {
      constructor: lib$es6$promise$promise$$Promise,

    /**
      The primary way of interacting with a promise is through its `then` method,
      which registers callbacks to receive either a promise's eventual value or the
      reason why the promise cannot be fulfilled.

      ```js
      findUser().then(function(user){
        // user is available
      }, function(reason){
        // user is unavailable, and you are given the reason why
      });
      ```

      Chaining
      --------

      The return value of `then` is itself a promise.  This second, 'downstream'
      promise is resolved with the return value of the first promise's fulfillment
      or rejection handler, or rejected if the handler throws an exception.

      ```js
      findUser().then(function (user) {
        return user.name;
      }, function (reason) {
        return 'default name';
      }).then(function (userName) {
        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
        // will be `'default name'`
      });

      findUser().then(function (user) {
        throw new Error('Found user, but still unhappy');
      }, function (reason) {
        throw new Error('`findUser` rejected and we're unhappy');
      }).then(function (value) {
        // never reached
      }, function (reason) {
        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
      });
      ```
      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.

      ```js
      findUser().then(function (user) {
        throw new PedagogicalException('Upstream error');
      }).then(function (value) {
        // never reached
      }).then(function (value) {
        // never reached
      }, function (reason) {
        // The `PedgagocialException` is propagated all the way down to here
      });
      ```

      Assimilation
      ------------

      Sometimes the value you want to propagate to a downstream promise can only be
      retrieved asynchronously. This can be achieved by returning a promise in the
      fulfillment or rejection handler. The downstream promise will then be pending
      until the returned promise is settled. This is called *assimilation*.

      ```js
      findUser().then(function (user) {
        return findCommentsByAuthor(user);
      }).then(function (comments) {
        // The user's comments are now available
      });
      ```

      If the assimliated promise rejects, then the downstream promise will also reject.

      ```js
      findUser().then(function (user) {
        return findCommentsByAuthor(user);
      }).then(function (comments) {
        // If `findCommentsByAuthor` fulfills, we'll have the value here
      }, function (reason) {
        // If `findCommentsByAuthor` rejects, we'll have the reason here
      });
      ```

      Simple Example
      --------------

      Synchronous Example

      ```javascript
      var result;

      try {
        result = findResult();
        // success
      } catch(reason) {
        // failure
      }
      ```

      Errback Example

      ```js
      findResult(function(result, err){
        if (err) {
          // failure
        } else {
          // success
        }
      });
      ```

      Promise Example;

      ```javascript
      findResult().then(function(result){
        // success
      }, function(reason){
        // failure
      });
      ```

      Advanced Example
      --------------

      Synchronous Example

      ```javascript
      var author, books;

      try {
        author = findAuthor();
        books  = findBooksByAuthor(author);
        // success
      } catch(reason) {
        // failure
      }
      ```

      Errback Example

      ```js

      function foundBooks(books) {

      }

      function failure(reason) {

      }

      findAuthor(function(author, err){
        if (err) {
          failure(err);
          // failure
        } else {
          try {
            findBoooksByAuthor(author, function(books, err) {
              if (err) {
                failure(err);
              } else {
                try {
                  foundBooks(books);
                } catch(reason) {
                  failure(reason);
                }
              }
            });
          } catch(error) {
            failure(err);
          }
          // success
        }
      });
      ```

      Promise Example;

      ```javascript
      findAuthor().
        then(findBooksByAuthor).
        then(function(books){
          // found books
      }).catch(function(reason){
        // something went wrong
      });
      ```

      @method then
      @param {Function} onFulfilled
      @param {Function} onRejected
      Useful for tooling.
      @return {Promise}
    */
      then: function(onFulfillment, onRejection) {
        var parent = this;
        var state = parent._state;

        if (state === lib$es6$promise$$internal$$FULFILLED && !onFulfillment || state === lib$es6$promise$$internal$$REJECTED && !onRejection) {
          return this;
        }

        var child = new this.constructor(lib$es6$promise$$internal$$noop);
        var result = parent._result;

        if (state) {
          var callback = arguments[state - 1];
          lib$es6$promise$asap$$asap(function(){
            lib$es6$promise$$internal$$invokeCallback(state, child, callback, result);
          });
        } else {
          lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection);
        }

        return child;
      },

    /**
      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
      as the catch block of a try/catch statement.

      ```js
      function findAuthor(){
        throw new Error('couldn't find that author');
      }

      // synchronous
      try {
        findAuthor();
      } catch(reason) {
        // something went wrong
      }

      // async with promises
      findAuthor().catch(function(reason){
        // something went wrong
      });
      ```

      @method catch
      @param {Function} onRejection
      Useful for tooling.
      @return {Promise}
    */
      'catch': function(onRejection) {
        return this.then(null, onRejection);
      }
    };
    function lib$es6$promise$polyfill$$polyfill() {
      var local;

      if (typeof global !== 'undefined') {
          local = global;
      } else if (typeof self !== 'undefined') {
          local = self;
      } else {
          try {
              local = Function('return this')();
          } catch (e) {
              throw new Error('polyfill failed because global object is unavailable in this environment');
          }
      }

      var P = local.Promise;

      if (P && Object.prototype.toString.call(P.resolve()) === '[object Promise]' && !P.cast) {
        return;
      }

      local.Promise = lib$es6$promise$promise$$default;
    }
    var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill;

    var lib$es6$promise$umd$$ES6Promise = {
      'Promise': lib$es6$promise$promise$$default,
      'polyfill': lib$es6$promise$polyfill$$default
    };

    /* global define:true module:true window: true */
    if (typeof define === 'function' && define['amd']) {
      define(function() { return lib$es6$promise$umd$$ES6Promise; });
    } else if (typeof module !== 'undefined' && module['exports']) {
      module['exports'] = lib$es6$promise$umd$$ES6Promise;
    } else if (typeof this !== 'undefined') {
      this['ES6Promise'] = lib$es6$promise$umd$$ES6Promise;
    }

    lib$es6$promise$polyfill$$default();
}).call(this);


}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"_process":21}],21:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            currentQueue[queueIndex].run();
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],22:[function(require,module,exports){

/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],23:[function(require,module,exports){
/**
 * Module dependencies.
 */

var Emitter = require('component-emitter')

/**
 * Expose `scene`.
 */

module.exports = Application

/**
 * Create a new `Application`.
 *
 * @param {Object} element Optional initial element
 */

function Application (element) {
  if (!(this instanceof Application)) return new Application(element)
  this.options = {}
  this.sources = {}
  this.element = element
}

/**
 * Mixin `Emitter`.
 */

Emitter(Application.prototype)

/**
 * Add a plugin
 *
 * @param {Function} plugin
 */

Application.prototype.use = function (plugin) {
  plugin(this)
  return this
}

/**
 * Set an option
 *
 * @param {String} name
 */

Application.prototype.option = function (name, val) {
  this.options[name] = val
  return this
}

/**
 * Set value used somewhere in the IO network.
 */

Application.prototype.set = function (name, data) {
  this.sources[name] = data
  this.emit('source', name, data)
  return this
}

/**
 * Mount a virtual element.
 *
 * @param {VirtualElement} element
 */

Application.prototype.mount = function (element) {
  this.element = element
  this.emit('mount', element)
  return this
}

/**
 * Remove the world. Unmount everything.
 */

Application.prototype.unmount = function () {
  if (!this.element) return
  this.element = null
  this.emit('unmount')
  return this
}

},{"component-emitter":22}],24:[function(require,module,exports){
/**
 * All of the events can bind to
 */

module.exports = {
  onBlur: 'blur',
  onChange: 'change',
  onClick: 'click',
  onContextMenu: 'contextmenu',
  onCopy: 'copy',
  onCut: 'cut',
  onDoubleClick: 'dblclick',
  onDrag: 'drag',
  onDragEnd: 'dragend',
  onDragEnter: 'dragenter',
  onDragExit: 'dragexit',
  onDragLeave: 'dragleave',
  onDragOver: 'dragover',
  onDragStart: 'dragstart',
  onDrop: 'drop',
  onFocus: 'focus',
  onInput: 'input',
  onKeyDown: 'keydown',
  onKeyPress: 'keypress',
  onKeyUp: 'keyup',
  onMouseDown: 'mousedown',
  onMouseEnter: 'mouseenter',
  onMouseLeave: 'mouseleave',
  onMouseMove: 'mousemove',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover',
  onMouseUp: 'mouseup',
  onPaste: 'paste',
  onScroll: 'scroll',
  onSubmit: 'submit',
  onTouchCancel: 'touchcancel',
  onTouchEnd: 'touchend',
  onTouchMove: 'touchmove',
  onTouchStart: 'touchstart',
  onWheel: 'wheel'
}

},{}],25:[function(require,module,exports){
/**
 * Create the application.
 */

exports.tree =
exports.scene =
exports.deku = require('./application')

/**
 * Render scenes to the DOM.
 */

if (typeof document !== 'undefined') {
  exports.render = require('./render')
}

/**
 * Render scenes to a string
 */

exports.renderString = require('./stringify')

/**
 * Create virtual elements.
 */

exports.element =
exports.createElement =
exports.dom = require('./virtual')

},{"./application":23,"./render":26,"./stringify":27,"./virtual":30}],26:[function(require,module,exports){
/**
 * Dependencies.
 */

var raf = require('component-raf')
var Pool = require('dom-pool')
var walk = require('dom-walk')
var isDom = require('is-dom')
var uid = require('get-uid')
var keypath = require('object-path')
var type = require('component-type')
var utils = require('./utils')
var svg = require('./svg')
var events = require('./events')
var defaults = utils.defaults
var forEach = require('fast.js/forEach')
var assign = require('fast.js/object/assign')
var reduce = require('fast.js/reduce')
var isPromise = require('is-promise')

/**
 * These elements won't be pooled
 */

var avoidPooling = ['input', 'textarea'];

/**
 * Expose `dom`.
 */

module.exports = render

/**
 * Render an app to the DOM
 *
 * @param {Application} app
 * @param {HTMLElement} container
 * @param {Object} opts
 *
 * @return {Object}
 */

function render (app, container, opts) {
  var frameId
  var isRendering
  var rootId = 'root'
  var currentElement
  var currentNativeElement
  var connections = {}
  var components = {}
  var entities = {}
  var pools = {}
  var handlers = {}
  var mountQueue = []
  var children = {}
  children[rootId] = {}

  if (!isDom(container)) {
    throw new Error('Container element must be a DOM element')
  }

  /**
   * Rendering options. Batching is only ever really disabled
   * when running tests, and pooling can be disabled if the user
   * is doing something stupid with the DOM in their components.
   */

  var options = defaults(assign({}, app.options || {}, opts || {}), {
    pooling: true,
    batching: true,
    validateProps: false
  })

  /**
   * Listen to DOM events
   */

  addNativeEventListeners()

  /**
   * Watch for changes to the app so that we can update
   * the DOM as needed.
   */

  app.on('unmount', onunmount)
  app.on('mount', onmount)
  app.on('source', onupdate)

  /**
   * If the app has already mounted an element, we can just
   * render that straight away.
   */

  if (app.element) render()

  /**
   * Teardown the DOM rendering so that it stops
   * rendering and everything can be garbage collected.
   */

  function teardown () {
    removeNativeEventListeners()
    removeNativeElement()
    app.off('unmount', onunmount)
    app.off('mount', onmount)
    app.off('source', onupdate)
  }

  /**
   * Swap the current rendered node with a new one that is rendered
   * from the new virtual element mounted on the app.
   *
   * @param {VirtualElement} element
   */

  function onmount () {
    invalidate()
  }

  /**
   * If the app unmounts an element, we should clear out the current
   * rendered element. This will remove all the entities.
   */

  function onunmount () {
    removeNativeElement()
    currentElement = null
  }

  /**
   * Update all components that are bound to the source
   *
   * @param {String} name
   * @param {*} data
   */

  function onupdate (name, data) {
    if (!connections[name]) return;
    connections[name].forEach(function(update) {
      update(data)
    })
  }

  /**
   * Render and mount a component to the native dom.
   *
   * @param {Entity} entity
   * @return {HTMLElement}
   */

  function mountEntity (entity) {
    register(entity)
    setSources(entity)
    children[entity.id] = {}
    entities[entity.id] = entity

    // commit initial state and props.
    commit(entity)

    // callback before mounting.
    trigger('beforeMount', entity, [entity.context])
    trigger('beforeRender', entity, [entity.context])

    // render virtual element.
    var virtualElement = renderEntity(entity)
    // create native element.
    var nativeElement = toNative(entity.id, '0', virtualElement)

    entity.virtualElement = virtualElement
    entity.nativeElement = nativeElement

    // Fire afterRender and afterMount hooks at the end
    // of the render cycle
    mountQueue.push(entity.id)

    return nativeElement
  }

  /**
   * Remove a component from the native dom.
   *
   * @param {Entity} entity
   */

  function unmountEntity (entityId) {
    var entity = entities[entityId]
    if (!entity) return
    trigger('beforeUnmount', entity, [entity.context, entity.nativeElement])
    unmountChildren(entityId)
    removeAllEvents(entityId)
    var componentEntities = components[entityId].entities;
    delete componentEntities[entityId]
    delete components[entityId]
    delete entities[entityId]
    delete children[entityId]
  }

  /**
   * Render the entity and make sure it returns a node
   *
   * @param {Entity} entity
   *
   * @return {VirtualTree}
   */

  function renderEntity (entity) {
    var component = entity.component
    if (!component.render) throw new Error('Component needs a render function')
    var result = component.render(entity.context, setState(entity))
    if (!result) throw new Error('Render function must return an element.')
    return result
  }

  /**
   * Whenever setState or setProps is called, we mark the entity
   * as dirty in the renderer. This lets us optimize the re-rendering
   * and skip components that definitely haven't changed.
   *
   * @param {Entity} entity
   *
   * @return {Function} A curried function for updating the state of an entity
   */

  function setState (entity) {
    return function (nextState) {
      updateEntityStateAsync(entity, nextState)
    }
  }

  /**
   * Tell the app it's dirty and needs to re-render. If batching is disabled
   * we can just trigger a render immediately, otherwise we'll wait until
   * the next available frame.
   */

  function invalidate () {
    if (!options.batching) {
      if (!isRendering) render()
    } else {
      if (!frameId) frameId = raf(render)
    }
  }

  /**
   * Update the DOM. If the update fails we stop the loop
   * so we don't get errors on every frame.
   *
   * @api public
   */

  function render () {
    // If this is called synchronously we need to
    // cancel any pending future updates
    clearFrame()

    // If the rendering from the previous frame is still going,
    // we'll just wait until the next frame. Ideally renders should
    // not take over 16ms to stay within a single frame, but this should
    // catch it if it does.
    if (isRendering) {
      frameId = raf(render)
      return
    } else {
      isRendering = true
    }

    // 1. If there isn't a native element rendered for the current mounted element
    // then we need to create it from scratch.
    // 2. If a new element has been mounted, we should diff them.
    // 3. We should update check all child components for changes.
    if (!currentNativeElement) {
      currentElement = app.element
      currentNativeElement = toNative(rootId, '0', currentElement)
      if (container.children.length > 0) {
        console.info('deku: The container element is not empty. These elements will be removed. Read more: http://cl.ly/b0Sr')
      }
      if (container === document.body) {
        console.warn('deku: Using document.body is allowed but it can cause some issues. Read more: http://cl.ly/b0SC')
      }
      removeAllChildren(container);
      container.appendChild(currentNativeElement)
    } else if (currentElement !== app.element) {
      currentNativeElement = patch(rootId, currentElement, app.element, currentNativeElement)
      currentElement = app.element
      updateChildren(rootId)
    } else {
      updateChildren(rootId)
    }

    // Call mount events on all new entities
    flushMountQueue()

    // Allow rendering again.
    isRendering = false
  }

  /**
   * Call hooks for all new entities that have been created in
   * the last render from the bottom up.
   */

  function flushMountQueue () {
    var entityId
    while (entityId = mountQueue.pop()) {
      var entity = entities[entityId]
      trigger('afterRender', entity, [entity.context, entity.nativeElement])
      triggerUpdate('afterMount', entity, [entity.context, entity.nativeElement, setState(entity)])
    }
  }

  /**
   * Clear the current scheduled frame
   */

  function clearFrame () {
    if (!frameId) return
    raf.cancel(frameId)
    frameId = 0
  }

  /**
   * Update a component.
   *
   * The entity is just the data object for a component instance.
   *
   * @param {String} id Component instance id.
   */

  function updateEntity (entityId) {
    var entity = entities[entityId]
    setSources(entity)

    if (!shouldUpdate(entity)) return updateChildren(entityId)

    var currentTree = entity.virtualElement
    var nextProps = entity.pendingProps
    var nextState = entity.pendingState
    var previousState = entity.context.state
    var previousProps = entity.context.props

    // hook before rendering. could modify state just before the render occurs.
    trigger('beforeUpdate', entity, [entity.context, nextProps, nextState])
    trigger('beforeRender', entity, [entity.context])

    // commit state and props.
    commit(entity)

    // re-render.
    var nextTree = renderEntity(entity)

    // if the tree is the same we can just skip this component
    // but we should still check the children to see if they're dirty.
    // This allows us to memoize the render function of components.
    if (nextTree === currentTree) return updateChildren(entityId)

    // apply new virtual tree to native dom.
    entity.nativeElement = patch(entityId, currentTree, nextTree, entity.nativeElement)
    entity.virtualElement = nextTree
    updateChildren(entityId)

    // trigger render hook
    trigger('afterRender', entity, [entity.context, entity.nativeElement])

    // trigger afterUpdate after all children have updated.
    triggerUpdate('afterUpdate', entity, [entity.context, previousProps, previousState])
  }

  /**
   * Update all the children of an entity.
   *
   * @param {String} id Component instance id.
   */

  function updateChildren (entityId) {
    forEach(children[entityId], function (childId) {
      updateEntity(childId)
    })
  }

  /**
   * Remove all of the child entities of an entity
   *
   * @param {Entity} entity
   */

  function unmountChildren (entityId) {
    forEach(children[entityId], function (childId) {
      unmountEntity(childId)
    })
  }

  /**
   * Remove the root element. If this is called synchronously we need to
   * cancel any pending future updates.
   */

  function removeNativeElement () {
    clearFrame()
    removeElement(rootId, '0', currentNativeElement)
    currentNativeElement = null
  }

  /**
   * Create a native element from a virtual element.
   *
   * @param {String} entityId
   * @param {String} path
   * @param {Object} vnode
   *
   * @return {HTMLDocumentFragment}
   */

  function toNative (entityId, path, vnode) {
    switch (vnode.type) {
      case 'text': return toNativeText(vnode)
      case 'element': return toNativeElement(entityId, path, vnode)
      case 'component': return toNativeComponent(entityId, path, vnode)
    }
  }

  /**
   * Create a native text element from a virtual element.
   *
   * @param {Object} vnode
   */

  function toNativeText (vnode) {
    return document.createTextNode(vnode.data)
  }

  /**
   * Create a native element from a virtual element.
   */

  function toNativeElement (entityId, path, vnode) {
    var attributes = vnode.attributes
    var children = vnode.children
    var tagName = vnode.tagName
    var el

    // create element either from pool or fresh.
    if (!options.pooling || !canPool(tagName)) {
      if (svg.isElement(tagName)) {
        el = document.createElementNS(svg.namespace, tagName)
      } else {
        el = document.createElement(tagName)
      }
    } else {
      var pool = getPool(tagName)
      el = cleanup(pool.pop())
      if (el.parentNode) el.parentNode.removeChild(el)
    }

    // set attributes.
    forEach(attributes, function (value, name) {
      setAttribute(entityId, path, el, name, value)
    })

    // store keys on the native element for fast event handling.
    el.__entity__ = entityId
    el.__path__ = path

    // add children.
    forEach(children, function (child, i) {
      var childEl = toNative(entityId, path + '.' + i, child)
      if (!childEl.parentNode) el.appendChild(childEl)
    })

    return el
  }

  /**
   * Create a native element from a component.
   */

  function toNativeComponent (entityId, path, vnode) {
    var child = new Entity(vnode.component, vnode.props, entityId)
    children[entityId][path] = child.id
    return mountEntity(child)
  }

  /**
   * Patch an element with the diff from two trees.
   */

  function patch (entityId, prev, next, el) {
    return diffNode('0', entityId, prev, next, el)
  }

  /**
   * Create a diff between two trees of nodes.
   */

  function diffNode (path, entityId, prev, next, el) {
    // Type changed. This could be from element->text, text->ComponentA,
    // ComponentA->ComponentB etc. But NOT div->span. These are the same type
    // (ElementNode) but different tag name.
    if (prev.type !== next.type) return replaceElement(entityId, path, el, next)

    switch (next.type) {
      case 'text': return diffText(prev, next, el)
      case 'element': return diffElement(path, entityId, prev, next, el)
      case 'component': return diffComponent(path, entityId, prev, next, el)
    }
  }

  /**
   * Diff two text nodes and update the element.
   */

  function diffText (previous, current, el) {
    if (current.data !== previous.data) el.data = current.data
    return el
  }

  /**
   * Diff the children of an ElementNode.
   */

  function diffChildren (path, entityId, prev, next, el) {
    var positions = []
    var hasKeys = false
    var childNodes = Array.prototype.slice.apply(el.childNodes)
    var leftKeys = reduce(prev.children, keyMapReducer, {})
    var rightKeys = reduce(next.children, keyMapReducer, {})
    var currentChildren = assign({}, children[entityId])

    function keyMapReducer (acc, child) {
      if (child.key != null) {
        acc[child.key] = child
        hasKeys = true
      }
      return acc
    }

    // Diff all of the nodes that have keys. This lets us re-used elements
    // instead of overriding them and lets us move them around.
    if (hasKeys) {

      // Removals
      forEach(leftKeys, function (leftNode, key) {
        if (rightKeys[key] == null) {
          var leftPath = path + '.' + leftNode.index
          removeElement(
            entityId,
            leftPath,
            childNodes[leftNode.index]
          )
        }
      })

      // Update nodes
      forEach(rightKeys, function (rightNode, key) {
        var leftNode = leftKeys[key]

        // We only want updates for now
        if (leftNode == null) return

        var leftPath = path + '.' + leftNode.index

        // Updated
        positions[rightNode.index] = diffNode(
          leftPath,
          entityId,
          leftNode,
          rightNode,
          childNodes[leftNode.index]
        )
      })

      // Update the positions of all child components and event handlers
      forEach(rightKeys, function (rightNode, key) {
        var leftNode = leftKeys[key]

        // We just want elements that have moved around
        if (leftNode == null || leftNode.index === rightNode.index) return

        var rightPath = path + '.' + rightNode.index
        var leftPath = path + '.' + leftNode.index

        // Update all the child component path positions to match
        // the latest positions if they've changed. This is a bit hacky.
        forEach(currentChildren, function (childId, childPath) {
          if (leftPath === childPath) {
            delete children[entityId][childPath]
            children[entityId][rightPath] = childId
          }
        })
      })

      // Now add all of the new nodes last in case their path
      // would have conflicted with one of the previous paths.
      forEach(rightKeys, function (rightNode, key) {
        var rightPath = path + '.' + rightNode.index
        if (leftKeys[key] == null) {
          positions[rightNode.index] = toNative(
            entityId,
            rightPath,
            rightNode
          )
        }
      })

    } else {
      var maxLength = Math.max(prev.children.length, next.children.length)

      // Now diff all of the nodes that don't have keys
      for (var i = 0; i < maxLength; i++) {
        var leftNode = prev.children[i]
        var rightNode = next.children[i]

        // Removals
        if (rightNode == null) {
          removeElement(
            entityId,
            path + '.' + leftNode.index,
            childNodes[leftNode.index]
          )
        }

        // New Node
        if (leftNode == null) {
          positions[rightNode.index] = toNative(
            entityId,
            path + '.' + rightNode.index,
            rightNode
          )
        }

        // Updated
        if (leftNode && rightNode) {
          positions[leftNode.index] = diffNode(
            path + '.' + leftNode.index,
            entityId,
            leftNode,
            rightNode,
            childNodes[leftNode.index]
          )
        }
      }
    }

    // Reposition all the elements
    forEach(positions, function (childEl, newPosition) {
      var target = el.childNodes[newPosition]
      if (childEl !== target) {
        if (target) {
          el.insertBefore(childEl, target)
        } else {
          el.appendChild(childEl)
        }
      }
    })
  }

  /**
   * Diff the attributes and add/remove them.
   */

  function diffAttributes (prev, next, el, entityId, path) {
    var nextAttrs = next.attributes
    var prevAttrs = prev.attributes

    // add new attrs
    forEach(nextAttrs, function (value, name) {
      if (events[name] || !(name in prevAttrs) || prevAttrs[name] !== value) {
        setAttribute(entityId, path, el, name, value)
      }
    })

    // remove old attrs
    forEach(prevAttrs, function (value, name) {
      if (!(name in nextAttrs)) {
        removeAttribute(entityId, path, el, name)
      }
    })
  }

  /**
   * Update a component with the props from the next node. If
   * the component type has changed, we'll just remove the old one
   * and replace it with the new component.
   */

  function diffComponent (path, entityId, prev, next, el) {
    if (next.component !== prev.component) {
      return replaceElement(entityId, path, el, next)
    } else {
      var targetId = children[entityId][path]

      // This is a hack for now
      if (targetId) {
        updateEntityProps(targetId, next.props)
      }

      return el
    }
  }

  /**
   * Diff two element nodes.
   */

  function diffElement (path, entityId, prev, next, el) {
    if (next.tagName !== prev.tagName) return replaceElement(entityId, path, el, next)
    diffAttributes(prev, next, el, entityId, path)
    diffChildren(path, entityId, prev, next, el)
    return el
  }

  /**
   * Removes an element from the DOM and unmounts and components
   * that are within that branch
   *
   * side effects:
   *   - removes element from the DOM
   *   - removes internal references
   *
   * @param {String} entityId
   * @param {String} path
   * @param {HTMLElement} el
   */

  function removeElement (entityId, path, el) {
    var childrenByPath = children[entityId]
    var childId = childrenByPath[path]
    var entityHandlers = handlers[entityId] || {}
    var removals = []

    // If the path points to a component we should use that
    // components element instead, because it might have moved it.
    if (childId) {
      var child = entities[childId]
      el = child.nativeElement
      unmountEntity(childId)
      removals.push(path)
    } else {

      // Just remove the text node
      if (!isElement(el)) return el.parentNode.removeChild(el)

      // Then we need to find any components within this
      // branch and unmount them.
      forEach(childrenByPath, function (childId, childPath) {
        if (childPath === path || isWithinPath(path, childPath)) {
          unmountEntity(childId)
          removals.push(childPath)
        }
      })

      // Remove all events at this path or below it
      forEach(entityHandlers, function (fn, handlerPath) {
        if (handlerPath === path || isWithinPath(path, handlerPath)) {
          removeEvent(entityId, handlerPath)
        }
      })
    }

    // Remove the paths from the object without touching the
    // old object. This keeps the object using fast properties.
    forEach(removals, function (path) {
      delete children[entityId][path]
    })

    // Remove it from the DOM
    el.parentNode.removeChild(el)

    // Return all of the elements in this node tree to the pool
    // so that the elements can be re-used.
    if (options.pooling) {
      walk(el, function (node) {
        if (!isElement(node) || !canPool(node.tagName)) return
        getPool(node.tagName.toLowerCase()).push(node)
      })
    }
  }

  /**
   * Replace an element in the DOM. Removing all components
   * within that element and re-rendering the new virtual node.
   *
   * @param {Entity} entity
   * @param {String} path
   * @param {HTMLElement} el
   * @param {Object} vnode
   *
   * @return {void}
   */

  function replaceElement (entityId, path, el, vnode) {
    var parent = el.parentNode
    var index = Array.prototype.indexOf.call(parent.childNodes, el)

    // remove the previous element and all nested components. This
    // needs to happen before we create the new element so we don't
    // get clashes on the component paths.
    removeElement(entityId, path, el)

    // then add the new element in there
    var newEl = toNative(entityId, path, vnode)
    var target = parent.childNodes[index]

    if (target) {
      parent.insertBefore(newEl, target)
    } else {
      parent.appendChild(newEl)
    }

    // walk up the tree and update all `entity.nativeElement` references.
    if (entityId !== 'root' && path === '0') {
      updateNativeElement(entityId, newEl)
    }

    return newEl
  }

  /**
   * Update all entities in a branch that have the same nativeElement. This
   * happens when a component has another component as it's root node.
   *
   * @param {String} entityId
   * @param {HTMLElement} newEl
   *
   * @return {void}
   */

  function updateNativeElement (entityId, newEl) {
    var target = entities[entityId]
    if (target.ownerId === 'root') return
    if (children[target.ownerId]['0'] === entityId) {
      entities[target.ownerId].nativeElement = newEl
      updateNativeElement(target.ownerId, newEl)
    }
  }

  /**
   * Set the attribute of an element, performing additional transformations
   * dependning on the attribute name
   *
   * @param {HTMLElement} el
   * @param {String} name
   * @param {String} value
   */

  function setAttribute (entityId, path, el, name, value) {
    if (events[name]) {
      addEvent(entityId, path, events[name], value)
      return
    }
    switch (name) {
      case 'checked':
      case 'disabled':
      case 'selected':
        el[name] = true
        break
      case 'innerHTML':
      case 'value':
        el[name] = value
        break
      case svg.isAttribute(name):
        el.setAttributeNS(svg.namespace, name, value)
        break
      default:
        el.setAttribute(name, value)
        break
    }
  }

  /**
   * Remove an attribute, performing additional transformations
   * dependning on the attribute name
   *
   * @param {HTMLElement} el
   * @param {String} name
   */

  function removeAttribute (entityId, path, el, name) {
    if (events[name]) {
      removeEvent(entityId, path, events[name])
      return
    }
    switch (name) {
      case 'checked':
      case 'disabled':
      case 'selected':
        el[name] = false
        break
      case 'innerHTML':
      case 'value':
        el[name] = ""
        break
      default:
        el.removeAttribute(name)
        break
    }
  }

  /**
   * Checks to see if one tree path is within
   * another tree path. Example:
   *
   * 0.1 vs 0.1.1 = true
   * 0.2 vs 0.3.5 = false
   *
   * @param {String} target
   * @param {String} path
   *
   * @return {Boolean}
   */

  function isWithinPath (target, path) {
    return path.indexOf(target + '.') === 0
  }

  /**
   * Is the DOM node an element node
   *
   * @param {HTMLElement} el
   *
   * @return {Boolean}
   */

  function isElement (el) {
    return !!el.tagName
  }

  /**
   * Get the pool for a tagName, creating it if it
   * doesn't exist.
   *
   * @param {String} tagName
   *
   * @return {Pool}
   */

  function getPool (tagName) {
    var pool = pools[tagName]
    if (!pool) {
      var poolOpts = svg.isElement(tagName) ?
        { namespace: svg.namespace, tagName: tagName } :
        { tagName: tagName }
      pool = pools[tagName] = new Pool(poolOpts)
    }
    return pool
  }

  /**
   * Clean up previously used native element for reuse.
   *
   * @param {HTMLElement} el
   */

  function cleanup (el) {
    removeAllChildren(el)
    removeAllAttributes(el)
    return el
  }

  /**
   * Remove all the attributes from a node
   *
   * @param {HTMLElement} el
   */

  function removeAllAttributes (el) {
    for (var i = el.attributes.length - 1; i >= 0; i--) {
      var name = el.attributes[i].name
      el.removeAttribute(name)
    }
  }

  /**
   * Remove all the child nodes from an element
   *
   * @param {HTMLElement} el
   */

  function removeAllChildren (el) {
    while (el.firstChild) el.removeChild(el.firstChild)
  }

  /**
   * Trigger a hook on a component.
   *
   * @param {String} name Name of hook.
   * @param {Entity} entity The component instance.
   * @param {Array} args To pass along to hook.
   */

  function trigger (name, entity, args) {
    if (typeof entity.component[name] !== 'function') return
    return entity.component[name].apply(null, args)
  }

  /**
   * Trigger a hook on the component and allow state to be
   * updated too.
   *
   * @param {String} name
   * @param {Object} entity
   * @param {Array} args
   *
   * @return {void}
   */

  function triggerUpdate (name, entity, args) {
    var update = setState(entity)
    args.push(update)
    var result = trigger(name, entity, args)
    if (result) {
      updateEntityStateAsync(entity, result)
    }
  }

  /**
   * Update the entity state using a promise
   *
   * @param {Entity} entity
   * @param {Promise} promise
   */

  function updateEntityStateAsync (entity, value) {
    if (isPromise(value)) {
      value.then(function (newState) {
        updateEntityState(entity, newState)
      })
    } else {
      updateEntityState(entity, value)
    }
  }

  /**
   * Update an entity to match the latest rendered vode. We always
   * replace the props on the component when composing them. This
   * will trigger a re-render on all children below this point.
   *
   * @param {Entity} entity
   * @param {String} path
   * @param {Object} vnode
   *
   * @return {void}
   */

  function updateEntityProps (entityId, nextProps) {
    var entity = entities[entityId]
    entity.pendingProps = nextProps
    entity.dirty = true
    invalidate()
  }

  /**
   * Update component instance state.
   */

  function updateEntityState (entity, nextState) {
    entity.pendingState = assign(entity.pendingState, nextState)
    entity.dirty = true
    invalidate()
  }

  /**
   * Commit props and state changes to an entity.
   */

  function commit (entity) {
    entity.context = {
      state: entity.pendingState,
      props: entity.pendingProps,
      id: entity.id
    }
    entity.pendingState = assign({}, entity.context.state)
    entity.pendingProps = assign({}, entity.context.props)
    validateProps(entity.context.props, entity.propTypes)
    entity.dirty = false
  }

  /**
   * Try to avoid creating new virtual dom if possible.
   *
   * Later we may expose this so you can override, but not there yet.
   */

  function shouldUpdate (entity) {
    if (!entity.dirty) return false
    if (!entity.component.shouldUpdate) return true
    var nextProps = entity.pendingProps
    var nextState = entity.pendingState
    var bool = entity.component.shouldUpdate(entity.context, nextProps, nextState)
    return bool
  }

  /**
   * Register an entity.
   *
   * This is mostly to pre-preprocess component properties and values chains.
   *
   * The end result is for every component that gets mounted,
   * you create a set of IO nodes in the network from the `value` definitions.
   *
   * @param {Component} component
   */

  function register (entity) {
    registerEntity(entity)
    var component = entity.component
    if (component.registered) return

    // initialize sources once for a component type.
    registerSources(entity)
    component.registered = true
  }

  /**
   * Add entity to data-structures related to components/entities.
   *
   * @param {Entity} entity
   */

  function registerEntity(entity) {
    var component = entity.component
    // all entities for this component type.
    var entities = component.entities = component.entities || {}
    // add entity to component list
    entities[entity.id] = entity
    // map to component so you can remove later.
    components[entity.id] = component
  }

  /**
   * Initialize sources for a component by type.
   *
   * @param {Entity} entity
   */

  function registerSources(entity) {
    var component = components[entity.id]
    // get 'class-level' sources.
    // if we've already hooked it up, then we're good.
    var sources = component.sources
    if (sources) return
    var entities = component.entities

    // hook up sources.
    var map = component.sourceToPropertyName = {}
    component.sources = sources = []
    var propTypes = component.propTypes
    for (var name in propTypes) {
      var data = propTypes[name]
      if (!data) continue
      if (!data.source) continue
      sources.push(data.source)
      map[data.source] = name
    }

    // send value updates to all component instances.
    sources.forEach(function (source) {
      connections[source] = connections[source] || []
      connections[source].push(update)

      function update (data) {
        var prop = map[source]
        for (var entityId in entities) {
          var entity = entities[entityId]
          var changes = {}
          changes[prop] = data
          updateEntityProps(entityId, assign(entity.pendingProps, changes))
        }
      }
    })
  }

  /**
   * Set the initial source value on the entity
   *
   * @param {Entity} entity
   */

  function setSources (entity) {
    var component = entity.component
    var map = component.sourceToPropertyName
    var sources = component.sources
    sources.forEach(function (source) {
      var name = map[source]
      if (entity.pendingProps[name] != null) return
      entity.pendingProps[name] = app.sources[source] // get latest value plugged into global store
    })
  }

  /**
   * Add all of the DOM event listeners
   */

  function addNativeEventListeners () {
    forEach(events, function (eventType) {
      document.body.addEventListener(eventType, handleEvent, true)
    })
  }

  /**
   * Add all of the DOM event listeners
   */

  function removeNativeEventListeners () {
    forEach(events, function (eventType) {
      document.body.removeEventListener(eventType, handleEvent, true)
    })
  }

  /**
   * Handle an event that has occured within the container
   *
   * @param {Event} event
   */

  function handleEvent (event) {
    var target = event.target
    var eventType = event.type

    // Walk up the DOM tree and see if there is a handler
    // for this event type higher up.
    while (target) {
      var fn = keypath.get(handlers, [target.__entity__, target.__path__, eventType])
      if (fn) {
        event.delegateTarget = target
        fn(event)
        break
      }
      target = target.parentNode
    }
  }

  /**
   * Bind events for an element, and all it's rendered child elements.
   *
   * @param {String} path
   * @param {String} event
   * @param {Function} fn
   */

  function addEvent (entityId, path, eventType, fn) {
    keypath.set(handlers, [entityId, path, eventType], function (e) {
      var entity = entities[entityId]
      if (entity) {
        var update = setState(entity)
        var result = fn.call(null, e, entity.context, update)
        if (result) {
          updateEntityStateAsync(entity, result)
        }
      } else {
        fn.call(null, e)
      }
    })
  }

  /**
   * Unbind events for a entityId
   *
   * @param {String} entityId
   */

  function removeEvent (entityId, path, eventType) {
    var args = [entityId]
    if (path) args.push(path)
    if (eventType) args.push(eventType)
    keypath.del(handlers, args)
  }

  /**
   * Unbind all events from an entity
   *
   * @param {Entity} entity
   */

  function removeAllEvents (entityId) {
    keypath.del(handlers, [entityId])
  }

  /**
   * Validate the current properties. These simple validations
   * make it easier to ensure the correct props are passed in.
   *
   * Available rules include:
   *
   * type: {String} string | array | object | boolean | number | date | function
   *       {Array} An array of types mentioned above
   *       {Function} fn(value) should return `true` to pass in
   * expects: [] An array of values this prop could equal
   * optional: Boolean
   */

  function validateProps (props, rules, optPrefix) {
    var prefix = optPrefix || ''
    if (!options.validateProps) return
    forEach(rules, function (options, name) {
      if (!options) {
        throw new Error('deku: propTypes should have an options object for each type')
      }

      var propName = prefix ? prefix + '.' + name : name
      var value = keypath.get(props, name)
      var valueType = type(value)
      var typeFormat = type(options.type)
      var optional = (options.optional === true)

      // If it's optional and doesn't exist
      if (optional && value == null) {
        return
      }

      // If it's required and doesn't exist
      if (!optional && value == null) {
        throw new TypeError('Missing property: ' + propName)
      }

      // It's a nested type
      if (typeFormat === 'object') {
        validateProps(value, options.type, propName)
        return
      }

      // If it's the incorrect type
      if (typeFormat === 'string' && valueType !== options.type) {
        throw new TypeError('Invalid property type: ' + propName)
      }

      // If type is validate function
      if (typeFormat === 'function' && !options.type(value)) {
        throw new TypeError('Invalid property type: ' + propName)
      }

      // if type is array of possible types
      if (typeFormat === 'array' && options.type.indexOf(valueType) < 0) {
        throw new TypeError('Invalid property type: ' + propName)
      }

      // If it's an invalid value
      if (options.expects && options.expects.indexOf(value) < 0) {
        throw new TypeError('Invalid property value: ' + propName)
      }
    })

    // Now check for props that haven't been defined
    forEach(props, function (value, key) {
      // props.children is always passed in, even if it's not defined
      if (key === 'children') return
      if (!rules[key]) throw new Error('Unexpected property: ' + key)
    })
  }

  /**
   * Used for debugging to inspect the current state without
   * us needing to explicitly manage storing/updating references.
   *
   * @return {Object}
   */

  function inspect () {
    return {
      entities: entities,
      pools: pools,
      handlers: handlers,
      connections: connections,
      currentElement: currentElement,
      options: options,
      app: app,
      container: container,
      children: children
    }
  }

  /**
   * Return an object that lets us completely remove the automatic
   * DOM rendering and export debugging tools.
   */

  return {
    remove: teardown,
    inspect: inspect
  }
}

/**
 * A rendered component instance.
 *
 * This manages the lifecycle, props and state of the component.
 * It's basically just a data object for more straightfoward lookup.
 *
 * @param {Component} component
 * @param {Object} props
 */

function Entity (component, props, ownerId) {
  this.id = uid()
  this.ownerId = ownerId
  this.component = component
  this.propTypes = component.propTypes || {}
  this.context = {}
  this.context.id = this.id;
  this.context.props = defaults(props || {}, component.defaultProps || {})
  this.context.state = this.component.initialState ? this.component.initialState(this.context.props) : {}
  this.pendingProps = assign({}, this.context.props)
  this.pendingState = assign({}, this.context.state)
  this.dirty = false
  this.virtualElement = null
  this.nativeElement = null
  this.displayName = component.name || 'Component'
}

/**
 * Should we pool an element?
 */

function canPool(tagName) {
  return avoidPooling.indexOf(tagName) < 0
}

/**
 * Get a nested node using a path
 *
 * @param {HTMLElement} el   The root node '0'
 * @param {String} path The path string eg. '0.2.43'
 */

function getNodeAtPath(el, path) {
  var parts = path.split('.')
  parts.shift()
  while (parts.length) {
    el = el.childNodes[parts.pop()]
  }
  return el
}

},{"./events":24,"./svg":28,"./utils":29,"component-raf":32,"component-type":33,"dom-pool":34,"dom-walk":35,"fast.js/forEach":39,"fast.js/object/assign":42,"fast.js/reduce":45,"get-uid":46,"is-dom":47,"is-promise":48,"object-path":49}],27:[function(require,module,exports){
var utils = require('./utils')
var events = require('./events')
var defaults = utils.defaults

/**
 * Expose `stringify`.
 */

module.exports = function (app) {
  if (!app.element) {
    throw new Error('No element mounted')
  }

  /**
   * Render to string.
   *
   * @param {Component} component
   * @param {Object} [props]
   * @return {String}
   */

  function stringify (component, optProps) {
    var propTypes = component.propTypes || {}
    var props = defaults(optProps || {}, component.defaultProps || {})
    var state = component.initialState ? component.initialState(props) : {}

    for (var name in propTypes) {
      var options = propTypes[name]
      if (options.source) {
        props[name] = app.sources[options.source]
      }
    }

    if (component.beforeMount) component.beforeMount({ props: props, state: state })
    if (component.beforeRender) component.beforeRender({ props: props, state: state })
    var node = component.render({ props: props, state: state })
    return stringifyNode(node, '0')
  }

  /**
   * Render a node to a string
   *
   * @param {Node} node
   * @param {Tree} tree
   *
   * @return {String}
   */

  function stringifyNode (node, path) {
    switch (node.type) {
      case 'text': return node.data
      case 'element':
        var children = node.children
        var attributes = node.attributes
        var tagName = node.tagName
        var innerHTML = attributes.innerHTML
        var str = '<' + tagName + attrs(attributes) + '>'

        if (innerHTML) {
          str += innerHTML
        } else {
          for (var i = 0, n = children.length; i < n; i++) {
            str += stringifyNode(children[i], path + '.' + i)
          }
        }

        str += '</' + tagName + '>'
        return str
      case 'component': return stringify(node.component, node.props)
    }

    throw new Error('Invalid type')
  }

  return stringifyNode(app.element, '0')
}

/**
 * HTML attributes to string.
 *
 * @param {Object} attributes
 * @return {String}
 * @api private
 */

function attrs (attributes) {
  var str = ''
  for (var key in attributes) {
    if (key === 'innerHTML') continue
    if (events[key]) continue
    str += attr(key, attributes[key])
  }
  return str
}

/**
 * HTML attribute to string.
 *
 * @param {String} key
 * @param {String} val
 * @return {String}
 * @api private
 */

function attr (key, val) {
  return ' ' + key + '="' + val + '"'
}

},{"./events":24,"./utils":29}],28:[function(require,module,exports){
var indexOf = require('fast.js/array/indexOf')

/**
 * This file lists the supported SVG elements used by the
 * renderer. We may add better SVG support in the future
 * that doesn't require whitelisting elements.
 */

exports.namespace = 'http://www.w3.org/2000/svg'

/**
 * Supported SVG elements
 *
 * @type {Array}
 */

exports.elements = [
  'circle',
  'defs',
  'ellipse',
  'g',
  'line',
  'linearGradient',
  'mask',
  'path',
  'pattern',
  'polygon',
  'polyline',
  'radialGradient',
  'rect',
  'stop',
  'svg',
  'text',
  'tspan'
]

/**
 * Supported SVG attributes
 */

exports.attributes = [
  'cx',
  'cy',
  'd',
  'dx',
  'dy',
  'fill',
  'fillOpacity',
  'fontFamily',
  'fontSize',
  'fx',
  'fy',
  'gradientTransform',
  'gradientUnits',
  'markerEnd',
  'markerMid',
  'markerStart',
  'offset',
  'opacity',
  'patternContentUnits',
  'patternUnits',
  'points',
  'preserveAspectRatio',
  'r',
  'rx',
  'ry',
  'spreadMethod',
  'stopColor',
  'stopOpacity',
  'stroke',
  'strokeDasharray',
  'strokeLinecap',
  'strokeOpacity',
  'strokeWidth',
  'textAnchor',
  'transform',
  'version',
  'viewBox',
  'x1',
  'x2',
  'x',
  'y1',
  'y2',
  'y'
]

/**
 * Is element's namespace SVG?
 *
 * @param {String} name
 */

exports.isElement = function (name) {
  return indexOf(exports.elements, name) !== -1
}

/**
 * Are element's attributes SVG?
 *
 * @param {String} attr
 */

exports.isAttribute = function (attr) {
  return indexOf(exports.attributes, attr) !== -1
}


},{"fast.js/array/indexOf":37}],29:[function(require,module,exports){
/**
 * The npm 'defaults' module but without clone because
 * it was requiring the 'Buffer' module which is huge.
 *
 * @param {Object} options
 * @param {Object} defaults
 *
 * @return {Object}
 */

exports.defaults = function(options, defaults) {
  Object.keys(defaults).forEach(function(key) {
    if (typeof options[key] === 'undefined') {
      options[key] = defaults[key]
    }
  })
  return options
}

},{}],30:[function(require,module,exports){
/**
 * Module dependencies.
 */

var type = require('component-type')
var slice = require('sliced')
var flatten = require('array-flatten')

/**
 * This function lets us create virtual nodes using a simple
 * syntax. It is compatible with JSX transforms so you can use
 * JSX to write nodes that will compile to this function.
 *
 * let node = virtual('div', { id: 'foo' }, [
 *   virtual('a', { href: 'http://google.com' }, 'Google')
 * ])
 *
 * You can leave out the attributes or the children if either
 * of them aren't needed and it will figure out what you're
 * trying to do.
 */

module.exports = virtual

/**
 * Create virtual DOM trees.
 *
 * This creates the nicer API for the user.
 * It translates that friendly API into an actual tree of nodes.
 *
 * @param {String|Function} type
 * @param {Object} props
 * @param {Array} children
 * @return {Node}
 * @api public
 */

function virtual (type, props, children) {
  // Default to div with no args
  if (!type) {
    throw new Error('deku: Element needs a type. Read more: http://cl.ly/b0KZ')
  }

  // Skipped adding attributes and we're passing
  // in children instead.
  if (arguments.length === 2 && (typeof props === 'string' || Array.isArray(props))) {
    children = props
    props = {}
  }

  // Account for JSX putting the children as multiple arguments.
  // This is essentially just the ES6 rest param
  if (arguments.length > 2 && Array.isArray(arguments[2]) === false) {
    children = slice(arguments, 2)
  }

  children = children || []
  props = props || {}

  // passing in a single child, you can skip
  // using the array
  if (!Array.isArray(children)) {
    children = [ children ]
  }

  children = flatten(children, 1).reduce(normalize, [])

  // pull the key out from the data.
  var key = 'key' in props ? String(props.key) : null
  delete props['key']

  // if you pass in a function, it's a `Component` constructor.
  // otherwise it's an element.
  var node
  if (typeof type === 'string') {
    node = new ElementNode(type, props, key, children)
  } else {
    node = new ComponentNode(type, props, key, children)
  }

  // set the unique ID
  node.index = 0

  return node
}

/**
 * Parse nodes into real `Node` objects.
 *
 * @param {Mixed} node
 * @param {Integer} index
 * @return {Node}
 * @api private
 */

function normalize (acc, node) {
  if (node == null) {
    return acc
  }
  if (typeof node === 'string' || typeof node === 'number') {
    var newNode = new TextNode(String(node))
    newNode.index = acc.length
    acc.push(newNode)
  } else {
    node.index = acc.length
    acc.push(node)
  }
  return acc
}

/**
 * Initialize a new `ComponentNode`.
 *
 * @param {Component} component
 * @param {Object} props
 * @param {String} key Used for sorting/replacing during diffing.
 * @param {Array} children Child virtual nodes
 * @api public
 */

function ComponentNode (component, props, key, children) {
  this.key = key
  this.props = props
  this.type = 'component'
  this.component = component
  this.props.children = children || []
}

/**
 * Initialize a new `ElementNode`.
 *
 * @param {String} tagName
 * @param {Object} attributes
 * @param {String} key Used for sorting/replacing during diffing.
 * @param {Array} children Child virtual dom nodes.
 * @api public
 */

function ElementNode (tagName, attributes, key, children) {
  this.type = 'element'
  this.attributes = parseAttributes(attributes)
  this.tagName = tagName
  this.children = children || []
  this.key = key
}

/**
 * Initialize a new `TextNode`.
 *
 * This is just a virtual HTML text object.
 *
 * @param {String} text
 * @api public
 */

function TextNode (text) {
  this.type = 'text'
  this.data = String(text)
}

/**
 * Parse attributes for some special cases.
 *
 * TODO: This could be more functional and allow hooks
 * into the processing of the attributes at a component-level
 *
 * @param {Object} attributes
 *
 * @return {Object}
 */

function parseAttributes (attributes) {
  // style: { 'text-align': 'left' }
  if (attributes.style) {
    attributes.style = parseStyle(attributes.style)
  }

  // class: { foo: true, bar: false, baz: true }
  // class: ['foo', 'bar', 'baz']
  if (attributes.class) {
    attributes.class = parseClass(attributes.class)
  }

  // Remove attributes with false values
  var filteredAttributes = {}
  for (var key in attributes) {
    var value = attributes[key]
    if (value == null || value === false) continue
    filteredAttributes[key] = value
  }

  return filteredAttributes
}

/**
 * Parse a block of styles into a string.
 *
 * TODO: this could do a lot more with vendor prefixing,
 * number values etc. Maybe there's a way to allow users
 * to hook into this?
 *
 * @param {Object} styles
 *
 * @return {String}
 */

function parseStyle (styles) {
  if (type(styles) === 'string') {
    return styles
  }
  var str = ''
  for (var name in styles) {
    var value = styles[name]
    str = str + name + ':' + value + ';'
  }
  return str;
}

/**
 * Parse the class attribute so it's able to be
 * set in a more user-friendly way
 *
 * @param {String|Object|Array} value
 *
 * @return {String}
 */

function parseClass (value) {
  // { foo: true, bar: false, baz: true }
  if (type(value) === 'object') {
    var matched = []
    for (var key in value) {
      if (value[key]) matched.push(key)
    }
    value = matched
  }

  // ['foo', 'bar', 'baz']
  if (type(value) === 'array') {
    if (value.length === 0) {
      return
    }
    value = value.join(' ')
  }

  return value
}

},{"array-flatten":31,"component-type":33,"sliced":50}],31:[function(require,module,exports){
/**
 * Recursive flatten function with depth.
 *
 * @param  {Array}  array
 * @param  {Array}  result
 * @param  {Number} depth
 * @return {Array}
 */
function flattenDepth (array, result, depth) {
  for (var i = 0; i < array.length; i++) {
    var value = array[i]

    if (depth > 0 && Array.isArray(value)) {
      flattenDepth(value, result, depth - 1)
    } else {
      result.push(value)
    }
  }

  return result
}

/**
 * Recursive flatten function. Omitting depth is slightly faster.
 *
 * @param  {Array} array
 * @param  {Array} result
 * @return {Array}
 */
function flattenForever (array, result) {
  for (var i = 0; i < array.length; i++) {
    var value = array[i]

    if (Array.isArray(value)) {
      flattenForever(value, result)
    } else {
      result.push(value)
    }
  }

  return result
}

/**
 * Flatten an array, with the ability to define a depth.
 *
 * @param  {Array}  array
 * @param  {Number} depth
 * @return {Array}
 */
module.exports = function (array, depth) {
  if (depth == null) {
    return flattenForever(array, [])
  }

  return flattenDepth(array, [], depth)
}

},{}],32:[function(require,module,exports){
/**
 * Expose `requestAnimationFrame()`.
 */

exports = module.exports = window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.mozRequestAnimationFrame
  || fallback;

/**
 * Fallback implementation.
 */

var prev = new Date().getTime();
function fallback(fn) {
  var curr = new Date().getTime();
  var ms = Math.max(0, 16 - (curr - prev));
  var req = setTimeout(fn, ms);
  prev = curr;
  return req;
}

/**
 * Cancel.
 */

var cancel = window.cancelAnimationFrame
  || window.webkitCancelAnimationFrame
  || window.mozCancelAnimationFrame
  || window.clearTimeout;

exports.cancel = function(id){
  cancel.call(window, id);
};

},{}],33:[function(require,module,exports){
/**
 * toString ref.
 */

var toString = Object.prototype.toString;

/**
 * Return the type of `val`.
 *
 * @param {Mixed} val
 * @return {String}
 * @api public
 */

module.exports = function(val){
  switch (toString.call(val)) {
    case '[object Date]': return 'date';
    case '[object RegExp]': return 'regexp';
    case '[object Arguments]': return 'arguments';
    case '[object Array]': return 'array';
    case '[object Error]': return 'error';
  }

  if (val === null) return 'null';
  if (val === undefined) return 'undefined';
  if (val !== val) return 'nan';
  if (val && val.nodeType === 1) return 'element';

  val = val.valueOf
    ? val.valueOf()
    : Object.prototype.valueOf.apply(val)

  return typeof val;
};

},{}],34:[function(require,module,exports){
function Pool(params) {
    if (typeof params !== 'object') {
        throw new Error("Please pass parameters. Example -> new Pool({ tagName: \"div\" })");
    }

    if (typeof params.tagName !== 'string') {
        throw new Error("Please specify a tagName. Example -> new Pool({ tagName: \"div\" })");
    }

    this.storage = [];
    this.tagName = params.tagName.toLowerCase();
    this.namespace = params.namespace;
}

Pool.prototype.push = function(el) {
    if (el.tagName.toLowerCase() !== this.tagName) {
        return;
    }
    
    this.storage.push(el);
};

Pool.prototype.pop = function(argument) {
    if (this.storage.length === 0) {
        return this.create();
    } else {
        return this.storage.pop();
    }
};

Pool.prototype.create = function() {
    if (this.namespace) {
        return document.createElementNS(this.namespace, this.tagName);
    } else {
        return document.createElement(this.tagName);
    }
};

Pool.prototype.allocate = function(size) {
    if (this.storage.length >= size) {
        return;
    }

    var difference = size - this.storage.length;
    for (var poolAllocIter = 0; poolAllocIter < difference; poolAllocIter++) {
        this.storage.push(this.create());
    }
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Pool;
}

},{}],35:[function(require,module,exports){
var slice = Array.prototype.slice

module.exports = iterativelyWalk

function iterativelyWalk(nodes, cb) {
    if (!('length' in nodes)) {
        nodes = [nodes]
    }
    
    nodes = slice.call(nodes)

    while(nodes.length) {
        var node = nodes.shift(),
            ret = cb(node)

        if (ret) {
            return ret
        }

        if (node.childNodes && node.childNodes.length) {
            nodes = slice.call(node.childNodes).concat(nodes)
        }
    }
}

},{}],36:[function(require,module,exports){
'use strict';

var bindInternal3 = require('../function/bindInternal3');

/**
 * # For Each
 *
 * A fast `.forEach()` implementation.
 *
 * @param  {Array}    subject     The array (or array-like) to iterate over.
 * @param  {Function} fn          The visitor function.
 * @param  {Object}   thisContext The context for the visitor.
 */
module.exports = function fastForEach (subject, fn, thisContext) {
  var length = subject.length,
      iterator = thisContext !== undefined ? bindInternal3(fn, thisContext) : fn,
      i;
  for (i = 0; i < length; i++) {
    iterator(subject[i], i, subject);
  }
};

},{"../function/bindInternal3":40}],37:[function(require,module,exports){
'use strict';

/**
 * # Index Of
 *
 * A faster `Array.prototype.indexOf()` implementation.
 *
 * @param  {Array}  subject   The array (or array-like) to search within.
 * @param  {mixed}  target    The target item to search for.
 * @param  {Number} fromIndex The position to start searching from, if known.
 * @return {Number}           The position of the target in the subject, or -1 if it does not exist.
 */
module.exports = function fastIndexOf (subject, target, fromIndex) {
  var length = subject.length,
      i = 0;

  if (typeof fromIndex === 'number') {
    i = fromIndex;
    if (i < 0) {
      i += length;
      if (i < 0) {
        i = 0;
      }
    }
  }

  for (; i < length; i++) {
    if (subject[i] === target) {
      return i;
    }
  }
  return -1;
};

},{}],38:[function(require,module,exports){
'use strict';

var bindInternal4 = require('../function/bindInternal4');

/**
 * # Reduce
 *
 * A fast `.reduce()` implementation.
 *
 * @param  {Array}    subject      The array (or array-like) to reduce.
 * @param  {Function} fn           The reducer function.
 * @param  {mixed}    initialValue The initial value for the reducer, defaults to subject[0].
 * @param  {Object}   thisContext  The context for the reducer.
 * @return {mixed}                 The final result.
 */
module.exports = function fastReduce (subject, fn, initialValue, thisContext) {
  var length = subject.length,
      iterator = thisContext !== undefined ? bindInternal4(fn, thisContext) : fn,
      i, result;

  if (initialValue === undefined) {
    i = 1;
    result = subject[0];
  }
  else {
    i = 0;
    result = initialValue;
  }

  for (; i < length; i++) {
    result = iterator(result, subject[i], i, subject);
  }

  return result;
};

},{"../function/bindInternal4":41}],39:[function(require,module,exports){
'use strict';

var forEachArray = require('./array/forEach'),
    forEachObject = require('./object/forEach');

/**
 * # ForEach
 *
 * A fast `.forEach()` implementation.
 *
 * @param  {Array|Object} subject     The array or object to iterate over.
 * @param  {Function}     fn          The visitor function.
 * @param  {Object}       thisContext The context for the visitor.
 */
module.exports = function fastForEach (subject, fn, thisContext) {
  if (subject instanceof Array) {
    return forEachArray(subject, fn, thisContext);
  }
  else {
    return forEachObject(subject, fn, thisContext);
  }
};
},{"./array/forEach":36,"./object/forEach":43}],40:[function(require,module,exports){
'use strict';

/**
 * Internal helper to bind a function known to have 3 arguments
 * to a given context.
 */
module.exports = function bindInternal3 (func, thisContext) {
  return function (a, b, c) {
    return func.call(thisContext, a, b, c);
  };
};

},{}],41:[function(require,module,exports){
'use strict';

/**
 * Internal helper to bind a function known to have 4 arguments
 * to a given context.
 */
module.exports = function bindInternal4 (func, thisContext) {
  return function (a, b, c, d) {
    return func.call(thisContext, a, b, c, d);
  };
};

},{}],42:[function(require,module,exports){
'use strict';

/**
 * Analogue of Object.assign().
 * Copies properties from one or more source objects to
 * a target object. Existing keys on the target object will be overwritten.
 *
 * > Note: This differs from spec in some important ways:
 * > 1. Will throw if passed non-objects, including `undefined` or `null` values.
 * > 2. Does not support the curious Exception handling behavior, exceptions are thrown immediately.
 * > For more details, see:
 * > https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 *
 *
 *
 * @param  {Object} target      The target object to copy properties to.
 * @param  {Object} source, ... The source(s) to copy properties from.
 * @return {Object}             The updated target object.
 */
module.exports = function fastAssign (target) {
  var totalArgs = arguments.length,
      source, i, totalKeys, keys, key, j;

  for (i = 1; i < totalArgs; i++) {
    source = arguments[i];
    keys = Object.keys(source);
    totalKeys = keys.length;
    for (j = 0; j < totalKeys; j++) {
      key = keys[j];
      target[key] = source[key];
    }
  }
  return target;
};

},{}],43:[function(require,module,exports){
'use strict';

var bindInternal3 = require('../function/bindInternal3');

/**
 * # For Each
 *
 * A fast object `.forEach()` implementation.
 *
 * @param  {Object}   subject     The object to iterate over.
 * @param  {Function} fn          The visitor function.
 * @param  {Object}   thisContext The context for the visitor.
 */
module.exports = function fastForEachObject (subject, fn, thisContext) {
  var keys = Object.keys(subject),
      length = keys.length,
      iterator = thisContext !== undefined ? bindInternal3(fn, thisContext) : fn,
      key, i;
  for (i = 0; i < length; i++) {
    key = keys[i];
    iterator(subject[key], key, subject);
  }
};

},{"../function/bindInternal3":40}],44:[function(require,module,exports){
'use strict';

var bindInternal4 = require('../function/bindInternal4');

/**
 * # Reduce
 *
 * A fast object `.reduce()` implementation.
 *
 * @param  {Object}   subject      The object to reduce over.
 * @param  {Function} fn           The reducer function.
 * @param  {mixed}    initialValue The initial value for the reducer, defaults to subject[0].
 * @param  {Object}   thisContext  The context for the reducer.
 * @return {mixed}                 The final result.
 */
module.exports = function fastReduceObject (subject, fn, initialValue, thisContext) {
  var keys = Object.keys(subject),
      length = keys.length,
      iterator = thisContext !== undefined ? bindInternal4(fn, thisContext) : fn,
      i, key, result;

  if (initialValue === undefined) {
    i = 1;
    result = subject[keys[0]];
  }
  else {
    i = 0;
    result = initialValue;
  }

  for (; i < length; i++) {
    key = keys[i];
    result = iterator(result, subject[key], key, subject);
  }

  return result;
};

},{"../function/bindInternal4":41}],45:[function(require,module,exports){
'use strict';

var reduceArray = require('./array/reduce'),
    reduceObject = require('./object/reduce');

/**
 * # Reduce
 *
 * A fast `.reduce()` implementation.
 *
 * @param  {Array|Object} subject      The array or object to reduce over.
 * @param  {Function}     fn           The reducer function.
 * @param  {mixed}        initialValue The initial value for the reducer, defaults to subject[0].
 * @param  {Object}       thisContext  The context for the reducer.
 * @return {Array|Object}              The array or object containing the results.
 */
module.exports = function fastReduce (subject, fn, initialValue, thisContext) {
  if (subject instanceof Array) {
    return reduceArray(subject, fn, initialValue, thisContext);
  }
  else {
    return reduceObject(subject, fn, initialValue, thisContext);
  }
};
},{"./array/reduce":38,"./object/reduce":44}],46:[function(require,module,exports){
/** generate unique id for selector */
var counter = Date.now() % 1e9;

module.exports = function getUid(){
	return (Math.random() * 1e9 >>> 0) + (counter++);
};
},{}],47:[function(require,module,exports){
/*global window*/

/**
 * Check if object is dom node.
 *
 * @param {Object} val
 * @return {Boolean}
 * @api public
 */

module.exports = function isNode(val){
  if (!val || typeof val !== 'object') return false;
  if (window && 'object' == typeof window.Node) return val instanceof window.Node;
  return 'number' == typeof val.nodeType && 'string' == typeof val.nodeName;
}

},{}],48:[function(require,module,exports){
module.exports = isPromise;

function isPromise(obj) {
  return obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

},{}],49:[function(require,module,exports){
(function (root, factory){
  'use strict';

  /*istanbul ignore next:cant test*/
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else {
    // Browser globals
    root.objectPath = factory();
  }
})(this, function(){
  'use strict';

  var
    toStr = Object.prototype.toString,
    _hasOwnProperty = Object.prototype.hasOwnProperty;

  function isEmpty(value){
    if (!value) {
      return true;
    }
    if (isArray(value) && value.length === 0) {
      return true;
    } else {
      for (var i in value) {
        if (_hasOwnProperty.call(value, i)) {
          return false;
        }
      }
      return true;
    }
  }

  function toString(type){
    return toStr.call(type);
  }

  function isNumber(value){
    return typeof value === 'number' || toString(value) === "[object Number]";
  }

  function isString(obj){
    return typeof obj === 'string' || toString(obj) === "[object String]";
  }

  function isObject(obj){
    return typeof obj === 'object' && toString(obj) === "[object Object]";
  }

  function isArray(obj){
    return typeof obj === 'object' && typeof obj.length === 'number' && toString(obj) === '[object Array]';
  }

  function isBoolean(obj){
    return typeof obj === 'boolean' || toString(obj) === '[object Boolean]';
  }

  function getKey(key){
    var intKey = parseInt(key);
    if (intKey.toString() === key) {
      return intKey;
    }
    return key;
  }

  function set(obj, path, value, doNotReplace){
    if (isNumber(path)) {
      path = [path];
    }
    if (isEmpty(path)) {
      return obj;
    }
    if (isString(path)) {
      return set(obj, path.split('.').map(getKey), value, doNotReplace);
    }
    var currentPath = path[0];

    if (path.length === 1) {
      var oldVal = obj[currentPath];
      if (oldVal === void 0 || !doNotReplace) {
        obj[currentPath] = value;
      }
      return oldVal;
    }

    if (obj[currentPath] === void 0) {
      //check if we assume an array
      if(isNumber(path[1])) {
        obj[currentPath] = [];
      } else {
        obj[currentPath] = {};
      }
    }

    return set(obj[currentPath], path.slice(1), value, doNotReplace);
  }

  function del(obj, path) {
    if (isNumber(path)) {
      path = [path];
    }

    if (isEmpty(obj)) {
      return void 0;
    }

    if (isEmpty(path)) {
      return obj;
    }
    if(isString(path)) {
      return del(obj, path.split('.'));
    }

    var currentPath = getKey(path[0]);
    var oldVal = obj[currentPath];

    if(path.length === 1) {
      if (oldVal !== void 0) {
        if (isArray(obj)) {
          obj.splice(currentPath, 1);
        } else {
          delete obj[currentPath];
        }
      }
    } else {
      if (obj[currentPath] !== void 0) {
        return del(obj[currentPath], path.slice(1));
      }
    }

    return obj;
  }

  var objectPath = {};

  objectPath.has = function (obj, path) {
    if (isEmpty(obj)) {
      return false;
    }

    if (isNumber(path)) {
      path = [path];
    } else if (isString(path)) {
      path = path.split('.');
    }

    if (isEmpty(path) || path.length === 0) {
      return false;
    }

    for (var i = 0; i < path.length; i++) {
      var j = path[i];
      if ((isObject(obj) || isArray(obj)) && _hasOwnProperty.call(obj, j)) {
        obj = obj[j];
      } else {
        return false;
      }
    }

    return true;
  };

  objectPath.ensureExists = function (obj, path, value){
    return set(obj, path, value, true);
  };

  objectPath.set = function (obj, path, value, doNotReplace){
    return set(obj, path, value, doNotReplace);
  };

  objectPath.insert = function (obj, path, value, at){
    var arr = objectPath.get(obj, path);
    at = ~~at;
    if (!isArray(arr)) {
      arr = [];
      objectPath.set(obj, path, arr);
    }
    arr.splice(at, 0, value);
  };

  objectPath.empty = function(obj, path) {
    if (isEmpty(path)) {
      return obj;
    }
    if (isEmpty(obj)) {
      return void 0;
    }

    var value, i;
    if (!(value = objectPath.get(obj, path))) {
      return obj;
    }

    if (isString(value)) {
      return objectPath.set(obj, path, '');
    } else if (isBoolean(value)) {
      return objectPath.set(obj, path, false);
    } else if (isNumber(value)) {
      return objectPath.set(obj, path, 0);
    } else if (isArray(value)) {
      value.length = 0;
    } else if (isObject(value)) {
      for (i in value) {
        if (_hasOwnProperty.call(value, i)) {
          delete value[i];
        }
      }
    } else {
      return objectPath.set(obj, path, null);
    }
  };

  objectPath.push = function (obj, path /*, values */){
    var arr = objectPath.get(obj, path);
    if (!isArray(arr)) {
      arr = [];
      objectPath.set(obj, path, arr);
    }

    arr.push.apply(arr, Array.prototype.slice.call(arguments, 2));
  };

  objectPath.coalesce = function (obj, paths, defaultValue) {
    var value;

    for (var i = 0, len = paths.length; i < len; i++) {
      if ((value = objectPath.get(obj, paths[i])) !== void 0) {
        return value;
      }
    }

    return defaultValue;
  };

  objectPath.get = function (obj, path, defaultValue){
    if (isNumber(path)) {
      path = [path];
    }
    if (isEmpty(path)) {
      return obj;
    }
    if (isEmpty(obj)) {
      return defaultValue;
    }
    if (isString(path)) {
      return objectPath.get(obj, path.split('.'), defaultValue);
    }

    var currentPath = getKey(path[0]);

    if (path.length === 1) {
      if (obj[currentPath] === void 0) {
        return defaultValue;
      }
      return obj[currentPath];
    }

    return objectPath.get(obj[currentPath], path.slice(1), defaultValue);
  };

  objectPath.del = function(obj, path) {
    return del(obj, path);
  };

  return objectPath;
});

},{}],50:[function(require,module,exports){
module.exports = exports = require('./lib/sliced');

},{"./lib/sliced":51}],51:[function(require,module,exports){

/**
 * An Array.prototype.slice.call(arguments) alternative
 *
 * @param {Object} args something with a length
 * @param {Number} slice
 * @param {Number} sliceEnd
 * @api public
 */

module.exports = function (args, slice, sliceEnd) {
  var ret = [];
  var len = args.length;

  if (0 === len) return ret;

  var start = slice < 0
    ? Math.max(0, slice + len)
    : slice || 0;

  if (sliceEnd !== undefined) {
    len = sliceEnd < 0
      ? sliceEnd + len
      : sliceEnd
  }

  while (len-- > start) {
    ret[len - start] = args[len];
  }

  return ret;
}


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvY29kZS9kYXNoYm9hcmQvYXBwLmpzIiwiL2NvZGUvZGFzaGJvYXJkL2NvbmZpZy5qcyIsIi9jb2RlL2Rhc2hib2FyZC9lbGVtZW50cy9ncmlkLmpzIiwiL2NvZGUvZGFzaGJvYXJkL2VsZW1lbnRzL2luZGV4LmpzIiwiL2NvZGUvZGFzaGJvYXJkL2xpYi9hcGkuanMiLCJub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanMiLCJub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL3hoci5qcyIsIm5vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCJub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwibm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2Rpc3BhdGNoUmVxdWVzdC5qcyIsIm5vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMuanMiLCJub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVcmwuanMiLCJub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29va2llcy5qcyIsIm5vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9kZXByZWNhdGVkTWV0aG9kLmpzIiwibm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIm5vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcHJlYWQuanMiLCJub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvdHJhbnNmb3JtRGF0YS5qcyIsIm5vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy91cmxJc1NhbWVPcmlnaW4uanMiLCJub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzIiwibm9kZV9tb2R1bGVzL2F4aW9zL25vZGVfbW9kdWxlcy9lczYtcHJvbWlzZS9kaXN0L2VzNi1wcm9taXNlLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9jb21wb25lbnQtZW1pdHRlci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9kZWt1L2xpYi9hcHBsaWNhdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9kZWt1L2xpYi9ldmVudHMuanMiLCJub2RlX21vZHVsZXMvZGVrdS9saWIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZGVrdS9saWIvcmVuZGVyLmpzIiwibm9kZV9tb2R1bGVzL2Rla3UvbGliL3N0cmluZ2lmeS5qcyIsIm5vZGVfbW9kdWxlcy9kZWt1L2xpYi9zdmcuanMiLCJub2RlX21vZHVsZXMvZGVrdS9saWIvdXRpbHMuanMiLCJub2RlX21vZHVsZXMvZGVrdS9saWIvdmlydHVhbC5qcyIsIm5vZGVfbW9kdWxlcy9kZWt1L25vZGVfbW9kdWxlcy9hcnJheS1mbGF0dGVuL2FycmF5LWZsYXR0ZW4uanMiLCJub2RlX21vZHVsZXMvZGVrdS9ub2RlX21vZHVsZXMvY29tcG9uZW50LXJhZi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9kZWt1L25vZGVfbW9kdWxlcy9jb21wb25lbnQtdHlwZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9kZWt1L25vZGVfbW9kdWxlcy9kb20tcG9vbC9Qb29sLmpzIiwibm9kZV9tb2R1bGVzL2Rla3Uvbm9kZV9tb2R1bGVzL2RvbS13YWxrL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Rla3Uvbm9kZV9tb2R1bGVzL2Zhc3QuanMvYXJyYXkvZm9yRWFjaC5qcyIsIm5vZGVfbW9kdWxlcy9kZWt1L25vZGVfbW9kdWxlcy9mYXN0LmpzL2FycmF5L2luZGV4T2YuanMiLCJub2RlX21vZHVsZXMvZGVrdS9ub2RlX21vZHVsZXMvZmFzdC5qcy9hcnJheS9yZWR1Y2UuanMiLCJub2RlX21vZHVsZXMvZGVrdS9ub2RlX21vZHVsZXMvZmFzdC5qcy9mb3JFYWNoLmpzIiwibm9kZV9tb2R1bGVzL2Rla3Uvbm9kZV9tb2R1bGVzL2Zhc3QuanMvZnVuY3Rpb24vYmluZEludGVybmFsMy5qcyIsIm5vZGVfbW9kdWxlcy9kZWt1L25vZGVfbW9kdWxlcy9mYXN0LmpzL2Z1bmN0aW9uL2JpbmRJbnRlcm5hbDQuanMiLCJub2RlX21vZHVsZXMvZGVrdS9ub2RlX21vZHVsZXMvZmFzdC5qcy9vYmplY3QvYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2Rla3Uvbm9kZV9tb2R1bGVzL2Zhc3QuanMvb2JqZWN0L2ZvckVhY2guanMiLCJub2RlX21vZHVsZXMvZGVrdS9ub2RlX21vZHVsZXMvZmFzdC5qcy9vYmplY3QvcmVkdWNlLmpzIiwibm9kZV9tb2R1bGVzL2Rla3Uvbm9kZV9tb2R1bGVzL2Zhc3QuanMvcmVkdWNlLmpzIiwibm9kZV9tb2R1bGVzL2Rla3Uvbm9kZV9tb2R1bGVzL2dldC11aWQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZGVrdS9ub2RlX21vZHVsZXMvaXMtZG9tL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Rla3Uvbm9kZV9tb2R1bGVzL2lzLXByb21pc2UvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZGVrdS9ub2RlX21vZHVsZXMvb2JqZWN0LXBhdGgvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZGVrdS9ub2RlX21vZHVsZXMvc2xpY2VkL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Rla3Uvbm9kZV9tb2R1bGVzL3NsaWNlZC9saWIvc2xpY2VkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztvQkNBc0MsTUFBTTs7c0JBQ3pCLFVBQVU7Ozs7NkJBQ1Isa0JBQWtCOztzQkFDdkIsV0FBVzs7Ozs7Ozs7QUFNM0IsSUFBSSxHQUFHLEdBQUcsVUFURCxJQUFJLEdBU0csQ0FBQzs7QUFFakIsR0FBRyxDQUFDLEdBQUcscUJBQVEsQ0FBQzs7QUFFaEIsQ0FBQztRQUNPLFFBQVEsRUFDTixLQUFLOzs7OztnREFEVSxvQkFBSSxNQUFNLENBQUMsc0JBQXNCLEVBQUUsZ0JBQWdCLENBQUM7OztBQUFyRSx3QkFBUTtBQUNOLHFCQUFLLEdBQUssUUFBUSxDQUFDLElBQUksQ0FBdkIsS0FBSzs7QUFDWCxtQkFBRyxDQUFDLEtBQUssQ0FDTCxVQWpCZSxPQUFPLGlCQUVyQixJQUFJLElBZUMsS0FBSyxFQUFFLEtBQUssQUFBQyxHQUFRLENBQzlCLENBQUM7QUFDRiwwQkFuQlcsTUFBTSxFQW1CVixHQUFHLEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7Ozs7O0VBQzlDLEVBQUcsQ0FBQTs7Ozs7Ozs7cUJDcEJXO0FBQ2QsVUFBUyxXQUF1QjtDQUNoQzs7Ozs7Ozs7OztvQkNGdUIsTUFBTTs7QUFFOUIsSUFBSSxRQUFRLEdBQUc7QUFDWCxVQUFNLEVBQUEsZ0JBQUMsQ0FBQyxFQUFFO1lBQ0QsS0FBSyxHQUFVLENBQUMsQ0FBaEIsS0FBSztZQUFDLEtBQUssR0FBSSxDQUFDLENBQVYsS0FBSzs7QUFDaEIsWUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztBQUN0QixZQUFJLEVBQUUsR0FBRyxTQUFMLEVBQUUsR0FBUztBQUFFLG9CQUFRLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFBO1NBQUUsQ0FBQztBQUNyRCxlQUFPLFVBUE4sT0FBTzs7Y0FPSSxTQUFNLE9BQU8sRUFBQyxjQUFXLE9BQU8sRUFBQyxlQUFZLE9BQU8sRUFBQyxPQUFPLEVBQUUsRUFBRSxBQUFDO1lBQ3JFLFVBUlAsT0FBTzs7O2dCQVFLLElBQUksQ0FBQyxJQUFJO2FBQU07WUFDcEIsVUFUUCxPQUFPOzs7Z0JBU0ksSUFBSSxDQUFDLFdBQVc7YUFBSztTQUN2QixDQUFBO0tBQ2I7Q0FDSixDQUFBOztBQUVELElBQUksSUFBSSxHQUFHO0FBQ1QsQUFBTSxjQUFVLEVBQUEsb0JBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxRQUFRO1lBQzFCLElBQUksRUFJSixRQUFROzs7O0FBSlIsd0JBQUksR0FBRyxJQUFJLHFCQUFxQixDQUFDLEVBQUUsRUFBRTtBQUNyQywrQkFBTyxFQUFFLEVBQUU7QUFDWCw4QkFBTSxFQUFFLEdBQUc7cUJBQ2QsQ0FBQztBQUNFLDRCQUFRLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxZQUFZO0FBQ3pELDRCQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUE7QUFDN0IsNEJBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtxQkFDZCxDQUFDO3dEQUNLO0FBQ0gsNEJBQUksRUFBSixJQUFJO0FBQ0osZ0NBQVEsRUFBUixRQUFRO3FCQUNYOzs7Ozs7O0tBQ0Y7QUFDRCxpQkFBYSxFQUFDLHVCQUFDLFNBQVMsRUFBRSxFQUFFLEVBQUU7WUFDdkIsS0FBSyxHQUFlLFNBQVMsQ0FBN0IsS0FBSztZQUFFLEtBQUssR0FBUSxTQUFTLENBQXRCLEtBQUs7WUFBRSxFQUFFLEdBQUksU0FBUyxDQUFmLEVBQUU7O0FBQ3JCLGFBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUNsQjtBQUNELGVBQVcsRUFBQSxxQkFBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRTtZQUNuQixLQUFLLEdBQUssQ0FBQyxDQUFYLEtBQUs7O0FBQ1gsYUFBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtLQUN0QjtBQUNELFVBQU0sRUFBQSxnQkFBQyxDQUFDLEVBQUUsUUFBUSxFQUFFO1lBQ1osS0FBSyxHQUFLLENBQUMsQ0FBWCxLQUFLOztBQUVYLFlBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQVMsQ0FBQyxFQUFFO0FBQ3BDLG1CQUFPLFVBekNOLE9BQU8sRUF5Q0EsUUFBUSxJQUFDLElBQUksRUFBRSxDQUFDLEFBQUMsR0FBRyxDQUFBO1NBQy9CLENBQUMsQ0FBQztBQUNILGVBQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbkIsZUFBTyxVQTVDRixPQUFPOztjQTRDQSxTQUFNLE1BQU07WUFDbkIsS0FBSztTQUNKLENBQUE7S0FDUDtDQUNGLENBQUE7O3FCQUVjLElBQUk7Ozs7Ozs7Ozs7OztvQkNsREYsUUFBUTs7OztxQkFFVjtBQUNYLFFBQUksbUJBQUE7Q0FDUDs7Ozs7Ozs7Ozs7Ozs7cUJDSmlCLE9BQU87Ozs7QUFFekIsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDOzs7Ozs7QUFNYixHQUFHLENBQUMsT0FBTyxHQUFHLFVBQUEsRUFBRTtTQUFJLHdCQUFNO0FBQ3hCLFVBQU0sRUFBRSxLQUFLO0FBQ2IsT0FBRyxFQUFFLCtCQUErQixHQUFHLEVBQUU7R0FDMUMsQ0FBQztDQUFBLENBQUE7O0FBRUYsR0FBRyxDQUFDLE1BQU0sR0FBRyxvQkFBTyxFQUFFLEVBQUUsSUFBSTtNQUNwQixHQUFHOzs7Ozt3Q0FBUyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQzs7O0FBQTNCLFdBQUc7NENBQ0EsbUJBQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQzs7Ozs7OztDQUNqRCxDQUFBO3FCQUNjLEdBQUc7Ozs7QUNqQmxCOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9HQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN6TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM1OEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2NUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdlBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3UUE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgeyB0cmVlLCByZW5kZXIsIGVsZW1lbnQgfSBmcm9tICdkZWt1J1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuL2NvbmZpZydcbmltcG9ydCB7IEdyaWQgfSBmcm9tICcuL2VsZW1lbnRzL2luZGV4J1xuaW1wb3J0IEFwaSBmcm9tICcuL2xpYi9hcGknXG5cbi8qXG4gIEFwcCArIENvbmZpZ1xuKi9cblxubGV0IGFwcCA9IHRyZWUoKTtcblxuYXBwLnNldChjb25maWcpO1xuXG4oYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgQXBpLmdldFJhdygnYTIzZGNmZDMwMjJkYjAwZGZmYmMnLCAnZ2lzdGZpbGUxLmpzb24nKTtcbiAgICBsZXQgeyBpdGVtcyB9ID0gcmVzcG9uc2UuZGF0YTtcbiAgICBhcHAubW91bnQoXG4gICAgICAgIDxHcmlkIGl0ZW1zPXtpdGVtc30+PC9HcmlkPlxuICAgICk7XG4gICAgcmVuZGVyKGFwcCwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYXBwJykpO1xufSkoKVxuIiwiZXhwb3J0IGRlZmF1bHQge1xuXHRzdHJpcGVfcGs6IHByb2Nlc3MuZW52LlNUUklQRV9QS1xufSIsImltcG9ydCB7IGVsZW1lbnQgfSBmcm9tICdkZWt1J1xuICAgIFxubGV0IEdyaWRJdGVtID0ge1xuICAgIHJlbmRlcihjKSB7XG4gICAgICAgIGxldCB7c3RhdGUscHJvcHN9ID0gYztcbiAgICAgICAgbGV0IGl0ZW0gPSBwcm9wcy5pdGVtO1xuICAgICAgICBsZXQgZ28gPSAoKSA9PiB7IGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSBpdGVtLnVybCB9O1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzcz1cInByb3h5XCIgZGF0YS13aWR0aD1cIjI1MHB4XCIgZGF0YS1oZWlnaHQ9XCIyNTBweFwiIG9uQ2xpY2s9e2dvfT5cbiAgICAgICAgICAgICAgICA8aDQ+e2l0ZW0ubmFtZX08L2g0PlxuICAgICAgICAgICAgICAgIDxwPntpdGVtLmRlc2NyaXB0aW9ufTwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgIH1cbn1cbiAgICBcbmxldCBHcmlkID0ge1xuICBhc3luYyBhZnRlck1vdW50KGMsIGVsLCBzZXRTdGF0ZSkge1xuICAgIGxldCBwYWNrID0gbmV3IEhvcml6b250YWxHcmlkUGFja2luZyhlbCwgeyAgICAgICAgXG4gICAgICAgIHBhZGRpbmc6IDEwLFxuICAgICAgICBoZWlnaHQ6IDI1MFxuICAgIH0pXG4gICAgbGV0IG9uUmVzaXplID0gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcGFjay53aWR0aCA9IGVsLmNsaWVudFdpZHRoXG4gICAgICBwYWNrLnJlbG9hZCgpXG4gICAgfSlcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWNrLFxuICAgICAgICBvblJlc2l6ZVxuICAgIH1cbiAgfSxcbiAgYmVmb3JlVW5tb3VudCAoY29tcG9uZW50LCBlbCkge1xuICAgIGxldCB7cHJvcHMsIHN0YXRlLCBpZH0gPSBjb21wb25lbnRcbiAgICBzdGF0ZS5vblJlc2l6ZSgpO1xuICB9LFxuICBhZnRlclVwZGF0ZShjLCBlbCwgc2V0U3RhdGUpIHtcbiAgICAgIGxldCB7IHN0YXRlIH0gPSBjO1xuICAgICAgc3RhdGUucGFjay5yZWxvYWQoKVxuICB9LFxuICByZW5kZXIoYywgc2V0U3RhdGUpIHtcbiAgICBsZXQgeyBwcm9wcyB9ID0gYztcbiAgICAgIFxuICAgIGxldCBpdGVtcyA9IHByb3BzLml0ZW1zLm1hcChmdW5jdGlvbih2KSB7XG4gICAgICAgIHJldHVybiA8R3JpZEl0ZW0gaXRlbT17dn0gLz5cbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZyhpdGVtcyk7XG4gICAgcmV0dXJuIDxkaXYgY2xhc3M9XCJncmlkXCI+ICAgICAgXG4gICAgICAgIHtpdGVtc31cbiAgICA8L2Rpdj4gICAgXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR3JpZDtcbiIsImltcG9ydCBHcmlkIGZyb20gJy4vZ3JpZCdcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIEdyaWRcbn0gIiwiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJ1xuXG5sZXQgQXBpID0ge307XG5cbi8qKlxuICogTGlzdCBBcHBsaWNhdGlvbnNcbiAqL1xuXG5BcGkuZ2V0R2lzdCA9IGlkID0+IGF4aW9zKHtcbiAgbWV0aG9kOiAnZ2V0JyxcbiAgdXJsOiAnaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9naXN0cy8nICsgaWQsXG59KVxuXG5BcGkuZ2V0UmF3ID0gYXN5bmMgKGlkLCBmaWxlKSA9PiB7XG4gICAgbGV0IHJlcyA9IGF3YWl0IEFwaS5nZXRHaXN0KGlkKVxuICAgIHJldHVybiBheGlvcy5nZXQocmVzLmRhdGEuZmlsZXNbZmlsZV0ucmF3X3VybCk7XG59XG5leHBvcnQgZGVmYXVsdCBBcGk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2F4aW9zJyk7IiwiJ3VzZSBzdHJpY3QnO1xuXG4vKmdsb2JhbCBBY3RpdmVYT2JqZWN0OnRydWUqL1xuXG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLy4uL2RlZmF1bHRzJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgYnVpbGRVcmwgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvYnVpbGRVcmwnKTtcbnZhciBjb29raWVzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2Nvb2tpZXMnKTtcbnZhciBwYXJzZUhlYWRlcnMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvcGFyc2VIZWFkZXJzJyk7XG52YXIgdHJhbnNmb3JtRGF0YSA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy90cmFuc2Zvcm1EYXRhJyk7XG52YXIgdXJsSXNTYW1lT3JpZ2luID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL3VybElzU2FtZU9yaWdpbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHhockFkYXB0ZXIocmVzb2x2ZSwgcmVqZWN0LCBjb25maWcpIHtcbiAgLy8gVHJhbnNmb3JtIHJlcXVlc3QgZGF0YVxuICB2YXIgZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgY29uZmlnLmRhdGEsXG4gICAgY29uZmlnLmhlYWRlcnMsXG4gICAgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3RcbiAgKTtcblxuICAvLyBNZXJnZSBoZWFkZXJzXG4gIHZhciByZXF1ZXN0SGVhZGVycyA9IHV0aWxzLm1lcmdlKFxuICAgIGRlZmF1bHRzLmhlYWRlcnMuY29tbW9uLFxuICAgIGRlZmF1bHRzLmhlYWRlcnNbY29uZmlnLm1ldGhvZF0gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnMgfHwge31cbiAgKTtcblxuICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSkge1xuICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1snQ29udGVudC1UeXBlJ107IC8vIExldCB0aGUgYnJvd3NlciBzZXQgaXRcbiAgfVxuXG4gIC8vIENyZWF0ZSB0aGUgcmVxdWVzdFxuICB2YXIgcmVxdWVzdCA9IG5ldyAoWE1MSHR0cFJlcXVlc3QgfHwgQWN0aXZlWE9iamVjdCkoJ01pY3Jvc29mdC5YTUxIVFRQJyk7XG4gIHJlcXVlc3Qub3Blbihjb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIGJ1aWxkVXJsKGNvbmZpZy51cmwsIGNvbmZpZy5wYXJhbXMpLCB0cnVlKTtcblxuICAvLyBMaXN0ZW4gZm9yIHJlYWR5IHN0YXRlXG4gIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgIGlmIChyZXF1ZXN0ICYmIHJlcXVlc3QucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgLy8gUHJlcGFyZSB0aGUgcmVzcG9uc2VcbiAgICAgIHZhciByZXNwb25zZUhlYWRlcnMgPSBwYXJzZUhlYWRlcnMocmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSk7XG4gICAgICB2YXIgcmVzcG9uc2VEYXRhID0gWyd0ZXh0JywgJyddLmluZGV4T2YoY29uZmlnLnJlc3BvbnNlVHlwZSB8fCAnJykgIT09IC0xID8gcmVxdWVzdC5yZXNwb25zZVRleHQgOiByZXF1ZXN0LnJlc3BvbnNlO1xuICAgICAgdmFyIHJlc3BvbnNlID0ge1xuICAgICAgICBkYXRhOiB0cmFuc2Zvcm1EYXRhKFxuICAgICAgICAgIHJlc3BvbnNlRGF0YSxcbiAgICAgICAgICByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgICAgICksXG4gICAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzVGV4dCxcbiAgICAgICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICAgICAgICBjb25maWc6IGNvbmZpZ1xuICAgICAgfTtcblxuICAgICAgLy8gUmVzb2x2ZSBvciByZWplY3QgdGhlIFByb21pc2UgYmFzZWQgb24gdGhlIHN0YXR1c1xuICAgICAgKHJlcXVlc3Quc3RhdHVzID49IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyA8IDMwMCA/XG4gICAgICAgIHJlc29sdmUgOlxuICAgICAgICByZWplY3QpKHJlc3BvbnNlKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfVxuICB9O1xuXG4gIC8vIEFkZCB4c3JmIGhlYWRlclxuICB2YXIgeHNyZlZhbHVlID0gdXJsSXNTYW1lT3JpZ2luKGNvbmZpZy51cmwpID9cbiAgICAgIGNvb2tpZXMucmVhZChjb25maWcueHNyZkNvb2tpZU5hbWUgfHwgZGVmYXVsdHMueHNyZkNvb2tpZU5hbWUpIDpcbiAgICAgIHVuZGVmaW5lZDtcbiAgaWYgKHhzcmZWYWx1ZSkge1xuICAgIHJlcXVlc3RIZWFkZXJzW2NvbmZpZy54c3JmSGVhZGVyTmFtZSB8fCBkZWZhdWx0cy54c3JmSGVhZGVyTmFtZV0gPSB4c3JmVmFsdWU7XG4gIH1cblxuICAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLCBmdW5jdGlvbiAodmFsLCBrZXkpIHtcbiAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgaWYgKCFkYXRhICYmIGtleS50b0xvd2VyQ2FzZSgpID09PSAnY29udGVudC10eXBlJykge1xuICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzW2tleV07XG4gICAgfVxuICAgIC8vIE90aGVyd2lzZSBhZGQgaGVhZGVyIHRvIHRoZSByZXF1ZXN0XG4gICAgZWxzZSB7XG4gICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gQWRkIHdpdGhDcmVkZW50aWFscyB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICBpZiAoY29uZmlnLndpdGhDcmVkZW50aWFscykge1xuICAgIHJlcXVlc3Qud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgfVxuXG4gIC8vIEFkZCByZXNwb25zZVR5cGUgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUpIHtcbiAgICB0cnkge1xuICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBjb25maWcucmVzcG9uc2VUeXBlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChyZXF1ZXN0LnJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXIoZGF0YSkpIHtcbiAgICBkYXRhID0gbmV3IERhdGFWaWV3KGRhdGEpO1xuICB9XG5cbiAgLy8gU2VuZCB0aGUgcmVxdWVzdFxuICByZXF1ZXN0LnNlbmQoZGF0YSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgZGVwcmVjYXRlZE1ldGhvZCA9IHJlcXVpcmUoJy4vaGVscGVycy9kZXByZWNhdGVkTWV0aG9kJyk7XG52YXIgZGlzcGF0Y2hSZXF1ZXN0ID0gcmVxdWlyZSgnLi9jb3JlL2Rpc3BhdGNoUmVxdWVzdCcpO1xudmFyIEludGVyY2VwdG9yTWFuYWdlciA9IHJlcXVpcmUoJy4vY29yZS9JbnRlcmNlcHRvck1hbmFnZXInKTtcblxuLy8gUG9seWZpbGwgRVM2IFByb21pc2UgaWYgbmVlZGVkXG4oZnVuY3Rpb24gKCkge1xuICAvLyB3ZWJwYWNrIGlzIGJlaW5nIHVzZWQgdG8gc2V0IGVzNi1wcm9taXNlIHRvIHRoZSBuYXRpdmUgUHJvbWlzZVxuICAvLyBmb3IgdGhlIHN0YW5kYWxvbmUgYnVpbGQuIEl0J3MgbmVjZXNzYXJ5IHRvIG1ha2Ugc3VyZSBwb2x5ZmlsbCBleGlzdHMuXG4gIHZhciBQID0gcmVxdWlyZSgnZXM2LXByb21pc2UnKTtcbiAgaWYgKFAgJiYgdHlwZW9mIFAucG9seWZpbGwgPT09ICdmdW5jdGlvbicpIHtcbiAgICBQLnBvbHlmaWxsKCk7XG4gIH1cbn0pKCk7XG5cbnZhciBheGlvcyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXhpb3MoY29uZmlnKSB7XG4gIGNvbmZpZyA9IHV0aWxzLm1lcmdlKHtcbiAgICBtZXRob2Q6ICdnZXQnLFxuICAgIGhlYWRlcnM6IHt9LFxuICAgIHRyYW5zZm9ybVJlcXVlc3Q6IGRlZmF1bHRzLnRyYW5zZm9ybVJlcXVlc3QsXG4gICAgdHJhbnNmb3JtUmVzcG9uc2U6IGRlZmF1bHRzLnRyYW5zZm9ybVJlc3BvbnNlXG4gIH0sIGNvbmZpZyk7XG5cbiAgLy8gRG9uJ3QgYWxsb3cgb3ZlcnJpZGluZyBkZWZhdWx0cy53aXRoQ3JlZGVudGlhbHNcbiAgY29uZmlnLndpdGhDcmVkZW50aWFscyA9IGNvbmZpZy53aXRoQ3JlZGVudGlhbHMgfHwgZGVmYXVsdHMud2l0aENyZWRlbnRpYWxzO1xuXG4gIC8vIEhvb2sgdXAgaW50ZXJjZXB0b3JzIG1pZGRsZXdhcmVcbiAgdmFyIGNoYWluID0gW2Rpc3BhdGNoUmVxdWVzdCwgdW5kZWZpbmVkXTtcbiAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcblxuICBheGlvcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5mb3JFYWNoKGZ1bmN0aW9uIChpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnVuc2hpZnQoaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIGF4aW9zLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIChpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHdoaWxlIChjaGFpbi5sZW5ndGgpIHtcbiAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGNoYWluLnNoaWZ0KCksIGNoYWluLnNoaWZ0KCkpO1xuICB9XG5cbiAgLy8gUHJvdmlkZSBhbGlhcyBmb3Igc3VjY2Vzc1xuICBwcm9taXNlLnN1Y2Nlc3MgPSBmdW5jdGlvbiBzdWNjZXNzKGZuKSB7XG4gICAgZGVwcmVjYXRlZE1ldGhvZCgnc3VjY2VzcycsICd0aGVuJywgJ2h0dHBzOi8vZ2l0aHViLmNvbS9temFicmlza2llL2F4aW9zL2Jsb2IvbWFzdGVyL1JFQURNRS5tZCNyZXNwb25zZS1hcGknKTtcblxuICAgIHByb21pc2UudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgZm4ocmVzcG9uc2UuZGF0YSwgcmVzcG9uc2Uuc3RhdHVzLCByZXNwb25zZS5oZWFkZXJzLCByZXNwb25zZS5jb25maWcpO1xuICAgIH0pO1xuICAgIHJldHVybiBwcm9taXNlO1xuICB9O1xuXG4gIC8vIFByb3ZpZGUgYWxpYXMgZm9yIGVycm9yXG4gIHByb21pc2UuZXJyb3IgPSBmdW5jdGlvbiBlcnJvcihmbikge1xuICAgIGRlcHJlY2F0ZWRNZXRob2QoJ2Vycm9yJywgJ2NhdGNoJywgJ2h0dHBzOi8vZ2l0aHViLmNvbS9temFicmlza2llL2F4aW9zL2Jsb2IvbWFzdGVyL1JFQURNRS5tZCNyZXNwb25zZS1hcGknKTtcblxuICAgIHByb21pc2UudGhlbihudWxsLCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgZm4ocmVzcG9uc2UuZGF0YSwgcmVzcG9uc2Uuc3RhdHVzLCByZXNwb25zZS5oZWFkZXJzLCByZXNwb25zZS5jb25maWcpO1xuICAgIH0pO1xuICAgIHJldHVybiBwcm9taXNlO1xuICB9O1xuXG4gIHJldHVybiBwcm9taXNlO1xufTtcblxuLy8gRXhwb3NlIGRlZmF1bHRzXG5heGlvcy5kZWZhdWx0cyA9IGRlZmF1bHRzO1xuXG4vLyBFeHBvc2UgYWxsL3NwcmVhZFxuYXhpb3MuYWxsID0gZnVuY3Rpb24gKHByb21pc2VzKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuYXhpb3Muc3ByZWFkID0gcmVxdWlyZSgnLi9oZWxwZXJzL3NwcmVhZCcpO1xuXG4vLyBFeHBvc2UgaW50ZXJjZXB0b3JzXG5heGlvcy5pbnRlcmNlcHRvcnMgPSB7XG4gIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgcmVzcG9uc2U6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKVxufTtcblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG4oZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBjcmVhdGVTaG9ydE1ldGhvZHMoKSB7XG4gICAgdXRpbHMuZm9yRWFjaChhcmd1bWVudHMsIGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgICAgIGF4aW9zW21ldGhvZF0gPSBmdW5jdGlvbiAodXJsLCBjb25maWcpIHtcbiAgICAgICAgcmV0dXJuIGF4aW9zKHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICAgIHVybDogdXJsXG4gICAgICAgIH0pKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTaG9ydE1ldGhvZHNXaXRoRGF0YSgpIHtcbiAgICB1dGlscy5mb3JFYWNoKGFyZ3VtZW50cywgZnVuY3Rpb24gKG1ldGhvZCkge1xuICAgICAgYXhpb3NbbWV0aG9kXSA9IGZ1bmN0aW9uICh1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgICAgICByZXR1cm4gYXhpb3ModXRpbHMubWVyZ2UoY29uZmlnIHx8IHt9LCB7XG4gICAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICB9KSk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgY3JlYXRlU2hvcnRNZXRob2RzKCdkZWxldGUnLCAnZ2V0JywgJ2hlYWQnKTtcbiAgY3JlYXRlU2hvcnRNZXRob2RzV2l0aERhdGEoJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJyk7XG59KSgpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIEludGVyY2VwdG9yTWFuYWdlcigpIHtcbiAgdGhpcy5oYW5kbGVycyA9IFtdO1xufVxuXG4vKipcbiAqIEFkZCBhIG5ldyBpbnRlcmNlcHRvciB0byB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdWxmaWxsZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgdGhlbmAgZm9yIGEgYFByb21pc2VgXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3RlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGByZWplY3RgIGZvciBhIGBQcm9taXNlYFxuICpcbiAqIEByZXR1cm4ge051bWJlcn0gQW4gSUQgdXNlZCB0byByZW1vdmUgaW50ZXJjZXB0b3IgbGF0ZXJcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiAoZnVsZmlsbGVkLCByZWplY3RlZCkge1xuICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgIGZ1bGZpbGxlZDogZnVsZmlsbGVkLFxuICAgIHJlamVjdGVkOiByZWplY3RlZFxuICB9KTtcbiAgcmV0dXJuIHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGFuIGludGVyY2VwdG9yIGZyb20gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmVqZWN0ID0gZnVuY3Rpb24gKGlkKSB7XG4gIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgIHRoaXMuaGFuZGxlcnNbaWRdID0gbnVsbDtcbiAgfVxufTtcblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICpcbiAqIFRoaXMgbWV0aG9kIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIHNraXBwaW5nIG92ZXIgYW55XG4gKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYHJlbW92ZWAuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggaW50ZXJjZXB0b3JcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGZuKSB7XG4gIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gKGgpIHtcbiAgICBpZiAoaCAhPT0gbnVsbCkge1xuICAgICAgZm4oaCk7XG4gICAgfVxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSW50ZXJjZXB0b3JNYW5hZ2VyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHdoaWNoZXZlciBhZGFwdGVyXG4gKiBpcyBzdXBwb3J0ZWQgYnkgdGhlIGN1cnJlbnQgZW52aXJvbm1lbnQuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkaXNwYXRjaFJlcXVlc3QoY29uZmlnKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIEZvciBicm93c2VycyB1c2UgWEhSIGFkYXB0ZXJcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXF1aXJlKCcuLi9hZGFwdGVycy94aHInKShyZXNvbHZlLCByZWplY3QsIGNvbmZpZyk7XG4gICAgICB9XG4gICAgICAvLyBGb3Igbm9kZSB1c2UgSFRUUCBhZGFwdGVyXG4gICAgICBlbHNlIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmVxdWlyZSgnLi4vYWRhcHRlcnMvaHR0cCcpKHJlc29sdmUsIHJlamVjdCwgY29uZmlnKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZWplY3QoZSk7XG4gICAgfVxuICB9KTtcbn07XG5cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgUFJPVEVDVElPTl9QUkVGSVggPSAvXlxcKVxcXVxcfScsP1xcbi87XG52YXIgREVGQVVMVF9DT05URU5UX1RZUEUgPSB7XG4gICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRyYW5zZm9ybVJlcXVlc3Q6IFtmdW5jdGlvbiAoZGF0YSwgaGVhZGVycykge1xuICAgIGlmKHV0aWxzLmlzRm9ybURhdGEoZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlcihkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNPYmplY3QoZGF0YSkgJiYgIXV0aWxzLmlzRmlsZShkYXRhKSAmJiAhdXRpbHMuaXNCbG9iKGRhdGEpKSB7XG4gICAgICAvLyBTZXQgYXBwbGljYXRpb24vanNvbiBpZiBubyBDb250ZW50LVR5cGUgaGFzIGJlZW4gc3BlY2lmaWVkXG4gICAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnMpICYmIHV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddKSkge1xuICAgICAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9ICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTgnO1xuICAgICAgfVxuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiAoZGF0YSkge1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGRhdGEgPSBkYXRhLnJlcGxhY2UoUFJPVEVDVElPTl9QUkVGSVgsICcnKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkge31cbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIGhlYWRlcnM6IHtcbiAgICBjb21tb246IHtcbiAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJ1xuICAgIH0sXG4gICAgcGF0Y2g6IHV0aWxzLm1lcmdlKERFRkFVTFRfQ09OVEVOVF9UWVBFKSxcbiAgICBwb3N0OiB1dGlscy5tZXJnZShERUZBVUxUX0NPTlRFTlRfVFlQRSksXG4gICAgcHV0OiB1dGlscy5tZXJnZShERUZBVUxUX0NPTlRFTlRfVFlQRSlcbiAgfSxcblxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxuICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTidcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkuXG4gICAgcmVwbGFjZSgvJTQwL2dpLCAnQCcpLlxuICAgIHJlcGxhY2UoLyUzQS9naSwgJzonKS5cbiAgICByZXBsYWNlKC8lMjQvZywgJyQnKS5cbiAgICByZXBsYWNlKC8lMkMvZ2ksICcsJykuXG4gICAgcmVwbGFjZSgvJTIwL2csICcrJyk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCB1cmxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZFVybCh1cmwsIHBhcmFtcykge1xuICBpZiAoIXBhcmFtcykge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB2YXIgcGFydHMgPSBbXTtcblxuICB1dGlscy5mb3JFYWNoKHBhcmFtcywgZnVuY3Rpb24gKHZhbCwga2V5KSB7XG4gICAgaWYgKHZhbCA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXV0aWxzLmlzQXJyYXkodmFsKSkge1xuICAgICAgdmFsID0gW3ZhbF07XG4gICAgfVxuXG4gICAgdXRpbHMuZm9yRWFjaCh2YWwsIGZ1bmN0aW9uICh2KSB7XG4gICAgICBpZiAodXRpbHMuaXNEYXRlKHYpKSB7XG4gICAgICAgIHYgPSB2LnRvSVNPU3RyaW5nKCk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh1dGlscy5pc09iamVjdCh2KSkge1xuICAgICAgICB2ID0gSlNPTi5zdHJpbmdpZnkodik7XG4gICAgICB9XG4gICAgICBwYXJ0cy5wdXNoKGVuY29kZShrZXkpICsgJz0nICsgZW5jb2RlKHYpKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgaWYgKHBhcnRzLmxlbmd0aCA+IDApIHtcbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHBhcnRzLmpvaW4oJyYnKTtcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB3cml0ZTogZnVuY3Rpb24gd3JpdGUobmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlKSB7XG4gICAgdmFyIGNvb2tpZSA9IFtdO1xuICAgIGNvb2tpZS5wdXNoKG5hbWUgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcblxuICAgIGlmICh1dGlscy5pc051bWJlcihleHBpcmVzKSkge1xuICAgICAgY29va2llLnB1c2goJ2V4cGlyZXM9JyArIG5ldyBEYXRlKGV4cGlyZXMpLnRvR01UU3RyaW5nKCkpO1xuICAgIH1cblxuICAgIGlmICh1dGlscy5pc1N0cmluZyhwYXRoKSkge1xuICAgICAgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuICAgIH1cblxuICAgIGlmICh1dGlscy5pc1N0cmluZyhkb21haW4pKSB7XG4gICAgICBjb29raWUucHVzaCgnZG9tYWluPScgKyBkb21haW4pO1xuICAgIH1cblxuICAgIGlmIChzZWN1cmUgPT09IHRydWUpIHtcbiAgICAgIGNvb2tpZS5wdXNoKCdzZWN1cmUnKTtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUuam9pbignOyAnKTtcbiAgfSxcblxuICByZWFkOiBmdW5jdGlvbiByZWFkKG5hbWUpIHtcbiAgICB2YXIgbWF0Y2ggPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cCgnKF58O1xcXFxzKikoJyArIG5hbWUgKyAnKT0oW147XSopJykpO1xuICAgIHJldHVybiAobWF0Y2ggPyBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbM10pIDogbnVsbCk7XG4gIH0sXG5cbiAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUobmFtZSkge1xuICAgIHRoaXMud3JpdGUobmFtZSwgJycsIERhdGUubm93KCkgLSA4NjQwMDAwMCk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU3VwcGx5IGEgd2FybmluZyB0byB0aGUgZGV2ZWxvcGVyIHRoYXQgYSBtZXRob2QgdGhleSBhcmUgdXNpbmdcbiAqIGhhcyBiZWVuIGRlcHJlY2F0ZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1ldGhvZCBUaGUgbmFtZSBvZiB0aGUgZGVwcmVjYXRlZCBtZXRob2RcbiAqIEBwYXJhbSB7c3RyaW5nfSBbaW5zdGVhZF0gVGhlIGFsdGVybmF0ZSBtZXRob2QgdG8gdXNlIGlmIGFwcGxpY2FibGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBbZG9jc10gVGhlIGRvY3VtZW50YXRpb24gVVJMIHRvIGdldCBmdXJ0aGVyIGRldGFpbHNcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZXByZWNhdGVkTWV0aG9kKG1ldGhvZCwgaW5zdGVhZCwgZG9jcykge1xuICB0cnkge1xuICAgIGNvbnNvbGUud2FybihcbiAgICAgICdERVBSRUNBVEVEIG1ldGhvZCBgJyArIG1ldGhvZCArICdgLicgK1xuICAgICAgKGluc3RlYWQgPyAnIFVzZSBgJyArIGluc3RlYWQgKyAnYCBpbnN0ZWFkLicgOiAnJykgK1xuICAgICAgJyBUaGlzIG1ldGhvZCB3aWxsIGJlIHJlbW92ZWQgaW4gYSBmdXR1cmUgcmVsZWFzZS4nKTtcblxuICAgIGlmIChkb2NzKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0ZvciBtb3JlIGluZm9ybWF0aW9uIGFib3V0IHVzYWdlIHNlZSAnICsgZG9jcyk7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7fVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhoZWFkZXJzKSB7XG4gIHZhciBwYXJzZWQgPSB7fSwga2V5LCB2YWwsIGk7XG5cbiAgaWYgKCFoZWFkZXJzKSB7IHJldHVybiBwYXJzZWQ7IH1cblxuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMuc3BsaXQoJ1xcbicpLCBmdW5jdGlvbihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoMCwgaSkpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cihpICsgMSkpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFN5bnRhY3RpYyBzdWdhciBmb3IgaW52b2tpbmcgYSBmdW5jdGlvbiBhbmQgZXhwYW5kaW5nIGFuIGFycmF5IGZvciBhcmd1bWVudHMuXG4gKlxuICogQ29tbW9uIHVzZSBjYXNlIHdvdWxkIGJlIHRvIHVzZSBgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5YC5cbiAqXG4gKiAgYGBganNcbiAqICBmdW5jdGlvbiBmKHgsIHksIHopIHt9XG4gKiAgdmFyIGFyZ3MgPSBbMSwgMiwgM107XG4gKiAgZi5hcHBseShudWxsLCBhcmdzKTtcbiAqICBgYGBcbiAqXG4gKiBXaXRoIGBzcHJlYWRgIHRoaXMgZXhhbXBsZSBjYW4gYmUgcmUtd3JpdHRlbi5cbiAqXG4gKiAgYGBganNcbiAqICBzcHJlYWQoZnVuY3Rpb24oeCwgeSwgeikge30pKFsxLCAyLCAzXSk7XG4gKiAgYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzcHJlYWQoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChhcnIpIHtcbiAgICBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vKipcbiAqIFRyYW5zZm9ybSB0aGUgZGF0YSBmb3IgYSByZXF1ZXN0IG9yIGEgcmVzcG9uc2VcbiAqXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IGRhdGEgVGhlIGRhdGEgdG8gYmUgdHJhbnNmb3JtZWRcbiAqIEBwYXJhbSB7QXJyYXl9IGhlYWRlcnMgVGhlIGhlYWRlcnMgZm9yIHRoZSByZXF1ZXN0IG9yIHJlc3BvbnNlXG4gKiBAcGFyYW0ge0FycmF5fEZ1bmN0aW9ufSBmbnMgQSBzaW5nbGUgZnVuY3Rpb24gb3IgQXJyYXkgb2YgZnVuY3Rpb25zXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHJlc3VsdGluZyB0cmFuc2Zvcm1lZCBkYXRhXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdHJhbnNmb3JtRGF0YShkYXRhLCBoZWFkZXJzLCBmbnMpIHtcbiAgdXRpbHMuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIChmbikge1xuICAgIGRhdGEgPSBmbihkYXRhLCBoZWFkZXJzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRhdGE7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgbXNpZSA9IC8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG52YXIgdXJsUGFyc2luZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG52YXIgb3JpZ2luVXJsO1xuXG4vKipcbiAqIFBhcnNlIGEgVVJMIHRvIGRpc2NvdmVyIGl0J3MgY29tcG9uZW50c1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBiZSBwYXJzZWRcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIHVybFJlc29sdmUodXJsKSB7XG4gIHZhciBocmVmID0gdXJsO1xuXG4gIGlmIChtc2llKSB7XG4gICAgLy8gSUUgbmVlZHMgYXR0cmlidXRlIHNldCB0d2ljZSB0byBub3JtYWxpemUgcHJvcGVydGllc1xuICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICAgIGhyZWYgPSB1cmxQYXJzaW5nTm9kZS5ocmVmO1xuICB9XG5cbiAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG5cbiAgLy8gdXJsUGFyc2luZ05vZGUgcHJvdmlkZXMgdGhlIFVybFV0aWxzIGludGVyZmFjZSAtIGh0dHA6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmx1dGlsc1xuICByZXR1cm4ge1xuICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXG4gICAgcHJvdG9jb2w6IHVybFBhcnNpbmdOb2RlLnByb3RvY29sID8gdXJsUGFyc2luZ05vZGUucHJvdG9jb2wucmVwbGFjZSgvOiQvLCAnJykgOiAnJyxcbiAgICBob3N0OiB1cmxQYXJzaW5nTm9kZS5ob3N0LFxuICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcbiAgICBoYXNoOiB1cmxQYXJzaW5nTm9kZS5oYXNoID8gdXJsUGFyc2luZ05vZGUuaGFzaC5yZXBsYWNlKC9eIy8sICcnKSA6ICcnLFxuICAgIGhvc3RuYW1lOiB1cmxQYXJzaW5nTm9kZS5ob3N0bmFtZSxcbiAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxuICAgIHBhdGhuYW1lOiAodXJsUGFyc2luZ05vZGUucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpID9cbiAgICAgICAgICAgICAgdXJsUGFyc2luZ05vZGUucGF0aG5hbWUgOlxuICAgICAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICB9O1xufVxuXG5vcmlnaW5VcmwgPSB1cmxSZXNvbHZlKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiBhcyB0aGUgY3VycmVudCBsb2NhdGlvblxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSByZXF1ZXN0VXJsIFRoZSBVUkwgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4sIG90aGVyd2lzZSBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHVybElzU2FtZU9yaWdpbihyZXF1ZXN0VXJsKSB7XG4gIHZhciBwYXJzZWQgPSAodXRpbHMuaXNTdHJpbmcocmVxdWVzdFVybCkpID8gdXJsUmVzb2x2ZShyZXF1ZXN0VXJsKSA6IHJlcXVlc3RVcmw7XG4gIHJldHVybiAocGFyc2VkLnByb3RvY29sID09PSBvcmlnaW5VcmwucHJvdG9jb2wgJiZcbiAgICAgICAgcGFyc2VkLmhvc3QgPT09IG9yaWdpblVybC5ob3N0KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qZ2xvYmFsIHRvU3RyaW5nOnRydWUqL1xuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5KHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBGb3JtRGF0YSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRm9ybURhdGEodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZvcm1EYXRhXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlclZpZXcodmFsKSB7XG4gIGlmICgodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJykgJiYgKEFycmF5QnVmZmVyLmlzVmlldykpIHtcbiAgICByZXR1cm4gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAodmFsLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKTtcbiAgfVxufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBOdW1iZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc051bWJlcih2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdudW1iZXInO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRGF0ZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRGF0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRGF0ZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRmlsZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRmlsZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQmxvYiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQmxvYih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQmxvYl0nO1xufVxuXG4vKipcbiAqIFRyaW0gZXhjZXNzIHdoaXRlc3BhY2Ugb2ZmIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byB0cmltXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgU3RyaW5nIGZyZWVkIG9mIGV4Y2VzcyB3aGl0ZXNwYWNlXG4gKi9cbmZ1bmN0aW9uIHRyaW0oc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyovLCAnJykucmVwbGFjZSgvXFxzKiQvLCAnJyk7XG59XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIEFycmF5IG9yIGFuIE9iamVjdCBpbnZva2luZyBhIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgYG9iamAgaXMgYW4gQXJyYXkgb3IgYXJndW1lbnRzIGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBmbikge1xuICAvLyBEb24ndCBib3RoZXIgaWYgbm8gdmFsdWUgcHJvdmlkZWRcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIENoZWNrIGlmIG9iaiBpcyBhcnJheS1saWtlXG4gIHZhciBpc0FycmF5TGlrZSA9IGlzQXJyYXkob2JqKSB8fCAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgIWlzTmFOKG9iai5sZW5ndGgpKTtcblxuICAvLyBGb3JjZSBhbiBhcnJheSBpZiBub3QgYWxyZWFkeSBzb21ldGhpbmcgaXRlcmFibGVcbiAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnICYmICFpc0FycmF5TGlrZSkge1xuICAgIG9iaiA9IFtvYmpdO1xuICB9XG5cbiAgLy8gSXRlcmF0ZSBvdmVyIGFycmF5IHZhbHVlc1xuICBpZiAoaXNBcnJheUxpa2UpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIH1cbiAgfVxuICAvLyBJdGVyYXRlIG92ZXIgb2JqZWN0IGtleXNcbiAgZWxzZSB7XG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBBY2NlcHRzIHZhcmFyZ3MgZXhwZWN0aW5nIGVhY2ggYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0LCB0aGVuXG4gKiBpbW11dGFibHkgbWVyZ2VzIHRoZSBwcm9wZXJ0aWVzIG9mIGVhY2ggb2JqZWN0IGFuZCByZXR1cm5zIHJlc3VsdC5cbiAqXG4gKiBXaGVuIG11bHRpcGxlIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBrZXkgdGhlIGxhdGVyIG9iamVjdCBpblxuICogdGhlIGFyZ3VtZW50cyBsaXN0IHdpbGwgdGFrZSBwcmVjZWRlbmNlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciByZXN1bHQgPSBtZXJnZSh7Zm9vOiAxMjN9LCB7Zm9vOiA0NTZ9KTtcbiAqIGNvbnNvbGUubG9nKHJlc3VsdC5mb28pOyAvLyBvdXRwdXRzIDQ1NlxuICogYGBgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoLypvYmoxLCBvYmoyLCBvYmozLCAuLi4qLykge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGZvckVhY2goYXJndW1lbnRzLCBmdW5jdGlvbiAob2JqKSB7XG4gICAgZm9yRWFjaChvYmosIGZ1bmN0aW9uICh2YWwsIGtleSkge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWw7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNBcnJheTogaXNBcnJheSxcbiAgaXNBcnJheUJ1ZmZlcjogaXNBcnJheUJ1ZmZlcixcbiAgaXNGb3JtRGF0YTogaXNGb3JtRGF0YSxcbiAgaXNBcnJheUJ1ZmZlclZpZXc6IGlzQXJyYXlCdWZmZXJWaWV3LFxuICBpc1N0cmluZzogaXNTdHJpbmcsXG4gIGlzTnVtYmVyOiBpc051bWJlcixcbiAgaXNPYmplY3Q6IGlzT2JqZWN0LFxuICBpc1VuZGVmaW5lZDogaXNVbmRlZmluZWQsXG4gIGlzRGF0ZTogaXNEYXRlLFxuICBpc0ZpbGU6IGlzRmlsZSxcbiAgaXNCbG9iOiBpc0Jsb2IsXG4gIGZvckVhY2g6IGZvckVhY2gsXG4gIG1lcmdlOiBtZXJnZSxcbiAgdHJpbTogdHJpbVxufTtcbiIsIi8qIVxuICogQG92ZXJ2aWV3IGVzNi1wcm9taXNlIC0gYSB0aW55IGltcGxlbWVudGF0aW9uIG9mIFByb21pc2VzL0ErLlxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgKGMpIDIwMTQgWWVodWRhIEthdHosIFRvbSBEYWxlLCBTdGVmYW4gUGVubmVyIGFuZCBjb250cmlidXRvcnMgKENvbnZlcnNpb24gdG8gRVM2IEFQSSBieSBKYWtlIEFyY2hpYmFsZClcbiAqIEBsaWNlbnNlICAgTGljZW5zZWQgdW5kZXIgTUlUIGxpY2Vuc2VcbiAqICAgICAgICAgICAgU2VlIGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9qYWtlYXJjaGliYWxkL2VzNi1wcm9taXNlL21hc3Rlci9MSUNFTlNFXG4gKiBAdmVyc2lvbiAgIDIuMy4wXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSR1dGlscyQkb2JqZWN0T3JGdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHggPT09ICdmdW5jdGlvbicgfHwgKHR5cGVvZiB4ID09PSAnb2JqZWN0JyAmJiB4ICE9PSBudWxsKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkdXRpbHMkJGlzRnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSR1dGlscyQkaXNNYXliZVRoZW5hYmxlKHgpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgeCA9PT0gJ29iamVjdCcgJiYgeCAhPT0gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJHV0aWxzJCRfaXNBcnJheTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkpIHtcbiAgICAgIGxpYiRlczYkcHJvbWlzZSR1dGlscyQkX2lzQXJyYXkgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBBcnJheV0nO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGliJGVzNiRwcm9taXNlJHV0aWxzJCRfaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG4gICAgfVxuXG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSR1dGlscyQkaXNBcnJheSA9IGxpYiRlczYkcHJvbWlzZSR1dGlscyQkX2lzQXJyYXk7XG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRsZW4gPSAwO1xuICAgIHZhciBsaWIkZXM2JHByb21pc2UkYXNhcCQkdG9TdHJpbmcgPSB7fS50b1N0cmluZztcbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJGFzYXAkJHZlcnR4TmV4dDtcbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJGFzYXAkJGN1c3RvbVNjaGVkdWxlckZuO1xuXG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRhc2FwID0gZnVuY3Rpb24gYXNhcChjYWxsYmFjaywgYXJnKSB7XG4gICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkcXVldWVbbGliJGVzNiRwcm9taXNlJGFzYXAkJGxlbl0gPSBjYWxsYmFjaztcbiAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRxdWV1ZVtsaWIkZXM2JHByb21pc2UkYXNhcCQkbGVuICsgMV0gPSBhcmc7XG4gICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkbGVuICs9IDI7XG4gICAgICBpZiAobGliJGVzNiRwcm9taXNlJGFzYXAkJGxlbiA9PT0gMikge1xuICAgICAgICAvLyBJZiBsZW4gaXMgMiwgdGhhdCBtZWFucyB0aGF0IHdlIG5lZWQgdG8gc2NoZWR1bGUgYW4gYXN5bmMgZmx1c2guXG4gICAgICAgIC8vIElmIGFkZGl0aW9uYWwgY2FsbGJhY2tzIGFyZSBxdWV1ZWQgYmVmb3JlIHRoZSBxdWV1ZSBpcyBmbHVzaGVkLCB0aGV5XG4gICAgICAgIC8vIHdpbGwgYmUgcHJvY2Vzc2VkIGJ5IHRoaXMgZmx1c2ggdGhhdCB3ZSBhcmUgc2NoZWR1bGluZy5cbiAgICAgICAgaWYgKGxpYiRlczYkcHJvbWlzZSRhc2FwJCRjdXN0b21TY2hlZHVsZXJGbikge1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRjdXN0b21TY2hlZHVsZXJGbihsaWIkZXM2JHByb21pc2UkYXNhcCQkZmx1c2gpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRzY2hlZHVsZUZsdXNoKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkYXNhcCQkc2V0U2NoZWR1bGVyKHNjaGVkdWxlRm4pIHtcbiAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRjdXN0b21TY2hlZHVsZXJGbiA9IHNjaGVkdWxlRm47XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJGFzYXAkJHNldEFzYXAoYXNhcEZuKSB7XG4gICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkYXNhcCA9IGFzYXBGbjtcbiAgICB9XG5cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJGFzYXAkJGJyb3dzZXJXaW5kb3cgPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpID8gd2luZG93IDogdW5kZWZpbmVkO1xuICAgIHZhciBsaWIkZXM2JHByb21pc2UkYXNhcCQkYnJvd3Nlckdsb2JhbCA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRicm93c2VyV2luZG93IHx8IHt9O1xuICAgIHZhciBsaWIkZXM2JHByb21pc2UkYXNhcCQkQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIgPSBsaWIkZXM2JHByb21pc2UkYXNhcCQkYnJvd3Nlckdsb2JhbC5NdXRhdGlvbk9ic2VydmVyIHx8IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRicm93c2VyR2xvYmFsLldlYktpdE11dGF0aW9uT2JzZXJ2ZXI7XG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRpc05vZGUgPSB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYge30udG9TdHJpbmcuY2FsbChwcm9jZXNzKSA9PT0gJ1tvYmplY3QgcHJvY2Vzc10nO1xuXG4gICAgLy8gdGVzdCBmb3Igd2ViIHdvcmtlciBidXQgbm90IGluIElFMTBcbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJGFzYXAkJGlzV29ya2VyID0gdHlwZW9mIFVpbnQ4Q2xhbXBlZEFycmF5ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgdHlwZW9mIGltcG9ydFNjcmlwdHMgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICB0eXBlb2YgTWVzc2FnZUNoYW5uZWwgIT09ICd1bmRlZmluZWQnO1xuXG4gICAgLy8gbm9kZVxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRhc2FwJCR1c2VOZXh0VGljaygpIHtcbiAgICAgIHZhciBuZXh0VGljayA9IHByb2Nlc3MubmV4dFRpY2s7XG4gICAgICAvLyBub2RlIHZlcnNpb24gMC4xMC54IGRpc3BsYXlzIGEgZGVwcmVjYXRpb24gd2FybmluZyB3aGVuIG5leHRUaWNrIGlzIHVzZWQgcmVjdXJzaXZlbHlcbiAgICAgIC8vIHNldEltbWVkaWF0ZSBzaG91bGQgYmUgdXNlZCBpbnN0ZWFkIGluc3RlYWRcbiAgICAgIHZhciB2ZXJzaW9uID0gcHJvY2Vzcy52ZXJzaW9ucy5ub2RlLm1hdGNoKC9eKD86KFxcZCspXFwuKT8oPzooXFxkKylcXC4pPyhcXCp8XFxkKykkLyk7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh2ZXJzaW9uKSAmJiB2ZXJzaW9uWzFdID09PSAnMCcgJiYgdmVyc2lvblsyXSA9PT0gJzEwJykge1xuICAgICAgICBuZXh0VGljayA9IHNldEltbWVkaWF0ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgbmV4dFRpY2sobGliJGVzNiRwcm9taXNlJGFzYXAkJGZsdXNoKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gdmVydHhcbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkYXNhcCQkdXNlVmVydHhUaW1lcigpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJHZlcnR4TmV4dChsaWIkZXM2JHByb21pc2UkYXNhcCQkZmx1c2gpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkYXNhcCQkdXNlTXV0YXRpb25PYnNlcnZlcigpIHtcbiAgICAgIHZhciBpdGVyYXRpb25zID0gMDtcbiAgICAgIHZhciBvYnNlcnZlciA9IG5ldyBsaWIkZXM2JHByb21pc2UkYXNhcCQkQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIobGliJGVzNiRwcm9taXNlJGFzYXAkJGZsdXNoKTtcbiAgICAgIHZhciBub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShub2RlLCB7IGNoYXJhY3RlckRhdGE6IHRydWUgfSk7XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgbm9kZS5kYXRhID0gKGl0ZXJhdGlvbnMgPSArK2l0ZXJhdGlvbnMgJSAyKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gd2ViIHdvcmtlclxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRhc2FwJCR1c2VNZXNzYWdlQ2hhbm5lbCgpIHtcbiAgICAgIHZhciBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRmbHVzaDtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNoYW5uZWwucG9ydDIucG9zdE1lc3NhZ2UoMCk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRhc2FwJCR1c2VTZXRUaW1lb3V0KCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBzZXRUaW1lb3V0KGxpYiRlczYkcHJvbWlzZSRhc2FwJCRmbHVzaCwgMSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkYXNhcCQkcXVldWUgPSBuZXcgQXJyYXkoMTAwMCk7XG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJGFzYXAkJGZsdXNoKCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaWIkZXM2JHByb21pc2UkYXNhcCQkbGVuOyBpKz0yKSB7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRxdWV1ZVtpXTtcbiAgICAgICAgdmFyIGFyZyA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRxdWV1ZVtpKzFdO1xuXG4gICAgICAgIGNhbGxiYWNrKGFyZyk7XG5cbiAgICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJHF1ZXVlW2ldID0gdW5kZWZpbmVkO1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkcXVldWVbaSsxXSA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJGxlbiA9IDA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJGFzYXAkJGF0dGVtcHRWZXJ0ZXgoKSB7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgciA9IHJlcXVpcmU7XG4gICAgICAgIHZhciB2ZXJ0eCA9IHIoJ3ZlcnR4Jyk7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCR2ZXJ0eE5leHQgPSB2ZXJ0eC5ydW5Pbkxvb3AgfHwgdmVydHgucnVuT25Db250ZXh0O1xuICAgICAgICByZXR1cm4gbGliJGVzNiRwcm9taXNlJGFzYXAkJHVzZVZlcnR4VGltZXIoKTtcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICByZXR1cm4gbGliJGVzNiRwcm9taXNlJGFzYXAkJHVzZVNldFRpbWVvdXQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJGFzYXAkJHNjaGVkdWxlRmx1c2g7XG4gICAgLy8gRGVjaWRlIHdoYXQgYXN5bmMgbWV0aG9kIHRvIHVzZSB0byB0cmlnZ2VyaW5nIHByb2Nlc3Npbmcgb2YgcXVldWVkIGNhbGxiYWNrczpcbiAgICBpZiAobGliJGVzNiRwcm9taXNlJGFzYXAkJGlzTm9kZSkge1xuICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJHNjaGVkdWxlRmx1c2ggPSBsaWIkZXM2JHByb21pc2UkYXNhcCQkdXNlTmV4dFRpY2soKTtcbiAgICB9IGVsc2UgaWYgKGxpYiRlczYkcHJvbWlzZSRhc2FwJCRCcm93c2VyTXV0YXRpb25PYnNlcnZlcikge1xuICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJHNjaGVkdWxlRmx1c2ggPSBsaWIkZXM2JHByb21pc2UkYXNhcCQkdXNlTXV0YXRpb25PYnNlcnZlcigpO1xuICAgIH0gZWxzZSBpZiAobGliJGVzNiRwcm9taXNlJGFzYXAkJGlzV29ya2VyKSB7XG4gICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkc2NoZWR1bGVGbHVzaCA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCR1c2VNZXNzYWdlQ2hhbm5lbCgpO1xuICAgIH0gZWxzZSBpZiAobGliJGVzNiRwcm9taXNlJGFzYXAkJGJyb3dzZXJXaW5kb3cgPT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgcmVxdWlyZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJHNjaGVkdWxlRmx1c2ggPSBsaWIkZXM2JHByb21pc2UkYXNhcCQkYXR0ZW1wdFZlcnRleCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkc2NoZWR1bGVGbHVzaCA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCR1c2VTZXRUaW1lb3V0KCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkbm9vcCgpIHt9XG5cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUEVORElORyAgID0gdm9pZCAwO1xuICAgIHZhciBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRGVUxGSUxMRUQgPSAxO1xuICAgIHZhciBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRSRUpFQ1RFRCAgPSAyO1xuXG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEdFVF9USEVOX0VSUk9SID0gbmV3IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEVycm9yT2JqZWN0KCk7XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRzZWxmRnVsbGZpbGxtZW50KCkge1xuICAgICAgcmV0dXJuIG5ldyBUeXBlRXJyb3IoXCJZb3UgY2Fubm90IHJlc29sdmUgYSBwcm9taXNlIHdpdGggaXRzZWxmXCIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGNhbm5vdFJldHVybk93bigpIHtcbiAgICAgIHJldHVybiBuZXcgVHlwZUVycm9yKCdBIHByb21pc2VzIGNhbGxiYWNrIGNhbm5vdCByZXR1cm4gdGhhdCBzYW1lIHByb21pc2UuJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkZ2V0VGhlbihwcm9taXNlKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuO1xuICAgICAgfSBjYXRjaChlcnJvcikge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRHRVRfVEhFTl9FUlJPUi5lcnJvciA9IGVycm9yO1xuICAgICAgICByZXR1cm4gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkR0VUX1RIRU5fRVJST1I7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkdHJ5VGhlbih0aGVuLCB2YWx1ZSwgZnVsZmlsbG1lbnRIYW5kbGVyLCByZWplY3Rpb25IYW5kbGVyKSB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGVuLmNhbGwodmFsdWUsIGZ1bGZpbGxtZW50SGFuZGxlciwgcmVqZWN0aW9uSGFuZGxlcik7XG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgcmV0dXJuIGU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkaGFuZGxlRm9yZWlnblRoZW5hYmxlKHByb21pc2UsIHRoZW5hYmxlLCB0aGVuKSB7XG4gICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJGFzYXAoZnVuY3Rpb24ocHJvbWlzZSkge1xuICAgICAgICB2YXIgc2VhbGVkID0gZmFsc2U7XG4gICAgICAgIHZhciBlcnJvciA9IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHRyeVRoZW4odGhlbiwgdGhlbmFibGUsIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgaWYgKHNlYWxlZCkgeyByZXR1cm47IH1cbiAgICAgICAgICBzZWFsZWQgPSB0cnVlO1xuICAgICAgICAgIGlmICh0aGVuYWJsZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlc29sdmUocHJvbWlzZSwgdmFsdWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRmdWxmaWxsKHByb21pc2UsIHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIGZ1bmN0aW9uKHJlYXNvbikge1xuICAgICAgICAgIGlmIChzZWFsZWQpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgc2VhbGVkID0gdHJ1ZTtcblxuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCByZWFzb24pO1xuICAgICAgICB9LCAnU2V0dGxlOiAnICsgKHByb21pc2UuX2xhYmVsIHx8ICcgdW5rbm93biBwcm9taXNlJykpO1xuXG4gICAgICAgIGlmICghc2VhbGVkICYmIGVycm9yKSB7XG4gICAgICAgICAgc2VhbGVkID0gdHJ1ZTtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgZXJyb3IpO1xuICAgICAgICB9XG4gICAgICB9LCBwcm9taXNlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRoYW5kbGVPd25UaGVuYWJsZShwcm9taXNlLCB0aGVuYWJsZSkge1xuICAgICAgaWYgKHRoZW5hYmxlLl9zdGF0ZSA9PT0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkRlVMRklMTEVEKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGZ1bGZpbGwocHJvbWlzZSwgdGhlbmFibGUuX3Jlc3VsdCk7XG4gICAgICB9IGVsc2UgaWYgKHRoZW5hYmxlLl9zdGF0ZSA9PT0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUkVKRUNURUQpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIHRoZW5hYmxlLl9yZXN1bHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkc3Vic2NyaWJlKHRoZW5hYmxlLCB1bmRlZmluZWQsIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVzb2x2ZShwcm9taXNlLCB2YWx1ZSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKHJlYXNvbikge1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCByZWFzb24pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRoYW5kbGVNYXliZVRoZW5hYmxlKHByb21pc2UsIG1heWJlVGhlbmFibGUpIHtcbiAgICAgIGlmIChtYXliZVRoZW5hYmxlLmNvbnN0cnVjdG9yID09PSBwcm9taXNlLmNvbnN0cnVjdG9yKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGhhbmRsZU93blRoZW5hYmxlKHByb21pc2UsIG1heWJlVGhlbmFibGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHRoZW4gPSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRnZXRUaGVuKG1heWJlVGhlbmFibGUpO1xuXG4gICAgICAgIGlmICh0aGVuID09PSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRHRVRfVEhFTl9FUlJPUikge1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRHRVRfVEhFTl9FUlJPUi5lcnJvcik7XG4gICAgICAgIH0gZWxzZSBpZiAodGhlbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkZnVsZmlsbChwcm9taXNlLCBtYXliZVRoZW5hYmxlKTtcbiAgICAgICAgfSBlbHNlIGlmIChsaWIkZXM2JHByb21pc2UkdXRpbHMkJGlzRnVuY3Rpb24odGhlbikpIHtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRoYW5kbGVGb3JlaWduVGhlbmFibGUocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSwgdGhlbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkZnVsZmlsbChwcm9taXNlLCBtYXliZVRoZW5hYmxlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlc29sdmUocHJvbWlzZSwgdmFsdWUpIHtcbiAgICAgIGlmIChwcm9taXNlID09PSB2YWx1ZSkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkc2VsZkZ1bGxmaWxsbWVudCgpKTtcbiAgICAgIH0gZWxzZSBpZiAobGliJGVzNiRwcm9taXNlJHV0aWxzJCRvYmplY3RPckZ1bmN0aW9uKHZhbHVlKSkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRoYW5kbGVNYXliZVRoZW5hYmxlKHByb21pc2UsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGZ1bGZpbGwocHJvbWlzZSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHB1Ymxpc2hSZWplY3Rpb24ocHJvbWlzZSkge1xuICAgICAgaWYgKHByb21pc2UuX29uZXJyb3IpIHtcbiAgICAgICAgcHJvbWlzZS5fb25lcnJvcihwcm9taXNlLl9yZXN1bHQpO1xuICAgICAgfVxuXG4gICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRwdWJsaXNoKHByb21pc2UpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGZ1bGZpbGwocHJvbWlzZSwgdmFsdWUpIHtcbiAgICAgIGlmIChwcm9taXNlLl9zdGF0ZSAhPT0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUEVORElORykgeyByZXR1cm47IH1cblxuICAgICAgcHJvbWlzZS5fcmVzdWx0ID0gdmFsdWU7XG4gICAgICBwcm9taXNlLl9zdGF0ZSA9IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEZVTEZJTExFRDtcblxuICAgICAgaWYgKHByb21pc2UuX3N1YnNjcmliZXJzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkYXNhcChsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRwdWJsaXNoLCBwcm9taXNlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgcmVhc29uKSB7XG4gICAgICBpZiAocHJvbWlzZS5fc3RhdGUgIT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFBFTkRJTkcpIHsgcmV0dXJuOyB9XG4gICAgICBwcm9taXNlLl9zdGF0ZSA9IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFJFSkVDVEVEO1xuICAgICAgcHJvbWlzZS5fcmVzdWx0ID0gcmVhc29uO1xuXG4gICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkYXNhcChsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRwdWJsaXNoUmVqZWN0aW9uLCBwcm9taXNlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRzdWJzY3JpYmUocGFyZW50LCBjaGlsZCwgb25GdWxmaWxsbWVudCwgb25SZWplY3Rpb24pIHtcbiAgICAgIHZhciBzdWJzY3JpYmVycyA9IHBhcmVudC5fc3Vic2NyaWJlcnM7XG4gICAgICB2YXIgbGVuZ3RoID0gc3Vic2NyaWJlcnMubGVuZ3RoO1xuXG4gICAgICBwYXJlbnQuX29uZXJyb3IgPSBudWxsO1xuXG4gICAgICBzdWJzY3JpYmVyc1tsZW5ndGhdID0gY2hpbGQ7XG4gICAgICBzdWJzY3JpYmVyc1tsZW5ndGggKyBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRGVUxGSUxMRURdID0gb25GdWxmaWxsbWVudDtcbiAgICAgIHN1YnNjcmliZXJzW2xlbmd0aCArIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFJFSkVDVEVEXSAgPSBvblJlamVjdGlvbjtcblxuICAgICAgaWYgKGxlbmd0aCA9PT0gMCAmJiBwYXJlbnQuX3N0YXRlKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRhc2FwKGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHB1Ymxpc2gsIHBhcmVudCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcHVibGlzaChwcm9taXNlKSB7XG4gICAgICB2YXIgc3Vic2NyaWJlcnMgPSBwcm9taXNlLl9zdWJzY3JpYmVycztcbiAgICAgIHZhciBzZXR0bGVkID0gcHJvbWlzZS5fc3RhdGU7XG5cbiAgICAgIGlmIChzdWJzY3JpYmVycy5sZW5ndGggPT09IDApIHsgcmV0dXJuOyB9XG5cbiAgICAgIHZhciBjaGlsZCwgY2FsbGJhY2ssIGRldGFpbCA9IHByb21pc2UuX3Jlc3VsdDtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdWJzY3JpYmVycy5sZW5ndGg7IGkgKz0gMykge1xuICAgICAgICBjaGlsZCA9IHN1YnNjcmliZXJzW2ldO1xuICAgICAgICBjYWxsYmFjayA9IHN1YnNjcmliZXJzW2kgKyBzZXR0bGVkXTtcblxuICAgICAgICBpZiAoY2hpbGQpIHtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRpbnZva2VDYWxsYmFjayhzZXR0bGVkLCBjaGlsZCwgY2FsbGJhY2ssIGRldGFpbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2FsbGJhY2soZGV0YWlsKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBwcm9taXNlLl9zdWJzY3JpYmVycy5sZW5ndGggPSAwO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEVycm9yT2JqZWN0KCkge1xuICAgICAgdGhpcy5lcnJvciA9IG51bGw7XG4gICAgfVxuXG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFRSWV9DQVRDSF9FUlJPUiA9IG5ldyBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRFcnJvck9iamVjdCgpO1xuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkdHJ5Q2F0Y2goY2FsbGJhY2ssIGRldGFpbCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGRldGFpbCk7XG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkVFJZX0NBVENIX0VSUk9SLmVycm9yID0gZTtcbiAgICAgICAgcmV0dXJuIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFRSWV9DQVRDSF9FUlJPUjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRpbnZva2VDYWxsYmFjayhzZXR0bGVkLCBwcm9taXNlLCBjYWxsYmFjaywgZGV0YWlsKSB7XG4gICAgICB2YXIgaGFzQ2FsbGJhY2sgPSBsaWIkZXM2JHByb21pc2UkdXRpbHMkJGlzRnVuY3Rpb24oY2FsbGJhY2spLFxuICAgICAgICAgIHZhbHVlLCBlcnJvciwgc3VjY2VlZGVkLCBmYWlsZWQ7XG5cbiAgICAgIGlmIChoYXNDYWxsYmFjaykge1xuICAgICAgICB2YWx1ZSA9IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHRyeUNhdGNoKGNhbGxiYWNrLCBkZXRhaWwpO1xuXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkVFJZX0NBVENIX0VSUk9SKSB7XG4gICAgICAgICAgZmFpbGVkID0gdHJ1ZTtcbiAgICAgICAgICBlcnJvciA9IHZhbHVlLmVycm9yO1xuICAgICAgICAgIHZhbHVlID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdWNjZWVkZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb21pc2UgPT09IHZhbHVlKSB7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGNhbm5vdFJldHVybk93bigpKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBkZXRhaWw7XG4gICAgICAgIHN1Y2NlZWRlZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9taXNlLl9zdGF0ZSAhPT0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUEVORElORykge1xuICAgICAgICAvLyBub29wXG4gICAgICB9IGVsc2UgaWYgKGhhc0NhbGxiYWNrICYmIHN1Y2NlZWRlZCkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZXNvbHZlKHByb21pc2UsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoZmFpbGVkKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCBlcnJvcik7XG4gICAgICB9IGVsc2UgaWYgKHNldHRsZWQgPT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEZVTEZJTExFRCkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRmdWxmaWxsKHByb21pc2UsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoc2V0dGxlZCA9PT0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUkVKRUNURUQpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRpbml0aWFsaXplUHJvbWlzZShwcm9taXNlLCByZXNvbHZlcikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVzb2x2ZXIoZnVuY3Rpb24gcmVzb2x2ZVByb21pc2UodmFsdWUpe1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlc29sdmUocHJvbWlzZSwgdmFsdWUpO1xuICAgICAgICB9LCBmdW5jdGlvbiByZWplY3RQcm9taXNlKHJlYXNvbikge1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCByZWFzb24pO1xuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJGVudW1lcmF0b3IkJEVudW1lcmF0b3IoQ29uc3RydWN0b3IsIGlucHV0KSB7XG4gICAgICB2YXIgZW51bWVyYXRvciA9IHRoaXM7XG5cbiAgICAgIGVudW1lcmF0b3IuX2luc3RhbmNlQ29uc3RydWN0b3IgPSBDb25zdHJ1Y3RvcjtcbiAgICAgIGVudW1lcmF0b3IucHJvbWlzZSA9IG5ldyBDb25zdHJ1Y3RvcihsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRub29wKTtcblxuICAgICAgaWYgKGVudW1lcmF0b3IuX3ZhbGlkYXRlSW5wdXQoaW5wdXQpKSB7XG4gICAgICAgIGVudW1lcmF0b3IuX2lucHV0ICAgICA9IGlucHV0O1xuICAgICAgICBlbnVtZXJhdG9yLmxlbmd0aCAgICAgPSBpbnB1dC5sZW5ndGg7XG4gICAgICAgIGVudW1lcmF0b3IuX3JlbWFpbmluZyA9IGlucHV0Lmxlbmd0aDtcblxuICAgICAgICBlbnVtZXJhdG9yLl9pbml0KCk7XG5cbiAgICAgICAgaWYgKGVudW1lcmF0b3IubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkZnVsZmlsbChlbnVtZXJhdG9yLnByb21pc2UsIGVudW1lcmF0b3IuX3Jlc3VsdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZW51bWVyYXRvci5sZW5ndGggPSBlbnVtZXJhdG9yLmxlbmd0aCB8fCAwO1xuICAgICAgICAgIGVudW1lcmF0b3IuX2VudW1lcmF0ZSgpO1xuICAgICAgICAgIGlmIChlbnVtZXJhdG9yLl9yZW1haW5pbmcgPT09IDApIHtcbiAgICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGZ1bGZpbGwoZW51bWVyYXRvci5wcm9taXNlLCBlbnVtZXJhdG9yLl9yZXN1bHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KGVudW1lcmF0b3IucHJvbWlzZSwgZW51bWVyYXRvci5fdmFsaWRhdGlvbkVycm9yKCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxpYiRlczYkcHJvbWlzZSRlbnVtZXJhdG9yJCRFbnVtZXJhdG9yLnByb3RvdHlwZS5fdmFsaWRhdGVJbnB1dCA9IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICByZXR1cm4gbGliJGVzNiRwcm9taXNlJHV0aWxzJCRpc0FycmF5KGlucHV0KTtcbiAgICB9O1xuXG4gICAgbGliJGVzNiRwcm9taXNlJGVudW1lcmF0b3IkJEVudW1lcmF0b3IucHJvdG90eXBlLl92YWxpZGF0aW9uRXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoJ0FycmF5IE1ldGhvZHMgbXVzdCBiZSBwcm92aWRlZCBhbiBBcnJheScpO1xuICAgIH07XG5cbiAgICBsaWIkZXM2JHByb21pc2UkZW51bWVyYXRvciQkRW51bWVyYXRvci5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuX3Jlc3VsdCA9IG5ldyBBcnJheSh0aGlzLmxlbmd0aCk7XG4gICAgfTtcblxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkZW51bWVyYXRvciQkZGVmYXVsdCA9IGxpYiRlczYkcHJvbWlzZSRlbnVtZXJhdG9yJCRFbnVtZXJhdG9yO1xuXG4gICAgbGliJGVzNiRwcm9taXNlJGVudW1lcmF0b3IkJEVudW1lcmF0b3IucHJvdG90eXBlLl9lbnVtZXJhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBlbnVtZXJhdG9yID0gdGhpcztcblxuICAgICAgdmFyIGxlbmd0aCAgPSBlbnVtZXJhdG9yLmxlbmd0aDtcbiAgICAgIHZhciBwcm9taXNlID0gZW51bWVyYXRvci5wcm9taXNlO1xuICAgICAgdmFyIGlucHV0ICAgPSBlbnVtZXJhdG9yLl9pbnB1dDtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IHByb21pc2UuX3N0YXRlID09PSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRQRU5ESU5HICYmIGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBlbnVtZXJhdG9yLl9lYWNoRW50cnkoaW5wdXRbaV0sIGkpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBsaWIkZXM2JHByb21pc2UkZW51bWVyYXRvciQkRW51bWVyYXRvci5wcm90b3R5cGUuX2VhY2hFbnRyeSA9IGZ1bmN0aW9uKGVudHJ5LCBpKSB7XG4gICAgICB2YXIgZW51bWVyYXRvciA9IHRoaXM7XG4gICAgICB2YXIgYyA9IGVudW1lcmF0b3IuX2luc3RhbmNlQ29uc3RydWN0b3I7XG5cbiAgICAgIGlmIChsaWIkZXM2JHByb21pc2UkdXRpbHMkJGlzTWF5YmVUaGVuYWJsZShlbnRyeSkpIHtcbiAgICAgICAgaWYgKGVudHJ5LmNvbnN0cnVjdG9yID09PSBjICYmIGVudHJ5Ll9zdGF0ZSAhPT0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUEVORElORykge1xuICAgICAgICAgIGVudHJ5Ll9vbmVycm9yID0gbnVsbDtcbiAgICAgICAgICBlbnVtZXJhdG9yLl9zZXR0bGVkQXQoZW50cnkuX3N0YXRlLCBpLCBlbnRyeS5fcmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbnVtZXJhdG9yLl93aWxsU2V0dGxlQXQoYy5yZXNvbHZlKGVudHJ5KSwgaSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVudW1lcmF0b3IuX3JlbWFpbmluZy0tO1xuICAgICAgICBlbnVtZXJhdG9yLl9yZXN1bHRbaV0gPSBlbnRyeTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbGliJGVzNiRwcm9taXNlJGVudW1lcmF0b3IkJEVudW1lcmF0b3IucHJvdG90eXBlLl9zZXR0bGVkQXQgPSBmdW5jdGlvbihzdGF0ZSwgaSwgdmFsdWUpIHtcbiAgICAgIHZhciBlbnVtZXJhdG9yID0gdGhpcztcbiAgICAgIHZhciBwcm9taXNlID0gZW51bWVyYXRvci5wcm9taXNlO1xuXG4gICAgICBpZiAocHJvbWlzZS5fc3RhdGUgPT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFBFTkRJTkcpIHtcbiAgICAgICAgZW51bWVyYXRvci5fcmVtYWluaW5nLS07XG5cbiAgICAgICAgaWYgKHN0YXRlID09PSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRSRUpFQ1RFRCkge1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCB2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZW51bWVyYXRvci5fcmVzdWx0W2ldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGVudW1lcmF0b3IuX3JlbWFpbmluZyA9PT0gMCkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRmdWxmaWxsKHByb21pc2UsIGVudW1lcmF0b3IuX3Jlc3VsdCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxpYiRlczYkcHJvbWlzZSRlbnVtZXJhdG9yJCRFbnVtZXJhdG9yLnByb3RvdHlwZS5fd2lsbFNldHRsZUF0ID0gZnVuY3Rpb24ocHJvbWlzZSwgaSkge1xuICAgICAgdmFyIGVudW1lcmF0b3IgPSB0aGlzO1xuXG4gICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRzdWJzY3JpYmUocHJvbWlzZSwgdW5kZWZpbmVkLCBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICBlbnVtZXJhdG9yLl9zZXR0bGVkQXQobGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkRlVMRklMTEVELCBpLCB2YWx1ZSk7XG4gICAgICB9LCBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAgICAgZW51bWVyYXRvci5fc2V0dGxlZEF0KGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFJFSkVDVEVELCBpLCByZWFzb24pO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRhbGwkJGFsbChlbnRyaWVzKSB7XG4gICAgICByZXR1cm4gbmV3IGxpYiRlczYkcHJvbWlzZSRlbnVtZXJhdG9yJCRkZWZhdWx0KHRoaXMsIGVudHJpZXMpLnByb21pc2U7XG4gICAgfVxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRhbGwkJGRlZmF1bHQgPSBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRhbGwkJGFsbDtcbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRyYWNlJCRyYWNlKGVudHJpZXMpIHtcbiAgICAgIC8qanNoaW50IHZhbGlkdGhpczp0cnVlICovXG4gICAgICB2YXIgQ29uc3RydWN0b3IgPSB0aGlzO1xuXG4gICAgICB2YXIgcHJvbWlzZSA9IG5ldyBDb25zdHJ1Y3RvcihsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRub29wKTtcblxuICAgICAgaWYgKCFsaWIkZXM2JHByb21pc2UkdXRpbHMkJGlzQXJyYXkoZW50cmllcykpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIG5ldyBUeXBlRXJyb3IoJ1lvdSBtdXN0IHBhc3MgYW4gYXJyYXkgdG8gcmFjZS4nKSk7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgICAgfVxuXG4gICAgICB2YXIgbGVuZ3RoID0gZW50cmllcy5sZW5ndGg7XG5cbiAgICAgIGZ1bmN0aW9uIG9uRnVsZmlsbG1lbnQodmFsdWUpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVzb2x2ZShwcm9taXNlLCB2YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIG9uUmVqZWN0aW9uKHJlYXNvbikge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgcmVhc29uKTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IDA7IHByb21pc2UuX3N0YXRlID09PSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRQRU5ESU5HICYmIGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRzdWJzY3JpYmUoQ29uc3RydWN0b3IucmVzb2x2ZShlbnRyaWVzW2ldKSwgdW5kZWZpbmVkLCBvbkZ1bGZpbGxtZW50LCBvblJlamVjdGlvbik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmFjZSQkZGVmYXVsdCA9IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJhY2UkJHJhY2U7XG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmVzb2x2ZSQkcmVzb2x2ZShvYmplY3QpIHtcbiAgICAgIC8qanNoaW50IHZhbGlkdGhpczp0cnVlICovXG4gICAgICB2YXIgQ29uc3RydWN0b3IgPSB0aGlzO1xuXG4gICAgICBpZiAob2JqZWN0ICYmIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdC5jb25zdHJ1Y3RvciA9PT0gQ29uc3RydWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgIH1cblxuICAgICAgdmFyIHByb21pc2UgPSBuZXcgQ29uc3RydWN0b3IobGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkbm9vcCk7XG4gICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZXNvbHZlKHByb21pc2UsIG9iamVjdCk7XG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJlc29sdmUkJGRlZmF1bHQgPSBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRyZXNvbHZlJCRyZXNvbHZlO1xuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJlamVjdCQkcmVqZWN0KHJlYXNvbikge1xuICAgICAgLypqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cbiAgICAgIHZhciBDb25zdHJ1Y3RvciA9IHRoaXM7XG4gICAgICB2YXIgcHJvbWlzZSA9IG5ldyBDb25zdHJ1Y3RvcihsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRub29wKTtcbiAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCByZWFzb24pO1xuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRyZWplY3QkJGRlZmF1bHQgPSBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRyZWplY3QkJHJlamVjdDtcblxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkY291bnRlciA9IDA7XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkbmVlZHNSZXNvbHZlcigpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1lvdSBtdXN0IHBhc3MgYSByZXNvbHZlciBmdW5jdGlvbiBhcyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gdGhlIHByb21pc2UgY29uc3RydWN0b3InKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkbmVlZHNOZXcoKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRmFpbGVkIHRvIGNvbnN0cnVjdCAnUHJvbWlzZSc6IFBsZWFzZSB1c2UgdGhlICduZXcnIG9wZXJhdG9yLCB0aGlzIG9iamVjdCBjb25zdHJ1Y3RvciBjYW5ub3QgYmUgY2FsbGVkIGFzIGEgZnVuY3Rpb24uXCIpO1xuICAgIH1cblxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkZGVmYXVsdCA9IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRQcm9taXNlO1xuICAgIC8qKlxuICAgICAgUHJvbWlzZSBvYmplY3RzIHJlcHJlc2VudCB0aGUgZXZlbnR1YWwgcmVzdWx0IG9mIGFuIGFzeW5jaHJvbm91cyBvcGVyYXRpb24uIFRoZVxuICAgICAgcHJpbWFyeSB3YXkgb2YgaW50ZXJhY3Rpbmcgd2l0aCBhIHByb21pc2UgaXMgdGhyb3VnaCBpdHMgYHRoZW5gIG1ldGhvZCwgd2hpY2hcbiAgICAgIHJlZ2lzdGVycyBjYWxsYmFja3MgdG8gcmVjZWl2ZSBlaXRoZXIgYSBwcm9taXNlJ3MgZXZlbnR1YWwgdmFsdWUgb3IgdGhlIHJlYXNvblxuICAgICAgd2h5IHRoZSBwcm9taXNlIGNhbm5vdCBiZSBmdWxmaWxsZWQuXG5cbiAgICAgIFRlcm1pbm9sb2d5XG4gICAgICAtLS0tLS0tLS0tLVxuXG4gICAgICAtIGBwcm9taXNlYCBpcyBhbiBvYmplY3Qgb3IgZnVuY3Rpb24gd2l0aCBhIGB0aGVuYCBtZXRob2Qgd2hvc2UgYmVoYXZpb3IgY29uZm9ybXMgdG8gdGhpcyBzcGVjaWZpY2F0aW9uLlxuICAgICAgLSBgdGhlbmFibGVgIGlzIGFuIG9iamVjdCBvciBmdW5jdGlvbiB0aGF0IGRlZmluZXMgYSBgdGhlbmAgbWV0aG9kLlxuICAgICAgLSBgdmFsdWVgIGlzIGFueSBsZWdhbCBKYXZhU2NyaXB0IHZhbHVlIChpbmNsdWRpbmcgdW5kZWZpbmVkLCBhIHRoZW5hYmxlLCBvciBhIHByb21pc2UpLlxuICAgICAgLSBgZXhjZXB0aW9uYCBpcyBhIHZhbHVlIHRoYXQgaXMgdGhyb3duIHVzaW5nIHRoZSB0aHJvdyBzdGF0ZW1lbnQuXG4gICAgICAtIGByZWFzb25gIGlzIGEgdmFsdWUgdGhhdCBpbmRpY2F0ZXMgd2h5IGEgcHJvbWlzZSB3YXMgcmVqZWN0ZWQuXG4gICAgICAtIGBzZXR0bGVkYCB0aGUgZmluYWwgcmVzdGluZyBzdGF0ZSBvZiBhIHByb21pc2UsIGZ1bGZpbGxlZCBvciByZWplY3RlZC5cblxuICAgICAgQSBwcm9taXNlIGNhbiBiZSBpbiBvbmUgb2YgdGhyZWUgc3RhdGVzOiBwZW5kaW5nLCBmdWxmaWxsZWQsIG9yIHJlamVjdGVkLlxuXG4gICAgICBQcm9taXNlcyB0aGF0IGFyZSBmdWxmaWxsZWQgaGF2ZSBhIGZ1bGZpbGxtZW50IHZhbHVlIGFuZCBhcmUgaW4gdGhlIGZ1bGZpbGxlZFxuICAgICAgc3RhdGUuICBQcm9taXNlcyB0aGF0IGFyZSByZWplY3RlZCBoYXZlIGEgcmVqZWN0aW9uIHJlYXNvbiBhbmQgYXJlIGluIHRoZVxuICAgICAgcmVqZWN0ZWQgc3RhdGUuICBBIGZ1bGZpbGxtZW50IHZhbHVlIGlzIG5ldmVyIGEgdGhlbmFibGUuXG5cbiAgICAgIFByb21pc2VzIGNhbiBhbHNvIGJlIHNhaWQgdG8gKnJlc29sdmUqIGEgdmFsdWUuICBJZiB0aGlzIHZhbHVlIGlzIGFsc28gYVxuICAgICAgcHJvbWlzZSwgdGhlbiB0aGUgb3JpZ2luYWwgcHJvbWlzZSdzIHNldHRsZWQgc3RhdGUgd2lsbCBtYXRjaCB0aGUgdmFsdWUnc1xuICAgICAgc2V0dGxlZCBzdGF0ZS4gIFNvIGEgcHJvbWlzZSB0aGF0ICpyZXNvbHZlcyogYSBwcm9taXNlIHRoYXQgcmVqZWN0cyB3aWxsXG4gICAgICBpdHNlbGYgcmVqZWN0LCBhbmQgYSBwcm9taXNlIHRoYXQgKnJlc29sdmVzKiBhIHByb21pc2UgdGhhdCBmdWxmaWxscyB3aWxsXG4gICAgICBpdHNlbGYgZnVsZmlsbC5cblxuXG4gICAgICBCYXNpYyBVc2FnZTpcbiAgICAgIC0tLS0tLS0tLS0tLVxuXG4gICAgICBgYGBqc1xuICAgICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgLy8gb24gc3VjY2Vzc1xuICAgICAgICByZXNvbHZlKHZhbHVlKTtcblxuICAgICAgICAvLyBvbiBmYWlsdXJlXG4gICAgICAgIHJlamVjdChyZWFzb24pO1xuICAgICAgfSk7XG5cbiAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAvLyBvbiBmdWxmaWxsbWVudFxuICAgICAgfSwgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICAgIC8vIG9uIHJlamVjdGlvblxuICAgICAgfSk7XG4gICAgICBgYGBcblxuICAgICAgQWR2YW5jZWQgVXNhZ2U6XG4gICAgICAtLS0tLS0tLS0tLS0tLS1cblxuICAgICAgUHJvbWlzZXMgc2hpbmUgd2hlbiBhYnN0cmFjdGluZyBhd2F5IGFzeW5jaHJvbm91cyBpbnRlcmFjdGlvbnMgc3VjaCBhc1xuICAgICAgYFhNTEh0dHBSZXF1ZXN0YHMuXG5cbiAgICAgIGBgYGpzXG4gICAgICBmdW5jdGlvbiBnZXRKU09OKHVybCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgICAgICB4aHIub3BlbignR0VUJywgdXJsKTtcbiAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gaGFuZGxlcjtcbiAgICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgICAgIHhoci5zZW5kKCk7XG5cbiAgICAgICAgICBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gdGhpcy5ET05FKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdnZXRKU09OOiBgJyArIHVybCArICdgIGZhaWxlZCB3aXRoIHN0YXR1czogWycgKyB0aGlzLnN0YXR1cyArICddJykpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGdldEpTT04oJy9wb3N0cy5qc29uJykudGhlbihmdW5jdGlvbihqc29uKSB7XG4gICAgICAgIC8vIG9uIGZ1bGZpbGxtZW50XG4gICAgICB9LCBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAgICAgLy8gb24gcmVqZWN0aW9uXG4gICAgICB9KTtcbiAgICAgIGBgYFxuXG4gICAgICBVbmxpa2UgY2FsbGJhY2tzLCBwcm9taXNlcyBhcmUgZ3JlYXQgY29tcG9zYWJsZSBwcmltaXRpdmVzLlxuXG4gICAgICBgYGBqc1xuICAgICAgUHJvbWlzZS5hbGwoW1xuICAgICAgICBnZXRKU09OKCcvcG9zdHMnKSxcbiAgICAgICAgZ2V0SlNPTignL2NvbW1lbnRzJylcbiAgICAgIF0pLnRoZW4oZnVuY3Rpb24odmFsdWVzKXtcbiAgICAgICAgdmFsdWVzWzBdIC8vID0+IHBvc3RzSlNPTlxuICAgICAgICB2YWx1ZXNbMV0gLy8gPT4gY29tbWVudHNKU09OXG5cbiAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICAgIH0pO1xuICAgICAgYGBgXG5cbiAgICAgIEBjbGFzcyBQcm9taXNlXG4gICAgICBAcGFyYW0ge2Z1bmN0aW9ufSByZXNvbHZlclxuICAgICAgVXNlZnVsIGZvciB0b29saW5nLlxuICAgICAgQGNvbnN0cnVjdG9yXG4gICAgKi9cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZShyZXNvbHZlcikge1xuICAgICAgdGhpcy5faWQgPSBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkY291bnRlcisrO1xuICAgICAgdGhpcy5fc3RhdGUgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9yZXN1bHQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9zdWJzY3JpYmVycyA9IFtdO1xuXG4gICAgICBpZiAobGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkbm9vcCAhPT0gcmVzb2x2ZXIpIHtcbiAgICAgICAgaWYgKCFsaWIkZXM2JHByb21pc2UkdXRpbHMkJGlzRnVuY3Rpb24ocmVzb2x2ZXIpKSB7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJHByb21pc2UkJG5lZWRzUmVzb2x2ZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZSkpIHtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkbmVlZHNOZXcoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGluaXRpYWxpemVQcm9taXNlKHRoaXMsIHJlc29sdmVyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZS5hbGwgPSBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRhbGwkJGRlZmF1bHQ7XG4gICAgbGliJGVzNiRwcm9taXNlJHByb21pc2UkJFByb21pc2UucmFjZSA9IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJhY2UkJGRlZmF1bHQ7XG4gICAgbGliJGVzNiRwcm9taXNlJHByb21pc2UkJFByb21pc2UucmVzb2x2ZSA9IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJlc29sdmUkJGRlZmF1bHQ7XG4gICAgbGliJGVzNiRwcm9taXNlJHByb21pc2UkJFByb21pc2UucmVqZWN0ID0gbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmVqZWN0JCRkZWZhdWx0O1xuICAgIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRQcm9taXNlLl9zZXRTY2hlZHVsZXIgPSBsaWIkZXM2JHByb21pc2UkYXNhcCQkc2V0U2NoZWR1bGVyO1xuICAgIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRQcm9taXNlLl9zZXRBc2FwID0gbGliJGVzNiRwcm9taXNlJGFzYXAkJHNldEFzYXA7XG4gICAgbGliJGVzNiRwcm9taXNlJHByb21pc2UkJFByb21pc2UuX2FzYXAgPSBsaWIkZXM2JHByb21pc2UkYXNhcCQkYXNhcDtcblxuICAgIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRQcm9taXNlLnByb3RvdHlwZSA9IHtcbiAgICAgIGNvbnN0cnVjdG9yOiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZSxcblxuICAgIC8qKlxuICAgICAgVGhlIHByaW1hcnkgd2F5IG9mIGludGVyYWN0aW5nIHdpdGggYSBwcm9taXNlIGlzIHRocm91Z2ggaXRzIGB0aGVuYCBtZXRob2QsXG4gICAgICB3aGljaCByZWdpc3RlcnMgY2FsbGJhY2tzIHRvIHJlY2VpdmUgZWl0aGVyIGEgcHJvbWlzZSdzIGV2ZW50dWFsIHZhbHVlIG9yIHRoZVxuICAgICAgcmVhc29uIHdoeSB0aGUgcHJvbWlzZSBjYW5ub3QgYmUgZnVsZmlsbGVkLlxuXG4gICAgICBgYGBqc1xuICAgICAgZmluZFVzZXIoKS50aGVuKGZ1bmN0aW9uKHVzZXIpe1xuICAgICAgICAvLyB1c2VyIGlzIGF2YWlsYWJsZVxuICAgICAgfSwgZnVuY3Rpb24ocmVhc29uKXtcbiAgICAgICAgLy8gdXNlciBpcyB1bmF2YWlsYWJsZSwgYW5kIHlvdSBhcmUgZ2l2ZW4gdGhlIHJlYXNvbiB3aHlcbiAgICAgIH0pO1xuICAgICAgYGBgXG5cbiAgICAgIENoYWluaW5nXG4gICAgICAtLS0tLS0tLVxuXG4gICAgICBUaGUgcmV0dXJuIHZhbHVlIG9mIGB0aGVuYCBpcyBpdHNlbGYgYSBwcm9taXNlLiAgVGhpcyBzZWNvbmQsICdkb3duc3RyZWFtJ1xuICAgICAgcHJvbWlzZSBpcyByZXNvbHZlZCB3aXRoIHRoZSByZXR1cm4gdmFsdWUgb2YgdGhlIGZpcnN0IHByb21pc2UncyBmdWxmaWxsbWVudFxuICAgICAgb3IgcmVqZWN0aW9uIGhhbmRsZXIsIG9yIHJlamVjdGVkIGlmIHRoZSBoYW5kbGVyIHRocm93cyBhbiBleGNlcHRpb24uXG5cbiAgICAgIGBgYGpzXG4gICAgICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgcmV0dXJuIHVzZXIubmFtZTtcbiAgICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgICAgcmV0dXJuICdkZWZhdWx0IG5hbWUnO1xuICAgICAgfSkudGhlbihmdW5jdGlvbiAodXNlck5hbWUpIHtcbiAgICAgICAgLy8gSWYgYGZpbmRVc2VyYCBmdWxmaWxsZWQsIGB1c2VyTmFtZWAgd2lsbCBiZSB0aGUgdXNlcidzIG5hbWUsIG90aGVyd2lzZSBpdFxuICAgICAgICAvLyB3aWxsIGJlIGAnZGVmYXVsdCBuYW1lJ2BcbiAgICAgIH0pO1xuXG4gICAgICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGb3VuZCB1c2VyLCBidXQgc3RpbGwgdW5oYXBweScpO1xuICAgICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2BmaW5kVXNlcmAgcmVqZWN0ZWQgYW5kIHdlJ3JlIHVuaGFwcHknKTtcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIC8vIG5ldmVyIHJlYWNoZWRcbiAgICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgICAgLy8gaWYgYGZpbmRVc2VyYCBmdWxmaWxsZWQsIGByZWFzb25gIHdpbGwgYmUgJ0ZvdW5kIHVzZXIsIGJ1dCBzdGlsbCB1bmhhcHB5Jy5cbiAgICAgICAgLy8gSWYgYGZpbmRVc2VyYCByZWplY3RlZCwgYHJlYXNvbmAgd2lsbCBiZSAnYGZpbmRVc2VyYCByZWplY3RlZCBhbmQgd2UncmUgdW5oYXBweScuXG4gICAgICB9KTtcbiAgICAgIGBgYFxuICAgICAgSWYgdGhlIGRvd25zdHJlYW0gcHJvbWlzZSBkb2VzIG5vdCBzcGVjaWZ5IGEgcmVqZWN0aW9uIGhhbmRsZXIsIHJlamVjdGlvbiByZWFzb25zIHdpbGwgYmUgcHJvcGFnYXRlZCBmdXJ0aGVyIGRvd25zdHJlYW0uXG5cbiAgICAgIGBgYGpzXG4gICAgICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IFBlZGFnb2dpY2FsRXhjZXB0aW9uKCdVcHN0cmVhbSBlcnJvcicpO1xuICAgICAgfSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgLy8gbmV2ZXIgcmVhY2hlZFxuICAgICAgfSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgLy8gbmV2ZXIgcmVhY2hlZFxuICAgICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgICAvLyBUaGUgYFBlZGdhZ29jaWFsRXhjZXB0aW9uYCBpcyBwcm9wYWdhdGVkIGFsbCB0aGUgd2F5IGRvd24gdG8gaGVyZVxuICAgICAgfSk7XG4gICAgICBgYGBcblxuICAgICAgQXNzaW1pbGF0aW9uXG4gICAgICAtLS0tLS0tLS0tLS1cblxuICAgICAgU29tZXRpbWVzIHRoZSB2YWx1ZSB5b3Ugd2FudCB0byBwcm9wYWdhdGUgdG8gYSBkb3duc3RyZWFtIHByb21pc2UgY2FuIG9ubHkgYmVcbiAgICAgIHJldHJpZXZlZCBhc3luY2hyb25vdXNseS4gVGhpcyBjYW4gYmUgYWNoaWV2ZWQgYnkgcmV0dXJuaW5nIGEgcHJvbWlzZSBpbiB0aGVcbiAgICAgIGZ1bGZpbGxtZW50IG9yIHJlamVjdGlvbiBoYW5kbGVyLiBUaGUgZG93bnN0cmVhbSBwcm9taXNlIHdpbGwgdGhlbiBiZSBwZW5kaW5nXG4gICAgICB1bnRpbCB0aGUgcmV0dXJuZWQgcHJvbWlzZSBpcyBzZXR0bGVkLiBUaGlzIGlzIGNhbGxlZCAqYXNzaW1pbGF0aW9uKi5cblxuICAgICAgYGBganNcbiAgICAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgICByZXR1cm4gZmluZENvbW1lbnRzQnlBdXRob3IodXNlcik7XG4gICAgICB9KS50aGVuKGZ1bmN0aW9uIChjb21tZW50cykge1xuICAgICAgICAvLyBUaGUgdXNlcidzIGNvbW1lbnRzIGFyZSBub3cgYXZhaWxhYmxlXG4gICAgICB9KTtcbiAgICAgIGBgYFxuXG4gICAgICBJZiB0aGUgYXNzaW1saWF0ZWQgcHJvbWlzZSByZWplY3RzLCB0aGVuIHRoZSBkb3duc3RyZWFtIHByb21pc2Ugd2lsbCBhbHNvIHJlamVjdC5cblxuICAgICAgYGBganNcbiAgICAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgICByZXR1cm4gZmluZENvbW1lbnRzQnlBdXRob3IodXNlcik7XG4gICAgICB9KS50aGVuKGZ1bmN0aW9uIChjb21tZW50cykge1xuICAgICAgICAvLyBJZiBgZmluZENvbW1lbnRzQnlBdXRob3JgIGZ1bGZpbGxzLCB3ZSdsbCBoYXZlIHRoZSB2YWx1ZSBoZXJlXG4gICAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICAgIC8vIElmIGBmaW5kQ29tbWVudHNCeUF1dGhvcmAgcmVqZWN0cywgd2UnbGwgaGF2ZSB0aGUgcmVhc29uIGhlcmVcbiAgICAgIH0pO1xuICAgICAgYGBgXG5cbiAgICAgIFNpbXBsZSBFeGFtcGxlXG4gICAgICAtLS0tLS0tLS0tLS0tLVxuXG4gICAgICBTeW5jaHJvbm91cyBFeGFtcGxlXG5cbiAgICAgIGBgYGphdmFzY3JpcHRcbiAgICAgIHZhciByZXN1bHQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc3VsdCA9IGZpbmRSZXN1bHQoKTtcbiAgICAgICAgLy8gc3VjY2Vzc1xuICAgICAgfSBjYXRjaChyZWFzb24pIHtcbiAgICAgICAgLy8gZmFpbHVyZVxuICAgICAgfVxuICAgICAgYGBgXG5cbiAgICAgIEVycmJhY2sgRXhhbXBsZVxuXG4gICAgICBgYGBqc1xuICAgICAgZmluZFJlc3VsdChmdW5jdGlvbihyZXN1bHQsIGVycil7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAvLyBmYWlsdXJlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gc3VjY2Vzc1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGBgYFxuXG4gICAgICBQcm9taXNlIEV4YW1wbGU7XG5cbiAgICAgIGBgYGphdmFzY3JpcHRcbiAgICAgIGZpbmRSZXN1bHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgIC8vIHN1Y2Nlc3NcbiAgICAgIH0sIGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgICAgIC8vIGZhaWx1cmVcbiAgICAgIH0pO1xuICAgICAgYGBgXG5cbiAgICAgIEFkdmFuY2VkIEV4YW1wbGVcbiAgICAgIC0tLS0tLS0tLS0tLS0tXG5cbiAgICAgIFN5bmNocm9ub3VzIEV4YW1wbGVcblxuICAgICAgYGBgamF2YXNjcmlwdFxuICAgICAgdmFyIGF1dGhvciwgYm9va3M7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGF1dGhvciA9IGZpbmRBdXRob3IoKTtcbiAgICAgICAgYm9va3MgID0gZmluZEJvb2tzQnlBdXRob3IoYXV0aG9yKTtcbiAgICAgICAgLy8gc3VjY2Vzc1xuICAgICAgfSBjYXRjaChyZWFzb24pIHtcbiAgICAgICAgLy8gZmFpbHVyZVxuICAgICAgfVxuICAgICAgYGBgXG5cbiAgICAgIEVycmJhY2sgRXhhbXBsZVxuXG4gICAgICBgYGBqc1xuXG4gICAgICBmdW5jdGlvbiBmb3VuZEJvb2tzKGJvb2tzKSB7XG5cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZmFpbHVyZShyZWFzb24pIHtcblxuICAgICAgfVxuXG4gICAgICBmaW5kQXV0aG9yKGZ1bmN0aW9uKGF1dGhvciwgZXJyKXtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIGZhaWx1cmUoZXJyKTtcbiAgICAgICAgICAvLyBmYWlsdXJlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZpbmRCb29va3NCeUF1dGhvcihhdXRob3IsIGZ1bmN0aW9uKGJvb2tzLCBlcnIpIHtcbiAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIGZhaWx1cmUoZXJyKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgZm91bmRCb29rcyhib29rcyk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaChyZWFzb24pIHtcbiAgICAgICAgICAgICAgICAgIGZhaWx1cmUocmVhc29uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gY2F0Y2goZXJyb3IpIHtcbiAgICAgICAgICAgIGZhaWx1cmUoZXJyKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gc3VjY2Vzc1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGBgYFxuXG4gICAgICBQcm9taXNlIEV4YW1wbGU7XG5cbiAgICAgIGBgYGphdmFzY3JpcHRcbiAgICAgIGZpbmRBdXRob3IoKS5cbiAgICAgICAgdGhlbihmaW5kQm9va3NCeUF1dGhvcikuXG4gICAgICAgIHRoZW4oZnVuY3Rpb24oYm9va3Mpe1xuICAgICAgICAgIC8vIGZvdW5kIGJvb2tzXG4gICAgICB9KS5jYXRjaChmdW5jdGlvbihyZWFzb24pe1xuICAgICAgICAvLyBzb21ldGhpbmcgd2VudCB3cm9uZ1xuICAgICAgfSk7XG4gICAgICBgYGBcblxuICAgICAgQG1ldGhvZCB0aGVuXG4gICAgICBAcGFyYW0ge0Z1bmN0aW9ufSBvbkZ1bGZpbGxlZFxuICAgICAgQHBhcmFtIHtGdW5jdGlvbn0gb25SZWplY3RlZFxuICAgICAgVXNlZnVsIGZvciB0b29saW5nLlxuICAgICAgQHJldHVybiB7UHJvbWlzZX1cbiAgICAqL1xuICAgICAgdGhlbjogZnVuY3Rpb24ob25GdWxmaWxsbWVudCwgb25SZWplY3Rpb24pIHtcbiAgICAgICAgdmFyIHBhcmVudCA9IHRoaXM7XG4gICAgICAgIHZhciBzdGF0ZSA9IHBhcmVudC5fc3RhdGU7XG5cbiAgICAgICAgaWYgKHN0YXRlID09PSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRGVUxGSUxMRUQgJiYgIW9uRnVsZmlsbG1lbnQgfHwgc3RhdGUgPT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFJFSkVDVEVEICYmICFvblJlamVjdGlvbikge1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGNoaWxkID0gbmV3IHRoaXMuY29uc3RydWN0b3IobGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkbm9vcCk7XG4gICAgICAgIHZhciByZXN1bHQgPSBwYXJlbnQuX3Jlc3VsdDtcblxuICAgICAgICBpZiAoc3RhdGUpIHtcbiAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBhcmd1bWVudHNbc3RhdGUgLSAxXTtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkYXNhcChmdW5jdGlvbigpe1xuICAgICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkaW52b2tlQ2FsbGJhY2soc3RhdGUsIGNoaWxkLCBjYWxsYmFjaywgcmVzdWx0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRzdWJzY3JpYmUocGFyZW50LCBjaGlsZCwgb25GdWxmaWxsbWVudCwgb25SZWplY3Rpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgfSxcblxuICAgIC8qKlxuICAgICAgYGNhdGNoYCBpcyBzaW1wbHkgc3VnYXIgZm9yIGB0aGVuKHVuZGVmaW5lZCwgb25SZWplY3Rpb24pYCB3aGljaCBtYWtlcyBpdCB0aGUgc2FtZVxuICAgICAgYXMgdGhlIGNhdGNoIGJsb2NrIG9mIGEgdHJ5L2NhdGNoIHN0YXRlbWVudC5cblxuICAgICAgYGBganNcbiAgICAgIGZ1bmN0aW9uIGZpbmRBdXRob3IoKXtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZG4ndCBmaW5kIHRoYXQgYXV0aG9yJyk7XG4gICAgICB9XG5cbiAgICAgIC8vIHN5bmNocm9ub3VzXG4gICAgICB0cnkge1xuICAgICAgICBmaW5kQXV0aG9yKCk7XG4gICAgICB9IGNhdGNoKHJlYXNvbikge1xuICAgICAgICAvLyBzb21ldGhpbmcgd2VudCB3cm9uZ1xuICAgICAgfVxuXG4gICAgICAvLyBhc3luYyB3aXRoIHByb21pc2VzXG4gICAgICBmaW5kQXV0aG9yKCkuY2F0Y2goZnVuY3Rpb24ocmVhc29uKXtcbiAgICAgICAgLy8gc29tZXRoaW5nIHdlbnQgd3JvbmdcbiAgICAgIH0pO1xuICAgICAgYGBgXG5cbiAgICAgIEBtZXRob2QgY2F0Y2hcbiAgICAgIEBwYXJhbSB7RnVuY3Rpb259IG9uUmVqZWN0aW9uXG4gICAgICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gICAgICBAcmV0dXJuIHtQcm9taXNlfVxuICAgICovXG4gICAgICAnY2F0Y2gnOiBmdW5jdGlvbihvblJlamVjdGlvbikge1xuICAgICAgICByZXR1cm4gdGhpcy50aGVuKG51bGwsIG9uUmVqZWN0aW9uKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRwb2x5ZmlsbCQkcG9seWZpbGwoKSB7XG4gICAgICB2YXIgbG9jYWw7XG5cbiAgICAgIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGxvY2FsID0gZ2xvYmFsO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBsb2NhbCA9IHNlbGY7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGxvY2FsID0gRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigncG9seWZpbGwgZmFpbGVkIGJlY2F1c2UgZ2xvYmFsIG9iamVjdCBpcyB1bmF2YWlsYWJsZSBpbiB0aGlzIGVudmlyb25tZW50Jyk7XG4gICAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgUCA9IGxvY2FsLlByb21pc2U7XG5cbiAgICAgIGlmIChQICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChQLnJlc29sdmUoKSkgPT09ICdbb2JqZWN0IFByb21pc2VdJyAmJiAhUC5jYXN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbG9jYWwuUHJvbWlzZSA9IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRkZWZhdWx0O1xuICAgIH1cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJHBvbHlmaWxsJCRkZWZhdWx0ID0gbGliJGVzNiRwcm9taXNlJHBvbHlmaWxsJCRwb2x5ZmlsbDtcblxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkdW1kJCRFUzZQcm9taXNlID0ge1xuICAgICAgJ1Byb21pc2UnOiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkZGVmYXVsdCxcbiAgICAgICdwb2x5ZmlsbCc6IGxpYiRlczYkcHJvbWlzZSRwb2x5ZmlsbCQkZGVmYXVsdFxuICAgIH07XG5cbiAgICAvKiBnbG9iYWwgZGVmaW5lOnRydWUgbW9kdWxlOnRydWUgd2luZG93OiB0cnVlICovXG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lWydhbWQnXSkge1xuICAgICAgZGVmaW5lKGZ1bmN0aW9uKCkgeyByZXR1cm4gbGliJGVzNiRwcm9taXNlJHVtZCQkRVM2UHJvbWlzZTsgfSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGVbJ2V4cG9ydHMnXSkge1xuICAgICAgbW9kdWxlWydleHBvcnRzJ10gPSBsaWIkZXM2JHByb21pc2UkdW1kJCRFUzZQcm9taXNlO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzWydFUzZQcm9taXNlJ10gPSBsaWIkZXM2JHByb21pc2UkdW1kJCRFUzZQcm9taXNlO1xuICAgIH1cblxuICAgIGxpYiRlczYkcHJvbWlzZSRwb2x5ZmlsbCQkZGVmYXVsdCgpO1xufSkuY2FsbCh0aGlzKTtcblxuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgc2V0VGltZW91dChkcmFpblF1ZXVlLCAwKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbi8vIFRPRE8oc2h0eWxtYW4pXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCJcbi8qKlxuICogRXhwb3NlIGBFbWl0dGVyYC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVtaXR0ZXI7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgRW1pdHRlcmAuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBFbWl0dGVyKG9iaikge1xuICBpZiAob2JqKSByZXR1cm4gbWl4aW4ob2JqKTtcbn07XG5cbi8qKlxuICogTWl4aW4gdGhlIGVtaXR0ZXIgcHJvcGVydGllcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBtaXhpbihvYmopIHtcbiAgZm9yICh2YXIga2V5IGluIEVtaXR0ZXIucHJvdG90eXBlKSB7XG4gICAgb2JqW2tleV0gPSBFbWl0dGVyLnByb3RvdHlwZVtrZXldO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogTGlzdGVuIG9uIHRoZSBnaXZlbiBgZXZlbnRgIHdpdGggYGZuYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5vbiA9XG5FbWl0dGVyLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuICAodGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XSA9IHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF0gfHwgW10pXG4gICAgLnB1c2goZm4pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQWRkcyBhbiBgZXZlbnRgIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBpbnZva2VkIGEgc2luZ2xlXG4gKiB0aW1lIHRoZW4gYXV0b21hdGljYWxseSByZW1vdmVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbihldmVudCwgZm4pe1xuICBmdW5jdGlvbiBvbigpIHtcbiAgICB0aGlzLm9mZihldmVudCwgb24pO1xuICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBvbi5mbiA9IGZuO1xuICB0aGlzLm9uKGV2ZW50LCBvbik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgdGhlIGdpdmVuIGNhbGxiYWNrIGZvciBgZXZlbnRgIG9yIGFsbFxuICogcmVnaXN0ZXJlZCBjYWxsYmFja3MuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7RW1pdHRlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUub2ZmID1cbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuXG4gIC8vIGFsbFxuICBpZiAoMCA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgdGhpcy5fY2FsbGJhY2tzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBzcGVjaWZpYyBldmVudFxuICB2YXIgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcbiAgaWYgKCFjYWxsYmFja3MpIHJldHVybiB0aGlzO1xuXG4gIC8vIHJlbW92ZSBhbGwgaGFuZGxlcnNcbiAgaWYgKDEgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gcmVtb3ZlIHNwZWNpZmljIGhhbmRsZXJcbiAgdmFyIGNiO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuICAgIGNiID0gY2FsbGJhY2tzW2ldO1xuICAgIGlmIChjYiA9PT0gZm4gfHwgY2IuZm4gPT09IGZuKSB7XG4gICAgICBjYWxsYmFja3Muc3BsaWNlKGksIDEpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBFbWl0IGBldmVudGAgd2l0aCB0aGUgZ2l2ZW4gYXJncy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7TWl4ZWR9IC4uLlxuICogQHJldHVybiB7RW1pdHRlcn1cbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24oZXZlbnQpe1xuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG4gIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG4gICAgLCBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdO1xuXG4gIGlmIChjYWxsYmFja3MpIHtcbiAgICBjYWxsYmFja3MgPSBjYWxsYmFja3Muc2xpY2UoMCk7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNhbGxiYWNrcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgY2FsbGJhY2tzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYXJyYXkgb2YgY2FsbGJhY2tzIGZvciBgZXZlbnRgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHJldHVybiB7QXJyYXl9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuICByZXR1cm4gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XSB8fCBbXTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhpcyBlbWl0dGVyIGhhcyBgZXZlbnRgIGhhbmRsZXJzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUuaGFzTGlzdGVuZXJzID0gZnVuY3Rpb24oZXZlbnQpe1xuICByZXR1cm4gISEgdGhpcy5saXN0ZW5lcnMoZXZlbnQpLmxlbmd0aDtcbn07XG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCdjb21wb25lbnQtZW1pdHRlcicpXG5cbi8qKlxuICogRXhwb3NlIGBzY2VuZWAuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBBcHBsaWNhdGlvblxuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBgQXBwbGljYXRpb25gLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtZW50IE9wdGlvbmFsIGluaXRpYWwgZWxlbWVudFxuICovXG5cbmZ1bmN0aW9uIEFwcGxpY2F0aW9uIChlbGVtZW50KSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBBcHBsaWNhdGlvbikpIHJldHVybiBuZXcgQXBwbGljYXRpb24oZWxlbWVudClcbiAgdGhpcy5vcHRpb25zID0ge31cbiAgdGhpcy5zb3VyY2VzID0ge31cbiAgdGhpcy5lbGVtZW50ID0gZWxlbWVudFxufVxuXG4vKipcbiAqIE1peGluIGBFbWl0dGVyYC5cbiAqL1xuXG5FbWl0dGVyKEFwcGxpY2F0aW9uLnByb3RvdHlwZSlcblxuLyoqXG4gKiBBZGQgYSBwbHVnaW5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwbHVnaW5cbiAqL1xuXG5BcHBsaWNhdGlvbi5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gKHBsdWdpbikge1xuICBwbHVnaW4odGhpcylcbiAgcmV0dXJuIHRoaXNcbn1cblxuLyoqXG4gKiBTZXQgYW4gb3B0aW9uXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqL1xuXG5BcHBsaWNhdGlvbi5wcm90b3R5cGUub3B0aW9uID0gZnVuY3Rpb24gKG5hbWUsIHZhbCkge1xuICB0aGlzLm9wdGlvbnNbbmFtZV0gPSB2YWxcbiAgcmV0dXJuIHRoaXNcbn1cblxuLyoqXG4gKiBTZXQgdmFsdWUgdXNlZCBzb21ld2hlcmUgaW4gdGhlIElPIG5ldHdvcmsuXG4gKi9cblxuQXBwbGljYXRpb24ucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChuYW1lLCBkYXRhKSB7XG4gIHRoaXMuc291cmNlc1tuYW1lXSA9IGRhdGFcbiAgdGhpcy5lbWl0KCdzb3VyY2UnLCBuYW1lLCBkYXRhKVxuICByZXR1cm4gdGhpc1xufVxuXG4vKipcbiAqIE1vdW50IGEgdmlydHVhbCBlbGVtZW50LlxuICpcbiAqIEBwYXJhbSB7VmlydHVhbEVsZW1lbnR9IGVsZW1lbnRcbiAqL1xuXG5BcHBsaWNhdGlvbi5wcm90b3R5cGUubW91bnQgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50XG4gIHRoaXMuZW1pdCgnbW91bnQnLCBlbGVtZW50KVxuICByZXR1cm4gdGhpc1xufVxuXG4vKipcbiAqIFJlbW92ZSB0aGUgd29ybGQuIFVubW91bnQgZXZlcnl0aGluZy5cbiAqL1xuXG5BcHBsaWNhdGlvbi5wcm90b3R5cGUudW5tb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCF0aGlzLmVsZW1lbnQpIHJldHVyblxuICB0aGlzLmVsZW1lbnQgPSBudWxsXG4gIHRoaXMuZW1pdCgndW5tb3VudCcpXG4gIHJldHVybiB0aGlzXG59XG4iLCIvKipcbiAqIEFsbCBvZiB0aGUgZXZlbnRzIGNhbiBiaW5kIHRvXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG9uQmx1cjogJ2JsdXInLFxuICBvbkNoYW5nZTogJ2NoYW5nZScsXG4gIG9uQ2xpY2s6ICdjbGljaycsXG4gIG9uQ29udGV4dE1lbnU6ICdjb250ZXh0bWVudScsXG4gIG9uQ29weTogJ2NvcHknLFxuICBvbkN1dDogJ2N1dCcsXG4gIG9uRG91YmxlQ2xpY2s6ICdkYmxjbGljaycsXG4gIG9uRHJhZzogJ2RyYWcnLFxuICBvbkRyYWdFbmQ6ICdkcmFnZW5kJyxcbiAgb25EcmFnRW50ZXI6ICdkcmFnZW50ZXInLFxuICBvbkRyYWdFeGl0OiAnZHJhZ2V4aXQnLFxuICBvbkRyYWdMZWF2ZTogJ2RyYWdsZWF2ZScsXG4gIG9uRHJhZ092ZXI6ICdkcmFnb3ZlcicsXG4gIG9uRHJhZ1N0YXJ0OiAnZHJhZ3N0YXJ0JyxcbiAgb25Ecm9wOiAnZHJvcCcsXG4gIG9uRm9jdXM6ICdmb2N1cycsXG4gIG9uSW5wdXQ6ICdpbnB1dCcsXG4gIG9uS2V5RG93bjogJ2tleWRvd24nLFxuICBvbktleVByZXNzOiAna2V5cHJlc3MnLFxuICBvbktleVVwOiAna2V5dXAnLFxuICBvbk1vdXNlRG93bjogJ21vdXNlZG93bicsXG4gIG9uTW91c2VFbnRlcjogJ21vdXNlZW50ZXInLFxuICBvbk1vdXNlTGVhdmU6ICdtb3VzZWxlYXZlJyxcbiAgb25Nb3VzZU1vdmU6ICdtb3VzZW1vdmUnLFxuICBvbk1vdXNlT3V0OiAnbW91c2VvdXQnLFxuICBvbk1vdXNlT3ZlcjogJ21vdXNlb3ZlcicsXG4gIG9uTW91c2VVcDogJ21vdXNldXAnLFxuICBvblBhc3RlOiAncGFzdGUnLFxuICBvblNjcm9sbDogJ3Njcm9sbCcsXG4gIG9uU3VibWl0OiAnc3VibWl0JyxcbiAgb25Ub3VjaENhbmNlbDogJ3RvdWNoY2FuY2VsJyxcbiAgb25Ub3VjaEVuZDogJ3RvdWNoZW5kJyxcbiAgb25Ub3VjaE1vdmU6ICd0b3VjaG1vdmUnLFxuICBvblRvdWNoU3RhcnQ6ICd0b3VjaHN0YXJ0JyxcbiAgb25XaGVlbDogJ3doZWVsJ1xufVxuIiwiLyoqXG4gKiBDcmVhdGUgdGhlIGFwcGxpY2F0aW9uLlxuICovXG5cbmV4cG9ydHMudHJlZSA9XG5leHBvcnRzLnNjZW5lID1cbmV4cG9ydHMuZGVrdSA9IHJlcXVpcmUoJy4vYXBwbGljYXRpb24nKVxuXG4vKipcbiAqIFJlbmRlciBzY2VuZXMgdG8gdGhlIERPTS5cbiAqL1xuXG5pZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xuICBleHBvcnRzLnJlbmRlciA9IHJlcXVpcmUoJy4vcmVuZGVyJylcbn1cblxuLyoqXG4gKiBSZW5kZXIgc2NlbmVzIHRvIGEgc3RyaW5nXG4gKi9cblxuZXhwb3J0cy5yZW5kZXJTdHJpbmcgPSByZXF1aXJlKCcuL3N0cmluZ2lmeScpXG5cbi8qKlxuICogQ3JlYXRlIHZpcnR1YWwgZWxlbWVudHMuXG4gKi9cblxuZXhwb3J0cy5lbGVtZW50ID1cbmV4cG9ydHMuY3JlYXRlRWxlbWVudCA9XG5leHBvcnRzLmRvbSA9IHJlcXVpcmUoJy4vdmlydHVhbCcpXG4iLCIvKipcbiAqIERlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgcmFmID0gcmVxdWlyZSgnY29tcG9uZW50LXJhZicpXG52YXIgUG9vbCA9IHJlcXVpcmUoJ2RvbS1wb29sJylcbnZhciB3YWxrID0gcmVxdWlyZSgnZG9tLXdhbGsnKVxudmFyIGlzRG9tID0gcmVxdWlyZSgnaXMtZG9tJylcbnZhciB1aWQgPSByZXF1aXJlKCdnZXQtdWlkJylcbnZhciBrZXlwYXRoID0gcmVxdWlyZSgnb2JqZWN0LXBhdGgnKVxudmFyIHR5cGUgPSByZXF1aXJlKCdjb21wb25lbnQtdHlwZScpXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJylcbnZhciBzdmcgPSByZXF1aXJlKCcuL3N2ZycpXG52YXIgZXZlbnRzID0gcmVxdWlyZSgnLi9ldmVudHMnKVxudmFyIGRlZmF1bHRzID0gdXRpbHMuZGVmYXVsdHNcbnZhciBmb3JFYWNoID0gcmVxdWlyZSgnZmFzdC5qcy9mb3JFYWNoJylcbnZhciBhc3NpZ24gPSByZXF1aXJlKCdmYXN0LmpzL29iamVjdC9hc3NpZ24nKVxudmFyIHJlZHVjZSA9IHJlcXVpcmUoJ2Zhc3QuanMvcmVkdWNlJylcbnZhciBpc1Byb21pc2UgPSByZXF1aXJlKCdpcy1wcm9taXNlJylcblxuLyoqXG4gKiBUaGVzZSBlbGVtZW50cyB3b24ndCBiZSBwb29sZWRcbiAqL1xuXG52YXIgYXZvaWRQb29saW5nID0gWydpbnB1dCcsICd0ZXh0YXJlYSddO1xuXG4vKipcbiAqIEV4cG9zZSBgZG9tYC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlbmRlclxuXG4vKipcbiAqIFJlbmRlciBhbiBhcHAgdG8gdGhlIERPTVxuICpcbiAqIEBwYXJhbSB7QXBwbGljYXRpb259IGFwcFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY29udGFpbmVyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICpcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuXG5mdW5jdGlvbiByZW5kZXIgKGFwcCwgY29udGFpbmVyLCBvcHRzKSB7XG4gIHZhciBmcmFtZUlkXG4gIHZhciBpc1JlbmRlcmluZ1xuICB2YXIgcm9vdElkID0gJ3Jvb3QnXG4gIHZhciBjdXJyZW50RWxlbWVudFxuICB2YXIgY3VycmVudE5hdGl2ZUVsZW1lbnRcbiAgdmFyIGNvbm5lY3Rpb25zID0ge31cbiAgdmFyIGNvbXBvbmVudHMgPSB7fVxuICB2YXIgZW50aXRpZXMgPSB7fVxuICB2YXIgcG9vbHMgPSB7fVxuICB2YXIgaGFuZGxlcnMgPSB7fVxuICB2YXIgbW91bnRRdWV1ZSA9IFtdXG4gIHZhciBjaGlsZHJlbiA9IHt9XG4gIGNoaWxkcmVuW3Jvb3RJZF0gPSB7fVxuXG4gIGlmICghaXNEb20oY29udGFpbmVyKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignQ29udGFpbmVyIGVsZW1lbnQgbXVzdCBiZSBhIERPTSBlbGVtZW50JylcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW5kZXJpbmcgb3B0aW9ucy4gQmF0Y2hpbmcgaXMgb25seSBldmVyIHJlYWxseSBkaXNhYmxlZFxuICAgKiB3aGVuIHJ1bm5pbmcgdGVzdHMsIGFuZCBwb29saW5nIGNhbiBiZSBkaXNhYmxlZCBpZiB0aGUgdXNlclxuICAgKiBpcyBkb2luZyBzb21ldGhpbmcgc3R1cGlkIHdpdGggdGhlIERPTSBpbiB0aGVpciBjb21wb25lbnRzLlxuICAgKi9cblxuICB2YXIgb3B0aW9ucyA9IGRlZmF1bHRzKGFzc2lnbih7fSwgYXBwLm9wdGlvbnMgfHwge30sIG9wdHMgfHwge30pLCB7XG4gICAgcG9vbGluZzogdHJ1ZSxcbiAgICBiYXRjaGluZzogdHJ1ZSxcbiAgICB2YWxpZGF0ZVByb3BzOiBmYWxzZVxuICB9KVxuXG4gIC8qKlxuICAgKiBMaXN0ZW4gdG8gRE9NIGV2ZW50c1xuICAgKi9cblxuICBhZGROYXRpdmVFdmVudExpc3RlbmVycygpXG5cbiAgLyoqXG4gICAqIFdhdGNoIGZvciBjaGFuZ2VzIHRvIHRoZSBhcHAgc28gdGhhdCB3ZSBjYW4gdXBkYXRlXG4gICAqIHRoZSBET00gYXMgbmVlZGVkLlxuICAgKi9cblxuICBhcHAub24oJ3VubW91bnQnLCBvbnVubW91bnQpXG4gIGFwcC5vbignbW91bnQnLCBvbm1vdW50KVxuICBhcHAub24oJ3NvdXJjZScsIG9udXBkYXRlKVxuXG4gIC8qKlxuICAgKiBJZiB0aGUgYXBwIGhhcyBhbHJlYWR5IG1vdW50ZWQgYW4gZWxlbWVudCwgd2UgY2FuIGp1c3RcbiAgICogcmVuZGVyIHRoYXQgc3RyYWlnaHQgYXdheS5cbiAgICovXG5cbiAgaWYgKGFwcC5lbGVtZW50KSByZW5kZXIoKVxuXG4gIC8qKlxuICAgKiBUZWFyZG93biB0aGUgRE9NIHJlbmRlcmluZyBzbyB0aGF0IGl0IHN0b3BzXG4gICAqIHJlbmRlcmluZyBhbmQgZXZlcnl0aGluZyBjYW4gYmUgZ2FyYmFnZSBjb2xsZWN0ZWQuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHRlYXJkb3duICgpIHtcbiAgICByZW1vdmVOYXRpdmVFdmVudExpc3RlbmVycygpXG4gICAgcmVtb3ZlTmF0aXZlRWxlbWVudCgpXG4gICAgYXBwLm9mZigndW5tb3VudCcsIG9udW5tb3VudClcbiAgICBhcHAub2ZmKCdtb3VudCcsIG9ubW91bnQpXG4gICAgYXBwLm9mZignc291cmNlJywgb251cGRhdGUpXG4gIH1cblxuICAvKipcbiAgICogU3dhcCB0aGUgY3VycmVudCByZW5kZXJlZCBub2RlIHdpdGggYSBuZXcgb25lIHRoYXQgaXMgcmVuZGVyZWRcbiAgICogZnJvbSB0aGUgbmV3IHZpcnR1YWwgZWxlbWVudCBtb3VudGVkIG9uIHRoZSBhcHAuXG4gICAqXG4gICAqIEBwYXJhbSB7VmlydHVhbEVsZW1lbnR9IGVsZW1lbnRcbiAgICovXG5cbiAgZnVuY3Rpb24gb25tb3VudCAoKSB7XG4gICAgaW52YWxpZGF0ZSgpXG4gIH1cblxuICAvKipcbiAgICogSWYgdGhlIGFwcCB1bm1vdW50cyBhbiBlbGVtZW50LCB3ZSBzaG91bGQgY2xlYXIgb3V0IHRoZSBjdXJyZW50XG4gICAqIHJlbmRlcmVkIGVsZW1lbnQuIFRoaXMgd2lsbCByZW1vdmUgYWxsIHRoZSBlbnRpdGllcy5cbiAgICovXG5cbiAgZnVuY3Rpb24gb251bm1vdW50ICgpIHtcbiAgICByZW1vdmVOYXRpdmVFbGVtZW50KClcbiAgICBjdXJyZW50RWxlbWVudCA9IG51bGxcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYWxsIGNvbXBvbmVudHMgdGhhdCBhcmUgYm91bmQgdG8gdGhlIHNvdXJjZVxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgKiBAcGFyYW0geyp9IGRhdGFcbiAgICovXG5cbiAgZnVuY3Rpb24gb251cGRhdGUgKG5hbWUsIGRhdGEpIHtcbiAgICBpZiAoIWNvbm5lY3Rpb25zW25hbWVdKSByZXR1cm47XG4gICAgY29ubmVjdGlvbnNbbmFtZV0uZm9yRWFjaChmdW5jdGlvbih1cGRhdGUpIHtcbiAgICAgIHVwZGF0ZShkYXRhKVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogUmVuZGVyIGFuZCBtb3VudCBhIGNvbXBvbmVudCB0byB0aGUgbmF0aXZlIGRvbS5cbiAgICpcbiAgICogQHBhcmFtIHtFbnRpdHl9IGVudGl0eVxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG5cbiAgZnVuY3Rpb24gbW91bnRFbnRpdHkgKGVudGl0eSkge1xuICAgIHJlZ2lzdGVyKGVudGl0eSlcbiAgICBzZXRTb3VyY2VzKGVudGl0eSlcbiAgICBjaGlsZHJlbltlbnRpdHkuaWRdID0ge31cbiAgICBlbnRpdGllc1tlbnRpdHkuaWRdID0gZW50aXR5XG5cbiAgICAvLyBjb21taXQgaW5pdGlhbCBzdGF0ZSBhbmQgcHJvcHMuXG4gICAgY29tbWl0KGVudGl0eSlcblxuICAgIC8vIGNhbGxiYWNrIGJlZm9yZSBtb3VudGluZy5cbiAgICB0cmlnZ2VyKCdiZWZvcmVNb3VudCcsIGVudGl0eSwgW2VudGl0eS5jb250ZXh0XSlcbiAgICB0cmlnZ2VyKCdiZWZvcmVSZW5kZXInLCBlbnRpdHksIFtlbnRpdHkuY29udGV4dF0pXG5cbiAgICAvLyByZW5kZXIgdmlydHVhbCBlbGVtZW50LlxuICAgIHZhciB2aXJ0dWFsRWxlbWVudCA9IHJlbmRlckVudGl0eShlbnRpdHkpXG4gICAgLy8gY3JlYXRlIG5hdGl2ZSBlbGVtZW50LlxuICAgIHZhciBuYXRpdmVFbGVtZW50ID0gdG9OYXRpdmUoZW50aXR5LmlkLCAnMCcsIHZpcnR1YWxFbGVtZW50KVxuXG4gICAgZW50aXR5LnZpcnR1YWxFbGVtZW50ID0gdmlydHVhbEVsZW1lbnRcbiAgICBlbnRpdHkubmF0aXZlRWxlbWVudCA9IG5hdGl2ZUVsZW1lbnRcblxuICAgIC8vIEZpcmUgYWZ0ZXJSZW5kZXIgYW5kIGFmdGVyTW91bnQgaG9va3MgYXQgdGhlIGVuZFxuICAgIC8vIG9mIHRoZSByZW5kZXIgY3ljbGVcbiAgICBtb3VudFF1ZXVlLnB1c2goZW50aXR5LmlkKVxuXG4gICAgcmV0dXJuIG5hdGl2ZUVsZW1lbnRcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSBjb21wb25lbnQgZnJvbSB0aGUgbmF0aXZlIGRvbS5cbiAgICpcbiAgICogQHBhcmFtIHtFbnRpdHl9IGVudGl0eVxuICAgKi9cblxuICBmdW5jdGlvbiB1bm1vdW50RW50aXR5IChlbnRpdHlJZCkge1xuICAgIHZhciBlbnRpdHkgPSBlbnRpdGllc1tlbnRpdHlJZF1cbiAgICBpZiAoIWVudGl0eSkgcmV0dXJuXG4gICAgdHJpZ2dlcignYmVmb3JlVW5tb3VudCcsIGVudGl0eSwgW2VudGl0eS5jb250ZXh0LCBlbnRpdHkubmF0aXZlRWxlbWVudF0pXG4gICAgdW5tb3VudENoaWxkcmVuKGVudGl0eUlkKVxuICAgIHJlbW92ZUFsbEV2ZW50cyhlbnRpdHlJZClcbiAgICB2YXIgY29tcG9uZW50RW50aXRpZXMgPSBjb21wb25lbnRzW2VudGl0eUlkXS5lbnRpdGllcztcbiAgICBkZWxldGUgY29tcG9uZW50RW50aXRpZXNbZW50aXR5SWRdXG4gICAgZGVsZXRlIGNvbXBvbmVudHNbZW50aXR5SWRdXG4gICAgZGVsZXRlIGVudGl0aWVzW2VudGl0eUlkXVxuICAgIGRlbGV0ZSBjaGlsZHJlbltlbnRpdHlJZF1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW5kZXIgdGhlIGVudGl0eSBhbmQgbWFrZSBzdXJlIGl0IHJldHVybnMgYSBub2RlXG4gICAqXG4gICAqIEBwYXJhbSB7RW50aXR5fSBlbnRpdHlcbiAgICpcbiAgICogQHJldHVybiB7VmlydHVhbFRyZWV9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJlbmRlckVudGl0eSAoZW50aXR5KSB7XG4gICAgdmFyIGNvbXBvbmVudCA9IGVudGl0eS5jb21wb25lbnRcbiAgICBpZiAoIWNvbXBvbmVudC5yZW5kZXIpIHRocm93IG5ldyBFcnJvcignQ29tcG9uZW50IG5lZWRzIGEgcmVuZGVyIGZ1bmN0aW9uJylcbiAgICB2YXIgcmVzdWx0ID0gY29tcG9uZW50LnJlbmRlcihlbnRpdHkuY29udGV4dCwgc2V0U3RhdGUoZW50aXR5KSlcbiAgICBpZiAoIXJlc3VsdCkgdGhyb3cgbmV3IEVycm9yKCdSZW5kZXIgZnVuY3Rpb24gbXVzdCByZXR1cm4gYW4gZWxlbWVudC4nKVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGVuZXZlciBzZXRTdGF0ZSBvciBzZXRQcm9wcyBpcyBjYWxsZWQsIHdlIG1hcmsgdGhlIGVudGl0eVxuICAgKiBhcyBkaXJ0eSBpbiB0aGUgcmVuZGVyZXIuIFRoaXMgbGV0cyB1cyBvcHRpbWl6ZSB0aGUgcmUtcmVuZGVyaW5nXG4gICAqIGFuZCBza2lwIGNvbXBvbmVudHMgdGhhdCBkZWZpbml0ZWx5IGhhdmVuJ3QgY2hhbmdlZC5cbiAgICpcbiAgICogQHBhcmFtIHtFbnRpdHl9IGVudGl0eVxuICAgKlxuICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBjdXJyaWVkIGZ1bmN0aW9uIGZvciB1cGRhdGluZyB0aGUgc3RhdGUgb2YgYW4gZW50aXR5XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHNldFN0YXRlIChlbnRpdHkpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKG5leHRTdGF0ZSkge1xuICAgICAgdXBkYXRlRW50aXR5U3RhdGVBc3luYyhlbnRpdHksIG5leHRTdGF0ZSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGVsbCB0aGUgYXBwIGl0J3MgZGlydHkgYW5kIG5lZWRzIHRvIHJlLXJlbmRlci4gSWYgYmF0Y2hpbmcgaXMgZGlzYWJsZWRcbiAgICogd2UgY2FuIGp1c3QgdHJpZ2dlciBhIHJlbmRlciBpbW1lZGlhdGVseSwgb3RoZXJ3aXNlIHdlJ2xsIHdhaXQgdW50aWxcbiAgICogdGhlIG5leHQgYXZhaWxhYmxlIGZyYW1lLlxuICAgKi9cblxuICBmdW5jdGlvbiBpbnZhbGlkYXRlICgpIHtcbiAgICBpZiAoIW9wdGlvbnMuYmF0Y2hpbmcpIHtcbiAgICAgIGlmICghaXNSZW5kZXJpbmcpIHJlbmRlcigpXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghZnJhbWVJZCkgZnJhbWVJZCA9IHJhZihyZW5kZXIpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgRE9NLiBJZiB0aGUgdXBkYXRlIGZhaWxzIHdlIHN0b3AgdGhlIGxvb3BcbiAgICogc28gd2UgZG9uJ3QgZ2V0IGVycm9ycyBvbiBldmVyeSBmcmFtZS5cbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gcmVuZGVyICgpIHtcbiAgICAvLyBJZiB0aGlzIGlzIGNhbGxlZCBzeW5jaHJvbm91c2x5IHdlIG5lZWQgdG9cbiAgICAvLyBjYW5jZWwgYW55IHBlbmRpbmcgZnV0dXJlIHVwZGF0ZXNcbiAgICBjbGVhckZyYW1lKClcblxuICAgIC8vIElmIHRoZSByZW5kZXJpbmcgZnJvbSB0aGUgcHJldmlvdXMgZnJhbWUgaXMgc3RpbGwgZ29pbmcsXG4gICAgLy8gd2UnbGwganVzdCB3YWl0IHVudGlsIHRoZSBuZXh0IGZyYW1lLiBJZGVhbGx5IHJlbmRlcnMgc2hvdWxkXG4gICAgLy8gbm90IHRha2Ugb3ZlciAxNm1zIHRvIHN0YXkgd2l0aGluIGEgc2luZ2xlIGZyYW1lLCBidXQgdGhpcyBzaG91bGRcbiAgICAvLyBjYXRjaCBpdCBpZiBpdCBkb2VzLlxuICAgIGlmIChpc1JlbmRlcmluZykge1xuICAgICAgZnJhbWVJZCA9IHJhZihyZW5kZXIpXG4gICAgICByZXR1cm5cbiAgICB9IGVsc2Uge1xuICAgICAgaXNSZW5kZXJpbmcgPSB0cnVlXG4gICAgfVxuXG4gICAgLy8gMS4gSWYgdGhlcmUgaXNuJ3QgYSBuYXRpdmUgZWxlbWVudCByZW5kZXJlZCBmb3IgdGhlIGN1cnJlbnQgbW91bnRlZCBlbGVtZW50XG4gICAgLy8gdGhlbiB3ZSBuZWVkIHRvIGNyZWF0ZSBpdCBmcm9tIHNjcmF0Y2guXG4gICAgLy8gMi4gSWYgYSBuZXcgZWxlbWVudCBoYXMgYmVlbiBtb3VudGVkLCB3ZSBzaG91bGQgZGlmZiB0aGVtLlxuICAgIC8vIDMuIFdlIHNob3VsZCB1cGRhdGUgY2hlY2sgYWxsIGNoaWxkIGNvbXBvbmVudHMgZm9yIGNoYW5nZXMuXG4gICAgaWYgKCFjdXJyZW50TmF0aXZlRWxlbWVudCkge1xuICAgICAgY3VycmVudEVsZW1lbnQgPSBhcHAuZWxlbWVudFxuICAgICAgY3VycmVudE5hdGl2ZUVsZW1lbnQgPSB0b05hdGl2ZShyb290SWQsICcwJywgY3VycmVudEVsZW1lbnQpXG4gICAgICBpZiAoY29udGFpbmVyLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc29sZS5pbmZvKCdkZWt1OiBUaGUgY29udGFpbmVyIGVsZW1lbnQgaXMgbm90IGVtcHR5LiBUaGVzZSBlbGVtZW50cyB3aWxsIGJlIHJlbW92ZWQuIFJlYWQgbW9yZTogaHR0cDovL2NsLmx5L2IwU3InKVxuICAgICAgfVxuICAgICAgaWYgKGNvbnRhaW5lciA9PT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ2Rla3U6IFVzaW5nIGRvY3VtZW50LmJvZHkgaXMgYWxsb3dlZCBidXQgaXQgY2FuIGNhdXNlIHNvbWUgaXNzdWVzLiBSZWFkIG1vcmU6IGh0dHA6Ly9jbC5seS9iMFNDJylcbiAgICAgIH1cbiAgICAgIHJlbW92ZUFsbENoaWxkcmVuKGNvbnRhaW5lcik7XG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY3VycmVudE5hdGl2ZUVsZW1lbnQpXG4gICAgfSBlbHNlIGlmIChjdXJyZW50RWxlbWVudCAhPT0gYXBwLmVsZW1lbnQpIHtcbiAgICAgIGN1cnJlbnROYXRpdmVFbGVtZW50ID0gcGF0Y2gocm9vdElkLCBjdXJyZW50RWxlbWVudCwgYXBwLmVsZW1lbnQsIGN1cnJlbnROYXRpdmVFbGVtZW50KVxuICAgICAgY3VycmVudEVsZW1lbnQgPSBhcHAuZWxlbWVudFxuICAgICAgdXBkYXRlQ2hpbGRyZW4ocm9vdElkKVxuICAgIH0gZWxzZSB7XG4gICAgICB1cGRhdGVDaGlsZHJlbihyb290SWQpXG4gICAgfVxuXG4gICAgLy8gQ2FsbCBtb3VudCBldmVudHMgb24gYWxsIG5ldyBlbnRpdGllc1xuICAgIGZsdXNoTW91bnRRdWV1ZSgpXG5cbiAgICAvLyBBbGxvdyByZW5kZXJpbmcgYWdhaW4uXG4gICAgaXNSZW5kZXJpbmcgPSBmYWxzZVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGwgaG9va3MgZm9yIGFsbCBuZXcgZW50aXRpZXMgdGhhdCBoYXZlIGJlZW4gY3JlYXRlZCBpblxuICAgKiB0aGUgbGFzdCByZW5kZXIgZnJvbSB0aGUgYm90dG9tIHVwLlxuICAgKi9cblxuICBmdW5jdGlvbiBmbHVzaE1vdW50UXVldWUgKCkge1xuICAgIHZhciBlbnRpdHlJZFxuICAgIHdoaWxlIChlbnRpdHlJZCA9IG1vdW50UXVldWUucG9wKCkpIHtcbiAgICAgIHZhciBlbnRpdHkgPSBlbnRpdGllc1tlbnRpdHlJZF1cbiAgICAgIHRyaWdnZXIoJ2FmdGVyUmVuZGVyJywgZW50aXR5LCBbZW50aXR5LmNvbnRleHQsIGVudGl0eS5uYXRpdmVFbGVtZW50XSlcbiAgICAgIHRyaWdnZXJVcGRhdGUoJ2FmdGVyTW91bnQnLCBlbnRpdHksIFtlbnRpdHkuY29udGV4dCwgZW50aXR5Lm5hdGl2ZUVsZW1lbnQsIHNldFN0YXRlKGVudGl0eSldKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciB0aGUgY3VycmVudCBzY2hlZHVsZWQgZnJhbWVcbiAgICovXG5cbiAgZnVuY3Rpb24gY2xlYXJGcmFtZSAoKSB7XG4gICAgaWYgKCFmcmFtZUlkKSByZXR1cm5cbiAgICByYWYuY2FuY2VsKGZyYW1lSWQpXG4gICAgZnJhbWVJZCA9IDBcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYSBjb21wb25lbnQuXG4gICAqXG4gICAqIFRoZSBlbnRpdHkgaXMganVzdCB0aGUgZGF0YSBvYmplY3QgZm9yIGEgY29tcG9uZW50IGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gaWQgQ29tcG9uZW50IGluc3RhbmNlIGlkLlxuICAgKi9cblxuICBmdW5jdGlvbiB1cGRhdGVFbnRpdHkgKGVudGl0eUlkKSB7XG4gICAgdmFyIGVudGl0eSA9IGVudGl0aWVzW2VudGl0eUlkXVxuICAgIHNldFNvdXJjZXMoZW50aXR5KVxuXG4gICAgaWYgKCFzaG91bGRVcGRhdGUoZW50aXR5KSkgcmV0dXJuIHVwZGF0ZUNoaWxkcmVuKGVudGl0eUlkKVxuXG4gICAgdmFyIGN1cnJlbnRUcmVlID0gZW50aXR5LnZpcnR1YWxFbGVtZW50XG4gICAgdmFyIG5leHRQcm9wcyA9IGVudGl0eS5wZW5kaW5nUHJvcHNcbiAgICB2YXIgbmV4dFN0YXRlID0gZW50aXR5LnBlbmRpbmdTdGF0ZVxuICAgIHZhciBwcmV2aW91c1N0YXRlID0gZW50aXR5LmNvbnRleHQuc3RhdGVcbiAgICB2YXIgcHJldmlvdXNQcm9wcyA9IGVudGl0eS5jb250ZXh0LnByb3BzXG5cbiAgICAvLyBob29rIGJlZm9yZSByZW5kZXJpbmcuIGNvdWxkIG1vZGlmeSBzdGF0ZSBqdXN0IGJlZm9yZSB0aGUgcmVuZGVyIG9jY3Vycy5cbiAgICB0cmlnZ2VyKCdiZWZvcmVVcGRhdGUnLCBlbnRpdHksIFtlbnRpdHkuY29udGV4dCwgbmV4dFByb3BzLCBuZXh0U3RhdGVdKVxuICAgIHRyaWdnZXIoJ2JlZm9yZVJlbmRlcicsIGVudGl0eSwgW2VudGl0eS5jb250ZXh0XSlcblxuICAgIC8vIGNvbW1pdCBzdGF0ZSBhbmQgcHJvcHMuXG4gICAgY29tbWl0KGVudGl0eSlcblxuICAgIC8vIHJlLXJlbmRlci5cbiAgICB2YXIgbmV4dFRyZWUgPSByZW5kZXJFbnRpdHkoZW50aXR5KVxuXG4gICAgLy8gaWYgdGhlIHRyZWUgaXMgdGhlIHNhbWUgd2UgY2FuIGp1c3Qgc2tpcCB0aGlzIGNvbXBvbmVudFxuICAgIC8vIGJ1dCB3ZSBzaG91bGQgc3RpbGwgY2hlY2sgdGhlIGNoaWxkcmVuIHRvIHNlZSBpZiB0aGV5J3JlIGRpcnR5LlxuICAgIC8vIFRoaXMgYWxsb3dzIHVzIHRvIG1lbW9pemUgdGhlIHJlbmRlciBmdW5jdGlvbiBvZiBjb21wb25lbnRzLlxuICAgIGlmIChuZXh0VHJlZSA9PT0gY3VycmVudFRyZWUpIHJldHVybiB1cGRhdGVDaGlsZHJlbihlbnRpdHlJZClcblxuICAgIC8vIGFwcGx5IG5ldyB2aXJ0dWFsIHRyZWUgdG8gbmF0aXZlIGRvbS5cbiAgICBlbnRpdHkubmF0aXZlRWxlbWVudCA9IHBhdGNoKGVudGl0eUlkLCBjdXJyZW50VHJlZSwgbmV4dFRyZWUsIGVudGl0eS5uYXRpdmVFbGVtZW50KVxuICAgIGVudGl0eS52aXJ0dWFsRWxlbWVudCA9IG5leHRUcmVlXG4gICAgdXBkYXRlQ2hpbGRyZW4oZW50aXR5SWQpXG5cbiAgICAvLyB0cmlnZ2VyIHJlbmRlciBob29rXG4gICAgdHJpZ2dlcignYWZ0ZXJSZW5kZXInLCBlbnRpdHksIFtlbnRpdHkuY29udGV4dCwgZW50aXR5Lm5hdGl2ZUVsZW1lbnRdKVxuXG4gICAgLy8gdHJpZ2dlciBhZnRlclVwZGF0ZSBhZnRlciBhbGwgY2hpbGRyZW4gaGF2ZSB1cGRhdGVkLlxuICAgIHRyaWdnZXJVcGRhdGUoJ2FmdGVyVXBkYXRlJywgZW50aXR5LCBbZW50aXR5LmNvbnRleHQsIHByZXZpb3VzUHJvcHMsIHByZXZpb3VzU3RhdGVdKVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBhbGwgdGhlIGNoaWxkcmVuIG9mIGFuIGVudGl0eS5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGlkIENvbXBvbmVudCBpbnN0YW5jZSBpZC5cbiAgICovXG5cbiAgZnVuY3Rpb24gdXBkYXRlQ2hpbGRyZW4gKGVudGl0eUlkKSB7XG4gICAgZm9yRWFjaChjaGlsZHJlbltlbnRpdHlJZF0sIGZ1bmN0aW9uIChjaGlsZElkKSB7XG4gICAgICB1cGRhdGVFbnRpdHkoY2hpbGRJZClcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhbGwgb2YgdGhlIGNoaWxkIGVudGl0aWVzIG9mIGFuIGVudGl0eVxuICAgKlxuICAgKiBAcGFyYW0ge0VudGl0eX0gZW50aXR5XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHVubW91bnRDaGlsZHJlbiAoZW50aXR5SWQpIHtcbiAgICBmb3JFYWNoKGNoaWxkcmVuW2VudGl0eUlkXSwgZnVuY3Rpb24gKGNoaWxkSWQpIHtcbiAgICAgIHVubW91bnRFbnRpdHkoY2hpbGRJZClcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSB0aGUgcm9vdCBlbGVtZW50LiBJZiB0aGlzIGlzIGNhbGxlZCBzeW5jaHJvbm91c2x5IHdlIG5lZWQgdG9cbiAgICogY2FuY2VsIGFueSBwZW5kaW5nIGZ1dHVyZSB1cGRhdGVzLlxuICAgKi9cblxuICBmdW5jdGlvbiByZW1vdmVOYXRpdmVFbGVtZW50ICgpIHtcbiAgICBjbGVhckZyYW1lKClcbiAgICByZW1vdmVFbGVtZW50KHJvb3RJZCwgJzAnLCBjdXJyZW50TmF0aXZlRWxlbWVudClcbiAgICBjdXJyZW50TmF0aXZlRWxlbWVudCA9IG51bGxcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuYXRpdmUgZWxlbWVudCBmcm9tIGEgdmlydHVhbCBlbGVtZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gZW50aXR5SWRcbiAgICogQHBhcmFtIHtTdHJpbmd9IHBhdGhcbiAgICogQHBhcmFtIHtPYmplY3R9IHZub2RlXG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxEb2N1bWVudEZyYWdtZW50fVxuICAgKi9cblxuICBmdW5jdGlvbiB0b05hdGl2ZSAoZW50aXR5SWQsIHBhdGgsIHZub2RlKSB7XG4gICAgc3dpdGNoICh2bm9kZS50eXBlKSB7XG4gICAgICBjYXNlICd0ZXh0JzogcmV0dXJuIHRvTmF0aXZlVGV4dCh2bm9kZSlcbiAgICAgIGNhc2UgJ2VsZW1lbnQnOiByZXR1cm4gdG9OYXRpdmVFbGVtZW50KGVudGl0eUlkLCBwYXRoLCB2bm9kZSlcbiAgICAgIGNhc2UgJ2NvbXBvbmVudCc6IHJldHVybiB0b05hdGl2ZUNvbXBvbmVudChlbnRpdHlJZCwgcGF0aCwgdm5vZGUpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5hdGl2ZSB0ZXh0IGVsZW1lbnQgZnJvbSBhIHZpcnR1YWwgZWxlbWVudC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHZub2RlXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHRvTmF0aXZlVGV4dCAodm5vZGUpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodm5vZGUuZGF0YSlcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuYXRpdmUgZWxlbWVudCBmcm9tIGEgdmlydHVhbCBlbGVtZW50LlxuICAgKi9cblxuICBmdW5jdGlvbiB0b05hdGl2ZUVsZW1lbnQgKGVudGl0eUlkLCBwYXRoLCB2bm9kZSkge1xuICAgIHZhciBhdHRyaWJ1dGVzID0gdm5vZGUuYXR0cmlidXRlc1xuICAgIHZhciBjaGlsZHJlbiA9IHZub2RlLmNoaWxkcmVuXG4gICAgdmFyIHRhZ05hbWUgPSB2bm9kZS50YWdOYW1lXG4gICAgdmFyIGVsXG5cbiAgICAvLyBjcmVhdGUgZWxlbWVudCBlaXRoZXIgZnJvbSBwb29sIG9yIGZyZXNoLlxuICAgIGlmICghb3B0aW9ucy5wb29saW5nIHx8ICFjYW5Qb29sKHRhZ05hbWUpKSB7XG4gICAgICBpZiAoc3ZnLmlzRWxlbWVudCh0YWdOYW1lKSkge1xuICAgICAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhzdmcubmFtZXNwYWNlLCB0YWdOYW1lKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBwb29sID0gZ2V0UG9vbCh0YWdOYW1lKVxuICAgICAgZWwgPSBjbGVhbnVwKHBvb2wucG9wKCkpXG4gICAgICBpZiAoZWwucGFyZW50Tm9kZSkgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbClcbiAgICB9XG5cbiAgICAvLyBzZXQgYXR0cmlidXRlcy5cbiAgICBmb3JFYWNoKGF0dHJpYnV0ZXMsIGZ1bmN0aW9uICh2YWx1ZSwgbmFtZSkge1xuICAgICAgc2V0QXR0cmlidXRlKGVudGl0eUlkLCBwYXRoLCBlbCwgbmFtZSwgdmFsdWUpXG4gICAgfSlcblxuICAgIC8vIHN0b3JlIGtleXMgb24gdGhlIG5hdGl2ZSBlbGVtZW50IGZvciBmYXN0IGV2ZW50IGhhbmRsaW5nLlxuICAgIGVsLl9fZW50aXR5X18gPSBlbnRpdHlJZFxuICAgIGVsLl9fcGF0aF9fID0gcGF0aFxuXG4gICAgLy8gYWRkIGNoaWxkcmVuLlxuICAgIGZvckVhY2goY2hpbGRyZW4sIGZ1bmN0aW9uIChjaGlsZCwgaSkge1xuICAgICAgdmFyIGNoaWxkRWwgPSB0b05hdGl2ZShlbnRpdHlJZCwgcGF0aCArICcuJyArIGksIGNoaWxkKVxuICAgICAgaWYgKCFjaGlsZEVsLnBhcmVudE5vZGUpIGVsLmFwcGVuZENoaWxkKGNoaWxkRWwpXG4gICAgfSlcblxuICAgIHJldHVybiBlbFxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5hdGl2ZSBlbGVtZW50IGZyb20gYSBjb21wb25lbnQuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHRvTmF0aXZlQ29tcG9uZW50IChlbnRpdHlJZCwgcGF0aCwgdm5vZGUpIHtcbiAgICB2YXIgY2hpbGQgPSBuZXcgRW50aXR5KHZub2RlLmNvbXBvbmVudCwgdm5vZGUucHJvcHMsIGVudGl0eUlkKVxuICAgIGNoaWxkcmVuW2VudGl0eUlkXVtwYXRoXSA9IGNoaWxkLmlkXG4gICAgcmV0dXJuIG1vdW50RW50aXR5KGNoaWxkKVxuICB9XG5cbiAgLyoqXG4gICAqIFBhdGNoIGFuIGVsZW1lbnQgd2l0aCB0aGUgZGlmZiBmcm9tIHR3byB0cmVlcy5cbiAgICovXG5cbiAgZnVuY3Rpb24gcGF0Y2ggKGVudGl0eUlkLCBwcmV2LCBuZXh0LCBlbCkge1xuICAgIHJldHVybiBkaWZmTm9kZSgnMCcsIGVudGl0eUlkLCBwcmV2LCBuZXh0LCBlbClcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBkaWZmIGJldHdlZW4gdHdvIHRyZWVzIG9mIG5vZGVzLlxuICAgKi9cblxuICBmdW5jdGlvbiBkaWZmTm9kZSAocGF0aCwgZW50aXR5SWQsIHByZXYsIG5leHQsIGVsKSB7XG4gICAgLy8gVHlwZSBjaGFuZ2VkLiBUaGlzIGNvdWxkIGJlIGZyb20gZWxlbWVudC0+dGV4dCwgdGV4dC0+Q29tcG9uZW50QSxcbiAgICAvLyBDb21wb25lbnRBLT5Db21wb25lbnRCIGV0Yy4gQnV0IE5PVCBkaXYtPnNwYW4uIFRoZXNlIGFyZSB0aGUgc2FtZSB0eXBlXG4gICAgLy8gKEVsZW1lbnROb2RlKSBidXQgZGlmZmVyZW50IHRhZyBuYW1lLlxuICAgIGlmIChwcmV2LnR5cGUgIT09IG5leHQudHlwZSkgcmV0dXJuIHJlcGxhY2VFbGVtZW50KGVudGl0eUlkLCBwYXRoLCBlbCwgbmV4dClcblxuICAgIHN3aXRjaCAobmV4dC50eXBlKSB7XG4gICAgICBjYXNlICd0ZXh0JzogcmV0dXJuIGRpZmZUZXh0KHByZXYsIG5leHQsIGVsKVxuICAgICAgY2FzZSAnZWxlbWVudCc6IHJldHVybiBkaWZmRWxlbWVudChwYXRoLCBlbnRpdHlJZCwgcHJldiwgbmV4dCwgZWwpXG4gICAgICBjYXNlICdjb21wb25lbnQnOiByZXR1cm4gZGlmZkNvbXBvbmVudChwYXRoLCBlbnRpdHlJZCwgcHJldiwgbmV4dCwgZWwpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERpZmYgdHdvIHRleHQgbm9kZXMgYW5kIHVwZGF0ZSB0aGUgZWxlbWVudC5cbiAgICovXG5cbiAgZnVuY3Rpb24gZGlmZlRleHQgKHByZXZpb3VzLCBjdXJyZW50LCBlbCkge1xuICAgIGlmIChjdXJyZW50LmRhdGEgIT09IHByZXZpb3VzLmRhdGEpIGVsLmRhdGEgPSBjdXJyZW50LmRhdGFcbiAgICByZXR1cm4gZWxcbiAgfVxuXG4gIC8qKlxuICAgKiBEaWZmIHRoZSBjaGlsZHJlbiBvZiBhbiBFbGVtZW50Tm9kZS5cbiAgICovXG5cbiAgZnVuY3Rpb24gZGlmZkNoaWxkcmVuIChwYXRoLCBlbnRpdHlJZCwgcHJldiwgbmV4dCwgZWwpIHtcbiAgICB2YXIgcG9zaXRpb25zID0gW11cbiAgICB2YXIgaGFzS2V5cyA9IGZhbHNlXG4gICAgdmFyIGNoaWxkTm9kZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuYXBwbHkoZWwuY2hpbGROb2RlcylcbiAgICB2YXIgbGVmdEtleXMgPSByZWR1Y2UocHJldi5jaGlsZHJlbiwga2V5TWFwUmVkdWNlciwge30pXG4gICAgdmFyIHJpZ2h0S2V5cyA9IHJlZHVjZShuZXh0LmNoaWxkcmVuLCBrZXlNYXBSZWR1Y2VyLCB7fSlcbiAgICB2YXIgY3VycmVudENoaWxkcmVuID0gYXNzaWduKHt9LCBjaGlsZHJlbltlbnRpdHlJZF0pXG5cbiAgICBmdW5jdGlvbiBrZXlNYXBSZWR1Y2VyIChhY2MsIGNoaWxkKSB7XG4gICAgICBpZiAoY2hpbGQua2V5ICE9IG51bGwpIHtcbiAgICAgICAgYWNjW2NoaWxkLmtleV0gPSBjaGlsZFxuICAgICAgICBoYXNLZXlzID0gdHJ1ZVxuICAgICAgfVxuICAgICAgcmV0dXJuIGFjY1xuICAgIH1cblxuICAgIC8vIERpZmYgYWxsIG9mIHRoZSBub2RlcyB0aGF0IGhhdmUga2V5cy4gVGhpcyBsZXRzIHVzIHJlLXVzZWQgZWxlbWVudHNcbiAgICAvLyBpbnN0ZWFkIG9mIG92ZXJyaWRpbmcgdGhlbSBhbmQgbGV0cyB1cyBtb3ZlIHRoZW0gYXJvdW5kLlxuICAgIGlmIChoYXNLZXlzKSB7XG5cbiAgICAgIC8vIFJlbW92YWxzXG4gICAgICBmb3JFYWNoKGxlZnRLZXlzLCBmdW5jdGlvbiAobGVmdE5vZGUsIGtleSkge1xuICAgICAgICBpZiAocmlnaHRLZXlzW2tleV0gPT0gbnVsbCkge1xuICAgICAgICAgIHZhciBsZWZ0UGF0aCA9IHBhdGggKyAnLicgKyBsZWZ0Tm9kZS5pbmRleFxuICAgICAgICAgIHJlbW92ZUVsZW1lbnQoXG4gICAgICAgICAgICBlbnRpdHlJZCxcbiAgICAgICAgICAgIGxlZnRQYXRoLFxuICAgICAgICAgICAgY2hpbGROb2Rlc1tsZWZ0Tm9kZS5pbmRleF1cbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIC8vIFVwZGF0ZSBub2Rlc1xuICAgICAgZm9yRWFjaChyaWdodEtleXMsIGZ1bmN0aW9uIChyaWdodE5vZGUsIGtleSkge1xuICAgICAgICB2YXIgbGVmdE5vZGUgPSBsZWZ0S2V5c1trZXldXG5cbiAgICAgICAgLy8gV2Ugb25seSB3YW50IHVwZGF0ZXMgZm9yIG5vd1xuICAgICAgICBpZiAobGVmdE5vZGUgPT0gbnVsbCkgcmV0dXJuXG5cbiAgICAgICAgdmFyIGxlZnRQYXRoID0gcGF0aCArICcuJyArIGxlZnROb2RlLmluZGV4XG5cbiAgICAgICAgLy8gVXBkYXRlZFxuICAgICAgICBwb3NpdGlvbnNbcmlnaHROb2RlLmluZGV4XSA9IGRpZmZOb2RlKFxuICAgICAgICAgIGxlZnRQYXRoLFxuICAgICAgICAgIGVudGl0eUlkLFxuICAgICAgICAgIGxlZnROb2RlLFxuICAgICAgICAgIHJpZ2h0Tm9kZSxcbiAgICAgICAgICBjaGlsZE5vZGVzW2xlZnROb2RlLmluZGV4XVxuICAgICAgICApXG4gICAgICB9KVxuXG4gICAgICAvLyBVcGRhdGUgdGhlIHBvc2l0aW9ucyBvZiBhbGwgY2hpbGQgY29tcG9uZW50cyBhbmQgZXZlbnQgaGFuZGxlcnNcbiAgICAgIGZvckVhY2gocmlnaHRLZXlzLCBmdW5jdGlvbiAocmlnaHROb2RlLCBrZXkpIHtcbiAgICAgICAgdmFyIGxlZnROb2RlID0gbGVmdEtleXNba2V5XVxuXG4gICAgICAgIC8vIFdlIGp1c3Qgd2FudCBlbGVtZW50cyB0aGF0IGhhdmUgbW92ZWQgYXJvdW5kXG4gICAgICAgIGlmIChsZWZ0Tm9kZSA9PSBudWxsIHx8IGxlZnROb2RlLmluZGV4ID09PSByaWdodE5vZGUuaW5kZXgpIHJldHVyblxuXG4gICAgICAgIHZhciByaWdodFBhdGggPSBwYXRoICsgJy4nICsgcmlnaHROb2RlLmluZGV4XG4gICAgICAgIHZhciBsZWZ0UGF0aCA9IHBhdGggKyAnLicgKyBsZWZ0Tm9kZS5pbmRleFxuXG4gICAgICAgIC8vIFVwZGF0ZSBhbGwgdGhlIGNoaWxkIGNvbXBvbmVudCBwYXRoIHBvc2l0aW9ucyB0byBtYXRjaFxuICAgICAgICAvLyB0aGUgbGF0ZXN0IHBvc2l0aW9ucyBpZiB0aGV5J3ZlIGNoYW5nZWQuIFRoaXMgaXMgYSBiaXQgaGFja3kuXG4gICAgICAgIGZvckVhY2goY3VycmVudENoaWxkcmVuLCBmdW5jdGlvbiAoY2hpbGRJZCwgY2hpbGRQYXRoKSB7XG4gICAgICAgICAgaWYgKGxlZnRQYXRoID09PSBjaGlsZFBhdGgpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBjaGlsZHJlbltlbnRpdHlJZF1bY2hpbGRQYXRoXVxuICAgICAgICAgICAgY2hpbGRyZW5bZW50aXR5SWRdW3JpZ2h0UGF0aF0gPSBjaGlsZElkXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSlcblxuICAgICAgLy8gTm93IGFkZCBhbGwgb2YgdGhlIG5ldyBub2RlcyBsYXN0IGluIGNhc2UgdGhlaXIgcGF0aFxuICAgICAgLy8gd291bGQgaGF2ZSBjb25mbGljdGVkIHdpdGggb25lIG9mIHRoZSBwcmV2aW91cyBwYXRocy5cbiAgICAgIGZvckVhY2gocmlnaHRLZXlzLCBmdW5jdGlvbiAocmlnaHROb2RlLCBrZXkpIHtcbiAgICAgICAgdmFyIHJpZ2h0UGF0aCA9IHBhdGggKyAnLicgKyByaWdodE5vZGUuaW5kZXhcbiAgICAgICAgaWYgKGxlZnRLZXlzW2tleV0gPT0gbnVsbCkge1xuICAgICAgICAgIHBvc2l0aW9uc1tyaWdodE5vZGUuaW5kZXhdID0gdG9OYXRpdmUoXG4gICAgICAgICAgICBlbnRpdHlJZCxcbiAgICAgICAgICAgIHJpZ2h0UGF0aCxcbiAgICAgICAgICAgIHJpZ2h0Tm9kZVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgbWF4TGVuZ3RoID0gTWF0aC5tYXgocHJldi5jaGlsZHJlbi5sZW5ndGgsIG5leHQuY2hpbGRyZW4ubGVuZ3RoKVxuXG4gICAgICAvLyBOb3cgZGlmZiBhbGwgb2YgdGhlIG5vZGVzIHRoYXQgZG9uJ3QgaGF2ZSBrZXlzXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1heExlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBsZWZ0Tm9kZSA9IHByZXYuY2hpbGRyZW5baV1cbiAgICAgICAgdmFyIHJpZ2h0Tm9kZSA9IG5leHQuY2hpbGRyZW5baV1cblxuICAgICAgICAvLyBSZW1vdmFsc1xuICAgICAgICBpZiAocmlnaHROb2RlID09IG51bGwpIHtcbiAgICAgICAgICByZW1vdmVFbGVtZW50KFxuICAgICAgICAgICAgZW50aXR5SWQsXG4gICAgICAgICAgICBwYXRoICsgJy4nICsgbGVmdE5vZGUuaW5kZXgsXG4gICAgICAgICAgICBjaGlsZE5vZGVzW2xlZnROb2RlLmluZGV4XVxuICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE5ldyBOb2RlXG4gICAgICAgIGlmIChsZWZ0Tm9kZSA9PSBudWxsKSB7XG4gICAgICAgICAgcG9zaXRpb25zW3JpZ2h0Tm9kZS5pbmRleF0gPSB0b05hdGl2ZShcbiAgICAgICAgICAgIGVudGl0eUlkLFxuICAgICAgICAgICAgcGF0aCArICcuJyArIHJpZ2h0Tm9kZS5pbmRleCxcbiAgICAgICAgICAgIHJpZ2h0Tm9kZVxuICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFVwZGF0ZWRcbiAgICAgICAgaWYgKGxlZnROb2RlICYmIHJpZ2h0Tm9kZSkge1xuICAgICAgICAgIHBvc2l0aW9uc1tsZWZ0Tm9kZS5pbmRleF0gPSBkaWZmTm9kZShcbiAgICAgICAgICAgIHBhdGggKyAnLicgKyBsZWZ0Tm9kZS5pbmRleCxcbiAgICAgICAgICAgIGVudGl0eUlkLFxuICAgICAgICAgICAgbGVmdE5vZGUsXG4gICAgICAgICAgICByaWdodE5vZGUsXG4gICAgICAgICAgICBjaGlsZE5vZGVzW2xlZnROb2RlLmluZGV4XVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlcG9zaXRpb24gYWxsIHRoZSBlbGVtZW50c1xuICAgIGZvckVhY2gocG9zaXRpb25zLCBmdW5jdGlvbiAoY2hpbGRFbCwgbmV3UG9zaXRpb24pIHtcbiAgICAgIHZhciB0YXJnZXQgPSBlbC5jaGlsZE5vZGVzW25ld1Bvc2l0aW9uXVxuICAgICAgaWYgKGNoaWxkRWwgIT09IHRhcmdldCkge1xuICAgICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgICAgZWwuaW5zZXJ0QmVmb3JlKGNoaWxkRWwsIHRhcmdldClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbC5hcHBlbmRDaGlsZChjaGlsZEVsKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBEaWZmIHRoZSBhdHRyaWJ1dGVzIGFuZCBhZGQvcmVtb3ZlIHRoZW0uXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGRpZmZBdHRyaWJ1dGVzIChwcmV2LCBuZXh0LCBlbCwgZW50aXR5SWQsIHBhdGgpIHtcbiAgICB2YXIgbmV4dEF0dHJzID0gbmV4dC5hdHRyaWJ1dGVzXG4gICAgdmFyIHByZXZBdHRycyA9IHByZXYuYXR0cmlidXRlc1xuXG4gICAgLy8gYWRkIG5ldyBhdHRyc1xuICAgIGZvckVhY2gobmV4dEF0dHJzLCBmdW5jdGlvbiAodmFsdWUsIG5hbWUpIHtcbiAgICAgIGlmIChldmVudHNbbmFtZV0gfHwgIShuYW1lIGluIHByZXZBdHRycykgfHwgcHJldkF0dHJzW25hbWVdICE9PSB2YWx1ZSkge1xuICAgICAgICBzZXRBdHRyaWJ1dGUoZW50aXR5SWQsIHBhdGgsIGVsLCBuYW1lLCB2YWx1ZSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gcmVtb3ZlIG9sZCBhdHRyc1xuICAgIGZvckVhY2gocHJldkF0dHJzLCBmdW5jdGlvbiAodmFsdWUsIG5hbWUpIHtcbiAgICAgIGlmICghKG5hbWUgaW4gbmV4dEF0dHJzKSkge1xuICAgICAgICByZW1vdmVBdHRyaWJ1dGUoZW50aXR5SWQsIHBhdGgsIGVsLCBuYW1lKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGEgY29tcG9uZW50IHdpdGggdGhlIHByb3BzIGZyb20gdGhlIG5leHQgbm9kZS4gSWZcbiAgICogdGhlIGNvbXBvbmVudCB0eXBlIGhhcyBjaGFuZ2VkLCB3ZSdsbCBqdXN0IHJlbW92ZSB0aGUgb2xkIG9uZVxuICAgKiBhbmQgcmVwbGFjZSBpdCB3aXRoIHRoZSBuZXcgY29tcG9uZW50LlxuICAgKi9cblxuICBmdW5jdGlvbiBkaWZmQ29tcG9uZW50IChwYXRoLCBlbnRpdHlJZCwgcHJldiwgbmV4dCwgZWwpIHtcbiAgICBpZiAobmV4dC5jb21wb25lbnQgIT09IHByZXYuY29tcG9uZW50KSB7XG4gICAgICByZXR1cm4gcmVwbGFjZUVsZW1lbnQoZW50aXR5SWQsIHBhdGgsIGVsLCBuZXh0KVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdGFyZ2V0SWQgPSBjaGlsZHJlbltlbnRpdHlJZF1bcGF0aF1cblxuICAgICAgLy8gVGhpcyBpcyBhIGhhY2sgZm9yIG5vd1xuICAgICAgaWYgKHRhcmdldElkKSB7XG4gICAgICAgIHVwZGF0ZUVudGl0eVByb3BzKHRhcmdldElkLCBuZXh0LnByb3BzKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZWxcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGlmZiB0d28gZWxlbWVudCBub2Rlcy5cbiAgICovXG5cbiAgZnVuY3Rpb24gZGlmZkVsZW1lbnQgKHBhdGgsIGVudGl0eUlkLCBwcmV2LCBuZXh0LCBlbCkge1xuICAgIGlmIChuZXh0LnRhZ05hbWUgIT09IHByZXYudGFnTmFtZSkgcmV0dXJuIHJlcGxhY2VFbGVtZW50KGVudGl0eUlkLCBwYXRoLCBlbCwgbmV4dClcbiAgICBkaWZmQXR0cmlidXRlcyhwcmV2LCBuZXh0LCBlbCwgZW50aXR5SWQsIHBhdGgpXG4gICAgZGlmZkNoaWxkcmVuKHBhdGgsIGVudGl0eUlkLCBwcmV2LCBuZXh0LCBlbClcbiAgICByZXR1cm4gZWxcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFuIGVsZW1lbnQgZnJvbSB0aGUgRE9NIGFuZCB1bm1vdW50cyBhbmQgY29tcG9uZW50c1xuICAgKiB0aGF0IGFyZSB3aXRoaW4gdGhhdCBicmFuY2hcbiAgICpcbiAgICogc2lkZSBlZmZlY3RzOlxuICAgKiAgIC0gcmVtb3ZlcyBlbGVtZW50IGZyb20gdGhlIERPTVxuICAgKiAgIC0gcmVtb3ZlcyBpbnRlcm5hbCByZWZlcmVuY2VzXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBlbnRpdHlJZFxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aFxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICAgKi9cblxuICBmdW5jdGlvbiByZW1vdmVFbGVtZW50IChlbnRpdHlJZCwgcGF0aCwgZWwpIHtcbiAgICB2YXIgY2hpbGRyZW5CeVBhdGggPSBjaGlsZHJlbltlbnRpdHlJZF1cbiAgICB2YXIgY2hpbGRJZCA9IGNoaWxkcmVuQnlQYXRoW3BhdGhdXG4gICAgdmFyIGVudGl0eUhhbmRsZXJzID0gaGFuZGxlcnNbZW50aXR5SWRdIHx8IHt9XG4gICAgdmFyIHJlbW92YWxzID0gW11cblxuICAgIC8vIElmIHRoZSBwYXRoIHBvaW50cyB0byBhIGNvbXBvbmVudCB3ZSBzaG91bGQgdXNlIHRoYXRcbiAgICAvLyBjb21wb25lbnRzIGVsZW1lbnQgaW5zdGVhZCwgYmVjYXVzZSBpdCBtaWdodCBoYXZlIG1vdmVkIGl0LlxuICAgIGlmIChjaGlsZElkKSB7XG4gICAgICB2YXIgY2hpbGQgPSBlbnRpdGllc1tjaGlsZElkXVxuICAgICAgZWwgPSBjaGlsZC5uYXRpdmVFbGVtZW50XG4gICAgICB1bm1vdW50RW50aXR5KGNoaWxkSWQpXG4gICAgICByZW1vdmFscy5wdXNoKHBhdGgpXG4gICAgfSBlbHNlIHtcblxuICAgICAgLy8gSnVzdCByZW1vdmUgdGhlIHRleHQgbm9kZVxuICAgICAgaWYgKCFpc0VsZW1lbnQoZWwpKSByZXR1cm4gZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbClcblxuICAgICAgLy8gVGhlbiB3ZSBuZWVkIHRvIGZpbmQgYW55IGNvbXBvbmVudHMgd2l0aGluIHRoaXNcbiAgICAgIC8vIGJyYW5jaCBhbmQgdW5tb3VudCB0aGVtLlxuICAgICAgZm9yRWFjaChjaGlsZHJlbkJ5UGF0aCwgZnVuY3Rpb24gKGNoaWxkSWQsIGNoaWxkUGF0aCkge1xuICAgICAgICBpZiAoY2hpbGRQYXRoID09PSBwYXRoIHx8IGlzV2l0aGluUGF0aChwYXRoLCBjaGlsZFBhdGgpKSB7XG4gICAgICAgICAgdW5tb3VudEVudGl0eShjaGlsZElkKVxuICAgICAgICAgIHJlbW92YWxzLnB1c2goY2hpbGRQYXRoKVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICAvLyBSZW1vdmUgYWxsIGV2ZW50cyBhdCB0aGlzIHBhdGggb3IgYmVsb3cgaXRcbiAgICAgIGZvckVhY2goZW50aXR5SGFuZGxlcnMsIGZ1bmN0aW9uIChmbiwgaGFuZGxlclBhdGgpIHtcbiAgICAgICAgaWYgKGhhbmRsZXJQYXRoID09PSBwYXRoIHx8IGlzV2l0aGluUGF0aChwYXRoLCBoYW5kbGVyUGF0aCkpIHtcbiAgICAgICAgICByZW1vdmVFdmVudChlbnRpdHlJZCwgaGFuZGxlclBhdGgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIHRoZSBwYXRocyBmcm9tIHRoZSBvYmplY3Qgd2l0aG91dCB0b3VjaGluZyB0aGVcbiAgICAvLyBvbGQgb2JqZWN0LiBUaGlzIGtlZXBzIHRoZSBvYmplY3QgdXNpbmcgZmFzdCBwcm9wZXJ0aWVzLlxuICAgIGZvckVhY2gocmVtb3ZhbHMsIGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgICBkZWxldGUgY2hpbGRyZW5bZW50aXR5SWRdW3BhdGhdXG4gICAgfSlcblxuICAgIC8vIFJlbW92ZSBpdCBmcm9tIHRoZSBET01cbiAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKVxuXG4gICAgLy8gUmV0dXJuIGFsbCBvZiB0aGUgZWxlbWVudHMgaW4gdGhpcyBub2RlIHRyZWUgdG8gdGhlIHBvb2xcbiAgICAvLyBzbyB0aGF0IHRoZSBlbGVtZW50cyBjYW4gYmUgcmUtdXNlZC5cbiAgICBpZiAob3B0aW9ucy5wb29saW5nKSB7XG4gICAgICB3YWxrKGVsLCBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICBpZiAoIWlzRWxlbWVudChub2RlKSB8fCAhY2FuUG9vbChub2RlLnRhZ05hbWUpKSByZXR1cm5cbiAgICAgICAgZ2V0UG9vbChub2RlLnRhZ05hbWUudG9Mb3dlckNhc2UoKSkucHVzaChub2RlKVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVwbGFjZSBhbiBlbGVtZW50IGluIHRoZSBET00uIFJlbW92aW5nIGFsbCBjb21wb25lbnRzXG4gICAqIHdpdGhpbiB0aGF0IGVsZW1lbnQgYW5kIHJlLXJlbmRlcmluZyB0aGUgbmV3IHZpcnR1YWwgbm9kZS5cbiAgICpcbiAgICogQHBhcmFtIHtFbnRpdHl9IGVudGl0eVxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aFxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICAgKiBAcGFyYW0ge09iamVjdH0gdm5vZGVcbiAgICpcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG5cbiAgZnVuY3Rpb24gcmVwbGFjZUVsZW1lbnQgKGVudGl0eUlkLCBwYXRoLCBlbCwgdm5vZGUpIHtcbiAgICB2YXIgcGFyZW50ID0gZWwucGFyZW50Tm9kZVxuICAgIHZhciBpbmRleCA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwocGFyZW50LmNoaWxkTm9kZXMsIGVsKVxuXG4gICAgLy8gcmVtb3ZlIHRoZSBwcmV2aW91cyBlbGVtZW50IGFuZCBhbGwgbmVzdGVkIGNvbXBvbmVudHMuIFRoaXNcbiAgICAvLyBuZWVkcyB0byBoYXBwZW4gYmVmb3JlIHdlIGNyZWF0ZSB0aGUgbmV3IGVsZW1lbnQgc28gd2UgZG9uJ3RcbiAgICAvLyBnZXQgY2xhc2hlcyBvbiB0aGUgY29tcG9uZW50IHBhdGhzLlxuICAgIHJlbW92ZUVsZW1lbnQoZW50aXR5SWQsIHBhdGgsIGVsKVxuXG4gICAgLy8gdGhlbiBhZGQgdGhlIG5ldyBlbGVtZW50IGluIHRoZXJlXG4gICAgdmFyIG5ld0VsID0gdG9OYXRpdmUoZW50aXR5SWQsIHBhdGgsIHZub2RlKVxuICAgIHZhciB0YXJnZXQgPSBwYXJlbnQuY2hpbGROb2Rlc1tpbmRleF1cblxuICAgIGlmICh0YXJnZXQpIHtcbiAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUobmV3RWwsIHRhcmdldClcbiAgICB9IGVsc2Uge1xuICAgICAgcGFyZW50LmFwcGVuZENoaWxkKG5ld0VsKVxuICAgIH1cblxuICAgIC8vIHdhbGsgdXAgdGhlIHRyZWUgYW5kIHVwZGF0ZSBhbGwgYGVudGl0eS5uYXRpdmVFbGVtZW50YCByZWZlcmVuY2VzLlxuICAgIGlmIChlbnRpdHlJZCAhPT0gJ3Jvb3QnICYmIHBhdGggPT09ICcwJykge1xuICAgICAgdXBkYXRlTmF0aXZlRWxlbWVudChlbnRpdHlJZCwgbmV3RWwpXG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld0VsXG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGFsbCBlbnRpdGllcyBpbiBhIGJyYW5jaCB0aGF0IGhhdmUgdGhlIHNhbWUgbmF0aXZlRWxlbWVudC4gVGhpc1xuICAgKiBoYXBwZW5zIHdoZW4gYSBjb21wb25lbnQgaGFzIGFub3RoZXIgY29tcG9uZW50IGFzIGl0J3Mgcm9vdCBub2RlLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gZW50aXR5SWRcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbmV3RWxcbiAgICpcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG5cbiAgZnVuY3Rpb24gdXBkYXRlTmF0aXZlRWxlbWVudCAoZW50aXR5SWQsIG5ld0VsKSB7XG4gICAgdmFyIHRhcmdldCA9IGVudGl0aWVzW2VudGl0eUlkXVxuICAgIGlmICh0YXJnZXQub3duZXJJZCA9PT0gJ3Jvb3QnKSByZXR1cm5cbiAgICBpZiAoY2hpbGRyZW5bdGFyZ2V0Lm93bmVySWRdWycwJ10gPT09IGVudGl0eUlkKSB7XG4gICAgICBlbnRpdGllc1t0YXJnZXQub3duZXJJZF0ubmF0aXZlRWxlbWVudCA9IG5ld0VsXG4gICAgICB1cGRhdGVOYXRpdmVFbGVtZW50KHRhcmdldC5vd25lcklkLCBuZXdFbClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBhdHRyaWJ1dGUgb2YgYW4gZWxlbWVudCwgcGVyZm9ybWluZyBhZGRpdGlvbmFsIHRyYW5zZm9ybWF0aW9uc1xuICAgKiBkZXBlbmRuaW5nIG9uIHRoZSBhdHRyaWJ1dGUgbmFtZVxuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICovXG5cbiAgZnVuY3Rpb24gc2V0QXR0cmlidXRlIChlbnRpdHlJZCwgcGF0aCwgZWwsIG5hbWUsIHZhbHVlKSB7XG4gICAgaWYgKGV2ZW50c1tuYW1lXSkge1xuICAgICAgYWRkRXZlbnQoZW50aXR5SWQsIHBhdGgsIGV2ZW50c1tuYW1lXSwgdmFsdWUpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICBjYXNlICdjaGVja2VkJzpcbiAgICAgIGNhc2UgJ2Rpc2FibGVkJzpcbiAgICAgIGNhc2UgJ3NlbGVjdGVkJzpcbiAgICAgICAgZWxbbmFtZV0gPSB0cnVlXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdpbm5lckhUTUwnOlxuICAgICAgY2FzZSAndmFsdWUnOlxuICAgICAgICBlbFtuYW1lXSA9IHZhbHVlXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIHN2Zy5pc0F0dHJpYnV0ZShuYW1lKTpcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlTlMoc3ZnLm5hbWVzcGFjZSwgbmFtZSwgdmFsdWUpXG4gICAgICAgIGJyZWFrXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpXG4gICAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhbiBhdHRyaWJ1dGUsIHBlcmZvcm1pbmcgYWRkaXRpb25hbCB0cmFuc2Zvcm1hdGlvbnNcbiAgICogZGVwZW5kbmluZyBvbiB0aGUgYXR0cmlidXRlIG5hbWVcbiAgICpcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAgICovXG5cbiAgZnVuY3Rpb24gcmVtb3ZlQXR0cmlidXRlIChlbnRpdHlJZCwgcGF0aCwgZWwsIG5hbWUpIHtcbiAgICBpZiAoZXZlbnRzW25hbWVdKSB7XG4gICAgICByZW1vdmVFdmVudChlbnRpdHlJZCwgcGF0aCwgZXZlbnRzW25hbWVdKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgY2FzZSAnY2hlY2tlZCc6XG4gICAgICBjYXNlICdkaXNhYmxlZCc6XG4gICAgICBjYXNlICdzZWxlY3RlZCc6XG4gICAgICAgIGVsW25hbWVdID0gZmFsc2VcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ2lubmVySFRNTCc6XG4gICAgICBjYXNlICd2YWx1ZSc6XG4gICAgICAgIGVsW25hbWVdID0gXCJcIlxuICAgICAgICBicmVha1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKG5hbWUpXG4gICAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyB0byBzZWUgaWYgb25lIHRyZWUgcGF0aCBpcyB3aXRoaW5cbiAgICogYW5vdGhlciB0cmVlIHBhdGguIEV4YW1wbGU6XG4gICAqXG4gICAqIDAuMSB2cyAwLjEuMSA9IHRydWVcbiAgICogMC4yIHZzIDAuMy41ID0gZmFsc2VcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHRhcmdldFxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aFxuICAgKlxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cblxuICBmdW5jdGlvbiBpc1dpdGhpblBhdGggKHRhcmdldCwgcGF0aCkge1xuICAgIHJldHVybiBwYXRoLmluZGV4T2YodGFyZ2V0ICsgJy4nKSA9PT0gMFxuICB9XG5cbiAgLyoqXG4gICAqIElzIHRoZSBET00gbm9kZSBhbiBlbGVtZW50IG5vZGVcbiAgICpcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAgICpcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICovXG5cbiAgZnVuY3Rpb24gaXNFbGVtZW50IChlbCkge1xuICAgIHJldHVybiAhIWVsLnRhZ05hbWVcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHBvb2wgZm9yIGEgdGFnTmFtZSwgY3JlYXRpbmcgaXQgaWYgaXRcbiAgICogZG9lc24ndCBleGlzdC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHRhZ05hbWVcbiAgICpcbiAgICogQHJldHVybiB7UG9vbH1cbiAgICovXG5cbiAgZnVuY3Rpb24gZ2V0UG9vbCAodGFnTmFtZSkge1xuICAgIHZhciBwb29sID0gcG9vbHNbdGFnTmFtZV1cbiAgICBpZiAoIXBvb2wpIHtcbiAgICAgIHZhciBwb29sT3B0cyA9IHN2Zy5pc0VsZW1lbnQodGFnTmFtZSkgP1xuICAgICAgICB7IG5hbWVzcGFjZTogc3ZnLm5hbWVzcGFjZSwgdGFnTmFtZTogdGFnTmFtZSB9IDpcbiAgICAgICAgeyB0YWdOYW1lOiB0YWdOYW1lIH1cbiAgICAgIHBvb2wgPSBwb29sc1t0YWdOYW1lXSA9IG5ldyBQb29sKHBvb2xPcHRzKVxuICAgIH1cbiAgICByZXR1cm4gcG9vbFxuICB9XG5cbiAgLyoqXG4gICAqIENsZWFuIHVwIHByZXZpb3VzbHkgdXNlZCBuYXRpdmUgZWxlbWVudCBmb3IgcmV1c2UuXG4gICAqXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNsZWFudXAgKGVsKSB7XG4gICAgcmVtb3ZlQWxsQ2hpbGRyZW4oZWwpXG4gICAgcmVtb3ZlQWxsQXR0cmlidXRlcyhlbClcbiAgICByZXR1cm4gZWxcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYWxsIHRoZSBhdHRyaWJ1dGVzIGZyb20gYSBub2RlXG4gICAqXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJlbW92ZUFsbEF0dHJpYnV0ZXMgKGVsKSB7XG4gICAgZm9yICh2YXIgaSA9IGVsLmF0dHJpYnV0ZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBuYW1lID0gZWwuYXR0cmlidXRlc1tpXS5uYW1lXG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUobmFtZSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFsbCB0aGUgY2hpbGQgbm9kZXMgZnJvbSBhbiBlbGVtZW50XG4gICAqXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJlbW92ZUFsbENoaWxkcmVuIChlbCkge1xuICAgIHdoaWxlIChlbC5maXJzdENoaWxkKSBlbC5yZW1vdmVDaGlsZChlbC5maXJzdENoaWxkKVxuICB9XG5cbiAgLyoqXG4gICAqIFRyaWdnZXIgYSBob29rIG9uIGEgY29tcG9uZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBOYW1lIG9mIGhvb2suXG4gICAqIEBwYXJhbSB7RW50aXR5fSBlbnRpdHkgVGhlIGNvbXBvbmVudCBpbnN0YW5jZS5cbiAgICogQHBhcmFtIHtBcnJheX0gYXJncyBUbyBwYXNzIGFsb25nIHRvIGhvb2suXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHRyaWdnZXIgKG5hbWUsIGVudGl0eSwgYXJncykge1xuICAgIGlmICh0eXBlb2YgZW50aXR5LmNvbXBvbmVudFtuYW1lXSAhPT0gJ2Z1bmN0aW9uJykgcmV0dXJuXG4gICAgcmV0dXJuIGVudGl0eS5jb21wb25lbnRbbmFtZV0uYXBwbHkobnVsbCwgYXJncylcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VyIGEgaG9vayBvbiB0aGUgY29tcG9uZW50IGFuZCBhbGxvdyBzdGF0ZSB0byBiZVxuICAgKiB1cGRhdGVkIHRvby5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAgICogQHBhcmFtIHtPYmplY3R9IGVudGl0eVxuICAgKiBAcGFyYW0ge0FycmF5fSBhcmdzXG4gICAqXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHRyaWdnZXJVcGRhdGUgKG5hbWUsIGVudGl0eSwgYXJncykge1xuICAgIHZhciB1cGRhdGUgPSBzZXRTdGF0ZShlbnRpdHkpXG4gICAgYXJncy5wdXNoKHVwZGF0ZSlcbiAgICB2YXIgcmVzdWx0ID0gdHJpZ2dlcihuYW1lLCBlbnRpdHksIGFyZ3MpXG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgdXBkYXRlRW50aXR5U3RhdGVBc3luYyhlbnRpdHksIHJlc3VsdClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBlbnRpdHkgc3RhdGUgdXNpbmcgYSBwcm9taXNlXG4gICAqXG4gICAqIEBwYXJhbSB7RW50aXR5fSBlbnRpdHlcbiAgICogQHBhcmFtIHtQcm9taXNlfSBwcm9taXNlXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHVwZGF0ZUVudGl0eVN0YXRlQXN5bmMgKGVudGl0eSwgdmFsdWUpIHtcbiAgICBpZiAoaXNQcm9taXNlKHZhbHVlKSkge1xuICAgICAgdmFsdWUudGhlbihmdW5jdGlvbiAobmV3U3RhdGUpIHtcbiAgICAgICAgdXBkYXRlRW50aXR5U3RhdGUoZW50aXR5LCBuZXdTdGF0ZSlcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHVwZGF0ZUVudGl0eVN0YXRlKGVudGl0eSwgdmFsdWUpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBhbiBlbnRpdHkgdG8gbWF0Y2ggdGhlIGxhdGVzdCByZW5kZXJlZCB2b2RlLiBXZSBhbHdheXNcbiAgICogcmVwbGFjZSB0aGUgcHJvcHMgb24gdGhlIGNvbXBvbmVudCB3aGVuIGNvbXBvc2luZyB0aGVtLiBUaGlzXG4gICAqIHdpbGwgdHJpZ2dlciBhIHJlLXJlbmRlciBvbiBhbGwgY2hpbGRyZW4gYmVsb3cgdGhpcyBwb2ludC5cbiAgICpcbiAgICogQHBhcmFtIHtFbnRpdHl9IGVudGl0eVxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aFxuICAgKiBAcGFyYW0ge09iamVjdH0gdm5vZGVcbiAgICpcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG5cbiAgZnVuY3Rpb24gdXBkYXRlRW50aXR5UHJvcHMgKGVudGl0eUlkLCBuZXh0UHJvcHMpIHtcbiAgICB2YXIgZW50aXR5ID0gZW50aXRpZXNbZW50aXR5SWRdXG4gICAgZW50aXR5LnBlbmRpbmdQcm9wcyA9IG5leHRQcm9wc1xuICAgIGVudGl0eS5kaXJ0eSA9IHRydWVcbiAgICBpbnZhbGlkYXRlKClcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgY29tcG9uZW50IGluc3RhbmNlIHN0YXRlLlxuICAgKi9cblxuICBmdW5jdGlvbiB1cGRhdGVFbnRpdHlTdGF0ZSAoZW50aXR5LCBuZXh0U3RhdGUpIHtcbiAgICBlbnRpdHkucGVuZGluZ1N0YXRlID0gYXNzaWduKGVudGl0eS5wZW5kaW5nU3RhdGUsIG5leHRTdGF0ZSlcbiAgICBlbnRpdHkuZGlydHkgPSB0cnVlXG4gICAgaW52YWxpZGF0ZSgpXG4gIH1cblxuICAvKipcbiAgICogQ29tbWl0IHByb3BzIGFuZCBzdGF0ZSBjaGFuZ2VzIHRvIGFuIGVudGl0eS5cbiAgICovXG5cbiAgZnVuY3Rpb24gY29tbWl0IChlbnRpdHkpIHtcbiAgICBlbnRpdHkuY29udGV4dCA9IHtcbiAgICAgIHN0YXRlOiBlbnRpdHkucGVuZGluZ1N0YXRlLFxuICAgICAgcHJvcHM6IGVudGl0eS5wZW5kaW5nUHJvcHMsXG4gICAgICBpZDogZW50aXR5LmlkXG4gICAgfVxuICAgIGVudGl0eS5wZW5kaW5nU3RhdGUgPSBhc3NpZ24oe30sIGVudGl0eS5jb250ZXh0LnN0YXRlKVxuICAgIGVudGl0eS5wZW5kaW5nUHJvcHMgPSBhc3NpZ24oe30sIGVudGl0eS5jb250ZXh0LnByb3BzKVxuICAgIHZhbGlkYXRlUHJvcHMoZW50aXR5LmNvbnRleHQucHJvcHMsIGVudGl0eS5wcm9wVHlwZXMpXG4gICAgZW50aXR5LmRpcnR5ID0gZmFsc2VcbiAgfVxuXG4gIC8qKlxuICAgKiBUcnkgdG8gYXZvaWQgY3JlYXRpbmcgbmV3IHZpcnR1YWwgZG9tIGlmIHBvc3NpYmxlLlxuICAgKlxuICAgKiBMYXRlciB3ZSBtYXkgZXhwb3NlIHRoaXMgc28geW91IGNhbiBvdmVycmlkZSwgYnV0IG5vdCB0aGVyZSB5ZXQuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHNob3VsZFVwZGF0ZSAoZW50aXR5KSB7XG4gICAgaWYgKCFlbnRpdHkuZGlydHkpIHJldHVybiBmYWxzZVxuICAgIGlmICghZW50aXR5LmNvbXBvbmVudC5zaG91bGRVcGRhdGUpIHJldHVybiB0cnVlXG4gICAgdmFyIG5leHRQcm9wcyA9IGVudGl0eS5wZW5kaW5nUHJvcHNcbiAgICB2YXIgbmV4dFN0YXRlID0gZW50aXR5LnBlbmRpbmdTdGF0ZVxuICAgIHZhciBib29sID0gZW50aXR5LmNvbXBvbmVudC5zaG91bGRVcGRhdGUoZW50aXR5LmNvbnRleHQsIG5leHRQcm9wcywgbmV4dFN0YXRlKVxuICAgIHJldHVybiBib29sXG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXIgYW4gZW50aXR5LlxuICAgKlxuICAgKiBUaGlzIGlzIG1vc3RseSB0byBwcmUtcHJlcHJvY2VzcyBjb21wb25lbnQgcHJvcGVydGllcyBhbmQgdmFsdWVzIGNoYWlucy5cbiAgICpcbiAgICogVGhlIGVuZCByZXN1bHQgaXMgZm9yIGV2ZXJ5IGNvbXBvbmVudCB0aGF0IGdldHMgbW91bnRlZCxcbiAgICogeW91IGNyZWF0ZSBhIHNldCBvZiBJTyBub2RlcyBpbiB0aGUgbmV0d29yayBmcm9tIHRoZSBgdmFsdWVgIGRlZmluaXRpb25zLlxuICAgKlxuICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gY29tcG9uZW50XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJlZ2lzdGVyIChlbnRpdHkpIHtcbiAgICByZWdpc3RlckVudGl0eShlbnRpdHkpXG4gICAgdmFyIGNvbXBvbmVudCA9IGVudGl0eS5jb21wb25lbnRcbiAgICBpZiAoY29tcG9uZW50LnJlZ2lzdGVyZWQpIHJldHVyblxuXG4gICAgLy8gaW5pdGlhbGl6ZSBzb3VyY2VzIG9uY2UgZm9yIGEgY29tcG9uZW50IHR5cGUuXG4gICAgcmVnaXN0ZXJTb3VyY2VzKGVudGl0eSlcbiAgICBjb21wb25lbnQucmVnaXN0ZXJlZCA9IHRydWVcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgZW50aXR5IHRvIGRhdGEtc3RydWN0dXJlcyByZWxhdGVkIHRvIGNvbXBvbmVudHMvZW50aXRpZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7RW50aXR5fSBlbnRpdHlcbiAgICovXG5cbiAgZnVuY3Rpb24gcmVnaXN0ZXJFbnRpdHkoZW50aXR5KSB7XG4gICAgdmFyIGNvbXBvbmVudCA9IGVudGl0eS5jb21wb25lbnRcbiAgICAvLyBhbGwgZW50aXRpZXMgZm9yIHRoaXMgY29tcG9uZW50IHR5cGUuXG4gICAgdmFyIGVudGl0aWVzID0gY29tcG9uZW50LmVudGl0aWVzID0gY29tcG9uZW50LmVudGl0aWVzIHx8IHt9XG4gICAgLy8gYWRkIGVudGl0eSB0byBjb21wb25lbnQgbGlzdFxuICAgIGVudGl0aWVzW2VudGl0eS5pZF0gPSBlbnRpdHlcbiAgICAvLyBtYXAgdG8gY29tcG9uZW50IHNvIHlvdSBjYW4gcmVtb3ZlIGxhdGVyLlxuICAgIGNvbXBvbmVudHNbZW50aXR5LmlkXSA9IGNvbXBvbmVudFxuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgc291cmNlcyBmb3IgYSBjb21wb25lbnQgYnkgdHlwZS5cbiAgICpcbiAgICogQHBhcmFtIHtFbnRpdHl9IGVudGl0eVxuICAgKi9cblxuICBmdW5jdGlvbiByZWdpc3RlclNvdXJjZXMoZW50aXR5KSB7XG4gICAgdmFyIGNvbXBvbmVudCA9IGNvbXBvbmVudHNbZW50aXR5LmlkXVxuICAgIC8vIGdldCAnY2xhc3MtbGV2ZWwnIHNvdXJjZXMuXG4gICAgLy8gaWYgd2UndmUgYWxyZWFkeSBob29rZWQgaXQgdXAsIHRoZW4gd2UncmUgZ29vZC5cbiAgICB2YXIgc291cmNlcyA9IGNvbXBvbmVudC5zb3VyY2VzXG4gICAgaWYgKHNvdXJjZXMpIHJldHVyblxuICAgIHZhciBlbnRpdGllcyA9IGNvbXBvbmVudC5lbnRpdGllc1xuXG4gICAgLy8gaG9vayB1cCBzb3VyY2VzLlxuICAgIHZhciBtYXAgPSBjb21wb25lbnQuc291cmNlVG9Qcm9wZXJ0eU5hbWUgPSB7fVxuICAgIGNvbXBvbmVudC5zb3VyY2VzID0gc291cmNlcyA9IFtdXG4gICAgdmFyIHByb3BUeXBlcyA9IGNvbXBvbmVudC5wcm9wVHlwZXNcbiAgICBmb3IgKHZhciBuYW1lIGluIHByb3BUeXBlcykge1xuICAgICAgdmFyIGRhdGEgPSBwcm9wVHlwZXNbbmFtZV1cbiAgICAgIGlmICghZGF0YSkgY29udGludWVcbiAgICAgIGlmICghZGF0YS5zb3VyY2UpIGNvbnRpbnVlXG4gICAgICBzb3VyY2VzLnB1c2goZGF0YS5zb3VyY2UpXG4gICAgICBtYXBbZGF0YS5zb3VyY2VdID0gbmFtZVxuICAgIH1cblxuICAgIC8vIHNlbmQgdmFsdWUgdXBkYXRlcyB0byBhbGwgY29tcG9uZW50IGluc3RhbmNlcy5cbiAgICBzb3VyY2VzLmZvckVhY2goZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgY29ubmVjdGlvbnNbc291cmNlXSA9IGNvbm5lY3Rpb25zW3NvdXJjZV0gfHwgW11cbiAgICAgIGNvbm5lY3Rpb25zW3NvdXJjZV0ucHVzaCh1cGRhdGUpXG5cbiAgICAgIGZ1bmN0aW9uIHVwZGF0ZSAoZGF0YSkge1xuICAgICAgICB2YXIgcHJvcCA9IG1hcFtzb3VyY2VdXG4gICAgICAgIGZvciAodmFyIGVudGl0eUlkIGluIGVudGl0aWVzKSB7XG4gICAgICAgICAgdmFyIGVudGl0eSA9IGVudGl0aWVzW2VudGl0eUlkXVxuICAgICAgICAgIHZhciBjaGFuZ2VzID0ge31cbiAgICAgICAgICBjaGFuZ2VzW3Byb3BdID0gZGF0YVxuICAgICAgICAgIHVwZGF0ZUVudGl0eVByb3BzKGVudGl0eUlkLCBhc3NpZ24oZW50aXR5LnBlbmRpbmdQcm9wcywgY2hhbmdlcykpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgaW5pdGlhbCBzb3VyY2UgdmFsdWUgb24gdGhlIGVudGl0eVxuICAgKlxuICAgKiBAcGFyYW0ge0VudGl0eX0gZW50aXR5XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHNldFNvdXJjZXMgKGVudGl0eSkge1xuICAgIHZhciBjb21wb25lbnQgPSBlbnRpdHkuY29tcG9uZW50XG4gICAgdmFyIG1hcCA9IGNvbXBvbmVudC5zb3VyY2VUb1Byb3BlcnR5TmFtZVxuICAgIHZhciBzb3VyY2VzID0gY29tcG9uZW50LnNvdXJjZXNcbiAgICBzb3VyY2VzLmZvckVhY2goZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgdmFyIG5hbWUgPSBtYXBbc291cmNlXVxuICAgICAgaWYgKGVudGl0eS5wZW5kaW5nUHJvcHNbbmFtZV0gIT0gbnVsbCkgcmV0dXJuXG4gICAgICBlbnRpdHkucGVuZGluZ1Byb3BzW25hbWVdID0gYXBwLnNvdXJjZXNbc291cmNlXSAvLyBnZXQgbGF0ZXN0IHZhbHVlIHBsdWdnZWQgaW50byBnbG9iYWwgc3RvcmVcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhbGwgb2YgdGhlIERPTSBldmVudCBsaXN0ZW5lcnNcbiAgICovXG5cbiAgZnVuY3Rpb24gYWRkTmF0aXZlRXZlbnRMaXN0ZW5lcnMgKCkge1xuICAgIGZvckVhY2goZXZlbnRzLCBmdW5jdGlvbiAoZXZlbnRUeXBlKSB7XG4gICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBoYW5kbGVFdmVudCwgdHJ1ZSlcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhbGwgb2YgdGhlIERPTSBldmVudCBsaXN0ZW5lcnNcbiAgICovXG5cbiAgZnVuY3Rpb24gcmVtb3ZlTmF0aXZlRXZlbnRMaXN0ZW5lcnMgKCkge1xuICAgIGZvckVhY2goZXZlbnRzLCBmdW5jdGlvbiAoZXZlbnRUeXBlKSB7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBoYW5kbGVFdmVudCwgdHJ1ZSlcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZSBhbiBldmVudCB0aGF0IGhhcyBvY2N1cmVkIHdpdGhpbiB0aGUgY29udGFpbmVyXG4gICAqXG4gICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGhhbmRsZUV2ZW50IChldmVudCkge1xuICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXRcbiAgICB2YXIgZXZlbnRUeXBlID0gZXZlbnQudHlwZVxuXG4gICAgLy8gV2FsayB1cCB0aGUgRE9NIHRyZWUgYW5kIHNlZSBpZiB0aGVyZSBpcyBhIGhhbmRsZXJcbiAgICAvLyBmb3IgdGhpcyBldmVudCB0eXBlIGhpZ2hlciB1cC5cbiAgICB3aGlsZSAodGFyZ2V0KSB7XG4gICAgICB2YXIgZm4gPSBrZXlwYXRoLmdldChoYW5kbGVycywgW3RhcmdldC5fX2VudGl0eV9fLCB0YXJnZXQuX19wYXRoX18sIGV2ZW50VHlwZV0pXG4gICAgICBpZiAoZm4pIHtcbiAgICAgICAgZXZlbnQuZGVsZWdhdGVUYXJnZXQgPSB0YXJnZXRcbiAgICAgICAgZm4oZXZlbnQpXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kIGV2ZW50cyBmb3IgYW4gZWxlbWVudCwgYW5kIGFsbCBpdCdzIHJlbmRlcmVkIGNoaWxkIGVsZW1lbnRzLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aFxuICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICovXG5cbiAgZnVuY3Rpb24gYWRkRXZlbnQgKGVudGl0eUlkLCBwYXRoLCBldmVudFR5cGUsIGZuKSB7XG4gICAga2V5cGF0aC5zZXQoaGFuZGxlcnMsIFtlbnRpdHlJZCwgcGF0aCwgZXZlbnRUeXBlXSwgZnVuY3Rpb24gKGUpIHtcbiAgICAgIHZhciBlbnRpdHkgPSBlbnRpdGllc1tlbnRpdHlJZF1cbiAgICAgIGlmIChlbnRpdHkpIHtcbiAgICAgICAgdmFyIHVwZGF0ZSA9IHNldFN0YXRlKGVudGl0eSlcbiAgICAgICAgdmFyIHJlc3VsdCA9IGZuLmNhbGwobnVsbCwgZSwgZW50aXR5LmNvbnRleHQsIHVwZGF0ZSlcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgIHVwZGF0ZUVudGl0eVN0YXRlQXN5bmMoZW50aXR5LCByZXN1bHQpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZuLmNhbGwobnVsbCwgZSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFVuYmluZCBldmVudHMgZm9yIGEgZW50aXR5SWRcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGVudGl0eUlkXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJlbW92ZUV2ZW50IChlbnRpdHlJZCwgcGF0aCwgZXZlbnRUeXBlKSB7XG4gICAgdmFyIGFyZ3MgPSBbZW50aXR5SWRdXG4gICAgaWYgKHBhdGgpIGFyZ3MucHVzaChwYXRoKVxuICAgIGlmIChldmVudFR5cGUpIGFyZ3MucHVzaChldmVudFR5cGUpXG4gICAga2V5cGF0aC5kZWwoaGFuZGxlcnMsIGFyZ3MpXG4gIH1cblxuICAvKipcbiAgICogVW5iaW5kIGFsbCBldmVudHMgZnJvbSBhbiBlbnRpdHlcbiAgICpcbiAgICogQHBhcmFtIHtFbnRpdHl9IGVudGl0eVxuICAgKi9cblxuICBmdW5jdGlvbiByZW1vdmVBbGxFdmVudHMgKGVudGl0eUlkKSB7XG4gICAga2V5cGF0aC5kZWwoaGFuZGxlcnMsIFtlbnRpdHlJZF0pXG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdGUgdGhlIGN1cnJlbnQgcHJvcGVydGllcy4gVGhlc2Ugc2ltcGxlIHZhbGlkYXRpb25zXG4gICAqIG1ha2UgaXQgZWFzaWVyIHRvIGVuc3VyZSB0aGUgY29ycmVjdCBwcm9wcyBhcmUgcGFzc2VkIGluLlxuICAgKlxuICAgKiBBdmFpbGFibGUgcnVsZXMgaW5jbHVkZTpcbiAgICpcbiAgICogdHlwZToge1N0cmluZ30gc3RyaW5nIHwgYXJyYXkgfCBvYmplY3QgfCBib29sZWFuIHwgbnVtYmVyIHwgZGF0ZSB8IGZ1bmN0aW9uXG4gICAqICAgICAgIHtBcnJheX0gQW4gYXJyYXkgb2YgdHlwZXMgbWVudGlvbmVkIGFib3ZlXG4gICAqICAgICAgIHtGdW5jdGlvbn0gZm4odmFsdWUpIHNob3VsZCByZXR1cm4gYHRydWVgIHRvIHBhc3MgaW5cbiAgICogZXhwZWN0czogW10gQW4gYXJyYXkgb2YgdmFsdWVzIHRoaXMgcHJvcCBjb3VsZCBlcXVhbFxuICAgKiBvcHRpb25hbDogQm9vbGVhblxuICAgKi9cblxuICBmdW5jdGlvbiB2YWxpZGF0ZVByb3BzIChwcm9wcywgcnVsZXMsIG9wdFByZWZpeCkge1xuICAgIHZhciBwcmVmaXggPSBvcHRQcmVmaXggfHwgJydcbiAgICBpZiAoIW9wdGlvbnMudmFsaWRhdGVQcm9wcykgcmV0dXJuXG4gICAgZm9yRWFjaChydWxlcywgZnVuY3Rpb24gKG9wdGlvbnMsIG5hbWUpIHtcbiAgICAgIGlmICghb3B0aW9ucykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Rla3U6IHByb3BUeXBlcyBzaG91bGQgaGF2ZSBhbiBvcHRpb25zIG9iamVjdCBmb3IgZWFjaCB0eXBlJylcbiAgICAgIH1cblxuICAgICAgdmFyIHByb3BOYW1lID0gcHJlZml4ID8gcHJlZml4ICsgJy4nICsgbmFtZSA6IG5hbWVcbiAgICAgIHZhciB2YWx1ZSA9IGtleXBhdGguZ2V0KHByb3BzLCBuYW1lKVxuICAgICAgdmFyIHZhbHVlVHlwZSA9IHR5cGUodmFsdWUpXG4gICAgICB2YXIgdHlwZUZvcm1hdCA9IHR5cGUob3B0aW9ucy50eXBlKVxuICAgICAgdmFyIG9wdGlvbmFsID0gKG9wdGlvbnMub3B0aW9uYWwgPT09IHRydWUpXG5cbiAgICAgIC8vIElmIGl0J3Mgb3B0aW9uYWwgYW5kIGRvZXNuJ3QgZXhpc3RcbiAgICAgIGlmIChvcHRpb25hbCAmJiB2YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICAvLyBJZiBpdCdzIHJlcXVpcmVkIGFuZCBkb2Vzbid0IGV4aXN0XG4gICAgICBpZiAoIW9wdGlvbmFsICYmIHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignTWlzc2luZyBwcm9wZXJ0eTogJyArIHByb3BOYW1lKVxuICAgICAgfVxuXG4gICAgICAvLyBJdCdzIGEgbmVzdGVkIHR5cGVcbiAgICAgIGlmICh0eXBlRm9ybWF0ID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YWxpZGF0ZVByb3BzKHZhbHVlLCBvcHRpb25zLnR5cGUsIHByb3BOYW1lKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgLy8gSWYgaXQncyB0aGUgaW5jb3JyZWN0IHR5cGVcbiAgICAgIGlmICh0eXBlRm9ybWF0ID09PSAnc3RyaW5nJyAmJiB2YWx1ZVR5cGUgIT09IG9wdGlvbnMudHlwZSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIHByb3BlcnR5IHR5cGU6ICcgKyBwcm9wTmFtZSlcbiAgICAgIH1cblxuICAgICAgLy8gSWYgdHlwZSBpcyB2YWxpZGF0ZSBmdW5jdGlvblxuICAgICAgaWYgKHR5cGVGb3JtYXQgPT09ICdmdW5jdGlvbicgJiYgIW9wdGlvbnMudHlwZSh2YWx1ZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBwcm9wZXJ0eSB0eXBlOiAnICsgcHJvcE5hbWUpXG4gICAgICB9XG5cbiAgICAgIC8vIGlmIHR5cGUgaXMgYXJyYXkgb2YgcG9zc2libGUgdHlwZXNcbiAgICAgIGlmICh0eXBlRm9ybWF0ID09PSAnYXJyYXknICYmIG9wdGlvbnMudHlwZS5pbmRleE9mKHZhbHVlVHlwZSkgPCAwKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgcHJvcGVydHkgdHlwZTogJyArIHByb3BOYW1lKVxuICAgICAgfVxuXG4gICAgICAvLyBJZiBpdCdzIGFuIGludmFsaWQgdmFsdWVcbiAgICAgIGlmIChvcHRpb25zLmV4cGVjdHMgJiYgb3B0aW9ucy5leHBlY3RzLmluZGV4T2YodmFsdWUpIDwgMCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIHByb3BlcnR5IHZhbHVlOiAnICsgcHJvcE5hbWUpXG4gICAgICB9XG4gICAgfSlcblxuICAgIC8vIE5vdyBjaGVjayBmb3IgcHJvcHMgdGhhdCBoYXZlbid0IGJlZW4gZGVmaW5lZFxuICAgIGZvckVhY2gocHJvcHMsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAvLyBwcm9wcy5jaGlsZHJlbiBpcyBhbHdheXMgcGFzc2VkIGluLCBldmVuIGlmIGl0J3Mgbm90IGRlZmluZWRcbiAgICAgIGlmIChrZXkgPT09ICdjaGlsZHJlbicpIHJldHVyblxuICAgICAgaWYgKCFydWxlc1trZXldKSB0aHJvdyBuZXcgRXJyb3IoJ1VuZXhwZWN0ZWQgcHJvcGVydHk6ICcgKyBrZXkpXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIGZvciBkZWJ1Z2dpbmcgdG8gaW5zcGVjdCB0aGUgY3VycmVudCBzdGF0ZSB3aXRob3V0XG4gICAqIHVzIG5lZWRpbmcgdG8gZXhwbGljaXRseSBtYW5hZ2Ugc3RvcmluZy91cGRhdGluZyByZWZlcmVuY2VzLlxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGluc3BlY3QgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBlbnRpdGllczogZW50aXRpZXMsXG4gICAgICBwb29sczogcG9vbHMsXG4gICAgICBoYW5kbGVyczogaGFuZGxlcnMsXG4gICAgICBjb25uZWN0aW9uczogY29ubmVjdGlvbnMsXG4gICAgICBjdXJyZW50RWxlbWVudDogY3VycmVudEVsZW1lbnQsXG4gICAgICBvcHRpb25zOiBvcHRpb25zLFxuICAgICAgYXBwOiBhcHAsXG4gICAgICBjb250YWluZXI6IGNvbnRhaW5lcixcbiAgICAgIGNoaWxkcmVuOiBjaGlsZHJlblxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYW4gb2JqZWN0IHRoYXQgbGV0cyB1cyBjb21wbGV0ZWx5IHJlbW92ZSB0aGUgYXV0b21hdGljXG4gICAqIERPTSByZW5kZXJpbmcgYW5kIGV4cG9ydCBkZWJ1Z2dpbmcgdG9vbHMuXG4gICAqL1xuXG4gIHJldHVybiB7XG4gICAgcmVtb3ZlOiB0ZWFyZG93bixcbiAgICBpbnNwZWN0OiBpbnNwZWN0XG4gIH1cbn1cblxuLyoqXG4gKiBBIHJlbmRlcmVkIGNvbXBvbmVudCBpbnN0YW5jZS5cbiAqXG4gKiBUaGlzIG1hbmFnZXMgdGhlIGxpZmVjeWNsZSwgcHJvcHMgYW5kIHN0YXRlIG9mIHRoZSBjb21wb25lbnQuXG4gKiBJdCdzIGJhc2ljYWxseSBqdXN0IGEgZGF0YSBvYmplY3QgZm9yIG1vcmUgc3RyYWlnaHRmb3dhcmQgbG9va3VwLlxuICpcbiAqIEBwYXJhbSB7Q29tcG9uZW50fSBjb21wb25lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wc1xuICovXG5cbmZ1bmN0aW9uIEVudGl0eSAoY29tcG9uZW50LCBwcm9wcywgb3duZXJJZCkge1xuICB0aGlzLmlkID0gdWlkKClcbiAgdGhpcy5vd25lcklkID0gb3duZXJJZFxuICB0aGlzLmNvbXBvbmVudCA9IGNvbXBvbmVudFxuICB0aGlzLnByb3BUeXBlcyA9IGNvbXBvbmVudC5wcm9wVHlwZXMgfHwge31cbiAgdGhpcy5jb250ZXh0ID0ge31cbiAgdGhpcy5jb250ZXh0LmlkID0gdGhpcy5pZDtcbiAgdGhpcy5jb250ZXh0LnByb3BzID0gZGVmYXVsdHMocHJvcHMgfHwge30sIGNvbXBvbmVudC5kZWZhdWx0UHJvcHMgfHwge30pXG4gIHRoaXMuY29udGV4dC5zdGF0ZSA9IHRoaXMuY29tcG9uZW50LmluaXRpYWxTdGF0ZSA/IHRoaXMuY29tcG9uZW50LmluaXRpYWxTdGF0ZSh0aGlzLmNvbnRleHQucHJvcHMpIDoge31cbiAgdGhpcy5wZW5kaW5nUHJvcHMgPSBhc3NpZ24oe30sIHRoaXMuY29udGV4dC5wcm9wcylcbiAgdGhpcy5wZW5kaW5nU3RhdGUgPSBhc3NpZ24oe30sIHRoaXMuY29udGV4dC5zdGF0ZSlcbiAgdGhpcy5kaXJ0eSA9IGZhbHNlXG4gIHRoaXMudmlydHVhbEVsZW1lbnQgPSBudWxsXG4gIHRoaXMubmF0aXZlRWxlbWVudCA9IG51bGxcbiAgdGhpcy5kaXNwbGF5TmFtZSA9IGNvbXBvbmVudC5uYW1lIHx8ICdDb21wb25lbnQnXG59XG5cbi8qKlxuICogU2hvdWxkIHdlIHBvb2wgYW4gZWxlbWVudD9cbiAqL1xuXG5mdW5jdGlvbiBjYW5Qb29sKHRhZ05hbWUpIHtcbiAgcmV0dXJuIGF2b2lkUG9vbGluZy5pbmRleE9mKHRhZ05hbWUpIDwgMFxufVxuXG4vKipcbiAqIEdldCBhIG5lc3RlZCBub2RlIHVzaW5nIGEgcGF0aFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsICAgVGhlIHJvb3Qgbm9kZSAnMCdcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoIFRoZSBwYXRoIHN0cmluZyBlZy4gJzAuMi40MydcbiAqL1xuXG5mdW5jdGlvbiBnZXROb2RlQXRQYXRoKGVsLCBwYXRoKSB7XG4gIHZhciBwYXJ0cyA9IHBhdGguc3BsaXQoJy4nKVxuICBwYXJ0cy5zaGlmdCgpXG4gIHdoaWxlIChwYXJ0cy5sZW5ndGgpIHtcbiAgICBlbCA9IGVsLmNoaWxkTm9kZXNbcGFydHMucG9wKCldXG4gIH1cbiAgcmV0dXJuIGVsXG59XG4iLCJ2YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJylcbnZhciBldmVudHMgPSByZXF1aXJlKCcuL2V2ZW50cycpXG52YXIgZGVmYXVsdHMgPSB1dGlscy5kZWZhdWx0c1xuXG4vKipcbiAqIEV4cG9zZSBgc3RyaW5naWZ5YC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcHApIHtcbiAgaWYgKCFhcHAuZWxlbWVudCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTm8gZWxlbWVudCBtb3VudGVkJylcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW5kZXIgdG8gc3RyaW5nLlxuICAgKlxuICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gY29tcG9uZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdXG4gICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICovXG5cbiAgZnVuY3Rpb24gc3RyaW5naWZ5IChjb21wb25lbnQsIG9wdFByb3BzKSB7XG4gICAgdmFyIHByb3BUeXBlcyA9IGNvbXBvbmVudC5wcm9wVHlwZXMgfHwge31cbiAgICB2YXIgcHJvcHMgPSBkZWZhdWx0cyhvcHRQcm9wcyB8fCB7fSwgY29tcG9uZW50LmRlZmF1bHRQcm9wcyB8fCB7fSlcbiAgICB2YXIgc3RhdGUgPSBjb21wb25lbnQuaW5pdGlhbFN0YXRlID8gY29tcG9uZW50LmluaXRpYWxTdGF0ZShwcm9wcykgOiB7fVxuXG4gICAgZm9yICh2YXIgbmFtZSBpbiBwcm9wVHlwZXMpIHtcbiAgICAgIHZhciBvcHRpb25zID0gcHJvcFR5cGVzW25hbWVdXG4gICAgICBpZiAob3B0aW9ucy5zb3VyY2UpIHtcbiAgICAgICAgcHJvcHNbbmFtZV0gPSBhcHAuc291cmNlc1tvcHRpb25zLnNvdXJjZV1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29tcG9uZW50LmJlZm9yZU1vdW50KSBjb21wb25lbnQuYmVmb3JlTW91bnQoeyBwcm9wczogcHJvcHMsIHN0YXRlOiBzdGF0ZSB9KVxuICAgIGlmIChjb21wb25lbnQuYmVmb3JlUmVuZGVyKSBjb21wb25lbnQuYmVmb3JlUmVuZGVyKHsgcHJvcHM6IHByb3BzLCBzdGF0ZTogc3RhdGUgfSlcbiAgICB2YXIgbm9kZSA9IGNvbXBvbmVudC5yZW5kZXIoeyBwcm9wczogcHJvcHMsIHN0YXRlOiBzdGF0ZSB9KVxuICAgIHJldHVybiBzdHJpbmdpZnlOb2RlKG5vZGUsICcwJylcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW5kZXIgYSBub2RlIHRvIGEgc3RyaW5nXG4gICAqXG4gICAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxuICAgKiBAcGFyYW0ge1RyZWV9IHRyZWVcbiAgICpcbiAgICogQHJldHVybiB7U3RyaW5nfVxuICAgKi9cblxuICBmdW5jdGlvbiBzdHJpbmdpZnlOb2RlIChub2RlLCBwYXRoKSB7XG4gICAgc3dpdGNoIChub2RlLnR5cGUpIHtcbiAgICAgIGNhc2UgJ3RleHQnOiByZXR1cm4gbm9kZS5kYXRhXG4gICAgICBjYXNlICdlbGVtZW50JzpcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gbm9kZS5jaGlsZHJlblxuICAgICAgICB2YXIgYXR0cmlidXRlcyA9IG5vZGUuYXR0cmlidXRlc1xuICAgICAgICB2YXIgdGFnTmFtZSA9IG5vZGUudGFnTmFtZVxuICAgICAgICB2YXIgaW5uZXJIVE1MID0gYXR0cmlidXRlcy5pbm5lckhUTUxcbiAgICAgICAgdmFyIHN0ciA9ICc8JyArIHRhZ05hbWUgKyBhdHRycyhhdHRyaWJ1dGVzKSArICc+J1xuXG4gICAgICAgIGlmIChpbm5lckhUTUwpIHtcbiAgICAgICAgICBzdHIgKz0gaW5uZXJIVE1MXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDAsIG4gPSBjaGlsZHJlbi5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHN0ciArPSBzdHJpbmdpZnlOb2RlKGNoaWxkcmVuW2ldLCBwYXRoICsgJy4nICsgaSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzdHIgKz0gJzwvJyArIHRhZ05hbWUgKyAnPidcbiAgICAgICAgcmV0dXJuIHN0clxuICAgICAgY2FzZSAnY29tcG9uZW50JzogcmV0dXJuIHN0cmluZ2lmeShub2RlLmNvbXBvbmVudCwgbm9kZS5wcm9wcylcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdHlwZScpXG4gIH1cblxuICByZXR1cm4gc3RyaW5naWZ5Tm9kZShhcHAuZWxlbWVudCwgJzAnKVxufVxuXG4vKipcbiAqIEhUTUwgYXR0cmlidXRlcyB0byBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGF0dHJpYnV0ZXNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGF0dHJzIChhdHRyaWJ1dGVzKSB7XG4gIHZhciBzdHIgPSAnJ1xuICBmb3IgKHZhciBrZXkgaW4gYXR0cmlidXRlcykge1xuICAgIGlmIChrZXkgPT09ICdpbm5lckhUTUwnKSBjb250aW51ZVxuICAgIGlmIChldmVudHNba2V5XSkgY29udGludWVcbiAgICBzdHIgKz0gYXR0cihrZXksIGF0dHJpYnV0ZXNba2V5XSlcbiAgfVxuICByZXR1cm4gc3RyXG59XG5cbi8qKlxuICogSFRNTCBhdHRyaWJ1dGUgdG8gc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGF0dHIgKGtleSwgdmFsKSB7XG4gIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIidcbn1cbiIsInZhciBpbmRleE9mID0gcmVxdWlyZSgnZmFzdC5qcy9hcnJheS9pbmRleE9mJylcblxuLyoqXG4gKiBUaGlzIGZpbGUgbGlzdHMgdGhlIHN1cHBvcnRlZCBTVkcgZWxlbWVudHMgdXNlZCBieSB0aGVcbiAqIHJlbmRlcmVyLiBXZSBtYXkgYWRkIGJldHRlciBTVkcgc3VwcG9ydCBpbiB0aGUgZnV0dXJlXG4gKiB0aGF0IGRvZXNuJ3QgcmVxdWlyZSB3aGl0ZWxpc3RpbmcgZWxlbWVudHMuXG4gKi9cblxuZXhwb3J0cy5uYW1lc3BhY2UgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnXG5cbi8qKlxuICogU3VwcG9ydGVkIFNWRyBlbGVtZW50c1xuICpcbiAqIEB0eXBlIHtBcnJheX1cbiAqL1xuXG5leHBvcnRzLmVsZW1lbnRzID0gW1xuICAnY2lyY2xlJyxcbiAgJ2RlZnMnLFxuICAnZWxsaXBzZScsXG4gICdnJyxcbiAgJ2xpbmUnLFxuICAnbGluZWFyR3JhZGllbnQnLFxuICAnbWFzaycsXG4gICdwYXRoJyxcbiAgJ3BhdHRlcm4nLFxuICAncG9seWdvbicsXG4gICdwb2x5bGluZScsXG4gICdyYWRpYWxHcmFkaWVudCcsXG4gICdyZWN0JyxcbiAgJ3N0b3AnLFxuICAnc3ZnJyxcbiAgJ3RleHQnLFxuICAndHNwYW4nXG5dXG5cbi8qKlxuICogU3VwcG9ydGVkIFNWRyBhdHRyaWJ1dGVzXG4gKi9cblxuZXhwb3J0cy5hdHRyaWJ1dGVzID0gW1xuICAnY3gnLFxuICAnY3knLFxuICAnZCcsXG4gICdkeCcsXG4gICdkeScsXG4gICdmaWxsJyxcbiAgJ2ZpbGxPcGFjaXR5JyxcbiAgJ2ZvbnRGYW1pbHknLFxuICAnZm9udFNpemUnLFxuICAnZngnLFxuICAnZnknLFxuICAnZ3JhZGllbnRUcmFuc2Zvcm0nLFxuICAnZ3JhZGllbnRVbml0cycsXG4gICdtYXJrZXJFbmQnLFxuICAnbWFya2VyTWlkJyxcbiAgJ21hcmtlclN0YXJ0JyxcbiAgJ29mZnNldCcsXG4gICdvcGFjaXR5JyxcbiAgJ3BhdHRlcm5Db250ZW50VW5pdHMnLFxuICAncGF0dGVyblVuaXRzJyxcbiAgJ3BvaW50cycsXG4gICdwcmVzZXJ2ZUFzcGVjdFJhdGlvJyxcbiAgJ3InLFxuICAncngnLFxuICAncnknLFxuICAnc3ByZWFkTWV0aG9kJyxcbiAgJ3N0b3BDb2xvcicsXG4gICdzdG9wT3BhY2l0eScsXG4gICdzdHJva2UnLFxuICAnc3Ryb2tlRGFzaGFycmF5JyxcbiAgJ3N0cm9rZUxpbmVjYXAnLFxuICAnc3Ryb2tlT3BhY2l0eScsXG4gICdzdHJva2VXaWR0aCcsXG4gICd0ZXh0QW5jaG9yJyxcbiAgJ3RyYW5zZm9ybScsXG4gICd2ZXJzaW9uJyxcbiAgJ3ZpZXdCb3gnLFxuICAneDEnLFxuICAneDInLFxuICAneCcsXG4gICd5MScsXG4gICd5MicsXG4gICd5J1xuXVxuXG4vKipcbiAqIElzIGVsZW1lbnQncyBuYW1lc3BhY2UgU1ZHP1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKi9cblxuZXhwb3J0cy5pc0VsZW1lbnQgPSBmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gaW5kZXhPZihleHBvcnRzLmVsZW1lbnRzLCBuYW1lKSAhPT0gLTFcbn1cblxuLyoqXG4gKiBBcmUgZWxlbWVudCdzIGF0dHJpYnV0ZXMgU1ZHP1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBhdHRyXG4gKi9cblxuZXhwb3J0cy5pc0F0dHJpYnV0ZSA9IGZ1bmN0aW9uIChhdHRyKSB7XG4gIHJldHVybiBpbmRleE9mKGV4cG9ydHMuYXR0cmlidXRlcywgYXR0cikgIT09IC0xXG59XG5cbiIsIi8qKlxuICogVGhlIG5wbSAnZGVmYXVsdHMnIG1vZHVsZSBidXQgd2l0aG91dCBjbG9uZSBiZWNhdXNlXG4gKiBpdCB3YXMgcmVxdWlyaW5nIHRoZSAnQnVmZmVyJyBtb2R1bGUgd2hpY2ggaXMgaHVnZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRzXG4gKlxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5cbmV4cG9ydHMuZGVmYXVsdHMgPSBmdW5jdGlvbihvcHRpb25zLCBkZWZhdWx0cykge1xuICBPYmplY3Qua2V5cyhkZWZhdWx0cykuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnNba2V5XSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIG9wdGlvbnNba2V5XSA9IGRlZmF1bHRzW2tleV1cbiAgICB9XG4gIH0pXG4gIHJldHVybiBvcHRpb25zXG59XG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIHR5cGUgPSByZXF1aXJlKCdjb21wb25lbnQtdHlwZScpXG52YXIgc2xpY2UgPSByZXF1aXJlKCdzbGljZWQnKVxudmFyIGZsYXR0ZW4gPSByZXF1aXJlKCdhcnJheS1mbGF0dGVuJylcblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGxldHMgdXMgY3JlYXRlIHZpcnR1YWwgbm9kZXMgdXNpbmcgYSBzaW1wbGVcbiAqIHN5bnRheC4gSXQgaXMgY29tcGF0aWJsZSB3aXRoIEpTWCB0cmFuc2Zvcm1zIHNvIHlvdSBjYW4gdXNlXG4gKiBKU1ggdG8gd3JpdGUgbm9kZXMgdGhhdCB3aWxsIGNvbXBpbGUgdG8gdGhpcyBmdW5jdGlvbi5cbiAqXG4gKiBsZXQgbm9kZSA9IHZpcnR1YWwoJ2RpdicsIHsgaWQ6ICdmb28nIH0sIFtcbiAqICAgdmlydHVhbCgnYScsIHsgaHJlZjogJ2h0dHA6Ly9nb29nbGUuY29tJyB9LCAnR29vZ2xlJylcbiAqIF0pXG4gKlxuICogWW91IGNhbiBsZWF2ZSBvdXQgdGhlIGF0dHJpYnV0ZXMgb3IgdGhlIGNoaWxkcmVuIGlmIGVpdGhlclxuICogb2YgdGhlbSBhcmVuJ3QgbmVlZGVkIGFuZCBpdCB3aWxsIGZpZ3VyZSBvdXQgd2hhdCB5b3UncmVcbiAqIHRyeWluZyB0byBkby5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHZpcnR1YWxcblxuLyoqXG4gKiBDcmVhdGUgdmlydHVhbCBET00gdHJlZXMuXG4gKlxuICogVGhpcyBjcmVhdGVzIHRoZSBuaWNlciBBUEkgZm9yIHRoZSB1c2VyLlxuICogSXQgdHJhbnNsYXRlcyB0aGF0IGZyaWVuZGx5IEFQSSBpbnRvIGFuIGFjdHVhbCB0cmVlIG9mIG5vZGVzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfEZ1bmN0aW9ufSB0eXBlXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvcHNcbiAqIEBwYXJhbSB7QXJyYXl9IGNoaWxkcmVuXG4gKiBAcmV0dXJuIHtOb2RlfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiB2aXJ0dWFsICh0eXBlLCBwcm9wcywgY2hpbGRyZW4pIHtcbiAgLy8gRGVmYXVsdCB0byBkaXYgd2l0aCBubyBhcmdzXG4gIGlmICghdHlwZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignZGVrdTogRWxlbWVudCBuZWVkcyBhIHR5cGUuIFJlYWQgbW9yZTogaHR0cDovL2NsLmx5L2IwS1onKVxuICB9XG5cbiAgLy8gU2tpcHBlZCBhZGRpbmcgYXR0cmlidXRlcyBhbmQgd2UncmUgcGFzc2luZ1xuICAvLyBpbiBjaGlsZHJlbiBpbnN0ZWFkLlxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMiAmJiAodHlwZW9mIHByb3BzID09PSAnc3RyaW5nJyB8fCBBcnJheS5pc0FycmF5KHByb3BzKSkpIHtcbiAgICBjaGlsZHJlbiA9IHByb3BzXG4gICAgcHJvcHMgPSB7fVxuICB9XG5cbiAgLy8gQWNjb3VudCBmb3IgSlNYIHB1dHRpbmcgdGhlIGNoaWxkcmVuIGFzIG11bHRpcGxlIGFyZ3VtZW50cy5cbiAgLy8gVGhpcyBpcyBlc3NlbnRpYWxseSBqdXN0IHRoZSBFUzYgcmVzdCBwYXJhbVxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgQXJyYXkuaXNBcnJheShhcmd1bWVudHNbMl0pID09PSBmYWxzZSkge1xuICAgIGNoaWxkcmVuID0gc2xpY2UoYXJndW1lbnRzLCAyKVxuICB9XG5cbiAgY2hpbGRyZW4gPSBjaGlsZHJlbiB8fCBbXVxuICBwcm9wcyA9IHByb3BzIHx8IHt9XG5cbiAgLy8gcGFzc2luZyBpbiBhIHNpbmdsZSBjaGlsZCwgeW91IGNhbiBza2lwXG4gIC8vIHVzaW5nIHRoZSBhcnJheVxuICBpZiAoIUFycmF5LmlzQXJyYXkoY2hpbGRyZW4pKSB7XG4gICAgY2hpbGRyZW4gPSBbIGNoaWxkcmVuIF1cbiAgfVxuXG4gIGNoaWxkcmVuID0gZmxhdHRlbihjaGlsZHJlbiwgMSkucmVkdWNlKG5vcm1hbGl6ZSwgW10pXG5cbiAgLy8gcHVsbCB0aGUga2V5IG91dCBmcm9tIHRoZSBkYXRhLlxuICB2YXIga2V5ID0gJ2tleScgaW4gcHJvcHMgPyBTdHJpbmcocHJvcHMua2V5KSA6IG51bGxcbiAgZGVsZXRlIHByb3BzWydrZXknXVxuXG4gIC8vIGlmIHlvdSBwYXNzIGluIGEgZnVuY3Rpb24sIGl0J3MgYSBgQ29tcG9uZW50YCBjb25zdHJ1Y3Rvci5cbiAgLy8gb3RoZXJ3aXNlIGl0J3MgYW4gZWxlbWVudC5cbiAgdmFyIG5vZGVcbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJykge1xuICAgIG5vZGUgPSBuZXcgRWxlbWVudE5vZGUodHlwZSwgcHJvcHMsIGtleSwgY2hpbGRyZW4pXG4gIH0gZWxzZSB7XG4gICAgbm9kZSA9IG5ldyBDb21wb25lbnROb2RlKHR5cGUsIHByb3BzLCBrZXksIGNoaWxkcmVuKVxuICB9XG5cbiAgLy8gc2V0IHRoZSB1bmlxdWUgSURcbiAgbm9kZS5pbmRleCA9IDBcblxuICByZXR1cm4gbm9kZVxufVxuXG4vKipcbiAqIFBhcnNlIG5vZGVzIGludG8gcmVhbCBgTm9kZWAgb2JqZWN0cy5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSBub2RlXG4gKiBAcGFyYW0ge0ludGVnZXJ9IGluZGV4XG4gKiBAcmV0dXJuIHtOb2RlfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbm9ybWFsaXplIChhY2MsIG5vZGUpIHtcbiAgaWYgKG5vZGUgPT0gbnVsbCkge1xuICAgIHJldHVybiBhY2NcbiAgfVxuICBpZiAodHlwZW9mIG5vZGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBub2RlID09PSAnbnVtYmVyJykge1xuICAgIHZhciBuZXdOb2RlID0gbmV3IFRleHROb2RlKFN0cmluZyhub2RlKSlcbiAgICBuZXdOb2RlLmluZGV4ID0gYWNjLmxlbmd0aFxuICAgIGFjYy5wdXNoKG5ld05vZGUpXG4gIH0gZWxzZSB7XG4gICAgbm9kZS5pbmRleCA9IGFjYy5sZW5ndGhcbiAgICBhY2MucHVzaChub2RlKVxuICB9XG4gIHJldHVybiBhY2Ncbn1cblxuLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IGBDb21wb25lbnROb2RlYC5cbiAqXG4gKiBAcGFyYW0ge0NvbXBvbmVudH0gY29tcG9uZW50XG4gKiBAcGFyYW0ge09iamVjdH0gcHJvcHNcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgVXNlZCBmb3Igc29ydGluZy9yZXBsYWNpbmcgZHVyaW5nIGRpZmZpbmcuXG4gKiBAcGFyYW0ge0FycmF5fSBjaGlsZHJlbiBDaGlsZCB2aXJ0dWFsIG5vZGVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIENvbXBvbmVudE5vZGUgKGNvbXBvbmVudCwgcHJvcHMsIGtleSwgY2hpbGRyZW4pIHtcbiAgdGhpcy5rZXkgPSBrZXlcbiAgdGhpcy5wcm9wcyA9IHByb3BzXG4gIHRoaXMudHlwZSA9ICdjb21wb25lbnQnXG4gIHRoaXMuY29tcG9uZW50ID0gY29tcG9uZW50XG4gIHRoaXMucHJvcHMuY2hpbGRyZW4gPSBjaGlsZHJlbiB8fCBbXVxufVxuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYEVsZW1lbnROb2RlYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdGFnTmFtZVxuICogQHBhcmFtIHtPYmplY3R9IGF0dHJpYnV0ZXNcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgVXNlZCBmb3Igc29ydGluZy9yZXBsYWNpbmcgZHVyaW5nIGRpZmZpbmcuXG4gKiBAcGFyYW0ge0FycmF5fSBjaGlsZHJlbiBDaGlsZCB2aXJ0dWFsIGRvbSBub2Rlcy5cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gRWxlbWVudE5vZGUgKHRhZ05hbWUsIGF0dHJpYnV0ZXMsIGtleSwgY2hpbGRyZW4pIHtcbiAgdGhpcy50eXBlID0gJ2VsZW1lbnQnXG4gIHRoaXMuYXR0cmlidXRlcyA9IHBhcnNlQXR0cmlidXRlcyhhdHRyaWJ1dGVzKVxuICB0aGlzLnRhZ05hbWUgPSB0YWdOYW1lXG4gIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbiB8fCBbXVxuICB0aGlzLmtleSA9IGtleVxufVxuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYFRleHROb2RlYC5cbiAqXG4gKiBUaGlzIGlzIGp1c3QgYSB2aXJ0dWFsIEhUTUwgdGV4dCBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHRleHRcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gVGV4dE5vZGUgKHRleHQpIHtcbiAgdGhpcy50eXBlID0gJ3RleHQnXG4gIHRoaXMuZGF0YSA9IFN0cmluZyh0ZXh0KVxufVxuXG4vKipcbiAqIFBhcnNlIGF0dHJpYnV0ZXMgZm9yIHNvbWUgc3BlY2lhbCBjYXNlcy5cbiAqXG4gKiBUT0RPOiBUaGlzIGNvdWxkIGJlIG1vcmUgZnVuY3Rpb25hbCBhbmQgYWxsb3cgaG9va3NcbiAqIGludG8gdGhlIHByb2Nlc3Npbmcgb2YgdGhlIGF0dHJpYnV0ZXMgYXQgYSBjb21wb25lbnQtbGV2ZWxcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYXR0cmlidXRlc1xuICpcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuXG5mdW5jdGlvbiBwYXJzZUF0dHJpYnV0ZXMgKGF0dHJpYnV0ZXMpIHtcbiAgLy8gc3R5bGU6IHsgJ3RleHQtYWxpZ24nOiAnbGVmdCcgfVxuICBpZiAoYXR0cmlidXRlcy5zdHlsZSkge1xuICAgIGF0dHJpYnV0ZXMuc3R5bGUgPSBwYXJzZVN0eWxlKGF0dHJpYnV0ZXMuc3R5bGUpXG4gIH1cblxuICAvLyBjbGFzczogeyBmb286IHRydWUsIGJhcjogZmFsc2UsIGJhejogdHJ1ZSB9XG4gIC8vIGNsYXNzOiBbJ2ZvbycsICdiYXInLCAnYmF6J11cbiAgaWYgKGF0dHJpYnV0ZXMuY2xhc3MpIHtcbiAgICBhdHRyaWJ1dGVzLmNsYXNzID0gcGFyc2VDbGFzcyhhdHRyaWJ1dGVzLmNsYXNzKVxuICB9XG5cbiAgLy8gUmVtb3ZlIGF0dHJpYnV0ZXMgd2l0aCBmYWxzZSB2YWx1ZXNcbiAgdmFyIGZpbHRlcmVkQXR0cmlidXRlcyA9IHt9XG4gIGZvciAodmFyIGtleSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgdmFyIHZhbHVlID0gYXR0cmlidXRlc1trZXldXG4gICAgaWYgKHZhbHVlID09IG51bGwgfHwgdmFsdWUgPT09IGZhbHNlKSBjb250aW51ZVxuICAgIGZpbHRlcmVkQXR0cmlidXRlc1trZXldID0gdmFsdWVcbiAgfVxuXG4gIHJldHVybiBmaWx0ZXJlZEF0dHJpYnV0ZXNcbn1cblxuLyoqXG4gKiBQYXJzZSBhIGJsb2NrIG9mIHN0eWxlcyBpbnRvIGEgc3RyaW5nLlxuICpcbiAqIFRPRE86IHRoaXMgY291bGQgZG8gYSBsb3QgbW9yZSB3aXRoIHZlbmRvciBwcmVmaXhpbmcsXG4gKiBudW1iZXIgdmFsdWVzIGV0Yy4gTWF5YmUgdGhlcmUncyBhIHdheSB0byBhbGxvdyB1c2Vyc1xuICogdG8gaG9vayBpbnRvIHRoaXM/XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHN0eWxlc1xuICpcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuXG5mdW5jdGlvbiBwYXJzZVN0eWxlIChzdHlsZXMpIHtcbiAgaWYgKHR5cGUoc3R5bGVzKSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gc3R5bGVzXG4gIH1cbiAgdmFyIHN0ciA9ICcnXG4gIGZvciAodmFyIG5hbWUgaW4gc3R5bGVzKSB7XG4gICAgdmFyIHZhbHVlID0gc3R5bGVzW25hbWVdXG4gICAgc3RyID0gc3RyICsgbmFtZSArICc6JyArIHZhbHVlICsgJzsnXG4gIH1cbiAgcmV0dXJuIHN0cjtcbn1cblxuLyoqXG4gKiBQYXJzZSB0aGUgY2xhc3MgYXR0cmlidXRlIHNvIGl0J3MgYWJsZSB0byBiZVxuICogc2V0IGluIGEgbW9yZSB1c2VyLWZyaWVuZGx5IHdheVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdHxBcnJheX0gdmFsdWVcbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cblxuZnVuY3Rpb24gcGFyc2VDbGFzcyAodmFsdWUpIHtcbiAgLy8geyBmb286IHRydWUsIGJhcjogZmFsc2UsIGJhejogdHJ1ZSB9XG4gIGlmICh0eXBlKHZhbHVlKSA9PT0gJ29iamVjdCcpIHtcbiAgICB2YXIgbWF0Y2hlZCA9IFtdXG4gICAgZm9yICh2YXIga2V5IGluIHZhbHVlKSB7XG4gICAgICBpZiAodmFsdWVba2V5XSkgbWF0Y2hlZC5wdXNoKGtleSlcbiAgICB9XG4gICAgdmFsdWUgPSBtYXRjaGVkXG4gIH1cblxuICAvLyBbJ2ZvbycsICdiYXInLCAnYmF6J11cbiAgaWYgKHR5cGUodmFsdWUpID09PSAnYXJyYXknKSB7XG4gICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHZhbHVlID0gdmFsdWUuam9pbignICcpXG4gIH1cblxuICByZXR1cm4gdmFsdWVcbn1cbiIsIi8qKlxuICogUmVjdXJzaXZlIGZsYXR0ZW4gZnVuY3Rpb24gd2l0aCBkZXB0aC5cbiAqXG4gKiBAcGFyYW0gIHtBcnJheX0gIGFycmF5XG4gKiBAcGFyYW0gIHtBcnJheX0gIHJlc3VsdFxuICogQHBhcmFtICB7TnVtYmVyfSBkZXB0aFxuICogQHJldHVybiB7QXJyYXl9XG4gKi9cbmZ1bmN0aW9uIGZsYXR0ZW5EZXB0aCAoYXJyYXksIHJlc3VsdCwgZGVwdGgpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgIHZhciB2YWx1ZSA9IGFycmF5W2ldXG5cbiAgICBpZiAoZGVwdGggPiAwICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICBmbGF0dGVuRGVwdGgodmFsdWUsIHJlc3VsdCwgZGVwdGggLSAxKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQucHVzaCh2YWx1ZSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0XG59XG5cbi8qKlxuICogUmVjdXJzaXZlIGZsYXR0ZW4gZnVuY3Rpb24uIE9taXR0aW5nIGRlcHRoIGlzIHNsaWdodGx5IGZhc3Rlci5cbiAqXG4gKiBAcGFyYW0gIHtBcnJheX0gYXJyYXlcbiAqIEBwYXJhbSAge0FycmF5fSByZXN1bHRcbiAqIEByZXR1cm4ge0FycmF5fVxuICovXG5mdW5jdGlvbiBmbGF0dGVuRm9yZXZlciAoYXJyYXksIHJlc3VsdCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHZhbHVlID0gYXJyYXlbaV1cblxuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgZmxhdHRlbkZvcmV2ZXIodmFsdWUsIHJlc3VsdClcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0LnB1c2godmFsdWUpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG4vKipcbiAqIEZsYXR0ZW4gYW4gYXJyYXksIHdpdGggdGhlIGFiaWxpdHkgdG8gZGVmaW5lIGEgZGVwdGguXG4gKlxuICogQHBhcmFtICB7QXJyYXl9ICBhcnJheVxuICogQHBhcmFtICB7TnVtYmVyfSBkZXB0aFxuICogQHJldHVybiB7QXJyYXl9XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFycmF5LCBkZXB0aCkge1xuICBpZiAoZGVwdGggPT0gbnVsbCkge1xuICAgIHJldHVybiBmbGF0dGVuRm9yZXZlcihhcnJheSwgW10pXG4gIH1cblxuICByZXR1cm4gZmxhdHRlbkRlcHRoKGFycmF5LCBbXSwgZGVwdGgpXG59XG4iLCIvKipcbiAqIEV4cG9zZSBgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKClgLlxuICovXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgfHwgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZVxuICB8fCB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gIHx8IGZhbGxiYWNrO1xuXG4vKipcbiAqIEZhbGxiYWNrIGltcGxlbWVudGF0aW9uLlxuICovXG5cbnZhciBwcmV2ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5mdW5jdGlvbiBmYWxsYmFjayhmbikge1xuICB2YXIgY3VyciA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICB2YXIgbXMgPSBNYXRoLm1heCgwLCAxNiAtIChjdXJyIC0gcHJldikpO1xuICB2YXIgcmVxID0gc2V0VGltZW91dChmbiwgbXMpO1xuICBwcmV2ID0gY3VycjtcbiAgcmV0dXJuIHJlcTtcbn1cblxuLyoqXG4gKiBDYW5jZWwuXG4gKi9cblxudmFyIGNhbmNlbCA9IHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZVxuICB8fCB3aW5kb3cud2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWVcbiAgfHwgd2luZG93Lm1vekNhbmNlbEFuaW1hdGlvbkZyYW1lXG4gIHx8IHdpbmRvdy5jbGVhclRpbWVvdXQ7XG5cbmV4cG9ydHMuY2FuY2VsID0gZnVuY3Rpb24oaWQpe1xuICBjYW5jZWwuY2FsbCh3aW5kb3csIGlkKTtcbn07XG4iLCIvKipcbiAqIHRvU3RyaW5nIHJlZi5cbiAqL1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIFJldHVybiB0aGUgdHlwZSBvZiBgdmFsYC5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSB2YWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2YWwpe1xuICBzd2l0Y2ggKHRvU3RyaW5nLmNhbGwodmFsKSkge1xuICAgIGNhc2UgJ1tvYmplY3QgRGF0ZV0nOiByZXR1cm4gJ2RhdGUnO1xuICAgIGNhc2UgJ1tvYmplY3QgUmVnRXhwXSc6IHJldHVybiAncmVnZXhwJztcbiAgICBjYXNlICdbb2JqZWN0IEFyZ3VtZW50c10nOiByZXR1cm4gJ2FyZ3VtZW50cyc7XG4gICAgY2FzZSAnW29iamVjdCBBcnJheV0nOiByZXR1cm4gJ2FycmF5JztcbiAgICBjYXNlICdbb2JqZWN0IEVycm9yXSc6IHJldHVybiAnZXJyb3InO1xuICB9XG5cbiAgaWYgKHZhbCA9PT0gbnVsbCkgcmV0dXJuICdudWxsJztcbiAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gJ3VuZGVmaW5lZCc7XG4gIGlmICh2YWwgIT09IHZhbCkgcmV0dXJuICduYW4nO1xuICBpZiAodmFsICYmIHZhbC5ub2RlVHlwZSA9PT0gMSkgcmV0dXJuICdlbGVtZW50JztcblxuICB2YWwgPSB2YWwudmFsdWVPZlxuICAgID8gdmFsLnZhbHVlT2YoKVxuICAgIDogT2JqZWN0LnByb3RvdHlwZS52YWx1ZU9mLmFwcGx5KHZhbClcblxuICByZXR1cm4gdHlwZW9mIHZhbDtcbn07XG4iLCJmdW5jdGlvbiBQb29sKHBhcmFtcykge1xyXG4gICAgaWYgKHR5cGVvZiBwYXJhbXMgIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIHBhc3MgcGFyYW1ldGVycy4gRXhhbXBsZSAtPiBuZXcgUG9vbCh7IHRhZ05hbWU6IFxcXCJkaXZcXFwiIH0pXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2YgcGFyYW1zLnRhZ05hbWUgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIHNwZWNpZnkgYSB0YWdOYW1lLiBFeGFtcGxlIC0+IG5ldyBQb29sKHsgdGFnTmFtZTogXFxcImRpdlxcXCIgfSlcIik7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zdG9yYWdlID0gW107XHJcbiAgICB0aGlzLnRhZ05hbWUgPSBwYXJhbXMudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgdGhpcy5uYW1lc3BhY2UgPSBwYXJhbXMubmFtZXNwYWNlO1xyXG59XHJcblxyXG5Qb29sLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24oZWwpIHtcclxuICAgIGlmIChlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgIT09IHRoaXMudGFnTmFtZSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdGhpcy5zdG9yYWdlLnB1c2goZWwpO1xyXG59O1xyXG5cclxuUG9vbC5wcm90b3R5cGUucG9wID0gZnVuY3Rpb24oYXJndW1lbnQpIHtcclxuICAgIGlmICh0aGlzLnN0b3JhZ2UubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2UucG9wKCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5Qb29sLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbigpIHtcclxuICAgIGlmICh0aGlzLm5hbWVzcGFjZSkge1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlModGhpcy5uYW1lc3BhY2UsIHRoaXMudGFnTmFtZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRoaXMudGFnTmFtZSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5Qb29sLnByb3RvdHlwZS5hbGxvY2F0ZSA9IGZ1bmN0aW9uKHNpemUpIHtcclxuICAgIGlmICh0aGlzLnN0b3JhZ2UubGVuZ3RoID49IHNpemUpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGRpZmZlcmVuY2UgPSBzaXplIC0gdGhpcy5zdG9yYWdlLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHBvb2xBbGxvY0l0ZXIgPSAwOyBwb29sQWxsb2NJdGVyIDwgZGlmZmVyZW5jZTsgcG9vbEFsbG9jSXRlcisrKSB7XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlLnB1c2godGhpcy5jcmVhdGUoKSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBQb29sO1xyXG59XHJcbiIsInZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZVxuXG5tb2R1bGUuZXhwb3J0cyA9IGl0ZXJhdGl2ZWx5V2Fsa1xuXG5mdW5jdGlvbiBpdGVyYXRpdmVseVdhbGsobm9kZXMsIGNiKSB7XG4gICAgaWYgKCEoJ2xlbmd0aCcgaW4gbm9kZXMpKSB7XG4gICAgICAgIG5vZGVzID0gW25vZGVzXVxuICAgIH1cbiAgICBcbiAgICBub2RlcyA9IHNsaWNlLmNhbGwobm9kZXMpXG5cbiAgICB3aGlsZShub2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBub2Rlcy5zaGlmdCgpLFxuICAgICAgICAgICAgcmV0ID0gY2Iobm9kZSlcblxuICAgICAgICBpZiAocmV0KSB7XG4gICAgICAgICAgICByZXR1cm4gcmV0XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobm9kZS5jaGlsZE5vZGVzICYmIG5vZGUuY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIG5vZGVzID0gc2xpY2UuY2FsbChub2RlLmNoaWxkTm9kZXMpLmNvbmNhdChub2RlcylcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmRJbnRlcm5hbDMgPSByZXF1aXJlKCcuLi9mdW5jdGlvbi9iaW5kSW50ZXJuYWwzJyk7XG5cbi8qKlxuICogIyBGb3IgRWFjaFxuICpcbiAqIEEgZmFzdCBgLmZvckVhY2goKWAgaW1wbGVtZW50YXRpb24uXG4gKlxuICogQHBhcmFtICB7QXJyYXl9ICAgIHN1YmplY3QgICAgIFRoZSBhcnJheSAob3IgYXJyYXktbGlrZSkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtICB7RnVuY3Rpb259IGZuICAgICAgICAgIFRoZSB2aXNpdG9yIGZ1bmN0aW9uLlxuICogQHBhcmFtICB7T2JqZWN0fSAgIHRoaXNDb250ZXh0IFRoZSBjb250ZXh0IGZvciB0aGUgdmlzaXRvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmYXN0Rm9yRWFjaCAoc3ViamVjdCwgZm4sIHRoaXNDb250ZXh0KSB7XG4gIHZhciBsZW5ndGggPSBzdWJqZWN0Lmxlbmd0aCxcbiAgICAgIGl0ZXJhdG9yID0gdGhpc0NvbnRleHQgIT09IHVuZGVmaW5lZCA/IGJpbmRJbnRlcm5hbDMoZm4sIHRoaXNDb250ZXh0KSA6IGZuLFxuICAgICAgaTtcbiAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgaXRlcmF0b3Ioc3ViamVjdFtpXSwgaSwgc3ViamVjdCk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogIyBJbmRleCBPZlxuICpcbiAqIEEgZmFzdGVyIGBBcnJheS5wcm90b3R5cGUuaW5kZXhPZigpYCBpbXBsZW1lbnRhdGlvbi5cbiAqXG4gKiBAcGFyYW0gIHtBcnJheX0gIHN1YmplY3QgICBUaGUgYXJyYXkgKG9yIGFycmF5LWxpa2UpIHRvIHNlYXJjaCB3aXRoaW4uXG4gKiBAcGFyYW0gIHttaXhlZH0gIHRhcmdldCAgICBUaGUgdGFyZ2V0IGl0ZW0gdG8gc2VhcmNoIGZvci5cbiAqIEBwYXJhbSAge051bWJlcn0gZnJvbUluZGV4IFRoZSBwb3NpdGlvbiB0byBzdGFydCBzZWFyY2hpbmcgZnJvbSwgaWYga25vd24uXG4gKiBAcmV0dXJuIHtOdW1iZXJ9ICAgICAgICAgICBUaGUgcG9zaXRpb24gb2YgdGhlIHRhcmdldCBpbiB0aGUgc3ViamVjdCwgb3IgLTEgaWYgaXQgZG9lcyBub3QgZXhpc3QuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZmFzdEluZGV4T2YgKHN1YmplY3QsIHRhcmdldCwgZnJvbUluZGV4KSB7XG4gIHZhciBsZW5ndGggPSBzdWJqZWN0Lmxlbmd0aCxcbiAgICAgIGkgPSAwO1xuXG4gIGlmICh0eXBlb2YgZnJvbUluZGV4ID09PSAnbnVtYmVyJykge1xuICAgIGkgPSBmcm9tSW5kZXg7XG4gICAgaWYgKGkgPCAwKSB7XG4gICAgICBpICs9IGxlbmd0aDtcbiAgICAgIGlmIChpIDwgMCkge1xuICAgICAgICBpID0gMDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmb3IgKDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN1YmplY3RbaV0gPT09IHRhcmdldCkge1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBiaW5kSW50ZXJuYWw0ID0gcmVxdWlyZSgnLi4vZnVuY3Rpb24vYmluZEludGVybmFsNCcpO1xuXG4vKipcbiAqICMgUmVkdWNlXG4gKlxuICogQSBmYXN0IGAucmVkdWNlKClgIGltcGxlbWVudGF0aW9uLlxuICpcbiAqIEBwYXJhbSAge0FycmF5fSAgICBzdWJqZWN0ICAgICAgVGhlIGFycmF5IChvciBhcnJheS1saWtlKSB0byByZWR1Y2UuXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gZm4gICAgICAgICAgIFRoZSByZWR1Y2VyIGZ1bmN0aW9uLlxuICogQHBhcmFtICB7bWl4ZWR9ICAgIGluaXRpYWxWYWx1ZSBUaGUgaW5pdGlhbCB2YWx1ZSBmb3IgdGhlIHJlZHVjZXIsIGRlZmF1bHRzIHRvIHN1YmplY3RbMF0uXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgdGhpc0NvbnRleHQgIFRoZSBjb250ZXh0IGZvciB0aGUgcmVkdWNlci5cbiAqIEByZXR1cm4ge21peGVkfSAgICAgICAgICAgICAgICAgVGhlIGZpbmFsIHJlc3VsdC5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmYXN0UmVkdWNlIChzdWJqZWN0LCBmbiwgaW5pdGlhbFZhbHVlLCB0aGlzQ29udGV4dCkge1xuICB2YXIgbGVuZ3RoID0gc3ViamVjdC5sZW5ndGgsXG4gICAgICBpdGVyYXRvciA9IHRoaXNDb250ZXh0ICE9PSB1bmRlZmluZWQgPyBiaW5kSW50ZXJuYWw0KGZuLCB0aGlzQ29udGV4dCkgOiBmbixcbiAgICAgIGksIHJlc3VsdDtcblxuICBpZiAoaW5pdGlhbFZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICBpID0gMTtcbiAgICByZXN1bHQgPSBzdWJqZWN0WzBdO1xuICB9XG4gIGVsc2Uge1xuICAgIGkgPSAwO1xuICAgIHJlc3VsdCA9IGluaXRpYWxWYWx1ZTtcbiAgfVxuXG4gIGZvciAoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICByZXN1bHQgPSBpdGVyYXRvcihyZXN1bHQsIHN1YmplY3RbaV0sIGksIHN1YmplY3QpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBmb3JFYWNoQXJyYXkgPSByZXF1aXJlKCcuL2FycmF5L2ZvckVhY2gnKSxcbiAgICBmb3JFYWNoT2JqZWN0ID0gcmVxdWlyZSgnLi9vYmplY3QvZm9yRWFjaCcpO1xuXG4vKipcbiAqICMgRm9yRWFjaFxuICpcbiAqIEEgZmFzdCBgLmZvckVhY2goKWAgaW1wbGVtZW50YXRpb24uXG4gKlxuICogQHBhcmFtICB7QXJyYXl8T2JqZWN0fSBzdWJqZWN0ICAgICBUaGUgYXJyYXkgb3Igb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSAgICAgZm4gICAgICAgICAgVGhlIHZpc2l0b3IgZnVuY3Rpb24uXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgIHRoaXNDb250ZXh0IFRoZSBjb250ZXh0IGZvciB0aGUgdmlzaXRvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmYXN0Rm9yRWFjaCAoc3ViamVjdCwgZm4sIHRoaXNDb250ZXh0KSB7XG4gIGlmIChzdWJqZWN0IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICByZXR1cm4gZm9yRWFjaEFycmF5KHN1YmplY3QsIGZuLCB0aGlzQ29udGV4dCk7XG4gIH1cbiAgZWxzZSB7XG4gICAgcmV0dXJuIGZvckVhY2hPYmplY3Qoc3ViamVjdCwgZm4sIHRoaXNDb250ZXh0KTtcbiAgfVxufTsiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogSW50ZXJuYWwgaGVscGVyIHRvIGJpbmQgYSBmdW5jdGlvbiBrbm93biB0byBoYXZlIDMgYXJndW1lbnRzXG4gKiB0byBhIGdpdmVuIGNvbnRleHQuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmluZEludGVybmFsMyAoZnVuYywgdGhpc0NvbnRleHQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQ29udGV4dCwgYSwgYiwgYyk7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEludGVybmFsIGhlbHBlciB0byBiaW5kIGEgZnVuY3Rpb24ga25vd24gdG8gaGF2ZSA0IGFyZ3VtZW50c1xuICogdG8gYSBnaXZlbiBjb250ZXh0LlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJpbmRJbnRlcm5hbDQgKGZ1bmMsIHRoaXNDb250ZXh0KSB7XG4gIHJldHVybiBmdW5jdGlvbiAoYSwgYiwgYywgZCkge1xuICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0NvbnRleHQsIGEsIGIsIGMsIGQpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBBbmFsb2d1ZSBvZiBPYmplY3QuYXNzaWduKCkuXG4gKiBDb3BpZXMgcHJvcGVydGllcyBmcm9tIG9uZSBvciBtb3JlIHNvdXJjZSBvYmplY3RzIHRvXG4gKiBhIHRhcmdldCBvYmplY3QuIEV4aXN0aW5nIGtleXMgb24gdGhlIHRhcmdldCBvYmplY3Qgd2lsbCBiZSBvdmVyd3JpdHRlbi5cbiAqXG4gKiA+IE5vdGU6IFRoaXMgZGlmZmVycyBmcm9tIHNwZWMgaW4gc29tZSBpbXBvcnRhbnQgd2F5czpcbiAqID4gMS4gV2lsbCB0aHJvdyBpZiBwYXNzZWQgbm9uLW9iamVjdHMsIGluY2x1ZGluZyBgdW5kZWZpbmVkYCBvciBgbnVsbGAgdmFsdWVzLlxuICogPiAyLiBEb2VzIG5vdCBzdXBwb3J0IHRoZSBjdXJpb3VzIEV4Y2VwdGlvbiBoYW5kbGluZyBiZWhhdmlvciwgZXhjZXB0aW9ucyBhcmUgdGhyb3duIGltbWVkaWF0ZWx5LlxuICogPiBGb3IgbW9yZSBkZXRhaWxzLCBzZWU6XG4gKiA+IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9hc3NpZ25cbiAqXG4gKlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gdGFyZ2V0ICAgICAgVGhlIHRhcmdldCBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIHRvLlxuICogQHBhcmFtICB7T2JqZWN0fSBzb3VyY2UsIC4uLiBUaGUgc291cmNlKHMpIHRvIGNvcHkgcHJvcGVydGllcyBmcm9tLlxuICogQHJldHVybiB7T2JqZWN0fSAgICAgICAgICAgICBUaGUgdXBkYXRlZCB0YXJnZXQgb2JqZWN0LlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZhc3RBc3NpZ24gKHRhcmdldCkge1xuICB2YXIgdG90YWxBcmdzID0gYXJndW1lbnRzLmxlbmd0aCxcbiAgICAgIHNvdXJjZSwgaSwgdG90YWxLZXlzLCBrZXlzLCBrZXksIGo7XG5cbiAgZm9yIChpID0gMTsgaSA8IHRvdGFsQXJnczsgaSsrKSB7XG4gICAgc291cmNlID0gYXJndW1lbnRzW2ldO1xuICAgIGtleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuICAgIHRvdGFsS2V5cyA9IGtleXMubGVuZ3RoO1xuICAgIGZvciAoaiA9IDA7IGogPCB0b3RhbEtleXM7IGorKykge1xuICAgICAga2V5ID0ga2V5c1tqXTtcbiAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgfVxuICB9XG4gIHJldHVybiB0YXJnZXQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZEludGVybmFsMyA9IHJlcXVpcmUoJy4uL2Z1bmN0aW9uL2JpbmRJbnRlcm5hbDMnKTtcblxuLyoqXG4gKiAjIEZvciBFYWNoXG4gKlxuICogQSBmYXN0IG9iamVjdCBgLmZvckVhY2goKWAgaW1wbGVtZW50YXRpb24uXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSAgIHN1YmplY3QgICAgIFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtICB7RnVuY3Rpb259IGZuICAgICAgICAgIFRoZSB2aXNpdG9yIGZ1bmN0aW9uLlxuICogQHBhcmFtICB7T2JqZWN0fSAgIHRoaXNDb250ZXh0IFRoZSBjb250ZXh0IGZvciB0aGUgdmlzaXRvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmYXN0Rm9yRWFjaE9iamVjdCAoc3ViamVjdCwgZm4sIHRoaXNDb250ZXh0KSB7XG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMoc3ViamVjdCksXG4gICAgICBsZW5ndGggPSBrZXlzLmxlbmd0aCxcbiAgICAgIGl0ZXJhdG9yID0gdGhpc0NvbnRleHQgIT09IHVuZGVmaW5lZCA/IGJpbmRJbnRlcm5hbDMoZm4sIHRoaXNDb250ZXh0KSA6IGZuLFxuICAgICAga2V5LCBpO1xuICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBrZXkgPSBrZXlzW2ldO1xuICAgIGl0ZXJhdG9yKHN1YmplY3Rba2V5XSwga2V5LCBzdWJqZWN0KTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmRJbnRlcm5hbDQgPSByZXF1aXJlKCcuLi9mdW5jdGlvbi9iaW5kSW50ZXJuYWw0Jyk7XG5cbi8qKlxuICogIyBSZWR1Y2VcbiAqXG4gKiBBIGZhc3Qgb2JqZWN0IGAucmVkdWNlKClgIGltcGxlbWVudGF0aW9uLlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gICBzdWJqZWN0ICAgICAgVGhlIG9iamVjdCB0byByZWR1Y2Ugb3Zlci5cbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmbiAgICAgICAgICAgVGhlIHJlZHVjZXIgZnVuY3Rpb24uXG4gKiBAcGFyYW0gIHttaXhlZH0gICAgaW5pdGlhbFZhbHVlIFRoZSBpbml0aWFsIHZhbHVlIGZvciB0aGUgcmVkdWNlciwgZGVmYXVsdHMgdG8gc3ViamVjdFswXS5cbiAqIEBwYXJhbSAge09iamVjdH0gICB0aGlzQ29udGV4dCAgVGhlIGNvbnRleHQgZm9yIHRoZSByZWR1Y2VyLlxuICogQHJldHVybiB7bWl4ZWR9ICAgICAgICAgICAgICAgICBUaGUgZmluYWwgcmVzdWx0LlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZhc3RSZWR1Y2VPYmplY3QgKHN1YmplY3QsIGZuLCBpbml0aWFsVmFsdWUsIHRoaXNDb250ZXh0KSB7XG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMoc3ViamVjdCksXG4gICAgICBsZW5ndGggPSBrZXlzLmxlbmd0aCxcbiAgICAgIGl0ZXJhdG9yID0gdGhpc0NvbnRleHQgIT09IHVuZGVmaW5lZCA/IGJpbmRJbnRlcm5hbDQoZm4sIHRoaXNDb250ZXh0KSA6IGZuLFxuICAgICAgaSwga2V5LCByZXN1bHQ7XG5cbiAgaWYgKGluaXRpYWxWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgaSA9IDE7XG4gICAgcmVzdWx0ID0gc3ViamVjdFtrZXlzWzBdXTtcbiAgfVxuICBlbHNlIHtcbiAgICBpID0gMDtcbiAgICByZXN1bHQgPSBpbml0aWFsVmFsdWU7XG4gIH1cblxuICBmb3IgKDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAga2V5ID0ga2V5c1tpXTtcbiAgICByZXN1bHQgPSBpdGVyYXRvcihyZXN1bHQsIHN1YmplY3Rba2V5XSwga2V5LCBzdWJqZWN0KTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmVkdWNlQXJyYXkgPSByZXF1aXJlKCcuL2FycmF5L3JlZHVjZScpLFxuICAgIHJlZHVjZU9iamVjdCA9IHJlcXVpcmUoJy4vb2JqZWN0L3JlZHVjZScpO1xuXG4vKipcbiAqICMgUmVkdWNlXG4gKlxuICogQSBmYXN0IGAucmVkdWNlKClgIGltcGxlbWVudGF0aW9uLlxuICpcbiAqIEBwYXJhbSAge0FycmF5fE9iamVjdH0gc3ViamVjdCAgICAgIFRoZSBhcnJheSBvciBvYmplY3QgdG8gcmVkdWNlIG92ZXIuXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gICAgIGZuICAgICAgICAgICBUaGUgcmVkdWNlciBmdW5jdGlvbi5cbiAqIEBwYXJhbSAge21peGVkfSAgICAgICAgaW5pdGlhbFZhbHVlIFRoZSBpbml0aWFsIHZhbHVlIGZvciB0aGUgcmVkdWNlciwgZGVmYXVsdHMgdG8gc3ViamVjdFswXS5cbiAqIEBwYXJhbSAge09iamVjdH0gICAgICAgdGhpc0NvbnRleHQgIFRoZSBjb250ZXh0IGZvciB0aGUgcmVkdWNlci5cbiAqIEByZXR1cm4ge0FycmF5fE9iamVjdH0gICAgICAgICAgICAgIFRoZSBhcnJheSBvciBvYmplY3QgY29udGFpbmluZyB0aGUgcmVzdWx0cy5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmYXN0UmVkdWNlIChzdWJqZWN0LCBmbiwgaW5pdGlhbFZhbHVlLCB0aGlzQ29udGV4dCkge1xuICBpZiAoc3ViamVjdCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgcmV0dXJuIHJlZHVjZUFycmF5KHN1YmplY3QsIGZuLCBpbml0aWFsVmFsdWUsIHRoaXNDb250ZXh0KTtcbiAgfVxuICBlbHNlIHtcbiAgICByZXR1cm4gcmVkdWNlT2JqZWN0KHN1YmplY3QsIGZuLCBpbml0aWFsVmFsdWUsIHRoaXNDb250ZXh0KTtcbiAgfVxufTsiLCIvKiogZ2VuZXJhdGUgdW5pcXVlIGlkIGZvciBzZWxlY3RvciAqL1xyXG52YXIgY291bnRlciA9IERhdGUubm93KCkgJSAxZTk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGdldFVpZCgpe1xyXG5cdHJldHVybiAoTWF0aC5yYW5kb20oKSAqIDFlOSA+Pj4gMCkgKyAoY291bnRlcisrKTtcclxufTsiLCIvKmdsb2JhbCB3aW5kb3cqL1xuXG4vKipcbiAqIENoZWNrIGlmIG9iamVjdCBpcyBkb20gbm9kZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzTm9kZSh2YWwpe1xuICBpZiAoIXZhbCB8fCB0eXBlb2YgdmFsICE9PSAnb2JqZWN0JykgcmV0dXJuIGZhbHNlO1xuICBpZiAod2luZG93ICYmICdvYmplY3QnID09IHR5cGVvZiB3aW5kb3cuTm9kZSkgcmV0dXJuIHZhbCBpbnN0YW5jZW9mIHdpbmRvdy5Ob2RlO1xuICByZXR1cm4gJ251bWJlcicgPT0gdHlwZW9mIHZhbC5ub2RlVHlwZSAmJiAnc3RyaW5nJyA9PSB0eXBlb2YgdmFsLm5vZGVOYW1lO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBpc1Byb21pc2U7XG5cbmZ1bmN0aW9uIGlzUHJvbWlzZShvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJykgJiYgdHlwZW9mIG9iai50aGVuID09PSAnZnVuY3Rpb24nO1xufVxuIiwiKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8qaXN0YW5idWwgaWdub3JlIG5leHQ6Y2FudCB0ZXN0Ki9cbiAgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG4gICAgZGVmaW5lKFtdLCBmYWN0b3J5KTtcbiAgfSBlbHNlIHtcbiAgICAvLyBCcm93c2VyIGdsb2JhbHNcbiAgICByb290Lm9iamVjdFBhdGggPSBmYWN0b3J5KCk7XG4gIH1cbn0pKHRoaXMsIGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXJcbiAgICB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcsXG4gICAgX2hhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuICBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlKXtcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAodmFyIGkgaW4gdmFsdWUpIHtcbiAgICAgICAgaWYgKF9oYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBpKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdG9TdHJpbmcodHlwZSl7XG4gICAgcmV0dXJuIHRvU3RyLmNhbGwodHlwZSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc051bWJlcih2YWx1ZSl7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgfHwgdG9TdHJpbmcodmFsdWUpID09PSBcIltvYmplY3QgTnVtYmVyXVwiO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNTdHJpbmcob2JqKXtcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ3N0cmluZycgfHwgdG9TdHJpbmcob2JqKSA9PT0gXCJbb2JqZWN0IFN0cmluZ11cIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzT2JqZWN0KG9iail7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIHRvU3RyaW5nKG9iaikgPT09IFwiW29iamVjdCBPYmplY3RdXCI7XG4gIH1cblxuICBmdW5jdGlvbiBpc0FycmF5KG9iail7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIHR5cGVvZiBvYmoubGVuZ3RoID09PSAnbnVtYmVyJyAmJiB0b1N0cmluZyhvYmopID09PSAnW29iamVjdCBBcnJheV0nO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNCb29sZWFuKG9iail7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdib29sZWFuJyB8fCB0b1N0cmluZyhvYmopID09PSAnW29iamVjdCBCb29sZWFuXSc7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRLZXkoa2V5KXtcbiAgICB2YXIgaW50S2V5ID0gcGFyc2VJbnQoa2V5KTtcbiAgICBpZiAoaW50S2V5LnRvU3RyaW5nKCkgPT09IGtleSkge1xuICAgICAgcmV0dXJuIGludEtleTtcbiAgICB9XG4gICAgcmV0dXJuIGtleTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldChvYmosIHBhdGgsIHZhbHVlLCBkb05vdFJlcGxhY2Upe1xuICAgIGlmIChpc051bWJlcihwYXRoKSkge1xuICAgICAgcGF0aCA9IFtwYXRoXTtcbiAgICB9XG4gICAgaWYgKGlzRW1wdHkocGF0aCkpIHtcbiAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICAgIGlmIChpc1N0cmluZyhwYXRoKSkge1xuICAgICAgcmV0dXJuIHNldChvYmosIHBhdGguc3BsaXQoJy4nKS5tYXAoZ2V0S2V5KSwgdmFsdWUsIGRvTm90UmVwbGFjZSk7XG4gICAgfVxuICAgIHZhciBjdXJyZW50UGF0aCA9IHBhdGhbMF07XG5cbiAgICBpZiAocGF0aC5sZW5ndGggPT09IDEpIHtcbiAgICAgIHZhciBvbGRWYWwgPSBvYmpbY3VycmVudFBhdGhdO1xuICAgICAgaWYgKG9sZFZhbCA9PT0gdm9pZCAwIHx8ICFkb05vdFJlcGxhY2UpIHtcbiAgICAgICAgb2JqW2N1cnJlbnRQYXRoXSA9IHZhbHVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9sZFZhbDtcbiAgICB9XG5cbiAgICBpZiAob2JqW2N1cnJlbnRQYXRoXSA9PT0gdm9pZCAwKSB7XG4gICAgICAvL2NoZWNrIGlmIHdlIGFzc3VtZSBhbiBhcnJheVxuICAgICAgaWYoaXNOdW1iZXIocGF0aFsxXSkpIHtcbiAgICAgICAgb2JqW2N1cnJlbnRQYXRoXSA9IFtdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb2JqW2N1cnJlbnRQYXRoXSA9IHt9O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzZXQob2JqW2N1cnJlbnRQYXRoXSwgcGF0aC5zbGljZSgxKSwgdmFsdWUsIGRvTm90UmVwbGFjZSk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWwob2JqLCBwYXRoKSB7XG4gICAgaWYgKGlzTnVtYmVyKHBhdGgpKSB7XG4gICAgICBwYXRoID0gW3BhdGhdO1xuICAgIH1cblxuICAgIGlmIChpc0VtcHR5KG9iaikpIHtcbiAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgfVxuXG4gICAgaWYgKGlzRW1wdHkocGF0aCkpIHtcbiAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICAgIGlmKGlzU3RyaW5nKHBhdGgpKSB7XG4gICAgICByZXR1cm4gZGVsKG9iaiwgcGF0aC5zcGxpdCgnLicpKTtcbiAgICB9XG5cbiAgICB2YXIgY3VycmVudFBhdGggPSBnZXRLZXkocGF0aFswXSk7XG4gICAgdmFyIG9sZFZhbCA9IG9ialtjdXJyZW50UGF0aF07XG5cbiAgICBpZihwYXRoLmxlbmd0aCA9PT0gMSkge1xuICAgICAgaWYgKG9sZFZhbCAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAgICAgICBvYmouc3BsaWNlKGN1cnJlbnRQYXRoLCAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgb2JqW2N1cnJlbnRQYXRoXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAob2JqW2N1cnJlbnRQYXRoXSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHJldHVybiBkZWwob2JqW2N1cnJlbnRQYXRoXSwgcGF0aC5zbGljZSgxKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIHZhciBvYmplY3RQYXRoID0ge307XG5cbiAgb2JqZWN0UGF0aC5oYXMgPSBmdW5jdGlvbiAob2JqLCBwYXRoKSB7XG4gICAgaWYgKGlzRW1wdHkob2JqKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChpc051bWJlcihwYXRoKSkge1xuICAgICAgcGF0aCA9IFtwYXRoXTtcbiAgICB9IGVsc2UgaWYgKGlzU3RyaW5nKHBhdGgpKSB7XG4gICAgICBwYXRoID0gcGF0aC5zcGxpdCgnLicpO1xuICAgIH1cblxuICAgIGlmIChpc0VtcHR5KHBhdGgpIHx8IHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaiA9IHBhdGhbaV07XG4gICAgICBpZiAoKGlzT2JqZWN0KG9iaikgfHwgaXNBcnJheShvYmopKSAmJiBfaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGopKSB7XG4gICAgICAgIG9iaiA9IG9ialtqXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBvYmplY3RQYXRoLmVuc3VyZUV4aXN0cyA9IGZ1bmN0aW9uIChvYmosIHBhdGgsIHZhbHVlKXtcbiAgICByZXR1cm4gc2V0KG9iaiwgcGF0aCwgdmFsdWUsIHRydWUpO1xuICB9O1xuXG4gIG9iamVjdFBhdGguc2V0ID0gZnVuY3Rpb24gKG9iaiwgcGF0aCwgdmFsdWUsIGRvTm90UmVwbGFjZSl7XG4gICAgcmV0dXJuIHNldChvYmosIHBhdGgsIHZhbHVlLCBkb05vdFJlcGxhY2UpO1xuICB9O1xuXG4gIG9iamVjdFBhdGguaW5zZXJ0ID0gZnVuY3Rpb24gKG9iaiwgcGF0aCwgdmFsdWUsIGF0KXtcbiAgICB2YXIgYXJyID0gb2JqZWN0UGF0aC5nZXQob2JqLCBwYXRoKTtcbiAgICBhdCA9IH5+YXQ7XG4gICAgaWYgKCFpc0FycmF5KGFycikpIHtcbiAgICAgIGFyciA9IFtdO1xuICAgICAgb2JqZWN0UGF0aC5zZXQob2JqLCBwYXRoLCBhcnIpO1xuICAgIH1cbiAgICBhcnIuc3BsaWNlKGF0LCAwLCB2YWx1ZSk7XG4gIH07XG5cbiAgb2JqZWN0UGF0aC5lbXB0eSA9IGZ1bmN0aW9uKG9iaiwgcGF0aCkge1xuICAgIGlmIChpc0VtcHR5KHBhdGgpKSB7XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgICBpZiAoaXNFbXB0eShvYmopKSB7XG4gICAgICByZXR1cm4gdm9pZCAwO1xuICAgIH1cblxuICAgIHZhciB2YWx1ZSwgaTtcbiAgICBpZiAoISh2YWx1ZSA9IG9iamVjdFBhdGguZ2V0KG9iaiwgcGF0aCkpKSB7XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH1cblxuICAgIGlmIChpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBvYmplY3RQYXRoLnNldChvYmosIHBhdGgsICcnKTtcbiAgICB9IGVsc2UgaWYgKGlzQm9vbGVhbih2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBvYmplY3RQYXRoLnNldChvYmosIHBhdGgsIGZhbHNlKTtcbiAgICB9IGVsc2UgaWYgKGlzTnVtYmVyKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIG9iamVjdFBhdGguc2V0KG9iaiwgcGF0aCwgMCk7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgdmFsdWUubGVuZ3RoID0gMDtcbiAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgZm9yIChpIGluIHZhbHVlKSB7XG4gICAgICAgIGlmIChfaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgaSkpIHtcbiAgICAgICAgICBkZWxldGUgdmFsdWVbaV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG9iamVjdFBhdGguc2V0KG9iaiwgcGF0aCwgbnVsbCk7XG4gICAgfVxuICB9O1xuXG4gIG9iamVjdFBhdGgucHVzaCA9IGZ1bmN0aW9uIChvYmosIHBhdGggLyosIHZhbHVlcyAqLyl7XG4gICAgdmFyIGFyciA9IG9iamVjdFBhdGguZ2V0KG9iaiwgcGF0aCk7XG4gICAgaWYgKCFpc0FycmF5KGFycikpIHtcbiAgICAgIGFyciA9IFtdO1xuICAgICAgb2JqZWN0UGF0aC5zZXQob2JqLCBwYXRoLCBhcnIpO1xuICAgIH1cblxuICAgIGFyci5wdXNoLmFwcGx5KGFyciwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKSk7XG4gIH07XG5cbiAgb2JqZWN0UGF0aC5jb2FsZXNjZSA9IGZ1bmN0aW9uIChvYmosIHBhdGhzLCBkZWZhdWx0VmFsdWUpIHtcbiAgICB2YXIgdmFsdWU7XG5cbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gcGF0aHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmICgodmFsdWUgPSBvYmplY3RQYXRoLmdldChvYmosIHBhdGhzW2ldKSkgIT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgfTtcblxuICBvYmplY3RQYXRoLmdldCA9IGZ1bmN0aW9uIChvYmosIHBhdGgsIGRlZmF1bHRWYWx1ZSl7XG4gICAgaWYgKGlzTnVtYmVyKHBhdGgpKSB7XG4gICAgICBwYXRoID0gW3BhdGhdO1xuICAgIH1cbiAgICBpZiAoaXNFbXB0eShwYXRoKSkge1xuICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgaWYgKGlzRW1wdHkob2JqKSkge1xuICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICB9XG4gICAgaWYgKGlzU3RyaW5nKHBhdGgpKSB7XG4gICAgICByZXR1cm4gb2JqZWN0UGF0aC5nZXQob2JqLCBwYXRoLnNwbGl0KCcuJyksIGRlZmF1bHRWYWx1ZSk7XG4gICAgfVxuXG4gICAgdmFyIGN1cnJlbnRQYXRoID0gZ2V0S2V5KHBhdGhbMF0pO1xuXG4gICAgaWYgKHBhdGgubGVuZ3RoID09PSAxKSB7XG4gICAgICBpZiAob2JqW2N1cnJlbnRQYXRoXSA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gb2JqW2N1cnJlbnRQYXRoXTtcbiAgICB9XG5cbiAgICByZXR1cm4gb2JqZWN0UGF0aC5nZXQob2JqW2N1cnJlbnRQYXRoXSwgcGF0aC5zbGljZSgxKSwgZGVmYXVsdFZhbHVlKTtcbiAgfTtcblxuICBvYmplY3RQYXRoLmRlbCA9IGZ1bmN0aW9uKG9iaiwgcGF0aCkge1xuICAgIHJldHVybiBkZWwob2JqLCBwYXRoKTtcbiAgfTtcblxuICByZXR1cm4gb2JqZWN0UGF0aDtcbn0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gcmVxdWlyZSgnLi9saWIvc2xpY2VkJyk7XG4iLCJcbi8qKlxuICogQW4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSBhbHRlcm5hdGl2ZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhcmdzIHNvbWV0aGluZyB3aXRoIGEgbGVuZ3RoXG4gKiBAcGFyYW0ge051bWJlcn0gc2xpY2VcbiAqIEBwYXJhbSB7TnVtYmVyfSBzbGljZUVuZFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmdzLCBzbGljZSwgc2xpY2VFbmQpIHtcbiAgdmFyIHJldCA9IFtdO1xuICB2YXIgbGVuID0gYXJncy5sZW5ndGg7XG5cbiAgaWYgKDAgPT09IGxlbikgcmV0dXJuIHJldDtcblxuICB2YXIgc3RhcnQgPSBzbGljZSA8IDBcbiAgICA/IE1hdGgubWF4KDAsIHNsaWNlICsgbGVuKVxuICAgIDogc2xpY2UgfHwgMDtcblxuICBpZiAoc2xpY2VFbmQgIT09IHVuZGVmaW5lZCkge1xuICAgIGxlbiA9IHNsaWNlRW5kIDwgMFxuICAgICAgPyBzbGljZUVuZCArIGxlblxuICAgICAgOiBzbGljZUVuZFxuICB9XG5cbiAgd2hpbGUgKGxlbi0tID4gc3RhcnQpIHtcbiAgICByZXRbbGVuIC0gc3RhcnRdID0gYXJnc1tsZW5dO1xuICB9XG5cbiAgcmV0dXJuIHJldDtcbn1cblxuIl19
