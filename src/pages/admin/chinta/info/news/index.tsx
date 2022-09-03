/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps } from 'next';
import { ReactNode, useState } from 'react';
import toast from 'react-hot-toast';
import { INews } from 'server/interface';
import instance from 'src/api/httpService';
import AddNews from 'src/components/Admin/AddNews';
import AdminLayout from 'src/components/Admin/AdminLayout';
import { config } from 'src/config';

interface IProps {
    news: INews[];
}

const Studio = ({ news }: IProps) => {
    const [isAdd, setIsAdd] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [newsItem, setNewsItem] = useState<INews>({} as INews);

    const deleteHandler = async (id: any) => {
        const sure = window.confirm('Are you sure!!');
        if (sure) {
            const { data } = await instance.delete('/info/news/' + id);
            if (data) {
                toast.success(data.message);
            }
            window.location.reload();
        }
    };
    const updateHandler = (studio: INews) => {
        setIsAdd(true);
        setIsUpdate(true);
        setNewsItem(studio);
    };
    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center  ">
                <h5 className="card-title mb-0">News</h5>
                {!isAdd && (
                    <div
                        className="btn btn-dark btn-sm"
                        onClick={() => {
                            setIsAdd(true);
                            setIsUpdate(false);
                        }}
                    >
                        Add News
                    </div>
                )}
            </div>
            <div className="card-body">
                {isAdd && (
                    <AddNews
                        setIsAdd={setIsAdd}
                        isUpdate={isUpdate}
                        news={newsItem}
                    />
                )}
                {!isAdd && (
                    <div className="row g-3">
                        {news.length > 0 ? (
                            news.map((newsItem) => (
                                <div className="col-md-6" key={newsItem.title}>
                                    <div className="card p-2  mb-3 h-100">
                                        <div className="w-100">
                                            <img
                                                className="img-fluid"
                                                src={`${config.imageUploadUrl}/${newsItem.image}`}
                                                alt={newsItem.title}
                                            />
                                        </div>
                                        <div className="card-body p-0">
                                            <p className="card-text mb-0 mt-2">
                                                <b>{newsItem.title}</b>
                                            </p>
                                            <div className="card-text mb-2 " dangerouslySetInnerHTML={{ __html: newsItem.description }} />
                                            <div className="d-flex gap-1 mb-0">
                                                <button
                                                    className="btn btn-success btn-sm fs-12"
                                                    onClick={() =>
                                                        updateHandler(newsItem)
                                                    }
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm fs-12"
                                                    onClick={() =>
                                                        deleteHandler(
                                                            newsItem._id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-md-12">
                                <h6>No News Found</h6>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

Studio.getLayout = function getLayout(page: ReactNode) {
    return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps: GetServerSideProps = async () => {
    const { data } = await instance.get<{ data: INews[]; }>('/info/news');

    return {
        props: {
            news: data.data,
        },
    };
};

export default Studio;
