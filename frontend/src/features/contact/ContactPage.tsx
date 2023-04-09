import "./Contact.css";
import { useEffect, useState } from "react";
import { phoneContact } from "../../app/models/phoneContact";
import { linkContact } from "../../app/models/linkContact";

export default function ContactPage() {
    const [contacs, setContacts] = useState<phoneContact[]>([]);
    const [linkContacts, setLinkContacts] = useState<linkContact[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        fetch('http://localhost:5000/api/PhoneContact')
        .then(response => response.json())
        .then(data => setContacts(data))
    }, [])

    useEffect(() => {
        fetch("http://localhost:5000/api/LinkContact")
          .then((response) => response.json())
          .then((data) => setLinkContacts(data));
      }, []);

    return (
        <>
            <h1 className="contact-title">Ghid pentru sănătate mentală: Unde să găsești ajutor și suport</h1>
            
            <div className="advice-body">
                <h3>Dacă o persoană are nevoie de ajutor pentru sănătatea mentală, există câteva recomandări importante:</h3>
                <ul className="advice-ul">
                    <li>Caută ajutor profesional: Cea mai bună recomandare este să cauți ajutorul unui specialist în sănătatea mentală, cum ar fi un psihiatru sau un psiholog. Acești profesioniști au experiență în tratarea problemelor de sănătate mentală și îți pot oferi ajutorul și suportul necesar.</li>
                    <li>Vorbește cu un prieten sau cu un membru al familiei: Este important să vorbești cu cineva în care ai încredere despre ceea ce simți și despre problemele tale. Aceștia te pot asculta și pot oferi suport emoțional.</li>
                    <li>Încearcă să menții un stil de viață sănătos: Alimentația sănătoasă, exercițiile fizice regulate și somnul adecvat pot contribui la îmbunătățirea stării tale de sănătate mentală și pot ajuta la gestionarea stresului.</li>
                    <li>Explorează opțiunile de tratament: Există mai multe opțiuni de tratament disponibile, inclusiv terapia individuală sau de grup, medicația și terapiile complementare, cum ar fi yoga sau meditația. Este important să îți faci timp să explorezi aceste opțiuni și să discuți cu un specialist despre care ar fi cea mai bună alegere pentru tine.</li>
                    <li>Nu ezita să cauți ajutor: Problemele de sănătate mentală sunt reale și nu trebuie ignorate. Este important să îți iei timp să îți gestionezi stresul și să cauți ajutor atunci când este nevoie.</li>
                </ul>
            </div>

            <div className="contact-body">
                <h3>Dacă ai nevoie de ajutor:</h3>
                <p>Este important să știi că aceste numere de telefon sunt disponibile pentru a oferi suport emoțional și consiliere și sunt strict confidențiale. Dacă ai nevoie de ajutor sau cunoști pe cineva care ar putea avea nevoie, încurajează acea persoană să caute ajutor și să utilizeze aceste resurse disponibile. Solicitarea de sprijin este un semn de curaj și putere.</p>
                {contacs.map(contact => (
                    <ul className="contact-ul">
                        <li>{contact.title}</li>
                        <p>{contact.description}</p>
                        <p>Nr. de telefon: <b>{contact.phone}</b></p>
                    </ul>
                ))}
            </div>

            <div className="link-contact-body">
                <h3>Alte resurse:</h3>
                {linkContacts.map(contact => (
                    <ul className="contact-ul">
                        <li>{contact.title}</li>
                        <p>{contact.description}</p>
                        <a href={contact.link} className="a-contact-link">{contact.link}</a>
                    </ul>
                ))}
            </div>

        </>
    )
}