import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Calendar, BarChart2, Cpu, Users } from "lucide-react";
import { useEffect, useState } from "react";

const HomePage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ students: 0, faculty: 0, departments: 0 });

  // Animate stats
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        students: prev.students < 15000 ? prev.students + 500 : 15000,
        faculty: prev.faculty < 800 ? prev.faculty + 20 : 800,
        departments: prev.departments < 50 ? prev.departments + 2 : 50,
      }));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-screen text-gray-800 bg-gray-50">

      {/* ================= HEADER ================= */}
<header className="sticky top-0 z-50 flex flex-col items-center justify-between gap-4 px-6 py-4 shadow-md bg-white/80 backdrop-blur-md md:flex-row md:px-10">
  <div className="flex items-center gap-2 text-center md:text-left">
    {/* Logo Container */}
    <div>
      <img 
        src="https://png.pngtree.com/png-clipart/20240906/original/pngtree-an-icon-that-shows-a-campus-building-in-different-colors-vector-png-image_15952013.png" 
        alt="CampusConnect Logo" 
        className="object-contain h-16 w-36 md:w-20 md:h-20"
      />
    </div>
    {/* Text */}
    <h1 className="text-lg font-bold leading-tight text-gray-800 md:text-2xl">
      CampusConnect
    </h1>
  </div>
        <div className="flex gap-4">
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={() => navigate("/login")}
            className="px-6 py-2 text-white shadow-lg rounded-xl"
            style={{
              background: "linear-gradient(90deg, #F0ADA4 0%, #896965 82%, #737373 100%)",
            }}
          >
            Login Portal
          </motion.button>
        </div>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section
        className="relative px-6 py-20 overflow-hidden text-center md:px-10"
        style={{
          background: "linear-gradient(to right, #F0D6D6 0%, #BE8080 100%)",
        }}
      >
        {/* Floating shapes */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute w-20 h-20 bg-red-300 rounded-full opacity-20 top-10 left-10"
        />
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute w-32 h-32 bg-orange-300 rounded-full opacity-15 top-40 right-20"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-6 py-2 mb-8 border border-red-600 rounded-full bg-white/60 backdrop-blur"
        >
          🚀 AI Powered Smart Campus Management System
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto text-2xl font-bold leading-relaxed text-gray-700 md:text-4xl"
        >
          Manage classrooms, labs, faculty workload and campus resources efficiently
          with our intelligent smart campus system.
        </motion.h2>

        {/* Hero Image Cards */}
        <div className="grid max-w-5xl grid-cols-1 gap-6 mx-auto mt-16 md:grid-cols-3">
          {[
            { title: "Classroom Management", img: "https://images.unsplash.com/photo-1509062522246-3755977927d7" },
            { title: "Lab Resource Tracking", img: "https://tse3.mm.bing.net/th/id/OIP.ec7q4hTwZ5l3ePVIphY7YwHaE7?pid=Api&P=0&h=180" },
            { title: "Teacher Management", img: "https://tse2.mm.bing.net/th/id/OIP.TwLlxJEtK7D5gDWZxj4KWAHaEK?pid=Api&P=0&h=180" },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{
                scale: 1.07,
                rotate: 1,
                boxShadow: "0 25px 40px rgba(0,0,0,0.2)",
              }}
              transition={{ duration: 0.4 }}
              className="relative overflow-hidden bg-white cursor-pointer rounded-2xl"
            >
              <img src={item.img} alt="" className="object-cover w-full h-40" />
              <div className="p-4 font-semibold text-gray-800">{item.title}</div>
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-red-400 via-orange-300 to-transparent opacity-20 rounded-2xl"></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="px-6 py-20 md:px-10">
        <h2 className="mb-12 text-3xl font-bold text-center">Smart Features</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { icon: <CheckCircle className="mx-auto mb-4 text-red-500" size={48} />, title: "Real-time Resource Tracking" },
            { icon: <Calendar className="mx-auto mb-4 text-red-500" size={48} />, title: "AI-based Optimization" },
            { icon: <BarChart2 className="mx-auto mb-4 text-red-500" size={48} />, title: "Automated Scheduling" },
            { icon: <Cpu className="mx-auto mb-4 text-red-500" size={48} />, title: "Department Wise Allocation" },
            { icon: <Users className="mx-auto mb-4 text-red-500" size={48} />, title: "Smart Notifications & Alerts" },
            { icon: <CheckCircle className="mx-auto mb-4 text-red-500" size={48} />, title: "Advanced Analytics Dashboard" },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{
                scale: 1.05,
                background: "linear-gradient(135deg, #F0ADA4, #896965, #BE8080)",
                color: "#fff",
                boxShadow: "0 15px 25px rgba(0,0,0,0.2)",
              }}
              transition={{ duration: 0.3 }}
              className="p-6 text-center bg-white shadow-md cursor-pointer rounded-2xl"
            >
              {feature.icon}
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-gray-600">
                Improve campus efficiency and reduce resource wastage.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="flex flex-col items-center justify-center gap-12 text-center bg-white md:flex-row md:gap-20 py-14">
        {[
          { label: "Active Students", value: stats.students },
          { label: "Faculty Members", value: stats.faculty },
          { label: "Departments", value: stats.departments },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
          >
            <h3 className="text-4xl font-bold text-red-500">{stat.value.toLocaleString()}</h3>
            <p className="text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="px-6 py-20 bg-white md:px-10">
        <h2 className="mb-12 text-3xl font-bold text-center">How It Works</h2>
        <div className="grid gap-8 md:grid-cols-4">
          {[
            { step: "1", title: "Register & Login", desc: "Create your account and login to start managing resources.", color: "bg-red-200" },
            { step: "2", title: "Add Resources", desc: "Add classrooms, labs, and equipment to the system.", color: "bg-orange-200" },
            { step: "3", title: "Optimize & Schedule", desc: "Use AI-powered scheduling and allocation for efficiency.", color: "bg-yellow-200" },
            { step: "4", title: "Monitor & Report", desc: "Track usage, receive alerts, and generate reports.", color: "bg-green-200" },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, boxShadow: "0 15px 25px rgba(0,0,0,0.2)" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className={`p-6 text-center rounded-2xl ${item.color} cursor-pointer`}
            >
              <div className="mb-2 text-3xl font-bold">{item.step}</div>
              <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-700">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= BLOG / UPDATES ================= */}
<section className="px-6 py-20 bg-gradient-to-r from-gray-50 to-gray-100 md:px-10">
  <h2 className="mb-12 text-3xl font-bold text-center text-gray-800">
    Campus Updates & AI Tips
  </h2>
  <div className="grid gap-8 md:grid-cols-3">
    {[
      { title: "New AI Lab Opened", img: "https://www.poniaktimes.com/wp-content/uploads/2025/06/Meta-superintelligence-Ai-lab.webp", desc: "Explore AI-driven campus management tools." },
      { title: "Faculty Training Program", img: "https://www.insiderlondon.com/uploads/ai.jpeg", desc: "Upskill your faculty with advanced AI techniques." },
      { title: "Smart Lab Scheduling", img: "https://tse4.mm.bing.net/th/id/OIP.ZCgJnosdOApsSeXg8nmCyQHaEc?pid=Api&P=0&h=180", desc: "Automated lab scheduling for maximum efficiency." },
    ].map((item, i) => (
      <motion.div
        key={i}
        whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: i * 0.2 }}
        className="relative overflow-hidden bg-white cursor-pointer rounded-2xl"
      >
        <img src={item.img} alt="" className="object-cover w-full h-44 rounded-t-2xl" />
        <div className="p-5">
          <h3 className="mb-2 text-xl font-semibold text-gray-800">{item.title}</h3>
          <p className="text-gray-600">{item.desc}</p>
        </div>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-red-400 via-orange-300 to-transparent opacity-10"></div>
      </motion.div>
    ))}
  </div>
</section>

{/* ================= FAQ ================= */}
<section className="px-6 py-20 bg-gray-50 md:px-10">
  <h2 className="mb-12 text-3xl font-bold text-center text-gray-800">
    Frequently Asked Questions
  </h2>
  <div className="max-w-4xl mx-auto space-y-6">
    {[
      { q: "Can I integrate this with existing systems?", a: "Yes! Smart Campus Tracker is designed for seamless integration." },
      { q: "Is my data secure?", a: "Absolutely. We use advanced encryption and secure cloud storage." },
      { q: "Can I customize schedules?", a: "Yes, the AI optimization respects manual customizations." },
      { q: "Does it support mobile access?", a: "Yes, the system is fully responsive and accessible on mobile devices." },
      { q: "Can multiple admins manage resources?", a: "Yes, you can assign different roles and permissions for staff management." },
    ].map((faq, i) => (
      <motion.details
        key={i}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: i * 0.2 }}
        className="p-5 transition-all duration-300 border border-gray-200 shadow-lg cursor-pointer bg-white/50 backdrop-blur-md rounded-2xl hover:shadow-2xl"
      >
        <summary className="flex items-center justify-between font-semibold text-gray-800 cursor-pointer select-none">
          <span>{faq.q}</span>
          <motion.span
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 90 }}
            className="ml-4 text-red-500"
          >
            ➤
          </motion.span>
        </summary>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-3 text-gray-700"
        >
          {faq.a}
        </motion.p>
      </motion.details>
    ))}
  </div>
</section>



      {/* ================= CTA SECTION ================= */}
      <section
  className="relative px-6 py-20 overflow-hidden text-center md:px-10"
  style={{
    background: "linear-gradient(135deg, #F0ADA4 0%, #BE8080 100%)",
  }}
>
  {/* Floating glass blobs */}
  <motion.div
    animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
    transition={{ duration: 6, repeat: Infinity }}
    className="absolute w-24 h-24 rounded-full bg-white/20 backdrop-blur-lg top-10 left-10"
  />
  <motion.div
    animate={{ y: [0, 15, 0], x: [0, -15, 0] }}
    transition={{ duration: 7, repeat: Infinity }}
    className="absolute w-32 h-32 rounded-full bg-white/20 backdrop-blur-lg bottom-10 right-20"
  />

  <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl drop-shadow-lg">
    Ready to Experience Smart Campus?
  </h2>
  <p className="max-w-3xl mx-auto mb-10 text-lg text-white md:text-xl drop-shadow-md">
    One platform to manage all campus resources efficiently and intelligently.
  </p>
  <motion.button
    whileHover={{ scale: 1.1, boxShadow: "0 20px 40px rgba(255,255,255,0.3)" }}
    transition={{ duration: 0.3 }}
    onClick={() => navigate("/register")}
    className="px-8 py-3 font-semibold text-red-600 border shadow-lg bg-white/80 backdrop-blur-lg rounded-xl border-white/30"
  >
    Get Started Today
  </motion.button>
</section>

      
    </div>
  );
};

export default HomePage;