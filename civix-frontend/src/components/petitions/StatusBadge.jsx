import React from 'react';

const StatusBadge = ({ status }) => {
    const getStatusStyles = (status) => {
        switch (status) {
            case 'active':
                return { backgroundColor: '#c6f6d5', color: '#22543d', border: '1px solid #9ae6b4' };
            case 'under_review':
                return { backgroundColor: '#feebc8', color: '#744210', border: '1px solid #fbd38d' };
            case 'closed':
                return { backgroundColor: '#fed7d7', color: '#822727', border: '1px solid #feb2b2' };
            default:
                return { backgroundColor: '#edf2f7', color: '#2d3748', border: '1px solid #e2e8f0' };
        }
    };

    const styles = getStatusStyles(status);

    return (
        <span
            style={{
                padding: '4px 10px',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                display: 'inline-block',
                ...styles
            }}
        >
            {status.replace('_', ' ')}
        </span>
    );
};

export default StatusBadge;
