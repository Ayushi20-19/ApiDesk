import "./App.css";
import { useState } from "react";
import ShowApiData from "./components/ShowApiData";
import StackOverflow from "./components/stackoverflow/StackOverflow";
function App() {
  const [istackOverflow,setIsStackOverflow] = useState(false)
  return (
    <div className='App'>
    <div className="routes-cont">
      <div className="route" onClick={()=>setIsStackOverflow(false) } style={{ backgroundColor:istackOverflow ? '#fff':'#3f6e3f', color:!istackOverflow ? '#fff':'#3f6e3f'}}>API</div>
      <div className="route sec-route"  onClick={()=>setIsStackOverflow(true)} style={{ backgroundColor:!istackOverflow ? '#fff':'#3f6e3f', color:istackOverflow ? '#fff':'#3f6e3f'}}>StackOverflow</div>
    </div>
    {istackOverflow ?<StackOverflow/>:<ShowApiData />}
    </div>
  );
}

export default App;