import React from 'react';

const CommentsList = ({ comments }) => {
    return (
        <>
            <h3>Comments</h3>
                    { 
                        comments.length ?
                            comments.map((comment, key) => (
                                <div className='comment' key={ key }>
                                    <h4>{ comment.username }</h4>
                                    <p>{ comment.text }</p>
                                </div>
                            ))
                    :
                        <p>There is no any comments yet</p>
                    }
        </>
    );
};

export default CommentsList;
