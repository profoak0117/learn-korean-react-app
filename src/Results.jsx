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
            <h1>{jsonData.character}</h1>
            <p>Name: {jsonData.name}</p>
            <p>Pronounciation: {jsonData.pronunciation}</p>
            <p>Romanization: {jsonData.romanization[0]} {jsonData.romanization[1]}</p>
            <p>Type: {jsonData.type}</p>
            </div>
        }
        </div>
        <label>
            The correct word is: {jsonData.char_id}
        </label>
        </>

    return(hasSubmitted ? result : null);
}

export default Results