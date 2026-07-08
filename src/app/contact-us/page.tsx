"use client";

import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-black py-24"
    >
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-orange-500/10 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-orange-500/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}

        <div className="mb-16 text-center">
          <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1 text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">
            Contact Us
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            Let's Build Something Amazing Together
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-400">
            Looking for custom software, AI solutions, cloud services, or digital
            transformation? We'd love to hear about your project.
          </p>
        </div>

        <div className="grid gap-14 lg:grid-cols-2">
          {/* LEFT */}

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white">
                Let's Talk
              </h3>

              <p className="mt-4 leading-8 text-zinc-400">
                Whether you're launching a startup, scaling an enterprise,
                or modernizing existing systems, our team is here to help
                transform your ideas into powerful digital solutions.
              </p>
            </div>

            <div className="space-y-6">

              <div className="flex items-start gap-5 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition hover:border-orange-500/40 hover:bg-white/10">
                <div className="rounded-xl bg-orange-500/20 p-3">
                  <Mail className="text-orange-400" />
                </div>

                <div>
                  <h4 className="font-semibold text-white">
                    Email
                  </h4>

                  <p className="mt-1 text-zinc-400">
                    crellotech@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition hover:border-orange-500/40 hover:bg-white/10">
                <div className="rounded-xl bg-orange-500/20 p-3">
                  <Phone className="text-orange-400" />
                </div>

                <div>
                  <h4 className="font-semibold text-white">
                    Phone
                  </h4>

                  <p className="mt-1 text-zinc-400">
                    +91 98765 43210
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition hover:border-orange-500/40 hover:bg-white/10">
                <div className="rounded-xl bg-orange-500/20 p-3">
                  <MapPin className="text-orange-400" />
                </div>

                <div>
                  <h4 className="font-semibold text-white">
                    Office
                  </h4>

                  <p className="mt-1 text-zinc-400">
                    Bangalore, Karnataka, India
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* FORM */}

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <form className="space-y-6">

              <div className="grid gap-6 md:grid-cols-2">

                <input
                  type="text"
                  placeholder="Full Name"
                  className="rounded-xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none placeholder:text-zinc-500 focus:border-orange-500"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="rounded-xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none placeholder:text-zinc-500 focus:border-orange-500"
                />

              </div>

              <div className="grid gap-6 md:grid-cols-2">

                <input
                  type="text"
                  placeholder="Company Name"
                  className="rounded-xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none placeholder:text-zinc-500 focus:border-orange-500"
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  className="rounded-xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none placeholder:text-zinc-500 focus:border-orange-500"
                />

              </div>

              <input
                type="text"
                placeholder="Subject"
                className="w-full rounded-xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none placeholder:text-zinc-500 focus:border-orange-500"
              />

              <textarea
                rows={6}
                placeholder="Tell us about your project..."
                className="w-full rounded-xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none placeholder:text-zinc-500 focus:border-orange-500"
              />

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-orange-500 px-6 py-4 font-semibold text-white transition duration-300 hover:bg-orange-600"
              >
                Send Message
                <Send
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </button>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
}