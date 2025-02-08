function Footer() {
  return (
    <footer className="footer">
      <p className="footer__paragraph">
        Developed by Ilya Lyudevig
        <span className="footer__date">{new Date().getFullYear()}</span>
      </p>
    </footer>
  );
}

export default Footer;
