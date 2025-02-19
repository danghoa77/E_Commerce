/* eslint-disable react/no-unescaped-entities */
import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { Link} from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/auth-slice";
import { useToast } from "../../../components/ui/use-toast"
const inititalState = {
    email: '',
    password: ''
}

function AuthLogin() {

    const [formData, setFormData] = useState(inititalState);
    const dispatch = useDispatch()
    const { toast } = useToast()
    function onSubmit(event) {
        event.preventDefault();
        dispatch(loginUser(formData)).then(data => {
            if (data?.payload.success) {
                toast({
                    title: data?.payload?.message
                })
            } else {
                toast({
                    title: data?.payload?.message,
                    variant: 'destructive'
                })
            }
        })
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