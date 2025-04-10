import React, { useState } from 'react';

const InteractiveBuildingMap = () => {
  const [activeFloor, setActiveFloor] = useState('1');
  const [activeSpace, setActiveSpace] = useState(null);
  
  // Brand data
  const brandData = {
    "1-A": { name: "Brand A", logo: "/api/placeholder/100/50", area: "95.70 m²" },
    "1-B": { name: "Brand B", logo: "/api/placeholder/100/50", area: "67.50 m²" },
    "1-C": { name: "Brand C", logo: "/api/placeholder/100/50", area: "170.50 m²" },
    "1-D": { name: "Brand D", logo: "/api/placeholder/100/50", area: "75.00 m²" },
    "1-E": { name: "Brand E", logo: "/api/placeholder/100/50", area: "71.25 m²" },
    "1-F": { name: "Brand F", logo: "/api/placeholder/100/50", area: "35.50 m²" },
    "2-A": { name: "Brand G", logo: "/api/placeholder/100/50", area: "108.50 m²" },
    "2-B": { name: "Available", logo: "/api/placeholder/100/50", area: "Available" },
    "2-C": { name: "Brand H", logo: "/api/placeholder/100/50", area: "226.45 m²" },
    "2-D": { name: "Brand I", logo: "/api/placeholder/100/50", area: "53.25 m²" },
    "2-E": { name: "Brand J", logo: "/api/placeholder/100/50", area: "41.70 m²" },
    "2-F": { name: "Brand K", logo: "/api/placeholder/100/50", area: "75.45 m²" },
    "PB": { name: "Plaza Trevi", logo: "/api/placeholder/100/50", area: "Commercial & Parking" },
    "Azotea": { name: "Roof Garden", logo: "/api/placeholder/100/50", area: "552.00 m²" }
  };

  // Handle space click with more explicit function
  const handleSpaceClick = (id) => {
    console.log("Space clicked:", id); // Debug log
    setActiveSpace(id);
  };

  // Handle close popup
  const handleClosePopup = () => {
    console.log("Closing popup"); // Debug log
    setActiveSpace(null);
  };
  
  // Floor selection buttons
  const FloorSelector = () => (
    <div className="flex justify-center mb-6 space-x-4">
      <button 
        className={`px-4 py-2 rounded-lg font-medium ${activeFloor === 'PB' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
        onClick={() => setActiveFloor('PB')}
      >
        Basement
      </button>
      <button 
        className={`px-4 py-2 rounded-lg font-medium ${activeFloor === '1' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
        onClick={() => setActiveFloor('1')}
      >
        Floor 1
      </button>
      <button 
        className={`px-4 py-2 rounded-lg font-medium ${activeFloor === '2' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
        onClick={() => setActiveFloor('2')}
      >
        Floor 2
      </button>
      <button 
        className={`px-4 py-2 rounded-lg font-medium ${activeFloor === 'Azotea' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
        onClick={() => setActiveFloor('Azotea')}
      >
        Rooftop
      </button>
    </div>
  );
  
  // Simplified popup component
  const BrandPopup = () => {
    if (!activeSpace) return null;
    
    const brand = brandData[activeSpace];
    if (!brand) return null;
    
    // Simple popup style with inline styles to avoid Tailwind conflicts
    return (
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50
        }}
        onClick={handleClosePopup}
      >
        <div 
          style={{
            background: 'white',
            padding: '24px',
            borderRadius: '8px',
            maxWidth: '400px',
            width: '100%',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>{brand.name}</h3>
            <button 
              style={{ color: '#666', fontSize: '24px' }} 
              onClick={handleClosePopup}
            >×</button>
          </div>
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <img 
              src="https://via.placeholder.com/100x50" 
              alt={`${brand.name} logo`} 
              style={{ height: '50px', margin: '0 auto' }}
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#666' }}>Local {activeSpace}</p>
            <p style={{ color: '#666', marginTop: '4px' }}>Area: {brand.area}</p>
            <p style={{ color: '#666', marginTop: '8px' }}>
              {activeSpace.startsWith('1-') ? 'First Floor' : 
               activeSpace.startsWith('2-') ? 'Second Floor' : 
               activeSpace === 'Azotea' ? 'Rooftop' : 'Basement'}
            </p>
          </div>
          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #eee' }}>
            <button 
              style={{
                width: '100%',
                background: '#3b82f6',
                color: 'white',
                fontWeight: 'bold',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
              onClick={handleClosePopup}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Floor 2 Map with explicit onClick handlers
  const Floor2 = () => (
    <svg viewBox="0 0 800 500" className="w-full border-2 border-gray-300">
      {/* Background */}
      <rect x="0" y="0" width="800" height="500" fill="#f9fafb" />
      
      {/* Building outline with curved corner */}
      <path d="M150,100 L650,100 L650,400 L150,400 L150,150 Q175,100 225,100 Z" 
        fill="#ffffff" stroke="#000000" strokeWidth="2" />
      
      {/* Space A */}
      <path 
        d="M175,150 L300,150 L300,250 L175,250 L175,175 Q185,150 200,150 Z" 
        fill={activeSpace === '2-A' ? '#bfdbfe' : '#dbeafe'} 
        stroke="#3b82f6" 
        strokeWidth="2" 
        onClick={() => handleSpaceClick('2-A')}
        style={{ cursor: 'pointer' }}
      />
      <text x="240" y="200" textAnchor="middle" fill="#1e40af" fontWeight="bold" fontSize="24">A</text>
      
      {/* Space B */}
      <rect 
        x="320" y="150" width="120" height="100" 
        fill={activeSpace === '2-B' ? '#e5e7eb' : '#f3f4f6'} 
        stroke="#9ca3af" 
        strokeWidth="2" 
        onClick={() => handleSpaceClick('2-B')}
        style={{ cursor: 'pointer' }}
      />
      <text x="380" y="200" textAnchor="middle" fill="#4b5563" fontWeight="bold" fontSize="24">B</text>
      
      {/* Space C */}
      <rect 
        x="460" y="150" width="170" height="100" 
        fill={activeSpace === '2-C' ? '#fed7aa' : '#ffedd5'} 
        stroke="#f97316" 
        strokeWidth="2" 
        onClick={() => handleSpaceClick('2-C')}
        style={{ cursor: 'pointer' }}
      />
      <text x="545" y="200" textAnchor="middle" fill="#9a3412" fontWeight="bold" fontSize="24">C</text>
      
      {/* Space D */}
      <path 
        d="M175,270 L300,270 L300,380 L175,380 L175,295 Q185,270 200,270 Z" 
        fill={activeSpace === '2-D' ? '#e9d5ff' : '#f3e8ff'} 
        stroke="#a855f7" 
        strokeWidth="2" 
        onClick={() => handleSpaceClick('2-D')}
        style={{ cursor: 'pointer' }}
      />
      <text x="240" y="325" textAnchor="middle" fill="#7e22ce" fontWeight="bold" fontSize="24">D</text>
      
      {/* Space E */}
      <rect 
        x="320" y="270" width="120" height="110" 
        fill={activeSpace === '2-E' ? '#fecaca' : '#fee2e2'} 
        stroke="#ef4444" 
        strokeWidth="2" 
        onClick={() => handleSpaceClick('2-E')}
        style={{ cursor: 'pointer' }}
      />
      <text x="380" y="325" textAnchor="middle" fill="#b91c1c" fontWeight="bold" fontSize="24">E</text>
      
      {/* Space F */}
      <rect 
        x="460" y="270" width="170" height="110" 
        fill={activeSpace === '2-F' ? '#99f6e4' : '#ccfbf1'} 
        stroke="#14b8a6" 
        strokeWidth="2" 
        onClick={() => handleSpaceClick('2-F')}
        style={{ cursor: 'pointer' }}
      />
      <text x="545" y="325" textAnchor="middle" fill="#0f766e" fontWeight="bold" fontSize="24">F</text>
      
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
      
      {/* Title */}
      <text x="400" y="50" textAnchor="middle" fontWeight="bold" fontSize="24">PISO 2-D</text>
    </svg>
  );

  // Implement similar changes for other floor components (Floor1, Basement, Rooftop)
  // Including explicit onClick handlers

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto', backgroundColor: 'white' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', textAlign: 'center', marginBottom: '8px' }}>Plaza Trevi Interactive Map</h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '32px' }}>Click on any commercial space to see tenant information</p>
      
      <FloorSelector />
      
      <div style={{ marginBottom: '32px' }}>
        {activeFloor === '2' && <Floor2 />}
        {/* Add other floor components here */}
      </div>
      
      <BrandPopup />
    </div>
  );
};

export default InteractiveBuildingMap;