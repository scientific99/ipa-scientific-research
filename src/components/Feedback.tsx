import React, { useState } from "react";
import SuccessMessage from "./common/SuccessMessage";
import { Link } from "react-router-dom";

interface MenuItemComponent {
    fullName?: string,
    jobTitle?: string,
    description?: string,
}

export function Feedback() {
    const [formInput, setFormInput] = useState<MenuItemComponent>({});
    const [submitted, setSubmitted] = useState(false);

    const handleSendButton = () => {
        setFormInput({});
        setSubmitted(true);
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
            <form className="w-full max-w-2xl mx-auto mt-10 pt-8 px-8 pb-5 bg-white form-container ring ring-transparent focus:ring-blue-500 transition duration-300">
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
export default Feedback;