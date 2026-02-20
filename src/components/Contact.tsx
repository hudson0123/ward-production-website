import React, { useRef, useState, FormEvent, useEffect } from "react";
import emailjs from '@emailjs/browser';
import Link from "next/link";
import { siteConfig } from "../config/siteConfig";

export default function Contact() {
  const { contact } = siteConfig;
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-reveal");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setEmailStatus('idle');

    if (formRef.current) {
      emailjs.sendForm(
        contact.emailJS.serviceId,
        contact.emailJS.templateId,
        formRef.current,
        contact.emailJS.publicKey
      )
      .then((result) => {
          console.log(result.text);
          setIsSending(false);
          setEmailStatus('success');
          if (formRef.current) formRef.current.reset();
          setTimeout(() => setEmailStatus('idle'), 5000);
      }, (error) => {
          console.log(error.text);
          setIsSending(false);
          setEmailStatus('error');
      });
    }
  };

  return (
    <section id="contact" className="relative section bg-zinc-50 overflow-hidden py-24 md:py-32">
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-12 gap-y-20 lg:gap-12">
        <div 
          className="col-span-12 lg:col-span-6"
        >
          <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-zinc-200" />
            {contact.tagline}
          </p>
          <h2 className="text-5xl md:text-7xl font-bold text-zinc-900 mb-8 leading-tight tracking-tighter">
            {contact.titlePrimary}<br />
            <span className="text-zinc-400 leading-tight">{contact.titleSecondary}</span>
          </h2>
          <p className="text-zinc-500 max-w-sm mb-12 leading-relaxed text-base md:text-lg">
            {contact.description}
          </p>
          
          {/* Social Links - Architectural Row */}
          <div className="flex flex-col gap-6">
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold">Find Us</p>
            <div className="flex flex-wrap gap-x-8 gap-y-6">
              {contact.socialLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-zinc-500 hover:text-[#D97706] transition-colors uppercase text-[11px] tracking-widest font-bold border-b border-zinc-200 hover:border-[#D97706] pb-1"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div 
          ref={sectionRef}
          className="col-span-12 lg:col-span-6 bg-white p-6 sm:p-8 md:p-12 shadow-sm border border-zinc-100"
          style={{ borderRadius: '2px' }}
        >
          <form ref={formRef} onSubmit={sendEmail}>
            <div className="mb-8">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-3">Name</label>
              <input 
                type="text" 
                name="user_name"
                className="form-input" 
                placeholder="Enter name"
                required 
              />
            </div>
            <div className="mb-8">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-3">Email</label>
              <input 
                type="email" 
                name="user_email"
                className="form-input" 
                placeholder="email@address.com" 
                required
              />
            </div>
            <div className="mt-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-3">Project Details</label>
              <textarea 
                name="message"
                className="form-input resize-none" 
                rows={4} 
                placeholder="Describe the scope..."
                required 
              />
            </div>
            <div className="m-5 text-center">
              <p className="text-[10px] inline uppercase tracking-widest text-zinc-400 transition-colors font-bold">
                Want to go ahead and book?
              </p>
              <Link href="/book" className="hover:underline text-[10px] ml-2 uppercase tracking-widest text-[#D97706] transition-colors font-bold">
                Book Now
              </Link>
            </div>
            <button 
              type="submit" 
              className="btn-primary w-full py-5 text-[11px] tracking-[0.2em] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSending}
            >
              {isSending ? "Sending..." : "Initiate Request"}
            </button>
            {emailStatus === 'success' && (
              <p className="mt-4 text-green-600 text-[11px] uppercase tracking-widest text-center font-bold">Message Sent Successfully</p>
            )}
            {emailStatus === 'error' && (
              <p className="mt-4 text-red-600 text-[11px] uppercase tracking-widest text-center font-bold">Failed to send message. Please try again.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
