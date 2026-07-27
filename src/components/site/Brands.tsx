import esnaad from "@/assets/brands/image107.png";
import dubaiCulture from "@/assets/brands/image113.png";
import lifelong from "@/assets/brands/image119.png";
import abuDhabiSchool from "@/assets/brands/image122.png";
import pensionFund from "@/assets/brands/image125.png";
import chequeScore from "@/assets/brands/image133.png";
import numoo from "@/assets/brands/image138.png";
import creditReport from "@/assets/brands/image141.png";
import twentyFour from "@/assets/brands/image143.png";
import bloodCenter from "@/assets/brands/image152.png";
import jarvisMart from "@/assets/brands/image155.png";
import bni from "@/assets/brands/image160.png";
import kago from "@/assets/brands/image167.png";
import drBrothers from "@/assets/brands/image172.png";
import lifelongAlt from "@/assets/brands/image198.png";
import guardbay from "@/assets/brands/image203.png";
import sail from "@/assets/brands/image204.png";
import roleplayLabs from "@/assets/brands/image24.png";
import homeMark from "@/assets/brands/image97.png";

const BRANDS = [
  { name: "Home", logo: homeMark },
  { name: "Esnaad", logo: esnaad },
  { name: "Dubai Culture", logo: dubaiCulture },
  { name: "Lifelong Learning", logo: lifelong },
  { name: "Abu Dhabi School of Government", logo: abuDhabiSchool },
  { name: "Abu Dhabi Pension Fund", logo: pensionFund },
  { name: "ChequeScore", logo: chequeScore },
  { name: "Numoo", logo: numoo },
  { name: "CreditReport", logo: creditReport },
  { name: "24", logo: twentyFour },
  { name: "Ahmedabad Red Cross", logo: bloodCenter },
  { name: "Jarvis Mart", logo: jarvisMart },
  { name: "BNI Athena Parousia", logo: bni },
  { name: "KaGo", logo: kago },
  { name: "DR Brothers", logo: drBrothers },
  { name: "Lifelong Learning Alt", logo: lifelongAlt },
  { name: "GuardBay", logo: guardbay },
  { name: "Sail", logo: sail },
  { name: "RoleplayLabs.ai", logo: roleplayLabs },
];

export function Brands() {
  return (
    <section id="brands" className="brands-section">
      <style>{`
        .brands-section {
          position: relative;
          overflow: hidden;
          padding: clamp(72px, 9vw, 128px) 0;
          background: var(--brands-bg);
          color: var(--brands-text);
          border-top: 1px solid var(--brands-section-border);
          border-bottom: 1px solid var(--brands-section-border);
        }

        [data-theme="light"] .brands-section,
        :root:not([data-theme="dark"]) .brands-section {
          --brands-bg: #fbfaf7;
          --brands-text: #050505;
          --brands-muted: rgba(5, 5, 5, 0.58);
          --brands-section-border: rgba(5, 5, 5, 0.1);
          --brands-grid-bg: #ffffff;
          --brands-cell-bg: #ffffff;
          --brands-cell-hover-bg: #ffffff;
          --brands-cell-border: rgba(5, 5, 5, 0.1);
          --brands-logo-filter: grayscale(1) contrast(0.75) opacity(0.72);
          --brands-logo-hover-filter: grayscale(0) contrast(1) opacity(1);
        }

        [data-theme="dark"] .brands-section {
          --brands-bg: #061512;
          --brands-text: #f2f6f3;
          --brands-muted: rgba(242, 246, 243, 0.58);
          --brands-section-border: rgba(242, 246, 243, 0.08);
          --brands-grid-bg: #0a1c18;
          --brands-cell-bg: #0a1c18;
          --brands-cell-hover-bg: #102822;
          --brands-cell-border: rgba(242, 246, 243, 0.12);
          --brands-logo-filter: grayscale(1) invert(1) brightness(1.15) contrast(0.9) opacity(0.8);
          --brands-logo-hover-filter: grayscale(0) invert(0) brightness(1.05) contrast(1) opacity(1) drop-shadow(0 0 10px rgba(255, 255, 255, 0.18));
        }

        .brands-section::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.26;
          background-image:
            linear-gradient(rgba(128, 128, 128, 0.18) 1px, transparent 1px),
            linear-gradient(90deg, rgba(128, 128, 128, 0.18) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: linear-gradient(to bottom, black, transparent 82%);
        }

        .brands-wrap {
          position: relative;
          z-index: 1;
          width: min(100% - 40px, 1440px);
          margin: 0 auto;
        }

        .brands-copy {
          display: grid;
          grid-template-columns: minmax(0, 1.25fr) minmax(280px, 0.75fr);
          gap: clamp(28px, 7vw, 96px);
          align-items: end;
          margin-bottom: clamp(42px, 6vw, 72px);
        }

        .brands-eyebrow {
          margin: 0 0 18px;
          font-size: 11px;
          line-height: 1;
          letter-spacing: 0.34em;
          text-transform: uppercase;
          color: var(--brands-muted);
        }

        .brands-title {
          margin: 0;
          max-width: 660px;
          font-family: "Fraunces", ui-serif, Georgia, serif;
          font-size: clamp(38px, 5.4vw, 66px);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.04em;
          color: var(--brands-text);
        }

        .brands-title em {
          display: block;
          margin-top: -0.04em;
          font-family: "Fraunces", Georgia, serif;
          font-size: 0.82em;
          font-weight: 400;
          font-style: italic;
          line-height: 1;
          letter-spacing: -0.07em;
          color: rgb(255, 105, 38);
        }

        .brands-description {
          margin: 0 0 12px;
          max-width: 470px;
          font-size: clamp(16px, 1.35vw, 22px);
          line-height: 1.55;
          color: var(--brands-muted);
        }

        .brands-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          overflow: hidden;
          border: 1px solid var(--brands-cell-border);
          border-radius: 18px;
          background: var(--brands-grid-bg);
        }

        .brand-cell {
          min-height: 112px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 28px 26px;
          background: var(--brands-cell-bg);
          border-right: 1px solid var(--brands-cell-border);
          border-bottom: 1px solid var(--brands-cell-border);
          transition:
            background 0.28s ease,
            transform 0.28s ease,
            box-shadow 0.28s ease;
        }

        .brand-cell:nth-child(5n) {
          border-right: 0;
        }

        .brand-cell:nth-last-child(-n + 5) {
          border-bottom: 0;
        }

        .brand-cell:hover {
          background: var(--brands-cell-hover-bg);
          transform: translateY(-2px);
          box-shadow: 0 22px 50px -35px rgba(15, 23, 42, 0.34);
          z-index: 2;
        }

        .brand-cell img {
          display: block;
          max-width: min(156px, 82%);
          max-height: 52px;
          object-fit: contain;
          filter: var(--brands-logo-filter);
          transition:
            filter 0.28s ease,
            transform 0.28s ease;
        }

        .brand-cell:hover img {
          filter: var(--brands-logo-hover-filter);
          transform: scale(1.04);
        }

        @media (max-width: 1100px) {
          .brands-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }

          .brand-cell:nth-child(5n) {
            border-right: 1px solid var(--brands-cell-border);
          }

          .brand-cell:nth-child(4n) {
            border-right: 0;
          }

          .brand-cell:nth-last-child(-n + 5) {
            border-bottom: 1px solid var(--brands-cell-border);
          }

          .brand-cell:nth-last-child(-n + 3) {
            border-bottom: 0;
          }
        }

        @media (max-width: 760px) {
          .brands-section {
            padding: 72px 0;
          }

          .brands-copy {
            grid-template-columns: 1fr;
            gap: 22px;
            margin-bottom: 34px;
          }

          .brands-title {
            font-size: clamp(42px, 14vw, 72px);
          }

          .brands-description {
            max-width: 100%;
            font-size: 16px;
          }

          .brands-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            border-radius: 14px;
          }

          .brand-cell {
            min-height: 96px;
            padding: 22px 18px;
          }

          .brand-cell:nth-child(4n),
          .brand-cell:nth-child(5n) {
            border-right: 1px solid var(--brands-cell-border);
          }

          .brand-cell:nth-child(2n) {
            border-right: 0;
          }

          .brand-cell:nth-last-child(-n + 3) {
            border-bottom: 1px solid var(--brands-cell-border);
          }

          .brand-cell:nth-last-child(-n + 1) {
            border-bottom: 0;
          }

          .brand-cell img {
            max-height: 42px;
          }
        }
      `}</style>

      <div className="brands-wrap">
        <div className="brands-copy reveal">
          <div>
            <p className="brands-eyebrow">Success Stories</p>
            <h2 className="brands-title">
              The names you know
              <em className="font-display">already made this call.</em>
            </h2>
          </div>

          <p className="brands-description">
            From enterprise institutions to fast-moving brands, these teams trusted
            Jarvis Technolabs to turn ambition into shipped digital systems.
          </p>
        </div>

        <div className="brands-grid reveal" aria-label="Client and partner brands">
          {BRANDS.map((brand) => (
            <div className="brand-cell" key={brand.name}>
              <img src={brand.logo} alt={brand.name} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}