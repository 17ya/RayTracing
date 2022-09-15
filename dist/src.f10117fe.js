// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"other/Scene.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scene = /*#__PURE__*/_createClass(function Scene(width, height, color) {
  var _this = this;

  _classCallCheck(this, Scene);

  this.canvas = null;
  this.context = null;
  this.sceneInstance = false;

  this.createScene = function (width, height, color) {
    _this.canvas = document.createElement("canvas");
    _this.canvas.id = "canvas";
    _this.canvas.width = width;
    _this.canvas.height = height;
    document.body.appendChild(_this.canvas);
    _this.context = _this.canvas.getContext("2d");

    _this.setImageData(color);
  };

  this.setImageData = function (color) {
    var imageData = _this.getImageData();

    for (var i = 0; i < imageData.data.length; i += 4) {
      // 当该像素是透明的,则设置成指定颜色
      if (imageData.data[i + 3] == 0) {
        imageData.data[i] = color[0];
        imageData.data[i + 1] = color[1];
        imageData.data[i + 2] = color[2];
        imageData.data[i + 3] = color[3];
      }
    }

    _this.imageData = imageData;

    _this.render(imageData);
  };

  this.getImageData = function () {
    var _a, _b, _c;

    if (!_this.canvas) return;
    return (_a = _this.context) === null || _a === void 0 ? void 0 : _a.getImageData(0, 0, (_b = _this.canvas) === null || _b === void 0 ? void 0 : _b.width, (_c = _this.canvas) === null || _c === void 0 ? void 0 : _c.height);
  };

  this.setPixel = function (x, y, color) {
    var _a;

    var _ref = (_a = _this.canvas) !== null && _a !== void 0 ? _a : {},
        _ref$width = _ref.width,
        width = _ref$width === void 0 ? 0 : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === void 0 ? 0 : _ref$height;

    var glx = Math.abs(width / 2 + (x > width / 2 ? -x : x));
    var gly = Math.abs(height / 2 + (y > height / 2 ? y : -y));
    var bytesPerPixel = color.length;
    var offset = (_this.imageData.width * gly + glx) * bytesPerPixel;

    for (var i = 0; i < bytesPerPixel; i++) {
      _this.imageData.data[offset + i] = color[i];
    }

    _this.render(_this.imageData);
  }; // setLine = (x0, y0, x1, y1, color) => {
  //   x0 = Math.trunc(x0); // use integer values
  //   y0 = Math.trunc(y0);
  //   x1 = Math.trunc(x1);
  //   y1 = Math.trunc(y1);
  //   const dx = Math.abs(x1 - x0);
  //   const dy = -Math.abs(y1 - y0);
  //   const sx = x0 < x1 ? 1 : -1;
  //   const sy = y0 < y1 ? 1 : -1;
  //   let err = dx + dy;
  //   let e2;
  //   /* error value e_xy */
  //   let x = x0;
  //   let y = y0;
  //   while (true) {
  //     this.setPixel(x, y, color);
  //     if (x == x1 && y == y1) break;
  //     e2 = 2 * err; // calculate error for next diagonal pixel
  //     if (e2 >= dy) {
  //       err += dy;
  //       x += sx;
  //     }
  //     if (e2 <= dx) {
  //       err += dx;
  //       y += sy;
  //     }
  //   }
  // };


  this.getOffset = function (x, y) {
    var _a;

    var _ref2 = (_a = _this.canvas) !== null && _a !== void 0 ? _a : {},
        _ref2$width = _ref2.width,
        width = _ref2$width === void 0 ? 0 : _ref2$width,
        _ref2$height = _ref2.height,
        height = _ref2$height === void 0 ? 0 : _ref2$height;

    var glx = Math.abs(width + (x > width ? -x : x));
    var gly = Math.abs(height + (y > height ? y : -y));
    return (_this.imageData.width * gly + glx) * 4;
  };

  this.render = function (imageData) {
    var _a;

    (_a = _this.context) === null || _a === void 0 ? void 0 : _a.putImageData(imageData, 0, 0);
  };

  if (!this.sceneInstance) {
    this.createScene(width, height, color);
    this.sceneInstance = true;
  }
});

var _default = Scene;
exports.default = _default;
},{}],"src/Vector.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector = /*#__PURE__*/_createClass(function Vector(x, y, z) {
  var _this = this;

  _classCallCheck(this, Vector);

  this.negative = function () {
    return new Vector(-_this.x, -_this.y, -_this.z);
  };

  this.add = function (v) {
    if (v instanceof Vector) {
      return new Vector(_this.x + v.x, _this.y + v.y, _this.z + v.z);
    }

    return new Vector(_this.x + v, _this.y + v, _this.z + v);
  };

  this.subtract = function (v) {
    if (v instanceof Vector) {
      return new Vector(_this.x - v.x, _this.y - v.y, _this.z - v.z);
    }

    return new Vector(_this.x - v, _this.y - v, _this.z - v);
  };

  this.multiply = function (v) {
    if (v instanceof Vector) {
      return new Vector(_this.x * v.x, _this.y * v.y, _this.z * v.z);
    }

    return new Vector(_this.x * v, _this.y * v, _this.z * v);
  };

  this.divide = function (v) {
    if (v instanceof Vector) {
      return new Vector(_this.x / v.x || 0, _this.y / v.y || 0, _this.z / v.z || 0);
    }

    return new Vector(_this.x / v || 0, _this.y / v || 0, _this.z / v || 0);
  };

  this.equals = function (v) {
    return _this.x == v.x && _this.y == v.y && _this.z == v.z;
  };

  this.dot = function (v) {
    if (v instanceof Vector) {
      return _this.x * v.x + _this.y * v.y + _this.z * v.z;
    }

    return _this.x * v + _this.y * v + _this.z * v;
  };

  this.cross = function (v) {
    return new Vector(_this.y * v.z - _this.z * v.y, _this.z * v.x - _this.x * v.z, _this.x * v.y - _this.y * v.x);
  };

  this.length = function () {
    return Math.sqrt(_this.dot(_this));
  };

  this.unit = function () {
    return _this.divide(_this.length());
  };

  this.min = function () {
    return Math.min(Math.min(_this.x, _this.y), _this.z);
  };

  this.max = function () {
    return Math.max(Math.max(_this.x, _this.y), _this.z);
  }; //   toAngles = () => {
  //     return {
  //       theta: Math.atan2(this.z, this.x),
  //       phi: Math.asin(this.y / this.length()),
  //     };
  //   };
  //   angleTo = (v: Vector) => {
  //     return Math.acos(this.dot(a) / (this.length() * a.length()));
  //   };


  this.toArray = function (n) {
    return [_this.x, _this.y, _this.z].slice(0, n || 3);
  };

  this.clone = function () {
    return new Vector(_this.x, _this.y, _this.z);
  };

  this.toColor = function () {// return new Color(this.x, this.y, this.z, 1);
  };

  this.x = x;
  this.y = y;
  this.z = z;
});

var _default = Vector;
exports.default = _default;
},{}],"src/Color.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Vector = _interopRequireDefault(require("./Vector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Color = /*#__PURE__*/_createClass(function Color() {
  var _this = this;

  var r = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var g = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var b = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  _classCallCheck(this, Color);

  this.r = r;
  this.g = g;
  this.b = b;

  this.toVector = function () {
    return new _Vector.default(_this.r, _this.g, _this.b);
  };
});

var _default = Color;
exports.default = _default;
},{"./Vector":"src/Vector.ts"}],"src/Ray.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ray = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Ray = /*#__PURE__*/function () {
  function Ray(origin, direction) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, Ray);

    this.origin = origin;
    this.direction = direction;
    this.time = options.time || 1;
  }

  _createClass(Ray, [{
    key: "pointAtParameter",
    value: function pointAtParameter() {
      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var direction = this.direction;
      var origin = this.origin;
      return origin.add(direction.multiply(t));
    }
  }, {
    key: "unitDirection",
    value: function unitDirection() {
      return this.direction.unit();
    }
  }]);

  return Ray;
}();

exports.Ray = Ray;
},{}],"src/index.ts":[function(require,module,exports) {
"use strict";

var _Scene = _interopRequireDefault(require("../other/Scene"));

var _Color = _interopRequireDefault(require("./Color"));

var _Ray = require("./Ray");

var _Vector = _interopRequireDefault(require("./Vector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Color from "./Color.js";
//判断光线是否与某个球相交
var hit_sphere = function hit_sphere(center, radius, r) {
  var oc = r.origin.subtract(center);
  var a = r.direction.dot(r.direction);
  var b = 2.0 * r.direction.dot(oc);
  var c = oc.dot(oc) - radius * radius;
  var discriminant = b * b - 4 * a * c;

  if (discriminant < 0) {
    return -1;
  } else {
    var t1 = (-b - Math.sqrt(discriminant)) / (2 * a);
    if (t1 > 0) return t1;
    var t2 = (-b + Math.sqrt(discriminant)) / (2 * a);
    if (t2 > 0) return t2;
    return -1;
  }
}; //实现渐变色


var rayColor = function rayColor(r) {
  var t = hit_sphere(new _Vector.default(0, 0, -1), 0.5, r);

  if (t > 0) {
    var N = r.pointAtParameter(t).subtract(new _Vector.default(0, 0, -1)).unit();
    return new _Vector.default(N.x + 1, N.y + 1, N.z + 1).multiply(0.5);
  }

  var unitDirection = r.direction.unit();
  t = 0.5 * (unitDirection.y + 1.0);
  var a = new _Color.default(1.0, 1.0, 1.0).toVector();
  var b = new _Color.default(0.5, 0.7, 1.0).toVector(); //线性插值

  return a.multiply(1.0 - t).add(b.multiply(t));
};

var scene = new _Scene.default(800, 500, [255, 255, 255, 255]); //Image

var aspect_ratio = 16.0 / 9.0;
var image_width = 800;
var image_height = image_width / aspect_ratio; //Camera

var viewport_height = 2.0;
var viewport_width = aspect_ratio * viewport_height;
var focal_length = 1.0;
var origin = new _Vector.default(0, 0, 0);
var horizontal = new _Vector.default(viewport_width, 0, 0);
var vertical = new _Vector.default(0, viewport_height, 0); //视口左下角的坐标

var lower_left_corner = origin.subtract(horizontal.divide(2)).subtract(vertical.divide(2)).subtract(new _Vector.default(0, 0, focal_length));
var imageData = scene.getImageData();

for (var j = image_height - 1; j >= 0; --j) {
  for (var i = 0; i < image_width; ++i) {
    var u = i / (image_width - 1);
    var v = j / (image_height - 1);
    var direction = lower_left_corner.add(horizontal.multiply(u)).add(vertical.multiply(v)).subtract(origin);
    var pixel_color = rayColor(new _Ray.Ray(origin, direction));
    var offset = scene.getOffset(i, j);
    var color = [pixel_color.x * 255.999, pixel_color.y * 255.999, pixel_color.z * 255.999, 255];

    for (var k = 0; k < color.length; k++) {
      //@ts-ignore
      imageData.data[offset + k] = color[k];
    }
  }
} //@ts-ignore


scene.render(imageData);
},{"../other/Scene":"other/Scene.ts","./Color":"src/Color.ts","./Ray":"src/Ray.ts","./Vector":"src/Vector.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56361" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map