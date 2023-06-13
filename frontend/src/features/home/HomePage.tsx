import { useEffect, useState } from "react";
import "./Home.css";
import { Testimonial } from "../../app/models/testimonial";
import { Grid } from "@mui/material";
import { Link } from 'react-router-dom';

export default function HomePage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

    useEffect(() =>{
        fetch('http://localhost:5000/api/Testimonials')
        .then(response => response.json())
        .then(data => setTestimonials(data))
    }, [])

    return (
        <>
            <div className="home">
                <h1 className="home-title">De ce Therapy Hub?</h1>
                <div className="home-body">
                    <p className="page-intro-home">La <b>Therapy Hub</b>, credem că fiecare persoană merită acces la servicii de calitate în domeniul sănătății mentale. De aceea, am creat o platformă inovatoare care conectează indivizii cu terapeuți licențiați, chiar din confortul casei lor. Misiunea noastră este de a îmbunătăți viața celor pe care îi servim și suntem mândri de impactul pozitiv pe care l-am avut asupra multor oameni.</p>
                    <p className="page-intro-home">Clienții noștri vin la noi cu o gamă largă de provocări în domeniul sănătății mintale, de la stres și anxietate la depresie și traume. Dar ceea ce au toți în comun este dorința de a avea o viață mai bună și disponibilitatea de a investi în sănătatea lor mentală. Cu sprijinul și îndrumarea terapeuților noștri, clienții noștri reușesc să facă schimbări reale și durabile. Învață strategii noi de coping, câștigă noi perspective asupra gândurilor și emoțiilor lor și dezvoltă o mai mare reziliență în fața provocărilor vieții.</p>
                    <p className="page-intro-home">Suntem copleșiți de poveștile de speranță și vindecare pe care le auzim de la clienții noștri în fiecare zi. Iată doar câteva dintre testimonialele lor:</p>
                    <div className="testimonials">
                        {testimonials.map((testimonial, i) => <p key={testimonial.id}>„{testimonial.text}”</p>)}
                    </div>
                    <p className="page-intro-home">Dacă ești pregătit să investești în sănătatea ta mentală și bunăstare, ne-ar face plăcere să te ajutăm. Răsfoiește portofoliul nostru de terapeuți astăzi și fă primul pas spre o viață mai fericită și mai sănătoasă.</p>
                </div>
            </div>
            <div className="careers">
                <h1 className="careers-title">Cariere</h1>
                <div className="careers-body">
                    <p>Vrei să fii parte din echipa noastră de terapeuți licențiați?</p>
                    <Grid item >
                        <Link to='/apply' style={{ textDecoration: 'none'}}>
                            {"Aplică aici!"}
                        </Link>
                    </Grid>
                </div>
            </div>
        </>
    )
}