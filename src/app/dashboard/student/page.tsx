// StudentDashboard.tsx

import React from 'react';
import { Card } from 'components/Card'; // Assume Card is a reusable component

const StudentDashboard = () => {
    const features = [
        { title: 'Feature 1', description: 'Description for Feature 1' },
        { title: 'Feature 2', description: 'Description for Feature 2' },
        { title: 'Feature 3', description: 'Description for Feature 3' },
        { title: 'Feature 4', description: 'Description for Feature 4' },
    ];

    return (
        <div className="bento-grid border-slate-200">
            {features.map((feature, index) => (
                <Card key={index} title={feature.title} description={feature.description} />
            ))}
        </div>
    );
};

export default StudentDashboard;