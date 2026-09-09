export const authorName = 'Igor A. Lilliputten';
export const authorSite = 'lilliputten.com';
export const authorSiteUrl = `https://${authorSite}`;
export const authorTgId = 'lilliputten';
export const tgUrlPrefix = `https://t.me`;
export const authorTgUrl = `${tgUrlPrefix}/${authorTgId}`;
export const authorGithub = 'https://github.com/lilliputten';
export const projectGithub = 'https://github.com/lilliputten/qrcodex';
export const authorLinkedin = 'https://linkedin.com/in/lilliputten';

export const contactEmail = 'qrcodex@lilliputten.com';

/** Site default url. See also `VERCEL_PROJECT_PRODUCTION_URL` and `PUBLIC_URL` in the server environment */
// export const publicAddr = 'https://qrcodex.lilliputten.com/';

/** This app instance launch time */
export const startDate = new Date();
/** Current year */
export const currentYear = startDate.getFullYear();

export const effectivePrivacyDate = new Date(`${currentYear}.01.01`);
export const effectiveTermsDate = effectivePrivacyDate;
export const effectiveCookiesDate = effectivePrivacyDate;
