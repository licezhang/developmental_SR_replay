import { ParameterType } from "jspsych";

/**
 * jspsych-comp-q
 * Kate Nussenbaum, 2022
 * 
 * documentation: docs.jspsych.org
 *
 **/

const info = {
  name: 'comp-q',
  description: '',
  parameters: {
    audio_stim: {
      type: ParameterType.AUDIO,
      pretty_name: 'Audio stimulus',
      default: './assets/audio/blank.wav',
      description: 'The audio to play'
    },
    stimulus: {
      type: ParameterType.HTML_STRING,
      pretty_name: 'Stimulus',
      default: undefined,
      description: 'The HTML string to be displayed'
    },
    choices: {
      type: ParameterType.STRING,
      pretty_name: 'Choices',
      default: undefined,
      array: true,
      description: 'The labels for the buttons.'
    },
    button_html: {
      type: ParameterType.STRING,
      pretty_name: 'Button HTML',
      default: '<button class="jspsych-btn">%choice%</button>',
      array: true,
      description: 'The html of the button. Can create own style.'
    },
    prompt: {
      type: ParameterType.STRING,
      pretty_name: 'Prompt',
      default: null,
      description: 'Any content here will be displayed under the button.'
    },
    stimulus_duration: {
      type: ParameterType.INT,
      pretty_name: 'Stimulus duration',
      default: null,
      description: 'How long to hide the stimulus.'
    },
    trial_duration: {
      type: ParameterType.INT,
      pretty_name: 'Trial duration',
      default: null,
      description: 'How long to show the trial.'
    },
    margin_vertical: {
      type: ParameterType.STRING,
      pretty_name: 'Margin vertical',
      default: '0px',
      description: 'The vertical margin of the button.'
    },
    margin_horizontal: {
      type: ParameterType.STRING,
      pretty_name: 'Margin horizontal',
      default: '8px',
      description: 'The horizontal margin of the button.'
    },
    response_ends_trial: {
      type: ParameterType.BOOL,
      pretty_name: 'Response ends trial',
      default: true,
      description: 'If true, then trial will end when user responds.'
    },
  }
}

class CompQPlugin{
  static info = info;
  constructor(jsPsych) { this.jsPsych = jsPsych }
  
  trial(display_element, trial) {

    var self = this

    // set up audio stimulus
    var context = this.jsPsych.pluginAPI.audioContext();
    var audio;

    // set up visual stimulus
    var html = '<div id="jspsych-comp-q-stimulus">' + trial.stimulus + '</div>';

    // set up structure to store response
    var response = {
      rt: null,
      button: null
    };

    // record webaudio context start time
    var startTime;

    // load audio file
    this.jsPsych.pluginAPI.getAudioBuffer(trial.audio_stim)
      .then(function (buffer) {
        if (context !== null) {
          audio = context.createBufferSource();
          audio.buffer = buffer;
          audio.connect(context.destination);
        } else {
          audio = buffer;
          audio.currentTime = 0;
        }
        setupTrial();
      })
      .catch(function (err) {
        console.error(`Failed to load audio file "${trial.audio_stim}". Try checking the file path. We recommend using the preload plugin to load audio files.`)
        console.error(err)
      });


    // display visual stimulus
    function setupTrial() {
      display_element.innerHTML = html;

      // start audio
      if (context !== null) {
        startTime = context.currentTime;
        audio.start(startTime);
      } else {
        audio.play();
      }

      // display button after audio plays
      audio.addEventListener('ended', show_buttons);

    }

    // function to display buttons
    function show_buttons() {
      var buttons = [];
      if (Array.isArray(trial.button_html)) {
        if (trial.button_html.length == trial.choices.length) {
          buttons = trial.button_html;
        } else {
          console.error('Error in comp-q plugin. The length of the button_html array does not equal the length of the choices array');
        }
      } else {
        for (var i = 0; i < trial.choices.length; i++) {
          buttons.push(trial.button_html);
        }
      }
      html += '<div id="jspsych-comp-q-btngroup">';
      for (var i = 0; i < trial.choices.length; i++) {
        var str = buttons[i].replace(/%choice%/g, trial.choices[i]);
        html += '<div class="jspsych-comp-q-button" style="display: inline-block; margin:' + trial.margin_vertical + ' ' + trial.margin_horizontal + '" id="jspsych-comp-q-button-' + i + '" data-choice="' + i + '">' + str + '</div>';
      }
      html += '</div>';
      display_element.innerHTML = html;
      var start_time = performance.now();

      // add event listeners to buttons
      for (var i = 0; i < trial.choices.length; i++) {
        display_element.querySelector('#jspsych-comp-q-button-' + i).addEventListener('click', function (e) {
          var choice = e.currentTarget.getAttribute('data-choice'); // don't use dataset for jsdom compatibility
          after_response(choice, start_time);
        });
      }
    }


    // function to handle responses by the subject
    function after_response(choice, start_time) {

      // measure rt
      var end_time = performance.now();
      var rt = end_time - start_time;
      response.button = choice;
      response.rt = rt;

      // after a valid response, the stimulus will have the CSS class 'responded'
      // which can be used to provide visual feedback that a response was recorded
      display_element.querySelector('#jspsych-comp-q-stimulus').className += ' responded';

      // disable all the buttons after a response
      var btns = document.querySelectorAll('.jspsych-comp-q-button button');
      for (var i = 0; i < btns.length; i++) {
        //btns[i].removeEventListener('click');
        btns[i].setAttribute('disabled', 'disabled');
      }

      if (trial.response_ends_trial) {
        end_trial();
      }
    };

    // function to end trial when it is time
    function end_trial() {

      // kill any remaining setTimeout handlers
      self.jsPsych.pluginAPI.clearAllTimeouts();

      // stop the audio file if it is playing
      if (context !== null) {
        audio.stop();
      } else {
        audio.pause();
      }


      // gather the data to store for the trial
      var trial_data = {
        "rt": response.rt,
        "stimulus": trial.stimulus,
        "response": response.button
      };

      // clear the display
      display_element.innerHTML = '';

      // move on to the next trial
      self.jsPsych.finishTrial(trial_data);
    };

    // hide image if timing is set
    if (trial.stimulus_duration !== null) {
      this.jsPsych.pluginAPI.setTimeout(function () {
        display_element.querySelector('#jspsych-comp-q-stimulus').style.visibility = 'hidden';
      }, trial.stimulus_duration);
    }

    // end trial if time limit is set
    if (trial.trial_duration !== null) {
      this.jsPsych.pluginAPI.setTimeout(function () {
        end_trial();
      }, trial.trial_duration);
    }

  };
}

export default CompQPlugin;