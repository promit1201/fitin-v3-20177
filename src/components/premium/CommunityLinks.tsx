import { Card } from '@/components/ui/card';
import { MessageCircle, Send, Youtube, Users } from 'lucide-react';

const communityLinks = [
  {
    name: 'WhatsApp',
    icon: MessageCircle,
    url: '#',
    color: 'text-green-500',
  },
  {
    name: 'Telegram',
    icon: Send,
    url: '#',
    color: 'text-blue-500',
  },
  {
    name: 'YouTube',
    icon: Youtube,
    url: '#',
    color: 'text-red-500',
  },
  {
    name: 'Discord',
    icon: Users,
    url: '#',
    color: 'text-indigo-500',
  },
];

export const CommunityLinks = () => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4 text-center">Join Our Community</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {communityLinks.map((link) => (
          <Card
            key={link.name}
            className="glass-card p-6 flex flex-col items-center justify-center gap-3 hover:scale-105 transition-transform cursor-pointer"
            onClick={() => window.open(link.url, '_blank')}
          >
            <link.icon className={`w-8 h-8 ${link.color}`} />
            <span className="font-semibold text-sm">{link.name}</span>
          </Card>
        ))}
      </div>
    </div>
  );
};
