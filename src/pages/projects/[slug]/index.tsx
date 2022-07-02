import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import GalleryView from 'src/components/Gallery';
import Layout from 'src/components/Layout';

interface Props {}

const ProjectDetails: NextPage<Props> = () => {
    const [showMore, setShowMore] = useState(false);

    return (
        <>
            <Head>
                <title>Aloks&apos;s Vacation House</title>
            </Head>
            <Layout>
                <section className="project-details-section">
                    <div className="container mx-auto">
                        <div className="row">
                            <div className="col-12">
                                <Image
                                    src="/projects/17.jpeg"
                                    alt="alt"
                                    layout="responsive"
                                    height={250}
                                    width={400}
                                    objectFit="contain"
                                    className="img-fluid"
                                />

                                <div className="content">
                                    <h4>Aloks&apos;s Vacation House</h4>
                                    <div className="other">
                                        <b>Type:</b> Residential
                                    </div>
                                    <div className="other">
                                        <b>Status:</b> Idea
                                    </div>
                                    <div className="other">
                                        <b>Principal Archite</b>ct: Mahmudul
                                        Gani Kanak
                                    </div>
                                    <div className="other">
                                        <b>Deasign Team:</b> Argha Mitra
                                        Chowdhury Ahsan Habib Puja Bashak
                                    </div>
                                    <div className="other">
                                        <b>Landscape:</b> Majeda Tumpa
                                    </div>
                                    <div className="other">
                                        <b>Engineer:</b> Task
                                    </div>
                                    <div
                                        className="height-wrapper"
                                        style={{
                                            height: showMore ? 120 : 0,
                                        }}
                                    >
                                        <div className="other">
                                            <b>Task Construction Firm:</b>
                                            Anything Here
                                        </div>
                                        <div className="other">
                                            <b>Photograph: </b>
                                            Anything Here
                                        </div>
                                        <div className="other">
                                            <b>Location:</b> Bashundhara, Dhaka,
                                            Bangladesh
                                        </div>
                                        <div className="other">
                                            <b>Size:</b> 7200sft
                                        </div>
                                        <div className="other">
                                            <b>Year:</b>2021
                                        </div>
                                    </div>
                                    {!showMore && (
                                        <div
                                            className="show-more"
                                            onClick={() => setShowMore(true)}
                                        >
                                            Show More
                                        </div>
                                    )}
                                    {showMore && (
                                        <div
                                            className="show-less"
                                            onClick={() => setShowMore(false)}
                                        >
                                            Show Less
                                        </div>
                                    )}

                                    <div className="row g-3 mt-3 align-items-center">
                                        <div className="col-6 ">
                                            <p>
                                                Lorem ipsum dolor sit amet
                                                consectetur adipisicing elit.
                                                Quibusdam quos dolor tempora
                                                iusto ex nam fugiat veritatis,
                                                obcaecati rerum soluta et
                                                nostrum. Animi ab placeat
                                                corrupti quaerat repudiandae
                                                unde ullam, possimus quasi.
                                                Necessitatibus odio a nam?
                                                Aperiam quas nam quod suscipit
                                                at, exercitationem molestiae
                                                ratione, saepe distinctio
                                                aliquid illum tempora autem
                                                laboriosam odit, cumque iste
                                                architecto facilis eaque atque
                                                dolorem sapiente corrupti dicta
                                                debitis? Tempora possimus
                                                sapiente recusandae ex officia.
                                                Nostrum ullam architecto et
                                                dolorum impedit, consequuntur,
                                                quidem suscipit nulla facere hic
                                                a dolores exercitationem iure
                                                magni quos sit cupiditate!
                                                Placeat, atque? Explicabo vel,
                                                voluptate eveniet, reprehenderit
                                                obcaecati nisi natus molestiae
                                                qui accusantium mollitia
                                                debitis, quibusdam consectetur.
                                                Facilis est quae, voluptatem
                                                voluptates omnis perspiciatis,
                                                possimus aut eos eius dolores
                                                exercitationem? Lorem ipsum
                                                dolor sit amet, consectetur
                                                adipisicing elit. Ratione natus
                                                possimus tempore officiis
                                                eligendi minus iusto mollitia
                                                est consequuntur, a cumque
                                                repudiandae ab cum veritatis,
                                                eaque soluta corrupti labore
                                                vitae.
                                            </p>
                                        </div>
                                        <div className="col-6">
                                            <Image
                                                src="/projects/port.jpeg"
                                                layout="responsive"
                                                height={300}
                                                width={250}
                                                alt="project item"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="images">
                                    <div className="image-item">
                                        <Image
                                            src="/projects/18.jpeg"
                                            alt="alt"
                                            layout="responsive"
                                            height={250}
                                            width={400}
                                            objectFit="contain"
                                        />
                                    </div>
                                    <div className="image-item">
                                        <Image
                                            src="/projects/19.gif"
                                            alt="alt"
                                            layout="responsive"
                                            height={250}
                                            width={400}
                                            objectFit="contain"
                                        />
                                    </div>

                                    <div className="image-item">
                                        <Image
                                            src="/projects/20.jpeg"
                                            alt="alt"
                                            layout="responsive"
                                            height={250}
                                            width={400}
                                            objectFit="contain"
                                        />
                                    </div>
                                    <div className="image-item">
                                        <Image
                                            src="/projects/21.jpeg"
                                            alt="alt"
                                            layout="responsive"
                                            height={250}
                                            width={400}
                                            objectFit="contain"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <GalleryView />
                </section>
            </Layout>
        </>
    );
};

export default ProjectDetails;
