import type { ComponentType } from 'react';

export type CollectionKind = 'components' | 'groups' | 'blocks' | 'sections' | 'templates';
export type AdaptationStrategy = 'ant-native' | 'ant-composition' | 'reui-engine';
export type AdaptationStatus = 'source-imported' | 'adapted' | 'qualified' | 'blocked';

export interface SourceFile {
  sourcePath: string;
  localPath: string;
  sha256: string;
}

export interface ReuiExample {
  id: string;
  title: string;
  description: string;
  category: string;
  dependencies: string[];
  registryDependencies: string[];
  strategy: AdaptationStrategy;
  targetLibraries: string[];
  antComponents: string[];
  adaptationStatus: AdaptationStatus;
  previewHeight: number;
  order: number;
  files: SourceFile[];
}

export interface CatalogCategory {
  id: string;
  title: string;
  description: string;
  count: number;
}

export interface ReuiInventory {
  revision: string;
  repository: string;
  license: string;
  categories: CatalogCategory[];
  examples: ReuiExample[];
}

export interface CatalogVariant {
  id: string;
  title: string;
  description: string;
  previewHeight: number;
  load: () => Promise<{ default: ComponentType }>;
  loadCode: () => Promise<string>;
  source?: { repository: string; revision: string; path: string; sha256: string };
}

export interface CatalogEntry {
  id: string;
  kind: CollectionKind;
  category: string;
  title: string;
  description: string;
  tags: string[];
  exportName: string;
  importPath: string;
  dependencies: string[];
  variants: CatalogVariant[];
  props?: { name: string; description: string; required?: boolean }[];
}
