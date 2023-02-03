import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import articles from './article-content';
import NotFoundPage from './NotFoundPage';

const ArticlePage = () => {
    const { name } = useParams();
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });

    const article = articles.find(article => article.name === name);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`/api/articles/${name}`);
            const body = await result.json();
            setArticleInfo(body);
        };
        
        fetchData();
    }, [name]);

    if (!article) return (<NotFoundPage />);

    return (
        <>
        <h1>{ article.title }</h1>
        <p>This post has been upvoted { articleInfo.upvotes } times</p>
        { 
            article.content.map((paragraph, key) => (<p key={ key }>{ paragraph }</p>))
        }
        </>
    );
}

export default ArticlePage;
