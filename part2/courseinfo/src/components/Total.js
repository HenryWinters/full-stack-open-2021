import React from 'react'

const Total = ({ parts }) => {
    let sum = parts.reduce((partialSum, partObj) => partialSum + partObj.exercises, 0);

    return (
    <p>Total of {sum} exercises</p>
    )
}

export default Total 
