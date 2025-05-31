/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Header } from './components/Header';

function App() {
    const students = ['Bombardido Crocodilo', 'Tralalela Trululu', 'Dudul Miaw'];

        // state & state updater function
        const [likes, setLikes] = useState(0);

        function handleClick() {
          setLikes(likes + 1);
        }
        
      return (
          <>
            <Header author="Tung Tung Sahur"/>
            <ul>
              {
                students.map((student) => (
                  <li key={student}>{student}</li>
                ))
              }
            </ul>

            <button onClick={handleClick}>Like ({likes})</button>
          </>
          )
}

export default App
