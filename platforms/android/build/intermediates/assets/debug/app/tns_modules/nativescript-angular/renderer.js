var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var di_1 = require('angular2/src/core/di');
var view_factory_1 = require('angular2/src/core/render/view_factory');
var api_1 = require('angular2/src/core/render/api');
var view_1 = require('angular2/src/core/render/view');
var view_node_1 = require('./view_node');
//var console = {log: function(msg) {}}
var NativeScriptRenderer = (function (_super) {
    __extends(NativeScriptRenderer, _super);
    function NativeScriptRenderer() {
        _super.call(this);
        this._componentTemplates = new Map();
        console.log('NativeScriptRenderer created');
    }
    NativeScriptRenderer.prototype.createProtoView = function (componentTemplateId, cmds) {
        console.log('NativeScriptRenderer.createProtoView: ' + cmds);
        return new view_1.DefaultProtoViewRef(this._componentTemplates.get(componentTemplateId), cmds);
    };
    NativeScriptRenderer.prototype.createRootHostView = function (hostProtoViewRef, fragmentCount, hostElementSelector) {
        console.log("NativeScriptRenderer.createRootHostView");
        var rootViewWithFragments = this._createView(hostProtoViewRef, null);
        var rootView = resolveInternalDomView(rootViewWithFragments.viewRef);
        var rootNode = rootView.boundElements[0];
        rootNode.attachToView();
        return rootViewWithFragments;
    };
    NativeScriptRenderer.prototype.createView = function (protoViewRef, fragmentCount) {
        console.log("NativeScriptRenderer.createView");
        return this._createView(protoViewRef, null);
    };
    NativeScriptRenderer.prototype._createView = function (protoViewRef, inplaceElement) {
        var dpvr = protoViewRef;
        var view = view_factory_1.createRenderView(dpvr.template, dpvr.cmds, inplaceElement, this);
        return new api_1.RenderViewWithFragments(view, view.fragments);
    };
    NativeScriptRenderer.prototype.destroyView = function (viewRef) {
        console.log("NativeScriptRenderer.destroyView");
        // Seems to be called on component dispose only (router outlet)
        //TODO: handle this when we resolve routing and navigation.
    };
    NativeScriptRenderer.prototype.getRootNodes = function (fragment) {
        return resolveInternalDomFragment(fragment);
    };
    NativeScriptRenderer.prototype.attachFragmentAfterFragment = function (previousFragmentRef, fragmentRef) {
        console.log("NativeScriptRenderer.attachFragmentAfterFragment");
        var previousFragmentNodes = resolveInternalDomFragment(previousFragmentRef);
        if (previousFragmentNodes.length > 0) {
            var sibling = previousFragmentNodes[previousFragmentNodes.length - 1];
            var nodes = resolveInternalDomFragment(fragmentRef);
            this.attachFragmentAfter(sibling, nodes);
        }
    };
    NativeScriptRenderer.prototype.attachFragmentAfterElement = function (location, fragmentRef) {
        console.log("NativeScriptRenderer.attachFragmentAfterElement");
        var element = resolveBoundNode(location);
        var nodes = resolveInternalDomFragment(fragmentRef);
        this.attachFragmentAfter(element, nodes);
    };
    NativeScriptRenderer.prototype.attachFragmentAfter = function (anchorNode, fragmentNodes) {
        var startIndex = anchorNode.parentNode.getChildIndex(anchorNode) + 1;
        fragmentNodes.forEach(function (node, index) {
            console.log('attachFragmentAfterElement: child: ' + node.viewName + ' after: ' + anchorNode.viewName + ' startIndex: ' + startIndex + ' index: ' + index);
            anchorNode.parentNode.insertChildAt(startIndex + index, node);
            node.attachToView(startIndex + index);
        });
    };
    NativeScriptRenderer.prototype.detachFragment = function (fragmentRef) {
        console.log('NativeScriptRenderer.detachFragment');
        var fragmentNodes = resolveInternalDomFragment(fragmentRef);
        fragmentNodes.forEach(function (node) {
            console.log('detaching fragment child: ' + node.viewName);
            if (node.parentNode)
                node.parentNode.removeChild(node);
        });
    };
    NativeScriptRenderer.prototype.hydrateView = function (viewRef) {
        console.log("NativeScriptRenderer.hydrateView ");
        //DOING nothing -- the view init code happens on attach: ViewNode#createUI
    };
    NativeScriptRenderer.prototype.dehydrateView = function (viewRef) {
        console.log("NativeScriptRenderer.dehydrateView");
        //TODO: detach events
    };
    NativeScriptRenderer.prototype.setElementProperty = function (location, propertyName, propertyValue) {
        console.log("NativeScriptRenderer.setElementProperty " + propertyName + " = " + propertyValue);
        var node = resolveBoundNode(location);
        node.setProperty(propertyName, propertyValue);
    };
    NativeScriptRenderer.prototype.setElementAttribute = function (location, attributeName, attributeValue) {
        console.log("NativeScriptRenderer.setElementAttribute " + attributeName + " = " + attributeValue);
        return this.setElementProperty(location, attributeName, attributeValue);
    };
    NativeScriptRenderer.prototype.setElementClass = function (location, className, isAdd) {
        console.log("NativeScriptRenderer.setElementClass " + className + " - " + isAdd);
        var node = resolveBoundNode(location);
        if (isAdd) {
            node.addClass(className);
        }
        else {
            node.removeClass(className);
        }
    };
    NativeScriptRenderer.prototype.setElementStyle = function (location, styleName, styleValue) {
        var node = resolveBoundNode(location);
        node.setStyleProperty(styleName, styleValue);
    };
    /**
    * Used only in debug mode to serialize property changes to comment nodes,
    * such as <template> placeholders.
    */
    NativeScriptRenderer.prototype.setBindingDebugInfo = function (location, propertyName, propertyValue) {
        var node = resolveBoundNode(location);
        console.log('NativeScriptRenderer.setBindingDebugInfo: ' + node.viewName + ', ' + propertyName + ' = ' + propertyValue);
    };
    NativeScriptRenderer.prototype.getNativeElementSync = function (location) {
        console.log("NativeScriptRenderer.getNativeElementSync");
        var node = resolveBoundNode(location);
        return node.nativeView;
    };
    /**
    * Calls a method on an element.
    */
    NativeScriptRenderer.prototype.invokeElementMethod = function (location, methodName, args) {
        console.log("NativeScriptRenderer.invokeElementMethod " + methodName + " " + args);
    };
    NativeScriptRenderer.prototype.setText = function (viewRef, textNodeIndex, text) {
        console.log("NativeScriptRenderer.setText ");
    };
    NativeScriptRenderer.prototype.setEventDispatcher = function (viewRef, dispatcher) {
        console.log("NativeScriptRenderer.setEventDispatcher ");
        var view = resolveInternalDomView(viewRef);
        view.eventDispatcher = dispatcher;
    };
    NativeScriptRenderer.prototype.registerComponentTemplate = function (template) {
        console.log('NativeScriptRenderer.registerComponentTemplate: ' + template.id);
        this._componentTemplates.set(template.id, template);
    };
    NativeScriptRenderer.prototype.resolveComponentTemplate = function (templateId) {
        console.log('NativeScriptRenderer.resolveComponentTemplate: ' + templateId);
        return this._componentTemplates.get(templateId);
    };
    NativeScriptRenderer.prototype.createRootContentInsertionPoint = function () {
        return this.createTemplateAnchor([]);
    };
    NativeScriptRenderer.prototype.createTemplateAnchor = function (attrNameAndValues) {
        console.log('NativeScriptRenderer.createTemplateAnchor');
        return new view_node_1.ViewNode(null, 'template', attrNameAndValues);
    };
    NativeScriptRenderer.prototype.createElement = function (name, attrNameAndValues) {
        console.log('NativeScriptRenderer.createElement: ' + name);
        return new view_node_1.ViewNode(null, name, attrNameAndValues);
    };
    NativeScriptRenderer.prototype.mergeElement = function (existing, attrNameAndValues) {
        console.log('NativeScriptRenderer.mergeElement: ' + existing.viewName);
        existing.clearChildren();
        existing.setAttributeValues(attrNameAndValues);
    };
    NativeScriptRenderer.prototype.createShadowRoot = function (host, templateId) {
        throw new Error('Not implemented.');
    };
    NativeScriptRenderer.prototype.createText = function (value) {
        console.log('NativeScriptRenderer.createText');
        return new view_node_1.DummyViewNode(null);
    };
    NativeScriptRenderer.prototype.appendChild = function (parent, child) {
        console.log('NativeScriptRenderer.appendChild: ' + parent.viewName + ' -> ' + child.viewName);
        parent.appendChild(child);
    };
    NativeScriptRenderer.prototype.on = function (element, eventName, callback) {
        console.log('NativeScriptRenderer.on: ' + eventName);
        var zonedCallback = global.zone.bind(callback);
        element.on(eventName, zonedCallback);
    };
    NativeScriptRenderer.prototype.globalOn = function (target, eventName, callback) {
        throw new Error('Not implemented.');
    };
    NativeScriptRenderer = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], NativeScriptRenderer);
    return NativeScriptRenderer;
})(api_1.Renderer);
exports.NativeScriptRenderer = NativeScriptRenderer;
function resolveInternalDomView(viewRef) {
    return viewRef;
}
function resolveBoundNode(elementRef) {
    var view = resolveInternalDomView(elementRef.renderView);
    //Using an Angular internal API to get the index of the bound element.
    var internalBoundIndex = elementRef.boundElementIndex;
    return view.boundElements[internalBoundIndex];
}
function resolveInternalDomFragment(fragmentRef) {
    return fragmentRef.nodes;
}
//# sourceMappingURL=renderer.js.map