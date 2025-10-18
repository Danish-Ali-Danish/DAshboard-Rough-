

import React, { useState, useMemo } from 'react';
import { Review, ReviewStatus } from '../types';
import { MOCK_REVIEWS } from '../constants';

const getStatusClass = (status: ReviewStatus) => {
    switch (status) {
        case ReviewStatus.Approved: return 'bg-emerald/20 text-emerald border-emerald/30';
        case ReviewStatus.Pending: return 'bg-teal-500/20 text-teal-400 border-teal-500/30';
        case ReviewStatus.Rejected: return 'bg-red-500/20 text-red-400 border-red-500/30';
        default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
};

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex">
        {[...Array(5)].map((_, i) => (
            <svg key={i} className={`w-5 h-5 ${i < rating ? 'text-gold' : 'text-gray-400 dark:text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.445a1 1 0 00-.364 1.118l1.287 3.955c.3.921-.755 1.688-1.539 1.118l-3.365-2.445a1 1 0 00-1.175 0l-3.365 2.445c-.784.57-1.838-.197-1.539-1.118l1.287-3.955a1 1 0 00-.364-1.118L2.35 9.382c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
            </svg>
        ))}
    </div>
);

interface ReviewsPageProps {
    searchTerm: string;
}

const ReviewsPage: React.FC<ReviewsPageProps> = ({ searchTerm }) => {
    const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
    const [filter, setFilter] = useState<ReviewStatus | 'All'>('All');
    
    const handleStatusChange = (reviewId: string, newStatus: ReviewStatus) => {
        setReviews(reviews.map(r => r.id === reviewId ? { ...r, status: newStatus } : r));
    };

    const filteredReviews = useMemo(() => {
        let tempReviews = filter === 'All' ? reviews : reviews.filter(r => r.status === filter);
        
        if (!searchTerm) return tempReviews;

        const searchKeywords = searchTerm.toLowerCase().split(' ').filter(k => k);
        return tempReviews.filter(review => {
            const searchableString = `${review.product.name} ${review.customer.name} ${review.text}`.toLowerCase();
            return searchKeywords.every(keyword => searchableString.includes(keyword));
        });
    }, [reviews, filter, searchTerm]);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-display text-gold">Reviews & Ratings</h1>
                <div className="flex items-center gap-4">
                    <label htmlFor="status-filter" className="text-gray-600 dark:text-platinum">Filter by status:</label>
                    <select
                        id="status-filter"
                        value={filter}
                        onChange={e => setFilter(e.target.value as ReviewStatus | 'All')}
                        className="bg-white dark:bg-graphite p-2 rounded border border-gray-300 dark:border-graphite focus:outline-none focus:ring-1 focus:ring-gold"
                    >
                        <option value="All">All</option>
                        {Object.values(ReviewStatus).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
            </div>

            <div className="bg-white dark:bg-graphite p-6 rounded-xl shadow-neumorphic-light dark:shadow-neumorphic-dark">
                <div className="space-y-4">
                    {filteredReviews.map(review => (
                        <div key={review.id} className="bg-gray-50 dark:bg-deep-black/50 p-4 rounded-lg">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-4">
                                    <img src={review.product.imageUrl} alt={review.product.name} className="w-20 h-20 rounded-md object-cover" />
                                    <div>
                                        <h3 className="font-semibold text-lg">{review.product.name}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">by {review.customer.name}</p>
                                        <StarRating rating={review.rating} />
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">{review.date}</p>
                                    <span className={`mt-2 inline-block px-3 py-1 text-xs font-semibold rounded-full border ${getStatusClass(review.status)}`}>
                                        {review.status}
                                    </span>
                                </div>
                            </div>
                            <p className="mt-4 text-gray-700 dark:text-platinum/90 italic">"{review.text}"</p>
                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-graphite/50 flex justify-end gap-2">
                               {review.status !== ReviewStatus.Approved && <button onClick={() => handleStatusChange(review.id, ReviewStatus.Approved)} className="px-3 py-1 text-sm rounded bg-emerald/20 text-emerald hover:bg-emerald/40">Approve</button>}
                               {review.status !== ReviewStatus.Rejected && <button onClick={() => handleStatusChange(review.id, ReviewStatus.Rejected)} className="px-3 py-1 text-sm rounded bg-red-500/20 text-red-400 hover:bg-red-500/40">Reject</button>}
                                <button className="px-3 py-1 text-sm rounded bg-blue-500/20 text-blue-400 hover:bg-blue-500/40">Reply</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReviewsPage;
