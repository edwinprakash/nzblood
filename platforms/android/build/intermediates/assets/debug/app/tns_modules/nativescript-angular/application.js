require('reflect-metadata');
require('./polyfills/array');
require('globals');
//HACK: Unhack our global lazy loaded functions hack to make zone monkey patching work.
var __dummy_setTimeout = global.setTimeout;
var __dummy_clearTimeout = global.clearTimeout;
var __dummy_setInterval = global.setInterval;
var __dummy_clearInterval = global.clearInterval;
require('./zone');
var lang_1 = require('angular2/src/facade/lang');
var core_1 = require('angular2/core');
var di_1 = require('angular2/src/core/di');
var dom_adapter_1 = require('angular2/src/platform/dom/dom_adapter');
var api_1 = require('angular2/src/core/render/api');
var renderer_1 = require('./renderer');
var dom_adapter_2 = require('./dom_adapter');
var xhr_1 = require('angular2/src/compiler/xhr');
var xhr_2 = require('./xhr');
var exception_handler_1 = require('angular2/src/facade/exception_handler');
var application_common_providers_1 = require('angular2/src/core/application_common_providers');
var compiler_1 = require('angular2/src/compiler/compiler');
var platform_common_providers_1 = require('angular2/src/core/platform_common_providers');
var common_1 = require("angular2/common");
function nativeScriptBootstrap(appComponentType, customProviders) {
    if (customProviders === void 0) { customProviders = null; }
    dom_adapter_2.NativeScriptDomAdapter.makeCurrent();
    var nativeScriptProviders = [
        renderer_1.NativeScriptRenderer,
        di_1.provide(api_1.Renderer, { useClass: renderer_1.NativeScriptRenderer }),
        di_1.provide(xhr_1.XHR, { useClass: xhr_2.FileSystemXHR }),
        di_1.provide(exception_handler_1.ExceptionHandler, { useFactory: function () { return new exception_handler_1.ExceptionHandler(dom_adapter_1.DOM, true); }, deps: [] }),
        di_1.provide(core_1.PLATFORM_PIPES, { useValue: common_1.COMMON_PIPES, multi: true }),
        di_1.provide(core_1.PLATFORM_DIRECTIVES, { useValue: common_1.COMMON_DIRECTIVES, multi: true }),
        application_common_providers_1.APPLICATION_COMMON_PROVIDERS,
        compiler_1.COMPILER_PROVIDERS,
        platform_common_providers_1.PLATFORM_COMMON_PROVIDERS,
        common_1.FORM_PROVIDERS,
    ];
    var appProviders = [];
    if (lang_1.isPresent(customProviders)) {
        appProviders.push(customProviders);
    }
    return core_1.platform(nativeScriptProviders).application(appProviders).bootstrap(appComponentType);
}
exports.nativeScriptBootstrap = nativeScriptBootstrap;
//# sourceMappingURL=application.js.map