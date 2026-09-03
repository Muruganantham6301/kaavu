"use client";

import Navbar from "@/components/navbar";
import ContactSection from "@/components/sections/contact";
import { Database, Shield, Eye, Lock, Cookie, HelpCircle } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white">
        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-20">
          
          {/* Page Title */}
          <div className="mb-12 text-center pt-12 md:pt-20">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          </div>
          
          {/* What We Do With Your Information */}
          <section className="mb-12 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <Database className="w-7 h-7 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                What We Do With Your Information
              </h2>
            </div>
            
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <div>
                <p className="font-semibold text-gray-900 mb-2">Email Marketing</p>
                <p>
                  With your permission, we may send you emails about new events, launches and other updates.
                </p>
              </div>
            </div>
          </section>

          {/* Consent */}
          <section className="mb-12 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-7 h-7 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Consent
              </h2>
            </div>
            
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                If we ask for your personal information for a reason, like marketing, we will either ask you 
                directly for your expressed consent, or provide you with an opportunity to say no.
              </p>
              
              <div className="bg-gray-50 border-l-4 border-primary p-6">
                <p className="font-semibold text-gray-900 mb-3">How Do I Withdraw My Consent?</p>
                <p className="mb-3">
                  If after you opt-in, you change your mind, you may withdraw your consent for us to contact you, 
                  for the continued collection, use or disclosure of your information, at anytime, by contacting us at{" "}
                  <a href="mailto:marketing@thekaavu.in" className="text-primary hover:underline font-semibold">
                    marketing@thekaavu.in
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* Disclosure */}
          <section className="mb-12 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <Eye className="w-7 h-7 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Disclosure
              </h2>
            </div>
            
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                We may disclose your personal information if we are required by law to do so or if you 
                violate our Terms of Service.
              </p>
            </div>
          </section>

          {/* Security */}
          <section className="mb-12 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-7 h-7 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Security
              </h2>
            </div>
            
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                To protect your personal information, we take reasonable precautions and follow industry 
                best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, 
                altered or destroyed.
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section className="mb-12 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <Cookie className="w-7 h-7 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Cookies
              </h2>
            </div>
            
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                We use cookies to maintain the session of your user. It is not used to personally identify 
                you on other websites.
              </p>
            </div>
          </section>

          {/* Questions and Contact */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <HelpCircle className="w-7 h-7 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Questions and Contact Information
              </h2>
            </div>
            
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                If you would like to: access, correct, amend or delete any personal information we have about you, 
                register a complaint, or simply want more information contact us at{" "}
                <a href="mailto:marketing@thekaavu.in" className="text-primary hover:underline font-semibold">
                  marketing@thekaavu.in
                </a>
              </p>
            </div>
          </section>

        </div>
      </div>
      <ContactSection />
    </>
  );
}