import Image from "next/image";
import { SparklesText } from "@/component/ui/sparkles-text";
import { DownloadCvButton } from "@/component/ui/download-cv-button";

export default function Sectiontwo() {
  const profile = {
    name: "Muhamad Alfabel",
    tagline: "Informatics Engineering Student",
    about:
      "Dedicated Informatics Engineering student at Politeknik Negeri Jakarta with a strong passion for technology, innovation, and problem-solving. I enjoy exploring software development, building creative solutions, and continuously learning to improve my skills. This portfolio showcases my projects, growth, and commitment to becoming a well-rounded tech professional.",
    phone: "+62-813-9892-5377",
    email: "alfabelmuhammad3005@gmail.com",
    eduMail: "muhamad.alfabel.tik22@mhsw.pnj.ac.id",
    from: "Depok, West Java, Indonesia",
    languages: "Indonesia, English",
  };

  return (
    <section className="relative">
      {/* Dekorasi teks besar samar di belakang (center) */}
      <div
        className="pointer-events-none absolute left-1/2 top-6 -z-10 -translate-x-1/2 select-none
                   text-[15vw] font-black leading-none tracking-[-0.04em] opacity-5 md:text-[12rem]"
        aria-hidden
      >
        ABOUT ME
      </div>

      {/* Judul utama animasi (center) */}
      <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <SparklesText
          text="ABOUT ME"
          className="block text-center text-2xl sm:text-3xl lg:text-4xl leading-tight"
          colors={{ first: "#34d399", second: "#a7f3d0" }}
          sparklesCount={8}
        />
      </div>

      {/* Konten */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 px-4 pb-16 pt-8 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Kiri: teks */}
        <div className="flex flex-col gap-6">
          <h3 className="text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
            Hi There! I&apos;m {profile.name}
          </h3>

          {/* tagline hijau muda */}
          <p className="font-medium text-emerald-500">{profile.tagline}</p>

          <p className="max-w-2xl text-base opacity-70 sm:text-lg">
            {profile.about}
          </p>

          {/* Detail kiri: label : value */}
          <div className="mt-2 space-y-3 text-base">
            {[
              ["Phone", profile.phone],
              ["Email", profile.email],
              ["Edu Mail", profile.eduMail],
              ["From", profile.from],
              ["Language", profile.languages],
            ].map(([label, value]) => (
              <div
                key={label}
                className="grid grid-cols-[120px_12px_minmax(0,1fr)] items-baseline gap-x-2"
              >
                <span className="opacity-60">{label}</span>
                <span className="opacity-50">:</span>
                <span className="truncate">{value}</span>
              </div>
            ))}
          </div>

          {/* Tombol Download CV */}
          <DownloadCvButton
            filePath="/cv/muhamad-alfabel.pdf"
            fileName="Muhamad-Alfabel-CV.pdf"
          />
        </div>

        {/* Kanan: foto */}
        <div className="w-full lg:justify-self-end">
          <div className="relative mx-auto max-w-md overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src="/images/fotoALtransparan.png"
              alt={profile.name}
              width={960}
              height={720}
              priority
              className="h-auto w-full object-contain"
            />
            <div
              className="pointer-events-none absolute inset-x-6 -bottom-4 h-8 rounded-2xl blur-xl"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  );
}
