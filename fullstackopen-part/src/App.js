import React from 'react'
import { useState } from 'react';

import 'src/css/index.css';

import ComplexState from './views/ComplexState';
import HandlingArrays from './views/HandlingArrays';
import Part1 from './views/Part1';
import Part2 from './views/Part2';

const Hello = (props) => {
    console.log("hello come to react component");
    const now = new Date();
    const a = 10;
    const b = 11;

    return React.createElement(
        'div',
        null,
        React.createElement(
            'p',
            null,
            'hello world, it is ', now.toString()
        ),

        React.createElement(
            'p',
            null,
            a,
            ' plus ',
            b,
            ' = ',
            a + b
        ),

        React.createElement(
            'p',
            null,
            'heelo ',
            props.name,
            ', you are ',
            props.age,
            ' years old'
        )
    )
}

const Hello2 = (props) => {
    const { name, age } = props.data;
    const bornYear = () => {
        const yearNow = new Date().getFullYear();
        return yearNow - age;
    }

    return (
        <div>
            <p>
                Hello {name}, you are {age} years old
            </p>
            <p>
                So you were probably born in {bornYear()}
            </p>
        </div>
    )
}

const Display = (props) => {
    return (
        <div>{props.counter}</div>
    )
}

const Btn = (props) => {
    return (
        <button onClick={props.onClick}>
            {props.text}
        </button>
    )
}

const App = (prop) => {
    const [counter, setCounter] = useState(0);
    setTimeout(() => setCounter(counter + 1), 100000)
    // const {counter} = prop;
    const name = 'jack';
    const age = 19;
    let props = {
        name: 'mark',
        age: 19
    }
    // 注册一个点击事件
    const handleClick = () => {
        console.log("点击事件");
    }
    const setToZero = () => {
        setCounter(0);
    }

    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)

    // Part2
    const notes = [
        {
            id: 1,
            content: 'HTML is easy',
            date: '2024-02-02',
            important: true
        },
        {
            id: 2,
            content: 'Browser can execute only JavaScript',
            date: '2024-02-02',
            importtant: false
        },
        {
            id: 3,
            content: 'Get and Post are the most important methods of HTTP protocol',
            date: '2024-02-02',
            importtant: false
        }
    ]

    return (
        <div>
            <p>welcome to react</p>
            <Hello />
            <Hello />
            <Hello name={name} />
            <Hello name='Marry' age={age} />
            <Hello2 data={props} />
            <Display counter={counter}></Display>
            <button onClick={handleClick}>点击事件1</button>
            <button onClick={() => setCounter(counter + 1)}>页面刷新</button>
            <button onClick={() => setToZero}>归零设置</button>
            <button onClick={() => handleClick()}>点击事件2</button>
            <Btn onClick={setToZero} text='点击事件3'></Btn>

            <div>Complex state</div>
            <div>{left}</div>
            <button onClick={() => setLeft(left + 1)}>left</button>
            <div>{right}</div>
            <button onClick={() => setRight(right + "_x")}>right</button>
            <ComplexState></ComplexState>
            <HandlingArrays></HandlingArrays>
            <Part1></Part1>
            <Part2 notes={notes}></Part2>
        </div>
    )
}

export default App;
