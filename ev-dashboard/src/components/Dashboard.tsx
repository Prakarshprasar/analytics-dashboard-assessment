import React from 'react';
import { VehicleData } from '../type';
import EVTable from './EVTable';
import EVDashboard from './Chart';

interface DashboardProps {
  data: VehicleData[];
}

export const Dashboard: React.FC<DashboardProps> = ({ data }) => {

    console.log(data, 'data')
  return (
    <div className="dashboard">
      <EVDashboard data={data} />
      <EVTable data={data} />
    </div>
  );
};