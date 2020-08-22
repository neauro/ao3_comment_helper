document.body.onload = addCommentTooltip();

// resets elements
function resetCommentHelpers() {
  document.getElementById("ao3-comment-input").value = "";
  document.getElementById("quote-selection").innerHTML = "No quoted text yet. Highlight text to make a comment on it!";
}

// toggles helper
function toggleCommentHelper() {
  var desc = document.getElementById("ao3-comment-container");
  var button = document.getElementById("toggle-button");
  if (desc.classList[0] === "show") {
    desc.setAttribute("class","");
    button.innerHTML = "[Expand]";
  }
  else {
    desc.setAttribute("class","show");
    button.innerHTML = "[Collapse]";
  }
}

// adds elements to support commenting
function addCommentTooltip() {
  // tooltip container
  var comment_tooltip = document.createElement("div");
  comment_tooltip.setAttribute("id","ao3-comment-container");
  // comment_tooltip.setAttribute("class","show"); // defaults showing first

  // expand/collapse controls
  var desc = document.createElement("div");
  desc.setAttribute("id","ao3-comment-desc");
  var helper_text = document.createElement("p");
    helper_text.appendChild(document.createTextNode("This is the Ao3 Comment Helper! Highlight text to get started. "));
    var helper_link = document.createElement("a");
      helper_link.setAttribute("href","/");
      helper_link.innerHTML = "Learn more here.";
      helper_text.appendChild(helper_link);
    desc.appendChild(helper_text);
  var toggle_label = document.createElement("button");
    toggle_label.setAttribute("id","toggle-button");
    toggle_label.addEventListener("click", function() {
      toggleCommentHelper();
    });
    toggle_label.innerHTML = "[Collapse]";
    desc.appendChild(toggle_label);
  comment_tooltip.appendChild(desc);

  // quote portion
  var quote_bit = document.createElement("div");
  quote_bit.setAttribute("id","quote-bit");
    var quote_label = document.createElement("p");
    quote_label.appendChild(document.createTextNode("Quoted text:"));
    quote_bit.appendChild(quote_label);

    var quote_block = document.createElement("blockquote");
    quote_block.setAttribute("id","quote-selection");
    quote_block.appendChild(document.createTextNode("No quoted text yet. Highlight text to make a comment on it!"));
    quote_bit.appendChild(quote_block);
  comment_tooltip.appendChild(quote_bit);

  // comment portion
  var comment_bit = document.createElement("div");
  comment_bit.setAttribute("id","comment-bit");
    var comment_label = document.createElement("p");
    comment_label.appendChild(document.createTextNode("Your comment about this quote:"));
    comment_bit.appendChild(comment_label);

    // input
    var comment_input = document.createElement("textarea");
    comment_input.setAttribute("rows", "4");
    comment_input.setAttribute("cols", "50");
    comment_input.setAttribute("id", "ao3-comment-input");
    comment_input.value = "";
    // comment_input.addEventListener("keydown", function(event) {
    //   console.log("test test",event);
    //});
    comment_bit.appendChild(comment_input);
    // button: clear text
    var clear_button = document.createElement("button");
    clear_button.innerHTML = "Clear this comment";
    clear_button.setAttribute("id","ao3-clear-comment"); 
    clear_button.addEventListener("click", function() {
      var clear_confirm = confirm("Are you sure you want to clear your comment text?\n(It will be gone forever!)");
        if (clear_confirm === true) {
          document.getElementById("ao3-comment-input").value = "";
        }
    });
    comment_bit.appendChild(clear_button);

    // button: add text to comment
    var add_text_button = document.createElement("button");
    add_text_button.innerHTML = "Add to AO3 comment";
    add_text_button.setAttribute("id","ao3-add-to-comment"); 
    add_text_button.addEventListener("click", function() {
      var comment_textarea = document.getElementById("add_comment").getElementsByTagName("textarea")[0]
      var new_comment_text = "<blockquote>" + document.getElementById("quote-selection").innerHTML + "</blockquote>\n";
      new_comment_text += document.getElementById("ao3-comment-input").value + "\n";
      comment_textarea.value += new_comment_text + "\n\n";
      document.getElementById("warning-text").setAttribute("class","show");
      resetCommentHelpers();
      toggleCommentHelper();
    });
    comment_bit.appendChild(add_text_button);
  comment_tooltip.appendChild(comment_bit);

  // warning text
  var warning_text = document.createElement("p");
  warning_text.setAttribute("id","warning-text");
  warning_text.appendChild(document.createTextNode("Don't forget to actually POST your comment!"));
  comment_bit.appendChild(warning_text);
  


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
var ao3_work = document.getElementById("main");
ao3_work.onmouseup = function(event) {
  var tooltip_input = document.getElementById("quote-selection");

  // shows selection text in textarea
  var selection = getSelectionText();
  tooltip_input.innerHTML = selection;
  document.getElementById("ao3-comment-container").setAttribute("class","show");
  document.getElementById("toggle-button").innerHTML = "[Collapse]";
};
