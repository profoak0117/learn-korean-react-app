function Results({jsonData, isCorrect, hasSubmitted}) {
    const correct = "Correct!";
    const wrong = "Wrong!";
    let correctString = isCorrect ? correct : wrong;

    const result = 
        <>
        <label>
            {correctString}
        </label>
        <div></div>
        <div>
        {
            <div key={jsonData.char_id}>
            <p>Name: {jsonData.name}</p>
            <p>Pronounciation: {jsonData.pronunciation}</p>
            <p>Romanization: {jsonData.romanization[0]} {jsonData.romanization[1]}</p>
            <p>Type: {jsonData.type}</p>
            </div>
        }
        </div>
        </>

    return(hasSubmitted ? result : null);
}

export default Results