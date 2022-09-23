import React, {useState, useEffect} from "react";
import { useHistory } from 'react-router-dom';

function CreateSpot() {
    const history = useHistory();
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [name, setName] = useState("");


    return (
        <div>

            <form
                className="create-spot-form"
                // onSubmit={submitHandler}
                >

            <h1>Create a New Listing</h1>

            <ul className="errors">
            </ul>

            <label>
                Name
                <input
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />
            </label>

            <label>
                Address
                <input
                type="text"
                name="address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
            />
            </label>

            </form>
        </div>
    )
}

export default CreateSpot
