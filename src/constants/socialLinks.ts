import {
    FiGithub,
    FiTwitter,
    FiLinkedin,
    FiInstagram
} from 'react-icons/fi';
import {
    BoltIcon,
    DevicePhoneMobileIcon,
    LinkIcon,
    LockClosedIcon,
    ClipboardDocumentIcon,
    ArrowRightIcon,
    ArrowDownTrayIcon,
    FilmIcon,
    CameraIcon,
    PhotoIcon,
    SpeakerWaveIcon,
    RectangleStackIcon,
    PlayCircleIcon
} from '@heroicons/react/24/outline'

import type { Feature, LegalLink, SocialLink, Step } from './types';

export const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
    {
        id: 1,
        href: 'https://github.com',
        icon: FiGithub,
        ariaLabel: 'GitHub profile'
    },
    {
        id: 2,
        href: 'https://twitter.com',
        icon: FiTwitter,
        ariaLabel: 'Twitter profile'
    },
    {
        id: 3,
        href: 'https://linkedin.com',
        icon: FiLinkedin,
        ariaLabel: 'LinkedIn profile'
    },
    {
        id: 4,
        href: 'https://instagram.com',
        icon: FiInstagram,
        ariaLabel: 'Instagram profile'
    }
];


export const DEFAULT_LEGAL_LINKS: LegalLink[] = [
    {
        id: 1,
        href: '/privacy',
        label: 'Privacy Policy'
    },
    {
        id: 2,
        href: '/terms',
        label: 'Terms of Service'
    },
    {
        id: 3,
        href: '/cookies',
        label: 'Cookie Policy'
    }
];

export const FEATURES: Feature[] = [
    {
        id: 1,
        name: 'Lightning Fast',
        description: 'Download reels in seconds with our optimized processing',
        icon: BoltIcon,
    },
    {
        id: 2,
        name: 'No Watermarks',
        description: 'Get original quality videos without any branding',
        icon: DevicePhoneMobileIcon,
    },
    {
        id: 3,
        name: 'Simple Process',
        description: 'Just paste the link and download in one click',
        icon: LinkIcon,
    },
    {
        id: 4,
        name: 'Privacy Focused',
        description: 'No login required, we never store your data',
        icon: LockClosedIcon,
    },
]



export const STEP: Step[] = [
    {
        id: 1,
        name: 'Find a Reel',
        description: 'Open Instagram and find the Reel you want to download',
        icon: DevicePhoneMobileIcon,
    },
    {
        id: 2,
        name: 'Copy Link',
        description: 'Tap the three dots menu and select "Copy link"',
        icon: ClipboardDocumentIcon,
    },
    {
        id: 3,
        name: 'Paste URL',
        description: 'Paste the Instagram link in our downloader',
        icon: ArrowRightIcon,
    },
    {
        id: 4,
        name: 'Download',
        description: 'Click download and save to your device',
        icon: ArrowDownTrayIcon,
    },
]

export const NAVITEMS: SocialLink[] = [
    {
        id: 1,
        href: '/reels',
        icon: FilmIcon,
        ariaLabel: 'Reels',
    },
    {
        id: 2,
        href: '/pinterest',
        icon: RectangleStackIcon,
        ariaLabel: 'Pinterest',
    },
    {
        id: 3,
        href: '/video',
        icon: PlayCircleIcon,
        ariaLabel: 'Video',
    },
    {
        id: 4,
        href: '/audio',
        icon: SpeakerWaveIcon,
        ariaLabel: 'Audio',
    },
    {
        id: 5,
        href: '/photo',
        icon: PhotoIcon,
        ariaLabel: 'Photo',
    },
    {
        id: 6,
        href: '/stories',
        icon: CameraIcon,
        ariaLabel: 'Stories',
    },
    {
        id: 7,
        href: '/fb-video',
        icon: PlayCircleIcon,
        ariaLabel: 'FB Video',
    },
];