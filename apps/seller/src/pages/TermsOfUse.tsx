import React from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Nav';

const TermsOfUse: React.FC = () => {
  return (
    <>
      <Header />
      <h1 className="mb-8 bg-[#EDF1FB] py-10 text-center text-4xl font-bold text-[#19183A]">
        GiriToday Terms of Use
      </h1>
      <div className="container mx-auto px-4 py-12">
        {/* Table of Contents */}
        <nav className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Table of Contents</h2>
          <ul className="list-inside list-disc space-y-2">
            <li>
              <a
                href="#use-of-platform"
                className="text-[#030A70] hover:underline"
              >
                1. Use of the Platform and Services
              </a>
            </li>
            <li>
              <a
                href="#account-creation"
                className="text-[#030A70] hover:underline"
              >
                2. Account Creation and Security
              </a>
            </li>
            <li>
              <a
                href="#intellectual-property"
                className="text-[#030A70] hover:underline"
              >
                3. Intellectual Property and Restrictions
              </a>
            </li>
            <li>
              <a
                href="#termination-and-modifications"
                className="text-[#030A70] hover:underline"
              >
                4. Termination and Modifications
              </a>
            </li>
            <li>
              <a
                href="#limitation-of-liability"
                className="text-[#030A70] hover:underline"
              >
                5. Limitation of Liability
              </a>
            </li>
            <li>
              <a href="#indemnity" className="text-[#030A70] hover:underline">
                6. Indemnification
              </a>
            </li>
            <li>
              <a
                href="#complaint-handling"
                className="text-[#030A70] hover:underline"
              >
                7. Complaint Handling
              </a>
            </li>
            <li>
              <a
                href="#entire-agreement"
                className="text-[#030A70] hover:underline"
              >
                8. Entire Agreement
              </a>
            </li>
          </ul>
        </nav>

        {/* Terms Sections */}
        <section id="use-of-platform" className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">
            1. Use of the Platform and Services
          </h2>
          <p>
            1.1 GiriToday hereby grants You a non-exclusive, non-transferable
            license to access and use the Services during the agreed term (the
            “Term”) solely for Your personal or business use, as applicable, and
            in compliance with this Agreement. Nothing in this Agreement grants
            any right, title, or interest in the Intellectual Property Rights
            related to the Services or any materials therein, which remain the
            property of GiriToday or relevant third-party rights holders.{' '}
          </p>
          <p>
            <p>
              1.2 The Platform and Services may contain links to third-party
              platforms or resources. GiriToday is not responsible for the
              content, products, or services of these third-party platforms. By
              using the Services, You assume all risk associated with any
              third-party resources. You authorize GiriToday to share necessary
              data or information with relevant third-party partners in order to
              facilitate Your use of the Platform.
            </p>
            <p>
              1.3 You acknowledge that third-party services utilized by
              GiriToday are subject to their respective terms of use. By using
              such services, You agree to be bound by the applicable third-party
              terms. We encourage You to review these third-party terms
              carefully, as GiriToday cannot guarantee the performance or
              security of third-party services.
            </p>
          </p>
        </section>

        <section id="account-creation" className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">
            2. Account Creation and Security
          </h2>
          <p>
            2.1 You declare that You are at least 18 years of age and of sound
            mind, or the age of majority in Your jurisdiction. If We believe
            that You are underage, Your GiriToday account may be deactivated
            without notice.
          </p>
          <p>
            2.2 To create an account and access the Services, You must provide
            valid information such as Your name, email address, and any other
            relevant details required during the signup process.
          </p>
          <p>
            2.3 GiriToday reserves the right to deactivate or suspend Your
            account at its sole discretion if we suspect illegal or unauthorized
            activities or a violation of this Agreement.
          </p>
          <p>
            2.4 You agree that GiriToday may communicate with You using the
            contact information provided during account creation.
          </p>
          <p>
            2.5 You are responsible for maintaining the confidentiality of Your
            account credentials and any activity that occurs under Your account.
            GiriToday will not be liable for any unauthorized access or use of
            Your account. You must notify Us immediately if You suspect
            unauthorized access.
          </p>
          <p>
            2.6 You confirm that the information You provide to GiriToday is
            accurate and agree to update such information as needed. GiriToday
            may request additional information to verify Your account or
            identity.
          </p>
        </section>

        <section id="intellectual-property" className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">
            3. Intellectual Property and Restrictions
          </h2>
          <p>
            3.1 All rights, titles, and interests in the Platform, Services, and
            GiriToday Materials are and remain the exclusive property of
            GiriToday. You are prohibited from copying, modifying, distributing,
            or exploiting any GiriToday content or materials for unauthorized
            purposes.
          </p>
          <p>
            3.2 You agree not to use the Platform or Services for any unlawful
            purposes or activities that violate this Agreement. Any breach may
            result in immediate termination of Your account and legal action.
          </p>
        </section>

        <section id="termination-and-modifications" className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">
            4. Termination and Modifications
          </h2>
          <p>
            4.1 GiriToday reserves the right to terminate or suspend Your access
            to the Platform or Services at any time for violations of this
            Agreement or other applicable policies.
          </p>
          <p>
            4.2 GiriToday may modify, update, or discontinue any aspect of the
            Platform or Services without prior notice. Continued use of the
            Platform after changes are posted constitutes Your acceptance of
            those changes.
          </p>
        </section>

        <section id="limitation-of-liability" className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">
            5. Limitation of Liability
          </h2>
          <p>
            In no event shall GiriToday or any of its partners, suppliers,
            licensors, or representatives be liable under or in connection with
            this Agreement...
          </p>
        </section>

        <section id="indemnity" className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">6. Indemnification</h2>
          <p>
            You shall indemnify, defend, and hold harmless GiriToday, its
            affiliates, officers, directors, employees, agents, and successors
            from and against any claims...
          </p>
        </section>

        <section id="complaint-handling" className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">7. Complaint Handling</h2>
          <p>
            7.1 IN NO EVENT SHALL GIRITODAY OR ANY OF ITS PARTNERS, SUPPLIERS,
            LICENSORS, OR REPRESENTATIVES BE LIABLE UNDER OR IN CONNECTION WITH
            THIS AGREEMENT OR ITS SUBJECT MATTER UNDER ANY LEGAL OR EQUITABLE
            THEORY, INCLUDING BUT NOT LIMITED TO BREACH OF CONTRACT, TORT
            (INCLUDING NEGLIGENCE), STRICT LIABILITY, OR OTHERWISE, FOR ANY:
          </p>
          <p>
            (a) LOSS SUFFERED IF YOUR GIRITODAY ACCOUNT IS SUSPENDED,
            RESTRICTED, OR TERMINATED.
          </p>
          <p>
            (b) LOSS SUFFERED IF GIRITODAY SERVICES ARE INTERRUPTED,
            UNAVAILABLE, OR INTERFERED WITH DUE TO ISSUES SUCH AS DEVICE
            MALFUNCTION, LACK OF INTERNET CONNECTION, OR CIRCUMSTANCES BEYOND
            OUR CONTROL (INCLUDING SYSTEM ERRORS, POWER OUTAGES, ADVERSE
            WEATHER, OR FAILURE OF PUBLIC OR PRIVATE TELECOMMUNICATIONS
            SYSTEMS).
          </p>
          <p>
            (c) DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
            EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO DAMAGES FOR LOSS OF
            PROFITS, GOODWILL, DATA, OR OTHER INTANGIBLE LOSSES RESULTING FROM
            THE USE OF OR INABILITY TO USE GIRITODAY SERVICES, EVEN IF ADVISED
            OF THE POSSIBILITY OF SUCH DAMAGES.
          </p>
          <p>
            (d) LOSS OF PROFIT, LOSS OF BUSINESS, INTERRUPTION, OR LOSS OF
            OPPORTUNITY RESULTING FROM UNAUTHORIZED USE OF THE GIRITODAY
            PLATFORM.
          </p>
          <p>(e) COST OF REPLACEMENT GOODS OR SERVICES.</p>
          <p>(f) LOSS OF GOODWILL OR REPUTATION.</p>
          <p>(g) LOSSES ARISING FROM:</p>
          <p>
            I. ANY FAULT RESULTING FROM YOU ALTERING OR ATTEMPTING TO MODIFY THE
            GIRITODAY PLATFORM;
          </p>
          <p>II. ANY DEFECT CAUSED BY BREACH OF THIS AGREEMENT; AND</p>
          <p>III. YOUR BREACH OF ANY TERMS HEREIN.</p>
          <p>
            7.2 GIRITODAY DOES NOT WARRANT THAT THE SERVICES WILL BE
            UNINTERRUPTED, SECURE, OR ERROR-FREE. ALL IMPLIED WARRANTIES ARE
            EXCLUDED TO THE FULLEST EXTENT PERMITTED BY LAW. IF SERVICES ARE
            INTERRUPTED, GIRITODAY'S SOLE LIABILITY SHALL BE TO RESTORE THEM AS
            SOON AS REASONABLY POSSIBLE.
          </p>
          <p>
            7.3 IN NO EVENT SHALL GIRITODAY'S AGGREGATE LIABILITY EXCEED THE
            AMOUNT PAID BY YOU FOR THE SERVICE IN THE MONTH PRIOR TO THE EVENT
            GIVING RISE TO THE CLAIM. THIS LIMITATION APPLIES EVEN IF A REMEDY
            FAILS IN ITS ESSENTIAL PURPOSE.
          </p>
        </section>

        <section id="entire-agreement" className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">8. Entire Agreement</h2>
          <p>
            8.1 You shall indemnify, defend, and hold harmless GiriToday, its
            affiliates, officers, directors, employees, agents, and successors
            from and against any claims, damages, or losses arising out of:
          </p>
          <p>(a) Your data or any processing of it by GiriToday;</p>
          <p>(b) Any materials or information you provide to GiriToday;</p>
          <p>
            (c) Breaches of your representations, warranties, or obligations
            under this Agreement;
          </p>
          <p>(d) Fraud, negligence, or misconduct by you;</p>
          <p>(e) Breaches of applicable laws by you.</p>
          <p>8.2 The indemnity in clause 8.1 also includes:</p>
          <p>
            8.2.1 Losses resulting from GiriToday acting on any request sent
            electronically, or due to failures outside of GiriToday's control,
            such as technical malfunctions or system errors.
          </p>
          <p>
            8.2.2 Any losses arising from your use of third-party software or
            unauthorized access to your GiriToday profile.
          </p>
          <p>
            8.2.3 Any loss caused by your failure to comply with these Terms or
            provide correct information.
          </p>
        </section>
        <section id="entire-agreement" className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">9. COMPLAINT HANDLING</h2>
          <p>
            If something goes wrong, please contact us at support@giritoday.com
            or write to us at 123 Tech Avenue, Lagos, Nigeria. We will
            investigate and respond as promptly as possible to resolve any
            issues.
          </p>
        </section>
        <section id="entire-agreement" className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">10. ENTIRE AGREEMENT</h2>
          <p>
            This Agreement constitutes the entire agreement between you and
            GiriToday, superseding all prior agreements.
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default TermsOfUse;
