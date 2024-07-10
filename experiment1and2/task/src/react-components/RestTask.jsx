import React, { useState, useEffect } from 'react'

// TODO: caps and get from css?
const minWaitTime = 5000
const maxWaitTime = 10000
const dotSpeed = 0.08
const fieldWidth = 700
const fieldHeight = 450
const dotSize = 100

function RestTask({finishTrial, trial}) {
    const [dotVisible, setDotVisible] = useState(false);
    const [dotY, setDotY] = useState(0);
    const [dotX, setDotX] = useState(0);
    
    /* useRef for variables we want to persist without triggering a re-render on their change */
    const requestRef = React.useRef();  // ref for requestAnimationFrame
    const previousTimeRef = React.useRef();  // ref for requestAnimationFrame
    const newDotTimeoutRef = React.useRef(); // used to clean up new dot setTimeout() at the end of the trial
    const numberMissed = React.useRef(0) // keep track of missed dots
    const data = React.useRef([]);  // store dot click reaction times as trial data

    /* setup and teardown, runs only once */
    useEffect(() => {
        waitAndCreateDot()
        const interval = setInterval(() => {
            finishTrial({
                rt: data.current,   
                numberMissed: numberMissed.current,
                duration: trial.duration,
                score: data.current.length * 10,
            });
        }, trial.duration);   // trial ends after duration
        return () => {
            /* cleanup previously set intervals and timeouts when component is unmounted */
            clearInterval(interval)
            clearTimeout(newDotTimeoutRef.current)
        };
    }, []);


    /* using requestAnimationFrame to animate dot movement following tutorial here: https://css-tricks.com/using-requestanimationframe-with-react-hooks/ */
    const animate = time => {
        if (previousTimeRef.current) {
            const deltaTime = time - previousTimeRef.current;
            setDotY((dotY) => {
                if (!dotVisible){
                    /* do not move if dot is currently not visible */
                    return dotY  
                } else {
                    const newY = dotY + deltaTime * dotSpeed
                    if (newY <= fieldHeight-dotSize){
                        /* move dot down according to dotSpeed and time elapsed */
                        return newY
                    } else {
                        /* did not click dot in time - remove from screen, record miss, and start again */
                        setDotVisible(false) 
                        data.current = [...data.current, -1]
                        numberMissed.current += 1
                        waitAndCreateDot()
                        return 0
                    }
                }
            })
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
    }

    /* update value passed to requestAnimationFrame whenever dotVisible changes so that animate() can access the updated value */
    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => {
            cancelAnimationFrame(requestRef.current);
        };
    }, [dotVisible])
  
    const onDotClick = () => {
        if (dotVisible){
            /* record reaction time (Y position of dot when clicked, between 0 and 350) */
            data.current = [...data.current, Math.round(dotY)]
            setDotVisible(false)
            waitAndCreateDot()
        }
    };

    const waitAndCreateDot = () => {
        /* randomly choose a time between min and max wait time */
        const randomWaitTime = Math.floor(Math.random() * (maxWaitTime - minWaitTime + 1)) + minWaitTime;
        newDotTimeoutRef.current = setTimeout(() => {
            /* Randomly set new dot X position */
            setDotX(Math.floor(Math.random() * (fieldWidth-dotSize)))
            setDotY(0)
            setDotVisible(true)
        }, randomWaitTime)
    }

    return (
        <div className="field">
            {dotVisible && 
                <Dot
                    x={dotX}
                    y={dotY}
                    onClick={onDotClick} 
                />
            }
        </div>
    )
}

const Dot = (props) => {
    const {x, y, onClick} = props;    
    const dotStyle = {left: `${x}px`, top: `${y}px`};
    return (
        <div 
            className = "dot"
            style = { dotStyle }
            onClick = {() => onClick()}
        />
    );
};

export default RestTask
