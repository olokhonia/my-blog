import React from "react";

const ContentSection = ({ content }) => {
    return (
            content.map((paragraph, key) => (<p key={ key }>{ paragraph }</p>))
    );
}

export default ContentSection;
