import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface MessageCardProps {
    message: string;
    timestamp?: string;
    is_user_message: boolean;
}

const MessageCard: React.FC<MessageCardProps> = ({ message, timestamp, is_user_message }) => {
    return (
        <div
            style={{
                margin: '10px',
                display: 'flex',
                justifyContent: is_user_message ? 'flex-end' : 'flex-start',
            }}
        >
            <Card
                style={{
                    // maxWidth: '300px',
                    backgroundColor: is_user_message ? '#D9B3F8' : '#fff',
                }}
            >
                <CardContent
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        // minHeight: '100px', // Обеспечивает достаточную высоту для правильного позиционирования
                        position: 'relative',
                    }}
                >
                    <Typography variant="body1" style={{ marginBottom: 'auto' }}>
                        {message}
                    </Typography>
                    <Typography
                        style={{
                            fontSize: '12px',
                            color: 'textSecondary',
                            position: 'absolute',
                            bottom: '8px',
                            right: '8px',
                        }}
                    >
                        {timestamp || new Date().toLocaleTimeString()}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default MessageCard;
