export const testing = false

/* practice constants */
const memoryPracticeNumber = testing ? 1 : 2 
const catchPracticeNumber = testing ? 1 : 3
const practiceBlockTrainingNumber = testing ? 2 : 4
export const firstStagePracticeNumber = testing ? 1 : 3
export const secondStagePracticeNumber = testing ? 1 : 2  // how many times to show each 2nd stage state in practice
export const valuePracticeNumber = testing ? 2 : 5
export const practiceRestTime = 15000
export const instructionRewardMap = {
    "ArrowUp,ArrowLeft": 3,
    "ArrowUp,ArrowRight": 36,
    "ArrowDown,ArrowLeft": 15,
    "ArrowDown,ArrowRight": 23
};

/* revaluation task constants */
const trainingMemoryStimuliNumber = testing ? 1 : 21
const testMemoryStimuliNumber = trainingMemoryStimuliNumber
const memoryStimuliNumber = trainingMemoryStimuliNumber + testMemoryStimuliNumber
const catchNumber = testing ? 1 : 8
const memoryRepeats = 2
const valueTrainingNumber = memoryRepeats*trainingMemoryStimuliNumber+catchNumber
export const testNumber = testing ? 2 : 4  // how many times to show each stimuli in test phase
export const revaluationNumber = testing ? 2 : 9 // how many times to show each 2nd stage state in revaluation
export const restTime = testing ? 10000 : 60000
export const rewardMaps1 = {
    "original":
    {
        "ArrowUp,ArrowLeft": 26,
        "ArrowUp,ArrowRight": 10,
        "ArrowDown,ArrowLeft": 5,
        "ArrowDown,ArrowRight": 17
    },
    "revaluation":
    {
        "ArrowUp,ArrowLeft": 2,
        "ArrowUp,ArrowRight": 11,
        "ArrowDown,ArrowLeft": 8,
        "ArrowDown,ArrowRight": 27
    }
};
export const rewardMaps2 = {
    "original": 
    {
        "ArrowUp,ArrowLeft": 23,
        "ArrowUp,ArrowRight": 10,
        "ArrowDown,ArrowLeft": 8,
        "ArrowDown,ArrowRight": 30
    },
    "revaluation": 
    {
        "ArrowUp,ArrowLeft": 27,
        "ArrowUp,ArrowRight": 15,
        "ArrowDown,ArrowLeft": 21,
        "ArrowDown,ArrowRight": 7
    }
}

/* overall experiment constants */
export const progressBarIncrement = 1/(56 + 2*(firstStagePracticeNumber+secondStagePracticeNumber)+valuePracticeNumber + catchPracticeNumber + practiceBlockTrainingNumber*memoryRepeats + 3 + 4 + 2*(valueTrainingNumber + 2*revaluationNumber + 3*testNumber + memoryStimuliNumber) + 2*memoryPracticeNumber)
export const maxPoints = (memoryRepeats*trainingMemoryStimuliNumber*28 + revaluationNumber*22.75 + 6*10 + memoryStimuliNumber*10) * 2 + 36*valuePracticeNumber + 29.5*secondStagePracticeNumber + 10*2*memoryPracticeNumber + 2 + 456
export const instructionsEnv = "space"
export const env1 = "ocean"
export const env2 = "canyon"

/* 
*  Code to read in subjectId and condition from URL and assign experimental settings. 
*  Assign each possibility for taskOrder, stimuliOrder and ValueOrder evenly given condition 0-7
*/

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
export const subjectId = urlParams.get('sub')
export const condition = urlParams.get('condition')
export const age = urlParams.get('age')
export const gender = urlParams.get('gender')
export const taskOrder = condition % 2 === 0 ? ["revaluation","original"] : ["original","revaluation"]
export const rest = condition <= 4 ? true : false
export const valueOrder = condition % 4 < 2 ? [rewardMaps1, rewardMaps2] : [rewardMaps2, rewardMaps1]
export const stimuliOrder = Math.random() > 0.5 ? [env2, env1] : [env1, env2]
export const finalQualtricsLink = "https://app.prolific.com/submissions/complete?cc=CGF7F52T" //"https://nyu.qualtrics.com/jfe/form/SV_9Hsei29VzK8W0cu?subject_ID=" + subjectId;

/* 
Randomized order for memory test stimuli for each environment 
First N are shown in training, rest are new images for memory test
*/
const memoryStimuliOrder = {
    [env1]: [...Array.from(Array(memoryStimuliNumber).keys()).sort((a, b) => 0.5 - Math.random())].map((x) =>  ({'stimulus': 'memory/' + String(x)})),
    [env2]: [...Array.from(Array(memoryStimuliNumber).keys()).sort((a, b) => 0.5 - Math.random())].map((x) =>  ({'stimulus': 'memory/' + String(x)})),
    ['space']: Array.from(Array(23).keys()).map((x) =>  ({'stimulus': String(x)})),
}

export const practiceTimelineVariables = {
    ['first_stage_1']: memoryStimuliOrder['space'].slice(0, firstStagePracticeNumber),
    ['first_stage_2']: memoryStimuliOrder['space'].slice(firstStagePracticeNumber, 2*firstStagePracticeNumber),
    ['full']: memoryStimuliOrder['space'].slice(2*firstStagePracticeNumber, 2*firstStagePracticeNumber+valuePracticeNumber),
    ['catch']: Array.from(Array(catchPracticeNumber).keys()).map((x) =>  ({'stimulus': 'catch/' + String(x)})),
    ['practice_block_training']: Array(memoryRepeats).fill(memoryStimuliOrder['space'].slice(2*firstStagePracticeNumber+valuePracticeNumber,2*firstStagePracticeNumber+valuePracticeNumber+practiceBlockTrainingNumber)).flat().concat([{"stimulus": "catch/" + String(catchPracticeNumber)}]),
    ['practice_block_test']: String(2*firstStagePracticeNumber+valuePracticeNumber+practiceBlockTrainingNumber)
}

export const catchTimelineVariables = Array.from(Array(catchNumber).keys()).map((x) => ({'stimulus': 'catch/' + String(x)}))
export const trainingTimelineVariables = {
    [env1]: Array(memoryRepeats).fill(memoryStimuliOrder[env1].slice(0,trainingMemoryStimuliNumber)).flat().concat(catchTimelineVariables),
    [env2]: Array(memoryRepeats).fill(memoryStimuliOrder[env2].slice(0,trainingMemoryStimuliNumber)).flat().concat(catchTimelineVariables),
}

export const testTimelineVariables = Array.from(Array(testNumber).keys()).map((x) => ({'stimulus': 'test/' + String(x)}))

/* Which animals to show for each environment, with random placement */
export const secondStageStimuliMap = {
    [env1]: Math.random() < 0.5 ? ["seahorse", "octopus"] : ["octopus", "seahorse"],
    [env2]:  Math.random() < 0.5 ? ["lion", "giraffe"] : ["giraffe", "lion"],
    [instructionsEnv]: ["cat", "rabbit"],
}

/* Timeline variables to start from the two second-stage stimuli equally */
export const secondStageStartStates = (number) => Array(number).fill({startState:"ArrowUp"}).concat(Array(number).fill({startState:"ArrowDown"}))
/* Timeline variables for revaluation trial beep audio */
export const beepAudio = ["1_4","2_1","3_0","4_0","5_4","6_3","7_4","8_2","9_2","10_3","11_4","12_2","13_2","14_4","15_0","16_0","17_1","18_0"]
export const practiceBeepAudio = ["19_0","20_0","21_1","22_3"]

/* programmatically generate timeline variables with stimulus (string image file) and status ('old' or 'new') */
const memoryTimeline = (start, stop, environment, status) => { 
    const imageNumbers = memoryStimuliOrder[environment].slice(start, stop);
    return imageNumbers.map(x => ({
        stimulus: `./assets/img/` + environment + "/" + String(x['stimulus']) + `.jpg`,
        status: status 
    }))
}

export const memory_practice = memoryTimeline(0,memoryPracticeNumber,"space","old").concat(memoryTimeline(11,11+memoryPracticeNumber,"space","new"))
export const memoryTest = 
    memoryTimeline(0, trainingMemoryStimuliNumber, env1, "old").concat(
        memoryTimeline(0, trainingMemoryStimuliNumber, env2, "old"),
        memoryTimeline(trainingMemoryStimuliNumber, memoryStimuliNumber, env1, "new"),
        memoryTimeline(trainingMemoryStimuliNumber, memoryStimuliNumber, env2, "new"),
    )

