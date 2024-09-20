import React from 'react';

const LandingPage: React.FC = () => {
    return (
        <div className="text-white grid grid-cols-6">
            <div className='col-span-1 hidden md:block'></div>
            <div className='col-span-6 md:col-span-4 p-4'>
                <section className="features-section my-5">
                    <h2 className="text-2xl font-bold mb-4">Why Choose MGZAW.com?</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="feature-item p-4 border rounded shadow">
                            <h3 className="text-2xl font-semibold">Extensive Library</h3>
                            <p>
                                Enjoy access to a vast collection of adult movies, including the latest releases and classic favorites, all curated for your viewing pleasure.
                            </p>
                        </div>

                        <div className="feature-item p-4 border rounded shadow">
                            <h3 className="text-2xl font-semibold">High-Quality Streaming</h3>
                            <p>
                                Experience crystal-clear streaming with multiple resolutions available to suit your device and internet speed. Enjoy buffering-free viewing anytime, anywhere.
                                The MGZAW team is always updating and adding more porn videos every day. It's all here and 100% free porn.
                            </p>
                        </div>

                        <div className="feature-item p-4 border rounded shadow">
                            <h3 className="text-2xl font-semibold">User-Friendly Interface</h3>
                            <p>
                                Navigate easily through our intuitive platform. Discover content with advanced search features, personalized recommendations, and curated collections.
                            </p>
                        </div>

                        <div className="feature-item p-4 border rounded shadow">
                            <h3 className="text-2xl font-semibold">Privacy and Security</h3>
                            <p>
                                Your privacy is our top priority. We use advanced encryption to protect your information while you enjoy your viewing experience.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="call-to-action-section my-10 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Start Streaming?</h2>
                    {/* <p className="mb-4">
                        Sign up today and unlock unlimited access to the best adult content available online!
                    </p> */}
                    <a href="/feed" className="mt-6 inline-block bg-primary text-white px-4 py-2 rounded">
                        Get Started Now
                    </a>
                </section>

                <section className="how-it-works-section my-10">
                    <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                    <ol className="list-decimal list-inside my-4">
                        <li><strong>Browse:</strong> Explore our extensive library of adult content tailored to your preferences.</li>
                        <li><strong>Watch:</strong> Stream your favorite movies instantly on any device.</li>
                    </ol>
                </section>

                <section className="community-section my-10">
                    <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
                    <p>
                        Connect with fellow viewers and share your thoughts on your favorite content. Join discussions, participate in polls, and enjoy exclusive member-only features.
                    </p>
                </section>


            </div>
            <div className='col-span-1 hidden md:block'></div>
        </div>
    );
};

export default LandingPage;
