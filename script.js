// Format: [value in dollars],[name],[use in calculation?],[amount]
var change_denom = [[2000, 'Twenty', true, 0],
[1000, 'Ten', true, 0],
[500, 'Five', true, 0],
[100, 'One', true, 0],
[25, 'Quarter', true, 0],
[10, 'Dime', true, 0],
[5, 'Nickel', true, 0],
[1, 'Penny', true, 0]];
var change = 0;

$(document).ready(function() {
  $("#enter").click(function() {
    reset();
    get_none();
    get_change();
    calculate_change(change);
    display_change();
  });

  $("#show_all").click(function() {
    show_all();
  });

});

function show_all() {
  for (i of change_denom) {
    $("#container" + i[1]).fadeIn(100);
  }
}

function reset() {
  for (i of change_denom) {
    i[2] = true;
    i[3] = 0;
  }
  for (i of change_denom) {
    $("#" + i[1]).text(i[3].toString());
  }
}

function get_change() {
  if(!/^(0|[1-9]\d*)(\.\d+)?$/.test($("#change_enter").val())){
    $("#alert_container").fadeIn(100);
    return;
  }
  change = Math.floor(($("#change_enter").val() * 100) + 0.0005);
}

function get_none() {
  for (i of change_denom) {
    i[2] = $("#has" + i[1]).is(":checked");
  }
}

function calculate_change(change) {
  for (i of change_denom) {
    while (i[2] && i[0] <= change) {
      change -= i[0];
      i[3] += 1;
    }
  }
  $("#Leftover").text("$" + (Math.trunc(change) / 100).toFixed(2).toString());
  if (change > 0){
    $("#containerLeftover").fadeIn(100);
  }
  else{
    $("#containerLeftover").fadeOut(100);
  }
  return;
}

function display_change() {
  for (i of change_denom) {
    if (i[3] != 0) {
      $("#container" + i[1]).fadeIn(100);
      $("#" + i[1]).text(i[3].toString());
    }
    else {
      $("#container" + i[1]).fadeOut(100);
    }
  }
}



