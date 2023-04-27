import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { useAppSelector } from "../../app/store/configureStore";
import "./Profile.css";
import { Portofolio } from "../../app/models/portofolio";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Description } from "@mui/icons-material";

export default function Profile() {
    const {user} = useAppSelector(state => state.account);
    const [loading, setLoading] = useState(true); 
    const [portofolio, setPortofolio] = useState<Portofolio | null>(null);

    useEffect(() => {
        agent.Account.fetchPortofolio()
            .then(portofolio => setPortofolio(portofolio))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [])
      
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
            console.log("rezultat", result);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
      };
    


    if (loading) return <LoadingComponent message="Loading profile infos..." />

    return (
        <div className="profile">
           <h1 className="profile-title"> Profilul meu </h1> 
           <div className="profile-body">
               <h3> Email: {user?.email} </h3>
               <h3> Despre mine: {portofolio?.description} </h3>
               <h3> Adresă: {portofolio?.contactAddress} </h3>
               <h3> Telefon: {portofolio?.phone} </h3>
           </div>

           <h1 className="profile-title"> Editare profil </h1>
            <form onSubmit={handleSubmit}>
                <label>Descriere:
                        <input  
                            onChange={handleChange} 
                            type="text" 
                            name="description" 
                            value={portofolio?.description || ""}
                        />
                </label>
                <label>Adresa contact:
                        <input 
                            onChange={handleChange} 
                            type="text" 
                            name="contactAddress" 
                            value={portofolio?.contactAddress || ""}
                        />
                </label>
                <label>Telefon:
                        <input 
                            onChange={handleChange} 
                            type="text" 
                            name="phone" 
                            value={portofolio?.phone || ""}
                        />
                </label>

                <button className="edit-button" type='submit' >Salvează profil</button>
            </form>

           
        </div>
    )
}