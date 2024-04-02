export function About() {
    const cssParagraph = "text-lg text-gray-700 indent-8 p-2 my-auto"
    return (
        <div className="overflow-ellipsis flex items-center justify-center font-document mx-auto p-1, bg-white shadow-lg rounded max-w-screen-md mt-10">
            <div className="self-center p-3">
                <p className="text-3xl font-bold text-center my-auto p-4">LỜI CẢM ƠN</p>
                <p className={cssParagraph} style={{ whiteSpace: "pre-wrap" }}>
                    Trước tiên, chúng tôi xin bày tỏ lòng biết ơn sâu sắc với TS. Tạ Thành Tấn - người thầy đã tận tình giúp đỡ và hướng dẫn chúng tôi trong quá trình thực hiện nghiên cứu khoa học.
                </p>
                <p className={cssParagraph} style={{ whiteSpace: "pre-wrap" }}>
                    Chúng tôi chân thành cảm ơn James Kirby - tác giả của chương trình vPhon đã cung cấp tài nguyên kí âm IPA tiếng Việt để chúng tôi kế thừa và phát triển, từ đó, xây dựng thành công website <span className="italic"> Phiên âm tiếng Việt theo hệ IPA </span>.
                </p>
                <p className={cssParagraph} style={{ whiteSpace: "pre-wrap" }}>
                    Cảm ơn bạn Đinh Bá Hải, sinh viên Trường Công nghệ Thông tin và Truyền Thông, Đại học Bách Khoa Hà Nội đã hỗ trợ nhóm nghiên cứu về mặt kỹ thuật để xây dựng thành công website <span className="italic">Phiên âm tiếng Việt theo hệ IPA</span>.
                </p>
                <p className={cssParagraph} style={{ whiteSpace: "pre-wrap" }}>
                    Ngoài ra, xin cảm ơn các tác giả, Trung tâm Thông tin - Thư viện trường Đại học Sư phạm Hà Nội, gia đình, bạn bè đã giúp đỡ, động viên chúng tôi trong quá trình thực hiện nghiên cứu.
                </p>
                <div className="overflow-ellipsis self-center py-4">
                    <p className="text-lg text-gray-700 px-4">Hà Nội, ngày 31, tháng 3, năm 2024</p>
                    <p className="text-lg text-gray-700 px-8 p-2" style={{ whiteSpace: "pre-wrap" }}>Nhóm tác giả</p>
                    <p>Lê Nguyễn Diệu Anh</p>
                </div>
            </div>

        </div >
    )
}

export default About;
