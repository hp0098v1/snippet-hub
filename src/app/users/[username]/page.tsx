import React from 'react';

const UserProfile = ({ params }) => {
    const { username } = params;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">Profile of {username}</h1>
            <p className="mt-2">Here you can view the public snippets shared by {username}.</p>
            {/* Add logic to fetch and display user's public snippets here */}
        </div>
    );
};

export default UserProfile;