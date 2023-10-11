export interface ArtboardWidgetPosition {
  x: number,
  y: number,
}

export interface ArtboardWidgetFilters {
  brightness?: number,
}

export interface ArtboardWidgetImage {
  id: string;
  src: string;
  name: string;
  position: ArtboardWidgetPosition;
  height: number;
  rotation: number;
  filters: ArtboardWidgetFilters;
}
