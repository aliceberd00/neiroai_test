import React, { useState, useEffect } from 'react';
import { CssBaseline, Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { getAllBots } from "../../asyncActions/getAllBots";
import { IOneBot } from "../../types/types";
import DialogCard from "../../Components/Card/DialogCard/DialogCard";

export default function ChatsPage() {
    const dispatch = useAppDispatch();
    const [allBotsArray, setAllBotsArray] = useState<IOneBot[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allBots = await getAllBots();
                setAllBotsArray(allBots);
            } catch (error) {
                console.error('Failed to fetch bots or user:', error);
            }
        };

        fetchData();
    }, [dispatch]);

    return (
        <>
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minHeight: '100vh',
                    textAlign: 'center',
                    marginTop: 5,
                    gap: 2,
                }}
            >
                {allBotsArray.length > 0 ? (
                    allBotsArray.map((oneBot) => (
                        <NavLink key={oneBot.id} to={`/dialog/${oneBot.id}`} style={{ textDecoration: 'none' }}>
                            <DialogCard
                                bot_name={oneBot.bot_name}
                                id={oneBot.id}
                                bot_model_name={oneBot.bot_model_name}
                                bot_type={oneBot.bot_type}
                                api_key={oneBot.api_key}
                                api_img_url={oneBot.api_img_url}
                                last_message_time={oneBot.last_message_time}
                                last_message={oneBot.last_message}

                            />
                        </NavLink>
                    ))
                ) : (
                    <p>No bots available</p>
                )}
            </Box>
        </>
    );
}

