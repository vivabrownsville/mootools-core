/*
---

name: Element.Style

description: Contains methods for interacting with the styles of Elements in a fashionable way.

license: MIT-style license.

requires: [Element, Accessor]

provides: Element.Style

...
*/

(function(){

Element.definePropertySetters({

	opacity: function(opacity){
		return this.setStyle('opacity', opacity);
	},

	styles: function(styles){
		this.setStyles(styles);
	}

}).definePropertyGetter('opacity', function(){
	return this.getStyle('opacity');
});


Element.extend(new Accessor('StyleSetter'))
       .extend(new Accessor('StyleGetter'));

var html = document.html,
	hasOpacity = (html.style.opacity != null),
	reAlpha = /alpha\(opacity=([\d.]+)\)/i,
	floatName = (html.style.cssFloat == null) ? 'styleFloat' : 'cssFloat';

var setOpacity = function(element, opacity){
	if (!element.currentStyle || !element.currentStyle.hasLayout) element.style.zoom = 1;
	if (hasOpacity){
		element.style.opacity = opacity;
	} else {
		opacity = (opacity == 1) ? '' : 'alpha(opacity=' + opacity * 100 + ')';
		var filter = element.style.filter || element.getComputedStyle('filter') || '';
		element.style.filter = reAlpha.test(filter) ? filter.replace(reAlpha, opacity) : filter + opacity;
	}
};

Element.defineStyleSetters({

	opacity: function(opacity){
		var visibility = this.style.visibility;
		if (opacity == 0 && visibility != 'hidden') this.style.visibility = 'hidden';
		else if (opacity != 0 && visibility != 'visible') this.style.visibility = 'visible';

		setOpacity(this, opacity);
	},

	float: function(float){
		this.style[floatName] = float;
	}

}).defineStyleGetters({

	opacity: (hasOpacity) ? function(){
		var opacity = this.style.opacity || this.getComputedStyle('opacity');
		return (opacity == '') ? 1 : opacity;
	} : function(){
		var opacity, filter = (this.style.filter || this.getComputedStyle('filter'));
		if (filter) opacity = filter.match(reAlpha);
		return (opacity == null || filter == null) ? 1 : (opacity[1] / 100);
	},

	float: function(){
		return this.style[floatName];
	}

});


Element.implement({

	getComputedStyle: function(property){
		if (this.currentStyle) return this.currentStyle[property.camelCase()];
		var defaultView = Element.getDocument(this).defaultView,
			computed = defaultView ? defaultView.getComputedStyle(this, null) : null;
		return (computed) ? computed.getPropertyValue((property == floatName) ? 'float' : property.hyphenate()) : null;
	},

	setOpacity: function(value){
		setOpacity(this, value);
		return this;
	},

	getOpacity: function(){
		return this.get('opacity');
	},

	setStyle: function(property, value){
		property = property.camelCase();
		var setter = Element.lookupStyleSetter(property);
		if (setter){
			setter.call(this, value);
			return this;
		}

		if (typeOf(value) != 'string'){
			var map = (Element.lookupStyle(property) || '@').split(' ');
			value = Array.from(value).map(function(val, i){
				if (!map[i]) return '';
				return (typeOf(val) == 'number') ? map[i].replace('@', Math.round(val)) : val;
			}).join(' ');
		} else if (value == String(Number(value))){
			value = Math.round(value);
		}
		this.style[property] = value;
		return this;
	},

	getStyle: function(property){
		property = property.camelCase();
		var getter = Element.lookupStyleGetter(property);
		if (getter) return getter.call(this);

		var result = this.style[property];
		if (!result || property == 'zIndex'){
			result = [];
			for (var style in Element.ShortStyles){
				if (property != style) continue;
				for (var s in Element.ShortStyles[style]) result.push(this.getStyle(s));
				return result.join(' ');
			}
			result = this.getComputedStyle(property);
		}
		if (result){
			result = String(result);
			var color = result.match(/rgba?\([\d\s,]+\)/);
			if (color) result = result.replace(color[0], color[0].rgbToHex());
		}
		if (Browser.opera || (Browser.ie && isNaN(parseFloat(result)))){
			if ((/^(height|width)$/).test(property)){
				var values = (property == 'width') ? ['left', 'right'] : ['top', 'bottom'], size = 0;
				values.each(function(value){
					size += this.getStyle('border-' + value + '-width').toInt() + this.getStyle('padding-' + value).toInt();
				}, this);
				return this['offset' + property.capitalize()] - size + 'px';
			}
			if (Browser.opera && String(result).indexOf('px') != -1) return result;
			if ((/^border(.+)Width|margin|padding/).test(property)) return '0px';
		}
		return result;
	}

});

var ElementProto = Element.prototype;
Element.implement({
	setStyles: ElementProto.setStyle.overloadSetter(),
	getStyles: ElementProto.getStyle.overloadGetter()
});

var styles = Element.Styles = {};
//<1.2compat>
styles = Element.Styles = new Hash();
//</1.2compat>

Element.extend(new Accessor('Style', null, styles)).defineStyles({
	left: '@px', top: '@px', bottom: '@px', right: '@px',
	width: '@px', height: '@px', maxWidth: '@px', maxHeight: '@px', minWidth: '@px', minHeight: '@px',
	backgroundColor: 'rgb(@, @, @)', backgroundPosition: '@px @px', color: 'rgb(@, @, @)',
	fontSize: '@px', letterSpacing: '@px', lineHeight: '@px', clip: 'rect(@px @px @px @px)',
	margin: '@px @px @px @px', padding: '@px @px @px @px', border: '@px @ rgb(@, @, @) @px @ rgb(@, @, @) @px @ rgb(@, @, @)',
	borderWidth: '@px @px @px @px', borderStyle: '@ @ @ @', borderColor: 'rgb(@, @, @) rgb(@, @, @) rgb(@, @, @) rgb(@, @, @)',
	zIndex: '@', 'zoom': '@', fontWeight: '@', textIndent: '@px', opacity: '@'
});

Element.ShortStyles = {margin: {}, padding: {}, border: {}, borderWidth: {}, borderStyle: {}, borderColor: {}};
Element.extend(new Accessor('ShortStyle', null, Element.ShortStyles));

['Top', 'Right', 'Bottom', 'Left'].each(function(direction){
	var Short = Element.ShortStyles;
	['margin', 'padding'].each(function(style){
		var sd = style + direction;
		Short[style][sd] = styles[sd] = '@px';
	});
	var bd = 'border' + direction;
	Short.border[bd] = styles[bd] = '@px @ rgb(@, @, @)';
	var bdw = bd + 'Width', bds = bd + 'Style', bdc = bd + 'Color';
	Short[bd] = {};
	Short.borderWidth[bdw] = Short[bd][bdw] = styles[bdw] = '@px';
	Short.borderStyle[bds] = Short[bd][bds] = styles[bds] = '@';
	Short.borderColor[bdc] = Short[bd][bdc] = styles[bdc] = 'rgb(@, @, @)';
});

})();
