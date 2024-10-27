import React, { useState } from 'react';

// Interface for the vehicle data structure
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

// Props interface for the EVTable component
interface EVTableProps {
  data: VehicleData[];
  itemsPerPage?: number;
}

// Type definitions for styles
interface StyleTypes {
  container: React.CSSProperties;
  table: React.CSSProperties;
  headerCell: React.CSSProperties;
  cell: React.CSSProperties;
  pagination: React.CSSProperties;
  pageInfo: React.CSSProperties;
}

// Interface for button style function
interface ButtonStyleProps {
  disabled: boolean;
}

const EVTable: React.FC<EVTableProps> = ({ data, itemsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber: number): void => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getVisibleData = (): VehicleData[] => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  if (data.length === 0) {
    return (
      <div style={{
        padding: '2rem',
        textAlign: 'center',
        color: '#666',
        backgroundColor: '#f9fafb',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        No data available.
      </div>
    );
  }

  const visibleData = getVisibleData();

  const styles: StyleTypes = {
    container: {
      padding: '1.5rem',
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
      margin: '1rem 0',
      overflow: 'auto'
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: '0',
      fontSize: '0.875rem'
    },
    headerCell: {
      backgroundColor: '#f8fafc',
      color: '#334155',
      fontWeight: '600',
      padding: '0.75rem 1rem',
      textAlign: 'left',
      borderBottom: '2px solid #e2e8f0',
      position: 'sticky',
      top: 0,
      whiteSpace: 'nowrap'
    },
    cell: {
      padding: '0.75rem 1rem',
      borderBottom: '1px solid #e2e8f0',
      color: '#475569'
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1rem 0',
      gap: '1rem'
    },
    pageInfo: {
      color: '#64748b',
      fontSize: '0.875rem',
      fontWeight: '500'
    }
  };

  const getRowStyle = (index: number, isHovered: boolean): React.CSSProperties => ({
    backgroundColor: isHovered ? '#f1f5f9' : index % 2 === 0 ? '#ffffff' : '#f8fafc',
    transition: 'background-color 0.2s ease'
  });

  const buttonStyle = ({ disabled }: ButtonStyleProps): React.CSSProperties => ({
    padding: '0.5rem 1rem',
    backgroundColor: disabled ? '#e2e8f0' : '#3b82f6',
    color: disabled ? '#94a3b8' : 'white',
    border: 'none',
    borderRadius: '0.375rem',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontWeight: '500',
    transition: 'all 0.2s ease'
  });

  return (
    <div style={styles.container}>
      <div style={{ overflowX: 'auto' }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.headerCell}>VIN</th>
              <th style={styles.headerCell}>County</th>
              <th style={styles.headerCell}>City</th>
              <th style={styles.headerCell}>State</th>
              <th style={styles.headerCell}>Postal Code</th>
              <th style={styles.headerCell}>Model Year</th>
              <th style={styles.headerCell}>Make</th>
              <th style={styles.headerCell}>Model</th>
              <th style={styles.headerCell}>EV Type</th>
              <th style={styles.headerCell}>CAFV</th>
              <th style={styles.headerCell}>Range</th>
              <th style={styles.headerCell}>MSRP</th>
              <th style={styles.headerCell}>District</th>
              <th style={styles.headerCell}>Vehicle ID</th>
              <th style={styles.headerCell}>Location</th>
              <th style={styles.headerCell}>Utility</th>
              <th style={styles.headerCell}>Census</th>
            </tr>
          </thead>
          <tbody>
            {visibleData.map((vehicle: VehicleData, index: number) => (
              <tr
                key={index}
                style={getRowStyle(index, hoveredRow === index)}
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td style={styles.cell}>{vehicle.VIN}</td>
                <td style={styles.cell}>{vehicle.County}</td>
                <td style={styles.cell}>{vehicle.City}</td>
                <td style={styles.cell}>{vehicle.State}</td>
                <td style={styles.cell}>{vehicle.PostalCode}</td>
                <td style={styles.cell}>{vehicle.ModelYear}</td>
                <td style={styles.cell}>{vehicle.Make}</td>
                <td style={styles.cell}>{vehicle.Model}</td>
                <td style={styles.cell}>{vehicle.ElectricVehicleType}</td>
                <td style={styles.cell}>{vehicle.CAFVEligibility}</td>
                <td style={styles.cell}>{vehicle.ElectricRange}</td>
                <td style={styles.cell}>{vehicle.BaseMSRP}</td>
                <td style={styles.cell}>{vehicle.LegislativeDistrict}</td>
                <td style={styles.cell}>{vehicle.DOLVehicleID}</td>
                <td style={styles.cell}>{vehicle.VehicleLocation}</td>
                <td style={styles.cell}>{vehicle.ElectricUtility}</td>
                <td style={styles.cell}>{vehicle.CensusTract}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={styles.pagination}>
        <button
          style={buttonStyle({ disabled: currentPage === 1 })}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span style={styles.pageInfo}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          style={buttonStyle({ disabled: currentPage === totalPages })}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EVTable;