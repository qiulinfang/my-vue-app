import { useState } from "react";
import './App.css'

function App(){
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>我的第一个 Vite + React 项目</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          点击次数: {count}
        </button>
        <p>
          修改 <code>src/App.jsx</code> 然后保存，来体验飞速的 HMR 更新。
        </p>
      </div>
    </>
  )
}

export default App
