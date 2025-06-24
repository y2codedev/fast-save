import HeroSection from '@/components/sections/HeroSection';
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import DownloadForm from '@/components/sections/DownloadForm';
import DownloadSteps from '@/components/sections/DownloadSteps';
import LegalDisclaimer from '@/components/sections/LegalDisclaimer';
import { ErrorAlert } from '@/components/sections/ErrorAlert';
import { SuccessAlert } from '@/components/sections/SuccessAlert';
import Loader from '@/components/ui/Loader';
import ReelResult from '@/components/sections/ReelResult';
import CategoryNav from '@/components/sections/CategoryNav';
import ThemeProviderWrapper from '@/components/sections/ThemeProviderWrapper';
import TopText from '@/components/sections/TopText';

export type { SocialLink, LegalLink, FooterProps } from './types';
export { DEFAULT_SOCIAL_LINKS, DEFAULT_LEGAL_LINKS, FEATURES } from './socialLinks';
export {
    HeroSection,
    DownloadForm,
    DownloadSteps,
    LegalDisclaimer,
    ErrorAlert,
    SuccessAlert,
    Loader,
    ReelResult,
    CategoryNav,
    Navbar,
    Footer,
    TopText,
    ThemeProviderWrapper
};