import React, { useState } from 'react';

const InteractiveBuildingMap = () => {
  const [activeFloor, setActiveFloor] = useState('PB');
  const [activeSpace, setActiveSpace] = useState(null);
  
  // Brand data
  const brandData = {
    "1-A": { name: "Brand A", logo: "https://via.placeholder.com/100x50", area: "95.70 m²" },
    "1-B": { name: "Brand B", logo: "https://via.placeholder.com/100x50", area: "67.50 m²" },
    "1-C": { name: "Brand C", logo: "https://via.placeholder.com/100x50", area: "170.50 m²" },
    "1-D": { name: "Brand D", logo: "https://via.placeholder.com/100x50", area: "75.00 m²" },
    "1-E": { name: "Brand E", logo: "https://via.placeholder.com/100x50", area: "71.25 m²" },
    "1-F": { name: "Brand F", logo: "https://via.placeholder.com/100x50", area: "35.50 m²" },
    "2-A": { name: "Brand G", logo: "https://via.placeholder.com/100x50", area: "108.50 m²" },
    "2-B": { name: "Available", logo: "https://via.placeholder.com/100x50", area: "Available" },
    "2-C": { name: "Brand H", logo: "https://via.placeholder.com/100x50", area: "226.45 m²" },
    "2-D": { name: "Brand I", logo: "https://via.placeholder.com/100x50", area: "53.25 m²" },
    "2-E": { name: "Brand J", logo: "https://via.placeholder.com/100x50", area: "41.70 m²" },
    "2-F": { name: "Brand K", logo: "https://via.placeholder.com/100x50", area: "75.45 m²" },
    "PB": { name: "Plaza Trevi", logo: "https://via.placeholder.com/100x50", area: "Commercial & Parking" },
    "Azotea": { name: "Roof Garden", logo: "https://via.placeholder.com/100x50", area: "552.00 m²" }
  };

  // Styles for buttons
  const buttonStyle = (isActive) => ({
    padding: '8px 16px',
    borderRadius: '4px',
    fontWeight: '500',
    border: 'none',
    backgroundColor: isActive ? '#3b82f6' : '#e5e7eb',
    color: isActive ? 'white' : 'black',
    cursor: 'pointer',
    margin: '0 4px'
  });

  // Container styles
  const containerStyle = {
    padding: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: 'white'
  };

  // Heading styles
  const headingStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '8px'
  };

  // Subheading styles
  const subheadingStyle = {
    textAlign: 'center',
    color: '#666',
    marginBottom: '32px'
  };

  // SVG container styles
  const svgContainerStyle = {
    marginBottom: '32px',
    border: '2px solid #e5e7eb',
    borderRadius: '4px'
  };

  // Handle space click
  const handleSpaceClick = (id) => {
    console.log("Space clicked:", id); // Debug log
    setActiveSpace(id);
  };

  // Floor selection buttons
  const FloorSelector = () => (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
      <button 
        style={buttonStyle(activeFloor === 'PB')} 
        onClick={() => setActiveFloor('PB')}
      >
        Planta Baja
      </button>
      <button 
        style={buttonStyle(activeFloor === '1')} 
        onClick={() => setActiveFloor('1')}
      >
        Piso 1
      </button>
      <button 
        style={buttonStyle(activeFloor === '2')} 
        onClick={() => setActiveFloor('2')}
      >
        Piso 2
      </button>
      <button 
        style={buttonStyle(activeFloor === 'Azotea')} 
        onClick={() => setActiveFloor('Azotea')}
      >
        Rooftop
      </button>
    </div>
  );
  
  // Popup component with inline styles
  const BrandPopup = () => {
    if (!activeSpace) return null;
    
    const brand = brandData[activeSpace];
    if (!brand) return null;
    
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }} onClick={() => setActiveSpace(null)}>
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '8px',
          maxWidth: '400px',
          width: '100%',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }} onClick={e => e.stopPropagation()}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>{brand.name}</h3>
            <button style={{ 
              background: 'none', 
              border: 'none', 
              fontSize: '24px', 
              cursor: 'pointer',
              color: '#666'
            }} onClick={() => setActiveSpace(null)}>×</button>
          </div>
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <img src={brand.logo} alt={`${brand.name} logo`} style={{ height: '50px', margin: '0 auto' }} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#666', margin: '4px 0' }}>Local {activeSpace}</p>
            <p style={{ color: '#666', margin: '4px 0' }}>Area: {brand.area}</p>
            <p style={{ color: '#666', margin: '8px 0 0 0' }}>
              {activeSpace.startsWith('1-') ? 'First Floor' : 
              activeSpace.startsWith('2-') ? 'Second Floor' : 
              activeSpace === 'Azotea' ? 'Rooftop' : 'Basement'}
            </p>
          </div>
          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #eee' }}>
            <button style={{
              width: '100%',
              backgroundColor: '#3b82f6',
              color: 'white',
              fontWeight: 'bold',
              padding: '8px 16px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer'
            }} onClick={() => setActiveSpace(null)}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Floor 1 Map
  const Floor1 = () => (
    <svg viewBox="0 0 800 500" style={{ width: '100%' }}>
      {/* Background */}
      <rect x="0" y="0" width="800" height="500" fill="#f9fafb" />
      
      {/* Building outline with curved corner */}
      <path d="M150,100 L650,100 L650,400 L150,400 L150,150 Q175,100 225,100 Z" 
        fill="#ffffff" stroke="#000000" strokeWidth="2" />
      
      {/* Space A with curved edge */}
      <g onClick={() => handleSpaceClick('1-A')} style={{ cursor: 'pointer' }}>
        <path d="M175,150 L300,150 L300,250 L175,250 L175,175 Q185,150 200,150 Z" 
          fill={activeSpace === '1-A' ? '#bfdbfe' : '#dbeafe'} 
          stroke="#3b82f6" 
          strokeWidth="2" 
        />
        <text x="237" y="200" textAnchor="middle" fill="#1e40af" fontWeight="bold" fontSize="24">A</text>
      </g>
      
      {/* Space B */}
      <g onClick={() => handleSpaceClick('1-B')} style={{ cursor: 'pointer' }}>
        <rect 
          x="320" y="150" width="120" height="100" 
          fill={activeSpace === '1-B' ? '#bbf7d0' : '#dcfce7'} 
          stroke="#22c55e" 
          strokeWidth="2" 
        />
        <text x="380" y="200" textAnchor="middle" fill="#15803d" fontWeight="bold" fontSize="24">B</text>
      </g>
      
      {/* Space C */}
      <g onClick={() => handleSpaceClick('1-C')} style={{ cursor: 'pointer' }}>
        <rect 
          x="460" y="150" width="170" height="100" 
          fill={activeSpace === '1-C' ? '#fed7aa' : '#ffedd5'} 
          stroke="#f97316" 
          strokeWidth="2" 
        />
        <text x="545" y="200" textAnchor="middle" fill="#9a3412" fontWeight="bold" fontSize="24">C</text>
      </g>
      
      {/* Space D with curved edge */}
      <g onClick={() => handleSpaceClick('1-D')} style={{ cursor: 'pointer' }}>
        <path d="M175,270 L300,270 L300,380 L175,380 L175,295 Q185,270 200,270 Z" 
          fill={activeSpace === '1-D' ? '#e9d5ff' : '#f3e8ff'} 
          stroke="#a855f7" 
          strokeWidth="2" 
        />
        <text x="237" y="325" textAnchor="middle" fill="#7e22ce" fontWeight="bold" fontSize="24">D</text>
      </g>
      
      {/* Space E */}
      <g onClick={() => handleSpaceClick('1-E')} style={{ cursor: 'pointer' }}>
        <rect 
          x="320" y="270" width="120" height="110" 
          fill={activeSpace === '1-E' ? '#fecaca' : '#fee2e2'} 
          stroke="#ef4444" 
          strokeWidth="2" 
        />
        <text x="380" y="325" textAnchor="middle" fill="#b91c1c" fontWeight="bold" fontSize="24">E</text>
      </g>
      
      {/* Space F */}
      <g onClick={() => handleSpaceClick('1-F')} style={{ cursor: 'pointer' }}>
        <rect 
          x="460" y="270" width="170" height="110" 
          fill={activeSpace === '1-F' ? '#99f6e4' : '#ccfbf1'} 
          stroke="#14b8a6" 
          strokeWidth="2" 
        />
        <text x="545" y="325" textAnchor="middle" fill="#0f766e" fontWeight="bold" fontSize="24">F</text>
      </g>
      
      {/* Bathrooms and Stairs */}
      <rect x="650" y="150" width="30" height="230" fill="#e5e7eb" stroke="#6b7280" strokeWidth="1" />
      
      {/* Stairs */}
      <rect x="655" y="160" width="20" height="80" fill="#d1d5db" stroke="#6b7280" strokeWidth="1" />
      <line x1="655" y1="170" x2="675" y2="170" stroke="#6b7280" strokeWidth="1" />
      <line x1="655" y1="180" x2="675" y2="180" stroke="#6b7280" strokeWidth="1" />
      <line x1="655" y1="190" x2="675" y2="190" stroke="#6b7280" strokeWidth="1" />
      <line x1="655" y1="200" x2="675" y2="200" stroke="#6b7280" strokeWidth="1" />
      <line x1="655" y1="210" x2="675" y2="210" stroke="#6b7280" strokeWidth="1" />
      <line x1="655" y1="220" x2="675" y2="220" stroke="#6b7280" strokeWidth="1" />
      <line x1="655" y1="230" x2="675" y2="230" stroke="#6b7280" strokeWidth="1" />
      
      {/* Bathrooms */}
      <rect x="655" y="250" width="20" height="20" rx="2" fill="#d1d5db" stroke="#6b7280" strokeWidth="1" />
      <rect x="655" y="280" width="20" height="20" rx="2" fill="#d1d5db" stroke="#6b7280" strokeWidth="1" />
      <rect x="655" y="310" width="20" height="20" rx="2" fill="#d1d5db" stroke="#6b7280" strokeWidth="1" />
      <rect x="655" y="340" width="20" height="20" rx="2" fill="#d1d5db" stroke="#6b7280" strokeWidth="1" />
      
      {/* Title */}
      <text x="400" y="50" textAnchor="middle" fontWeight="bold" fontSize="24">PISO 1-E</text>
    </svg>
  );

  // Floor 2 Map
  const Floor2 = () => (
    <svg viewBox="0 0 800 500" style={{ width: '100%' }}>
      {/* Background */}
      <rect x="0" y="0" width="800" height="500" fill="#f9fafb" />
      
      {/* Building outline with curved corner */}
      <path d="M150,100 L650,100 L650,400 L150,400 L150,150 Q175,100 225,100 Z" 
        fill="#ffffff" stroke="#000000" strokeWidth="2" />
      
      {/* Space A with curved edge */}
      <g onClick={() => handleSpaceClick('2-A')} style={{ cursor: 'pointer' }}>
        <path d="M175,150 L300,150 L300,250 L175,250 L175,175 Q185,150 200,150 Z" 
          fill={activeSpace === '2-A' ? '#bfdbfe' : '#dbeafe'} 
          stroke="#3b82f6" 
          strokeWidth="2" 
        />
        <text x="237" y="200" textAnchor="middle" fill="#1e40af" fontWeight="bold" fontSize="24">A</text>
      </g>
      
      {/* Space B */}
      <g onClick={() => handleSpaceClick('2-B')} style={{ cursor: 'pointer' }}>
        <rect 
          x="320" y="150" width="120" height="100" 
          fill={activeSpace === '2-B' ? '#e5e7eb' : '#f3f4f6'} 
          stroke="#9ca3af" 
          strokeWidth="2" 
        />
        <text x="380" y="200" textAnchor="middle" fill="#4b5563" fontWeight="bold" fontSize="24">B</text>
      </g>
      
      {/* Space C */}
      <g onClick={() => handleSpaceClick('2-C')} style={{ cursor: 'pointer' }}>
        <rect 
          x="460" y="150" width="170" height="100" 
          fill={activeSpace === '2-C' ? '#fed7aa' : '#ffedd5'} 
          stroke="#f97316" 
          strokeWidth="2" 
        />
        <text x="545" y="200" textAnchor="middle" fill="#9a3412" fontWeight="bold" fontSize="24">C</text>
      </g>
      
      {/* Space D with curved edge */}
      <g onClick={() => handleSpaceClick('2-D')} style={{ cursor: 'pointer' }}>
        <path d="M175,270 L300,270 L300,380 L175,380 L175,295 Q185,270 200,270 Z" 
          fill={activeSpace === '2-D' ? '#e9d5ff' : '#f3e8ff'} 
          stroke="#a855f7" 
          strokeWidth="2" 
        />
        <text x="237" y="325" textAnchor="middle" fill="#7e22ce" fontWeight="bold" fontSize="24">D</text>
      </g>
      
      {/* Space E */}
      <g onClick={() => handleSpaceClick('2-E')} style={{ cursor: 'pointer' }}>
        <rect 
          x="320" y="270" width="120" height="110" 
          fill={activeSpace === '2-E' ? '#fecaca' : '#fee2e2'} 
          stroke="#ef4444" 
          strokeWidth="2" 
        />
        <text x="380" y="325" textAnchor="middle" fill="#b91c1c" fontWeight="bold" fontSize="24">E</text>
      </g>
      
      {/* Space F */}
      <g onClick={() => handleSpaceClick('2-F')} style={{ cursor: 'pointer' }}>
        <rect 
          x="460" y="270" width="170" height="110" 
          fill={activeSpace === '2-F' ? '#99f6e4' : '#ccfbf1'} 
          stroke="#14b8a6" 
          strokeWidth="2" 
        />
        <text x="545" y="325" textAnchor="middle" fill="#0f766e" fontWeight="bold" fontSize="24">F</text>
      </g>
      
      {/* Colindancia */}
      <path d="M650,100 L650,180 L680,180 L680,100 Z" 
        fill="#f3f4f6" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4,2" />
      <text x="665" y="140" textAnchor="middle" fontSize="10" transform="rotate(90, 665, 140)">Colindancia</text>
      
      {/* Bathrooms and Stairs */}
      <rect x="650" y="200" width="30" height="180" fill="#e5e7eb" stroke="#6b7280" strokeWidth="1" />
      
      {/* Stairs */}
      <rect x="655" y="210" width="20" height="60" fill="#d1d5db" stroke="#6b7280" strokeWidth="1" />
      <line x1="655" y1="220" x2="675" y2="220" stroke="#6b7280" strokeWidth="1" />
      <line x1="655" y1="230" x2="675" y2="230" stroke="#6b7280" strokeWidth="1" />
      <line x1="655" y1="240" x2="675" y2="240" stroke="#6b7280" strokeWidth="1" />
      <line x1="655" y1="250" x2="675" y2="250" stroke="#6b7280" strokeWidth="1" />
      <line x1="655" y1="260" x2="675" y2="260" stroke="#6b7280" strokeWidth="1" />
      
      {/* Bathrooms */}
      <rect x="655" y="280" width="20" height="20" rx="2" fill="#d1d5db" stroke="#6b7280" strokeWidth="1" />
      <rect x="655" y="310" width="20" height="20" rx="2" fill="#d1d5db" stroke="#6b7280" strokeWidth="1" />
      <rect x="655" y="340" width="20" height="20" rx="2" fill="#d1d5db" stroke="#6b7280" strokeWidth="1" />
      <rect x="655" y="370" width="20" height="20" rx="2" fill="#d1d5db" stroke="#6b7280" strokeWidth="1" />
      
      {/* Title */}
      <text x="400" y="50" textAnchor="middle" fontWeight="bold" fontSize="24">PISO 2-D</text>
    </svg>
  );

  // Basement Map
  const Basement = () => (
    <svg viewBox="0 0 800 500" style={{ width: '100%' }}>
      {/* Background */}
      <rect x="0" y="0" width="800" height="500" fill="#f9fafb" />
      
      {/* Building outline with curved corner */}
      <path d="M150,100 L650,100 L650,400 L150,400 L150,150 Q175,100 225,100 Z" 
        fill="#ffffff" stroke="#000000" strokeWidth="2" />
      
      {/* Commercial Area */}
      <g onClick={() => handleSpaceClick('PB')} style={{ cursor: 'pointer' }}>
        <path d="M175,150 L630,150 L630,250 L175,250 L175,175 Q185,150 200,150 Z" 
          fill={activeSpace === 'PB' ? '#e5e7eb' : '#f3f4f6'} 
          stroke="#6b7280" 
          strokeWidth="2" 
        />
        <text x="400" y="200" textAnchor="middle" fill="#4b5563" fontWeight="bold" fontSize="24">PB - Área Comercial</text>
      </g>
      
      {/* Parking Area */}
      <g onClick={() => handleSpaceClick('PB')} style={{ cursor: 'pointer' }}>
        <rect 
          x="175" y="270" width="455" height="110" 
          fill={activeSpace === 'PB' ? '#d1d5db' : '#e5e7eb'} 
          stroke="#6b7280" 
          strokeWidth="2" 
        />
        
        {/* Car icons simplified */}
        <rect x="200" y="300" width="30" height="15" rx="3" fill="#9ca3af" />
        <rect x="240" y="300" width="30" height="15" rx="3" fill="#9ca3af" />
        <rect x="280" y="300" width="30" height="15" rx="3" fill="#9ca3af" />
        <rect x="320" y="300" width="30" height="15" rx="3" fill="#9ca3af" />
        <rect x="360" y="300" width="30" height="15" rx="3" fill="#9ca3af" />
        <rect x="400" y="300" width="30" height="15" rx="3" fill="#9ca3af" />
        <rect x="440" y="300" width="30" height="15" rx="3" fill="#9ca3af" />
        <rect x="480" y="300" width="30" height="15" rx="3" fill="#9ca3af" />
        
        <text x="400" y="350" textAnchor="middle" fill="#4b5563" fontWeight="bold" fontSize="18">Estacionamiento</text>
      </g>
      
      {/* Stairs and pump room */}
      <rect x="650" y="150" width="30" height="230" fill="#e5e7eb" stroke="#6b7280" strokeWidth="1" />
      <text x="665" y="180" textAnchor="middle" fontSize="8" transform="rotate(90, 665, 180)">Escaleras</text>
      
      {/* Pump room */}
      <rect x="650" y="380" width="30" height="20" fill="#e5e7eb" stroke="#6b7280" strokeWidth="1" />
      <text x="665" y="393" textAnchor="middle" fontSize="6">Bombas</text>
      
      {/* Title */}
      <text x="400" y="50" textAnchor="middle" fontWeight="bold" fontSize="24">PLANTA BAJA</text>
    </svg>
  );

  // Rooftop Map
  const Rooftop = () => (
    <svg viewBox="0 0 800 500" style={{ width: '100%' }}>
      {/* Background */}
      <rect x="0" y="0" width="800" height="500" fill="#f9fafb" />
      
      {/* Building outline with curved corner */}
      <path d="M150,100 L650,100 L650,400 L150,400 L150,150 Q175,100 225,100 Z" 
        fill="#ffffff" stroke="#000000" strokeWidth="2" />
      
      {/* Roof Garden Area */}
      <g onClick={() => handleSpaceClick('Azotea')} style={{ cursor: 'pointer' }}>
        <path d="M175,150 L630,150 L630,380 L175,380 L175,175 Q185,150 200,150 Z" 
          fill={activeSpace === 'Azotea' ? '#bbf7d0' : '#dcfce7'} 
          stroke="#22c55e" 
          strokeWidth="2" 
        />
        
        {/* Plant icons simplified */}
        <circle cx="250" cy="200" r="10" fill="#14532d" />
        <circle cx="350" cy="180" r="12" fill="#14532d" />
        <circle cx="450" cy="210" r="15" fill="#14532d" />
        <circle cx="550" cy="190" r="8" fill="#14532d" />
        <circle cx="300" cy="250" r="10" fill="#14532d" />
        <circle cx="400" cy="230" r="12" fill="#14532d" />
        <circle cx="500" cy="260" r="15" fill="#14532d" />
        
        <text x="400" y="320" textAnchor="middle" fill="#166534" fontWeight="bold" fontSize="24">Roof Garden</text>
        <text x="400" y="350" textAnchor="middle" fill="#166534" fontSize="14">552.00 m²</text>
      </g>
      
      {/* Stairs area */}
      <rect x="650" y="150" width="30" height="230" fill="#e5e7eb" stroke="#6b7280" strokeWidth="1" />
      <text x="665" y="180" textAnchor="middle" fontSize="8" transform="rotate(90, 665, 180)">Escaleras</text>
      
      {/* Title */}
      <text x="400" y="50" textAnchor="middle" fontWeight="bold" fontSize="24">AZOTEA</text>
    </svg>
  );

  return (
    <div style={containerStyle}>
      
      <FloorSelector />
      
      <div style={svgContainerStyle}>
        {activeFloor === '1' && <Floor1 />}
        {activeFloor === '2' && <Floor2 />}
        {activeFloor === 'PB' && <Basement />}
        {activeFloor === 'Azotea' && <Rooftop />}
      </div>
      
      <BrandPopup />
    </div>
  );
};

export default InteractiveBuildingMap;