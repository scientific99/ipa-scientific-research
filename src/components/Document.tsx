import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import "./css/Document.css";

interface colSchema {
    field: string,
    use: string
}
interface Row {
    [key: string]: string;
}

const cols = [
    { field: "tone", use: "Thanh điệu", text: "text-center" },
    { field: "name", use: "Tên", text: "text-center" },
    { field: "pron", use: "Cách phát âm theo thang 5 bậc cao độ (*)", text: "text-center" },
    { field: "desPron", use: "Mô tả phát âm", text: "text-left" },
    { field: "desHistory", use: "Mô tả nguồn gốc lịch sử", text: "text-left" }
]

const rows: Row[] = [
    { tone: "A1", name: "Ngang", pron: "33", desPron: "Bắt đầu với cao độ trung bình và không thay đổi suốt chiều dài âm tiết.", desHistory: "Thanh điệu có nguồn gốc âm tiết mở và phụ âm đầu vô thanh" },
    { tone: "A2", name: "Huyền", pron: "32", desPron: "Bắt đầu với cao độ trung bình và giảm dần một chút tới cuối. Có thể giọng phát âm có chút hơi thở.", desHistory: "Thanh điệu có nguồn gốc âm tiết mở và phụ âm đầu hữu thanh" },
    { tone: "B1", name: "Sắc", pron: "334", desPron: "Bắt đầu với cao độ trung bình, đi ngang tới giữa âm tiết rồi đi lên một chút tới cuối âm tiết.", desHistory: "Thanh điệu có nguồn gốc âm tiết kết thúc bằng âm tắc thanh hầu (glottal stop) và phụ âm đầu vô thanh" },
    { tone: "B2", name: "Nặng", pron: "42ʔ", desPron: "Bắt đầu với cao độ hơi cao rồi đi xuống gần thấp nhất, kết thúc bằng cách hơi siết dây thanh, trường độ ngắn hơn ba thanh phía trên.", desHistory: "Thanh điệu có nguồn gốc âm tiết kết thúc bằng âm tắc thanh hầu (glottal stop) và phụ âm đầu hữu thanh" },
    { tone: "C1", name: "Hỏi", pron: "31", desPron: "Bắt đầu với cao độ trung bình rồi đi xuống thấp nhất (không còn giai đoạn đi lên ở phía cuối như cách phát âm của người lớn tuổi)", desHistory: "Thanh điệu có nguồn gốc âm tiết kết thúc bằng âm xát thanh hầu (-s, -h) và phụ âm đầu vô thanh" },
    { tone: "C2", name: "Ngã", pron: "334", desPron: "Bắt đầu với cao độ tủng bình, đi ngang rồi đi lên phía cuối âm tiết.", desHistory: "Thanh điệu có nguồn gốc âm tiết kết thúc bằng âm xát thanh hầu (-s, -h) và phụ âm đầu hữu thanh" },
    { tone: "D1", name: "Sắc nhập", pron: "45 (ngắn)", desPron: "Phát âm ngắn, cao độ hơi cao và đi lên cao nhất.", desHistory: "Thanh điệu có nguồn gốc âm tiết kết thúc bằng âm tắc (-p/t/k) và phụ âm đầu vô thanh" },
    { tone: "D2", name: "Nặng nhập", pron: "32 (ngắn)", desPron: "Phát âm ngắn, cao độ trung bình rồi đi xuống.", desHistory: "Thanh điệu có nguồn gốc âm tiết kết thúc bằng âm tắc (-p/t/k) và phụ âm đầu hữu thanh" },
]

export function Document() {
    return (
        <div className="font-document m-5 mt-10 flex flex-col p-10 bg-white mx-auto shadow-lg rounded">
            <table className="min-w-full divide-y divide-gray-200">
                <caption className="caption-top pb-5 text-xl">
                    BẢNG QUY ĐỔI KÍ HIỆU THANH ĐIỆU
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
            <span className="my-5 italic">
                (*) Theo thang 5 bậc cao độ của Triệu Nguyên Nhiệm, với 1 là thấp nhất và 5 là cao nhất. (Chao, Yuen-Ren. "A system of tone letters." Le maître phonétique (1930).
            </span>
            <img src={require("./../images/vovel.png")} alt="vovel" className="w-1/2 justify-center	items-center mx-auto" />
            <div className="italic">Nguồn: Tạ Thành Tấn</div>
        </div >
    );
}
export default Document;