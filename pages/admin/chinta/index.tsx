import AdminLayout from 'components/Admin/AdminLayout';
import { ReactElement } from 'react';

interface IProps {
    message: string;
}

const Dashboard = ({}: IProps) => {
    return <h3>Welcome to dashboard </h3>;
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default Dashboard;
