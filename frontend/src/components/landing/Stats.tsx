import { motion } from "framer-motion";

const stats = [
  {
    value: "50K+",
    label: "Libraries Created",
    description: "Beautiful reading collections",
  },
  {
    value: "250K+",
    label: "Manhwa Tracked",
    description: "Across every genre",
  },
  {
    value: "12K+",
    label: "Readers",
    description: "Sharing recommendations",
  },
  {
    value: "1M+",
    label: "Chapters Logged",
    description: "Reading progress saved",
  },
];

export function Stats() {
  return (
    <section className="relative py-20 px-6">
      <div className="mx-auto max-w-7xl">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-violet-500">
            Trusted by Readers
          </p>

          <h2 className="font-cinzel text-4xl font-bold text-foreground md:text-5xl">
            Your Reading Journey Starts Here
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            Thousands of readers use Arcana to organize their favorite
            manhwa, collaborate with friends, and never lose track of a
            chapter again.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {stats.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.12,
                duration: 0.5,
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="group rounded-3xl border border-border bg-card p-8 shadow-lg transition-all"
            >
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10 text-3xl">
                ✨
              </div>

              <h3 className="text-5xl font-bold text-violet-600 dark:text-violet-300">
                {item.value}
              </h3>

              <h4 className="mt-5 text-lg font-semibold text-foreground">
                {item.label}
              </h4>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}