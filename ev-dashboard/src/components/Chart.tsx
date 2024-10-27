import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface VehicleData {
  VIN: string;
  County: string;
  City: string;
  State: string;
  PostalCode: string;
  ModelYear: number;
  Make: string;
  Model: string;
  ElectricVehicleType: string;
  CAFVEligibility: string;
  ElectricRange: number;
  BaseMSRP: number;
  LegislativeDistrict: string;
  DOLVehicleID: string;
  VehicleLocation: string;
  ElectricUtility: string;
  CensusTract: string;
}

interface DashboardProps {
  data: VehicleData[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const EVDashboard: React.FC<DashboardProps> = ({ data }) => {
  const chartData = useMemo(() => {
    // Process data for manufacturer average range
    const makeData = data.reduce((acc, vehicle) => {
      if (!acc[vehicle.Make]) {
        acc[vehicle.Make] = {
          count: 0,
          totalRange: 0,
        };
      }
      acc[vehicle.Make].count += 1;
      acc[vehicle.Make].totalRange += vehicle.ElectricRange || 0;
      return acc;
    }, {} as Record<string, { count: number; totalRange: number }>);

    console.log(makeData, "makeData");

    const adata = Object.keys(makeData).map((brand) => ({
      name: brand,
      count: makeData[brand].count,
    }));


    const rangeByMake = Object.entries(makeData)
      .map(([make, stats]) => ({
        name: make,
        value: stats.totalRange / stats.count
      }))
      .sort((a, b) => b.value - a.value)
    console.log(rangeByMake, 'rangebYMAKE')
    const typeData = data.reduce((acc, vehicle) => {
      if (!acc[vehicle.ElectricVehicleType]) {
        acc[vehicle.ElectricVehicleType] = 0;
      }
      acc[vehicle.ElectricVehicleType]++;
      return acc;
    }, {} as Record<string, number>);

    const vehicleTypes = Object.entries(typeData).map(([type, count]) => ({
      name: type,
      value: count
    }));
    console.log(rangeByMake)

    return {
      adata,
      vehicleTypes
    };
  }, [data]);

  if (!data.length) {
    return <div>No data available</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "20px",
          color: "#333",
        }}
      >
        EV Analytics Dashboard
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
          gap: "20px",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h2
            style={{
              fontSize: "18px",
              marginBottom: "15px",
              color: "#555",
            }}
          >
            Vehicle Count Per Make
          </h2>
          <div style={{ height: "400px" }}>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData.adata}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h2
            style={{
              fontSize: "18px",
              marginBottom: "15px",
              color: "#555",
            }}
          >
            Vehicle Type Distribution
          </h2>
          <div style={{ height: "500px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData.vehicleTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) =>
                    `${name.split(" ")[name.split(" ").length - 1]} (${(
                      percent * 100
                    ).toFixed(0)}%)`
                  }
                  outerRadius={140}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.vehicleTypes.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EVDashboard;
