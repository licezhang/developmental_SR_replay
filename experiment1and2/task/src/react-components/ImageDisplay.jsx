import React from 'react'

const arrowFile = (direction) => "./assets/img/arrows/" + direction + ".png"

/** 
 * 
 * Displays image stimuli and optionally action arrows and highlighted choice for Revaluation Task
 * @param image {string} stimuli image file
 * @param showArrows {bool} whether choice arrow keys should be shown
 * @param arrows {list} ["Up","Down"] or ["Left", "Right"] corresponding to arrow images
 * @param highlight {string} which arrow to highlight if any
 * 
**/

function ImageDisplay({image, showArrows, arrows, highlight}) {
  const [arrow1,arrow2] = arrows
  const flexDirection = arrow1.includes("Up") ? "column" : "row"
  const arrowsDisplay = showArrows ? "block" : "none"
  const arrowStyle = (arrow) => {
    if (!highlight) {return "arrow"}
    else {
      return (highlight !== arrow) ? "arrow unselected" : "arrow selected"
    }
  }
  return (
    <div className="flexBox" style={{"flexDirection":flexDirection}} >
      <img className={arrowStyle(arrow1)} style={{display: arrowsDisplay}} src={arrowFile(arrow1)}/>
      <img className="image" src={image}/> 
      <img className={arrowStyle(arrow2)} style={{display: arrowsDisplay}} src={arrowFile(arrow2)}/>
    </div>
  )
}

export default ImageDisplay
