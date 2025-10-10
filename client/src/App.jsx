import { useState } from 'react'
import bookOpenLogo from '/src/assets/book-open.gif'
import bookLogo from '/book.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={bookLogo} className="logo" alt="Book logo" />
        </a>
        <a href="https://lordicon.com/" target="_blank">
          <img src={bookOpenLogo} className="animated logo of book opening and closing" alt="Animated Book logo" />
        </a>
      </div>
      <h1>My Academy</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
