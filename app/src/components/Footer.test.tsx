import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import Footer from './Footer';
import { LanguageProvider } from '@/hooks/useLanguage';

describe('Footer component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const renderFooter = () => {
    return render(
      <LanguageProvider>
        <Footer />
      </LanguageProvider>
    );
  };

  it('should render copyright, language selector and links', () => {
    renderFooter();

    // Check copyright
    expect(screen.getByText(/Engineering Excellence/i)).toBeInTheDocument();

    // Check language selector buttons
    expect(screen.getByRole('button', { name: /EN/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ES/i })).toBeInTheDocument();

    // Check contact and schedule links
    expect(screen.getByText('Email Us')).toBeInTheDocument();
    expect(screen.getByText('Schedule a Call')).toBeInTheDocument();
  });

  it('should toggle language to Spanish and English when clicking buttons', () => {
    renderFooter();

    const enBtn = screen.getByRole('button', { name: /EN/i });
    const esBtn = screen.getByRole('button', { name: /ES/i });

    // Switch to Spanish
    act(() => {
      esBtn.click();
    });

    expect(screen.getByText(/Excelencia en Ingeniería/i)).toBeInTheDocument();

    // Switch back to English
    act(() => {
      enBtn.click();
    });

    expect(screen.getByText(/Engineering Excellence/i)).toBeInTheDocument();
  });

  it('should point to the correct language-specific scheduling URL', () => {
    renderFooter();

    const scheduleLink = screen.getByText('Schedule a Call').closest('a');
    expect(scheduleLink).toHaveAttribute('href', 'https://cal.com/nebula-ideas/discovery');

    const esBtn = screen.getByRole('button', { name: /ES/i });

    // Switch to Spanish
    act(() => {
      esBtn.click();
    });

    expect(screen.getByText('Agendar una Llamada').closest('a')).toHaveAttribute(
      'href',
      'https://cal.com/nebula-ideas/descubrimiento'
    );
  });
});
