import MyImage from "../Image";

interface ImageProps {
    img: { src: string; photoUrl: string; };
    index: number;
    setIndex: (index: number) => void;
    alt: string;
}

const GalleryImage = ({ img, setIndex, index, alt }: ImageProps) => {
    return (
        <MyImage
            src={img.photoUrl}
            className="gallery-image"
            alt={alt}
            layout="fixed"
            placeholder="blur"
            height={100}
            width={130}
            onClick={() => setIndex(index)}
            objectFit="cover"
        />
    );
};

export default GalleryImage;