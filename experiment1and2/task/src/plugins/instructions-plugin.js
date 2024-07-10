import { ParameterType } from "jspsych";

/**
 * jspsych-learning-instructions
 * KN - modified from html-button-response
 *
 * plugin for displaying a stimulus and getting a keyboard response
 *
 * documentation: docs.jspsych.org
 *
 **/

const info = {
  name: 'learning-instructions',
  description: '',
  parameters: {
    audio_stim: {
      type: ParameterType.AUDIO,
      pretty_name: 'Audio stimulus',
      default: './assets/audio/blank.wav',
      description: 'The audio to be played.'
    },
    stimulus: {
      type: ParameterType.HTML_STRING,
      pretty_name: 'Stimulus',
      default: undefined,
      description: 'The HTML string to be displayed'
    },
    buttonText: {
      type: ParameterType.STRING,
      pretty_name: 'Button Text',
      default: undefined,
      description: 'The label for the buttons.'
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
    environment: {
      type: ParameterType.STRING,
      pretty_name: 'Environment',
      default: null,
      description: 'Replaces any [ENVIRONMENT] placeholder in the instructions html.'
    },
  }
}


class InstructionsPlugin{
  static info = info;
  constructor(jsPsych) { this.jsPsych = jsPsych }
 
  trial(display_element, trial) {
    // set up audio stimulus
    var context = this.jsPsych.pluginAPI.audioContext();
    
    var audio;
    var self = this
    // replace all instances of [ENVIRONMENT] placeholder with the parameter condition
    var stimulus = trial.environment ? trial.stimulus.replace("[ENVIRONMENT]", trial.environment) : trial.stimulus
    var audio_stim = trial.environment ? trial.audio_stim.replace("[ENVIRONMENT]", trial.environment) : trial.audio_stim

    // set up visual stimulus
    var html = `<div class="instructions-wrap"> <div id="jspsych-learning-instructions-stimulus" class="learning-instructions-text"> ${stimulus} </div></div>`;

    // store response
    var response = {
      rt: null,
      button: null
    };


    // record webaudio context start time
    var startTime;

    // load audio file
    this.jsPsych.pluginAPI.getAudioBuffer(audio_stim)
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
        console.error(`Failed to load audio file "${audio_stim}". Try checking the file path. We recommend using the preload plugin to load audio files.`)
        console.error(err)
      });


    // display visual stimulus
    function setupTrial() {
      display_element.innerHTML = html;
      context.resume();

      // start audio
      if (context !== null) {
        startTime = context.currentTime;
        audio.start(startTime);
      } else {
        audio.play();
      }

      // display button after audio plays
      audio.addEventListener('ended', show_button);

    }

    // function to display next button
    function show_button() {
      if (trial.buttonText==='None'){
        setTimeout(end_trial, 2000);
      } else {
        var button = '<button class="instructions-btn" text="' + trial.buttonText + '">' + trial.buttonText + '</button>';
        html += '<div class="learning-instructions-button" style=" margin:' + trial.margin_vertical + ' ' + trial.margin_horizontal + '" id="learning-instructions-button">' + button + '</div>';
        display_element.innerHTML = html;
        var start_time = performance.now();
        display_element.querySelector('#learning-instructions-button').addEventListener('click', function (e) {
          after_response(null, start_time);
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
      display_element.querySelector('#jspsych-learning-instructions-stimulus').className += ' responded';

      // disable all the buttons after a response
      var btns = document.querySelectorAll('.learning-instructions-button button');
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
        "stimulus": stimulus,
      };

      // clear the display
      display_element.innerHTML = '';

      // move on to the next trial
      self.jsPsych.finishTrial(trial_data);
    };

    // hide image if timing is set
    if (trial.stimulus_duration !== null) {
      this.jsPsych.pluginAPI.setTimeout(function () {
        display_element.querySelector('#jspsych-learning-instructions-stimulus').style.visibility = 'hidden';
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

export default InstructionsPlugin;