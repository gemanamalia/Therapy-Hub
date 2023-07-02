import { useEffect, useState } from "react";
import { Feedback } from "../../app/models/feedback";
import agent from "../../app/api/agent";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

export default function FeedbackInnventory() {
    const [loading, setLoading] = useState(true); 
    const [feedback, setFeedback] = useState<Feedback[]>([]);
    const [target, setTarget] = useState(0);


    useEffect(() => {
        agent.Feedback.getAllFeedback()
            .then(f =>  setFeedback(f))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [])

    function handleDeleteFeedback(id: number) {
        setLoading(true);
        setTarget(id);

       agent.Admin.deleteFeedback(id)
        .then(() => {
            setFeedback(prevFeedback => prevFeedback.filter(f => f.id !== id));
        })
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    }

    return (
        <>
            <Box display='flex' justifyContent='space-between'>
                <Typography sx={{ p: 2 }} variant='h4'>Gestionare feedback</Typography>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="center">Feedback</TableCell>
                            <TableCell align="center">Șterge</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {feedback.map((f) => (
                            <TableRow key={f.id}>
                                <TableCell component="th" scope="row"> {f.id}</TableCell>
                                <TableCell align="center">{f.text}</TableCell>
                                <TableCell align="center">
                                    <LoadingButton
                                        loading = {loading && target === f.id}
                                        startIcon={<Delete />} color='error'
                                        onClick={() => handleDeleteFeedback(f.id)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
          
        </>
    )
}