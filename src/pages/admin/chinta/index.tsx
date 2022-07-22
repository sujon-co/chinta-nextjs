import { NextPageContext } from 'next';
import { ReactElement } from 'react';
import AdminLayout from 'src/components/Admin/AdminLayout';
import customFetch from 'src/services/customFetch';

interface IProps {
    message: string;
}

const Dashboard = ({ }: IProps) => {
    return <h3>Welcome to dashboard </h3>;
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps = async (ctx: NextPageContext) => {

    const res = await customFetch('/admin', 'POST', {}, ctx);


    return {
        props: {
            message: res.message || "",
        }
    };
};


export default Dashboard;

