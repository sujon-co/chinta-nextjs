import { useCallback, useState } from 'react';
import Carousel, { Modal, ModalGateway } from 'react-images';
import Gallery from 'react-photo-gallery';


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
        <div className='container mb-4'>
            <h4 className='my-3' >Project Gallery</h4>
            {gallery.length > 0 ? (
                <>
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
                </>
            ) : <div>No  Gallery Images Found</div>}
        </div>
    );
};

export default GalleryView;
