
import './App.css'
import { useEffect, useState } from 'react'
function App() {
const [message, setMessage] = useState('Hello, World!');
useEffect(()=>{
  fetch('/api/hello').then(res => res.json()).then(data => setMessage(data.message));
},[])


return <p>{message}</p>

}

export default App
