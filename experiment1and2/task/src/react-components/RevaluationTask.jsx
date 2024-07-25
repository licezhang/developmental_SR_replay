import React, { useState, useEffect, useRef } from 'react'
import ImageDisplay from './ImageDisplay';
import * as constants from '../constants/experiment-constants'

const ALLOWED_KEYS = {
  0: ["ArrowUp", "ArrowDown"],
  1: ["ArrowLeft", "ArrowRight"],
  2: []
}

function RevaluationTask({finishTrial, trial}) {
  let {endStage, startState, rewardMap, environment, firstStageStimulus, showResult, forcedChoice, audioStim} = trial
  const secondStageStimuli = constants.secondStageStimuliMap[environment]

  const catchTrial = firstStageStimulus && firstStageStimulus.includes('catch')
  endStage = catchTrial ? 1 : endStage

  /* map of moves to image stimulus */
  const srcRoot = "./assets/img/" + environment + "/"
  const imageMap = {
      "": srcRoot + firstStageStimulus + ".jpg",
      "ArrowUp": srcRoot + "animals/" + secondStageStimuli[0] + ".jpg",
      "ArrowDown": srcRoot + "animals/" + secondStageStimuli[1] + ".jpg"
  } 

  function getState(){
    const state = startState ? [startState].concat(responseRef.current) : responseRef.current
    return state.join()
  }

  const responseRef = useRef([])
  const stageRef = useRef(startState === "" ? 0 : 1) 
  const timeoutRef = useRef(false)  
  const responseTimes = useRef([])
  const startTime = useRef()
  const timerRef = useRef()

  const [selected, setSelected] = useState()
  const selectedRef = useRef()
  selectedRef.current = selected

  const [display, setDisplay] = useState(imageMap[getState()]) 

  function keyHandler({ key }) {
    let allowedKeys = forcedChoice ? [forcedChoice] : ALLOWED_KEYS[stageRef.current] 
    if (!selected && (allowedKeys.includes(key) || (key===" " && catchTrial)) && stageRef.current != endStage && timeoutRef.current != true){
      /* record reaction time since stimulus display and highlight selected key */
      responseTimes.current.push(performance.now() - startTime.current)
      const response = (key === ' ') ? "spaceBar" : key
      responseRef.current.push(response)
      setSelected(response)
      if (!showResult){
        steptime()
      }
    }
  }

  function isOptimal(state){
    /* returns boolean value for whether player actions were optimal for the given trial */
    if (!rewardMap){
      return null
    }
    if (catchTrial){
      return responseRef.current[0]==="spaceBar"
    }
    const possible_responses = Object.keys(rewardMap).filter(response => response.includes(startState) || startState === "")
    const possible_rewards = possible_responses.map(response => rewardMap[response])
    const best_response = possible_responses[possible_rewards.indexOf(Math.max(...possible_rewards))]
    return state === best_response.split(",").slice(0, endStage).join()
  }

  function getScore(){
    let score = 0
    if (stageRef.current === 3 && getState() in rewardMap) {
      score = rewardMap[getState()]
    }
    else if (timeoutRef.current === true){
      score = -5
    } 
    else if (catchTrial && responseRef.current[0]!="spaceBar"){
      score = -10
    } 
    return score
  }

  function steptime() {
    /* used to recursively step forward in task at 2 second intervals */ 
    stageRef.current += 1
    if (timeoutRef.current === true || stageRef.current === endStage+1 || (stageRef.current === endStage && !showResult)){
      /* Trial ends and data is returned */
      const data = {
        response: responseRef.current,
        rt: responseTimes.current,
        environment: environment,
        score: getScore(),
        rewardMap: rewardMap,
        stimulus: imageMap[[startState]],
        correct: isOptimal(getState()),
        timeout: timeoutRef.current,
        fullState: getState(),
        isCatch: catchTrial,
        audioStim: audioStim
      }
      finishTrial(data)
    } else if (!selectedRef.current){
      /* No move was selected in time, trial ends with timeout */
      setDisplay("timeout")
      timeoutRef.current = true
      timerRef.current = setTimeout(function() { steptime(); }, 2000)
    } else {
      /* Update moves based on recently selected action, updating stimulus and setting new 2 second timeout */
      startTime.current = performance.now()
      let newDisplay = stageRef.current === 2 ? "reward" : imageMap[getState()]
      if (catchTrial && stageRef.current===1){
        if (responseRef.current[0] === 'spaceBar') {
          newDisplay = "caught"
        } else {
          newDisplay = "robbed"
        }
      }
      setDisplay(newDisplay)
      setSelected(null)
      timerRef.current = setTimeout(function() { steptime(); }, 2000)
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", keyHandler);
    return () => {
      window.removeEventListener("keydown", keyHandler);
    };
  });  

  useEffect(() => {
    /* run only once, starts trial by recording startTime and setting 2 second timeout */
    startTime.current = performance.now()
    const timeLimit = showResult ? 2000 : 10000
    timerRef.current = setTimeout(function() { steptime(); }, timeLimit)
    const audio = new Audio('./assets/audio/beeps/' + audioStim + '.wav');
    audio.play();
    return () => {
      clearTimeout(timerRef.current);
      audio.pause();
      audio.currentTime = 0;
    }
  }, []);  

  switch (display) {
    case "timeout":
      return <h1 className="reward" style={{'color':'red'}}>Too slow! -5</h1>
    case "reward":
      return (
        <>
          <h1 className="reward">{String(rewardMap[getState()])}</h1>
          <img src="./assets/img/treasure.jpg" className="treasure"></img>
        </> 
      )
    case "caught":
      return (
        <>
          <h1 style={{'fontSize':'80px'}}> Caught the robber!</h1>
          <img src="./assets/img/caughtRobber.jpg" className="caughtRobber"></img>
        </> 
      )
    case "robbed":
      return <h1 className="reward" style={{'color':'red', 'fontSize':'80px'}}>You got robbed! -10</h1>
    default:
      return (
        <ImageDisplay
          image = {display}
          showArrows = {stageRef.current !== endStage}
          arrows = {ALLOWED_KEYS[stageRef.current]}
          highlight = {selected}
        />
      )
  }
}



export default RevaluationTask