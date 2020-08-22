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

  // quote portion
  var quote_bit = document.createElement("div");
  quote_bit.setAttribute("id","quote-bit");
    var quote_label = document.createElement("p");
    quote_label.appendChild(document.createTextNode("Quoted text:"));
    quote_bit.appendChild(quote_label);

    var quote_block = document.createElement("blockquote");
    quote_block.setAttribute("id","quote-selection");
    quote_bit.appendChild(quote_block);
  comment_tooltip.appendChild(quote_bit);

  // comment portion
  var comment_bit = document.createElement("div");
  comment_bit.setAttribute("id","comment-bit");
    var comment_label = document.createElement("p");
    comment_label.appendChild(document.createTextNode("Your comment:"));
    comment_bit.appendChild(comment_label);

    // input
    var comment_input = document.createElement("textarea");
    comment_input.setAttribute("rows", "4");
    comment_input.setAttribute("cols", "50");
    comment_input.setAttribute("id", "ao3-comment-input");
    comment_input.value = "This is a test.";
    comment_bit.appendChild(comment_input);
    // button: clear text
    var clear_button = document.createElement("button");
    clear_button.innerHTML = "Clear comment";
    clear_button.setAttribute("id","ao3-clear-comment"); 
    comment_bit.appendChild(clear_button);

    // button: add text to comment
    var add_text_button = document.createElement("button");
    add_text_button.innerHTML = "Add to comment";
    add_text_button.setAttribute("id","ao3-add-to-comment"); 
    comment_bit.appendChild(add_text_button);
  comment_tooltip.appendChild(comment_bit);


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
  var tooltip_input = document.getElementById("quote-selection");

  // shows selection text in textarea
  var selection = getSelectionText();
  tooltip_input.innerHTML = selection;
};
