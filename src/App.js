import './App.scss';
import InputText from './components/InputText';

function App() {
  function onInput(event) {
    console.log(event.target.value);
  }
  return (
    <div>
      <InputText onInput={onInput} className="input-search"/>
    </div>
  );
}

export default App;
