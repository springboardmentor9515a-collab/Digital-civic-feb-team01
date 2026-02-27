import React from 'react';

const FilterBar = ({ filters, onFilterChange }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onFilterChange({ ...filters, [name]: value });
    };

    const categories = ['Infrastructure', 'Environment', 'Public Safety', 'Education', 'Healthcare', 'Others'];
    const statuses = [
        { label: 'All Statuses', value: '' },
        { label: 'Active', value: 'active' },
        { label: 'Under Review', value: 'under_review' },
        { label: 'Closed', value: 'closed' }
    ];

    return (
        <div style={{ display: 'flex', gap: '15px', marginBottom: '25px', padding: '15px', background: '#f7fafc', borderRadius: '8px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '150px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#4a5568', marginBottom: '5px' }}>Location</label>
                <input
                    type="text"
                    name="location"
                    value={filters.location}
                    onChange={handleChange}
                    placeholder="Filter by location..."
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.875rem' }}
                />
            </div>

            <div style={{ flex: 1, minWidth: '150px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#4a5568', marginBottom: '5px' }}>Category</label>
                <select
                    name="category"
                    value={filters.category}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.875rem' }}
                >
                    <option value="">All Categories</option>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
            </div>

            <div style={{ flex: 1, minWidth: '150px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#4a5568', marginBottom: '5px' }}>Status</label>
                <select
                    name="status"
                    value={filters.status}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.875rem' }}
                >
                    {statuses.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
            </div>
        </div>
    );
};

export default FilterBar;
