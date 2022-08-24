import { FC } from 'react';
import { NewsItem } from 'src/pages/info';
import MyImage from '../Image';

interface INewsItemProps {
    news: NewsItem;
}


const NewsItem: FC<INewsItemProps> = ({ news }) => {
    return <div className="mb-5">
        <a href={news.url}>
            <MyImage
                src={news.image}
                alt={news.title}
                layout="responsive"
                placeholder="blur"
                blurDataURL={news.base64}
                height={news.height}
                width={news.width}
            />
        </a>
        <h5 className='mb-1 pt-2'>
            <a href={news.url}>{news.title} </a>
        </h5>
        <p> {news.description} </p>
    </div>;
};

export default NewsItem;
