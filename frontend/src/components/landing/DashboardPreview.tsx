import { motion } from "framer-motion";

const recent = [
  {
    title: "Roxana",
    chapter: "Ch. 78",
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    title: "The Broken Ring",
    chapter: "Ch. 52",
    color: "from-amber-400 to-orange-500",
  },
  {
    title: "Villains Are Destined To Die",
    chapter: "Ch. 141",
    color: "from-pink-500 to-rose-500",
  },
];

export function DashboardPreview() {
  return (
    <section className="relative overflow-hidden py-28">

      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="mb-16 text-center"
        >
          <p className="mb-4 uppercase tracking-[0.35em] text-violet-500 text-sm">
            Beautiful Workspace
          </p>

          <h2 className="font-cinzel text-5xl font-bold">
            Everything In One Place
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-muted-foreground text-lg">
            Organize every library, continue reading, discover new recommendations
            and collaborate with your friends from one elegant dashboard.
          </p>

        </motion.div>

        <motion.div
          initial={{ opacity:0, scale:.96 }}
          whileInView={{ opacity:1, scale:1 }}
          viewport={{ once:true }}
          transition={{ duration:.6 }}
          className="relative rounded-[32px] border border-border bg-card shadow-2xl overflow-hidden"
        >

          {/* Browser Bar */}

          <div className="flex items-center gap-2 border-b border-border px-6 py-4">

            <div className="h-3 w-3 rounded-full bg-red-400"/>

            <div className="h-3 w-3 rounded-full bg-yellow-400"/>

            <div className="h-3 w-3 rounded-full bg-green-400"/>

            <div className="ml-6 rounded-full bg-secondary px-5 py-2 text-sm text-muted-foreground">
              arcana.app/dashboard
            </div>

          </div>

          {/* Dashboard */}

          <div className="grid lg:grid-cols-[260px_1fr]">

            {/* Sidebar */}

            <aside className="border-r border-border p-6">

              <h3 className="font-cinzel text-2xl font-bold">
                ARCANA
              </h3>

              <div className="mt-10 space-y-3">

                {[
                  "Dashboard",
                  "My Libraries",
                  "Shared Libraries",
                  "Explore",
                  "Profile",
                  "Settings",
                ].map(item=>(
                  <div
                    key={item}
                    className="rounded-xl px-4 py-3 transition hover:bg-secondary"
                  >
                    {item}
                  </div>
                ))}

              </div>

            </aside>

            {/* Content */}

            <main className="p-8">

              <div className="mb-8 flex items-center justify-between">

                <div>

                  <h3 className="text-3xl font-bold">
                    Welcome back, Saira ✨
                  </h3>

                  <p className="text-muted-foreground">
                    Continue where you left off.
                  </p>

                </div>

                <div className="rounded-xl bg-secondary px-6 py-3">
                  Search...
                </div>

              </div>

              {/* Continue Reading */}

              <div className="rounded-3xl bg-gradient-to-r from-violet-500 to-fuchsia-500 p-8 text-white">

                <p className="text-sm uppercase tracking-widest opacity-80">
                  Continue Reading
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                  Roxana
                </h2>

                <p className="mt-2 opacity-90">
                  Chapter 78 of 110
                </p>

                <div className="mt-6 h-3 rounded-full bg-white/20">

                  <div className="h-3 w-[71%] rounded-full bg-white"/>

                </div>

              </div>

              {/* Recently Added */}

              <div className="mt-10">

                <h3 className="mb-5 text-xl font-semibold">
                  Recently Added
                </h3>

                <div className="grid gap-5 md:grid-cols-3">

                  {recent.map(item=>(
                    <motion.div
                      whileHover={{ y:-8 }}
                      key={item.title}
                      className="overflow-hidden rounded-2xl border border-border bg-background"
                    >

                      <div
                        className={`h-44 bg-gradient-to-br ${item.color}`}
                      />

                      <div className="p-5">

                        <h4 className="font-semibold">
                          {item.title}
                        </h4>

                        <p className="mt-2 text-sm text-muted-foreground">
                          {item.chapter}
                        </p>

                      </div>

                    </motion.div>
                  ))}

                </div>

              </div>

            </main>

          </div>

        </motion.div>

      </div>

    </section>
  );
}