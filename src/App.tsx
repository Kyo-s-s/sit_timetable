import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TimeTable } from './TimeTable/TimeTable';

function App() {
  return (
    <div className="m-1">
      {TimeTable()}
    </div>
  );
}

export default App;
