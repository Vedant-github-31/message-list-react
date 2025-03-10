const { useState, useEffect, useCallback } = React;

const App = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch messages.");
                }
                return response.json();
            })
            .then((data) => {
                const formattedMessages = data.map((item) => ({ text: item.title, id: item.id }));
                setMessages(formattedMessages.reverse());
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        const messageInput = event.target.elements.message;
        const messageText = messageInput.value.trim();
        if (!messageText) return;
        const newMessage = { id: Date.now(), text: messageText };
        setMessages((prevMessages) => [newMessage, ...prevMessages]);
        messageInput.value = "";
    }, []);

    const handleDelete = (id) => {
        setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
    };

    return (
        <div>
            <h2>Messages</h2>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
                {messages.map((msg) => (
                    <li key={msg.id}>{msg.text} <button onClick={() => handleDelete(msg.id)}>Delete</button></li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input type="text" name="message" placeholder="Type a message..." />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
