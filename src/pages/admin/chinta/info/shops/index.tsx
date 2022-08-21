import { Types } from 'mongoose';
import { GetServerSideProps } from 'next';
import { getPlaiceholder } from 'plaiceholder';
import { ReactNode, useState } from 'react';
import toast from 'react-hot-toast';
import { IShop } from 'server/interface';
import instance from 'src/api/httpService';
import AddShop from 'src/components/Admin/AddShop';
import AdminLayout from 'src/components/Admin/AdminLayout';
import MyImage from 'src/components/Image';
import { config } from 'src/config';
import { ShopItem } from 'src/pages/info';

interface ShopProps {
    shops: ShopItem[];
}

const Shops = ({ shops }: ShopProps) => {
    const [isAdd, setIsAdd] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [shop, setShop] = useState<ShopItem>({} as ShopItem);

    const deleteHandler = async (id: Types.ObjectId) => {
        const sure = window.confirm('Are you sure!!');
        if (sure) {
            const { data } = await instance.delete<{ message: string }>(
                `/info/shops/${id}`
            );
            if (data.message) {
                toast.success(data.message);
                window.location.reload();
            }
        }
    };
    const updateHandler = (shop: ShopItem) => {
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
                    <div className="">
                        <div className="table-responsive">
                            <table className="table">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Image</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {shops.map((shop) => (
                                        <tr key={shop.title}>
                                            <td>{shop.title} </td>
                                            <td>৳ {shop.currentPrice} </td>
                                            <td>
                                                <MyImage
                                                    src={
                                                        shop.images[0].photoUrl
                                                    }
                                                    alt={shop.title}
                                                    layout="fixed"
                                                    placeholder="blur"
                                                    blurDataURL={
                                                        shop.images[0].base64
                                                    }
                                                    height={50}
                                                    width={50}
                                                />
                                            </td>
                                            <td>
                                                <div className="d-flex gap-1 mb-0">
                                                    <button
                                                        className="btn btn-success btn-sm fs-12"
                                                        onClick={() =>
                                                            updateHandler(shop)
                                                        }
                                                    >
                                                        Update
                                                    </button>
                                                    <button
                                                        className="btn btn-danger btn-sm fs-12"
                                                        onClick={() =>
                                                            deleteHandler(
                                                                shop._id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
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
    const { data } = await instance.get<{ data: IShop[] }>('/info/shops');
    const shops = await Promise.all(
        data.data.map(async (shop) => {
            const images = await Promise.all(
                shop.images.map(async (image) => {
                    const { base64, img } = await getPlaiceholder(
                        `${config.imageUploadUrl}${image}`
                    );
                    const obj = {
                        ...img,
                        base64: base64,
                        photoUrl: image,
                    };
                    return obj;
                })
            );
            return {
                ...shop,
                images,
            };
        })
    );
    return {
        props: {
            shops,
        },
    };
};
export default Shops;
