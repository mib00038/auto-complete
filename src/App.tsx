import React from 'react';
import './App.css';
import useColors, {UseColorsType} from "./hooks/useColors";
import AutoComplete from "./components/AutoComplete";

const App : React.FC = () =>  {
  const {colors}: UseColorsType = useColors();

  return (
    <main className="App">
      <header className="App-header">
        <AutoComplete options={colors} />
      </header>
    </main>
  );
}

export default App;
