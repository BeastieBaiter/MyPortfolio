if (document.getElementById('my-work-link')) {
  document.getElementById('my-work-link').addEventListener('click', () => {
    document.getElementById('my-work-section').scrollIntoView({behavior: "smooth"})
  })
}

const EMAIL = "pamplona1999@gmail.com";
const SOCIAL_LINKS = {
  itch: "https://yourusername.itch.io/",
  twitter: "https://twitter.com/yourhandle",
  instagram: "https://instagram.com/yourhandle",
  linkedin: "https://linkedin.com/in/yourhandle"
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("footer-itch-link").href = SOCIAL_LINKS.itch;
  document.getElementById("footer-twitter-link").href = SOCIAL_LINKS.twitter;
  //document.getElementById("footer-instagram-link").href = SOCIAL_LINKS.instagram;
  document.getElementById("footer-linkedin-link").href = SOCIAL_LINKS.linkedin;
  document.getElementById("footer-email-link").href = `mailto:${EMAIL}`;
  document.getElementById("email-link").href = `mailto:${EMAIL}`;
});