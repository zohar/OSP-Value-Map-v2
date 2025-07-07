import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import type { FeatureMap } from '@/types/database';
import React from 'react';
import { Layers, Target, Zap } from 'lucide-react';

interface FeatureTableProps {
  featureMap: FeatureMap;
}

export function FeatureTable({ featureMap }: FeatureTableProps) {
  if (!featureMap?.featuresMap || !Array.isArray(featureMap.featuresMap) || featureMap.featuresMap.length === 0) {
    return (
      <div className="text-center py-24 text-muted-foreground animate-fade-in">
        <div className="p-8 rounded-2xl bg-gradient-surface w-24 h-24 mx-auto mb-6 flex items-center justify-center shadow-lg border border-border/50">
          <Zap className="h-12 w-12 text-muted-foreground/60" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-3">No feature map data available</h3>
        <p className="text-lg leading-relaxed max-w-md mx-auto">Feature extraction may still be processing or no features were found.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-hidden shadow-xl bg-gradient-surface border border-border/50">
      <Table>
        <TableBody>
          {featureMap.featuresMap.map((category, categoryIndex) => {
            // Skip invalid categories
            if (!category || !category.category || !Array.isArray(category.areas)) {
              return null;
            }
            
            return (
              <React.Fragment key={categoryIndex}>
                <TableRow className="bg-feature-category hover:bg-feature-category/90 transition-all duration-300 border-b-2 border-primary/20 group">
                  <TableCell className="font-bold text-feature-category-foreground w-64 py-6 px-8">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary-foreground/20 rounded-lg group-hover:scale-110 transition-transform duration-200">
                        <Layers className="w-5 h-5" />
                      </div>
                      <span className="text-lg font-bold">Feature Category</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-feature-category-foreground font-bold text-xl py-6">
                    {category.category}
                  </TableCell>
                </TableRow>
                
                {category.areas.map((area, areaIndex) => {
                  // Skip invalid areas
                  if (!area || !area.name || !Array.isArray(area.features)) {
                    return null;
                  }
                  
                  return (
                    <React.Fragment key={`${categoryIndex}-${areaIndex}`}>
                      <TableRow className="bg-feature-area hover:bg-feature-area/90 transition-all duration-300 border-b border-accent/30 group">
                        <TableCell className="pl-12 font-semibold text-feature-area-foreground py-4">
                          <div className="flex items-center space-x-3">
                            <div className="p-1.5 bg-accent-foreground/20 rounded-md group-hover:scale-110 transition-transform duration-200">
                              <Target className="w-4 h-4" />
                            </div>
                            <span className="font-semibold">Feature Area</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-feature-area-foreground font-semibold text-lg py-4">
                          {area.name}
                        </TableCell>
                      </TableRow>
                      
                      {area.features.map((feature, featureIndex) => {
                        // Skip empty/null features
                        if (!feature || typeof feature !== 'string') {
                          return null;
                        }
                        
                        return (
                          <TableRow 
                            key={`${categoryIndex}-${areaIndex}-${featureIndex}`}
                            className="bg-feature-item hover:bg-muted/50 transition-all duration-300 border-b border-border/30 group"
                          >
                            <TableCell className="pl-20 text-feature-item-foreground py-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-muted-foreground/60 rounded-full group-hover:bg-accent group-hover:scale-125 transition-all duration-200"></div>
                                <span className="text-sm font-medium text-muted-foreground">Feature</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-feature-item-foreground py-4 group-hover:text-foreground transition-colors font-medium">
                              {feature}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </React.Fragment>
                  );
                })}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}