import React, {useState} from 'react';
import './App.css';
import useColors, {UseColorsType} from "./hooks/useColors";
import AutoComplete from "./components/AutoComplete";

const App : React.FC = () =>  {
  const {colors}: UseColorsType = useColors();
  const [userInput, setUserInput] = useState<string>('');

  return (
    <main className="App">
      <header className="App-header">
        <AutoComplete options={colors} userInput={userInput} setUserInput={setUserInput} />
      </header>
    </main>
  );
}

export default App;
