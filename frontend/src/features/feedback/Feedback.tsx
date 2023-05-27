import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Feedback } from "../../app/models/feedback";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import './Feedback.css';
import { Grid, Modal } from "@mui/material";

export default function FeedbackPage() {
    const location = useLocation();
    const { doctorId, email, name } = location.state;
    const [loading, setLoading] = useState(true);  
    const [feedback, setFeedback] = useState<Feedback[]>([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [refresh, setRefresh] = useState(false); 
    const [feedbackText, setFeedbackText] = useState('');

    useEffect(() => {
        agent.Feedback.getFeedbackByDoctorId(doctorId)
            .then((feedback) => setFeedback(feedback))
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));

    }, [refresh])

       
    const handleChange = (event: any) => {
        setFeedbackText(event.target.value);  
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        console.log(feedbackText);
        setLoading(true); 
        try {
            var result = await agent.Feedback.addFeedback(feedbackText, doctorId);
            setRefresh((prevState) => !prevState); 
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
        handleClose();
    };


    if (loading) return <LoadingComponent message="Loading feedback infos..." />

    return (

        <div className="feedback">
            <h1 className="feedback-title">Feedback</h1>
            <div className="feedback-body">
                <p><b>Psiholog: </b>{name.toUpperCase()}</p>
                <button onClick={handleOpen} className="add-feedback-button">Adaugă feedback-ul tău!</button>

                <Modal
                    open={open}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <form onSubmit={handleSubmit} className="feedback-modal-form">
                        <Grid container direction="column">
                            <Grid item>
                                <label className="feedback-modal-label" >Feedback-ul tău:</label>
                                <textarea
                                    className="feedback-modal-input"
                                    id="text"
                                    onChange={handleChange}
                                    name="text"
                                    value={feedbackText}
                                />
                            </Grid>
                            <Grid container gap={12.5} className="feedback-button-grid">
                                <Grid item style={{display: 'flex'}}>
                                    <button type='submit' className="feedback-save-button">
                                        Salvează 
                                    </button>
                                </Grid>
                                <Grid item style={{display: 'flex'}}>
                                    <button className="feedback-close-button" onClick={handleClose}>
                                        Închide 
                                    </button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>                 
                </Modal>

                <div className="feedback-container">
                    {feedback.map(f => (
                        <p className="feedback-text" key={f.id}>„{f.text}”</p>
                       
                    ))}
                </div>
            </div>
        </div>     
  );
}
