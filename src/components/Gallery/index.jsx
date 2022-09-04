import { useCallback, useState } from 'react';
import Carousel, { Modal, ModalGateway } from 'react-images';
import Gallery from 'react-photo-gallery';

export const photos = [
    {
        src: '/sliders/1.jpg',
        width: 1,
        height: 1,
    },
    {
        src: '/sliders/2.jpg',
        width: 1,
        height: 1,
    },
    {
        src: '/sliders/3.jpg',
        width: 1,
        height: 1,
    },
    {
        src: '/sliders/4.jpg',
        width: 1,
        height: 1,
    },
    {
        src: '/sliders/5.jpg',
        width: 1,
        height: 1,
    },
    {
        src: '/sliders/6.jpg',
        width: 1,
        height: 1,
    },
    {
        src: '/sliders/7.jpg',
        width: 1,
        height: 1,
    },
    {
        src: '/sliders/8.jpg',
        width: 1,
        height: 1,
    },
    {
        src: '/sliders/10.jpg',
        width: 1,
        height: 1,
    },
];

const GalleryView = ({ gallery }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const openLightbox = useCallback(
        (event, { photo, index }) => {
            setCurrentImage(index);
            setViewerIsOpen(true);
        },
        []
    );

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };
    return (
        <div className='container'>
            <h4 className='my-3' >Project Gallery</h4>
            <Gallery photos={gallery} onClick={openLightbox} />
            <ModalGateway>
                {viewerIsOpen ? (
                    <Modal onClose={closeLightbox}>
                        <Carousel
                            currentIndex={currentImage}
                            views={gallery.map((x) => ({
                                ...x,
                                srcset: x.srcSet,
                                caption: x.title,
                            }))}
                        />
                    </Modal>
                ) : null}
            </ModalGateway>
        </div>
    );
};

export default GalleryView;
