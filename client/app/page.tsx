"use client";
import { motion } from "framer-motion";
import heroImg from "@/public/hero.png";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Home() {
  return (
    <section
      className="relative min-h-screen bg-[#020617] bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(2, 6, 23, 0.75),
            rgba(2, 6, 23, 0.85)
          ),
          url('/hero.png')
        `,
      }}
    >
      {/* Animated glowing blobs */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-10 top-20 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]"
      />

      <motion.div
        animate={{ y: [0, 25, 0], x: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-10 bottom-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]"
      />


      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
       animate="show"
        className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 lg:px-8"
      >
        <div className="max-w-3xl">
          <motion.span
            variants={item}
            className="inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400"
          >
            🚀 Find your dream career
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl"
          >
            Discover Your
            <span className="block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Next Opportunity
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-2xl text-lg leading-8 text-slate-300"
          >
            Explore thousands of jobs from top companies and find the perfect
            role that matches your skills and ambitions.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={item}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-xl bg-emerald-500 px-8 py-4 font-semibold text-white transition hover:bg-emerald-600"
            >
              Sign Up
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-xl border border-slate-700 bg-slate-900/40 px-8 py-4 font-semibold text-slate-200 backdrop-blur-sm transition hover:border-slate-500"
            >
              Apply For Jobs
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div variants={item} className="mt-14 flex flex-wrap gap-10">
            {[
              { label: "Jobs Posted", value: "10K+" },
              { label: "Companies", value: "500+" },
              { label: "Job Seekers", value: "25K+" },
            ].map((stat, i) => (
              <motion.div key={i} whileHover={{ scale: 1.05 }}>
                <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                <p className="text-slate-400">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
