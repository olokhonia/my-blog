import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import CommentsList from '../components/CommentsList';
import UpvotesSection from '../components/UpvotesSection';
import ContentSection from '../components/ContentSection';
import AddCommentForm from '../components/AddCommentForm';

const ArticlePage = () => {
    const { name } = useParams();
    const [articleInfo, setArticleInfo] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const result = await fetch(`/api/articles/${name}`);
            const body = await result.json();
            setArticleInfo(body);
            setLoading(false);
        };
        
        fetchData();
    }, [name]);

    if (!articleInfo) return (<NotFoundPage />);
    if (loading) return (<h1>Loading...</h1>);

    return (
        <>
            <h1>{ articleInfo.title }</h1>
            <UpvotesSection articleName={ name } upvotes={ articleInfo.upvotes } setArticleInfo={ setArticleInfo } />
            <ContentSection content={ articleInfo.content } />
            <CommentsList comments={ articleInfo.comments } />
            <AddCommentForm articleName={ name } setArticleInfo={ setArticleInfo } />
        </>
    );
}

export default ArticlePage;
