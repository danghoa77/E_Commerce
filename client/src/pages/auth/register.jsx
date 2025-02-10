/* eslint-disable no-unused-vars */
import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
const inititalState = {
    userName: '',
    email: '',
    password: ''
}

function AuthRegister() {

    const [formData, setFormData] = useState(inititalState);

    function onSubmit(event) {
        event.preventDefault();
        console.log(formData);
    }

    console.log(formData)

    return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Create new account</h1>
                <p className="mt-2 text-sm">Already have an account?</p>
                <Link className="font-medium ml-2 text-primary hover:underline" to='/auth/login'>
                    Login</Link>
            </div>
            <CommonForm
                formControls={registerFormControls}
                formData={formData}
                buttonText={'Sign Up'}
                setFormData={setFormData}
                onSubmit={onSubmit}
            />

        </div>
    );
}

export default AuthRegister;