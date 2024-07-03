import './Results.css'

function Results({jsonData, isCorrect, hasSubmitted}) {
    const correct = "Correct!";
    const wrong = "Wrong!";
    let correctString = isCorrect ? correct : wrong;

    const result = 
        <>
        <label className={isCorrect ? 'correctStringLabel' : 'incorrectStringLabel'}>
            {correctString}
        </label>
        <div></div>
        <div>
        {
            <div key={jsonData.char_id}>
            <p>
                <label className='resultCategoryLabel'>Name: </label>
                <label className='resultInfoLabel'>{jsonData.name}</label><br/>
                <label className='resultCategoryLabel'>Pronounciation: </label>
                <label className='resultInfoLabel'>{jsonData.pronunciation}</label> <br/>
                <label className='resultCategoryLabel'>Romanization: </label>
                <label className='resultInfoLabel'>{jsonData.romanization[0]} {jsonData.romanization[1]}</label> <br/>
                <label className='resultCategoryLabel'>Type: </label>
                <label className='resultInfoLabel'>{jsonData.type}</label>
            </p>
            </div>
        }
        </div>
        </>

    return(hasSubmitted ? result : null);
}

export default Results