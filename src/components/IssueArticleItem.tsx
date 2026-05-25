import React from 'react';
import { Link } from 'react-router-dom';
import { FaFilePdf, FaSyncAlt, FaExternalLinkAlt } from 'react-icons/fa';
import type { IssueArticleEntry } from '../data/issueArticles';
import { articleDetailPath } from '../utils/articleHelpers';

interface IssueArticleItemProps {
  article: IssueArticleEntry;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}

const IssueArticleItem: React.FC<IssueArticleItemProps> = ({ article, hoveredId, onHover }) => {
  const isHovered = hoveredId === article.id;
  const detailPath = articleDetailPath(article.slug);
  const showUpdateButton = false;

  return (
    <div
      className="mb-6 p-5 rounded-lg border border-teal-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
      onMouseEnter={() => onHover(article.id)}
      onMouseLeave={() => onHover(null)}
    >
      <h3 className="text-lg font-semibold text-teal-800 mb-2">
        <Link
          to={detailPath}
          className="hover:text-teal-600 hover:underline transition-colors duration-300"
          aria-label={`View article details: ${article.title}`}
        >
          {article.title}
        </Link>
      </h3>
      <div className="text-gray-600 italic mb-3">By {article.authors}</div>
      <div className="text-sm text-gray-500 mb-4 flex items-center">
        <span className="inline-block w-2 h-2 rounded-full bg-teal-500 mr-2" />
        Pages: {article.pages}
      </div>
      <div className="flex flex-wrap gap-3">
        <a
          href={article.pdfUrl}
          className={`flex items-center py-2 px-4 rounded-md text-white font-medium transition-all duration-300 ${
            isHovered
              ? 'bg-gradient-to-r from-teal-600 to-green-600 shadow-md'
              : 'bg-gradient-to-r from-teal-500 to-green-500 shadow-sm'
          }`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Download PDF for ${article.title}`}
        >
          <FaFilePdf className="mr-2" /> PDF
        </a>
        <Link
          to={detailPath}
          className={`flex items-center py-2 px-4 rounded-md text-white font-medium transition-all duration-300 ${
            isHovered
              ? 'bg-gradient-to-r from-teal-700 to-teal-800 shadow-md'
              : 'bg-gradient-to-r from-teal-600 to-teal-700 shadow-sm'
          }`}
          aria-label={`Read full article: ${article.title}`}
        >
          <FaExternalLinkAlt className="mr-2" /> Full Text
        </Link>
        {showUpdateButton && (
          <a
            href={article.updateLink}
            className={`flex items-center py-2 px-4 rounded-md text-white font-medium transition-all duration-300 ${
              isHovered
                ? 'bg-gradient-to-r from-blue-600 to-teal-600 shadow-md'
                : 'bg-gradient-to-r from-blue-500 to-teal-500 shadow-sm'
            }`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Check updates for ${article.title}`}
          >
            <FaSyncAlt className="mr-2" /> Check for Updates
          </a>
        )}
      </div>
    </div>
  );
};

export default IssueArticleItem;
