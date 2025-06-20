import HeroSection from '@/components/sections/HeroSection';
import DownloadForm from '@/components/sections/DownloadForm';
import DownloadSteps from '@/components/sections/DownloadSteps';
import LegalDisclaimer from '@/components/sections/LegalDisclaimer';
import { ErrorAlert } from '@/components/sections/ErrorAlert';
import { SuccessAlert } from '@/components/sections/SuccessAlert';

export type { SocialLink, LegalLink, FooterProps } from './types';
export { DEFAULT_SOCIAL_LINKS, DEFAULT_LEGAL_LINKS, FEATURES } from './socialLinks';
export { HeroSection, DownloadForm, DownloadSteps, LegalDisclaimer, ErrorAlert, SuccessAlert };