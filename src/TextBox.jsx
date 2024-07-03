function TextBox({onAnswerSubmitted, handleNextClicked, hideSubmit}) {

    const submitForm = 
            <form method="post" onSubmit={onAnswerSubmitted}>
                <label>
                    Answer: <input autoFocus name="answerInput" defaultValue=""/>
                </label>
                <button type="submit">Submit</button>
            </form>
    
    const nextForm =
            <form method="post" onSubmit={handleNextClicked}>
                <button autoFocus type="submit">Next</button>
            </form>

    return(
        hideSubmit ? nextForm : submitForm
    );
}

export default TextBox