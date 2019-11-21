export interface FooterLink {
    title: string;
    href?: string;
}
export interface FooterSection extends FooterLink {
    links?: FooterLink[]
}

export const FOOTER_SECTIONS: FooterSection[] = [
    {
        title: 'Company',
        links: [
            { title: 'About Us' },
            { title: 'Global DOHE' },
            { title: 'Ideology' },
            { title: 'Our Way' },
            { title: 'Contact Us' }
        ]
    },
    {
        title: 'Business-Lineup',
        links: [
            { title: 'StartupGate' },
            { title: 'Tingoware' },
            { title: 'AboutKorea' }
        ]
    },
    {
        title: 'Career',
        links: [
            { title: 'The Right Person' },
            { title: 'Recruit' }
        ]
    },
    {
        title: 'People',
        links: [
            { title: 'Our Team' },
            { title: 'Announce' },
            { title: 'Activity' },
            { title: 'News' }
        ]
    },
    {
        title: 'Culture',
        links: [
            { title: 'D.C.B.' },
            { title: 'HR Traning Tools' }
        ]
    }
]