import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ProgressPhotoUpload } from '@/components/premium/ProgressPhotoUpload';
import { ProgressPhotoGrid } from '@/components/premium/ProgressPhotoGrid';
import { ArrowLeft } from 'lucide-react';
import fitinLogo from '@/assets/fitin-final-logo.jpg';
import gymBackground from '@/assets/gymimage2.jpg';

export default function ProgressGallery() {
  const navigate = useNavigate();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUploadComplete = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${gymBackground})` }}
    >
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="p-6 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-4">
            <img src={fitinLogo} alt="FitIn Logo" className="h-12 w-12 rounded-full" />
            <h1 className="text-2xl font-bold text-white">Progress Gallery</h1>
          </div>
          <Button variant="outline" onClick={() => navigate('/premium-dashboard')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Upload Section */}
            <ProgressPhotoUpload onUploadComplete={handleUploadComplete} />

            {/* Gallery Section */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Your Progress Journey</h2>
              <ProgressPhotoGrid refreshTrigger={refreshTrigger} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
