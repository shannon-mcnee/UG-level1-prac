<script>

/* update total correct if #total_correct exists */
update_total_correct = function() {
  if (t = document.getElementById("total_correct")) {
    t.innerHTML =
      document.getElementsByClassName("correct").length + " of " +
      document.getElementsByClassName("solveme").length + " correct";
  }
}

/* solution button toggling function */
b_func = function() {
  var cl = this.parentElement.classList;
  if (cl.contains('open')) {
    cl.remove("open");
  } else {
    cl.add("open");
  }
}

/* function for checking solveme answers */
solveme_func = function(e) {
  var real_answers = JSON.parse(this.dataset.answer);
  var my_answer = this.value;
  var cl = this.classList;
  if (cl.contains("ignorecase")) {
    my_answer = my_answer.toLowerCase();
  }
  if (cl.contains("nospaces")) {
    my_answer = my_answer.replace(/ /g, "");
  }
  
  if (my_answer !== "" & real_answers.includes(my_answer)) {
    cl.add("correct");
  } else {
    cl.remove("correct");
  }
  update_total_correct();
}

window.onload = function() {
  /* set up solution buttons */
  var buttons = document.getElementsByTagName("button");

  for (var i = 0; i < buttons.length; i++) {
    if (buttons[i].parentElement.classList.contains('solution')) {
      buttons[i].onclick = b_func;
    }
  }
  
  /* set up solveme inputs */
  var solveme = document.getElementsByClassName("solveme");

  for (var i = 0; i < solveme.length; i++) {
    /* make sure input boxes don't auto-anything */
    solveme[i].setAttribute("autocomplete","off");
    solveme[i].setAttribute("autocorrect", "off");
    solveme[i].setAttribute("autocapitalize", "off"); 
    solveme[i].setAttribute("spellcheck", "false");
    solveme[i].value = "";
    
    /* adjust answer for ignorecase or nospaces */
    var cl = solveme[i].classList;
    var real_answer = solveme[i].dataset.answer;
    if (cl.contains("ignorecase")) {
      real_answer = real_answer.toLowerCase();
    }
    if (cl.contains("nospaces")) {
      real_answer = real_answer.replace(/ /g, "");
    }
    solveme[i].dataset.answer = real_answer;
    
    /* attach checking function */
    solveme[i].onkeyup = solveme_func;
    solveme[i].onchange = solveme_func;
  }
  
  update_total_correct();
}

</script>
