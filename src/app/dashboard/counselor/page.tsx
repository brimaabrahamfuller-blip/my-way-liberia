import React from 'react';
import { BentoGrid } from 'some-bento-grid-library'; // Make sure to import the Bento Grid component
import { Card } from 'some-card-library'; // Import card component

const CounselorDashboard = () => {
  const features = [
    { title: 'Feature 1', description: 'Description of Feature 1' },
    { title: 'Feature 2', description: 'Description of Feature 2' },
    { title: 'Feature 3', description: 'Description of Feature 3' },
    // Add more features as needed
  ];

  return (
    <div className="counselor-dashboard">
      <BentoGrid>
        {features.map((feature, index) => (
          <Card key={index} className="border-slate-200">
            <h2 className="text-primary">{feature.title}</h2>
            <p className="text-secondary">{feature.description}</p>
          </Card>
        ))}
      </BentoGrid>
    </div>
  );
};

export default CounselorDashboard;