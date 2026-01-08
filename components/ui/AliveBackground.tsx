"use client";

import { motion } from "framer-motion";

export const AliveBackground = () => {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-slate-50 selection:bg-blue-100">
            {/* Mesh Gradients */}
            <div className="absolute top-0 left-0 w-full h-full opacity-60">
                {/* Blob 1: Blue - Top Left */}
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                    }}
                    className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-300 rounded-full mix-blend-multiply filter blur-[128px]"
                />

                {/* Blob 2: Purple - Top Right */}
                <motion.div
                    animate={{
                        x: [0, -100, 0],
                        y: [0, 100, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                    }}
                    className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-300 rounded-full mix-blend-multiply filter blur-[128px]"
                />

                {/* Blob 3: Pink - Bottom Left */}
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -100, 0],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{
                        duration: 22,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                    }}
                    className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-pink-300 rounded-full mix-blend-multiply filter blur-[128px]"
                />

                {/* Blob 4: Cyan - Bottom Right (Center-ish) */}
                <motion.div
                    animate={{
                        x: [0, -50, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 28,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                    }}
                    className="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] bg-cyan-200 rounded-full mix-blend-multiply filter blur-[128px]"
                />
            </div>

            {/* Noise Overlay */}
            <div className="bg-noise" />
        </div>
    );
};
