import React, { ChangeEvent, useState } from 'react'
import { sendLoginAdmin } from "../../services/login.service"
import { useAuth } from "./AuthContext"
import { FeedbackTable } from '../Feedback';
import { useNavigate } from 'react-router-dom';

interface LoginFormState {
    username: string;
    password: string;
}
const Login = () => {
    const [form, setForm] = useState<LoginFormState>({ username: "", password: "" });
    const navigate = useNavigate();
    const { isLogin, setIsLogin, setPrefix } = useAuth();

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setForm((preForm) => ({
            ...preForm,
            [name]: value
        }));
    };

    const handleOnClickButton = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            const check = await sendLoginAdmin(form.username, form.password);
            setIsLogin(true);
            navigate("/feedback/list")
        } catch {
            const check = false;
        }

    };

    const Form = <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <img
            className="mx-auto h-10 w-auto"
            src=""
            alt="Your Company"
        /> */}
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Đăng nhập
            </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6">
                <div>
                    <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                        Tài khoản
                    </label>
                    <div className="mt-2">
                        <input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="text"
                            value={form.username}
                            onChange={handleInputChange}
                            required
                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Mật khẩu
                        </label>
                        <div className="text-sm">
                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                Quên mật khẩu?
                            </a>
                        </div>
                    </div>
                    <div className="mt-2">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            value={form.password}
                            onChange={handleInputChange}
                            required
                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={handleOnClickButton}
                    >
                        Đăng nhập
                    </button>
                </div>
            </form>

            {/* <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Start a 14 day free trial
            </a>
        </p> */}
        </div>
    </div>

    const loginDone = <FeedbackTable />

    return Form
}

export default Login