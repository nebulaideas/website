import { useLanguage } from '@/hooks/useLanguage';
import ScrollReveal from '@/components/ScrollReveal';
import CTAButton from '@/components/CTAButton';
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
    <section id="blog" className="bg-white section-padding">
      <div className="container-main">
        <ScrollReveal>
          <span className="section-label">{t('blog_label')}</span>
          <h2 className="text-h2 text-deep-blue mt-3">{t('blog_headline')}</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12">
          {blogPosts.map((post, i) => (
            <ScrollReveal key={post.titleKey} delay={i * 0.15}>
              <article className="bg-white rounded-card overflow-hidden border border-[rgba(10,25,47,0.08)] shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group cursor-pointer h-full flex flex-col">
                {/* Image */}
                <div className="relative h-[180px] overflow-hidden">
                  <img
                    src={post.image}
                    alt={t(post.titleKey)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Category tag */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-pill bg-amber/15 text-deep-blue text-xs font-semibold">
                    {t(post.categoryKey)}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h4 className="text-h4 text-deep-blue group-hover:text-amber transition-colors duration-250">
                    {t(post.titleKey)}
                  </h4>
                  <p className="text-body-sm text-text-secondary mt-2 flex-grow">
                    {t(post.excerptKey)}
                  </p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4} className="mt-12 flex justify-center">
          <CTAButton variant="ghost" icon={<ArrowRight size={16} />}>
            {t('blog_cta')}
          </CTAButton>
        </ScrollReveal>
      </div>
    </section>
  );
}
