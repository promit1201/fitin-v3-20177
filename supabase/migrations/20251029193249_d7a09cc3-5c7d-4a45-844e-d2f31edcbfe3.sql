-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles table
CREATE POLICY "Users can view their own roles"
  ON public.user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON public.user_roles
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Create custom_workout_plans table
CREATE TABLE public.custom_workout_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plan_name TEXT NOT NULL,
  plan_type TEXT NOT NULL, -- 'home', 'gym', 'hybrid'
  duration_weeks INTEGER NOT NULL DEFAULT 4,
  workout_data JSONB NOT NULL, -- Stores the complete workout structure
  notes TEXT,
  created_by UUID REFERENCES auth.users(id) NOT NULL, -- Admin who created it
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on custom_workout_plans
ALTER TABLE public.custom_workout_plans ENABLE ROW LEVEL SECURITY;

-- RLS policies for custom_workout_plans
CREATE POLICY "Users can view their own custom plans"
  ON public.custom_workout_plans
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all custom plans"
  ON public.custom_workout_plans
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can create custom plans"
  ON public.custom_workout_plans
  FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update custom plans"
  ON public.custom_workout_plans
  FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete custom plans"
  ON public.custom_workout_plans
  FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger for updated_at
CREATE TRIGGER update_custom_workout_plans_updated_at
  BEFORE UPDATE ON public.custom_workout_plans
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();