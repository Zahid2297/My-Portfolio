export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 py-12 px-6 md:px-14 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono uppercase tracking-[0.14em] text-cream/30">
      <div>
        <p>Mohemmad Zahed © {currentYear}</p>
      </div>
      <div className="flex gap-8">
        <a
          href="https://github.com/Zahid2297"
          target="_blank"
          referrerPolicy="no-referrer"
          rel="noopener noreferrer"
          className="hover:text-gold transition-colors duration-250 cursor-none"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/7xh1d/"
          target="_blank"
          referrerPolicy="no-referrer"
          rel="noopener noreferrer"
          className="hover:text-gold transition-colors duration-250 cursor-none"
        >
          LinkedIn
        </a>
        <a
          href="https://x.com/7xh1d"
          target="_blank"
          referrerPolicy="no-referrer"
          rel="noopener noreferrer"
          className="hover:text-gold transition-colors duration-250 cursor-none"
        >
          Twitter
        </a>
      </div>
    </footer>
  );
}
