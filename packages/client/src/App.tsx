import './App.css';
import { useEffect, useState } from 'react';
import { Button } from './components/ui/button';
function App() {
   const [message, setMessage] = useState('Hello, World!');
   useEffect(() => {
      fetch('/api/hello')
         .then((res) => res.json())
         .then((data) => setMessage(data.message));
   }, []);

   return (
      <div className="p-4">
         <p className="font-bold bg-red-500 text-white">{message}</p>
         <Button
            onClick={(e) => {
               console.log(e);
            }}
         >
            Clike me{' '}
         </Button>
      </div>
   );
}

export default App;

//

//
