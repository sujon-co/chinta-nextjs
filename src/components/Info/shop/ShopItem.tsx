import { FC, Fragment, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Modal from 'react-modal';
import MyImage from 'src/components/Image';
import { ShopItem } from 'src/pages/info';

interface IShopItemProps {
    shop: ShopItem;
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        width: '80%',
        height: '95%',
        zIndex: '101',
    },
};

Modal.setAppElement('#__next');

const ShopItem: FC<IShopItemProps> = ({ shop }) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <Fragment>
            <div className="row mb-3 shop-item">
                <div className="col-md-3">
                    <MyImage
                        src={shop.images[0].photoUrl}
                        alt={shop.title}
                        layout="responsive"
                        placeholder="blur"
                        blurDataURL={shop.images[0].base64}
                        height={shop.images[0].height}
                        width={shop.images[0].width}
                    />
                </div>
                <div className="col-md-9">
                    <div className="shop-item-content">
                        <h6>{shop.title}</h6>
                        <p> Price: ৳{shop.price}  200
                            {shop.previousPrice && <span className="text-secondary text-decoration-line-through ms-2"> ৳{shop.previousPrice} </span>}
                        </p>
                        <p> {shop.shortDescription} </p>
                        <span className="see-more" onClick={openModal} >See More</span>
                    </div>
                </div>

            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="text-danger close-btn" onClick={closeModal} >
                    <FaTimes />
                </div>
                <div className="row mb-3 shop-item">
                    <div className="col-md-5">
                        <div className="row g-3">
                            <div className="col-12">
                                <MyImage
                                    src={shop.images[0].photoUrl}
                                    alt={shop.title}
                                    layout="responsive"
                                    placeholder="blur"
                                    blurDataURL={shop.images[0].base64}
                                    height={shop.images[0].height}
                                    width={shop.images[0].width}
                                />
                            </div>
                            {shop.images.slice(1).length > 0 && shop.images.slice(1).map((image, index) => (
                                <div className="col-6" key={index}>
                                    <MyImage
                                        src={image.photoUrl}
                                        alt={shop.title}
                                        layout="responsive"
                                        placeholder="blur"
                                        blurDataURL={image.base64}
                                        height={image.height}
                                        width={image.width}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="shop-item-content">
                            <h6>{shop.title}</h6>
                            <p> <b>Price: ৳{shop.price} 200</b>
                                {shop.previousPrice && <span className="text-secondary text-decoration-line-through ms-2"> ৳{shop.previousPrice} </span>}
                            </p>
                            <p> {shop.shortDescription} </p>
                            <p> Estimated Shipping Time: 5-7 days</p>
                            <a href="tel:+01980653626"> <b>Buy Book (Contact)</b> </a>
                        </div>
                    </div>
                </div>
            </Modal>
        </Fragment>
    );
};

export default ShopItem;