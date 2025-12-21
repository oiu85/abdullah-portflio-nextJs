'use client';

import { useState, useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@portfolio/ui';
import { Upload, Trash2, Copy, Check, Image as ImageIcon, FileText, X } from 'lucide-react';

interface StorageFile {
  name: string;
  id: string;
  created_at: string;
  updated_at: string;
  last_accessed_at: string;
  metadata: Record<string, unknown>;
}

export default function MediaPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const supabase = createClient();

  const { data: files = [], isLoading } = useQuery<StorageFile[]>({
    queryKey: ['media'],
    queryFn: async () => {
      const { data, error } = await supabase.storage
        .from('media')
        .list('uploads', {
          limit: 100,
          offset: 0,
          sortBy: { column: 'created_at', order: 'desc' },
        });
      
      if (error) throw error;
      return data as StorageFile[];
    },
  });

  const uploadMutation = useMutation({
    mutationFn: async (files: File[]) => {
      const uploadPromises = files.map(async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `uploads/${fileName}`;

        const { error } = await supabase.storage
          .from('media')
          .upload(filePath, file);

        if (error) throw error;
        return filePath;
      });

      return Promise.all(uploadPromises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
      setSelectedFiles([]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (fileName: string) => {
      const { error } = await supabase.storage
        .from('media')
        .remove([`uploads/${fileName}`]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
    },
  });

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
  }, []);

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    setUploading(true);
    try {
      await uploadMutation.mutateAsync(selectedFiles);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (fileName: string) => {
    if (confirm('Are you sure you want to delete this file?')) {
      await deleteMutation.mutateAsync(fileName);
    }
  };

  const getPublicUrl = (fileName: string) => {
    const { data } = supabase.storage
      .from('media')
      .getPublicUrl(`uploads/${fileName}`);
    return data.publicUrl;
  };

  const copyToClipboard = async (fileName: string) => {
    const url = getPublicUrl(fileName);
    await navigator.clipboard.writeText(url);
    setCopiedUrl(fileName);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const formatFileSize = (bytes: number | undefined) => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const isImage = (metadata: Record<string, unknown> | null | undefined) => {
    const mimetype = metadata?.mimetype;
    return typeof mimetype === 'string' && mimetype.startsWith('image/');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Media Manager</h1>
        <p className="text-muted-foreground mt-1">
          Upload and manage your images and files
        </p>
      </div>

      {/* Upload Section */}
      <div className="border-2 border-dashed rounded-lg p-8 text-center">
        <input
          type="file"
          id="file-upload"
          className="hidden"
          multiple
          accept="image/*,.pdf,.doc,.docx"
          onChange={handleFileSelect}
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center gap-4"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Upload className="w-8 h-8 text-primary" />
          </div>
          <div>
            <p className="font-medium">Click to upload files</p>
            <p className="text-sm text-muted-foreground">
              or drag and drop
            </p>
          </div>
        </label>

        {selectedFiles.length > 0 && (
          <div className="mt-6 space-y-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="bg-muted px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  <span>{file.name}</span>
                  <button
                    onClick={() => setSelectedFiles(files => files.filter((_, i) => i !== index))}
                    className="hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <Button onClick={handleUpload} disabled={uploading}>
              {uploading ? 'Uploading...' : `Upload ${selectedFiles.length} file(s)`}
            </Button>
          </div>
        )}
      </div>

      {/* Files Grid */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto" />
          <p className="mt-4 text-muted-foreground">Loading files...</p>
        </div>
      ) : files.length === 0 ? (
        <div className="text-center py-12">
          <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No files uploaded yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((file) => (
            <div
              key={file.id}
              className="group border rounded-lg overflow-hidden bg-card"
            >
              <div 
                className="aspect-square bg-muted relative flex items-center justify-center cursor-pointer"
                onClick={() => isImage(file.metadata) && setPreviewUrl(getPublicUrl(file.name))}
              >
                {isImage(file.metadata) ? (
                  <img
                    src={getPublicUrl(file.name)}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FileText className="w-12 h-12 text-muted-foreground" />
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(file.name);
                    }}
                    className="p-2 bg-white rounded-full text-black hover:bg-gray-200"
                    title="Copy URL"
                  >
                    {copiedUrl === file.name ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(file.name);
                    }}
                    className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium truncate" title={file.name}>
                  {file.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(file.metadata?.size as number | undefined || 0)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image Preview Modal */}
      {previewUrl && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setPreviewUrl(null)}
        >
          <button
            onClick={() => setPreviewUrl(null)}
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/20 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={previewUrl}
            alt="Preview"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
