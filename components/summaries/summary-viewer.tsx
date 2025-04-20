import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { parseSection } from '@/lib/format';

export default function SummaryViewer({ summary }: { summary: string }) {
  const sections = summary
    .split('\n# ')
    .map((section) => section.trim())
    .filter(Boolean)
    .map(parseSection);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sections.map((section, index) => (
          <div key={index}>
            <h3 className="text-lg font-semibold">{section.title}</h3>
            <p className="text-sm whitespace-pre-line">{section.content}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
