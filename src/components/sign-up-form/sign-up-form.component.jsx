import { useState } from "react";
import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
} from "../../utils/firebase.utils.js";

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Password do not match");
            return;
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword(
                email,
                password
            );

            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                alert("Can not create user, email already in use");
            }
            console.log("user creation encountered an error", error);
        }
    };

    return (
        <div>
            <h1>SIgn up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Name</label>
                <input
                    type="text"
                    onChange={handleChange}
                    name="displayName"
                    value={displayName}
                    required
                />
                <label htmlFor="">Email</label>
                <input
                    type="email"
                    onChange={handleChange}
                    name="email"
                    value={email}
                    required
                />
                <label htmlFor="">Password</label>
                <input
                    type="password"
                    onChange={handleChange}
                    name="password"
                    value={password}
                    required
                />
                <label htmlFor="">Confirm Password</label>
                <input
                    type="password"
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword}
                    required
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SignUpForm;
