import BlurredStagger from "@/component/ui/blurred-stagger";
import { InteractiveHoverButton } from "@/component/ui/interactive-hover-button";
import Image from "next/image";

export default function sectiontwo() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 pt-10 pb-16">
      <div
        className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl
                   bg-[#873e23] text-white p-6 sm:p-10
                   ring-1 ring-white/10 shadow-[0_40px_60px_-30px_rgba(0,0,0,.45)]"
      >
        {/* dekorasi */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20
                     [background:radial-gradient(700px_circle_at_12%_0%,#ffffff22,transparent_45%),
                                  radial-gradient(700px_circle_at_88%_0%,#ffffff22,transparent_45%)]"
          aria-hidden
        />

        <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2">
          {/* Kiri: teks */}
          <div className="flex flex-col gap-6 sm:gap-7 lg:gap-8">
            <BlurredStagger
              text={"Aloo Selamat Datang\nDi Website Saya!"}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight"
              stagger={0.02}
              delay={0.05}
            />

            <p className="max-w-2xl text-base sm:text-lg text-white">
              Hi, I’m Muhamad Alfabel — a dedicated Informatics Engineering student at Politeknik Negeri Jakarta with a strong passion for technology, innovation, and problem-solving. I enjoy exploring software development, building creative solutions, and continuously learning to improve my skills. This portfolio showcases my projects, growth, and commitment to becoming a well-rounded tech professional.
            </p>

            {/* tombol */}
            <InteractiveHoverButton
              href="#"
              size="lg"
              variant="light"
              className="self-start"
            >
              <span className="font-semibold">Find Your Subject</span>
            </InteractiveHoverButton>
          </div>

          {/* Kanan: gambar */}
          <div className="lg:justify-self-end w-full">
            <div
              className="relative mx-auto max-w-md overflow-hidden rounded-2xl
                         bg-white/5 ring-1 ring-white/10 shadow-2xl"
            >
              <Image
                src="/images/muhamad-alfabel.jpg"
                alt="Muhamad Alfabel"
                width={960}
                height={720}
                priority
                className="w-full h-auto object-contain bg-white"
              />
              <div
                className="pointer-events-none absolute inset-x-6 -bottom-4 h-8 rounded-2xl
                           bg-black/35 blur-xl"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
