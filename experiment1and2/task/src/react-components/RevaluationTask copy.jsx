import React, { useState, useEffect, useRef } from 'react'
import ImageDisplay from './ImageDisplay';
import * as constants from '../constants/experiment-constants'

const ALLOWED_KEYS = {
  0: ["ArrowUp", "ArrowDown"],
  1: ["ArrowLeft", "ArrowRight"],
  2: []
}

function RevaluationTask({finishTrial, trial}) {
  const {endStage, startState, rewardMap, environment, firstStageStimuliIndex, showResult, forcedChoice} = trial
  const secondStageStimuli = constants.secondStageStimuliMap[environment]
  /* get correct first stage stimuli based on randomized order and current index */
  const firstStageStimuli = firstStageStimuliIndex!== null ? constants.firstStageStimuliOrder[environment][firstStageStimuliIndex] : null

  const [moves, setMoves] = useState(startState) // stores current state in form of past user actions 
  const movesRef = useRef(moves) // used to access moves in setTimeout function steptime()
  movesRef.current = moves

  const [highlight, setHighlight] = useState("");  // stores most recent choice before it is added to moves
  const highlightRef = useRef(highlight); // used to access highlight in setTimeout function steptime()
  highlightRef.current = highlight;

  const stage = moves.length

  const responseTimes = useRef([])
  const startTime = useRef()

  const [status, setStatus] = useState('');
  const statusRef = useRef()
  statusRef.current = status

  /* map of moves to image stimulus */
  const srcRoot = "./assets/img/" + environment + "/"
  const imageMap = {
    "": srcRoot + firstStageStimuli + ".jpg",
    "0": srcRoot + "animals/" + secondStageStimuli[0] + ".jpg",
    "1": srcRoot + "animals/" + secondStageStimuli[1] + ".jpg",
  } 
  const image = imageMap[moves]

  function keyHandler({ key }) {
    const allowedKeys = forcedChoice ? [forcedChoice] : ALLOWED_KEYS[stage]
    if (allowedKeys.includes(key) && stage != endStage && highlight === "" && status != 'timeout'){
      /* record reaction time since stimulus display and highlight selected key */
      responseTimes.current.push(performance.now() - startTime.current)
      setHighlight(key)
    }
  }

  function isOptimal(moves){
    /* returns boolean value for whether player actions were optimal for the given trial */
    if (!rewardMap){
      return null
    }
    const possible_moves = Object.keys(rewardMap).filter(moves => moves[0] === startState || startState === "")
    const possible_rewards = possible_moves.map(moves => rewardMap[moves])
    const best_move = possible_moves[possible_rewards.indexOf(Math.max(...possible_rewards))]
    return moves === best_move.slice(0, endStage)
  }

  function steptime() {
    /* used to recursively step forward in task at 2 second intervals */ 
    const moves = movesRef.current
    const stage = moves.length

    if (statusRef.current === 'timeout' || stage === endStage || (stage === endStage-1 && !showResult)){
      /* Trial ends and data is returned */
      const final_moves = showResult ? moves : [String(ALLOWED_KEYS[stage].indexOf(highlightRef.current))]
      console.log(moves, showResult,final_moves, highlightRef.current)
      const data = {
        response: Array.prototype.map.call(final_moves, (x,idx) => ALLOWED_KEYS[idx][x]).slice(startState.length),
        rt: responseTimes.current,
        environment: environment,
        score: stage === 2 ? rewardMap[final_moves] : 0,
        rewardMap: rewardMap,
        stimulus: imageMap[startState],
        firstStageStimuliIndex: firstStageStimuliIndex,
        correct: isOptimal(final_moves),
        status: statusRef.current 
      }
      console.log(Array.prototype.map.call(final_moves, (x,idx) => ALLOWED_KEYS[idx][x]).slice(startState.length))
      console.log(stage === 2 ? rewardMap[final_moves] : 0,)
      finishTrial(data)
    } else if (highlightRef.current === ""){
      /* No move was selected in time, trial ends with timeout */
      setStatus("timeout")
      setTimeout(function() { steptime(); }, 2000)
    } else {
      /* Update moves based on recently selected action, updating stimulus and setting new 2 second timeout */
      startTime.current = performance.now()
      setMoves((moves) => moves + String(ALLOWED_KEYS[stage].indexOf(highlightRef.current)))
      setHighlight("")
      setTimeout(function() { steptime(); }, 2000)
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
    setTimeout(function() { steptime(); }, 2000)
  }, []);  

  return(
    statusRef.current === "timeout" ? 
      <h1 className="reward" style={{'color':'red'}}>Too slow! -5</h1> : 
      stage !== 2 ? 
        <ImageDisplay
          image = {image}
          showArrows = {stage !== endStage}
          arrows = {ALLOWED_KEYS[stage]}
          highlight = {highlight}
        /> :
        <>
          <h1 className="reward">{String(rewardMap[moves])}</h1>
          <img src="./assets/img/treasure.jpg" className="treasure"></img>
        </> 
  )
}



export default RevaluationTask