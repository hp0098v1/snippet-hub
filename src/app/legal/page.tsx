import React from 'react';

const LegalPage = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Terms of Service</h1>
            <p className="mt-2">
                Welcome to SnippetHub! By using our platform, you agree to the following terms...
            </p>
            {/* Add more terms of service content here */}

            <h1 className="text-2xl font-bold mt-6">Privacy Policy</h1>
            <p className="mt-2">
                Your privacy is important to us. This policy outlines how we handle your data...
            </p>
            {/* Add more privacy policy content here */}
        </div>
    );
};

export default LegalPage;