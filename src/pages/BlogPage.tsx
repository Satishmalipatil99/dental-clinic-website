import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight, BookOpen, Tag } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { blogPostsData } from '../config/blog';
import { clinicConfig } from '../config/clinic';

export const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Preventive Care', 'Endodontics', 'Implants & Restorative', 'Oral Surgery', 'Cosmetic Dentistry', 'Orthodontics'];

  const filteredPosts = selectedCategory === 'All'
    ? blogPostsData
    : blogPostsData.filter(post => post.category === selectedCategory);

  return (
    <>
      <SEOHead
        title="Dental Health Guides & Patient Education Articles"
        description={`Evidence-based dental guides written by ${clinicConfig.doctorName}: Root canals, dental implants, teeth whitening, aligners, and wisdom teeth advice in ${clinicConfig.address.city}.`}
        canonicalPath="/blog"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Breadcrumbs items={[{ label: 'Dental Education & Blog' }]} />

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto my-8 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md border border-teal-100">
            EVIDENCE-BASED ORAL HEALTH
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0f2b48] tracking-tight">
            Patient Dental Guides
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Written in plain, accessible language to help you understand common dental symptoms, treatment procedures, and preventive home care.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#0f2b48] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-8">
          {filteredPosts.map(post => (
            <article
              key={post.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md hover:border-teal-300 transition-all flex flex-col justify-between group"
            >
              <div className="p-6 sm:p-7 space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="px-2.5 py-1 rounded-md bg-teal-50 text-teal-800 font-semibold">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-[#0f2b48] group-hover:text-teal-700 transition-colors line-clamp-2">
                  <Link to={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {post.excerpt || post.summary}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {post.tags && post.tags.length > 0 ? (
                    post.tags.map(tag => (
                      <span key={tag} className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        #{tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-[11px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded font-medium">
                      {post.category}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6 pt-0 mt-2 border-t border-slate-100 pt-4 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  By {post.author}
                </span>

                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-900 group-hover:translate-x-1 transition-transform"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </>
  );
};
