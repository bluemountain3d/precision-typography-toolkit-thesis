import type React from 'react';
import type { JSX } from 'react';
import type { SpacingSize, SpacingStep } from '@/types';

// ============================================================================
// Component Props
// ============================================================================

export interface FlexProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;

  // Layout
  width?: Width;
  direction?: FlexDirection;
  wrap?: FlexWrap;

  // Alignment
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  alignContent?: AlignContent;

  // Spacing
  gap?: Gap;
  rowGap?: Gap;
  columnGap?: Gap;

  // Polymorphism
  as?: keyof JSX.IntrinsicElements;

  // Margin
  marginTop?: SpacingSize | SpacingStep;
  marginBottom?: SpacingSize | SpacingStep;
}

export type Width = 'auto' | 'full' | 'fit-content' | 'max-content';

// ============================================================================
// Global CSS Values
// ============================================================================

type GlobalValues = 'inherit' | 'initial' | 'revert' | 'revert-layer' | 'unset';

// ============================================================================
// Shared Alignment Values
// ============================================================================

type PositionValues = 'start' | 'end' | 'center' | 'stretch';

type SafetyValues = 'safe center' | 'unsafe center';

type DistributionValues = 'space-between' | 'space-around' | 'space-evenly';

type BaselineValues = 'baseline' | 'first baseline' | 'last baseline';

// ============================================================================
// Flex-Specific Types
// ============================================================================

export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

export type JustifyContent = PositionValues | DistributionValues | GlobalValues;

export type AlignItems =
  | PositionValues
  | BaselineValues
  | 'anchor-center'
  | GlobalValues;

export type AlignContent =
  | PositionValues
  | DistributionValues
  | BaselineValues
  | SafetyValues
  | GlobalValues;

export type Gap = SpacingSize | SpacingStep;
