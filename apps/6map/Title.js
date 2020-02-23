function Title (text) {
	this._text = text;
	this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
	this.defaultOffset = new BMap.Size(20, 10);
}

Title.prototype = new BMap.Control();

Title.prototype.initialize = function (map) {
	var titleTag = document.createElement("h2");
	titleTag.innerHTML = this._text;
	titleTag.style.padding = "8px 8px";
	titleTag.style.background = "#FFFFFF";
	titleTag.style.border = "2px solid #555555";
	titleTag.style.borderRadius = "5px";

	map.getContainer().appendChild(titleTag);

	return titleTag
};