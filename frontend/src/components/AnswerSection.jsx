function AnswerSection({ answer }) {
    if (!answer) return null;

    return (
        <div className="card">
            <h2>Answer</h2>

            <p>{answer}</p>
        </div>
    );
}

export default AnswerSection;