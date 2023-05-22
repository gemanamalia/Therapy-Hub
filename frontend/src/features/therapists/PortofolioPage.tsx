import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { Portofolio } from "../../app/models/portofolio";
import { CardMedia } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface Props {
  doctorId: number;
  email: string;
  name:string;
}

export default function PortofolioPage({ doctorId, email, name }: Props) {
    const [loading, setLoading] = useState(true);
    const [portofolio, setPortofolio] = useState<Portofolio | null>(null);
    let navigate = useNavigate(); 
    
    const routeChange = () =>{
      navigate('/booking', {
        state: {
          doctorId,
          email,
          name,
        },
      });
    }
    

  useEffect(() => {
        agent.Account.getPortofolioByUserId(doctorId)
            .then((portofolio) => setPortofolio(portofolio))
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, []);



  return (

        <div className="therapists-list">
            <div>
              { portofolio?.pictureUrl ? ( 
                  <CardMedia
                    image={portofolio?.pictureUrl}
                    className="therapist-image"
                  />
              ) : (
                  <CardMedia
                    image="/images/placeholder.png"
                    className="therapist-image"
                  />
              )}
            </div>
        
            <div className="therapist-info">
                <li><b>Psiholog:</b> {name.toUpperCase()}</li>
                <li><b>Despre mine:</b> {portofolio?.description}</li>
                <li><b>Contactează-mă:</b></li>
                <div className="contact-info">
                    <li><b>Cabinet:</b> {portofolio?.contactAddress}</li>
                    <li><b>Email:</b> {email}</li>
                    <li><b>Telefon:</b> {portofolio?.phone}</li>
                </div>
                <button  onClick={routeChange} className="booking-button">Programează-te acum!</button>         
            </div>
        </div>        
  );
}
