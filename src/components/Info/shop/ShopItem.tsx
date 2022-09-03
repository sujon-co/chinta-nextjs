import { FC, Fragment, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Modal from 'react-modal';
import { IShop } from 'server/interface';
import MyImage from 'src/components/Image';

interface IShopItemProps {
    shop: IShop;
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
            <div className="row mb-4 shop-item">
                <div className="col-md-2">
                    <MyImage
                        src={shop.images[0]}
                        alt={shop.title}
                        layout="responsive"
                        placeholder="blur"
                        width={200}
                        height={160}
                    />
                </div>
                <div className="col-md-9">
                    <div className="shop-item-content">
                        <h6>{shop.title}</h6>
                        <p>
                            Price: ৳{shop.currentPrice}
                            {shop.previousPrice && (
                                <span className="text-secondary text-decoration-line-through ms-2">
                                    ৳{shop.previousPrice}
                                </span>
                            )}
                        </p>
                        <div dangerouslySetInnerHTML={{ __html: shop.shortDescription }} />
                        <span className="see-more" onClick={openModal}>
                            See More
                        </span>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="text-danger close-btn" onClick={closeModal}>
                    <FaTimes />
                </div>
                <div className="row mb-3 shop-item">
                    <div className="col-md-4">
                        <div className="row g-3">
                            <div className="col-12">
                                <MyImage
                                    src={shop.images[0]}
                                    alt={shop.title}
                                    layout="responsive"
                                    placeholder="blur"
                                    height={200}
                                    width={200}
                                />
                            </div>
                            {shop.images.slice(1).length > 0 &&
                                shop.images.slice(1).map((image, index) => (
                                    <div className="col-6" key={index}>
                                        <MyImage
                                            src={image}
                                            alt={shop.title}
                                            layout="responsive"
                                            placeholder="blur"
                                            height={200}
                                            width={200}
                                        />
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="shop-item-content">
                            <h6>
                                <a href="#" target="_blank">
                                    {shop.title}
                                </a>
                            </h6>
                            <p>
                                <b>Price: ৳{shop.currentPrice} 200</b>
                                {shop.previousPrice && (
                                    <span className="text-secondary text-decoration-line-through ms-2">
                                        ৳{shop.previousPrice}
                                    </span>
                                )}
                            </p>
                            <div dangerouslySetInnerHTML={{ __html: shop.description || "" }} />
                            <p> Estimated Shipping Time: 5-7 days</p>
                            <a href="tel:+01980653626">
                                <b>Buy Book (Contact)</b>
                            </a>
                        </div>
                    </div>
                </div>
            </Modal>
        </Fragment>
    );
};

export default ShopItem;
