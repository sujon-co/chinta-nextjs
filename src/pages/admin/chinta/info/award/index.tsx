import { Types } from 'mongoose';
import { ReactNode } from 'react';
import AdminLayout from 'src/components/Admin/AdminLayout';

export interface IAboutWithImagePlaceholder {
    base64: string;
    _id: Types.ObjectId;
    photoUrl: string;
    bio: string;
    alt: string;
    src: string;
    height: number;
    width: number;
    type?: string | undefined;
}

interface AboutProps {

}

const About = ({ }: AboutProps) => {

    return (
        <div className="card">
            <div className="card-body">
                Award Page
            </div>
        </div>
    );
};

About.getLayout = function getLayout(page: ReactNode) {
    return <AdminLayout>{page}</AdminLayout>;
};

// export const getServerSideProps: GetServerSideProps = async () => {
//     const { data } = await instance.get<{ data: IAbout[]; }>('/info/about');
//     const about = data.data[0];

//     const { base64, img } = await getPlaiceholder(`${config.imageUploadUrl}${about.photoUrl}`);
//     return {
//         props: {
//             about: {
//                 ...img,
//                 ...about,
//                 base64: base64,
//             },
//         },
//     };
// };

export default About;
