import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  ArrowUp,
  ExternalLink,
  FileDown,
  AlertCircle,
  CheckCircle2,
  MapPin,
  Mail,
  Phone,
  User,
  Paperclip,
  Search,
  FolderClosed,
} from 'lucide-react';
import contentData from './content/content.json';
import { LightboxImage, SiteContent } from './types/content';
import { IntroFolder } from './components/IntroFolder';
import { DossierNav } from './components/DossierNav';
import { PlaceholderImage } from './components/PlaceholderImage';
import { LightboxModal } from './components/LightboxModal';
import { noirAudio } from './utils/noirAudio';

const content: SiteContent = contentData;

const fadeInUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const SectionHeader: React.FC<{
  tag: string;
  evidence: string;
  heading: string;
  description?: string;
  lightPaper?: boolean;
}> = ({ tag, evidence, heading, description, lightPaper = false }) => (
  <div className={`mb-14 border-b pb-7 ${lightPaper ? 'border-[#161412]/20' : 'border-[#B9AD99]/20'}`}>
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-2.5">
        <span className="h-2 w-2 rounded-full bg-[#8F2929]" />
        <span
          className={`font-mono text-xs uppercase tracking-[0.25em] ${
            lightPaper ? 'text-[#5A5248]' : 'text-[#B9AD99]'
          }`}
        >
          {tag}
        </span>
      </div>
      <span className="stamp-red text-[11px]">{evidence}</span>
    </div>
    <h2
      className={`mt-5 font-serif text-3xl md:text-5xl font-bold tracking-tight ${
        lightPaper ? 'text-[#141210]' : 'text-[#E8E0D0]'
      }`}
    >
      {heading}
    </h2>
    {description && (
      <p
        className={`mt-4 max-w-3xl text-base md:text-lg leading-relaxed ${
          lightPaper ? 'text-[#3A352F]' : 'text-[#B9AD99]'
        }`}
      >
        {description}
      </p>
    )}
  </div>
);

export function App() {
  const [showIntro, setShowIntro] = useState(content.intro.enabled);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [lightboxImage, setLightboxImage] = useState<LightboxImage | null>(null);
  const [selectedIdea, setSelectedIdea] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);

      for (const nav of content.navigation) {
        const el = document.getElementById(nav.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 180) {
            setActiveSection(nav.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      noirAudio.stop();
    };
  }, []);

  const handleToggleAudio = () => {
    const playing = noirAudio.toggle();
    setAudioPlaying(playing);
  };

  const handleExportPdf = () => {
    window.print();
  };

  const openLightbox = (src: string, caption: string) => {
    setLightboxImage({ src, caption });
  };

  return (
    <div className="relative min-h-screen bg-[#0C0C0C] text-[#E8E0D0]">
      <div className="film-grain no-print" />
      <div className="noir-vignette no-print" />

      {showIntro && (
        <IntroFolder intro={content.intro} onComplete={() => setShowIntro(false)} />
      )}

      <DossierNav
        meta={content.meta}
        navigation={content.navigation}
        controls={content.controls}
        activeSection={activeSection}
        progress={progress}
        audioPlaying={audioPlaying}
        onToggleAudio={handleToggleAudio}
        onExportPdf={handleExportPdf}
      />

      <main className="pt-14">
        {/* SLIDE 1: HERO / CASE FILE COVER */}
        <section
          id="hero"
          className="relative flex min-h-[94vh] items-center overflow-hidden border-b border-[#B9AD99]/20 px-6 py-24 md:px-12"
        >
          <div className="desk-spotlight pointer-events-none absolute inset-0" />
          <div className="venetian-shadow pointer-events-none absolute inset-0 opacity-45" />

          <div className="relative mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-12 lg:items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="lg:col-span-7"
            >
              <div className="mb-6 flex flex-wrap items-center gap-3.5">
                <span className="stamp-red text-xs">{content.meta.classification}</span>
                <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#B9AD99]">
                  {content.hero.eyebrow}
                </span>
              </div>

              <div className="inline-flex items-center gap-2 border-l-2 border-[#8F2929] pl-3">
                <Search className="h-4 w-4 text-[#8F2929]" />
                <p className="font-mono text-sm uppercase tracking-[0.38em] text-[#E8E0D0]">
                  {content.hero.franchiseLabel}
                </p>
              </div>

              <h1 className="mt-4 font-serif text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.03] text-[#E8E0D0] drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
                {content.hero.title}
              </h1>

              <p className="mt-4 font-mono text-xs uppercase tracking-[0.24em] text-[#8F2929]">
                {content.hero.subtitle}
              </p>

              <p className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-[#B9AD99]">
                {content.hero.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-2.5">
                {content.hero.pillars.map((pillar) => (
                  <span
                    key={pillar}
                    className="border border-[#B9AD99]/30 bg-[#181615]/90 px-3.5 py-1.5 font-mono text-xs tracking-widest text-[#E8E0D0]"
                  >
                    {pillar}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#who-we-are"
                  className="inline-flex items-center gap-2.5 bg-[#8F2929] px-7 py-4 font-mono text-xs uppercase tracking-[0.22em] text-[#E8E0D0] shadow-lg transition-all hover:bg-[#a63232]"
                >
                  {content.hero.ctaLabel}
                  <ArrowDown className="h-4 w-4" />
                </a>
                <button
                  type="button"
                  onClick={handleExportPdf}
                  className="no-print inline-flex items-center gap-2 border border-[#B9AD99]/35 bg-[#151413]/80 px-5 py-4 font-mono text-xs uppercase tracking-[0.18em] text-[#B9AD99] transition-colors hover:border-[#E8E0D0] hover:text-[#E8E0D0]"
                >
                  <FileDown className="h-4 w-4" />
                  {content.controls.downloadSummaryLabel}
                </button>
              </div>
            </motion.div>

            {/* Right: Pinned Archival Case Exhibit */}
            <motion.div
              initial={{ opacity: 0, x: 24, rotate: 1.5 }}
              animate={{ opacity: 1, x: 0, rotate: 1.5 }}
              transition={{ duration: 0.85, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="relative border border-[#B9AD99]/35 bg-[#191715] p-5 shadow-[0_25px_70px_rgba(0,0,0,0.85)] transition-transform duration-500 hover:rotate-0">
                <div className="pushpin-red absolute -top-2 left-1/2 -translate-x-1/2 z-20" />
                <div className="mb-3 flex items-center justify-between border-b border-[#B9AD99]/15 pb-2 font-mono text-[11px] text-[#777777]">
                  <span>EXHIBIT A-00</span>
                  <span className="text-[#8F2929]">{content.meta.caseNumber}</span>
                </div>
                <PlaceholderImage
                  src={content.hero.backgroundImage}
                  alt="The Next Case — Albi Polska"
                  placeholderLabel={content.hero.backgroundPlaceholder}
                  aspectClass="aspect-[4/5]"
                  onExpand={openLightbox}
                  exhibitCode="FILE #001"
                />
                <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[#777777]">
                  <span>STATUS: ACTIVE INVESTIGATION</span>
                  <span>POLAND</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SLIDE 2: EVIDENCE 01 — WHO WE ARE */}
        <section id="who-we-are" className="evidence-board-bg border-b border-[#B9AD99]/20 px-6 py-24 md:px-12">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              tag={content.whoWeAre.sectionTag}
              evidence={content.whoWeAre.evidenceNumber}
              heading={content.whoWeAre.heading}
              description={content.whoWeAre.description}
            />

            <div className="grid gap-8 md:grid-cols-3">
              {content.whoWeAre.pillars.map((pillar) => (
                <motion.article
                  key={pillar.number}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeInUp}
                  className="evidence-card relative flex flex-col border border-[#B9AD99]/25 bg-[#191715] p-6"
                >
                  <div className="pushpin-red absolute -top-2 right-6" />
                  <div className="flex items-center justify-between border-b border-[#B9AD99]/15 pb-3">
                    <span className="font-mono text-2xl text-[#8F2929]">{pillar.number}</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#777777]">
                      EXHIBIT 01-{pillar.number}
                    </span>
                  </div>
                  <h3 className="mt-4 font-serif text-2xl font-semibold text-[#E8E0D0]">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#B9AD99]">
                    {pillar.description}
                  </p>
                  <div className="mt-6">
                    <PlaceholderImage
                      src={pillar.image}
                      alt={pillar.title}
                      placeholderLabel={pillar.placeholder}
                      aspectClass="aspect-[16/10]"
                      onExpand={openLightbox}
                      caption={pillar.title}
                      showTape
                    />
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Signature Product Lines (Czytaj z Albikiem & OKIDOKI) */}
            <div className="mt-14 relative border border-[#B9AD99]/30 bg-[#161413] p-6 md:p-8 shadow-xl">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-[#8F2929]">
                <Paperclip className="h-4 w-4" />
                <span>{content.whoWeAre.signatureLinesTitle}</span>
              </div>
              <div className="mt-6 grid gap-8 md:grid-cols-2">
                {content.whoWeAre.signatureLines.map((line, idx) => (
                  <div
                    key={line.name}
                    className="grid gap-5 sm:grid-cols-12 items-center border border-[#B9AD99]/15 bg-[#1B1917] p-4"
                  >
                    <div className="sm:col-span-5">
                      <PlaceholderImage
                        src={line.image}
                        alt={line.name}
                        placeholderLabel={line.placeholder}
                        aspectClass="aspect-[4/3]"
                        onExpand={openLightbox}
                        caption={line.name}
                        exhibitCode={`LINE 0${idx + 1}`}
                      />
                    </div>
                    <div className="sm:col-span-7">
                      <h4 className="font-mono text-sm font-bold tracking-widest text-[#E8E0D0]">
                        {line.name}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-[#B9AD99]">
                        {line.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SLIDE 3: EVIDENCE 02 — THE DETECTIVES (AGED PAPER PERSONNEL FILES) */}
        <section id="detectives" className="dossier-paper border-b border-[#111111]/20 px-6 py-24 md:px-12">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              tag={content.detectives.sectionTag}
              evidence={content.detectives.evidenceNumber}
              heading={content.detectives.heading}
              description={content.detectives.subtitle}
              lightPaper
            />

            <div className="grid gap-10 md:grid-cols-3">
              {content.detectives.members.map((member, idx) => (
                <motion.article
                  key={member.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeInUp}
                  className={`evidence-card relative border border-[#161412]/25 bg-[#EDE6D6] p-6 shadow-[0_14px_32px_rgba(0,0,0,0.18)] ${
                    idx === 0 ? 'md:-rotate-1' : idx === 2 ? 'md:rotate-1' : ''
                  } hover:rotate-0`}
                >
                  <div className="mb-4 flex items-center justify-between border-b border-[#161412]/15 pb-2.5 font-mono text-[11px] text-[#5A5248]">
                    <span>{member.fileCode}</span>
                    <span className="border border-[#8F2929] px-1.5 py-0.5 text-[10px] text-[#8F2929]">
                      CLEARED
                    </span>
                  </div>
                  <PlaceholderImage
                    src={member.image}
                    alt={`${member.name} — ${member.position}`}
                    placeholderLabel={member.placeholder}
                    aspectClass="aspect-[3/4]"
                    onExpand={openLightbox}
                    caption={`${member.name} — ${member.position}`}
                    showTape
                  />
                  <h3 className="mt-5 font-serif text-3xl font-bold text-[#141210]">
                    {member.name}
                  </h3>
                  <p className="mt-1 font-mono text-xs uppercase tracking-widest text-[#8F2929]">
                    {member.position}
                  </p>
                  <p className="mt-3 border-t border-[#161412]/10 pt-3 text-sm italic leading-relaxed text-[#2C2824]">
                    “{member.description}”
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* SLIDE 4: EVIDENCE 03 — DISTRIBUTION CHANNELS */}
        <section id="distribution" className="relative border-b border-[#B9AD99]/20 px-6 py-24 md:px-12 overflow-hidden">
          <div className="desk-spotlight pointer-events-none absolute inset-0 opacity-70" />
          <div className="relative mx-auto max-w-7xl">
            <SectionHeader
              tag={content.distribution.sectionTag}
              evidence={content.distribution.evidenceNumber}
              heading={content.distribution.heading}
              description={content.distribution.description}
            />

            <div className="grid gap-8 md:grid-cols-3">
              {content.distribution.channels.map((channel, idx) => (
                <div
                  key={channel.badge}
                  className="evidence-card relative border border-[#B9AD99]/25 bg-[#181615] p-6 flex flex-col"
                >
                  <div className="flex items-center justify-between border-b border-[#B9AD99]/15 pb-3">
                    <span className="border border-[#8F2929] bg-[#8F2929]/15 px-2.5 py-1 font-mono text-xs tracking-widest text-[#E8E0D0]">
                      {channel.badge}
                    </span>
                    <span className="font-mono text-xs text-[#777777]">ROUTE 0{idx + 1}</span>
                  </div>
                  <h3 className="mt-5 font-serif text-2xl font-semibold text-[#E8E0D0]">
                    {channel.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#B9AD99]">
                    {channel.description}
                  </p>
                  {'url' in channel && channel.url && (
                    <a
                      href={channel.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-[#E8E0D0] underline decoration-[#8F2929] underline-offset-4 hover:text-[#B9AD99]"
                    >
                      albipolska.pl <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                  <div className="mt-6">
                    <PlaceholderImage
                      src={channel.image}
                      alt={channel.title}
                      placeholderLabel={channel.placeholder}
                      aspectClass="aspect-[16/10]"
                      onExpand={openLightbox}
                      caption={channel.title}
                      exhibitCode={`CH-0${idx + 1}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SLIDE 5: EVIDENCE 03-B — MARKETING (DRAFT PLACEHOLDER FOR ADAM) */}
        <section id="marketing" className="evidence-board-bg border-b border-[#B9AD99]/20 px-6 py-24 md:px-12">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              tag={content.marketing.sectionTag}
              evidence={content.marketing.evidenceNumber}
              heading={content.marketing.heading}
              description={content.marketing.description}
            />

            <div className="mb-8 flex items-start gap-3 border-l-4 border-[#8F2929] bg-[#1D1515] p-4 font-mono text-xs text-[#E8E0D0]">
              <AlertCircle className="h-4 w-4 shrink-0 text-[#8F2929] mt-0.5" />
              <span>{content.marketing.draftNote}</span>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {content.marketing.highlights.map((item) => (
                <div key={item.label} className="border border-[#B9AD99]/25 bg-[#191715] p-6">
                  <p className="font-mono text-xs uppercase tracking-widest text-[#8F2929]">
                    {item.label}
                  </p>
                  <p className="mt-3 font-serif text-xl font-semibold text-[#E8E0D0]">
                    {item.value}
                  </p>
                  <p className="mt-2 text-sm text-[#B9AD99] leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {content.marketing.gallery.map((item, i) => (
                <div key={i} className="border border-[#B9AD99]/25 bg-[#191715] p-4">
                  <PlaceholderImage
                    src={item.image}
                    alt={item.caption}
                    placeholderLabel={item.placeholder}
                    aspectClass="aspect-[16/9]"
                    onExpand={openLightbox}
                    caption={item.caption}
                    showTape
                  />
                  <p className="mt-3 font-mono text-xs text-[#B9AD99]">{item.caption}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SLIDE 6: EVIDENCE 04 — CREATIVE EXECUTION (PR PACKAGE) */}
        <section id="creative-execution" className="border-b border-[#B9AD99]/20 px-6 py-24 md:px-12">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              tag={content.creativeExecution.sectionTag}
              evidence={content.creativeExecution.evidenceNumber}
              heading={content.creativeExecution.heading}
              description={content.creativeExecution.description}
            />

            <div className="mb-8 flex items-start gap-3 border border-[#B9AD99]/25 bg-[#181615] p-4 font-mono text-xs text-[#B9AD99]">
              <FolderClosed className="h-4 w-4 shrink-0 text-[#8F2929] mt-0.5" />
              <span>{content.creativeExecution.draftNote}</span>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {content.creativeExecution.formats.map((format) => (
                <div key={format.step} className="evidence-card border border-[#B9AD99]/25 bg-[#191715] p-6">
                  <span className="font-mono text-xs tracking-widest text-[#8F2929]">
                    {format.step}
                  </span>
                  <h3 className="mt-2 font-serif text-2xl font-semibold text-[#E8E0D0]">
                    {format.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#B9AD99]">
                    {format.description}
                  </p>
                  <div className="mt-6">
                    <PlaceholderImage
                      src={format.image}
                      alt={format.title}
                      placeholderLabel={format.placeholder}
                      aspectClass="aspect-[4/3]"
                      onExpand={openLightbox}
                      caption={format.title}
                      showTape
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SLIDE 7: EVIDENCE 05 — WE PLAY MICROMACRO (POLAROID EVIDENCE ON PAPER) */}
        <section id="we-play" className="dossier-paper border-b border-[#111111]/20 px-6 py-24 md:px-12">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              tag={content.wePlayMicroMacro.sectionTag}
              evidence={content.wePlayMicroMacro.evidenceNumber}
              heading={content.wePlayMicroMacro.heading}
              description={content.wePlayMicroMacro.description}
              lightPaper
            />

            <div className="mb-10 border-l-4 border-[#8F2929] pl-5">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#8F2929]">
                {content.wePlayMicroMacro.photoSectionLabel}
              </p>
              <p className="mt-2 font-serif text-2xl md:text-3xl font-semibold text-[#141210]">
                {content.wePlayMicroMacro.tagline}
              </p>
              <p className="mt-1 text-sm text-[#3A352F]">
                {content.wePlayMicroMacro.subTagline}
              </p>
            </div>

            <div className="grid gap-10 md:grid-cols-2">
              {content.wePlayMicroMacro.photos.map((photo, idx) => (
                <div
                  key={idx}
                  className={`evidence-card relative border border-[#161412]/20 bg-[#F7F2E7] p-4 pb-6 shadow-[0_16px_36px_rgba(0,0,0,0.2)] ${
                    idx === 0 ? 'md:-rotate-1' : 'md:rotate-1'
                  } hover:rotate-0`}
                >
                  <PlaceholderImage
                    src={photo.image}
                    alt={photo.caption}
                    placeholderLabel={photo.placeholder}
                    aspectClass="aspect-[16/10]"
                    onExpand={openLightbox}
                    caption={photo.caption}
                    showTape
                  />
                  <p className="mt-4 font-mono text-xs text-[#3A352F]">{photo.caption}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SLIDE 8: EVIDENCE 06 — COMMUNITY & EVENTS */}
        <section id="community-events" className="border-b border-[#B9AD99]/20 px-6 py-24 md:px-12">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              tag={content.communityEvents.sectionTag}
              evidence={content.communityEvents.evidenceNumber}
              heading={content.communityEvents.heading}
              description={content.communityEvents.description}
            />

            <div className="grid gap-8 md:grid-cols-3">
              {content.communityEvents.pillars.map((pillar) => (
                <div
                  key={pillar.number}
                  className="evidence-card border border-[#B9AD99]/25 bg-[#191715] p-6 flex flex-col"
                >
                  <span className="font-mono text-xl text-[#8F2929]">{pillar.number}</span>
                  <h3 className="mt-2 font-serif text-2xl font-semibold text-[#E8E0D0]">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#B9AD99]">
                    {pillar.description}
                  </p>
                  <div className="mt-6">
                    <PlaceholderImage
                      src={pillar.image}
                      alt={pillar.title}
                      placeholderLabel={pillar.placeholder}
                      aspectClass="aspect-[16/10]"
                      onExpand={openLightbox}
                      caption={pillar.title}
                      exhibitCode={`EV-${pillar.number}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SLIDE 9: EVIDENCE 06-B — FOUR IDEAS TO INVESTIGATE (RED-STRING EVIDENCE BOARD) */}
        <section id="brand-ideas" className="evidence-board-bg border-b border-[#B9AD99]/20 px-6 py-24 md:px-12">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              tag={content.brandIdeas.sectionTag}
              evidence={content.brandIdeas.evidenceNumber}
              heading={content.brandIdeas.heading}
              description={content.brandIdeas.description}
            />

            <div className="relative grid gap-8 lg:grid-cols-12">
              {/* Left: Pinned Leads List */}
              <div className="lg:col-span-5 flex flex-col gap-3.5 relative">
                {/* Vertical red investigation thread connecting the 4 leads */}
                <div className="pointer-events-none absolute left-5 top-6 bottom-6 w-[2px] bg-[#8F2929]/55 hidden sm:block" />

                {content.brandIdeas.ideas.map((idea, idx) => {
                  const active = selectedIdea === idx;
                  return (
                    <button
                      key={idea.number}
                      type="button"
                      onClick={() => setSelectedIdea(idx)}
                      className={`relative text-left border p-5 sm:pl-12 transition-all ${
                        active
                          ? 'border-[#8F2929] bg-[#211616] shadow-[0_0_25px_rgba(143,41,41,0.22)]'
                          : 'border-[#B9AD99]/20 bg-[#191715] hover:border-[#B9AD99]/50'
                      }`}
                    >
                      <span
                        className={`hidden sm:block absolute left-[14px] top-6 h-3 w-3 rounded-full border-2 ${
                          active
                            ? 'border-[#E8E0D0] bg-[#8F2929] scale-125'
                            : 'border-[#8F2929] bg-[#191715]'
                        } transition-transform`}
                      />
                      <div className="flex items-center justify-between font-mono text-[11px]">
                        <span className="text-[#8F2929]">{idea.code}</span>
                        <span className="text-[#777777]">{idea.phase}</span>
                      </div>
                      <h3 className="mt-2 font-serif text-xl font-semibold text-[#E8E0D0]">
                        {idea.number}. {idea.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-[#B9AD99]">{idea.description}</p>
                    </button>
                  );
                })}
              </div>

              {/* Right: Active Case File Dossier */}
              <div className="lg:col-span-7">
                {content.brandIdeas.ideas[selectedIdea] && (
                  <div className="relative border border-[#B9AD99]/35 bg-[#191715] p-6 md:p-8 h-full flex flex-col justify-between shadow-2xl">
                    <div className="pushpin-red absolute -top-2 left-1/2 -translate-x-1/2" />
                    <div>
                      <div className="flex items-center justify-between border-b border-[#B9AD99]/20 pb-4">
                        <span className="stamp-red text-xs">
                          {content.brandIdeas.ideas[selectedIdea].code}
                        </span>
                        <span className="font-mono text-xs uppercase tracking-widest text-[#B9AD99]">
                          {content.brandIdeas.ideas[selectedIdea].phase}
                        </span>
                      </div>
                      <h3 className="mt-6 font-serif text-3xl font-bold text-[#E8E0D0]">
                        {content.brandIdeas.ideas[selectedIdea].title}
                      </h3>
                      <p className="mt-3 text-base leading-relaxed text-[#E8E0D0]">
                        {content.brandIdeas.ideas[selectedIdea].description}
                      </p>
                      <p className="mt-4 border-l-2 border-[#8F2929] pl-3 font-mono text-xs text-[#B9AD99]">
                        OBJECTIVE: {content.brandIdeas.ideas[selectedIdea].objective}
                      </p>
                    </div>
                    <div className="mt-6">
                      <PlaceholderImage
                        src={content.brandIdeas.ideas[selectedIdea].image}
                        alt={content.brandIdeas.ideas[selectedIdea].title}
                        placeholderLabel={content.brandIdeas.ideas[selectedIdea].placeholder}
                        aspectClass="aspect-[16/9]"
                        onExpand={openLightbox}
                        caption={content.brandIdeas.ideas[selectedIdea].title}
                        showTape
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SLIDE 10: FINAL EVIDENCE — THE PARTNERSHIP */}
        <section id="partnership" className="border-b border-[#B9AD99]/20 px-6 py-24 md:px-12">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              tag={content.partnership.sectionTag}
              evidence={content.partnership.evidenceNumber}
              heading={content.partnership.heading}
              description={content.partnership.description}
            />

            <div className="grid gap-6 md:grid-cols-2">
              {content.partnership.reasons.map((reason) => (
                <div
                  key={reason.number}
                  className="evidence-card border border-[#B9AD99]/25 bg-[#191715] p-6 md:p-8 flex gap-5"
                >
                  <span className="font-mono text-2xl text-[#8F2929]">{reason.number}</span>
                  <div>
                    <h3 className="font-serif text-2xl font-semibold text-[#E8E0D0]">
                      {reason.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#B9AD99]">
                      {reason.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-3 border-l-4 border-[#8F2929] bg-[#191715] p-6 shadow-lg">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-[#8F2929]" />
              <p className="font-serif text-lg italic text-[#E8E0D0]">
                {content.partnership.closingNote}
              </p>
            </div>
          </div>
        </section>

        {/* SLIDE 11: CASE CONTINUES — CLOSING & CONTACT */}
        <section id="case-continues" className="relative px-6 py-28 md:px-12 overflow-hidden">
          <div className="desk-spotlight pointer-events-none absolute inset-0" />
          <div className="venetian-shadow pointer-events-none absolute inset-0 opacity-40" />

          <div className="relative mx-auto max-w-5xl border border-[#B9AD99]/40 bg-[#181615] p-8 md:p-14 shadow-[0_30px_80px_rgba(0,0,0,0.9)]">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#B9AD99]">
                {content.caseContinues.sectionTag}
              </span>
              <span className="stamp-red text-xs">{content.caseContinues.eyebrow}</span>
            </div>

            <h2 className="mt-6 font-serif text-4xl md:text-6xl font-bold leading-tight text-[#E8E0D0]">
              {content.caseContinues.heading}
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#B9AD99]">
              {content.caseContinues.closingMessage}
            </p>

            <div className="mt-10 grid gap-6 border-t border-b border-[#B9AD99]/20 py-8 sm:grid-cols-2">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-[#8F2929]">
                  {content.caseContinues.partnerLabel}
                </p>
                <p className="mt-2 font-serif text-2xl font-semibold text-[#E8E0D0]">
                  {content.caseContinues.companyName}
                </p>
                <a
                  href={content.caseContinues.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 font-mono text-sm text-[#B9AD99] underline decoration-[#8F2929] underline-offset-4 hover:text-[#E8E0D0]"
                >
                  {content.caseContinues.website}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

              <div className="space-y-2.5 font-mono text-xs text-[#B9AD99]">
                <div className="flex items-center gap-2.5">
                  <User className="h-4 w-4 text-[#8F2929]" />
                  <span>{content.caseContinues.contact.person}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-[#8F2929]" />
                  <span>{content.caseContinues.contact.email}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-[#8F2929]" />
                  <span>{content.caseContinues.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 text-[#8F2929]" />
                  <span>{content.caseContinues.contact.location}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleExportPdf}
                className="no-print inline-flex items-center gap-2 bg-[#8F2929] px-5 py-3 font-mono text-xs uppercase tracking-widest text-[#E8E0D0] hover:bg-[#a63232]"
              >
                <FileDown className="h-4 w-4" />
                {content.controls.downloadSummaryLabel}
              </button>

              <a
                href="#hero"
                className="no-print inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#B9AD99] hover:text-[#E8E0D0]"
              >
                <ArrowUp className="h-4 w-4" />
                {content.controls.backToTopLabel}
              </a>
            </div>
          </div>
        </section>
      </main>

      <LightboxModal image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </div>
  );
}

export default App;
