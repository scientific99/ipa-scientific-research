export function About() {
    return (
        <div className="overflow-ellipsis flex items-center justify-center font-document mx-auto p-1, bg-white shadow-lg rounded max-w-screen-md mt-10">
            <div className="self-center p-2">
                <p className="text-4xl font-bold text-center my-auto p-4">Lời Cảm Ơn</p> <br />
                <p className="text-lg text-gray-700 indent-8 p-4 my-auto" style={{ whiteSpace: "pre-wrap" }}>
                    Trước tiên, chúng tôi xin bày tỏ lòng biết ơn sâu sắc với TS. Tạ Thành Tấn - người thầy đã tận tình giúp đỡ và hướng dẫn chúng tôi trong quá trình thực hiện nghiên cứu khoa học.
                    Chúng tôi cũng xin chân thành cảm ơn James Kirby - tác giả của chương trình vPhon đã cung cấp tài nguyên kí âm IPA tiếng Việt để chúng tôi kế thừa và phát triển, từ đó, xây dựng thành công website Phiên âm tiếng Việt theo hệ IPA.
                    Cảm ơn sinh viên Đinh Bá Hải, trường Công nghệ Thông tin và Truyền Thông, Đại học Bách Khoa Hà Nội đã hỗ trợ nhóm nghiên cứu về mặt kỹ thuật để xây dựng thành công website Phiên âm tiếng Việt theo hệ IPA.
                    Ngoài ra, xin cảm ơn các tác giả, trung tâm thư viện trường Đại học Sư phạm Hà Nội, gia đình, bạn bè đã giúp đỡ, động viên chúng tôi trong quá trình thực hiện nghiên cứu.
                </p>
                <p className="text-lg text-gray-700 px-4 my-auto">Hà Nội, ngày 31, tháng 3, năm 2024</p>
                <p className="text-lg text-gray-700 text-right px-8 p-2">Nhóm tác giả</p>
            </div>

        </div>
    )
}

export default About;
