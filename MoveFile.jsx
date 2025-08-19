import SAMPLE_MBOOKS from '../../data/memory-books.json'

// The following content was assisted by AI.

export function MoveFile () {

    const bookList = SAMPLE_MBOOKS.map((book) => (
        <button className={book.name}>{book.name}</button>
    ))

    return (
        <div className="modal">
            <div className="modal-content">
                {bookList}
            </div>
            <div className="modal-button">
                <button className="btn-cancel">Cancel</button>
                <button className="btn-cancel">Move</button>
            </div>
        </div>
    )
}