import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { DoctorPage } from './pages/DoctorPage';
import { TreatmentsPage } from './pages/TreatmentsPage';
import { TreatmentDetailPage } from './pages/TreatmentDetailPage';
import { BeforeAfterPage } from './pages/BeforeAfterPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { GalleryPage } from './pages/GalleryPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';
import { BookAppointmentPage } from './pages/BookAppointmentPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { StaffLoginPage } from './pages/StaffLoginPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/doctor" element={<DoctorPage />} />
          <Route path="/treatments" element={<TreatmentsPage />} />
          <Route path="/treatments/:slug" element={<TreatmentDetailPage />} />
          <Route path="/before-after" element={<BeforeAfterPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/book-appointment" element={<BookAppointmentPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/admin" element={<StaffLoginPage />} />
<Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
