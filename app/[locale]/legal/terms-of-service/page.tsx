import { useTranslations } from 'next-intl';
import LegalPageTemplate from '../../../components/LegalPageTemplate';

export default function TermsOfServicePage() {
  const t = useTranslations('LegalPages.termsOfService');
  
  const sections = {
    intro: {
      title: t('sections.intro.title'),
      content: t('sections.intro.content')
    },
    services: {
      title: t('sections.services.title'),
      content: t('sections.services.content')
    },
    payments: {
      title: t('sections.payments.title'),
      content: t('sections.payments.content')
    },
    intellectual: {
      title: t('sections.intellectual.title'),
      content: t('sections.intellectual.content')
    },
    liability: {
      title: t('sections.liability.title'),
      content: t('sections.liability.content')
    },
    termination: {
      title: t('sections.termination.title'),
      content: t('sections.termination.content')
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