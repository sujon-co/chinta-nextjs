import { FC } from 'react';
import { INews } from 'server/interface';
import MyImage from '../Image';

interface INewsItemProps {
    news: INews;
}

const NewsItem: FC<INewsItemProps> = ({ news }) => {
    return <div className="news-item">
        <a href={news.url} target="_blank" rel="noopener noreferrer">
            <MyImage
                src={news.image}
                alt={news.title}
                layout="responsive"
                placeholder="blur"
                height={550}
                width={1000}
            />
        </a>
        <h6 className='mb-1 pt-2'>
            <a href={news.url} target="_blank" rel="noopener noreferrer">
                {news.title}
            </a>
        </h6>
        <div dangerouslySetInnerHTML={{ __html: news.description }} />
    </div>;
};

export default NewsItem;
