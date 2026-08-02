import { motion } from "framer-motion";

export function TopBanner() {
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-[60] w-full bg-gold px-4 py-2.5 text-center"
      role="alert"
    >
      <p className="text-[11px] font-bold uppercase leading-snug tracking-[0.12em] text-black sm:text-sm">
        ⚠️ Demonstração desenvolvida para apresentação comercial.
      </p>
    </motion.div>
  );
}
