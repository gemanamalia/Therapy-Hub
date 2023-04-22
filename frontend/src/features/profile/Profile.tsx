import { useAppSelector } from "../../app/store/configureStore";
import "./Profile.css";

export default function Profile() {
    const {user} = useAppSelector(state => state.account);
    
    console.log(user);

    return (
        <div className="profile">
           <h1 className="profile-title"> Profilul meu </h1> 

           <div className="profile-body">
               <h3> User email: {user?.email} </h3>
           </div>

           <button className="edit-button">Editează profil</button>
        </div>
    )
}