import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import aboutImage from '/public/about/about.jpg';

interface Props { }
const About: NextPage<Props> = () => {
    return (
        <div className="row">
            <div className="col-md-5 col-lg-4">
                <div className="about-img">
                    <Image
                        src={aboutImage}
                        alt="about img"
                        layout="responsive"
                    />
                </div>
            </div>
            <div className="col-md-7">
                <div className="d-flex align-items-center justify-content-center h-100 ">
                    <div className="">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quod necessitatibus explicabo dolore, porro esse ab
                        ipsa, assumenda tempore deserunt iusto sed nam quae
                        quidem tempora velit! Adipisci hic molestiae fugiat ea,
                        vero eaque similique accusantium, veniam quas quis ipsam
                        optio ducimus reiciendis. Rerum, consequatur voluptates.
                        A natus quos error soluta distinctio quidem sint cumque
                        odio, velit deleniti consectetur, earum est, ratione aut
                        sunt tempora. Eaque repellat hic molestiae voluptas sit,
                        placeat fugiat cupiditate error delectus nam, beatae
                        ipsa assumenda temporibus ad ab nobis consequuntur
                        facere. Laboriosam, quasi libero beatae voluptas tenetur
                        accusamus laborum blanditiis accusantium officiis
                        pariatur officia, repellendus delectus suscipit ab magni
                        explicabo obcaecati? Accusamus, ratione eius ex beatae
                        sit quia architecto assumenda repellendus aliquid
                        laborum dolorem, esse nihil iure dicta ea itaque fuga
                    </div>
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {}
    }
}


export default About;
