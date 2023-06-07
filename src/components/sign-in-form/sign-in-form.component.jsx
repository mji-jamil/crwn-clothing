import { useState } from "react";
import {
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup,
} from "../../utils/firebase.utils.js";

import FormInput from "../form-input/form-input.component.jsx";
import "./sign-in-form.styles.scss";
import Button from "../button/button.component.jsx";

const defaultFormFields = {
    email: "",
    password: "",
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { user } = await signInAuthUserWithEmailAndPassword(
                email,
                password
            );

            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case "auth/wrong-password":
                    alert("Incorrect password for email");
                    break;

                case "auth/user-not-found":
                    alert("no user associated with this email");
                    break;

                default:
                    console.log(error);
            }
            console.log(error);
        }
    };
    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    type="email"
                    onChange={handleChange}
                    name="email"
                    value={email}
                    required
                />
                <FormInput
                    label="Password"
                    type="password"
                    onChange={handleChange}
                    name="password"
                    value={password}
                    required
                />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button
                        onClick={signInWithGoogle}
                        buttonType="google"
                        type="button"
                    >
                        Google
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;
