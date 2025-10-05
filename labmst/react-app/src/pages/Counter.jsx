import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    if (count < 10) {
      setCount(count + 1);
    } else {
      alert("Max limit reached");
    }
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    } else {
      alert("Can't go below 0");
    }
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-lg mb-6">Counter Component</h1>
      <div className="p-6 border rounded-lg shadow-md flex flex-col items-center space-y-6">
        
        <h3 className="text-5xl font-bold text-indigo-600">{count}</h3>

        <div className="flex gap-4">
          <button
            onClick={increment}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Increment
          </button>
          <button
            onClick={decrement}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Decrement
          </button>
        </div>

        <button
          onClick={reset}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Counter;
