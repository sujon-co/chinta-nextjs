import { GetServerSideProps } from 'next';
import { ReactNode, useState } from 'react';
import toast from 'react-hot-toast';
import { APIResponse, IApply } from 'server/interface';
import instance from 'src/api/httpService';
import AdminLayout from 'src/components/Admin/AdminLayout';
import ViewApplier from 'src/components/Admin/ViewApplier';
import { config } from 'src/config';



interface ApplyProps {
    apply: IApply[];
}

const Contact = ({ apply }: ApplyProps) => {
    const [applier, setApplier] = useState<IApply>({} as IApply);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const deleteHandler = async (id: any) => {
        const sure = window.confirm('Are you sure!!');
        if (sure) {
            const { data } = await instance.delete<{ message: string; }>(`/apply/${id}`);
            if (data.message) {
                toast.success(data.message);
                window.location.reload();
            }
        }
    };
    const viewHandler = (_applier: IApply) => {
        openModal();
        setApplier(_applier);
    };

    const viewHandlerClose = () => {
        closeModal();
        setApplier({} as IApply);
    };



    console.log({ applier });
    return (
        <>
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="card-title mb-0">Appliers</h5>
                </div>
                <div className="card-body">
                    <div className="pe-3" style={{ height: '70vh', overflowY: 'auto' }}>
                        <div className="table-responsive modified-table">
                            <table className="table">
                                <thead className="table-dark">
                                    <tr>
                                        <th>SN</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Phone</th>
                                        <th scope="col">Position</th>
                                        <th scope="col">PDF</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {apply.length > 0 ? (
                                        apply.map((applier) => (
                                            <tr key={Math.random()}>
                                                <td style={{ minWidth: '40px' }}>  1</td>
                                                <td> {applier.name} </td>
                                                <td> {applier.email} </td>
                                                <td>{applier.phone}</td>
                                                <td> {applier.position} </td>
                                                <td> <a href={config.imageUploadUrl + applier.file} target="_blank" rel="noopener noreferrer">Download</a> </td>
                                                <td>
                                                    <div className="d-flex gap-1 mb-0">
                                                        <button
                                                            type='button'
                                                            className="btn btn-success btn-sm fs-12"
                                                            onClick={() => viewHandler(applier)}
                                                        >
                                                            View
                                                        </button>
                                                        <button
                                                            className="btn btn-danger btn-sm fs-12"
                                                            onClick={() => deleteHandler(applier._id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) :
                                        <h6 className='p-3'>Nobody Apply</h6>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <ViewApplier modalIsOpen={isModalOpen} closeModal={viewHandlerClose} applier={applier} />
        </>
    );
};

Contact.getLayout = function getLayout(page: ReactNode) {
    return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps: GetServerSideProps = async () => {
    const { data } = await instance.get<APIResponse<IApply[]>>('/apply');
    const apply = data.data;

    return {
        props: {
            apply
        },
    };
};

export default Contact;
