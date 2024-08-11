import React, { useState } from 'react';
import { TextField, IconButton, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface ChatFormProps {
    onSendMessage: (message: string) => void;
}

const TextType: React.FC<ChatFormProps> = ({ onSendMessage }) => {
    const [message, setMessage] = useState<string>('');

    const handleSendMessage = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };

    return (
        <Paper
            elevation={3}
            style={{
                padding: '10px',
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                borderTop: '1px solid',
                borderColor: 'divider',
                backgroundColor: '#fff'
            }}
        >
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSendMessage();
                    }
                }}
            />
            <IconButton
                color="primary"
                onClick={handleSendMessage}
                style={{ marginLeft: '10px' }}
            >
                <SendIcon />
            </IconButton>
        </Paper>
    );
};

export default TextType;

