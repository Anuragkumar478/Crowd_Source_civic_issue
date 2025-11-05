import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart3, Users, MapPin, ThumbsUp, AlertCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-black min-h-screen text-gray-100 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative text-center py-24 px-6 bg-gradient-to-r from-violet-700/30 to-cyan-600/20 backdrop-blur-sm">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 drop-shadow-lg"
        >
          DevelopMyCity 🚧
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-300"
        >
          Empower citizens to report, validate, and track issues in their city.  
          Together, let’s build cleaner, smarter, and more connected cities!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            to="/add-complaint"
            className="bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-cyan-500/30 transition-all"
          >
            Report an Issue
          </Link>
        </motion.div>

        {/* Decorative Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40 pointer-events-none"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
          🌟 Key Features
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              icon: <AlertCircle className="mx-auto text-cyan-400 w-12 h-12 mb-4" />,
              title: "Easy Issue Reporting",
              text: "Quickly report civic issues like potholes, garbage, or broken streetlights with location and photos.",
            },
            {
              icon: <ThumbsUp className="mx-auto text-green-400 w-12 h-12 mb-4" />,
              title: "Crowd Validation",
              text: "Citizens can upvote or confirm issues to prioritize problems that matter most to the community.",
            },
            {
              icon: <MapPin className="mx-auto text-red-400 w-12 h-12 mb-4" />,
              title: "Live Location Tracking",
              text: "Complaints are mapped accurately to help authorities act quickly and monitor hotspots.",
            },
            {
              icon: <BarChart3 className="mx-auto text-purple-400 w-12 h-12 mb-4" />,
              title: "Smart Analytics",
              text: "View trends, track performance, and monitor recurring issues with a data-driven dashboard.",
            },
            {
              icon: <Users className="mx-auto text-yellow-400 w-12 h-12 mb-4" />,
              title: "Community Collaboration",
              text: "Unite citizens, officers, and district admins to solve local issues through collaboration.",
            },
            {
              icon: (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="Admin"
                  className="mx-auto w-12 h-12 mb-4"
                />
              ),
              title: "Admin Dashboard",
              text: "Admins verify, assign, and track complaint progress efficiently from a single dashboard.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-slate-800/60 backdrop-blur-lg rounded-2xl shadow-xl p-6 text-center border border-slate-700 hover:border-cyan-400/40 transition-all"
            >
              {f.icon}
              <h3 className="text-xl font-semibold mb-2 text-gray-100">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-20 bg-gradient-to-r from-violet-700/30 to-cyan-600/20 text-white backdrop-blur-sm">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
        <p className="max-w-xl mx-auto mb-6 text-gray-300">
          Start reporting issues in your area and be part of the change your city needs.
        </p>
        <Link
          to="/track-progress"
          className="bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-all"
        >
          View All Complaints
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-gray-400 py-12 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-cyan-400 mb-3">DevelopMyCity</h2>
            <p className="text-sm leading-relaxed text-gray-400">
              A citizen-first platform bridging communication between people and authorities.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-200 mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {["add-complaint", "track-progress", "login", "register"].map((item) => (
                <li key={item}>
                  <a href={`/${item.toLowerCase()}`} className="hover:text-cyan-400 transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Roles */}
          <div>
            <h3 className="text-lg font-semibold text-gray-200 mb-3">Roles</h3>
            <ul className="space-y-2 text-sm">
              {[" Admin", "Citizen"].map((role) => (
                <li key={role}>
                  <a href="#" className="hover:text-cyan-400 transition">
                    {role}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-200 mb-3">Contact</h3>
            <p className="text-sm text-gray-400">📍 Lucknow, Uttar Pradesh</p>
            <p className="text-sm text-gray-400">📧 developmycity@gmail.com</p>
            <div className="flex space-x-4 mt-4 text-xl">
              <a href="#" className="hover:text-cyan-400 transition"><i className="fab fa-facebook"></i></a>
              <a href="#" className="hover:text-cyan-400 transition"><i className="fab fa-twitter"></i></a>
              <a href="#" className="hover:text-cyan-400 transition"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-4 text-center text-sm text-gray-500">
          <p>
            © communication between people and authorities {new Date().getFullYear()} <span className="text-cyan-400 font-semibold">DevelopMyCity</span> —: 
            <span className="text-cyan-400"> DevlopemMycity</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
