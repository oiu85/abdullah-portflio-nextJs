-- ============================================
-- Migration: Change skills.icon from VARCHAR(100) to TEXT
-- Run this in Supabase SQL Editor to update existing database
-- ============================================

-- Alter the icon column to TEXT type to support longer URLs
ALTER TABLE skills 
ALTER COLUMN icon TYPE TEXT;

-- Verify the change
-- You can run: SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'skills' AND column_name = 'icon';

