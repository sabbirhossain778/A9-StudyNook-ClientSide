import { useEffect } from 'react';

export default function useDocumentTitle(title) {
  useEffect(() => {
    if (typeof window !== 'undefined' && title) {
      document.title = title;
    }
  }, [title]);
}