import React, { useState, useEffect } from 'react';
import ArticlesList from '../components/ArticlesList';

const ArticlesListPage= () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const result = await fetch(`/api/articles`);
            const body = await result.json();
            setArticles(body);
            setLoading(false)
        };

        fetchData();
    }, []);

    if (loading) return (<h1>Loading...</h1> );

    return (
            <>
                <h1>Articles</h1>
                <ArticlesList articles={ articles } />
            </>
    );
}

export default ArticlesListPage;
