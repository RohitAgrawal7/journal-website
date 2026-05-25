import { slugFromPdfUrl, normalizePdfUrl } from '../utils/articleHelpers';
import type { Article, ArticleAuthor } from '../types/article';
import { DEFAULT_LICENSE_IMAGE_URL, DEFAULT_LICENSE_TEXT } from '../types/article';

export interface IssueArticleEntry {
  id: string;
  title: string;
  authors: string;
  pages: string;
  pdfUrl: string;
  slug: string;
  updateLink: string;
}

export interface IssueCatalogEntry {
  issueKey: string;
  issueUrl: string;
  volumeLabel: string;
  headerSubtitle: string;
  publishedDate: string;
  coverImage: string;
  articles: IssueArticleEntry[];
}

function entry(
  id: string,
  title: string,
  authors: string,
  pages: string,
  pdfUrl: string,
  updateLink = '/upcoming-content'
): IssueArticleEntry {
  const normalized = normalizePdfUrl(pdfUrl);
  return {
    id,
    title: title.replace(/\s+/g, ' ').trim(),
    authors,
    pages,
    pdfUrl: normalized,
    slug: slugFromPdfUrl(normalized),
    updateLink,
  };
}

export const ISSUE_CATALOG: Record<string, IssueCatalogEntry> = {
  issue1: {
    issueKey: 'issue1',
    issueUrl: '/issue1',
    volumeLabel: 'Volume 1 Issue 1 (2025)',
    headerSubtitle: 'Universal Journal of Green Sci-Tech and Management – Volume 1 Issue 1, 2025',
    publishedDate: '2025-08-30',
    coverImage: './cover.png',
    articles: [
      entry('5239', 'Survey-Based Case Study of Supply Chain Management (SCM) in Construction Industries', 'Akash Wankhade, Gurupreet Attal', '1-9', '/volume1-issue1/article1.pdf'),
      entry('5240', 'Evaluating Environmental Benefits of Rooftop Solar PV through Carbon Displacement Analysis', 'Sagar Kauthalkar, Yogesh Sathe', '10-17', '/volume1-issue1/article2.pdf'),
      entry('5243', 'A Review on Minimum Quantity Lubrication (MQL) Using Hybrid Nanofluids: Enhancing Tool Life and Surface Quality in Metal Cutting', 'Komal Morankar, Ravindra Deshmukh', '18-31', '/volume1-issue1/article3.pdf'),
      entry('5244', 'Performance and Emission Characteristics of a Four-Stroke Engine Using E20 Fuel Blend', 'Prashant patil, Umesh Hiwalrale, Chandrashekhar Ingle', '32-38', '/volume1-issue1/article4.pdf'),
      entry('5245', 'Enhancing Wear Performance of W-Cu Composites through Response Surface Methodology', 'Harshal Kale, Sambhaji Sathe', '39-46', '/volume1-issue1/article5.pdf'),
    ],
  },
  issue2: {
    issueKey: 'issue2',
    issueUrl: '/issue2',
    volumeLabel: 'Volume 1 Issue 2 (2025)',
    headerSubtitle: 'Universal Journal of Green Sci-Tech and Management – Volume 1 Issue 2, 2025',
    publishedDate: '2025-08-30',
    coverImage: './cover.png',
    articles: [
      entry('5239', 'Optimization of Wear Resistance and Scratch Hardness of Boron Carbide Reinforced Polyester Powder Coatings Using Taguchi Method', 'Chandrakant Sawant, Ravindra Karvande, & Vilas Jadhav', '47-60', '/volume1-issue2/article1.pdf'),
      entry('5240', 'Parametric Study and Optimization of Wire Electrical Discharge Machining Parameters for SS304 Stainless Steel', 'Gajanan Khose, Shantisagar Biradar & Mohammad Irfan', '61-73', '/volume1-issue2/article2.pdf'),
      entry('5243', 'Optimization of Noise Reduction in Diesel Generator Set Enclosures Using Taguchi Method', 'Pathan Tanzimkhan Lalkhan, Ravindra Karvande & Mohammad Irfan H', '74-82', '/volume1-issue2/article3.pdf'),
      entry('5244', 'A Comprehensive Review on Electrical Discharge Machining and Wire Electrical Discharge Machining of Titanium Alloys', 'Mohammed Aakef Farooqui, Ravindra Karvande & Mohammad Irfan', '83-93', '/volume1-issue2/article4.pdf'),
      entry('5245', 'An In-Depth Review of Supply Chain Management and Data Analytics Applications in the Automobile Manufacturing Industry', 'Abhishek Ugle, Shantisagar Biradar & Swapnil N. Dhole', '94-104', '/volume1-issue2/article5.pdf'),
    ],
  },
  issue3: {
    issueKey: 'issue3',
    issueUrl: '/issue3',
    volumeLabel: 'Volume 1 Issue 3 (2025)',
    headerSubtitle: 'Universal Journal of Green Sci-Tech and Management – Volume 1 Issue 3, 2025',
    publishedDate: '2025-08-30',
    coverImage: './cover.png',
    articles: [
      entry('5239', 'Competency Gap Analysis of Engineering Students: A Systematic Review of Employability Skills, Industry Expectations, and Institutional Practices in India', 'Raman G. Karde, Bhakti Banwaskar Deshmukh', '105-116', '/volume1-issue3/article1.pdf'),
      entry('5240', 'Supply Chain Cost Forecasting and Data Analytics in the Automobile Manufacturing Industry', 'Abhishek Ugle, Shantisagar Biradar & Swapnil. N. Dhole', '117-125', '/volume1-issue3/article2.pdf'),
      entry('5243', 'A Review on Noise Reduction in Diesel Generator Set Enclosures Using Passive Acoustic Control and Taguchi-Based Optimization Techniques', 'Pathan Tanzimkhan Lalkhan, Ravindra Karvande & Mohammad Irfan H', '126-136', '/volume1-issue3/article3.pdf'),
      entry('5244', 'Experimental Investigation and Optimization of WEDM Parameters for Titanium Alloy Considering MRR', 'Mohammed Aakef Farooqui, Ravindra Karvande & Mohammad Irfan', '137-148', '/volume1-issue3/article4.pdf'),
      entry('5245a', 'A Comprehensive Review of Wire Electrical Discharge Machining: Principles, Parameters, Performance Measures, and Optimization Techniques', 'Gajanan Khose, Shantisagar Biradar & Mohammad Irfan', '149-157', '/volume1-issue3/article5.pdf'),
      entry('5245b', 'A Review on Polyester Powder Coatings: Materials, Deposition Techniques, Wear Mechanisms, and Nanofiller-Based Performance Enhancement', 'Chandrakant Sawant, Ravindra Karvande & Vilas Jadhav', '158-167', '/volume1-issue3/article6.pdf'),
    ],
  },
  issue4: {
    issueKey: 'issue4',
    issueUrl: '/issue4',
    volumeLabel: 'Volume 1 Issue 4 (2026)',
    headerSubtitle: 'Universal Journal of Green Sci-Tech and Management – Volume 1 Issue 4, 2026',
    publishedDate: '2026-02-15',
    coverImage: 'https://image2url.com/r2/default/images/1774632236661-23c327da-f619-43b1-8480-2fbc8d05ee5e.png',
    articles: [
      entry('5240', 'Clinical Evaluation of Individualized Homoeopathic Medicines as Add-On Therapy in Acute Uncomplicated Lower Urinary Tract Infection in Females: A Prospective Single-Arm Study', 'Jayapriya Beniwal, Sunil Kumar', '181-192', '/volume1-issue4/article1.pdf'),
      entry('5239', 'Socio-Economic Profile and Participation of Local Communities in the Implementation of the Biological Diversity Act', 'Rohit Yadav', '168-180', '/volume1-issue4/article2.pdf'),
      entry('5243', 'Legal Analysis of Forensic DNA Profiling: Issues and Challenges in India', 'Vaishnavi Yadav, Jyotsna Singh', '192-208', '/volume1-issue4/article3.pdf'),
      entry('5244', 'Enhancement of Wear Resistance of Hybrid Powder Coatings Using Nanoparticle Reinforcement', 'Akshay Shinde, M. S. Harne', '209-221', '/volume1-issue4/article4.pdf'),
      entry('5245a', 'A Comprehensive Review on Optimization of Wire Electrical Discharge Machining (WEDM) Parameters and Performance Characteristics', 'Siddiqui Mohd Abdul Mukhtadir Siddiqui Abdul Rub, Brijbhushan Shukla', '222-235', '/volume1-issue4/article5.pdf'),
      entry('5245b', 'Linking Environmental Stress, Institutional Response, and Child Nutrition: A Conceptual and Empirical Model from Marathwada', 'Priyanka M. Shejwal, Rajkumar H. Mhaske', '236-252', '/volume1-issue4/article6.pdf'),
      entry('5245c', 'Advanced Machining Processes in Modern Manufacturing: A Critical Review', 'Saurabh S. Joshi, Ravindra L. Karwande, Sachin B. Chhabile', '253-261', '/volume1-issue4/article7.pdf'),
    ],
  },
};

export function getIssueCatalog(issueKey: string): IssueCatalogEntry | undefined {
  return ISSUE_CATALOG[issueKey];
}

export function findArticleByPdfUrl(pdfUrl: string): (IssueArticleEntry & { issue: IssueCatalogEntry }) | undefined {
  const normalized = normalizePdfUrl(pdfUrl);
  for (const issue of Object.values(ISSUE_CATALOG)) {
    const article = issue.articles.find((a) => a.pdfUrl === normalized);
    if (article) return { ...article, issue };
  }
  return undefined;
}

export function findArticleBySlug(slug: string): (IssueArticleEntry & { issue: IssueCatalogEntry }) | undefined {
  for (const issue of Object.values(ISSUE_CATALOG)) {
    const article = issue.articles.find((a) => a.slug === slug);
    if (article) return { ...article, issue };
  }
  return undefined;
}

export function issueKeyFromArticle(article: Pick<Article, 'volume' | 'issue' | 'pdfUrl' | 'issueUrl'>): string | undefined {
  const values = [article.issue, article.volume, article.pdfUrl, article.issueUrl].filter(Boolean);

  for (const value of values) {
    const text = String(value).trim().toLowerCase();
    const issueMatch = text.match(/issue\D*(\d+)/);
    if (issueMatch?.[1]) return `issue${issueMatch[1]}`;
    if (/^\d+$/.test(text)) return `issue${text}`;
  }

  return undefined;
}

export function articleToIssueEntry(article: Article): IssueArticleEntry {
  const pages = (article as Article & { pages?: unknown }).pages;

  return {
    id: String(article.id || article.slug || article.pdfUrl),
    title: article.title,
    authors: article.authors.map((author) => author.name).filter(Boolean).join(', ') || 'Author details pending',
    pages: pages ? String(pages) : 'Online first',
    pdfUrl: normalizePdfUrl(article.pdfUrl || ''),
    slug: article.slug || slugFromPdfUrl(article.pdfUrl || ''),
    updateLink: '/upcoming-content',
  };
}

export function mergeIssueArticles(issue: IssueCatalogEntry, apiArticles: Article[]): IssueCatalogEntry {
  const apiEntries = apiArticles
    .filter((article) => article.status === 'published' && issueKeyFromArticle(article) === issue.issueKey)
    .sort((a, b) => {
      const aTime = Date.parse(a.updatedAt || a.createdAt || '') || a.id || 0;
      const bTime = Date.parse(b.updatedAt || b.createdAt || '') || b.id || 0;
      return aTime - bTime;
    })
    .map(articleToIssueEntry)
    .filter((article) => article.title && article.slug);

  if (!apiEntries.length) return issue;

  const byKey = new Map<string, IssueArticleEntry>();
  for (const article of issue.articles) {
    byKey.set(normalizePdfUrl(article.pdfUrl) || article.slug, article);
  }
  for (const article of apiEntries) {
    byKey.set(normalizePdfUrl(article.pdfUrl) || article.slug, article);
  }

  return {
    ...issue,
    articles: Array.from(byKey.values()),
  };
}

function parseAuthorNames(authors: string): ArticleAuthor[] {
  return authors.split(/,|&/).map((name) => ({ name: name.trim() })).filter((a) => a.name);
}

/** Fallback article record when API entry is not created yet */
export function catalogEntryToArticle(
  row: IssueArticleEntry & { issue: IssueCatalogEntry }
): Article {
  return {
    id: 0,
    slug: row.slug,
    title: row.title,
    status: 'published',
    abstract:
      'Full abstract, keywords, references, and citations for this article can be added via the article admin form. The PDF is available for download below.',
    authors: parseAuthorNames(row.authors),
    keywords: [],
    references: [],
    publicationDate: row.issue.publishedDate,
    volume: row.issue.volumeLabel,
    issue: 'Articles',
    issueUrl: row.issue.issueUrl,
    pdfUrl: row.pdfUrl,
    coverImageUrl: row.issue.coverImage,
    licenseText: DEFAULT_LICENSE_TEXT,
    licenseImageUrl: DEFAULT_LICENSE_IMAGE_URL,
  };
}
