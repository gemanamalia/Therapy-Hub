import { useRef, useState } from "react";
import emailjs from '@emailjs/browser';
import "./ApplyForm.css";

export const ApplyForm = () => {
    const form = useRef<HTMLFormElement | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const sendEmail = async (e: any) => {
        e.preventDefault();
        
        if (form.current) {
            await emailjs.sendForm('service_2z5z6td', 'template_rrhclol', form.current, '0GdTHZkz0XdPWFdlA')
               .then((result) => {
                    if (form.current) {
                        form.current.reset();
                      }               
                    setIsSubmitted(true);
                }, (error) => {
                    console.log(error.text);
            });     
        } 
  };
  
  if (isSubmitted) {
    return (
      <div className="succes-message">
        <h1>Aplicația ta a fost trimisă cu succes!</h1>
        <p> Vei fi contactat în cel mai scurt timp de echipa <i>Therapy Hub</i>.</p>
        <p> Îți mulțumim!</p>
      </div>
    );
  }


    return (
        <>
            <div className="apply" >
                <h1 className="apply-title">Aplică și alătură-te echipei noastre!</h1>
                <div className="apply-body">
                    <form className="apply-form" ref={form} onSubmit={sendEmail}>
                    <label>Nume complet</label>
                    <input type="text" name="user_name" />
                    <label>Email</label>
                    <input type="email" name="user_email" />
                    <label>Motivație</label>
                    <textarea name="message" />
                    <button className="apply-button" type="submit" value="Send">Aplică</button>
                    </form>
                </div>
            </div>
        </>
      );
};

