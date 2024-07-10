import { ParameterType } from "jspsych";
import ReactDOM from 'react-dom/client';
import React from 'react'
import RevaluationTask from '../react-components/RevaluationTask'

/**
 * 
 * RestPlugin
 * Alice Zhang, 2022
 * 
 * This plugin implements a two-stage decision task used to assess revaluation behavior 
 * 
 * @param rewardMap reward outcome values in form {"00":value,"01":value,"10":value,"11":value} for each set of possible moves
 * @param environment used to find correct folder for first stage images 
 * @param endStage to end trial at stage 1 
 * @param startState string indicating start at first stage "", or each of second stage "0", "1" stimuli
 * @param firstStageStimulus corresponds to first stage image to show for a given environment
 * @param showResult whether to show stimulus at endStage (set to false for no feedback trials)
 * @param forcedChoice enable response to only one key e.g. "UpArrow"
 * 
 **/

const info = {
  name: "revaluation",
  parameters: {
    rewardMap: {
      type: ParameterType.OBJECT, 
      default: null,
    },
    environment: {
      type: ParameterType.STRING, 
      default: null,
    },
    endStage: {
      type: ParameterType.INT, 
      default: 2,
    },
    startState: {
      type: ParameterType.STRING, 
      default: "",
    },
    firstStageStimulus: {
      type: ParameterType.STRING, 
      default: "",
    },
    showResult: {
      type: ParameterType.BOOL, 
      default: true,
    },
    forcedChoice: {
      type: ParameterType.STRING, 
      default: "",
    },
  },
};

class RevaluationPlugin{
  static info = info;
  constructor(jsPsych) { this.jsPsych = jsPsych }
  trial(display_element, trial) {
    const finishTrial = (resultData) => {
      root.unmount(); // cleanup React element
      this.jsPsych.finishTrial(resultData)
    }
    const root = ReactDOM.createRoot(display_element)
    /* the following line uses React.createElement syntax because this file does not otherwise contain JSX */
    root.render(React.createElement(RevaluationTask, {finishTrial, trial}))
  }
}

export default RevaluationPlugin;