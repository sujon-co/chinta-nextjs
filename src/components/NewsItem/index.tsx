import { FC } from 'react';
import { INews } from 'server/interface';
import MyImage from '../Image';

interface INewsItemProps {
    news: INews;
}

const NewsItem: FC<INewsItemProps> = ({ news }) => {
    return <div className="news-item">
        <a href={news.url}>
            <MyImage
                src={news.image}
                alt={news.title}
                layout="responsive"
                placeholder="blur"
                height={550}
                width={1000}
            />
        </a>
        <h5 className='mb-1 pt-2'>
            <a href={news.url}>{news.title} </a>
        </h5>
        <p> {news.description} </p>
    </div>;
};

export default NewsItem;
