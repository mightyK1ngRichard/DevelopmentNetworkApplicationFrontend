import './RequestView.css';
import {FC, useEffect} from "react";
import TableView from "../TableView/TableView.tsx";

interface RequestViewProps {
    setPage: () => void;
    authorName: string;
    authorProfession: string;
    authorPhoto: string;
    authorLogin: string;
    startDate: string;
    endDate: string;
    leader: string;
    description: string;
}

const RequestView: FC<RequestViewProps> = (
    {
        setPage,
        authorName,
        authorProfession,
        authorPhoto,
        authorLogin,
        startDate,
        endDate,
        leader,
        description,
    }) => {
    useEffect(() => {
        setPage()
    }, []);

    const tableData = {
        number: 1,
        imageUrl:
            "https://sun9-76.userapi.com/impg/9UT7SzAC_gHL2GBES69P-hXudzqKmS8_f0oPXA/AN2fmitt7Bs.jpg?size=1080x1920&quality=95&sign=812fa659cab85e0be2fc74516dc27ae7&type=album",
        cityName: "Ячейка 1-2",
        description: "Ячейка 1-3",
    };

    return (
        <>
            <div className="card">
                <div className="info">
                    <div className="author-info">
                        <img src={authorPhoto} alt="Фото Автора" className="author-img"/>
                        <div>
                            <h4>{authorName}</h4>
                            <p>{authorProfession}</p>
                            <p>{authorLogin}</p>
                        </div>
                    </div>
                    <div className="dates-info">
                        <p>{startDate}</p>
                        <p>{endDate}</p>
                        <p>{leader}</p>
                    </div>
                    <p>{description}</p>
                </div>
            </div>

            <TableView data={[tableData, tableData, tableData, tableData]}/>
        </>
    );
};

export default RequestView;