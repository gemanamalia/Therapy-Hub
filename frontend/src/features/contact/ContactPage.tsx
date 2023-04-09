import { Button, ButtonGroup, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { decrement, increment } from "./counterSlice";
import "./Contact.css";

export default function ContactPage() {
    const dispatch = useAppDispatch();
    const {data, title} = useAppSelector(state => state.counter);

    return (
        <>
            <h1 className="contact-title">Ghid pentru sănătate mentală: Unde să găsești ajutor și suport</h1>

        </>
    )
}