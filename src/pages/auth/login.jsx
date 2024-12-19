import CommonForm from "@/components/common/form";
import { loginFormControls, registerFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import authSlice, { LoginUser, googleAuth } from "@/store/auth-slice";
import { Description } from "@radix-ui/react-toast";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

function Authlogin() {
  const initialState = {
    email: "",
    Password: "",
    userName: "",
  };

  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(LoginUser(formData)).then((data) => {
      if (data?.payload?.user) {
        toast({
          title: data.payload.message,
        });
      } else {
        toast({
          title: data.payload.message,
          Description: "please sign up before trying again.",
          variant: "destructive",
        });
      }
    });
  }

  // handle google login

  function handleGoogleLoginSuccess(response) {
    const idToken = response.credential;

    dispatch(googleAuth(idToken))
      .then((action) => {
        // Access the payload from the action result
        const data = action.payload;
        if (data?.user) {
          toast({
            title: "Login successful",
            description: "Logged in successFully",
          });
        } else {
          toast({
            title: "Login Failed",
            description: "Please try again",
            variant: "destructive",
          });
        }
      })
      .catch((error) => {
        toast({
          title: "Google Login Failed!",
          description: "Unable to log in with Google. Please try again later.",
          variant: "destructive",
        });
      });
  }

  function handleGoogleLoginFailure() {
    toast({
      title: "Google Login Failed!",
      description: "Unable to log in with Google. Please try again later.",
      variant: "destructive",
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your Account
        </h1>
        <p>
          {" "}
          Don't have an account?
          <Link
            className="font-medium text-primary hover-underline ml-2"
            to="/auth/register"
          >
            {" "}
            Sign Up
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Log in"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />

      {/* Divider */}
      <div className="relative my-4 flex items-center">
        <div className="h-px w-full bg-gray-300" />
        <p className="mx-4 text-sm text-gray-500">OR</p>
        <div className="h-px w-full bg-gray-300" />
      </div>

      {/* Google Login Button */}
      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginFailure}
          useOneTap // Optional: Adds one-tap login feature
        />
      </div>
    </div>
  );
}

export default Authlogin;
