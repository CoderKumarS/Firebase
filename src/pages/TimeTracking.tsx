import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { db, auth } from "../firebase";

interface TimeEntry {
  id: string;
  userId: string;
  clockIn: Timestamp;
  clockOut: Timestamp | null;
}

const TimeTracking: React.FC = () => {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<TimeEntry | null>(null);
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);

  useEffect(() => {
    const fetchTimeEntries = async () => {
      if (!auth.currentUser) return;

      const q = query(
        collection(db, "timeEntries"),
        where("userId", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const entries: TimeEntry[] = [];
      querySnapshot.forEach((doc) => {
        entries.push({ id: doc.id, ...doc.data() } as TimeEntry);
      });
      setTimeEntries(entries);

      const latestEntry = entries[entries.length - 1];
      if (latestEntry && !latestEntry.clockOut) {
        setCurrentEntry(latestEntry);
        setIsClockedIn(true);
      }
    };

    fetchTimeEntries();
  }, []);

  const handleClockIn = async () => {
    if (!auth.currentUser) return;

    const newEntry: Omit<TimeEntry, "id"> = {
      userId: auth.currentUser.uid,
      clockIn: Timestamp.now(),
      clockOut: null,
    };

    const docRef = await addDoc(collection(db, "timeEntries"), newEntry);
    setCurrentEntry({ id: docRef.id, ...newEntry });
    setIsClockedIn(true);
  };

  const handleClockOut = async () => {
    if (!currentEntry) return;

    await addDoc(collection(db, "timeEntries"), {
      ...currentEntry,
      clockOut: Timestamp.now(),
    });

    setCurrentEntry(null);
    setIsClockedIn(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto p-4"
    >
      <h1 className="text-3xl font-bold mb-6">Time Tracking</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Clock In/Out</h2>
        {isClockedIn ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClockOut}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
          >
            Clock Out
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClockIn}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
          >
            Clock In
          </motion.button>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Time Entries</h2>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Clock In</th>
              <th className="p-2 text-left">Clock Out</th>
              <th className="p-2 text-left">Duration</th>
            </tr>
          </thead>
          <tbody>
            {timeEntries.map((entry) => {
              const clockIn = entry.clockIn.toDate();
              const clockOut = entry.clockOut ? entry.clockOut.toDate() : null;
              const duration = clockOut
                ? (
                    (clockOut.getTime() - clockIn.getTime()) /
                    (1000 * 60 * 60)
                  ).toFixed(2)
                : "N/A";

              return (
                <motion.tr
                  key={entry.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <td className="p-2">{clockIn.toLocaleDateString()}</td>
                  <td className="p-2">{clockIn.toLocaleTimeString()}</td>
                  <td className="p-2">
                    {clockOut ? clockOut.toLocaleTimeString() : "N/A"}
                  </td>
                  <td className="p-2">{duration} hours</td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default TimeTracking;
