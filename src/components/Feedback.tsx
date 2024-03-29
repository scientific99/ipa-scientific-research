import React from "react";
export function Feedback() {
    const showAlert = () => {
        alert('Gửi thành công');
    };
    return (
        <form className="w-full max-w-2xl mx-auto mt-10 pt-8 px-8 pb-5 bg-white">
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                        Họ và tên
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-full-name"
                        type="text"
                        placeholder="Nguyễn Văn A"
                    />
                    <p className="text-red-500 text-xs italic">Vui lòng điền vào trường này.</p>
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Nghề nghiệp / Chức vụ
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-job"
                        type="text"
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
                        className="resize-none appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-password"
                        style={{ height: "150px" }}
                        // type="text"
                        placeholder="Góp ý"
                    />
                    <p className="text-gray-600 text-xs italic">Vui lòng nhập nội dung góp ý</p>
                </div>
            </div>
            <div className="flex flex-wrap mt-6 mx-auto">
                <div className="px-3 mx-auto">
                    <button onClick={showAlert} className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2" type="button">
                        Gửi thông tin
                    </button>
                </div>
            </div>
        </form>
    );
};
export default Feedback;