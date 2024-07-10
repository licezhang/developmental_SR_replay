import { ParameterType } from "jspsych";
import ReactDOM from 'react-dom/client';
import React from 'react'
import RestTask from "../react-components/RestTask";

/**
 * 
 * RestPlugin
 * Alice Zhang, 2022
 * 
 * Plays the dot waiting game, where red dots appear randomly every 5-10 seconds after the last one was clicked
 * @param duration length of waiting game in milliseconds
 * 
 **/

const info = {
  name: "revaluation",
  parameters: {
    duration: {
      type: ParameterType.INT, 
      default: 60000,  
    },
  },
};

class RestPlugin{
  static info = info;
  constructor(jsPsych) { this.jsPsych = jsPsych }
  
  trial(display_element, trial) {
    const finishTrial = (resultData) => {
      root.unmount(); // cleanup React element
      this.jsPsych.finishTrial(resultData)
    }
    const root = ReactDOM.createRoot(display_element)
    /* the following line uses React.createElement syntax because this file does not otherwise contain JSX */
    root.render(React.createElement(RestTask, {finishTrial, trial}))
  }
}

export default RestPlugin;