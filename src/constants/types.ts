import { IconType } from 'react-icons';

export interface SocialLink {
    id: number,
    href: string;
    icon: IconType;
    ariaLabel: string;
}

export interface LegalLink {
    id: number,
    href: string;
    label: string;
}

export interface FooterProps {
    companyTagline?: string;
    year?: number;
    socialLinks?: SocialLink[];
    legalLinks?: LegalLink[];
    accentColor?: string;
}

export interface Feature {
    id: number,
    name: string;
    description: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export interface Step {
    id: number;
    name: string;
    description: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface ReelData {
    url: string;
    title: string;
    thumbnail: string;
    username: string;
    profile_pic: string;
    video_url: string;
}

export interface ReelResultProps {
    data: ReelData;
    isSaving: boolean;
    setIsSaving: (value: boolean) => void;
}