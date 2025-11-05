import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Trash2, Loader2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface ProgressPhoto {
  id: string;
  photo_url: string;
  description: string | null;
  weight_at_time: number | null;
  created_at: string;
}

interface ProgressPhotoGridProps {
  refreshTrigger: number;
}

export const ProgressPhotoGrid = ({ refreshTrigger }: ProgressPhotoGridProps) => {
  const { toast } = useToast();
  const [photos, setPhotos] = useState<ProgressPhoto[]>([]);
  const [photoUrls, setPhotoUrls] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchPhotos();
  }, [refreshTrigger]);

  const fetchPhotos = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      const { data, error } = await supabase
        .from('progress_photos')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setPhotos(data || []);

      const urls: Record<string, string> = {};
      for (const photo of data || []) {
        const { data: urlData } = supabase.storage
          .from('progress-photos')
          .getPublicUrl(photo.photo_url);
        urls[photo.id] = urlData.publicUrl;
      }
      setPhotoUrls(urls);
    } catch (error) {
      console.error('Error fetching photos:', error);
      toast({
        title: 'Error',
        description: 'Failed to load progress photos.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    try {
      const photo = photos.find((p) => p.id === deleteId);
      if (!photo) return;

      const { error: storageError } = await supabase.storage
        .from('progress-photos')
        .remove([photo.photo_url]);

      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from('progress_photos')
        .delete()
        .eq('id', deleteId);

      if (dbError) throw dbError;

      toast({
        title: 'Photo Deleted',
        description: 'Your progress photo has been deleted.',
      });

      fetchPhotos();
    } catch (error) {
      console.error('Error deleting photo:', error);
      toast({
        title: 'Delete Failed',
        description: 'Failed to delete photo. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <Card className="glass-card p-12">
        <p className="text-center text-muted-foreground">
          No progress photos yet. Upload your first photo to track your journey!
        </p>
      </Card>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <Card key={photo.id} className="glass-card overflow-hidden">
            <div className="relative aspect-square">
              <img
                src={photoUrls[photo.id]}
                alt="Progress photo"
                className="w-full h-full object-cover"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => setDeleteId(photo.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <div className="p-4">
              <p className="text-sm text-muted-foreground mb-2">
                {new Date(photo.created_at).toLocaleDateString()}
              </p>
              {photo.weight_at_time && (
                <p className="text-sm font-semibold mb-2">
                  Weight: {photo.weight_at_time} kg
                </p>
              )}
              {photo.description && (
                <p className="text-sm">{photo.description}</p>
              )}
            </div>
          </Card>
        ))}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Progress Photo?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your progress photo.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
