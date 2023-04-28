import { useEffect, useState } from "react";
import { Doctor } from "../../app/models/doctor";
import agent from "../../app/api/agent";
import { Portofolio } from "../../app/models/portofolio";
import PortofolioPage from "./PortofolioPage";
import "./Therapists.css"
export default function TherapistsPage() {
    const [loading, setLoading] = useState(true); 
    const [doctors, setDoctors] = useState<Doctor[]>([]);

    useEffect(() => {
        agent.Account.getDoctors()
            .then(doctors =>  setDoctors(doctors))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [])

    return (
        <div className="therapists">
           <h1 className="therapists-title"> Psihologi </h1> 
            {/* {console.log("psihologi:",doctors)} */}
            {doctors.map(doctor => (
                <div key={doctor.id} className="therapists-info">
                    <PortofolioPage  doctorId={doctor.id}  email={doctor.email} name={doctor.userName}/>
                </div>
            ))}
        </div> 
    )
}