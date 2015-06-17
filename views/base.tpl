<!DOCTYPE html>
<html>
<head lang="en">
	<meta charset="UTF-8">
	<link rel="stylesheet" href="/static/main.css">
	<title></title>
</head>
<body>

<div id="app"></div>

<script src="/static/jquery.js"></script>
<script>
jQuery.fn.extend({
	getPath: function () {
		var path, node = this;
		while (node.length) {
			var realNode = node[0], name = realNode.localName;
			if (!name) break;
			name = name.toLowerCase();

			var parent = node.parent();

			var sameTagSiblings = parent.children(name);
			if (sameTagSiblings.length > 1) {
				allSiblings = parent.children();
				var index = allSiblings.index(realNode) + 1;
				if (index > 1) {
					name += ':nth-child(' + index + ')';
				}
			}

			path = name + (path ? '>' + path : '');
			node = parent;
		}

		return path;
	}
});
</script>
<script src="/static/react.js"></script>
<script src="/static/JSXTransformer.js"></script>
<script src="/static/app.jsx" type="text/jsx"></script>

</body>
</html>