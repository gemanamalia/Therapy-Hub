import "./Home.css";

export default function HomePage() {
    return (
        <>
            <div className="home-div">
                <h1 className="home-title">De ce Therapy Hub?</h1>
                <p className="page-intro-home">La <b>Therapy Hub</b>, credem că fiecare persoană merită acces la servicii de calitate în domeniul sănătății mentale. De aceea, am creat o platformă inovatoare care conectează indivizii cu terapeuți licențiați, chiar din confortul casei lor. Misiunea noastră este de a îmbunătăți viața celor pe care îi servim și suntem mândri de impactul pozitiv pe care l-am avut asupra multor oameni.</p>
                <p className="page-intro-home">Clienții noștri vin la noi cu o gamă largă de provocări în domeniul sănătății mintale, de la stres și anxietate la depresie și traume. Dar ceea ce au toți în comun este dorința de a avea o viață mai bună și disponibilitatea de a investi în sănătatea lor mentală. Cu sprijinul și îndrumarea terapeuților noștri, clienții noștri reușesc să facă schimbări reale și durabile. Învață strategii noi de coping, câștigă noi perspective asupra gândurilor și emoțiilor lor și dezvoltă o mai mare reziliență în fața provocărilor vieții.</p>
                <p className="page-intro-home">Suntem copleșiți de poveștile de speranță și vindecare pe care le auzim de la clienții noștri în fiecare zi. Iată doar câteva dintre testimonialele lor:</p>
                {/* <div className="testimonials">
                    {testimonials.map((testimonial, i) => <TestimonialComponent {...testimonial} key={i}/>)}
                </div> */}
                <p className="page-intro-home">Dacă ești pregătit să investești în sănătatea ta mentală și bunăstare, ne-ar face plăcere să te ajutăm. Răsfoiește directorul nostru de terapeuți astăzi și dă primul pas spre o viață mai fericită și mai sănătoasă.</p>
            </div>
        </>
    )
}