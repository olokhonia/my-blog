import React from "react";
import { Link } from 'react-router-dom';

const ArticlesList = ({ articles }) => {
    if (!articles.length) return (<p>There is no any articles yet.</p>);

    return (
        articles.map((article, key) => (
            <Link 
                className="article-list-item" 
                to={ `/article/${article.name}` } 
                key={ key }>
                    <h3>{ article.title }</h3>
                    <p>{ article.content[0].substring(0, 150) }...</p>
            </Link>
        ))
    );
}

export default ArticlesList;
