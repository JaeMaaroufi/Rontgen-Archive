import React from "react";

const ImageResults = ({ results }) => {
  if (!results || results.length === 0) {
    return <p className="text-center mt-4">No results found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {results.map((result, index) => (
        <div key={index} className="border p-4 rounded shadow">
          <img
            src={`http://localhost:8000${result.image_url}`}
            alt="Scan"
            className="w-full h-auto"
          />
          <div className="mt-2">
            <p><strong>Patient ID:</strong> {result.metadata.PatientID}</p>
            <p><strong>Modality:</strong> {result.metadata.Modality}</p>
            <p><strong>Body Part Examined:</strong> {result.metadata.BodyPartExamined}</p>
            <p><strong>Series Date:</strong> {result.metadata.SeriesDate}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageResults;