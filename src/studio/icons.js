// src/studio/icons.js - Lucide Icon Registry for Celebration Studio 2.0 Pro

import { 
  createIcons,
  Sparkles, Palette, Music, Image, Heart, Calendar, Lock, Share2, Save, Eye, 
  Compass, BookOpen, Wand2, Sliders, CheckCircle2, RotateCcw, UploadCloud, 
  GripVertical, Play, Square, Volume2, Smartphone, Tablet, Monitor, 
  ChevronDown, ChevronRight, Copy, ExternalLink, X, Plus, Trash2, ArrowRight,
  Sparkle, ShieldCheck, HelpCircle, Layers, Check, Camera
} from 'lucide';

export const STUDIO_ICONS = {
  Sparkles, Palette, Music, Image, Heart, Calendar, Lock, Share2, Save, Eye, 
  Compass, BookOpen, Wand2, Sliders, CheckCircle2, RotateCcw, UploadCloud, 
  GripVertical, Play, Square, Volume2, Smartphone, Tablet, Monitor, 
  ChevronDown, ChevronRight, Copy, ExternalLink, X, Plus, Trash2, ArrowRight,
  Sparkle, ShieldCheck, HelpCircle, Layers, Check, Camera
};

export function renderStudioIcons(root = document) {
  if (typeof window === 'undefined' || !root) return;
  try {
    createIcons({
      icons: STUDIO_ICONS,
      nameAttr: 'data-lucide',
      attrs: {
        'stroke-width': '2',
        class: 'lucide-icon'
      },
      root
    });
  } catch (err) {
    console.warn('Lucide icon rendering error:', err);
  }
}
