import { Types } from 'mongoose';
import { GetServerSideProps } from 'next';
import { ReactNode, useState } from 'react';
import toast from 'react-hot-toast';
import { IAward } from 'server/interface';
import instance from 'src/api/httpService';
import AddAward from 'src/components/Admin/AddAward';
import AdminLayout from 'src/components/Admin/AdminLayout';


interface AwardProps {
    awards: IAward[];
}

const Award = ({ awards }: AwardProps) => {
    const [isAdd, setIsAdd] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [award, setAward] = useState<IAward>({} as IAward);

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
    const updateHandler = (award: IAward) => {
        setIsAdd(true);
        setIsUpdate(true);
        setAward(award);

    };

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center  ">
                <h5 className="card-title mb-0">Award</h5>
                {!isAdd && (
                    <div
                        className="btn btn-dark btn-sm"
                        onClick={() => {
                            setIsAdd(true);
                            setIsUpdate(false);
                        }}
                    >
                        Add Award
                    </div>
                )}
            </div>
            <div className="card-body">
                {isAdd && (
                    <AddAward
                        isUpdate={isUpdate}
                        award={award}
                        setIsAdd={setIsAdd}
                    />
                )}
                {!isAdd && (
                    <div className="row">
                        <ol className="list-group list-group-numbered">
                            {awards.length > 0 ? awards.map((award: IAward) => (
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
                                                onClick={() => updateHandler(award)}
                                            >
                                                Update
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm fs-12"
                                                onClick={() => deleteHandler(award._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            )) : (
                                <h3> No Awards Founds</h3>
                            )}
                        </ol>
                    </div>
                )}
            </div>
        </div>
    );
};

Award.getLayout = function getLayout(page: ReactNode) {
    return <AdminLayout>{page}</AdminLayout>;
};
export const getServerSideProps: GetServerSideProps = async () => {
    const { data } = await instance.get<{ data: IAward[]; }>('/info/awards');

    return {
        props: {
            awards: data.data
        },
    };
};
export default Award;
