import { useLocation } from "react-router-dom";
import "./Booking.css";
import  { useEffect, useState } from "react";
import { Appointment } from "../../app/models/appointment";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { User } from "../../app/models/user";


export default function BookingPage() {
    const [user, setUser] = useState<User | null>(null);
    // {console.log(user)}
    const location = useLocation();
    const { doctorId, email, name } = location.state;
    const [loading, setLoading] = useState(true);  
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [refresh, setRefresh] = useState(false); 

    useEffect(() => {
        agent.Appointment.getAppointmentsByUserId(doctorId)
            .then((appointments) => setAppointments(appointments))
            .catch((error) => console.log(error));

        agent.Account.currentUser()
            .then((user) => setUser(user))       
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
        
    }, [refresh]);


    const handleAddBooking = (id: number, day: string, start: string, end: string) => {
        setLoading(true);

        // adauga programarea la user-ul care a facut programarea in bookings
        agent.Booking.saveBookingToUser(day, start, end, doctorId, name)
            .then(() => alert('Programarea a fost salvată cu succes!'))
            .catch((error) => console.log(error));

        // adauga programarea la doctor in bookings - trb modificat cu userId
        if(user?.userName) {
            agent.Booking.saveBookingToDoctor(name, day, start, end, doctorId, user.userName)
            .then(() => alert('Programarea a fost salvată cu succes!'))
            .catch((error) => console.log(error));
        }
        
        // sterge programarea de la doctor din appointments
        agent.Appointment.deleteUserAppointment(id, name)
            .then(() => alert('Programarea a fost stearsa cu succes!'))
            .catch((error) => console.log(error))
        
        setLoading(false);
        setRefresh((prevState) => !prevState); 
    };
    

    if (loading) return <LoadingComponent message="Loading booking infos..." />

    return (

        <div className="booking">
            <h1 className="booking-title"> Programează-te acum! </h1>
            <div className="booking-body">
                <div className="booking-contact-info">
                    <p><b>Psiholog:</b> {name.toUpperCase()}</p>
                    <p><b>Email:</b> {email}</p>
                </div>
                <div className="booking-info">
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
                            <th>Programare</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {appointments.map((a) => (
                            <tr key={a.id}>
                                <td>{a.day}</td>
                                <td>{a.start} - {a.end}</td>
                                <td>
                                    <button 
                                        onClick={() => handleAddBooking(a.id, a.day, a.start, a.end)} 
                                        className="choose-button"
                                    >
                                        Alege
                                    </button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div> 
        </div>
  );
}
