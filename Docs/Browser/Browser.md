Object: Browser {#Browser}
==========================

Browser contains properties attached to the Browser Object for browser version, feature and platform detection.

Browser.Features {#Browser:Browser-Features}
--------------------------------------------

* Browser.Features.xpath - (*boolean*) True if the browser supports DOM queries using XPath.
* Browser.Features.air   - (*boolean*) True if the browser supports Adobe AIR.
* Browser.Features.query - (*boolean*) True if the browser supports querySelectorAll.
* Browser.Features.json  - (*boolean*) True if the browser supports JSON natively.
* Browser.Features.xhr   - (*boolean*) True if the browser supports XMLHttpRequest natively.

Browser.name {#Browser:Browser-name}
------------------------------------

Returns the name of the browser as string. The possible return values are:

* **"ie"** for Windows Internet Explorer.
* **"firefox"** for Mozilla Firefox.
* **"safari"** for Apple Safari.
* **"chrome"** for Google Chrome.
* **"opera"** for Opera.

You can check for a specific browser through the identical property name in the Browser Object:

* Browser.ie      - (*boolean*) True if the current browser is Windows Internet Explorer.
* Browser.firefox - (*boolean*) True if the current browser is Mozilla Firefox.
* Browser.safari  - (*boolean*) True if the current browser is Apple Safari.
* Browser.chrome  - (*boolean*) True if the current browser is Google Chrome.
* Browser.opera   - (*boolean*) True if the current browser is Opera.

You can check for any specific major version of a browser by adding the appropriate version number to the property names above:

* Browser.ie6      - (*boolean*) True if the current browser is Microsoft Internet Explorer v6.x.
* Browser.firefox3 - (*boolean*) True if the current browser is Mozilla Firefox v3.x.
* Browser.safari4  - (*boolean*) True if the current browser is Apple Safari v4.x.
* Browser.chrome8  - (*boolean*) True if the current browser is Google Chrome v8.x.
* Browser.opera9   - (*boolean*) True if the current browser is Opera v9.x.


### Examples:

	alert(Browser.name); // alerts "ie" in Windows Internet Explorer, "firefox" in Mozilla Firefox, "safari" in Apple Safari, "chrome" in Google Chrome or "opera" in Opera.

	if (Browser.ie){
		alert("Hey Redmond!"); // alerts in any Internet Explorer.
	}

	if (Browser.firefox2){
		alert("Firefox rocks, but you should get the latest version!"); // alerts only in Mozilla Firefox v2.x.
	}

	if (Browser.ie6 || Browser.ie7){
		alert("Please upgrade your browser!); // alerts only in Microsoft Internet Explorer v6.x or v7.x.
	}

### Notes:

Non-matching properties return `undefined`. For example, if you check for `Browser.ie` in Mozilla Firefox or for `Browser.chrome8` in Google Chrome v7.x, `undefined` is returned.

If Windows Internet Explorer is in the compatibility mode (set by the X-UA-Compatible header), the Browser Object is treated as if the specified earlier version of the browser is running.

Browser.version {#Browser:Browser-version}
------------------------------------------

Returns the version of the browser as number.

### Example:

	alert(Browser.version); // alerts "3.6" in Mozilla Firefox 3.6.13 or "8" in Google Chrome 8.0.552.237.

Browser.Platform {#Browser:Browser-Platform}
--------------------------------------------

* Browser.Platform.mac     - (*boolean*) True if the platform is Mac.
* Browser.Platform.win     - (*boolean*) True if the platform is Windows.
* Browser.Platform.linux   - (*boolean*) True if the platform is Linux.
* Browser.Platform.ios     - (*boolean*) True if the platform is iOS.
* Browser.Platform.android - (*boolean*) True if the platform is Android.
* Browser.Platform.webos   - (*boolean*) True if the platform is WebOS.
* Browser.Platform.other   - (*boolean*) True if the platform is neither Mac, Windows, Linux, iOS, Android or WebOS.
* Browser.Platform.name    - (*string*) The name of the platform.

Browser.Plugins {#Browser:Browser-Plugins}
------------------------------------------

* Browser.Plugins.Flash         - (*boolean*) True if Adobe Flash is present.
* Browser.Plugins.Flash.version - (*number*) The major version of the flash plugin installed.
* Browser.Plugins.Flash.build   - (*number*) The build version of the flash plugin installed.

### Example:

Running Adobe Flash v10.1.102.64 `Browser.Plugins.Flash.version` will return `10` and `Browser.Plugins.Flash.build` will return `102`.

Browser.Request {#Browser:Browser-Request}
------------------------------------------

* Browser.Request - (*object*) The XMLHttpRequest object or an equivalent.

Browser.exec {#Browser:Browser-exec}
------------------------------------

Executes the passed in string in the browser context.

### Example:

	Browser.exec('alert("Moo!");');


Deprecated {#Deprecated}
------------------------

The `Browser.Engine` object is deprecated since MooTools 1.3.

### Engine:

* Browser.Engine.trident - (*boolean*) True if the current browser uses the trident engine (e.g. Internet Explorer).
* Browser.Engine.gecko - (*boolean*) True if the current browser uses the gecko engine (e.g. Firefox, or any Mozilla Browser).
* Browser.Engine.webkit - (*boolean*) True if the current browser uses the webkit engine (e.g. Safari, Google Chrome, Konqueror).
* Browser.Engine.presto - (*boolean*) True if the current browser uses the presto engine (e.g. Opera 9).
* Browser.Engine.name - (*string*) The name of the engine.
* Browser.Engine.version - (*number*) The version of the engine. (e.g. 950)

