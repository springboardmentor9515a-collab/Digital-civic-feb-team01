import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { MapPin, Tag, Users } from 'lucide-react';

const PetitionCard = ({ petition }) => {
    const navigate = useNavigate();

    return (
        <div
            className="card petition-card"
            onClick={() => navigate(`/petitions/${petition._id}`)}
            style={{ cursor: 'pointer', transition: 'transform 0.2s', padding: '20px', borderRadius: '12px', background: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', marginBottom: '20px' }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#2d3748' }}>{petition.title}</h3>
                <StatusBadge status={petition.status} />
            </div>

            <div style={{ display: 'flex', gap: '15px', color: '#718096', fontSize: '0.875rem', marginBottom: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Tag size={14} />
                    <span>{petition.category}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <MapPin size={14} />
                    <span>{petition.location}</span>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4a5568', fontWeight: '500' }}>
                    <Users size={18} />
                    <span>{petition.signatureCount || 0} signatures</span>
                </div>
                <span style={{ color: '#3182ce', fontSize: '0.875rem', fontWeight: '600' }}>View Details →</span>
            </div>
        </div>
    );
};

export default PetitionCard;
