import { motion } from 'framer-motion';

export default function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10" aria-hidden>
      <div className="absolute inset-0 bg-[#0b0f14]" />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />
      <motion.div
        className="absolute -top-[20%] left-[10%] w-[50vw] max-w-xl h-[50vw] max-h-xl rounded-full bg-[#00ffcc]/[0.07] blur-[100px]"
        animate={{ x: [0, 30, 0], y: [0, 20, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[5%] w-[45vw] max-w-lg h-[45vw] max-h-lg rounded-full bg-[#00d4ff]/[0.06] blur-[90px]"
        animate={{ x: [0, -25, 0], y: [0, -15, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[40%] right-[30%] w-[30vw] h-[30vw] max-w-md max-h-md rounded-full bg-violet-500/[0.04] blur-[80px]"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
