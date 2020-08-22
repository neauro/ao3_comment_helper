// TODO :
// * when user highlights text, show a tooltip with a textarea in it, and a button
//    * on mouseup, get text selection
// * when user clicks button, append that comment to the comment box at the bottom of the chapter



document.body.onload = addCommentTooltip();

// adds elements to support commenting
function addCommentTooltip() {
  // tooltip container
  var comment_tooltip = document.createElement("div");
  comment_tooltip.setAttribute("id","ao3-comment-container");

  // text
  var comment_label = document.createElement("p");
  var label_text = document.createTextNode("Your comment:");
  comment_tooltip.appendChild(label_text);

  // input
  var comment_input = document.createElement("textarea");
  comment_input.setAttribute("rows", "4");
  comment_input.setAttribute("cols", "50");
  comment_input.setAttribute("id", "ao3-comment-input");
  comment_input.value = "This is a test.";
  comment_tooltip.appendChild(comment_input);

  // add to DOM
  document.body.appendChild(comment_tooltip);
}

// gets selected text
// via https://stackoverflow.com/questions/5379120/get-the-highlighted-selected-text
function getSelectionText() {
  console.log("LOG: in getSelectionText()");
  var text = "";
  var activeEl = document.activeElement;
  var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
  if (
    (activeElTagName == "textarea") || (activeElTagName == "input" &&
    /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
    (typeof activeEl.selectionStart == "number")
  ) {
    text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
  } else if (window.getSelection) {
    text = window.getSelection().toString();
  }
  return text;
}

// when text is highlighted, show tooltip that lets users write a comment on that text
// document.onmouseup = document.onkeyup = document.onselectionchange = function(event) {
document.onmouseup = function(event) {
  var tooltip_input = document.getElementById("ao3-comment-input");
  var tooltip = document.getElementById("ao3-comment-container");

  var selection = getSelectionText();
  tooltip_input.value = selection;

  // change position of box
  console.log("TEST event event.y is" + event.y);
  console.log("TEXT event is ",event);
  tooltip.style.top = event.screenY + "px";

};
