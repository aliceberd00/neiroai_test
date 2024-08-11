import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {IOneBot} from "../../../types/types";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const DialogCard: React.FC<IOneBot> = ({bot_name, id, bot_model_name,
                                           bot_type, api_key, api_img_url, last_message_time,
                                            last_message
                                         }) => {
    return (
        <Card sx={{ minWidth: '80vw', maxWidth: '80vw'}}>
            <div style={{display:'flex'}}>
            <CardHeader
                avatar={
                    <Avatar src={api_img_url} > </Avatar>
                }
            />
            <div>
                <Typography variant='h6' style={{marginTop:'1em'}}>{bot_name}</Typography>
                <span style={{fontSize:'12px'}}>{last_message_time}</span>
            </div>
            </div>

            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {last_message}
                </Typography>
            </CardContent>
        </Card>
    );
}
export default DialogCard