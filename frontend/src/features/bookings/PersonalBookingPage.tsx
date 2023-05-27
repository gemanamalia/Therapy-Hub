import { useEffect, useState } from "react";
import "./Booking.css";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Appointment } from "../../app/models/appointment";
import { LoadingButton } from "@mui/lab";
import { Delete } from "@mui/icons-material";
import { Booking } from "../../app/models/booking";
import { Grid, Modal } from "@mui/material";
import { useAppSelector } from "../../app/store/configureStore";

export default function PersonalBookingPage() {
   const {user} = useAppSelector(state => state.account);
   const [userId, setUserId] =  useState();
   const [userRole, setUserRole] = useState();
   const [loading, setLoading] = useState(true);  
   const [appointments, setAppointments] = useState<Appointment[]>([]);
   const [bookings, setBookings] = useState<Booking[]>([]);
   const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);
   const [appointment, setAppointment] = useState<Appointment | null>(null);
   const [refresh, setRefresh] = useState(false); 

   
   useEffect(() => {
        agent.Account.getUserRole()
            .then((role) => setUserRole(role))
            .catch((error) => console.log(error))
    }, [refresh]);

    useEffect(() => {
        agent.Account.getUserId()
            .then((id) => setUserId(id))
            .catch((error) => console.log(error))
    }, [refresh]);

    useEffect(() => {
        if (userId) {
            agent.Appointment.getAppointmentsByUserId(userId)
                .then((appointments) => setAppointments(appointments))
                .catch((error) => console.log(error));

            agent.Booking.getBookingssByUserId(userId)
                .then((bookings) => setBookings(bookings))
                .catch((error) => console.log(error))
                .finally(() => setLoading(false));
        }
    }, [userId, refresh]);

    const handleCancelBooking = () => {
        // sterge programarea de la user din bookings
    };

      
    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setAppointment((prevAppointment: any) => ({
            ...prevAppointment,
            [name]: value,
          }));
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        console.log(appointment);
        setLoading(true);
        try {
            if(appointment?.day && appointment?.start && appointment?.end && userId && user?.email) {
                var result = await agent.Appointment.addAppointment(appointment.day, appointment.start, appointment.end, userId, user.userName);
                setRefresh((prevState) => !prevState); 
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
        handleClose();      
    };

    const handleDeleteAppointment =  (id: number, userName: string) => {
        setLoading(true);

        agent.Appointment.deleteUserAppointment(id, userName)
            .then(() => {alert('Ștergere realizată cu succes!')})
            .catch((error) => console.log(error))

        setRefresh((prevState) => !prevState);     
        setLoading(false);
    }
    
    if (loading) return <LoadingComponent message="Loading personal booking infos..." />
    
        
    return (
        <>                  
            <h1 className="booking-title"> Programările mele </h1>
            
            {userRole === 'doctor' && user?.userName && (
            
                <div className="booking">
                    {/* <p>User: {userRole}</p> */}
                    {/* <h1 className="booking-title"> Programările mele </h1> */}
                    <div className="personal-booking-body">
                        <button onClick={handleOpen} className="add-button">Adaugă loc liber</button>
                        <Modal 
                            open={open}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <form onSubmit={handleSubmit} className="modal-form-app">
                                <Grid item>
                                    <label className="modal-label-app">Ziua:</label>
                                    <input 
                                        id="day"
                                        name="day"
                                        value={appointment?.day || ""}
                                        onChange={handleChange}
                                        className="modal-input-app" />
                                </Grid>
                                <Grid item>
                                    <label className="modal-label-app">Oră start:</label>
                                    <input 
                                        id="start"
                                        name="start"
                                        value={appointment?.start || ""}
                                        onChange={handleChange} 
                                        className="modal-input-app" />
                                </Grid>
                                <Grid item>
                                    <label className="modal-label-app">Oră sfârșit:</label>
                                    <input 
                                        id="end"
                                        name="end"
                                        value={appointment?.end || ""}
                                        onChange={handleChange} 
                                        className="modal-input-app" />
                                </Grid>
                                <Grid container gap={12.5} className="button-grid-app">
                                    <Grid item style={{display: 'flex'}}>
                                        <button type='submit' className="save-button-app">
                                            Adaugă 
                                        </button>
                                    </Grid>
                                    <Grid item style={{display: 'flex'}}>
                                        <button className="close-button-app" onClick={handleClose}>
                                            Închide 
                                        </button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Modal>

                        <div className="personal-booking-free">
                            <p><b>Locuri libere:</b></p>
                            <table style={{ tableLayout: 'fixed', width: '100%' }}>
                                <colgroup>
                                    <col style={{ minWidth: '100px' }} />
                                    <col style={{ minWidth: '150px' }} />
                                    <col style={{ minWidth: '100px' }} />
                                </colgroup>

                                <thead>
                                    <tr>
                                    <th>Ziua</th>
                                    <th>Interval orar</th>
                                    <th>Eliminare</th>
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    {appointments.map((a) => (
                                    <tr key={a.id}>
                                        <td>{a.day}</td>
                                        <td>{a.start} - {a.end}</td>
                                        <td>
                                            {/* <button className="delete-button">Elimină</button> */}
                                            <LoadingButton onClick={() => handleDeleteAppointment(a.id, user?.userName)}>
                                                <Delete className="delete-button"/>
                                            </LoadingButton>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="personal-booking-busy">
                            <p><b>Locuri ocupate:</b></p>
                            <table style={{ tableLayout: 'fixed', width: '100%' }}>
                                <colgroup>
                                    <col style={{ minWidth: '100px' }} />
                                    <col style={{ minWidth: '150px' }} />
                                    <col style={{ minWidth: '100px' }} />
                                </colgroup>

                                <thead>
                                    <tr>
                                    <th>Ziua</th>
                                    <th>Interval orar</th>
                                    <th>Client</th>
                                    <th>Status</th>
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    {bookings.map((a) => (
                                    <tr key={a.id}>
                                        <td>{a.day}</td>
                                        <td>{a.start} - {a.end}</td>
                                        <td>{a.partnerName}</td>
                                        <td>Activă</td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                    </div> 
                </div>
            )}

            {userRole === 'member' && (
            
                <div className="booking">
                    {/* <p>User: {userRole}</p> */}
                    {/* <h1 className="booking-title"> Programările mele </h1> */}
                    <div className="personal-booking-body">
                        <div className="personal-booking-free">
                            <table style={{ tableLayout: 'fixed', width: '100%' }}>
                                <colgroup>
                                    <col style={{ minWidth: '100px' }} />
                                    <col style={{ minWidth: '150px' }} />
                                    <col style={{ minWidth: '100px' }} />
                                </colgroup>

                                <thead>
                                    <tr>
                                    <th>Ziua</th>
                                    <th>Interval orar</th>
                                    <th>Psiholog</th>
                                    <th>Status</th>
                                    <th>Anulare</th>
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    {bookings.map((a) => (
                                    <tr key={a.id}>
                                        <td>{a.day}</td>
                                        <td>{a.start} - {a.end}</td>
                                        <td>{a.partnerName}</td>
                                        <td>Activă</td>
                                        <td>
                                            <button 
                                                className="cancel-button"
                                                onClick={() => handleCancelBooking()}
                                            >
                                                Anulează
                                            </button>
                                        </td>
                                    </tr>
                                    ))} 
                                </tbody>
                            </table>
                        </div>
                    </div> 
                </div>
        )}
         </>
    );
}
