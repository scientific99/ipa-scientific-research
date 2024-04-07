import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../components/auth/AuthContext"

interface SuccessMessageProps {
    countdown: number;
    onTimeout: () => void;
}

const SuccessMessage = () => {
    const { setPrefix } = useAuth();
    return (
        <div className="mx-auto flex flex-col items-center justify-center h-full mt-2" >
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Thông tin đã được gửi thành công!</strong>
                <span className="block sm:inline"> Cảm ơn bạn đã góp ý!</span>
            </div>
            <Link to="/home" onClick={() => { setPrefix("/home") }} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out">
                Trở về trang chủ
            </Link>
        </div >
    );
}
export default SuccessMessage;