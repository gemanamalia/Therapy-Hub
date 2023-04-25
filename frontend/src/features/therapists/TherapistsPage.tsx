import { useState } from "react";
import agent from "../../app/api/agent";

export default function TherapistsPage() {
    const [validationErrors, setValidationErrors] = useState<String[]>([]);
    
    function getValidationError() {
        agent.TestErrors.getValidationError()
            .then(() => console.log('should not see this'))
            .catch(error => setValidationErrors(error));
    }

    return (
       <>
            <p>Psihologi</p>
       </>
    )
}