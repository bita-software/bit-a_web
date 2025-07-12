import { useTranslations } from 'next-intl';
import LegalPageTemplate from '../../../components/LegalPageTemplate';

export default function PrivacyPolicyPage() {
  const t = useTranslations('LegalPages.privacyPolicy');
  
  const sections = {
    intro: {
      title: t('sections.intro.title'),
      content: t('sections.intro.content')
    },
    visitors: {
      title: t('sections.visitors.title'),
      content: t('sections.visitors.content')
    },
    pii: {
      title: t('sections.pii.title'),
      content: t('sections.pii.content')
    },
    security: {
      title: t('sections.security.title'),
      content: t('sections.security.content')
    },
    cookies: {
      title: t('sections.cookies.title'),
      content: t('sections.cookies.content')
    },
    changes: {
      title: t('sections.changes.title'),
      content: t('sections.changes.content')
    },
    contact: {
      title: t('sections.contact.title'),
      content: t('sections.contact.content')
    }
  };

  return (
    <LegalPageTemplate
      title={t('title')}
      lastUpdated={t('lastUpdated')}
      sections={sections}
    />
  );
} 