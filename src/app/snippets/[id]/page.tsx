import React from 'react';

const CodeDetails = ({ params }) => {
    const { id } = params;

    // Fetch the code snippet details based on the ID
    // This is a placeholder for the actual data fetching logic
    const snippet = {
        id: id,
        title: 'Sample Code Snippet',
        code: 'console.log("Hello, World!");',
        description: 'This is a sample code snippet for demonstration purposes.',
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">{snippet.title}</h1>
            <p className="mt-2 text-gray-600">{snippet.description}</p>
            <pre className="mt-4 bg-gray-100 p-4 rounded">
                <code>{snippet.code}</code>
            </pre>
        </div>
    );
};

export default CodeDetails;