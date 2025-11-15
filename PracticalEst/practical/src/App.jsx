import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-500 text-center mb-5">{count}</h1>
      <div className="card mb-2 flex flex-row items-center justify-center gap-4">
        <div>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md mb-2" onClick={() => setCount(count + 1)}>
            Increment
          </button>

        </div>
        <div>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md mb-2" onClick={() => setCount((count) => count - 1)}>
            Decrement 
          </button>
        </div>
        <div>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md mb-2" onClick={() => setCount(0)}>
            Reset 
          </button>
        </div>
      </div>
      
    </div>
  )
}

export default App
