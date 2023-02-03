import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import articles from './article-content';
import NotFoundPage from './NotFoundPage';
import CommentsList from '../components/CommentsList';
import UpvotesSection from '../components/UpvotesSection';
import AddCommentForm from '../components/AddCommentForm';

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
    }, [name, articleInfo]);

    if (!article) return (<NotFoundPage />);

    return (
        <>
        <h1>{ article.title }</h1>
        <UpvotesSection articleName={ name } upvotes={ articleInfo.upvotes } setArticleInfo={ setArticleInfo } />

        { 
            article.content.map((paragraph, key) => (<p key={ key }>{ paragraph }</p>))
        }
        <CommentsList comments={ articleInfo.comments } />
        <AddCommentForm articleName={ name } setArticleInfo={ setArticleInfo } />
        </>
    );
}

export default ArticlePage;
