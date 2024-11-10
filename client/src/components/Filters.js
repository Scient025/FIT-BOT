import React from 'react';

function Filters({ setFilters }) {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="filters">
            <select name="bodyPart" onChange={handleInputChange}>
                <option value="">All Body Parts</option>
                <option value="legs">Legs</option>
                <option value="arms">Arms</option>
                <option value="back">Back</option>
            </select>
            <select name="skillLevel" onChange={handleInputChange}>
                <option value="">All Skill Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
            </select>
            <select name="equipment" onChange={handleInputChange}>
                <option value="">All Equipment</option>
                <option value="dumbbells">Dumbbells</option>
                <option value="no equipment">No Equipment</option>
            </select>
            <select name="workoutType" onChange={handleInputChange}>
                <option value="">All Types</option>
                <option value="strength">Strength</option>
                <option value="cardio">Cardio</option>
            </select>
        </div>
    );
}

export default Filters;
