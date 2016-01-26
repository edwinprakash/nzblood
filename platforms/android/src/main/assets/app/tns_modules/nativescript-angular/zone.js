// Borrowed from the react-native-renderer project at:
// https://github.com/uber5001/react-native-renderer
var zone_patch_1 = require("./zone_patch");
var core = require('zone.js/lib/core.js');
global.Zone = core.Zone;
global.zone = new core.Zone();
zone_patch_1.default.apply();
//# sourceMappingURL=zone.js.map