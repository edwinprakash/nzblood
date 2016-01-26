var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var content_view_1 = require('ui/content-view');
var special_properties_1 = require("ui/builder/special-properties");
var frame_1 = require('ui/frame');
var layout_base_1 = require('ui/layouts/layout-base');
var gestures = require("ui/gestures");
var element_registry_1 = require('./element-registry');
var types_1 = require("utils/types");
//var console = {log: function(msg) {}}
var ViewNode = (function () {
    function ViewNode(parentNode, viewName, attrNameAndValues) {
        this.parentNode = parentNode;
        this.viewName = viewName;
        this.eventListeners = new Map();
        this._attachedToView = false;
        this.attributes = new Map();
        this.cssClasses = new Map();
        this.children = [];
        this.setAttributeValues(attrNameAndValues);
        if (this.parentNode)
            this.parentNode.children.push(this);
    }
    ViewNode.prototype.print = function (depth) {
        if (depth === void 0) { depth = 0; }
        var line = "";
        for (var i = 0; i < depth; i++)
            line += "    ";
        console.log(line + this.viewName + '(' + this._attachedToView + ') ');
        this.children.forEach(function (child) {
            child.print(depth + 1);
        });
    };
    Object.defineProperty(ViewNode.prototype, "parentNativeView", {
        get: function () {
            if (this._parentView)
                return this._parentView;
            if (this.parentNode) {
                if (this.parentNode.viewName !== "template" && this.parentNode.nativeView) {
                    this._parentView = this.parentNode.nativeView;
                }
                else {
                    this._parentView = this.parentNode.parentNativeView;
                }
            }
            if (!this._parentView) {
                this._parentView = frame_1.topmost().currentPage;
            }
            return this._parentView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewNode.prototype, "isComplexProperty", {
        get: function () {
            return ViewNode.isComplexProperty(this.viewName);
        },
        enumerable: true,
        configurable: true
    });
    ViewNode.prototype.attachToView = function (atIndex) {
        if (atIndex === void 0) { atIndex = -1; }
        console.log('ViewNode.attachToView ' + this.viewName);
        if (this._attachedToView) {
            console.log('already attached.');
            return;
        }
        this._attachedToView = true;
        this.createUI(atIndex);
        this.attachUIEvents();
        this.children.forEach(function (child) {
            child.attachToView();
        });
        this.postAttachUI();
    };
    ViewNode.prototype.createUI = function (attachAtIndex) {
        if (!element_registry_1.isKnownView(this.viewName))
            return;
        console.log('createUI: ' + this.viewName +
            ', attachAt: ' + attachAtIndex +
            ', parent: ' + this.parentNode.viewName +
            ', parent UI ' + this.parentNativeView.constructor.name);
        var viewClass = element_registry_1.getViewClass(this.viewName);
        if (!this.nativeView) {
            this.nativeView = new viewClass();
        }
        else {
            console.log('Reattaching old view: ' + this.viewName);
        }
        this.configureUI();
        if (this.parentNativeView instanceof layout_base_1.LayoutBase) {
            var parentLayout = this.parentNativeView;
            if (attachAtIndex != -1) {
                console.log('Layout.insertChild');
                var indexOffset = 0;
                if (this.parentNode.viewName === "template") {
                    indexOffset = parentLayout.getChildIndex(this.parentNode.nativeView);
                }
                parentLayout.insertChild(this.nativeView, indexOffset + attachAtIndex);
            }
            else {
                parentLayout.addChild(this.nativeView);
            }
        }
        else if (this.parentNativeView instanceof content_view_1.ContentView) {
            this.parentNativeView.content = this.nativeView;
        }
        else if (this.parentNativeView._addChildFromBuilder) {
            this.parentNativeView._addChildFromBuilder(this.viewName, this.nativeView);
        }
        else if (this.parentNode.isComplexProperty) {
        }
        else {
            console.log('parentNativeView: ' + this.parentNativeView);
            throw new Error("Parent view can't have children! " + this.parentNativeView);
        }
    };
    ViewNode.prototype.postAttachUI = function () {
        if (this.isComplexProperty) {
            var nativeParent = this.parentNativeView;
            if (!nativeParent) {
                return;
            }
            var propertyName = ViewNode.getComplexPropertyName(this.viewName);
            var realChildren = [];
            for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                var child = _a[_i];
                if (child.nativeView) {
                    realChildren.push(child.nativeView);
                }
            }
            if (realChildren.length > 0) {
                if (nativeParent._addArrayFromBuilder) {
                    nativeParent._addArrayFromBuilder(propertyName, realChildren);
                }
                else {
                    this.parentNode.setAttribute(propertyName, realChildren[0]);
                }
            }
        }
    };
    ViewNode.getProperties = function (instance) {
        var type = instance && instance.constructor;
        if (!type) {
            return new Map();
        }
        if (!ViewNode.propertyMaps.has(type)) {
            var propMap = new Map();
            for (var propName in instance) {
                propMap.set(propName.toLowerCase(), propName);
            }
            ViewNode.propertyMaps.set(type, propMap);
        }
        return ViewNode.propertyMaps.get(type);
    };
    ViewNode.isComplexProperty = function (name) {
        return types_1.isString(name) && name.indexOf(".") !== -1;
    };
    ViewNode.getComplexPropertyName = function (fullName) {
        var name;
        if (types_1.isString(fullName)) {
            var names = fullName.split(".");
            name = names[names.length - 1];
        }
        return name;
    };
    ViewNode.prototype.configureUI = function () {
        var _this = this;
        if (this.attributes.size == 0)
            return;
        this.attributes.forEach(function (value, name) {
            _this.setAttribute(name, value);
        });
        this.syncClasses();
    };
    ViewNode.prototype.setAttributeValues = function (attrNameAndValues) {
        if (attrNameAndValues) {
            for (var i = 0; i < attrNameAndValues.length; i += 2) {
                var name_1 = attrNameAndValues[i];
                var value = attrNameAndValues[i + 1];
                this.setAttribute(name_1, value);
            }
        }
    };
    ViewNode.prototype.isXMLAttribute = function (name) {
        switch (name) {
            case "style": return true;
            case "rows": return true;
            case "columns": return true;
            case "fontAttributes": return true;
            default: return false;
        }
    };
    ViewNode.prototype.setAttribute = function (attributeName, value) {
        if (!this.nativeView) {
            console.log('Native view not created. Delaying attribute set: ' + attributeName);
            this.attributes.set(attributeName, value);
            return;
        }
        console.log('Setting attribute: ' + attributeName);
        var specialSetter = special_properties_1.getSpecialPropertySetter(attributeName);
        var propMap = ViewNode.getProperties(this.nativeView);
        if (attributeName === "class") {
            this.setClasses(value);
        }
        else if (this.isXMLAttribute(attributeName)) {
            this.nativeView._applyXmlAttribute(attributeName, value);
        }
        else if (specialSetter) {
            specialSetter(this.nativeView, value);
        }
        else if (propMap.has(attributeName)) {
            // We have a lower-upper case mapped property.
            var propertyName = propMap.get(attributeName);
            this.nativeView[propertyName] = value;
        }
        else {
            // Unknown attribute value -- just set it to our object as is.
            this.nativeView[attributeName] = value;
        }
    };
    ViewNode.prototype.setStyleProperty = function (styleName, styleValue) {
        throw new Error("Not implemented: setStyleProperty");
    };
    ViewNode.prototype.attachUIEvents = function () {
        var _this = this;
        if (!this.nativeView) {
            return;
        }
        console.log('ViewNode.attachUIEvents: ' + this.viewName + ' ' + this.eventListeners.size);
        this.eventListeners.forEach(function (callback, eventName) {
            _this.attachNativeEvent(eventName, callback);
        });
    };
    ViewNode.prototype.detachUIEvents = function () {
        var _this = this;
        if (!this.nativeView) {
            return;
        }
        console.log('ViewNode.detachUIEvents: ' + this.viewName + ' ' + this.eventListeners.size);
        this.eventListeners.forEach(function (callback, eventName) {
            _this.detachNativeEvent(eventName, callback);
        });
    };
    ViewNode.prototype.resolveNativeEvent = function (parsedEventName) {
        //TODO: actually resolve the event...
        return parsedEventName;
    };
    ViewNode.prototype.isGesture = function (eventName) {
        return gestures.fromString(name.toLowerCase()) !== undefined;
    };
    ViewNode.prototype.on = function (eventName, callback) {
        console.log('ViewNode.on: ' + this.viewName + ' -> ' + eventName);
        if (!this.nativeView) {
            this.eventListeners.set(eventName, callback);
        }
        else {
            this.attachNativeEvent(eventName, callback);
        }
    };
    ViewNode.prototype.attachNativeEvent = function (eventName, callback) {
        console.log('attachNativeEvent ' + eventName);
        var resolvedEvent = this.resolveNativeEvent(eventName);
        this.nativeView.addEventListener(resolvedEvent, callback);
    };
    ViewNode.prototype.detachNativeEvent = function (eventName, callback) {
        console.log('detachNativeEvent ' + eventName);
        var resolvedEvent = this.resolveNativeEvent(eventName);
        this.nativeView.removeEventListener(resolvedEvent, callback);
    };
    ViewNode.prototype.appendChild = function (childNode) {
        this.insertChildAt(this.children.length, childNode);
    };
    ViewNode.prototype.insertChildAt = function (index, childNode) {
        console.log('ViewNode.insertChildAt: ' + this.viewName + ' ' + index + ' ' + childNode.viewName);
        if (childNode.parentNode) {
            console.log('Moving child to new parent');
            childNode.parentNode.removeChild(childNode);
        }
        this.children.splice(index, 0, childNode);
        childNode.parentNode = this;
    };
    ViewNode.prototype.removeChild = function (childNode) {
        childNode.parentNode = null;
        childNode._parentView = null;
        this.children = this.children.filter(function (item) { return item !== childNode; });
        childNode.detachFromView();
    };
    ViewNode.prototype.detachFromView = function () {
        this._attachedToView = false;
        this.detachUIEvents();
        if (this.nativeView) {
            var nativeParent = this.nativeView.parent;
            if (nativeParent) {
                if (nativeParent instanceof layout_base_1.LayoutBase) {
                    nativeParent.removeChild(this.nativeView);
                }
                else if (nativeParent instanceof content_view_1.ContentView) {
                    nativeParent.content = undefined;
                }
                else {
                    nativeParent._removeView(this.nativeView);
                }
            }
        }
        this.children.forEach(function (childNode) {
            childNode.detachFromView();
        });
    };
    ViewNode.prototype.clearChildren = function () {
        while (this.children.length > 0) {
            this.removeChild(this.children[0]);
        }
    };
    ViewNode.prototype.getChildIndex = function (childNode) {
        return this.children.indexOf(childNode);
    };
    ViewNode.prototype.setProperty = function (name, value) {
        console.log('ViewNode.setProperty ' + this.viewName + ' setProperty ' + name + ' ' + value);
        if (this.nativeView) {
            this.setAttribute(name, value);
        }
        else {
            console.log('setProperty called without a nativeView');
        }
    };
    ViewNode.prototype.addClass = function (className) {
        this.cssClasses.set(className, true);
        this.syncClasses();
    };
    ViewNode.prototype.removeClass = function (className) {
        this.cssClasses.delete(className);
        this.syncClasses();
    };
    ViewNode.prototype.setClasses = function (classesValue) {
        var _this = this;
        var classes = classesValue.split(ViewNode.whiteSpaceSplitter);
        classes.forEach(function (className) { return _this.cssClasses.set(className, true); });
        this.syncClasses();
    };
    ViewNode.prototype.syncClasses = function () {
        var classValue = Array.from(this.cssClasses.keys()).join(' ');
        if (this.nativeView && classValue) {
            this.nativeView.cssClass = classValue;
        }
    };
    ViewNode.whiteSpaceSplitter = /\s+/;
    ViewNode.propertyMaps = new Map();
    return ViewNode;
})();
exports.ViewNode = ViewNode;
var DummyViewNode = (function (_super) {
    __extends(DummyViewNode, _super);
    function DummyViewNode(parentNode) {
        _super.call(this, parentNode, null, []);
        this.parentNode = parentNode;
    }
    DummyViewNode.prototype.attachToView = function (atIndex) {
        if (atIndex === void 0) { atIndex = -1; }
    };
    DummyViewNode.prototype.insertChildAt = function (index, childNode) {
    };
    DummyViewNode.prototype.removeChild = function (childNode) {
    };
    DummyViewNode.prototype.setProperty = function (name, value) {
    };
    return DummyViewNode;
})(ViewNode);
exports.DummyViewNode = DummyViewNode;
//# sourceMappingURL=view_node.js.map