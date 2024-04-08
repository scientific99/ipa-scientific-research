import React, { useEffect, useState } from "react";
import SuccessMessage from "./common/SuccessMessage";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { getListFeedback, send_feedback } from "../services/feedback.service"
import { useAuth } from "./auth/AuthContext";
import Login from "./auth/Login";

interface MenuItemComponent {
    fullName?: string,
    jobTitle?: string,
    description?: string,
}

export function Feedback() {
    const [formInput, setFormInput] = useState<MenuItemComponent>({});
    const [submitted, setSubmitted] = useState(false);

    const handleSendButton = async () => {
        setFormInput({});
        setSubmitted(true);
        try {
            var output = await send_feedback(formInput.fullName, formInput.jobTitle, formInput.description);
        } catch {

        }
        console.log(formInput);
    };
    const handleChangeForm = (e: any) => {
        const { name, value } = e.target;
        setFormInput((prevData) => ({
            ...prevData,
            [name]: value,
        }));

    }
    return (
        !submitted ? (
            <form className="shadow-lg rounded w-full max-w-2xl mx-auto mt-10 pt-8 px-8 pb-5 bg-white form-container ring ring-transparent focus:ring-blue-500 transition duration-300">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                            Họ và tên
                        </label>
                        <input
                            className="appearance-none block w-full text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="grid-full-name"
                            type="text"
                            value={formInput.fullName}
                            name="fullName"
                            onChange={(e) => handleChangeForm(e)}
                            placeholder="Nguyễn Văn A"
                        />
                        {!formInput.fullName && <p className="text-red-500 text-xs italic">Vui lòng điền vào trường này.</p>}
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Nghề nghiệp / Chức vụ
                        </label>
                        <input
                            className="appearance-none block w-full text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-job"
                            type="text"
                            name="jobTitle"
                            value={formInput.jobTitle}
                            onChange={(e) => handleChangeForm(e)}
                            placeholder="Giảng Viên"
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                            Nội dung góp ý
                        </label>
                        <textarea
                            className="resize-none appearance-none block w-full text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            style={{ height: "150px" }}
                            name="description"
                            value={formInput.description}
                            onChange={(e) => handleChangeForm(e)}
                            // type="text"
                            placeholder="Góp ý"
                        />
                        <p className="text-gray-600 text-xs italic">Vui lòng nhập nội dung góp ý</p>
                    </div>
                </div>
                <div className="flex flex-wrap mt-6 mx-auto">
                    <div className="px-3 mx-auto">
                        <button onClick={() => handleSendButton()} className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2" type="button">
                            Gửi thông tin
                        </button>
                    </div>
                </div>
            </form>

        ) : (
            <SuccessMessage />
        )

    );
};

export function FeedbackTable() {
    const { isLogin, prefix, setPrefix } = useAuth();
    const navigate = useNavigate();
    const cols = [
        { field: "create_time", use: "Thời gian tạo", text: "text-left" },
        { field: "full_name", use: "Người góp ý", text: "text-center" },
        { field: "job_title", use: "Nghề nghiệp", text: "text-left" },
        { field: "description", use: "Nội dung góp ý", text: "text-left" },
    ]

    const [rows, setRows] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const feedbackRows = await getListFeedback();
                setRows(feedbackRows);
            } catch (error) {
                setPrefix("/admin/login");
                navigate('/admin/login');
            }
        }
        fetchData();
    }, [setPrefix]);

    return (
        isLogin ? (
            (
                <div className="max-w-4xl font-document m-5 mt-10 flex flex-col p-10 bg-white mx-auto shadow-lg rounded">
                    <table className="min-w-full divide-y divide-gray-200">
                        <caption className="caption-top pb-5 text-xl">
                            DANH SÁCH GÓP Ý
                        </caption>
                        <thead className="border-separate border-spacing-2 bg-gray-50 cursor-pointer">
                            <tr>
                                {cols.map((col) => (
                                    <th className="border border-slate-300 p-2">{col.use}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row) => (
                                <tr className="border border-slate-300">
                                    {cols.map((col) => (
                                        <td className={"border border-slate-300 p-2 " + col.text}> {row[col.field]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Link
                        className="mt-5 text-right text-blue-600 w-max ml-auto"
                        to="https://docs.google.com/spreadsheets/d/1-h0H5Ou7hwPADb_84xsK4F3XqTiyejTtoRDMaOmfjZg/edit#gid=0"
                    >
                        Link google sheet
                    </Link>
                </div >
            )
        ) : <Login />
    );
}

export default Feedback;