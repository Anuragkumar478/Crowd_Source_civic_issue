import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart3, Users, MapPin, ThumbsUp, AlertCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-600 to-pink-700 text-white py-20 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold mb-4"
        >
          DevlopMyCity 🚧
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-6"
        >
          Empower citizens to report, validate, and track issues in their area.  
          Together, let’s make our city cleaner, smarter, and better!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            to="/add-complaint"
            className="bg-gray-500 text-blue-700 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 transition"
          >
            Report an Issue
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          🌟 Key Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl shadow-md p-6 text-center"
          >
            <AlertCircle className="mx-auto text-blue-600 w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Issue Reporting</h3>
            <p className="text-gray-600">
              Quickly report local problems like potholes, streetlight failures, 
              or garbage with photos and location.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl shadow-md p-6 text-center"
          >
            <ThumbsUp className="mx-auto text-green-600 w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Crowd Validation</h3>
            <p className="text-gray-600">
              Other users can upvote or confirm an issue to increase its visibility and urgency.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl shadow-md p-6 text-center"
          >
            <MapPin className="mx-auto text-red-600 w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Live Location Tracking</h3>
            <p className="text-gray-600">
              Every complaint is mapped precisely so authorities can locate and address it faster.
            </p>
          </motion.div>

          {/* Card 4 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl shadow-md p-6 text-center"
          >
            <BarChart3 className="mx-auto text-purple-600 w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Data Analytics</h3>
            <p className="text-gray-600">
              View trends of most reported issues and hotspot areas through interactive visualizations.
            </p>
          </motion.div>

          {/* Card 5 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl shadow-md p-6 text-center"
          >
            <Users className="mx-auto text-yellow-600 w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
            <p className="text-gray-600">
              Collaborate with neighbors and local authorities to solve issues faster as a community.
            </p>
          </motion.div>

          {/* Card 6 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl shadow-md p-6 text-center"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Admin"
              className="mx-auto w-12 h-12 mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Admin Dashboard</h3>
            <p className="text-gray-600">
              Admins can verify, assign, and track complaint progress from a central dashboard.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 bg-gray-600 text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to make a difference?</h2>
        <p className="max-w-xl mx-auto mb-6">
          Start reporting issues in your area today and help make your city a better place to live.
        </p>
        <Link
          to="/track-progress"
          className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 transition"
        >
          View All Complaints
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-gray-900 text-gray-300 text-center">
        <p>© {new Date().getFullYear()} FixMyCity. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
