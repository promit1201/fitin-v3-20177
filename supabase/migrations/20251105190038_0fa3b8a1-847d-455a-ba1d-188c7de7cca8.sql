-- Create progress_photos table for user progress tracking
CREATE TABLE public.progress_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL,
  description TEXT,
  weight_at_time NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.progress_photos ENABLE ROW LEVEL SECURITY;

-- Users can view their own progress photos
CREATE POLICY "Users can view their own progress photos"
ON public.progress_photos
FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own progress photos
CREATE POLICY "Users can insert their own progress photos"
ON public.progress_photos
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can delete their own progress photos
CREATE POLICY "Users can delete their own progress photos"
ON public.progress_photos
FOR DELETE
USING (auth.uid() = user_id);

-- Users can update their own progress photos
CREATE POLICY "Users can update their own progress photos"
ON public.progress_photos
FOR UPDATE
USING (auth.uid() = user_id);

-- Admins can view all progress photos
CREATE POLICY "Admins can view all progress photos"
ON public.progress_photos
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create storage bucket for progress photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('progress-photos', 'progress-photos', false);

-- Users can upload their own progress photos
CREATE POLICY "Users can upload their own progress photos"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'progress-photos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Users can view their own progress photos
CREATE POLICY "Users can view their own progress photos"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'progress-photos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Users can delete their own progress photos
CREATE POLICY "Users can delete their own progress photos"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'progress-photos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Admins can view all progress photos
CREATE POLICY "Admins can view all progress photos"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'progress-photos' AND
  has_role(auth.uid(), 'admin'::app_role)
);