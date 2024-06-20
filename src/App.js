import React, { useState } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import { BrowserRouter, Routes, Route } from "react-router-dom";


const App = () => {
  const pageSize = 9;
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <LoadingBar
          height={3}
          color='#f11946'
          progress={progress}
        />
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} key="general" pageSize={pageSize} category="General" />} />
          <Route exact path="/Business" element={<News setProgress={setProgress} key="Business" pageSize={pageSize} category="Business" />} />
          <Route exact path="/Entertainment" element={<News setProgress={setProgress} key="Entertainment" pageSize={pageSize} category="Entertainment" />} />
          <Route exact path="/General" element={<News setProgress={setProgress} key="General" pageSize={pageSize} category="General" />} />
          <Route exact path="/Health" element={<News setProgress={setProgress} key="Health" pageSize={pageSize} category="Health" />} />
          <Route exact path="/Science" element={<News setProgress={setProgress} key="Science" pageSize={pageSize} category="Science" />} />
          <Route exact path="/Sports" element={<News setProgress={setProgress} key="Sports" pageSize={pageSize} category="Sports" />} />
          <Route exact path="/Technology" element={<News setProgress={setProgress} key="Technology" pageSize={pageSize} category="Technology" />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
