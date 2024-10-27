// src/App.tsx
import React, { useEffect, useState } from 'react';
import { fetchCSVData } from './utils/fetchCSVData';
import { VehicleData } from './type';
import { Dashboard } from './components/Dashboard';

function App() {
  const [data, setData] = useState<VehicleData[]>([]);

  useEffect(() => {
    fetchCSVData().then((data: any) => setData(data as VehicleData[]));
  }, []);

  return (
    <div className="App">
      <h1>Electric Vehicle Dashboard</h1>
      <Dashboard data={data} />
    </div>
  );
}

export default App;
