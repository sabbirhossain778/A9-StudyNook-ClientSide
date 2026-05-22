"use client";
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { Button, Description, Form, Input, Label, TextField } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline, IoLogoGoogle } from "react-icons/io5";
import { User, Mail, Lock, ArrowRight, ImageIcon } from 'lucide-react';
import { toast } from 'react-toastify';
import useDocumentTitle from "@/hooks/useDocumentTitle";


const SignUpPage = () => {
    useDocumentTitle("StudyNook – Login");
    const [isShowPassword, setIsShowPassword] = useState(false);
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signUp.email({
            name: userData.name,
            email: userData.email,
            password: userData.password,
            image: userData.photoUrl
        });
        console.log(data);


        toast.dismiss();
        if (error) {
            toast.error(error.message);
        }

        if (data) {
            toast.success("Registration successful! Please login.");
            e.target.reset();
            router.push('/login');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-slate-100 shadow-md space-y-6">

                <div className="text-center space-y-1">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                        Create an <span className="text-blue-600">Account</span>
                    </h2>
                    <p className="text-slate-500 text-xs font-medium">Create your account to start learning</p>
                </div>

                <Form className="space-y-4" onSubmit={onSubmit} autoComplete="off">
                    {/* name */}
                    <div className="space-y-1 w-full">
                        <Label className="text-xs font-bold text-slate-700 ml-1">Name</Label>
                        <TextField isRequired name="name" className="w-full">
                            <div className="relative flex items-center w-full">
                                <User className="absolute left-3 w-4 h-4 text-slate-400 z-10" />
                                <Input
                                    placeholder="Your Full Name"
                                    autoComplete="new-name"
                                    className="border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-11 bg-white w-full rounded-xl pl-9 pr-3"
                                />
                            </div>
                        </TextField>
                    </div>

                    {/* Email */}
                    <div className="space-y-1 w-full">
                        <Label className="text-xs font-bold text-slate-700 ml-1">Email Address</Label>
                        <TextField
                            isRequired
                            name="email"
                            type="email"
                            className="w-full"
                            validate={(value) => {
                                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                    return "Please enter a valid email address";
                                }
                                return null;
                            }}
                        >
                            <div className="relative flex items-center w-full">
                                <Mail className="absolute left-3 w-4 h-4 text-slate-400 z-10" />
                                <Input
                                    placeholder="Your Email"
                                    autoComplete="new-email"
                                    className="border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-11 bg-white w-full rounded-xl pl-9 pr-3"
                                />
                            </div>
                        </TextField>
                    </div>

                    {/* img url */}
                    <div className="space-y-1 w-full">
                        <Label className="text-xs font-bold text-slate-700 ml-1">Profile Image URL</Label>
                        <TextField isRequired name="photoUrl" className="w-full">
                            <div className="relative flex items-center w-full">
                                <ImageIcon className="absolute left-3 w-4 h-4 text-slate-400 z-10" />
                                <Input
                                    placeholder="Photo url"
                                    autoComplete="off"
                                    className="border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-11 bg-white w-full rounded-xl pl-9 pr-3"
                                />
                            </div>
                        </TextField>
                    </div>

                    {/* password */}
                    <div className="space-y-1 w-full">
                        <Label className="text-xs font-bold text-slate-700 ml-1">Password</Label>
                        <TextField
                            isRequired
                            name="password"
                            className="w-full"
                            validate={(value) => {
                                if (value.length < 6) return "Min 6 characters required";
                                if (!/[A-Z]/.test(value)) return "Need at least one uppercase letter";
                                if (!/[a-z]/.test(value)) return "Need at least one lowercase letter";
                                return null;
                            }}
                        >
                            <div className="relative flex items-center w-full">
                                <Lock className="absolute left-3 w-4 h-4 text-slate-400 z-10" />
                                <Input
                                    type={isShowPassword ? 'text' : "password"}
                                    placeholder="Your Password"
                                    autoComplete="new-password"
                                    className="border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-11 bg-white w-full rounded-xl pl-9 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setIsShowPassword(!isShowPassword)}
                                    className="absolute right-3 text-lg text-slate-400 hover:text-slate-600 z-10"
                                >
                                    {isShowPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                                </button>
                            </div>
                            <Description className="mt-1 text-[10px] text-gray-500">
                                Min 6 chars, 1 uppercase, 1 lowercase
                            </Description>
                        </TextField>
                    </div>

                    {/* btn */}
                    <div className="flex gap-3 pt-2">
                        <Button
                            type="submit"
                            className="flex-[2] h-12 text-base bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl shadow-lg shadow-blue-600/20 group flex items-center justify-center gap-2 transition-all active:scale-95"
                        >
                            <Check size={18} />
                            Sign Up <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                        </Button>
                        <Button
                            type="reset"
                            className="flex-1 h-12 text-sm font-bold border-2 border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl transition-all"
                        >
                            Reset
                        </Button>
                    </div>

                    <div className="relative flex items-center py-1">
                        <div className="flex-grow border-t border-slate-200"></div>
                        <span className="flex-shrink mx-3 text-slate-400 text-[10px] uppercase font-bold tracking-wider">Or</span>
                        <div className="flex-grow border-t border-slate-200"></div>
                    </div>

                    <Button
                        onPress={async () => {
                            await authClient.signIn.social({
                                provider: "google",
                                callbackURL: "/",
                            });
                        }}
                        className="w-full h-12 bg-white border border-slate-200 hover:bg-slate-300 text-black font-bold rounded-xl flex items-center justify-center gap-2"
                    >
                        <IoLogoGoogle className="text-lg text-red-500" />
                        Sign Up with Google
                    </Button>

                    <div className="text-center text-xs text-slate-500 font-medium pt-1">
                        Already have an account?{" "}
                        <button
                            type="button"
                            onClick={() => router.push('/login')}
                            className="text-blue-600 font-black hover:underline underline-offset-4 cursor-pointer"
                        >
                            Login here
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default SignUpPage;

