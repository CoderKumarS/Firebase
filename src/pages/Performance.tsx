import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "../firebase";

interface Review {
  id: string;
  employeeId: string;
  reviewerId: string;
  date: string;
  performance: number;
  comments: string;
}

const PerformanceReview: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState<Omit<Review, "id" | "reviewerId">>(
    {
      employeeId: "",
      date: new Date().toISOString().split("T")[0],
      performance: 3,
      comments: "",
    }
  );

  useEffect(() => {
    const fetchReviews = async () => {
      if (!auth.currentUser) return;

      const q = query(
        collection(db, "performanceReviews"),
        where("reviewerId", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const fetchedReviews: Review[] = [];
      querySnapshot.forEach((doc) => {
        fetchedReviews.push({ id: doc.id, ...doc.data() } as Review);
      });
      setReviews(fetchedReviews);
    };

    fetchReviews();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({
      ...prev,
      [name]: name === "performance" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;

    const reviewData = {
      ...newReview,
      reviewerId: auth.currentUser.uid,
    };

    const docRef = await addDoc(
      collection(db, "performanceReviews"),
      reviewData
    );
    setReviews([...reviews, { id: docRef.id, ...reviewData }]);
    setNewReview({
      employeeId: "",
      date: new Date().toISOString().split("T")[0],
      performance: 3,
      comments: "",
    });
  };

  const handleUpdateReview = async (
    reviewId: string,
    updatedData: Partial<Review>
  ) => {
    await updateDoc(doc(db, "performanceReviews", reviewId), updatedData);
    setReviews(
      reviews.map((review) =>
        review.id === reviewId ? { ...review, ...updatedData } : review
      )
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto p-4"
    >
      <h1 className="text-3xl font-bold mb-6">Performance Reviews</h1>

      <form
        onSubmit={handleSubmit}
        className="mb-8 bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-semibold mb-4">New Review</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="employeeId"
            value={newReview.employeeId}
            onChange={handleInputChange}
            placeholder="Employee ID"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="date"
            name="date"
            value={newReview.date}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
          <select
            name="performance"
            value={newReview.performance}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value={1}>Poor</option>
            <option value={2}>Below Average</option>
            <option value={3}>Average</option>
            <option value={4}>Above Average</option>
            <option value={5}>Excellent</option>
          </select>
        </div>
        <textarea
          name="comments"
          value={newReview.comments}
          onChange={handleInputChange}
          placeholder="Comments"
          className="w-full p-2 border rounded mt-4"
          rows={3}
          required
        ></textarea>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Submit Review
        </motion.button>
      </form>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Past Reviews</h2>
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mb-4 p-4 border rounded"
          >
            <p>
              <strong>Employee ID:</strong> {review.employeeId}
            </p>
            <p>
              <strong>Date:</strong> {review.date}
            </p>
            <p>
              <strong>Performance:</strong> {review.performance}
            </p>
            <p>
              <strong>Comments:</strong> {review.comments}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                handleUpdateReview(review.id, {
                  performance: review.performance + 1,
                })
              }
              className="mt-2 bg-green-500 text-white px-2 py-1 rounded text-sm hover:bg-green-600 transition duration-300"
            >
              Increase Performance
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PerformanceReview;
