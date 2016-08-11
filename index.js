const handleClickOutside = function (referenceElement, handler, parentElement) {
	let createShimDiv = () => {
		if (!document) {
			// console.warning('Use after componentDidMount');
			return null;
		}
		const parentDiv = parentElement || referenceElement.parentNode;
		let zIndex = getStyle(parentDiv, 'z-index') || 0;
		zIndex = isNaN(zIndex) ? '0' : zIndex;
		let shimDiv = document.createElement('div');
		var csstext = `height:100vw;width:100%;position:fixed;top:0;left:0;z-index:${zIndex}`;
		shimDiv.style.cssText = csstext;
		parentDiv.appendChild(shimDiv);
		referenceElement.style['pointer-events'] = 'auto';
		shimDiv.addEventListener('click', handler);
		return shimDiv;
	};
	let destroyShimDiv = () => {
		if (!shimDiv || !shimDiv.parentNode) return true;
		referenceElement.style['pointer-events'] = '';
		shimDiv.removeEventListener('click', handler);
		shimDiv.parentNode.removeChild(shimDiv);
		return true;
	};
	let shimDiv = createShimDiv();
	return destroyShimDiv;
};

function getStyle (el, prop) {
	if (document.defaultView && document.defaultView.getComputedStyle) {
		return document.defaultView.getComputedStyle(el, null)[prop];
	} else if (el.currentStyle) {
		return el.currentStyle[prop];
	} else {
		return el.style[prop];
	}
}
export default handleClickOutside;

