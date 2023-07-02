import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { useAppSelector } from "../../app/store/configureStore";
import "./Profile.css";
import { Portofolio } from "../../app/models/portofolio";
import LoadingComponent from "../../app/layout/LoadingComponent";
import Modal from '@mui/material/Modal';
import { Grid } from "@mui/material";
  
export default function Profile() {
    const {user} = useAppSelector(state => state.account);
    const [loading, setLoading] = useState(true); 
    const [portofolio, setPortofolio] = useState<Portofolio | null>(null);
    const [portofolioCopy, setPortofolioCopy] = useState<Portofolio | null>(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [refresh, setRefresh] = useState(false); 
  
    useEffect(() => {
        agent.Account.fetchPortofolio()
            .then(portofolio => {
                setPortofolio(portofolio);
                setPortofolioCopy(portofolio);
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [refresh])

    
      
    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setPortofolio((prevPortofolio: any) => ({
            ...prevPortofolio,
            [name]: value,
          }));
      };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        console.log(portofolio);
        setLoading(true);
        try {
            var result = await agent.Account.savePortofolio(portofolio);
            setRefresh((prevState) => !prevState); 
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
        handleClose();
    };


    if (loading) return <LoadingComponent message="Loading profile infos..." />

    return (
        <div className="profile">
           <h1 className="profile-title"> Profilul meu </h1> 
           <ul className="profile-body">
                <li>
                    <h3> Email </h3>
                    <p> {user?.email} </p>
                </li>
                <li>
                    <h3> Nume complet: </h3>
                    <p>{portofolioCopy?.fullName} </p>
                </li>
                <li>
                    <h3> Despre mine: </h3>
                    <p>{portofolioCopy?.description} </p>
                </li>
                <li>
                    <h3> Adresă contact: </h3>
                    <p>{portofolioCopy?.contactAddress} </p>
                </li> 
                <li>
                    <h3> Telefon: </h3>
                    <p>{portofolioCopy?.phone} </p>
                </li>
                <button onClick={handleOpen} className="open-button">Editează profil</button>   
           </ul>
         
            
            <Modal
                open={open}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <form onSubmit={handleSubmit} className="modal-form">
                    <Grid container direction="column">
                        <Grid item>
                             <label className="modal-label">Nume complet:</label>
                            <input
                                className="modal-input"
                                onChange={handleChange}
                                type="text"
                                name="fullName"
                                value={portofolio?.fullName || ""}
                            />
                        </Grid>
                        <Grid item>
                            <label className="modal-label" >Despre mine:</label>
                            <textarea
                                className="modal-input"
                                id="description"
                                onChange={handleChange}
                                name="description"
                                value={portofolio?.description || ""}
                            />
                        </Grid>
                        <Grid item>
                            <label className="modal-label">Adresă contact:</label>
                            <input
                                className="modal-input"
                                onChange={handleChange}
                                type="text"
                                name="contactAddress"
                                value={portofolio?.contactAddress || ""}
                            />
                        </Grid>
                        <Grid item>
                            <label className="modal-label">Telefon:</label>
                            <input
                                className="modal-input"
                                onChange={handleChange}
                                type="text"
                                name="phone"
                                value={portofolio?.phone || ""}
                            />
                        </Grid>
                        <Grid container gap={12.5} className="button-grid">
                            <Grid item style={{display: 'flex'}}>
                                <button type='submit' className="save-button">
                                    Salvează 
                                </button>
                            </Grid>
                            <Grid item style={{display: 'flex'}}>
                                <button className="close-button" onClick={handleClose}>
                                    Închide 
                                </button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>                 
            </Modal>
            
        </div>
    )
}