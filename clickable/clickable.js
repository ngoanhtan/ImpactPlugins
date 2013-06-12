ig.module('plugins.clickable').defines(function() {
	var clickables = [];

	function anyClickablesInFocus() {
		for(var i = 0;i < clickables.length; ++i) {
			if(clickables[i].inMouseFocus()) {
				return true;
			}
		}
	}

	MixinClickable = {

		init: function(x, y, settings) {
			this.parent(x, y, settings);
		
			ig.input.initMouse();

			if(!window.wm) {
				ig.system.canvas.addEventListener('click', this._clickable_onCanvasClick.bind(this));
				ig.system.canvas.addEventListener('mousemove', this._clickable_onMouseMove.bind(this));
			}

			clickables.push(this);
		},

		_clickable_onCanvasClick: function() {
			if(this.inMouseFocus() && typeof this.onClick === 'function') {
				this.onClick();
			}
		},

		_clickable_onMouseMove: function() {
			var cursor = anyClickablesInFocus() ? 'pointer' : '';

			ig.system.canvas.style.cursor = cursor;
		},

		inMouseFocus: function() {
			return (
				 (this.pos.x <= (ig.input.mouse.x + ig.game.screen.x)) &&
				 ((ig.input.mouse.x + ig.game.screen.x) <= this.pos.x + this.size.x) &&
				 (this.pos.y <= (ig.input.mouse.y + ig.game.screen.y)) &&
				 ((ig.input.mouse.y + ig.game.screen.y) <= this.pos.y + this.size.y)
			);
		}

	};

});

