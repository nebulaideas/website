import { useLanguage } from '@/hooks/useLanguage';
import ScrollReveal from '@/components/ScrollReveal';
import { ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    titleKey: 'blog1_title',
    excerptKey: 'blog1_excerpt',
    categoryKey: 'blog1_category',
    image: '/assets/blog-ai-code.jpg',
  },
  {
    titleKey: 'blog2_title',
    excerptKey: 'blog2_excerpt',
    categoryKey: 'blog2_category',
    image: '/assets/blog-ai-team.jpg',
  },
  {
    titleKey: 'blog3_title',
    excerptKey: 'blog3_excerpt',
    categoryKey: 'blog3_category',
    image: '/assets/blog-mvp.jpg',
  },
] as const;

export default function BlogSection() {
  const { t } = useLanguage();

  return (
    <section id="blog" className="w-full py-24 bg-obsidian-base">
      <div className="container-main">
        <ScrollReveal>
          <span className="font-tech text-tech-label text-nebula-gold uppercase tracking-[0.15em] block mb-4">
            {t('blog_label')}
          </span>
          <h2 className="font-headline text-headline-lg text-on-surface">{t('blog_headline')}</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12">
          {blogPosts.map((post, i) => (
            <ScrollReveal key={post.titleKey} delay={i * 0.15}>
              <article className="bg-surface-container border border-outline-variant rounded-lg overflow-hidden hover:border-nebula-gold/50 hover:-translate-y-1 hover:shadow-gold transition-all duration-300 group cursor-pointer h-full flex flex-col">
                <div className="relative h-[180px] overflow-hidden">
                  <img
                    src={post.image}
                    alt={t(post.titleKey)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-nebula-gold/15 text-nebula-gold text-xs font-semibold font-tech">
                    {t(post.categoryKey)}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h4 className="font-headline text-[18px] text-on-surface group-hover:text-nebula-gold transition-colors duration-250 leading-snug">
                    {t(post.titleKey)}
                  </h4>
                  <p className="font-body text-[14px] text-on-surface-variant mt-2 flex-grow">
                    {t(post.excerptKey)}
                  </p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4} className="mt-12 flex justify-center">
          <button className="inline-flex items-center gap-2 font-tech text-tech-label text-on-surface-variant hover:text-nebula-gold border border-outline-variant hover:border-nebula-gold px-8 py-4 rounded transition-all duration-300">
            {t('blog_cta')}
            <ArrowRight size={16} />
          </button>
        </ScrollReveal>
      </div>
    </section>
  );
}
