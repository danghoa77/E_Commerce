import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
const inititalState = {
    email: '',
    password: ''
}

function AuthLogin() {

    const [formData, setFormData] = useState(inititalState);

    function onSubmit(event) {
        event.preventDefault();
        console.log(formData);
    }

    return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign in to your account</h1>
                <p className="mt-2 text-sm">Don't have an account?</p>
                <Link className="font-medium ml-2 text-primary hover:underline" to='/auth/register'>
                    Register</Link>
            </div>
            <CommonForm
                formControls={loginFormControls}
                formData={formData}
                buttonText={'Sign In'}
                setFormData={setFormData}
                onSubmit={onSubmit}
            />
        </div>
    );
}

export default AuthLogin;