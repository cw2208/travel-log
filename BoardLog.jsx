import { ref, remove, get, set } from 'firebase/database';
import { db } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';

export function BoardLog({ logData, userId, bookTitle }) {
    const navigate = useNavigate();
    const handleDelete = (logId) => {
        const logRef = ref(db, `${userId}/${bookTitle}/${logId}`);
        remove(logRef)
            .then(() => {
                console.log(`Log ${logId} deleted successfully.`);
            })
            .catch((error) => {
                console.error("Error deleting log:", error);
            });
    };

    const handleMove = (logId) => {
        navigate('/move-to', { state: { userId, bookTitle, logId } });
    };

    console.log(logData)


    const logList = logData.map((log) => (
        <div key={log.id} id={log.id} className="board-log">
            <LogHeading
                dataObj={log}
                handleDelete={() => handleDelete(log.id)}
                handleMove={() => handleMove(log.id)}
            />
            <LogContent dataObj={log} />
        </div>
    ));


    return <div>{logList}</div>;
}

function LogHeading({ dataObj, handleDelete, handleMove }) {
    return (
        <div className="log-heading">
            <div className="top">
                <h2 className="title">{dataObj.title}</h2>
                <div className="top-right">
                    <button className="btn move-to" onClick={handleMove}>
                        Move To
                    </button>
                    <button className="btn delete" onClick={handleDelete}>
                        Remove from book
                    </button>
                </div>
            </div>
            <div className="time-rate">
                <p className="des-time">{dataObj.destination} - From {dataObj.start} to {dataObj.end}</p>
            </div>
        </div>
    );
}

function LogContent({ dataObj }) {
    return (
        <div className="content">
            <p className="brief">{dataObj.content}</p>
            {dataObj.images && (
                <img 
                    src={dataObj.images} 
                    alt={dataObj.title} 
                />
            )}
        </div>
    );
}
