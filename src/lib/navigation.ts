export type FooterSectionItem = { label: string; href?: string };
export type FooterSection = { title: string; items: FooterSectionItem[] };

export function getFooterSections(): FooterSection[] {
  return [
    {
      title: 'Services',
      items: [
        { label: 'Agent Verification', href: '/search' },
        { label: 'Consumer Protection', href: '/services/consumer-protection' },
      ],
    },
    {
      title: 'Resources',
      items: [{ label: 'Professional Standards', href: '/resources/professional-standards' }],
    },
    {
      title: 'Legal',
      items: [
        { label: 'Privacy Policy', href: '/legal/privacy-policy' },
        { label: 'Terms of Service', href: '/legal/terms-and-conditions' },
      ],
    },
  ];
}
