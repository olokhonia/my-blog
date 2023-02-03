import React from 'react';
import { useParams } from 'react-router-dom';
import articles from './article-content';
import NotFoundPage from './NotFoundPage';

const ArticlePage = () => {
    const { name } = useParams();
    const article = articles.find(article => article.name === name);

    if (!article) return (<NotFoundPage />);

    return (
        <>
        <h1>{ article.title }</h1>
        { 
            article.content.map((paragraph, key) => (<p key={ key }>{ paragraph }</p>))
        }
        </>
    );
}

export default ArticlePage;
