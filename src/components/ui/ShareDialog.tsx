import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react';
import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  GabIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  ThreadsIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon,
  XIcon,
  BlueskyIcon,
} from "react-share";

interface SharePopupProps {
  onClose: () => void;
  url: string;
  title?: string;
  isOpen: boolean;
}

const ShareDialog = ({ onClose, url, title = "", isOpen }: SharePopupProps) => {
  const icons = [
    { Icon: EmailIcon, name: "Email" },
    { Icon: FacebookIcon, name: "Facebook" },
    { Icon: FacebookMessengerIcon, name: "Messenger" },
    { Icon: GabIcon, name: "Gab" },
    { Icon: HatenaIcon, name: "Hatena" },
    { Icon: InstapaperIcon, name: "Instapaper" },
    { Icon: LineIcon, name: "Line" },
    { Icon: LinkedinIcon, name: "LinkedIn" },
    { Icon: LivejournalIcon, name: "LiveJournal" },
    { Icon: MailruIcon, name: "Mail.ru" },
    { Icon: OKIcon, name: "Odnoklassniki" },
    { Icon: PinterestIcon, name: "Pinterest" },
    { Icon: PocketIcon, name: "Pocket" },
    { Icon: RedditIcon, name: "Reddit" },
    { Icon: TelegramIcon, name: "Telegram" },
    { Icon: ThreadsIcon, name: "Threads" },
    { Icon: TumblrIcon, name: "Tumblr" },
    { Icon: TwitterIcon, name: "Twitter" },
    { Icon: ViberIcon, name: "Viber" },
    { Icon: VKIcon, name: "VK" },
    { Icon: WeiboIcon, name: "Weibo" },
    { Icon: WhatsappIcon, name: "WhatsApp" },
    { Icon: WorkplaceIcon, name: "Workplace" },
    { Icon: XIcon, name: "X" },
    { Icon: BlueskyIcon, name: "Bluesky" },
  ];

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30 dark:bg-black/70" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-xl bg-white dark:bg-gray-900 shadow-xl">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Share</h2>
              <button
                onClick={onClose}
                className="rounded-full p-1 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {icons.map(({ Icon, name }) => (
                  <button
                    key={name}
                    className="flex flex-col items-center rounded-lg p-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                    aria-label={`Share on ${name}`}
                  >
                    <Icon size={40} round />
                    <span className="mt-2 text-xs text-gray-600 dark:text-gray-300">{name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ShareDialog;