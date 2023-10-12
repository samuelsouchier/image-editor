export interface ArtboardWidgetPosition {
  x: number,
  y: number,
}

export interface ArtboardWidgetFilters {
  brightness?: number,
  blur?: number,
  contrast?: number,
  grayscale?: number,
  sepia?: number,
}

export interface ArtboardWidgetImage {
  id: string;
  filters: ArtboardWidgetFilters;
  height: number;
  name: string;
  position: ArtboardWidgetPosition;
  rotation: number;
  src: string;
  scale: number;
}
