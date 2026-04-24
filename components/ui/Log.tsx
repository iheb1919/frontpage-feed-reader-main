"use client";

import { useEffect } from "react";

const LogSignature = () => {
    useEffect(() => {
        // Log the signature in the console
        console.log(
            `
      %c Created by %cIHEB MEJRI%c 
      LinkedIn: https://www.linkedin.com/in/ihebmejri/
      Email: ihebmejri14@gmail.com
      `,
            "color: gray;",
            "color: white; font-weight: bold; font-size: 16px;",
            "color: inherit;"
        );

        // Check if the comment already exists
        const existingComment = Array.from(document.body.childNodes).find(
            (node) =>
                node.nodeType === Node.COMMENT_NODE &&
                node.nodeValue?.includes("Created by IHEB MEJRI")
        );

        if (!existingComment) {
            // Create and inject the comment if it doesn't exist
            const signatureComment = document.createComment(`
      Created by IHEB MEJRI
      LinkedIn: https://www.linkedin.com/in/ihebmejri/
      Email: ihebmejri14@gmail.com
      `);
            document.body.prepend(signatureComment);
        }
    }, []);

    return null; // This component renders nothing
};

export default LogSignature;