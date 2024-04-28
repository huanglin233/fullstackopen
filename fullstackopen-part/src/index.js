import ReactDOM from 'react-dom'
import App from './App.js';

let counter = 1;

const refresh = () =>{
  ReactDOM.render(
    <App counter = {counter}/>,
    document.getElementById('root')
  );
}

refresh();
counter += 1;
refresh();
counter += 1;
refresh();
counter += 1;
