import { useState } from "react";

import Text from "../component/Text";

// part1练习
const Part1 = (props) => {
  const [value, setValue] = useState(10);

  const handleClick = () => {
    console.log('点击了btn');
    setValue(0);
  }

  const hello = (who) => {
    const handler = () => {
      console.log('hello', who);
    }

    return handler;
  }

  const hello2 = (who) => () => {
    console.log("hello2", who);
  }


  const hello3 = (who) => () => {
    console.log("hello3", who);
  }

  const setToValue = (val) => () => {
    console.log("value now", val);
    setValue(val);
  }

  const Display = props => <div>{props.vlaue}</div>

  return (
    <div>
      <Text name="Part1"></Text>
      <Display vlaue={value}></Display>
      <div>----------------------------</div>
      <button onClick={handleClick}>button</button>
      <button onClick={hello('world')}>worldBtn</button>
      <button onClick={hello('react')}>reactBtn</button>
      <button onClick={hello('function')}>funBtn</button>
      <div>----------------------------</div>
      <button onClick={setToValue(1000)}>thousand</button>
      <button onClick={setToValue(0)}>reset</button>
      <button onClick={setToValue(value + 1)}>increment</button>
    </div>
  )
}

export default Part1;
