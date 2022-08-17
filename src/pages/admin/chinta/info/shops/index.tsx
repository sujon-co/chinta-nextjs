import { Types } from 'mongoose';
import { GetServerSideProps } from 'next';
import { ReactNode, useState } from 'react';
import toast from 'react-hot-toast';
import { IShop } from 'server/interface';
import instance from 'src/api/httpService';
import AddShop from 'src/components/Admin/AddShop';
import AdminLayout from 'src/components/Admin/AdminLayout';


interface ShopProps {
    shops: IShop[];
}

const Shops = ({ shops }: ShopProps) => {
    const [isAdd, setIsAdd] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [shop, setShop] = useState<IShop>({} as IShop);

    const deleteHandler = async (id: Types.ObjectId) => {
        const sure = window.confirm('Are you sure!!');
        if (sure) {
            const { data } = await instance.delete<{ message: string; }>(`/info/awards/${id}`);
            if (data.message) {
                toast.success(data.message);
                window.location.reload();
            }
        }
    };
    const updateHandler = (shop: IShop) => {
        setIsAdd(true);
        setIsUpdate(true);
        setShop(shop);
    };

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center  ">
                <h5 className="card-title mb-0">Shop</h5>
                {!isAdd && (
                    <div
                        className="btn btn-dark btn-sm"
                        onClick={() => {
                            setIsAdd(true);
                            setIsUpdate(false);
                        }}
                    >
                        Add Shop
                    </div>
                )}
            </div>
            <div className="card-body">
                {isAdd && (
                    <AddShop
                        isUpdate={isUpdate}
                        shop={shop}
                        setIsAdd={setIsAdd}
                    />
                )}
                {!isAdd && (
                    <div className="row">
                        <ol className="list-group list-group-numbered">
                            <pre>{JSON.stringify(shops, null, 4)} </pre>
                            {/* {awards.map((award: IAward) => (
                                <li className="list-group-item" key={award.awardName}>
                                    <div className="d-flex gap-2">
                                        <span> {award.year} </span>
                                        <span> {award.awardName} </span>
                                        <a href={award.programUrl} target="_blank" rel="noreferrer">
                                            {award.programName}
                                        </a>
                                        <span> Organized by</span>
                                        <a href={award.organizationUrl} target="_blank" rel="noreferrer"> {award.organizedBy} </a>
                                        <div className="d-flex gap-1 mb-0">
                                            <button
                                                className="btn btn-success btn-sm fs-12"
                                                onClick={() => updateHandler(shop)}
                                            >
                                                Update
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm fs-12"
                                                onClick={() => deleteHandler(shop._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))} */}
                        </ol>
                    </div>
                )}
            </div>
        </div>
    );
};

Shops.getLayout = function getLayout(page: ReactNode) {
    return <AdminLayout>{page}</AdminLayout>;
};
export const getServerSideProps: GetServerSideProps = async () => {
    const { data } = await instance.get<{ data: IShop[]; }>('/info/shops');

    return {
        props: {
            shops: data.data
        },
    };
};
export default Shops;
