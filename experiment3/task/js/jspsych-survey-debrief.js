jsPsych.plugins["survey-debrief"] = function() {
  var plugin = {};
  plugin.info = {
    name: "survey-debrief",
    description: "",
    parameters: {
      button_label: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: "Button label",
        default: "Continue",
        description: "The text that appears on the button to finish the trial."
      }
    }
  };
  plugin.trial = function(display_element, trial) {
    var html = "";
    html += `<style>
    .survey-debrief-wrap {
      height: 100vh;
      width: 100vw;
    }
    .survey-debrief-instructions {
      margin: auto;
      width: 75vw;
      padding: 0 0 0 0;
      text-align: center;
      font-size: 1.33vw;
      line-height: 1.15em;
    }
    .survey-debrief-container {
      display: grid;
      grid-template-columns: 40% 60%;
      grid-template-rows: auto;
      grid-gap: 2px;
      width: 75vw;
      margin: auto;
      background-color: #F8F8F8;
      border-radius: 12px;
    }
    .survey-debrief-row {
      display: contents;
      justify-items: center;
      text-align: left;
      font-size: 1.33vw;
      line-height: 1.5em;
    }
    .survey-debrief-prompt {
      padding: 12px 0 12px 15px;
      border-top: 2px solid #ffffff;
    }
    .survey-debrief-prompt label {
      padding: 0 8px 0 0;
      display: inline-block;
    }
    .survey-debrief-response {
      padding: 12px 0 12px 0;
      border-top: 2px solid #ffffff;
    }
    .survey-debrief-response label {
      padding: 0 8px 0 0;
      display: inline-block;
    }
    .survey-debrief-response input[type=text] {
      width: 60%;
      height: 1.66vw;
      padding: 0.1em 0.2em;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .survey-debrief-response input[type="radio"] {
      height: 1.05vw;
      width: 1.05vw;
      margin: 0 6px 0 0;
    }
    .survey-debrief-footer {
      margin: auto;
      width: 75vw;
      padding: 0 0 0 0;
      text-align: right;
    }
    .survey-debrief-footer input[type=submit] {
      background-color: #F0F0F0;
      padding: 8px 20px;
      border: none;
      border-radius: 4px;
      margin-top: 5px;
      margin-bottom: 20px;
      margin-right: 0px;
      font-size: 1.15vw;
      color: black;
    }
    </style>`;
    html += '<div class="survey-debrief-wrap"><form id="jspsych-survey-debrief">';
    html += "<div class=survey-debrief-instructions>";
    html += "<h2>Debriefing</h2>";
    html += '<p>Please answer the questions below. <font color="#c87606">Your answers will not affect your payment or bonus.</font></p>';
    html += "</div>";
    html += '<div class="survey-debrief-container">';
    html += '<div class="survey-debrief-row">';
    html += '<div class="survey-debrief-prompt"><label for="difficulty">How difficult was the task?</label></div>';
    html += '<div class="survey-debrief-response">';
    html += '<label><input type="radio" name="difficulty" value="5" required>Very easy</label><br>';
    html += '<label><input type="radio" name="difficulty" value="4" required>Somewhat easy</label><br>';
    html += '<label><input type="radio" name="difficulty" value="3" required>Neither easy nor hard</label><br>';
    html += '<label><input type="radio" name="difficulty" value="2" required>Somewhat hard</label><br>';
    html += '<label><input type="radio" name="difficulty" value="1" required>Very hard</label>';
    html += "</div></div>";
    html += '<div class="survey-debrief-row">';
    html += '<div class="survey-debrief-prompt"><label for="fun">How fun was the task?</label></div>';
    html += '<div class="survey-debrief-response">';
    html += '<label><input type="radio" name="fun" value="5" required>Very fun</label><br>';
    html += '<label><input type="radio" name="fun" value="4" required>Somewhat fun</label><br>';
    html += '<label><input type="radio" name="fun" value="3" required>Neither fun nor boring</label><br>';
    html += '<label><input type="radio" name="fun" value="2" required>Somewhat boring</label><br>';
    html += '<label><input type="radio" name="fun" value="1" required>Very boring</label>';
    html += "</div></div>";
    html += '<div class="survey-debrief-row">';
    html += '<div class="survey-debrief-prompt"><label for="clarity">How clear were the instructions?</label></div>';
    html += '<div class="survey-debrief-response">';
    html += '<label><input type="radio" name="clarity" value="5" required>Very clear</label><br>';
    html += '<label><input type="radio" name="clarity" value="4" required>Somewhat clear</label><br>';
    html += '<label><input type="radio" name="clarity" value="3" required>Neither clear nor confusing</label><br>';
    html += '<label><input type="radio" name="clarity" value="2" required>Somewhat confusing</label><br>';
    html += '<label><input type="radio" name="clarity" value="1" required>Very confusing</label>';
    html += "</div></div>";
    html += '<div class="survey-debrief-row">';
    html += '<div class="survey-debrief-prompt"><label for="strategy">Did you use any strategies during the task (e.g. write things down)?</label></div>';
    html += '<div class="survey-debrief-response"><input type="text" name="strategy"></div>';
    html += "</div>";
    html += '<div class="survey-debrief-row">';
    html += '<div class="survey-debrief-prompt"><label for="feedback">Do you have any other comments?</label></div>';
    html += '<div class="survey-debrief-response"><input type="text" name="feedback"></div>';
    html += "</div>";
    html += "</div>";
    html += '<div class="survey-debrief-footer">';
    html += `<input type="submit" id="jspsych-survey-debrief-next" class="jspsych-btn jspsych-survey-debrief" value="${trial.button_label}"></input>`;
    html += "</div>";
    html += "</form></div>";
    display_element.innerHTML = html;
    window.onbeforeunload = function() {
      window.scrollTo(0, 0);
    };
    display_element.querySelector("#jspsych-survey-debrief").addEventListener("submit", function(event) {
      event.preventDefault();
      var checkboxes = document.querySelectorAll('input[type="checkbox"]');
      var endTime = performance.now();
      var response_time = endTime - startTime;
      var question_data = serializeArray(this);
      question_data = objectifyForm(question_data);
      var trialdata = {
        "rt": response_time,
        "responses": question_data
      };
      display_element.innerHTML = "";
      jsPsych.finishTrial(trialdata);
    });
    var startTime = performance.now();
  };
  /*!
   * Serialize all form data into an array
   * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
   * @param  {Node}   form The form to serialize
   * @return {String}      The serialized form data
   */
  var serializeArray = function(form) {
    var serialized = [];
    for (var i = 0; i < form.elements.length; i++) {
      var field = form.elements[i];
      if (!field.name || field.disabled || field.type === "file" || field.type === "reset" || field.type === "submit" || field.type === "button")
        continue;
      if (field.type === "select-multiple") {
        for (var n = 0; n < field.options.length; n++) {
          if (!field.options[n].selected)
            continue;
          serialized.push({
            name: field.name,
            value: field.options[n].value
          });
        }
      } else if (field.type !== "checkbox" && field.type !== "radio" || field.checked) {
        serialized.push({
          name: field.name,
          value: field.value
        });
      }
    }
    return serialized;
  };
  function objectifyForm(formArray) {
    var returnArray = {};
    for (var i = 0; i < formArray.length; i++) {
      returnArray[formArray[i]["name"]] = formArray[i]["value"];
    }
    return returnArray;
  }
  return plugin;
}();
