/*
---
name: Accessor
description: Accessor
requires: [typeOf, Array, Function, String, Object]
provides: Accessor
...
*/

(function(global){

/* Accessor */

this.Accessor = function(singular, plural, accessor){

	singular = (singular || '').capitalize();
	if (!plural) plural = singular + 's';

	var define = 'define', lookup = 'lookup', match = 'match', each = 'each';

	if (this === global) return [define + singular, define + plural, lookup + singular, lookup + plural, match + singular, each + singular].pair(function(name){
		return function(){
			Object.append(this, new Accessor(singular, plural));
			return this[name].apply(this, arguments);
		};
	});

	if (!accessor) accessor = {};
	var matchers = [];

	this[define + singular] = function(key, value){
		if (typeOf(key) == 'regexp') matchers.push({'regexp': key, 'action': value});
		else accessor[key] = value;
		return this;
	};

	this[define + plural] = function(object){
		for (var key in object) accessor[key] = object[key];
		return this;
	};

	this[match + singular] = function(name){
		for (var l = matchers.length; l--; l){
			var matcher = matchers[l], match = name.match(matcher.regexp);
			if (match && (match = match.slice(1))) return function(){
				return matcher.action.apply(this, Array.slice(arguments).append(match));
			};
		}
		return null;
	};

	this[lookup + singular] = function(key){
		return accessor[key] || null;
	};

	this[lookup + plural] = function(keys){
		return Object.subset(accessor, keys);
	};

	this[each + singular] = function(fn, bind){
		for (var p in accessor) fn.call(bind, accessor[p], p);
	};

	return this;

};

})(this);
