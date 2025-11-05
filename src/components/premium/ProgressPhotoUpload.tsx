import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload, Loader2 } from 'lucide-react';

interface ProgressPhotoUploadProps {
  onUploadComplete: () => void;
}

export const ProgressPhotoUpload = ({ onUploadComplete }: ProgressPhotoUploadProps) => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [weight, setWeight] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: 'No File Selected',
        description: 'Please select a photo to upload.',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('No user found');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('progress-photos')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase
        .from('progress_photos')
        .insert({
          user_id: user.id,
          photo_url: fileName,
          description: description || null,
          weight_at_time: weight ? Number(weight) : null,
        });

      if (dbError) throw dbError;

      toast({
        title: 'Photo Uploaded',
        description: 'Your progress photo has been uploaded successfully.',
      });

      setFile(null);
      setDescription('');
      setWeight('');
      setPreviewUrl(null);
      onUploadComplete();
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast({
        title: 'Upload Failed',
        description: 'Failed to upload photo. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="glass-card p-6">
      <h3 className="text-xl font-bold mb-4">Upload Progress Photo</h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="photo" className="cursor-pointer">
            <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 flex flex-col items-center justify-center gap-2 hover:border-primary/60 transition-colors">
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="max-h-48 rounded-lg" />
              ) : (
                <>
                  <Upload className="w-12 h-12 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Click to upload a photo</p>
                </>
              )}
            </div>
            <Input
              id="photo"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </Label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="weight">Current Weight (kg) - Optional</Label>
          <Input
            id="weight"
            type="number"
            step="0.1"
            placeholder="70.5"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description - Optional</Label>
          <Textarea
            id="description"
            placeholder="Notes about your progress..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>

        <Button
          onClick={handleUpload}
          disabled={!file || isUploading}
          className="w-full"
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload Photo
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};
