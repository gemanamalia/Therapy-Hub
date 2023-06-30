import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { User } from "../../app/models/user";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import { Delete } from "@mui/icons-material";

export default function Accounts() {
    const [loading, setLoading] = useState(true); 
    const [users, setUsers] = useState<User[]>([]);
    const [target, setTarget] = useState(0);


    useEffect(() => {
        agent.Account.getAllUsers()
            .then(users =>  setUsers(users))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [])

    function handleDeleteUser(id: number) {
        setLoading(true);
        setTarget(id);

       agent.Admin.deleteUser(id)
        .then(() => {
            setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
        })
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    }

    return (
        <>
            <Box display='flex' justifyContent='space-between'>
                <Typography sx={{ p: 2 }} variant='h4'>Inventar conturi utilizatori</Typography>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="center">Utilizator</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Șterge</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell component="th" scope="row"> {user.id}</TableCell>
                                <TableCell align="center">{user.userName}</TableCell>
                                <TableCell align="center">{user.email}</TableCell>
                                <TableCell align="center">
                                    <LoadingButton
                                        loading = {loading && target === user.id}
                                        startIcon={<Delete />} color='error'
                                        onClick={() => handleDeleteUser(user.id)}
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