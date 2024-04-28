import Text from '../component/Text'
import History from "../views/History"
import { useState } from 'react'

const HandlingArrays = (props) => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'));
    setLeft(left + 1);
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'));
    setRight(right + 1)
  }

  return (
    <div>
      <Text text="Handling arrays"></Text>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}
      <History allClicks={allClicks}></History>
    </div>
  )
}

export default HandlingArrays;
