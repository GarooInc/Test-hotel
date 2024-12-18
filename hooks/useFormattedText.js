import { useMemo } from 'react';

export const useFormattedText = (title) => {
  const formattedTitle = useMemo(() => {
    if (!title) return null; // Verificar si title es undefined o null

    return title.includes('\\n')
      ? title.split('\\n').map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))
      : title;
  }, [title]);

  return formattedTitle;
};

export const renderTitle = (title) => {
  if (!title) return null;
  return title.split(/(<strong>|<\/strong>)/).map((part, index) => {
      if (part === "<strong>" || part === "</strong>") {
          return null; 
      }
      const isStyled = title.includes(`<strong>${part}</strong>`);
      return (
          <span key={index} className={isStyled ? 'font-futura font-bold uppercase' : 'uppercase tracking-wider'}>
              {part}
          </span>
      );
  });
};

