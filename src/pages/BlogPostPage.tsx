import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Clock, Calendar, User, ArrowLeft, ArrowRight, ChevronDown, MessageCircle } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { MedicalDisclaimer } from '../components/common/MedicalDisclaimer';
import { blogPostsData, getBlogPostBySlug } from '../config/blog';
import { clinicConfig, getWhatsAppUrl } from '../config/clinic';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Related articles
  const otherPosts = blogPostsData.filter(p => p.id !== post.id).slice(0, 2);

  return (
    <>
      <SEOHead
        title={`${post.title} – Dental Guide`}
        description={post.excerpt || post.summary || post.title}
        canonicalPath={`/blog/${post.slug}`}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Breadcrumbs 
          items={[
            { label: 'Dental Blog', href: '/blog' },
            { label: post.title }
          ]} 
        />

        {/* Article Header */}
        <header className="my-8 space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span className="px-3 py-1 rounded-md bg-teal-50 text-teal-800 font-bold uppercase tracking-wider">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{post.readTime}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{post.publishDate}</span>
            </span>
            <span>•</span>
            <span>By {post.author}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f2b48] tracking-tight leading-[1.15]">
            {post.title}
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed font-normal pt-2 border-b border-slate-100 pb-6">
            {post.excerpt || post.summary}
          </p>
        </header>

        {/* Article Body Content */}
        <div className="space-y-5 text-slate-600 leading-relaxed text-base sm:text-lg">
          {post.contentHtml ? (
            <div 
              className="prose prose-slate max-w-none prose-headings:text-[#0f2b48] prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-6 prose-p:text-slate-600 prose-p:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          ) : (
            post.content.map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))
          )}
        </div>

        {/* In-Article FAQ Section (Prompt Mandate #24) */}
        {post.faqs && post.faqs.length > 0 && (
          <section className="my-12 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-2xl font-bold text-[#0f2b48]">
              Questions Frequently Asked by Patients
            </h2>
            <div className="space-y-3 pt-2">
              {post.faqs.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full text-left p-4 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#0f2b48]"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-sm text-slate-600 border-t border-slate-100 pt-3 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Medical Safety Disclaimer */}
        <MedicalDisclaimer />

        {/* Author Bio Box */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 my-8 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 font-bold shrink-0">
            Dr.
          </div>
          <div>
            <div className="text-base font-bold text-[#0f2b48]">
              Clinically Reviewed by {post.author}
            </div>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
              {post.authorRole || `Dental Surgeon at ${clinicConfig.clinicName}, ${clinicConfig.address.city}`}. Committed to ethical healthcare education and preventive patient care.
            </p>
          </div>
        </div>

        {/* In-Article Call to Action Banner */}
        <div className="bg-gradient-to-br from-[#0f2b48] to-[#163b63] rounded-3xl p-8 text-white my-10 text-center space-y-4 shadow-md">
          <h3 className="text-2xl font-bold">
            Have Questions About Your Own Teeth or Gums?
          </h3>
          <p className="text-slate-200 text-sm max-w-xl mx-auto leading-relaxed">
            Schedule a relaxed, no-pressure consultation with our dental team to discuss symptoms, view digital radiographs, and receive a customized treatment plan.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/book-appointment"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold text-sm transition-all"
            >
              <span>Schedule Consultation</span>
              <ArrowRight className="w-4 h-4 text-slate-900" />
            </Link>

            <a
              href={getWhatsAppUrl(`Hi, I just read your article "${post.title}" and would like to ask a question.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-colors border border-white/20"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Ask via WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Read Next Posts */}
        <div className="pt-8 border-t border-slate-200 my-10">
          <h3 className="text-base font-bold text-[#0f2b48] mb-4">
            Continue Reading
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherPosts.map(other => (
              <Link
                key={other.id}
                to={`/blog/${other.slug}`}
                className="p-4 rounded-xl border border-slate-200 bg-white hover:border-teal-300 hover:shadow-xs transition-all space-y-2 block group"
              >
                <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                  {other.category}
                </span>
                <h4 className="text-sm font-bold text-[#0f2b48] group-hover:text-teal-700 transition-colors line-clamp-2">
                  {other.title}
                </h4>
                <div className="text-xs text-slate-400">
                  {other.readTime}
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </>
  );
};
