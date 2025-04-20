export function formatFileNameAsTitle(fileName: string): string {
  const withoutExtension = fileName.replace(/\.[^/.]+$/, '');
  const withSpaces = withoutExtension
    .replace(/[-_]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2');
  
  return withSpaces
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
    .trim();
}

export function formatFileName(url: string): string {
  const fileName = url.split('/').pop() || '';
  return fileName
    .replace(/\.[^/.]+$/, '')              
    .replace(/[_-]/g, ' ')                 
    .split(' ')                           
    .map((word) =>
      word.charAt(0).toUpperCase() +     
      word.slice(1).toLowerCase()        
    ).join(' ');                            
}

export const parseSection = (section: string) =>{
  const [title, ...rest] = section.split('\n');
  const content = rest.join('\n').trim();

  const cleanTitle = title.startsWith('#')
    ? title.substring(1).trim()
    : title.trim();

  return { title: cleanTitle, content };
};