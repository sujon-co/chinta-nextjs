import { GetServerSideProps } from 'next';
import { ReactNode, useState } from 'react';
import { IContact } from 'server/interface';
import instance from 'src/api/httpService';
import AddContact from 'src/components/Admin/AddContact';
import AdminLayout from 'src/components/Admin/AdminLayout';



interface ContactProps {
    contact: IContact;
}

const Contact = ({ contact }: ContactProps) => {
    const [isUpdate, setIsUpdate] = useState(false);

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">Contact</h5>
                {!isUpdate && (
                    <div
                        className="btn btn-dark btn-sm"
                        onClick={() => setIsUpdate(true)}
                    >
                        Update
                    </div>
                )}
            </div>
            <div className="card-body">
                {isUpdate && (
                    <AddContact
                        isUpdate={isUpdate}
                        contact={contact}
                        setIsUpdate={setIsUpdate}
                    />
                )}
                {!isUpdate && (
                    <div className="row">
                        <li className='d-flex gap-2 mb-2'>
                            <b>Text:</b>
                            <div>{contact.text}</div>
                        </li>
                        <li className='d-flex gap-2 mb-2'>
                            <b>Phone:</b>
                            <div>{contact.phone}</div>
                        </li>
                        <li className='d-flex gap-2 mb-2'> <b>Email:</b> <div>{contact.email} </div> </li>
                        <li className='d-flex gap-2 mb-2'> <b>Address:</b> <div dangerouslySetInnerHTML={{ __html: contact.address }} ></div> </li>
                    </div>
                )}
            </div>
        </div>
    );
};

Contact.getLayout = function getLayout(page: ReactNode) {
    return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps: GetServerSideProps = async () => {
    const { data } = await instance.get<{ data: IContact[]; }>('/contact');
    const contact = data.data[0];

    return {
        props: {
            contact
        },
    };
};

export default Contact;
