import './chatbot.css';

function UserMsg({ q }) {
    return (
        <div className="user-msg-ct">
            <p>{q}</p>
        </div>
    )
}

export default UserMsg;