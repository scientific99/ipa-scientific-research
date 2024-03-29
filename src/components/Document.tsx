import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import "./css/Document.css"

const cols = [
    { field: "tone", use: "Thanh điệu" },
    { field: "name", use: "Tên" },
    { field: "description", use: "Mô tả" }
]


const rows = [
    { tone: "A1", name: "Ngang", description: "Thanh điệu có nguồn gốc âm tiết mở và phụ âm đầu vô thanh" },
    { tone: "A2", name: "Huyền", description: "Thanh điệu có nguồn gốc âm tiết mở và phụ âm đầu hữu thanh" },
    { tone: "B1", name: "Sắc", description: "Thanh điệu có nguồn gốc âm tiết kết thúc bằng âm tắc thanh hầu (glottal stop) và phụ âm đầu vô thanh" },
    { tone: "B2", name: "Nặng", description: "Thanh điệu có nguồn gốc âm tiết kết thúc bằng âm tắc thanh hầu (glottal stop) và phụ âm đầu hữu thanh" },
    { tone: "C1", name: "Hỏi", description: "Thanh điệu có nguồn gốc âm tiết kết thúc bằng âm xát thanh hầu (-s, -h) và phụ âm đầu vô thanh" },
    { tone: "C2", name: "Ngã", description: "Thanh điệu có nguồn gốc âm tiết kết thúc bằng âm xát thanh hầu (-s, -h) và phụ âm đầu hữu thanh" },
    { tone: "D1", name: "Sắc nhập", description: "Thanh điệu có nguồn gốc âm tiết kết thúc bằng âm tắc (-p/t/k) và phụ âm đầu vô thanh" },
    { tone: "D2", name: "Nặng nhập", description: "Thanh điệu có nguồn gốc âm tiết kết thúc bằng âm tắc (-p/t/k) và phụ âm đầu hữu thanh" },
]

export function Document() {
    return (
        <div className="font-document mt-2 flex flex-col p-10">
            <table className="min-w-full divide-y divide-gray-200">
                <caption className="caption-top">
                    Table 3.1: Professional wrestlers and their signature moves.
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
                            <td className="border border-slate-300 p-2 text-center">{row.tone}</td>
                            <td className="border border-slate-300 p-2 text-center">{row.name}</td>
                            <td className="border border-slate-300 p-2">{row.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default Document;