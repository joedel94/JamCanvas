console.log("canvasPage");
// that need prefixes

calculateWindows();

//calculate before each building is added and remove .each() function
// and do $(".windows", element).each();
function calculateWindows(element) {

  var border_size = parseInt($("#window-model").css("border-left-width"));
  var window_height = $("#window-model").height() + (2 * border_size);
  var window_width = $("#window-model").width() + (2 * border_size);
  $(".windows").each(function() {


    var windows_per_row = Math.floor($(this).width() / window_width);
    var num_window_rows = Math.floor($(this).height() / window_height);

    console.log(windows_per_row, num_window_rows);

    var windows_html = "";
    while (num_window_rows > 0) {
      windows_html += "<div class='window-row'>"
      for (var i = 0; i < windows_per_row; i++) {
        windows_html += "<div class='window'></div>"
      }
      windows_html +="</div>"; 
      num_window_rows--;
    }

    $(this).html(windows_html);
  });
}