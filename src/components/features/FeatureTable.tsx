import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import type { FeatureMap } from '@/types/database';
import React from 'react';

interface FeatureTableProps {
  featureMap: FeatureMap;
}

export function FeatureTable({ featureMap }: FeatureTableProps) {
  if (!featureMap?.featuresMap) {
    return (
      <div className="text-center py-16 text-muted-foreground animate-fade-in">
        <div className="p-4 rounded-full bg-muted/30 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <span className="text-2xl">📊</span>
        </div>
        <p className="text-lg font-medium">No feature map data available</p>
      </div>
    );
  }

  return (
    <div className="border rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-background to-muted/20">
      <Table>
        <TableBody>
          {featureMap.featuresMap.map((category, categoryIndex) => (
            <React.Fragment key={categoryIndex}>
              <TableRow className="bg-gradient-to-r from-primary/10 to-primary/20 hover:from-primary/15 hover:to-primary/25 transition-all duration-200 border-b-2 border-primary/20">
                <TableCell className="font-bold text-primary w-48 py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-lg">Feature Category</span>
                  </div>
                </TableCell>
                <TableCell className="text-foreground font-semibold text-lg py-4">
                  {category.category}
                </TableCell>
              </TableRow>
              
              {category.areas.map((area, areaIndex) => (
                <React.Fragment key={`${categoryIndex}-${areaIndex}`}>
                  <TableRow className="bg-gradient-to-r from-blue-500/5 to-blue-500/10 hover:from-blue-500/10 hover:to-blue-500/15 transition-all duration-200 border-b border-blue-200/30">
                    <TableCell className="pl-8 font-semibold text-blue-700 py-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span>Feature Area</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-foreground font-medium py-3">
                      {area.name}
                    </TableCell>
                  </TableRow>
                  
                  {area.features.map((feature, featureIndex) => (
                    <TableRow 
                      key={`${categoryIndex}-${areaIndex}-${featureIndex}`}
                      className="bg-background hover:bg-muted/30 transition-all duration-200 border-b border-border/50 group"
                    >
                      <TableCell className="pl-16 text-muted-foreground py-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-1 h-1 bg-muted-foreground rounded-full group-hover:bg-primary transition-colors"></div>
                          <span className="text-sm font-medium">Feature</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-foreground py-3 group-hover:text-primary transition-colors">{feature}</TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}