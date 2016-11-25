var currentPage = 0;
var pages = {
	0: "startPage",
	1: "selectPage",
	2: "canvasPage"
}
$(document).ready(function() {
	for (var i in pages) {
		var pageName = pages[i];
		$("#" + pageName).load("views/" + pageName + ".html");
	}
});
