/**
 * 
 * @title treasure-hunt
 * @description measuring magnitude of revaluation and memory over development 
 * @version 0.1.0
 *
 * @assets assets/
 */

import "../styles/main.scss";
import { initJsPsych } from "jspsych";

import FullscreenPlugin from "@jspsych/plugin-fullscreen";
import AudioButtonResponse from "@jspsych/plugin-audio-button-response";
import HtmlKeyboardResponsePlugin from "@jspsych/plugin-html-keyboard-response";
import PreloadPlugin from "@jspsych/plugin-preload";
import RevaluationPlugin from "./plugins/revaluation-plugin"
import RestPlugin from "./plugins/rest-plugin";
import InstructionsPlugin from "./plugins/instructions-plugin";
import CompQPlugin from "./plugins/comp-q-plugin";
import MemoryPlugin from "./plugins/memory-plugin";
import JspsychCallFunction from '@jspsych/plugin-call-function'
import jsPsychPavlovia from  "./plugins/pavlovia";

import * as constants from './constants/experiment-constants';
import * as instructions from './constants/instruction-constants';


/**
 * This function will be executed by jsPsych Builder and is expected to run the jsPsych experiment
 * @type {import("jspsych-builder").RunFunction}
 */
export async function run({ assetPaths }) {
    const jsPsych = initJsPsych({
    show_progress_bar: true,
    auto_update_progress_bar: false,
    on_trial_start: function (data) {
      jsPsych.data.get().addToAll({ 
        task_version: 'spark_pilot_norest', 
        subject_id: constants.subjectId,
        assigned_condition: constants.condition,
        age: constants.age,
        gender: constants.gender
      });
    },
    on_trial_finish: function (data) {
      /* advance progress bar on all trials except fixation cross and incorrect comprehension */
      if (data.task_part != 'fixation' && data.task_part != 'comp_answer' && data.task_part!="audio_test" && data.task_part  && !(data.task_part === 'comp_question' && data.correct === false)){
        jsPsych.setProgressBar(jsPsych.getProgressBarCompleted()+constants.progressBarIncrement);
      }
    },
    on_interaction_data_update: function () {
      /* append updated browser interaction data to last trial whenever it changes */
      const interaction = jsPsych.data.getInteractionData()
      jsPsych.data.addDataToLastTrial({'browser_interaction': interaction['trials']})
    },
    on_finish: function () {
      document.body.innerHTML = `<p> <center> Please wait. You will be redirected in 5 seconds. If you are not redirected, you can <a href=` + constants.finalQualtricsLink + `>click here</a> </center> </p>`
      setTimeout(function () { location.href = constants.finalQualtricsLink }, 5000)
    }
  });

  /*const pavlovia_init = {
    type: jsPsychPavlovia,
    command: "init"
  }

  var pavlovia_finish = {
    type: jsPsychPavlovia,
    command: "finish"
  };*/

  const preload = {
    type: PreloadPlugin,
    images: assetPaths.images,
    audio: assetPaths.audio,
    video: assetPaths.video,
  }; 

  const fullscreen = {
    type: FullscreenPlugin,
    fullscreen_mode: true,
    message: '<p>Please turn on your volume and click "Continue" to enter fullscreen mode and begin the game.</p>', 
  }

  /* 0.5 second blank screen with cross used for inter-trial intervals */
  const fixation = {
    type: HtmlKeyboardResponsePlugin,
    stimulus: '<div style="font-size:60px;">+</div>',
    choices: "NO_KEYS",
    trial_duration: 500,
    data: { task_part: 'fixation' }
  }

  /* 0.5 second blank screen with cross used for inter-trial intervals */
  const countdown = {
    timeline: [
      {
        type: HtmlKeyboardResponsePlugin,
        stimulus: '<div style="font-size:100px;color:red;">Starting in...</div>',
        choices: "NO_KEYS",
        trial_duration: 1000,
      },
      {
        type: HtmlKeyboardResponsePlugin,
        stimulus: '<div style="font-size:200px;color:red;">3</div>',
        choices: "NO_KEYS",
        trial_duration: 1000,
      }, {
        type: HtmlKeyboardResponsePlugin,
        stimulus: '<div style="font-size:200px;color:red;">2</div>',
        choices: "NO_KEYS",
        trial_duration: 1000,
      },
      {
        type: HtmlKeyboardResponsePlugin,
        stimulus: '<div style="font-size:200px;color:red;">1</div>',
        choices: "NO_KEYS",
        trial_duration: 1000,
      },
    ]
  }
  
  /* Shared code used to set up every instructions block using timeline data from instruction-constants.js */
  const instructions_block = (instructions_timeline) => ({ 
    timeline: [{
      type: InstructionsPlugin,
      stimulus: jsPsych.timelineVariable('stimulus'),
      audio_stim: jsPsych.timelineVariable('audio'),
      buttonText: jsPsych.timelineVariable('button'),  
      /* used to substitute current condition for [ENVIRONMENT] placeholder */
      environment: jsPsych.timelineVariable('environment'), 
      data: { task_part: 'instructions' },
    }],
    timeline_variables: instructions_timeline
  }); 

  /* define comprehension question */
  var comp_question = {
    type: CompQPlugin,
    audio_stim: jsPsych.timelineVariable('audio_stim'),
    stimulus: jsPsych.timelineVariable('stimulus'),
    choices: ['TRUE', 'FALSE'],
    data: { task_part: 'comp_question' },
    on_finish: function (data) {
      if (data.response == jsPsych.timelineVariable('correct_button', true)) {
        data.correct = true;
      } else {
        data.correct = false;
      }
    }
  } 

  /* define comprehension answer */
  var comp_answer = {
    type: CompQPlugin,
    stimulus: function () {
      var last_trial_correct = jsPsych.data.get().last(1).values()[0].correct;
      if (last_trial_correct) {
        return jsPsych.timelineVariable('right_response', true)
      } else {
        return jsPsych.timelineVariable('wrong_response', true)
      }
    },
    audio_stim: function () {
      var last_trial_correct = jsPsych.data.get().last(1).values()[0].correct;
      if (last_trial_correct) {
        return jsPsych.timelineVariable('right_audio', true)
      } else {
        return jsPsych.timelineVariable('wrong_audio', true)
      }
    },
    choices: ['Next'],
    data: { task_part: 'comp_answer' },
  }; 

  /* Shared code used to set up conditional looping comprehension block using timeline data from instruction-constants.js */
  const comprehension_block = (comprehension_timeline) => ({
    timeline: [{
      timeline: [comp_question, comp_answer],
      loop_function: function(data) {
        var last_trial_correct = jsPsych.data.get().last(2).values()[0].correct;
        if(last_trial_correct){return false;}
        else {return true;}
        },
    }],
    timeline_variables: comprehension_timeline,
  })

  const audio_choices = ['fish', 'tiger', 'turtle', 'shark', 'replay']
  const audio_answer =  './assets/audio/audiotest/turtle.mp3'
  const answer_index = 2
  const audio_test = {
    timeline: [{
      type: AudioButtonResponse,
      stimulus: audio_answer,
      choices: audio_choices,
      data: { task_part: 'audio_test' },
      prompt: function() {
        var last_response = jsPsych.data.get().last().values()[0]
        if (last_response.trial_type === "audio-button-response" && last_response.response !== answer_index && last_response.response !== 4) {
          return "Incorrect! Please Try again"
        } else {
          return "Audio test: click on the word that you just heard."
        }
      },
      button_html: [
        '<img src="./assets/img/audiotest/fish.png" height="200px" width="200px"/>',
        '<img src="./assets/img/audiotest/tiger.png" height="200px" width="200px"/>',
        '<img src="./assets/img/audiotest/turtle.png" height="200px" width="200px"/>',
        '<img src="./assets/img/audiotest/shark.png" height="200px" width="200px"/>',
        '<img src="./assets/img/audiotest/replay.png" height="200px" width="200px"/>'
      ],
      post_trial_gap: 1000
    }], 
    loop_function: function() {
      var last_trial_correct = jsPsych.data.get().last().values()[0].response === answer_index
      if(last_trial_correct){return false;}
      else {return true;}
    },
  };


  const first_stage_practice = (forcedChoice, firstStageStimuli) => ({
    timeline: [{
      type: RevaluationPlugin,
      endStage: 1,
      environment: jsPsych.timelineVariable('environment'),
      firstStageStimulus: jsPsych.timelineVariable('stimulus'),
      forcedChoice: forcedChoice,
      data: { task_part: 'first stage practice' }
    }, fixation],
    timeline_variables: firstStageStimuli
  })
  
  const second_stage_practice = {
    timeline: [{
      type: RevaluationPlugin,
      startState: jsPsych.timelineVariable('startState'),
      rewardMap: constants.instructionRewardMap,
      environment: jsPsych.timelineVariable('environment'),
      data: { task_part: 'second stage practice' }
    }, fixation],
    timeline_variables: constants.secondStageStartStates(constants.secondStagePracticeNumber),
    randomize_order: true
  }

  const full_practice = {
    timeline: [{
      type: RevaluationPlugin,
      rewardMap: constants.instructionRewardMap,
      environment: jsPsych.timelineVariable('environment'),
      firstStageStimulus: jsPsych.timelineVariable('stimulus'),
      data: { task_part: 'full practice' }
    }, fixation],
    timeline_variables: constants.practiceTimelineVariables['full']
  }

  const catch_practice = {
    timeline: [{
      type: RevaluationPlugin,
      rewardMap: constants.instructionRewardMap,
      environment: jsPsych.timelineVariable('environment'),
      firstStageStimulus: jsPsych.timelineVariable('stimulus'),
      data: { task_part: 'catch practice' }
    }, fixation],
    timeline_variables: constants.practiceTimelineVariables['catch']
  }

  const rest_practice = {
    timeline: [{
      type: RestPlugin,
      duration: constants.practiceRestTime,
      data: { task_part: 'rest practice' }
    }],
  }

  const practice_block = {
    timeline: [
      // todo add to timeline % for these adjust max points as well
      instructions_block(instructions.practice_block), 
      instructions_block(instructions.value_instructions), 
      {
        timeline: [{
          type: RevaluationPlugin,
          rewardMap: constants.instructionRewardMap,
          environment: jsPsych.timelineVariable('environment'),
          firstStageStimulus: jsPsych.timelineVariable('stimulus'),
          data: { task_part: 'practice block' }
        }, fixation],
        timeline_variables: constants.practiceTimelineVariables['practice_block_training']
      }, 
      instructions_block(instructions.revaluation_instructions), 
      {
        timeline: [{
          type: RevaluationPlugin,
          startState: jsPsych.timelineVariable('startState'),
          rewardMap: constants.instructionRewardMap,
          environment: jsPsych.timelineVariable('environment'),
          data: { task_part: 'practice block' }
        }, fixation],
        timeline_variables: constants.secondStageStartStates(2),
        randomize_order: true,
      },
      // comment out next two lines for Experiment 2 with no rest phase
      instructions_block(instructions.short_rest_instructions), 
      rest_practice, 
      instructions_block(instructions.first_test_instructions), 
      countdown,
      {
        type: RevaluationPlugin,
        endStage: 1,
        rewardMap: constants.instructionRewardMap,
        environment: jsPsych.timelineVariable('environment'),
        firstStageStimulus: constants.practiceTimelineVariables['practice_block_test'],
        showResult: false,
        data: { task_part: 'practice block'}
      }, 
      fixation,
      instructions_block(instructions.second_test_instructions), 
      countdown,
      {
        timeline: [{
          type: RevaluationPlugin,
          startState: jsPsych.timelineVariable('startState'),
          rewardMap: constants.instructionRewardMap,
          environment: jsPsych.timelineVariable('environment'),
          showResult: false,
          data: { task_part: 'practice block' }
        }, fixation],
        timeline_variables: constants.secondStageStartStates(1),
      }
    ],
    timeline_variables: [{'environment': constants.instructionsEnv}],
  }

  const task_instructions = {
    timeline: [
      audio_test,
      instructions_block(instructions.introduction_text),
      first_stage_practice("ArrowUp", constants.practiceTimelineVariables['first_stage_1']),
      instructions_block(instructions.travel_down_practice),
      first_stage_practice("ArrowDown", constants.practiceTimelineVariables['first_stage_2']),
      instructions_block(instructions.treasure_search_practice),
      second_stage_practice,
      instructions_block(instructions.full_practice),
      full_practice,
      instructions_block(instructions.catch_practice),
      catch_practice,
      // comment out next two lines for Experiment 2 with no rest phase
      instructions_block(instructions.initial_rest),
      rest_practice,
      practice_block,
      instructions_block(instructions.task_comprehension_instructions),
      comprehension_block(instructions.task_comprehension),
      instructions_block(instructions.ready_to_begin), 
    ],
    timeline_variables: [{'environment': constants.instructionsEnv}],
  }

  let env = constants.stimuliOrder[0]
  let trial_num = 0
  /* Full two stage decisions resulting in a reward */
  const value_training = {
    timeline: [{
      type: RevaluationPlugin,
      rewardMap: jsPsych.timelineVariable('rewardMap'),
      environment: jsPsych.timelineVariable('environment'),
      firstStageStimulus: jsPsych.timelineVariable('stimulus'),
      data: { 
        task_part: 'value training', 
        condition: jsPsych.timelineVariable('condition'),
        order: jsPsych.timelineVariable('order'),
      }
    }, fixation],
    timeline_variables: constants.trainingTimelineVariables[env],
    randomize_order: true,
    on_finish: function (data) {
      data.trial_num = trial_num
      trial_num += 1;
    },
    on_timeline_finish: function() {
      trial_num = 0;
      env = constants.stimuliOrder[1]  // because jspsych is horrible
    },
  }

  /* Only stage two decisions beginning randomly at a given animal */
  const revaluation = {
    timeline: [{
        type: RevaluationPlugin,
        startState: jsPsych.timelineVariable('startState'),
        rewardMap: jsPsych.timelineVariable('rewardMapRevaluation'),
        environment: jsPsych.timelineVariable('environment'),
        data: { 
          task_part: 'revaluation', 
          condition: jsPsych.timelineVariable('condition'),
          order: jsPsych.timelineVariable('order'),
        }
    }, fixation],
    timeline_variables: constants.secondStageStartStates(constants.revaluationNumber),
    randomize_order: true,
    on_finish: function (data) {
      data.trial_num = trial_num
      trial_num += 1;
    },
    on_timeline_finish: function() {
      trial_num = 0;
    },
  }

  /* 60 seconds dot clicking game */
  const rest = {timeline: [{ type: RestPlugin, duration: constants.restTime, data: { task_part: 'rest' } }]}

  /* Only stage one decisions with no feedback */
  const first_stage_test = {
    timeline: [{
      type: RevaluationPlugin,
      endStage: 1,
      rewardMap: jsPsych.timelineVariable('rewardMapRevaluation'),
      environment: jsPsych.timelineVariable('environment'),
      firstStageStimulus: jsPsych.timelineVariable('stimulus'),
      showResult: false,
      data: { 
        task_part: 'first stage test', 
        condition: jsPsych.timelineVariable('condition'),
        order: jsPsych.timelineVariable('order'),  
      }
    }, fixation],
    timeline_variables: constants.testTimelineVariables,
    randomize_order: true,
  }

  /* Only stage two decisions with no feedback */
  const second_stage_test = {
    timeline: [{
      type: RevaluationPlugin,
      startState: jsPsych.timelineVariable('startState'),
      rewardMap: jsPsych.timelineVariable('rewardMapRevaluation'),
      environment: jsPsych.timelineVariable('environment'),
      showResult: false,
      data: { 
        task_part: 'second stage test', 
        condition: jsPsych.timelineVariable('condition'),
        order: jsPsych.timelineVariable('order')  
      }
    }, fixation],
    timeline_variables: constants.secondStageStartStates(constants.testNumber),
  }
  
  /* Two task blocks with different environments and reward values, one revaluation and one control */
  const revaluation_and_control_task = {
    timeline: [
      /*instructions_block(instructions.transitions_instructions), 
      instructions_block(instructions.value_instructions), 
      value_training, */
      instructions_block(instructions.revaluation_instructions),
      revaluation, 
      // comment out next two lines for Experiment 2 with no rest phase
      instructions_block(instructions.rest_instructions), 
      rest, 
      instructions_block(instructions.first_test_instructions), 
      countdown,
      first_stage_test, 
      instructions_block(instructions.second_test_instructions), 
      countdown,
      second_stage_test],
    timeline_variables: [
      {
        rewardMap: constants.valueOrder[0]["original"], 
        rewardMapRevaluation: constants.valueOrder[0][constants.taskOrder[0]],
        condition: constants.taskOrder[0],
        environment: constants.stimuliOrder[0],
        order: 1
      }, 
      {
        rewardMap: constants.valueOrder[1]["original"], 
        rewardMapRevaluation: constants.valueOrder[1][constants.taskOrder[1]],
        condition: constants.taskOrder[1],
        environment: constants.stimuliOrder[1],
        order: 2
      }
    ],
  }

  /* Shared code used for memory test using timeline data from instruction-constants.js */
  const memory_block = (timeline) => ({
    timeline: [
      {
        type: MemoryPlugin,
        stimulus: jsPsych.timelineVariable('stimulus'),
        status: jsPsych.timelineVariable('status'), // old or new
        data: {
          task_part: 'memory', 
        },
        choices: ['1', '2', '3', '4'],
        trial_duration: 10000,  // 10 sec time limit
        display_selection_time: 1000,
      },
      fixation
    ],
    timeline_variables: timeline,
    randomize_order: true,
    on_finish: function (data) {
      data.trial_num = trial_num
      trial_num += 1;
    },
  })
  
  const memory_task = {
    timeline: [
      instructions_block(instructions.memory_instructions),
      memory_block(constants.memory_practice),
      instructions_block(instructions.memory_comprehension_instructions),
      comprehension_block(instructions.memory_comprehension),
      memory_block(constants.memoryTest),
    ],
    timeline_variables: [{'environment': null}], // set because instructions_block() definition requires environment var
  }

  var end_screen = {
    timeline: [instructions_block([{
      stimulus: function() {
        const points = jsPsych.data.get().select('score').sum()
        var bonus = points/constants.maxPoints*5
        bonus = bonus > 0 ? bonus : 0
        bonus = bonus > 5 ? 5 : bonus
        bonus = Math.round(bonus)
        jsPsych.data.addDataToLastTrial({'bonus': bonus})
        return `Thanks for finishing the game! You earned ` + String(points) + ` points which is worth $`+ bonus.toFixed(2) + ` in bonus money`;
      }, 
      data: {
        task_part: 'end',
      },
      audio:  './assets/audio/blank.wav',
      button: "Finish",
    }])],
    on_finish: function () {
      jsPsych.setProgressBar(1)
    }
  }
  

  const is_Safari = /Version\/.*Safari\//.test(navigator.userAgent) && !window.MSStream;
  const safari_is_bad = {
    type: JspsychCallFunction,
    async: true,
    func: function(done){
        const display_element = document.getElementById('jspsych-content');
        display_element.innerHTML = "<p>Click on the screen to start...</p>";
        //var init_button = display_element.querySelector('#safari_audio_init');
        function init_audio_files(){
            jsPsych.pluginAPI.audioContext();
            done();
        }
        //document.addEventListener('touchstart', init_audio_files, false);
        document.addEventListener('click', init_audio_files, {'once':true});
  }
}
    
  ////////////////////////////////////////
  // CREATE TIMELINE AND RUN EXPERIMENT //
  ////////////////////////////////////////

  const timeline : {}[] = [];
  // comment out pavlovia commands to run locally
  //timeline.push(pavlovia_init); 
  timeline.push(preload)
  timeline.push(fullscreen)
  if(is_Safari){timeline.push(safari_is_bad)}
  //timeline.push(task_instructions)
  timeline.push(revaluation_and_control_task)
  timeline.push(memory_task);
  timeline.push(end_screen)
  //timeline.push(pavlovia_finish); 
  await jsPsych.run(timeline);

}
