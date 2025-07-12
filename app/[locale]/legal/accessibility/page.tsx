import { useTranslations } from 'next-intl';
import LegalPageTemplate from '../../../components/LegalPageTemplate';

export default function AccessibilityPage() {
  const t = useTranslations('LegalPages.accessibility');
  
  const sections = {
    general: {
      title: t('sections.general.title'),
      content: t('sections.general.content')
    },
    commitment: {
      title: t('sections.commitment.title'),
      content: t('sections.commitment.content')
    },
    feedback: {
      title: t('sections.feedback.title'),
      content: t('sections.feedback.content')
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