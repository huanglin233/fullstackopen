import Text from '../component/Text'
import { useState } from 'react'
const ComplexState = (props) => {
    const [clicks, setClicks] = useState({
        left: 0,
        right: 0
    })

    const handleLeftClick = () => {
        const newClicks = {
            left: clicks.left + 1,
            right: clicks.right
        }

        setClicks(newClicks);
    }

    const handleRightClick = () => {
        const newClicks = {
            left: clicks.left,
            right: clicks.right + 1
        }

        setClicks(newClicks);
    }

    const handleLeftClick2 = () => {
        const newClicks = {
            ...clicks,
            left: clicks.left + 1
        }

        setClicks(newClicks);
    }

    const handleRightClick2 = () => 
        setClicks({ ...clicks, right: clicks.right + 1})

    return (
        <div>
            <Text text="ComplexState"></Text>
            {clicks.left}
            <button onClick={handleLeftClick}>left2</button>
            <button onClick={handleLeftClick2}>left3</button>
            {clicks.right}
            <button onClick={handleRightClick}>right2</button>
            <button onClick={handleRightClick2}>right3</button>
        </div>
        
        
    )
}

export default ComplexState