import { NextPage } from 'next';
import Image from 'next/image';
import aboutImage from '/public/about/about.jpg';

interface Props {}

const About: NextPage<Props> = () => {
    return (
        <div className="row">
            <div className="col-md-4">
                <div className="about-img">
                    <Image
                        src={aboutImage}
                        alt="about img"
                        layout="responsive"
                    />
                </div>
            </div>
            <div className="col-md-7">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
                necessitatibus explicabo dolore, porro esse ab ipsa, assumenda
                tempore deserunt iusto sed nam quae quidem tempora velit!
                Adipisci hic molestiae fugiat ea, vero eaque similique
                accusantium, veniam quas quis ipsam optio ducimus reiciendis.
                Rerum, consequatur voluptates. A natus quos error soluta
                distinctio quidem sint cumque odio, velit deleniti consectetur,
                earum est, ratione aut sunt tempora. Eaque repellat hic
                molestiae voluptas sit, placeat fugiat cupiditate error delectus
                nam, beatae ipsa assumenda temporibus ad ab nobis consequuntur
                facere. Laboriosam, quasi libero beatae voluptas tenetur
                accusamus laborum blanditiis accusantium officiis pariatur
                officia, repellendus delectus suscipit ab magni explicabo
                obcaecati? Accusamus, ratione eius ex beatae sit quia architecto
                assumenda repellendus aliquid laborum dolorem, esse nihil iure
                dicta ea itaque fuga ipsa facere soluta maxime corrupti suscipit
                reiciendis consequuntur. Cupiditate expedita aperiam inventore
                dolore voluptate possimus earum voluptatum molestias nihil
                placeat fugit totam, velit, quos veniam sed. Voluptates
                distinctio facilis doloremque expedita provident placeat illum
                quia, dicta ipsum quasi tempora quod quam modi harum pariatur
                sint! Commodi nemo provident in numquam harum ipsum sit
                cupiditate! Adipisci minima laudantium atque vitae voluptates
                unde omnis earum ut aliquid molestiae? Recusandae, suscipit
                facilis sed dolorum fugit veritatis? Sapiente, sequi.
            </div>
        </div>
    );
};

export default About;
