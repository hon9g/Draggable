import React from 'react';

import Box from './components/Box'
import Draggable from './components/Draggable.jsx'

const App = () => {
  return (
    <Draggable>
      <Box />
    </Draggable>
  )
}

export default App;
